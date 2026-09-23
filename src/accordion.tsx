import * as React from 'react';
import { useControllableState } from './internal';
import { moveFocus } from './internal/roving-focus';
import { cn } from './utils';

type AccordionContextValue = {
  values: string[];
  toggle: (value: string) => void;
  type: 'single' | 'multiple';
  collapsible: boolean;
  orientation: 'horizontal' | 'vertical';
  loop: boolean;
};
const AccordionContext = React.createContext<AccordionContextValue | null>(null);
const AccordionItemContext = React.createContext<{ value: string; open: boolean; triggerId: string; contentId: string } | null>(null);

function useAccordion(name: string) { const value = React.useContext(AccordionContext); if (!value) throw new Error(`${name} must be rendered inside Accordion.`); return value; }
function useAccordionItem(name: string) { const value = React.useContext(AccordionItemContext); if (!value) throw new Error(`${name} must be rendered inside AccordionItem.`); return value; }

export interface AccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  type?: 'single' | 'multiple';
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  collapsible?: boolean;
  orientation?: 'horizontal' | 'vertical';
  loop?: boolean;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(({
  type = 'single', value, defaultValue, onValueChange, collapsible = false, orientation = 'vertical', loop = true, className, children, ...props
}, ref) => {
  const normalize = React.useCallback((input?: string | string[]) => input === undefined ? [] : Array.isArray(input) ? input : [input], []);
  const [values, setValues] = useControllableState({ value: value === undefined ? undefined : normalize(value), defaultValue: normalize(defaultValue), onChange: (next) => onValueChange?.(type === 'single' ? next[0] ?? '' : next) });
  const toggle = React.useCallback((item: string) => setValues((current) => {
    const open = current.includes(item);
    if (type === 'multiple') return open ? current.filter((entry) => entry !== item) : [...current, item];
    if (open && collapsible) return [];
    return [item];
  }), [collapsible, setValues, type]);
  const context = React.useMemo(() => ({ values, toggle, type, collapsible, orientation, loop }), [collapsible, loop, orientation, toggle, type, values]);
  return <AccordionContext.Provider value={context}><div {...props} ref={ref} data-slot="accordion" data-orientation={orientation} className={cn('slr-accordion', className)}>{children}</div></AccordionContext.Provider>;
});
Accordion.displayName = 'Accordion';

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> { value: string; disabled?: boolean }
export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(({ value, disabled, className, children, ...props }, ref) => {
  const accordion = useAccordion('AccordionItem');
  const baseId = React.useId();
  const context = React.useMemo(() => ({ value, open: accordion.values.includes(value), triggerId: `${baseId}-trigger`, contentId: `${baseId}-content` }), [accordion.values, baseId, value]);
  return <AccordionItemContext.Provider value={context}><div {...props} ref={ref} data-slot="accordion-item" data-state={context.open ? 'open' : 'closed'} data-disabled={disabled || undefined} className={cn('slr-accordion__item', className)}>{children}</div></AccordionItemContext.Provider>;
});
AccordionItem.displayName = 'AccordionItem';

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ className, onClick, onKeyDown, type, disabled, children, ...props }, ref) => {
  const accordion = useAccordion('AccordionTrigger');
  const item = useAccordionItem('AccordionTrigger');
  return <h3 className="slr-accordion__heading"><button {...props} ref={ref} id={item.triggerId} type={type ?? 'button'} disabled={disabled} aria-expanded={item.open} aria-controls={item.contentId} data-slot="accordion-trigger" data-state={item.open ? 'open' : 'closed'} className={cn('slr-accordion__trigger', className)} onClick={(event) => { onClick?.(event); if (!event.defaultPrevented && !disabled) accordion.toggle(item.value); }} onKeyDown={(event) => {
    onKeyDown?.(event); if (event.defaultPrevented) return;
    const previousKey = accordion.orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';
    const nextKey = accordion.orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';
    if (![previousKey, nextKey, 'Home', 'End'].includes(event.key)) return;
    const root = event.currentTarget.closest('[data-slot="accordion"]');
    const triggers = Array.from(root?.querySelectorAll<HTMLElement>('[data-slot="accordion-trigger"]:not(:disabled)') ?? []);
    const direction = event.key === 'Home' ? 'first' : event.key === 'End' ? 'last' : event.key === previousKey ? 'previous' : 'next';
    event.preventDefault(); moveFocus(triggers, event.currentTarget, { direction, loop: accordion.loop })?.focus();
  }}>{children}<span aria-hidden="true" className="slr-accordion__chevron" /></button></h3>;
});
AccordionTrigger.displayName = 'AccordionTrigger';

export const AccordionContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  const item = useAccordionItem('AccordionContent');
  return <div {...props} ref={ref} id={item.contentId} role="region" aria-labelledby={item.triggerId} hidden={!item.open} data-slot="accordion-content" data-state={item.open ? 'open' : 'closed'} className={cn('slr-accordion__content', className)} />;
});
AccordionContent.displayName = 'AccordionContent';
