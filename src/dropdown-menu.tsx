import * as React from 'react';
import { createPortal } from 'react-dom';
import { Slot, composeRefs } from './slot';
import { cn } from './utils';

type MenuContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentId: string;
};

const MenuContext = React.createContext<MenuContextValue | null>(null);
const useSafeLayoutEffect = typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

function useMenu(component: string) {
  const context = React.useContext(MenuContext);
  if (!context) throw new Error(`${component} must be rendered inside DropdownMenu.`);
  return context;
}

export interface DropdownMenuProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function DropdownMenu({ open, defaultOpen = false, onOpenChange, children }: DropdownMenuProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const triggerRef = React.useRef<HTMLElement>(null);
  const contentId = React.useId();
  const isControlled = open !== undefined;
  const resolvedOpen = isControlled ? open : internalOpen;
  const setOpen = React.useCallback((next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  }, [isControlled, onOpenChange]);
  const value = React.useMemo(
    () => ({ open: resolvedOpen, setOpen, triggerRef, contentId }),
    [contentId, resolvedOpen, setOpen],
  );
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

interface MenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { asChild?: boolean }

export const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, MenuTriggerProps>(
  ({ asChild = false, onClick, onKeyDown, type, ...props }, ref) => {
    const context = useMenu('DropdownMenuTrigger');
    const Component = asChild ? Slot : 'button';
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
          if (!event.defaultPrevented) context.setOpen(!context.open);
        }}
        onKeyDown={(event: React.KeyboardEvent<HTMLButtonElement>) => {
          onKeyDown?.(event);
          if (!event.defaultPrevented && ['ArrowDown', 'Enter', ' '].includes(event.key)) {
            event.preventDefault();
            context.setOpen(true);
          }
        }}
      />
    );
  },
);

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

export function DropdownMenuPortal({ children }: { children: React.ReactNode }) {
  const { open } = useMenu('DropdownMenuPortal');
  if (!open || typeof document === 'undefined') return null;
  return createPortal(children, document.body);
}

export interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
}

export const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ className, align = 'start', sideOffset = 6, style, onKeyDown, children, ...props }, forwardedRef) => {
    const context = useMenu('DropdownMenuContent');
    const contentRef = React.useRef<HTMLDivElement>(null);
    const setOpenRef = React.useRef(context.setOpen);
    const [position, setPosition] = React.useState<React.CSSProperties>({ visibility: 'hidden' });

    setOpenRef.current = context.setOpen;

    useSafeLayoutEffect(() => {
      if (!context.open) return;
      const updatePosition = () => {
        const trigger = context.triggerRef.current;
        const content = contentRef.current;
        if (!trigger || !content) return;
        const rect = trigger.getBoundingClientRect();
        const width = content.offsetWidth;
        let left = rect.left;
        if (align === 'center') left = rect.left + (rect.width - width) / 2;
        if (align === 'end') left = rect.right - width;
        left = Math.max(8, Math.min(left, window.innerWidth - width - 8));
        setPosition({ position: 'fixed', top: rect.bottom + sideOffset, left, minWidth: rect.width, visibility: 'visible' });
      };
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition, true);
      };
    }, [align, context.open, context.triggerRef, sideOffset]);

    React.useEffect(() => {
      if (!context.open) return;
      const frame = window.requestAnimationFrame(() => {
        contentRef.current?.querySelector<HTMLElement>('[role="menuitem"]:not([disabled])')?.focus();
      });
      const handlePointerDown = (event: PointerEvent) => {
        const target = event.target as Node;
        if (!contentRef.current?.contains(target) && !context.triggerRef.current?.contains(target)) setOpenRef.current(false);
      };
      document.addEventListener('pointerdown', handlePointerDown);
      return () => {
        window.cancelAnimationFrame(frame);
        document.removeEventListener('pointerdown', handlePointerDown);
      };
    }, [context.open, context.triggerRef]);

    if (!context.open || typeof document === 'undefined') return null;

    return createPortal(
      <div
        {...props}
        ref={composeRefs(contentRef, forwardedRef)}
        id={context.contentId}
        role="menu"
        data-slot="dropdown-menu-content"
        data-state="open"
        className={cn('slr-dropdown__content', className)}
        style={{ ...position, ...style }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented) return;
          const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('[role="menuitem"]:not([disabled])'));
          const currentIndex = items.indexOf(document.activeElement as HTMLElement);
          if (event.key === 'Escape') {
            event.preventDefault();
            context.setOpen(false);
            context.triggerRef.current?.focus();
          } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
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
          }
        }}
      >
        {children}
      </div>,
      document.body,
    );
  },
);

DropdownMenuContent.displayName = 'DropdownMenuContent';

export interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  inset?: boolean;
  variant?: 'default' | 'destructive';
}

export const DropdownMenuItem = React.forwardRef<HTMLButtonElement, DropdownMenuItemProps>(
  ({ className, inset, variant = 'default', onClick, type, ...props }, ref) => {
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
        className={cn('slr-dropdown__item', className)}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) {
            context.setOpen(false);
            context.triggerRef.current?.focus();
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
