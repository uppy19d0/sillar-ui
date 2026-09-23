import * as React from 'react';
import { cn } from './utils';

const sameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
const addDays = (date: Date, amount: number) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
const addMonths = (date: Date, amount: number) => new Date(date.getFullYear(), date.getMonth() + amount, 1);

export interface DatePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  value?: Date | null;
  defaultValue?: Date | null;
  onValueChange?: (value: Date) => void;
  month?: Date;
  defaultMonth?: Date;
  onMonthChange?: (month: Date) => void;
  min?: Date;
  max?: Date;
  locale?: string;
  weekStartsOn?: 0 | 1;
  previousLabel?: string;
  nextLabel?: string;
}

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(({ value, defaultValue = null, onValueChange, month, defaultMonth, onMonthChange, min, max, locale = 'en', weekStartsOn = 0, previousLabel = 'Previous month', nextLabel = 'Next month', className, ...props }, ref) => {
  const controlled = value !== undefined; const [internalValue, setInternalValue] = React.useState<Date | null>(defaultValue); const selected = controlled ? value : internalValue;
  const controlledMonth = month !== undefined; const [internalMonth, setInternalMonth] = React.useState(() => startOfDay(defaultMonth ?? selected ?? new Date())); const visibleMonth = controlledMonth ? month : internalMonth;
  const [focused, setFocused] = React.useState(() => startOfDay(selected ?? new Date()));
  const setMonth = (next: Date) => { const normalized = new Date(next.getFullYear(), next.getMonth(), 1); if (!controlledMonth) setInternalMonth(normalized); onMonthChange?.(normalized); };
  const select = (date: Date) => { if (!controlled) setInternalValue(date); onValueChange?.(date); setFocused(date); };
  const first = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1); const offset = (first.getDay() - weekStartsOn + 7) % 7; const gridStart = addDays(first, -offset); const days = Array.from({ length: 42 }, (_, index) => addDays(gridStart, index));
  const weekdayFormatter = new Intl.DateTimeFormat(locale, { weekday: 'short' }); const monthFormatter = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }); const dayFormatter = new Intl.DateTimeFormat(locale, { dateStyle: 'full' });
  const weekdayBase = new Date(2024, 0, weekStartsOn === 1 ? 1 : 7);
  const isDisabled = (date: Date) => Boolean((min && startOfDay(date) < startOfDay(min)) || (max && startOfDay(date) > startOfDay(max)));
  const focusDate = (date: Date) => { setFocused(date); if (date.getMonth() !== visibleMonth.getMonth() || date.getFullYear() !== visibleMonth.getFullYear()) setMonth(date); requestAnimationFrame(() => document.querySelector<HTMLElement>(`[data-sillar-date="${date.getFullYear()}-${date.getMonth()}-${date.getDate()}"]`)?.focus()); };
  return <div {...props} ref={ref} data-slot="date-picker" className={cn('slr-date-picker', className)}>
    <div className="slr-date-picker__header"><button type="button" aria-label={previousLabel} className="slr-date-picker__nav" onClick={() => setMonth(addMonths(visibleMonth, -1))}>‹</button><div aria-live="polite" className="slr-date-picker__month">{monthFormatter.format(visibleMonth)}</div><button type="button" aria-label={nextLabel} className="slr-date-picker__nav" onClick={() => setMonth(addMonths(visibleMonth, 1))}>›</button></div>
    <div role="grid" aria-label={monthFormatter.format(visibleMonth)} className="slr-date-picker__grid"><div role="row" className="slr-date-picker__row">{Array.from({ length: 7 }, (_, index) => <div key={index} role="columnheader" aria-label={weekdayFormatter.format(addDays(weekdayBase, index))} className="slr-date-picker__weekday">{weekdayFormatter.format(addDays(weekdayBase, index)).slice(0, 2)}</div>)}</div>{Array.from({ length: 6 }, (_, week) => <div key={week} role="row" className="slr-date-picker__row">{days.slice(week * 7, week * 7 + 7).map((date) => { const outside = date.getMonth() !== visibleMonth.getMonth(); const active = selected ? sameDay(date, selected) : false; const disabled = isDisabled(date); return <button key={date.toISOString()} type="button" role="gridcell" aria-label={dayFormatter.format(date)} aria-selected={active} disabled={disabled} tabIndex={sameDay(date, focused) ? 0 : -1} data-sillar-date={`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`} data-outside={outside || undefined} data-today={sameDay(date, new Date()) || undefined} data-state={active ? 'selected' : 'unselected'} className="slr-date-picker__day" onClick={() => select(date)} onKeyDown={(event) => { let next: Date | null = null; if (event.key === 'ArrowLeft') next = addDays(date, -1); if (event.key === 'ArrowRight') next = addDays(date, 1); if (event.key === 'ArrowUp') next = addDays(date, -7); if (event.key === 'ArrowDown') next = addDays(date, 7); if (event.key === 'Home') next = addDays(date, -((date.getDay() - weekStartsOn + 7) % 7)); if (event.key === 'End') next = addDays(date, 6 - ((date.getDay() - weekStartsOn + 7) % 7)); if (event.key === 'PageUp') next = addMonths(date, -1); if (event.key === 'PageDown') next = addMonths(date, 1); if (next && !isDisabled(next)) { event.preventDefault(); focusDate(next); } }}>{date.getDate()}</button>; })}</div>)}</div>
  </div>;
});
DatePicker.displayName = 'DatePicker';
