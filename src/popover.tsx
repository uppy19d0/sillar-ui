import * as React from 'react';
import { useControllableState, useIsomorphicLayoutEffect } from './internal';
import { activateDismissableLayer } from './internal/dismissable-layer';
import { Portal } from './internal/portal';
import { autoUpdatePosition, calculatePosition, type Align, type Side } from './internal/positioning';
import { Slot, composeRefs } from './slot';
import { cn } from './utils';

type PopoverContextValue = { open: boolean; setOpen: (open: boolean) => void; triggerRef: React.RefObject<HTMLElement | null>; contentId: string };
const PopoverContext = React.createContext<PopoverContextValue | null>(null);
function usePopover(name: string) { const value = React.useContext(PopoverContext); if (!value) throw new Error(`${name} must be rendered inside Popover.`); return value; }

export interface PopoverProps { open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void; children: React.ReactNode }
export function Popover({ open, defaultOpen = false, onOpenChange, children }: PopoverProps) {
  const [resolved, setOpen] = useControllableState({ value: open, defaultValue: defaultOpen, onChange: onOpenChange });
  const triggerRef = React.useRef<HTMLElement>(null); const contentId = React.useId();
  const context = React.useMemo(() => ({ open: resolved, setOpen, triggerRef, contentId }), [contentId, resolved, setOpen]);
  return <PopoverContext.Provider value={context}>{children}</PopoverContext.Provider>;
}

export interface PopoverTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { asChild?: boolean }
export const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(({ asChild = false, onClick, type, ...props }, ref) => {
  const context = usePopover('PopoverTrigger'); const Component = asChild ? Slot : 'button';
  return <Component {...props} ref={composeRefs(ref as React.Ref<HTMLElement>, context.triggerRef)} type={asChild ? undefined : type ?? 'button'} aria-haspopup="dialog" aria-expanded={context.open} aria-controls={context.open ? context.contentId : undefined} data-state={context.open ? 'open' : 'closed'} onClick={(event: React.MouseEvent<HTMLButtonElement>) => { onClick?.(event); if (!event.defaultPrevented) context.setOpen(!context.open); }} />;
});
PopoverTrigger.displayName = 'PopoverTrigger';

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> { side?: Side; align?: Align; sideOffset?: number; collisionPadding?: number; portalContainer?: Element | DocumentFragment | null; onEscapeKeyDown?: (event: KeyboardEvent) => void }
export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(({ side = 'bottom', align = 'center', sideOffset = 8, collisionPadding = 8, portalContainer, className, style, onEscapeKeyDown, children, ...props }, forwardedRef) => {
  const context = usePopover('PopoverContent'); const contentRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState<{ side: Side; style: React.CSSProperties }>({ side, style: { visibility: 'hidden' } });
  useIsomorphicLayoutEffect(() => {
    if (!context.open) return; const trigger = context.triggerRef.current; const content = contentRef.current; if (!trigger || !content) return;
    const update = () => setPosition(calculatePosition(trigger.getBoundingClientRect(), { width: content.offsetWidth, height: content.offsetHeight }, { width: window.innerWidth, height: window.innerHeight }, { side, align, sideOffset, collisionPadding, direction: window.getComputedStyle(trigger).direction === 'rtl' ? 'rtl' : 'ltr' }));
    return autoUpdatePosition(trigger, content, update);
  }, [align, collisionPadding, context.open, context.triggerRef, side, sideOffset]);
  React.useEffect(() => {
    if (!context.open || !contentRef.current) return;
    const content = contentRef.current; const deactivate = activateDismissableLayer(content, { branches: [context.triggerRef.current], onDismiss: () => context.setOpen(false) });
    const keydown = (event: KeyboardEvent) => { if (event.key !== 'Escape') return; onEscapeKeyDown?.(event); if (!event.defaultPrevented) { context.setOpen(false); context.triggerRef.current?.focus({ preventScroll: true }); } };
    document.addEventListener('keydown', keydown); return () => { deactivate(); document.removeEventListener('keydown', keydown); };
  }, [context, onEscapeKeyDown]);
  if (!context.open || typeof document === 'undefined') return null;
  return <Portal container={portalContainer}><div {...props} ref={composeRefs(contentRef, forwardedRef)} id={context.contentId} role="dialog" data-slot="popover-content" data-state="open" data-side={position.side} className={cn('slr-popover__content', className)} style={{ ...position.style, ...style }}>{children}</div></Portal>;
});
PopoverContent.displayName = 'PopoverContent';

export const PopoverClose = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ onClick, type, ...props }, ref) => { const context = usePopover('PopoverClose'); return <button {...props} ref={ref} type={type ?? 'button'} onClick={(event) => { onClick?.(event); if (!event.defaultPrevented) { context.setOpen(false); context.triggerRef.current?.focus(); } }} />; });
PopoverClose.displayName = 'PopoverClose';
