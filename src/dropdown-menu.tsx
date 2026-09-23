import * as React from 'react';
import { useControllableState, useIsomorphicLayoutEffect } from './internal';
import { activateDismissableLayer } from './internal/dismissable-layer';
import { Portal } from './internal/portal';
import { Slot, composeRefs } from './slot';
import { cn } from './utils';

type FocusIntent = 'first' | 'last';

type MenuContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentId: string;
  focusIntent: FocusIntent;
  setFocusIntent: (intent: FocusIntent) => void;
};

const MenuContext = React.createContext<MenuContextValue | null>(null);
const menuItemSelector = '[role="menuitem"]:not([disabled]):not([aria-disabled="true"])';

function useMenu(component: string) {
  const context = React.useContext(MenuContext);
  if (!context) throw new Error(`${component} must be rendered inside DropdownMenu.`);
  return context;
}

function getMenuItems(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(menuItemSelector));
}

export interface DropdownMenuProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function DropdownMenu({ open, defaultOpen = false, onOpenChange, children }: DropdownMenuProps) {
  const [resolvedOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const [focusIntent, setFocusIntent] = React.useState<FocusIntent>('first');
  const triggerRef = React.useRef<HTMLElement>(null);
  const contentId = React.useId();
  const value = React.useMemo(
    () => ({ open: resolvedOpen, setOpen, triggerRef, contentId, focusIntent, setFocusIntent }),
    [contentId, focusIntent, resolvedOpen, setOpen],
  );
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

interface MenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, MenuTriggerProps>(
  ({ asChild = false, onClick, onKeyDown, type, ...props }, ref) => {
    const context = useMenu('DropdownMenuTrigger');
    const Component = asChild ? Slot : 'button';
    const openWithIntent = (intent: FocusIntent) => {
      context.setFocusIntent(intent);
      context.setOpen(true);
    };

    return (
      <Component
        {...props}
        ref={composeRefs(ref as React.Ref<HTMLElement>, context.triggerRef)}
        type={asChild ? undefined : type ?? 'button'}
        aria-haspopup="menu"
        aria-expanded={context.open}
        aria-controls={context.open ? context.contentId : undefined}
        data-state={context.open ? 'open' : 'closed'}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          onClick?.(event);
          if (event.defaultPrevented) return;
          if (!context.open) context.setFocusIntent('first');
          context.setOpen(!context.open);
        }}
        onKeyDown={(event: React.KeyboardEvent<HTMLButtonElement>) => {
          onKeyDown?.(event);
          if (event.defaultPrevented) return;
          if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openWithIntent('first');
          } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            openWithIntent('last');
          }
        }}
      />
    );
  },
);

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

export interface DropdownMenuPortalProps {
  children: React.ReactNode;
  container?: Element | DocumentFragment | null;
}

export function DropdownMenuPortal({ children, container }: DropdownMenuPortalProps) {
  const { open } = useMenu('DropdownMenuPortal');
  if (!open || typeof document === 'undefined') return null;
  return <Portal container={container}>{children}</Portal>;
}

export interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'bottom';
  sideOffset?: number;
  collisionPadding?: number;
  avoidCollisions?: boolean;
  portalContainer?: Element | DocumentFragment | null;
}

export const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({
    className,
    align = 'start',
    side = 'bottom',
    sideOffset = 6,
    collisionPadding = 8,
    avoidCollisions = true,
    portalContainer,
    style,
    onKeyDown,
    children,
    ...props
  }, forwardedRef) => {
    const context = useMenu('DropdownMenuContent');
    const contentRef = React.useRef<HTMLDivElement>(null);
    const setOpenRef = React.useRef(context.setOpen);
    const searchRef = React.useRef({ value: '', time: 0 });
    const [position, setPosition] = React.useState<{
      side: 'top' | 'bottom';
      style: React.CSSProperties;
    }>({ side, style: { visibility: 'hidden' } });

    setOpenRef.current = context.setOpen;

    useIsomorphicLayoutEffect(() => {
      if (!context.open) return;
      const updatePosition = () => {
        const trigger = context.triggerRef.current;
        const content = contentRef.current;
        if (!trigger || !content) return;
        const rect = trigger.getBoundingClientRect();
        const width = content.offsetWidth;
        const height = content.offsetHeight;
        const direction = window.getComputedStyle(trigger).direction;
        const availableTop = rect.top - collisionPadding;
        const availableBottom = window.innerHeight - rect.bottom - collisionPadding;
        let resolvedSide = side;
        if (avoidCollisions) {
          if (side === 'bottom' && height > availableBottom && availableTop > availableBottom) resolvedSide = 'top';
          if (side === 'top' && height > availableTop && availableBottom > availableTop) resolvedSide = 'bottom';
        }

        let left = direction === 'rtl' ? rect.right - width : rect.left;
        if (align === 'center') left = rect.left + (rect.width - width) / 2;
        if (align === 'end') left = direction === 'rtl' ? rect.left : rect.right - width;
        left = Math.max(collisionPadding, Math.min(left, window.innerWidth - width - collisionPadding));

        const desiredTop = resolvedSide === 'bottom'
          ? rect.bottom + sideOffset
          : rect.top - height - sideOffset;
        const top = avoidCollisions
          ? Math.max(collisionPadding, Math.min(desiredTop, window.innerHeight - height - collisionPadding))
          : desiredTop;
        setPosition({
          side: resolvedSide,
          style: {
            position: 'fixed',
            top,
            left,
            minWidth: rect.width,
            visibility: 'visible',
          },
        });
      };
      updatePosition();
      const resizeObserver = typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(updatePosition);
      if (contentRef.current) resizeObserver?.observe(contentRef.current);
      if (context.triggerRef.current) resizeObserver?.observe(context.triggerRef.current);
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);
      return () => {
        resizeObserver?.disconnect();
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition, true);
      };
    }, [align, avoidCollisions, collisionPadding, context.open, context.triggerRef, side, sideOffset]);

    React.useEffect(() => {
      if (!context.open) return;
      const frame = window.requestAnimationFrame(() => {
        const content = contentRef.current;
        if (!content) return;
        const items = getMenuItems(content);
        const target = context.focusIntent === 'last' ? items.at(-1) : items[0];
        target?.focus({ preventScroll: true });
      });
      const deactivateDismissableLayer = contentRef.current
        ? activateDismissableLayer(contentRef.current, {
          branches: [context.triggerRef.current],
          onDismiss: () => setOpenRef.current(false),
        })
        : () => undefined;
      return () => {
        window.cancelAnimationFrame(frame);
        deactivateDismissableLayer();
        searchRef.current = { value: '', time: 0 };
      };
    }, [context.focusIntent, context.open, context.triggerRef]);

    if (!context.open || typeof document === 'undefined') return null;

    return <Portal container={portalContainer}>
      <div
        {...props}
        ref={composeRefs(contentRef, forwardedRef)}
        id={context.contentId}
        role="menu"
        data-slot="dropdown-menu-content"
        data-state="open"
        data-side={position.side}
        className={cn('slr-dropdown__content', className)}
        style={{ ...position.style, ...style }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented) return;
          const items = getMenuItems(event.currentTarget);
          const currentIndex = items.indexOf(document.activeElement as HTMLElement);
          if (event.key === 'Escape') {
            event.preventDefault();
            context.setOpen(false);
            context.triggerRef.current?.focus({ preventScroll: true });
          } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            if (items.length === 0) return;
            const direction = event.key === 'ArrowDown' ? 1 : -1;
            items[(currentIndex + direction + items.length) % items.length]?.focus();
          } else if (event.key === 'Home') {
            event.preventDefault();
            items[0]?.focus();
          } else if (event.key === 'End') {
            event.preventDefault();
            items.at(-1)?.focus();
          } else if (event.key === 'Tab') {
            context.setOpen(false);
          } else if (
            event.key.length === 1
            && event.key !== ' '
            && !event.ctrlKey
            && !event.metaKey
            && !event.altKey
          ) {
            const now = Date.now();
            const previous = now - searchRef.current.time < 700 ? searchRef.current.value : '';
            const repeated = previous.length > 0 && previous.split('').every((character) => character === event.key.toLowerCase());
            const query = repeated ? event.key.toLowerCase() : `${previous}${event.key.toLowerCase()}`;
            searchRef.current = { value: query, time: now };
            const candidates = [...items.slice(currentIndex + 1), ...items.slice(0, currentIndex + 1)];
            const match = candidates.find((item) => {
              const label = item.dataset.textValue ?? item.textContent ?? '';
              return label.trim().toLocaleLowerCase().startsWith(query);
            });
            if (match) {
              event.preventDefault();
              match.focus();
            }
          }
        }}
      >
        {children}
      </div>
    </Portal>;
  },
);

DropdownMenuContent.displayName = 'DropdownMenuContent';

export interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  inset?: boolean;
  variant?: 'default' | 'destructive';
  textValue?: string;
}

export const DropdownMenuItem = React.forwardRef<HTMLButtonElement, DropdownMenuItemProps>(
  ({ className, inset, variant = 'default', textValue, onClick, onPointerMove, type, ...props }, ref) => {
    const context = useMenu('DropdownMenuItem');
    return (
      <button
        {...props}
        ref={ref}
        type={type ?? 'button'}
        role="menuitem"
        tabIndex={-1}
        data-inset={inset || undefined}
        data-variant={variant}
        data-text-value={textValue}
        className={cn('slr-dropdown__item', className)}
        onPointerMove={(event) => {
          onPointerMove?.(event);
          if (!event.defaultPrevented && !event.currentTarget.disabled) event.currentTarget.focus();
        }}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) {
            context.setOpen(false);
            context.triggerRef.current?.focus({ preventScroll: true });
          }
        }}
      />
    );
  },
);

DropdownMenuItem.displayName = 'DropdownMenuItem';

export function DropdownMenuGroup(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div role="group" data-slot="dropdown-menu-group" {...props} />;
}

export function DropdownMenuLabel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="dropdown-menu-label" className={cn('slr-dropdown__label', className)} {...props} />;
}

export function DropdownMenuSeparator({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) {
  return <hr data-slot="dropdown-menu-separator" className={cn('slr-dropdown__separator', className)} {...props} />;
}
