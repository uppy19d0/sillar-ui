import * as React from 'react';
import { useControllableState } from './internal';
import { cn } from './utils';

export interface ComboboxOption { value: string; label: string; disabled?: boolean; keywords?: string[] }
export interface ComboboxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  inputValue?: string;
  defaultInputValue?: string;
  onInputValueChange?: (value: string) => void;
  placeholder?: string;
  emptyMessage?: string;
  name?: string;
  disabled?: boolean;
}

export const Combobox = React.forwardRef<HTMLDivElement, ComboboxProps>(({ options, value, defaultValue = '', onValueChange, inputValue, defaultInputValue = '', onInputValueChange, placeholder = 'Search options', emptyMessage = 'No options found', name, disabled, className, ...props }, ref) => {
  const [selected, setSelected] = useControllableState({ value, defaultValue, onChange: onValueChange });
  const initialLabel = options.find((option) => option.value === defaultValue)?.label ?? defaultInputValue;
  const [query, setQuery] = useControllableState({ value: inputValue, defaultValue: initialLabel, onChange: onInputValueChange });
  const [open, setOpen] = React.useState(false); const [activeIndex, setActiveIndex] = React.useState(0); const listboxId = React.useId();
  const filtered = React.useMemo(() => { const normalized = query.trim().toLocaleLowerCase(); if (!normalized || options.some((option) => option.value === selected && option.label === query)) return options; return options.filter((option) => [option.label, option.value, ...(option.keywords ?? [])].some((entry) => entry.toLocaleLowerCase().includes(normalized))); }, [options, query, selected]);
  const choose = (option: ComboboxOption) => { if (option.disabled) return; setSelected(option.value); setQuery(option.label); setOpen(false); };
  return <div {...props} ref={ref} data-slot="combobox" className={cn('slr-combobox', className)}>
    <input role="combobox" aria-autocomplete="list" aria-controls={listboxId} aria-expanded={open} aria-activedescendant={open && filtered[activeIndex] ? `${listboxId}-${activeIndex}` : undefined} disabled={disabled} value={query} placeholder={placeholder} className="slr-field slr-input slr-combobox__input" onFocus={() => setOpen(true)} onBlur={(event) => { if (!event.currentTarget.parentElement?.contains(event.relatedTarget)) setOpen(false); }} onChange={(event) => { setQuery(event.target.value); setOpen(true); setActiveIndex(0); }} onKeyDown={(event) => { if (event.key === 'ArrowDown') { event.preventDefault(); setOpen(true); setActiveIndex((index) => Math.min(index + 1, filtered.length - 1)); } else if (event.key === 'ArrowUp') { event.preventDefault(); setActiveIndex((index) => Math.max(index - 1, 0)); } else if (event.key === 'Enter' && open && filtered[activeIndex]) { event.preventDefault(); choose(filtered[activeIndex]); } else if (event.key === 'Escape') { setOpen(false); } }} />
    {open && <div id={listboxId} role="listbox" data-slot="combobox-content" className="slr-combobox__content">{filtered.length === 0 ? <div className="slr-combobox__empty">{emptyMessage}</div> : filtered.map((option, index) => <button key={option.value} id={`${listboxId}-${index}`} type="button" role="option" aria-selected={selected === option.value} aria-disabled={option.disabled || undefined} disabled={option.disabled} tabIndex={-1} data-active={activeIndex === index || undefined} className="slr-combobox__option" onMouseDown={(event) => event.preventDefault()} onPointerMove={() => setActiveIndex(index)} onClick={() => choose(option)}><span aria-hidden="true">{selected === option.value ? '✓' : ''}</span>{option.label}</button>)}</div>}
    {name && <input type="hidden" name={name} value={selected} />}
  </div>;
});
Combobox.displayName = 'Combobox';
