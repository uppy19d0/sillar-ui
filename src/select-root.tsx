import * as React from 'react';
import { useControllableState, useIsomorphicLayoutEffect } from './internal';
import { activateDismissableLayer } from './internal/dismissable-layer';
import { Portal } from './internal/portal';
import { autoUpdatePosition, calculatePosition, type Align } from './internal/positioning';
import { moveFocus } from './internal/roving-focus';
import { composeRefs } from './slot';
import { cn } from './utils';

type SelectContextValue = { value: string; label: string; setValue: (value: string, label: string) => void; open: boolean; setOpen: (open: boolean) => void; disabled: boolean; triggerRef: React.RefObject<HTMLButtonElement | null>; contentId: string; name?: string };
const SelectContext = React.createContext<SelectContextValue | null>(null);
function useSelectRoot(name: string) { const value = React.useContext(SelectContext); if (!value) throw new Error(`${name} must be rendered inside SelectRoot.`); return value; }

export interface SelectRootProps { value?: string; defaultValue?: string; onValueChange?: (value: string) => void; open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void; disabled?: boolean; name?: string; children: React.ReactNode }
export function SelectRoot({ value, defaultValue = '', onValueChange, open, defaultOpen = false, onOpenChange, disabled = false, name, children }: SelectRootProps) {
  const [resolvedValue, changeValue] = useControllableState({ value, defaultValue, onChange: onValueChange }); const [resolvedOpen, setOpen] = useControllableState({ value: open, defaultValue: defaultOpen, onChange: onOpenChange });
  const [label, setLabel] = React.useState(''); const triggerRef = React.useRef<HTMLButtonElement>(null); const contentId = React.useId();
  const setValue = React.useCallback((next: string, nextLabel: string) => { changeValue(next); setLabel(nextLabel); setOpen(false); triggerRef.current?.focus({ preventScroll: true }); }, [changeValue, setOpen]);
  const context = React.useMemo(() => ({ value: resolvedValue, label, setValue, open: resolvedOpen, setOpen, disabled, triggerRef, contentId, name }), [contentId, disabled, label, name, resolvedOpen, resolvedValue, setOpen, setValue]);
  return <SelectContext.Provider value={context}>{children}{name && <input type="hidden" name={name} value={resolvedValue} />}</SelectContext.Provider>;
}

export const SelectTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ className, onClick, onKeyDown, disabled, type, children, ...props }, ref) => {
  const context = useSelectRoot('SelectTrigger'); const isDisabled = context.disabled || disabled;
  return <button {...props} ref={composeRefs(ref, context.triggerRef)} type={type ?? 'button'} role="combobox" aria-controls={context.contentId} aria-expanded={context.open} aria-haspopup="listbox" disabled={isDisabled} data-slot="select-trigger" data-state={context.open ? 'open' : 'closed'} className={cn('slr-select-trigger', className)} onClick={(event) => { onClick?.(event); if (!event.defaultPrevented && !isDisabled) context.setOpen(!context.open); }} onKeyDown={(event) => { onKeyDown?.(event); if (event.defaultPrevented || isDisabled) return; if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) { event.preventDefault(); context.setOpen(true); } }}>{children}<span aria-hidden="true" className="slr-select-trigger__chevron" /></button>;
});
SelectTrigger.displayName = 'SelectTrigger';

export interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> { placeholder?: string }
export function SelectValue({ placeholder = 'Select an option', className, ...props }: SelectValueProps) { const context = useSelectRoot('SelectValue'); return <span {...props} data-slot="select-value" data-placeholder={!context.value || undefined} className={cn('slr-select-value', className)}>{context.label || context.value || placeholder}</span>; }

export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> { align?: Align; sideOffset?: number; collisionPadding?: number; portalContainer?: Element | DocumentFragment | null }
export const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(({ align = 'start', sideOffset = 6, collisionPadding = 8, portalContainer, className, style, onKeyDown, children, ...props }, forwardedRef) => {
  const context = useSelectRoot('SelectContent'); const contentRef = React.useRef<HTMLDivElement>(null); const [position, setPosition] = React.useState<{ side: 'top' | 'right' | 'bottom' | 'left'; style: React.CSSProperties }>({ side: 'bottom', style: { visibility: 'hidden' } });
  useIsomorphicLayoutEffect(() => { if (!context.open) return; const trigger = context.triggerRef.current; const content = contentRef.current; if (!trigger || !content) return; const update = () => setPosition(calculatePosition(trigger.getBoundingClientRect(), { width: content.offsetWidth, height: content.offsetHeight }, { width: window.innerWidth, height: window.innerHeight }, { side: 'bottom', align, sideOffset, collisionPadding, matchAnchorWidth: true, direction: window.getComputedStyle(trigger).direction === 'rtl' ? 'rtl' : 'ltr' })); return autoUpdatePosition(trigger, content, update); }, [align, collisionPadding, context.open, context.triggerRef, sideOffset]);
  React.useEffect(() => { if (!context.open || !contentRef.current) return; const content = contentRef.current; const deactivate = activateDismissableLayer(content, { branches: [context.triggerRef.current], onDismiss: () => context.setOpen(false) }); const frame = requestAnimationFrame(() => { const items = getItems(content); (items.find((item) => item.dataset.value === context.value) ?? items[0])?.focus(); }); return () => { cancelAnimationFrame(frame); deactivate(); }; }, [context]);
  if (!context.open || typeof document === 'undefined') return null;
  return <Portal container={portalContainer}><div {...props} ref={composeRefs(contentRef, forwardedRef)} id={context.contentId} role="listbox" tabIndex={-1} data-slot="select-content" data-side={position.side} className={cn('slr-select-content', className)} style={{ ...position.style, ...style }} onKeyDown={(event) => { onKeyDown?.(event); if (event.defaultPrevented) return; const items = getItems(event.currentTarget); const current = document.activeElement as HTMLElement; if (event.key === 'Escape' || event.key === 'Tab') { context.setOpen(false); if (event.key === 'Escape') { event.preventDefault(); context.triggerRef.current?.focus(); } return; } if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) { event.preventDefault(); const direction = event.key === 'ArrowDown' ? 'next' : event.key === 'ArrowUp' ? 'previous' : event.key === 'Home' ? 'first' : 'last'; moveFocus(items, current, { direction })?.focus(); } }}>{children}</div></Portal>;
});
SelectContent.displayName = 'SelectContent';

function getItems(root: HTMLElement) { return Array.from(root.querySelectorAll<HTMLElement>('[role="option"]:not([aria-disabled="true"])')); }
export interface SelectItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { value: string; textValue?: string }
export const SelectItem = React.forwardRef<HTMLButtonElement, SelectItemProps>(({ value, textValue, disabled, className, onClick, onPointerMove, children, type, ...props }, ref) => { const context = useSelectRoot('SelectItem'); const selected = context.value === value; return <button {...props} ref={ref} type={type ?? 'button'} role="option" aria-selected={selected} aria-disabled={disabled || undefined} disabled={disabled} tabIndex={-1} data-slot="select-item" data-state={selected ? 'checked' : 'unchecked'} data-value={value} className={cn('slr-select-item', className)} onPointerMove={(event) => { onPointerMove?.(event); if (!event.defaultPrevented && !disabled) event.currentTarget.focus(); }} onClick={(event) => { onClick?.(event); if (!event.defaultPrevented && !disabled) context.setValue(value, textValue ?? event.currentTarget.textContent?.trim() ?? value); }}><span aria-hidden="true" className="slr-select-item__check">{selected ? '✓' : ''}</span>{children}</button>; });
SelectItem.displayName = 'SelectItem';
