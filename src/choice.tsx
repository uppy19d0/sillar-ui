import * as React from 'react';
import { useControllableState } from './internal';
import { moveFocus } from './internal/roving-focus';
import { cn } from './utils';

export interface CheckboxProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> { checked?: boolean; defaultChecked?: boolean; onCheckedChange?: (checked: boolean) => void }
export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(({ checked, defaultChecked = false, onCheckedChange, className, onClick, disabled, type, children, ...props }, ref) => {
  const [resolved, setChecked] = useControllableState({ value: checked, defaultValue: defaultChecked, onChange: onCheckedChange });
  return <button {...props} ref={ref} type={type ?? 'button'} role="checkbox" aria-checked={resolved} disabled={disabled} data-slot="checkbox" data-state={resolved ? 'checked' : 'unchecked'} className={cn('slr-checkbox', className)} onClick={(event) => { onClick?.(event); if (!event.defaultPrevented && !disabled) setChecked(!resolved); }}>{children ?? <span aria-hidden="true" className="slr-checkbox__indicator">✓</span>}</button>;
});
Checkbox.displayName = 'Checkbox';

type RadioGroupContextValue = { value: string; setValue: (value: string) => void; name?: string; disabled: boolean; orientation: 'horizontal' | 'vertical'; loop: boolean };
const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);
function useRadioGroup(name: string) { const value = React.useContext(RadioGroupContext); if (!value) throw new Error(`${name} must be rendered inside RadioGroup.`); return value; }

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> { value?: string; defaultValue?: string; onValueChange?: (value: string) => void; name?: string; disabled?: boolean; orientation?: 'horizontal' | 'vertical'; loop?: boolean }
export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(({ value, defaultValue = '', onValueChange, name, disabled = false, orientation = 'vertical', loop = true, className, children, ...props }, ref) => {
  const [resolved, setValue] = useControllableState({ value, defaultValue, onChange: onValueChange });
  const context = React.useMemo(() => ({ value: resolved, setValue, name, disabled, orientation, loop }), [disabled, loop, name, orientation, resolved, setValue]);
  return <RadioGroupContext.Provider value={context}><div {...props} ref={ref} role="radiogroup" aria-orientation={orientation} data-slot="radio-group" data-orientation={orientation} className={cn('slr-radio-group', className)}>{children}</div></RadioGroupContext.Provider>;
});
RadioGroup.displayName = 'RadioGroup';

export interface RadioGroupItemProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> { value: string }
export const RadioGroupItem = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(({ value, disabled, className, onClick, onKeyDown, type, children, ...props }, ref) => {
  const context = useRadioGroup('RadioGroupItem'); const selected = context.value === value; const isDisabled = context.disabled || disabled;
  return <button {...props} ref={ref} type={type ?? 'button'} role="radio" aria-checked={selected} disabled={isDisabled} tabIndex={selected || !context.value ? 0 : -1} data-slot="radio-group-item" data-state={selected ? 'checked' : 'unchecked'} className={cn('slr-radio', className)} onClick={(event) => { onClick?.(event); if (!event.defaultPrevented && !isDisabled) context.setValue(value); }} onKeyDown={(event) => {
    onKeyDown?.(event); if (event.defaultPrevented) return;
    const previousKey = context.orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft'; const nextKey = context.orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';
    if (![previousKey, nextKey, 'Home', 'End'].includes(event.key)) return;
    const root = event.currentTarget.closest('[role="radiogroup"]'); const items = Array.from(root?.querySelectorAll<HTMLElement>('[role="radio"]:not(:disabled)') ?? []);
    const direction = event.key === 'Home' ? 'first' : event.key === 'End' ? 'last' : event.key === previousKey ? 'previous' : 'next';
    event.preventDefault(); const next = moveFocus(items, event.currentTarget, { direction, loop: context.loop }); next?.focus(); next?.click();
  }}>{children ?? <span aria-hidden="true" className="slr-radio__indicator" />}{context.name && <input type="radio" name={context.name} value={value} checked={selected} readOnly hidden />}</button>;
});
RadioGroupItem.displayName = 'RadioGroupItem';
