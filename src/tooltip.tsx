import * as React from 'react';
import { useControllableState, useIsomorphicLayoutEffect } from './internal';
import { Portal } from './internal/portal';
import { autoUpdatePosition, calculatePosition, type Align, type Side } from './internal/positioning';
import { Slot, composeRefs } from './slot';
import { cn } from './utils';

type TooltipContextValue = { open: boolean; setOpenSoon: () => void; close: () => void; triggerRef: React.RefObject<HTMLElement | null>; contentId: string };
const TooltipContext = React.createContext<TooltipContextValue | null>(null);
function useTooltip(name: string) { const value = React.useContext(TooltipContext); if (!value) throw new Error(`${name} must be rendered inside Tooltip.`); return value; }

export interface TooltipProps { open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void; delayDuration?: number; children: React.ReactNode }
export function Tooltip({ open, defaultOpen = false, onOpenChange, delayDuration = 500, children }: TooltipProps) {
  const [resolved, setOpen] = useControllableState({ value: open, defaultValue: defaultOpen, onChange: onOpenChange }); const timerRef = React.useRef<number | null>(null);
  const triggerRef = React.useRef<HTMLElement>(null); const contentId = React.useId();
  const close = React.useCallback(() => { if (timerRef.current !== null) window.clearTimeout(timerRef.current); timerRef.current = null; setOpen(false); }, [setOpen]);
  const setOpenSoon = React.useCallback(() => { if (timerRef.current !== null) window.clearTimeout(timerRef.current); timerRef.current = window.setTimeout(() => setOpen(true), delayDuration); }, [delayDuration, setOpen]);
  React.useEffect(() => () => { if (timerRef.current !== null) window.clearTimeout(timerRef.current); }, []);
  const context = React.useMemo(() => ({ open: resolved, setOpenSoon, close, triggerRef, contentId }), [close, contentId, resolved, setOpenSoon]);
  return <TooltipContext.Provider value={context}>{children}</TooltipContext.Provider>;
}

export interface TooltipTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { asChild?: boolean }
export const TooltipTrigger = React.forwardRef<HTMLButtonElement, TooltipTriggerProps>(({ asChild = false, onPointerEnter, onPointerLeave, onFocus, onBlur, onKeyDown, ...props }, ref) => {
  const context = useTooltip('TooltipTrigger'); const Component = asChild ? Slot : 'button';
  return <Component {...props} ref={composeRefs(ref as React.Ref<HTMLElement>, context.triggerRef)} aria-describedby={context.open ? context.contentId : undefined} data-state={context.open ? 'open' : 'closed'} onPointerEnter={(event: React.PointerEvent<HTMLButtonElement>) => { onPointerEnter?.(event); if (!event.defaultPrevented) context.setOpenSoon(); }} onPointerLeave={(event: React.PointerEvent<HTMLButtonElement>) => { onPointerLeave?.(event); if (!event.defaultPrevented) context.close(); }} onFocus={(event: React.FocusEvent<HTMLButtonElement>) => { onFocus?.(event); if (!event.defaultPrevented) context.setOpenSoon(); }} onBlur={(event: React.FocusEvent<HTMLButtonElement>) => { onBlur?.(event); if (!event.defaultPrevented) context.close(); }} onKeyDown={(event: React.KeyboardEvent<HTMLButtonElement>) => { onKeyDown?.(event); if (!event.defaultPrevented && event.key === 'Escape') context.close(); }} />;
});
TooltipTrigger.displayName = 'TooltipTrigger';

export interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> { side?: Side; align?: Align; sideOffset?: number; collisionPadding?: number; portalContainer?: Element | DocumentFragment | null }
export const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(({ side = 'top', align = 'center', sideOffset = 7, collisionPadding = 8, portalContainer, className, style, ...props }, forwardedRef) => {
  const context = useTooltip('TooltipContent'); const contentRef = React.useRef<HTMLDivElement>(null); const [position, setPosition] = React.useState<{ side: Side; style: React.CSSProperties }>({ side, style: { visibility: 'hidden' } });
  useIsomorphicLayoutEffect(() => { if (!context.open) return; const trigger = context.triggerRef.current; const content = contentRef.current; if (!trigger || !content) return; const update = () => setPosition(calculatePosition(trigger.getBoundingClientRect(), { width: content.offsetWidth, height: content.offsetHeight }, { width: window.innerWidth, height: window.innerHeight }, { side, align, sideOffset, collisionPadding })); return autoUpdatePosition(trigger, content, update); }, [align, collisionPadding, context.open, context.triggerRef, side, sideOffset]);
  if (!context.open || typeof document === 'undefined') return null;
  return <Portal container={portalContainer}><div {...props} ref={composeRefs(contentRef, forwardedRef)} id={context.contentId} role="tooltip" data-slot="tooltip-content" data-state="open" data-side={position.side} className={cn('slr-tooltip__content', className)} style={{ ...position.style, ...style }} /></Portal>;
});
TooltipContent.displayName = 'TooltipContent';
