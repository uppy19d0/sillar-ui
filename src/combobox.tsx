import * as React from 'react';
import { useControllableState } from './internal';
import { cn } from './utils';

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
  keywords?: string[];
  group?: string;
}

export interface ComboboxFilterContext {
  query: string;
  normalizedQuery: string;
}

export interface ComboboxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  inputValue?: string;
  defaultInputValue?: string;
  onInputValueChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  filter?: (option: ComboboxOption, context: ComboboxFilterContext) => boolean;
  onCreateOption?: (value: string) => void;
  placeholder?: string;
  emptyMessage?: string;
  loadingMessage?: string;
  createMessage?: (value: string) => string;
  loading?: boolean;
  loop?: boolean;
  name?: string;
  form?: string;
  required?: boolean;
  disabled?: boolean;
  inputProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'role' | 'name' | 'disabled' | 'required' | 'form'>;
}

function defaultFilter(option: ComboboxOption, { normalizedQuery }: ComboboxFilterContext) {
  return [option.label, option.value, ...(option.keywords ?? [])]
    .some((entry) => entry.toLocaleLowerCase().includes(normalizedQuery));
}

function nextEnabledIndex(options: ComboboxOption[], current: number, direction: 1 | -1, loop: boolean) {
  if (!options.some((option) => !option.disabled)) return -1;
  let index = current;
  for (let step = 0; step < options.length; step += 1) {
    index += direction;
    if (loop) index = (index + options.length) % options.length;
    if (!loop && (index < 0 || index >= options.length)) return current;
    if (!options[index]?.disabled) return index;
  }
  return current;
}

function edgeEnabledIndex(options: ComboboxOption[], edge: 'first' | 'last') {
  if (edge === 'first') return options.findIndex((option) => !option.disabled);
  for (let index = options.length - 1; index >= 0; index -= 1) if (!options[index].disabled) return index;
  return -1;
}

export const Combobox = React.forwardRef<HTMLDivElement, ComboboxProps>(({
  options,
  value,
  defaultValue = '',
  onValueChange,
  inputValue,
  defaultInputValue = '',
  onInputValueChange,
  open,
  defaultOpen = false,
  onOpenChange,
  filter = defaultFilter,
  onCreateOption,
  placeholder = 'Search options',
  emptyMessage = 'No options found',
  loadingMessage = 'Loading options',
  createMessage = (query) => `Create “${query}”`,
  loading = false,
  loop = true,
  name,
  form,
  required = false,
  disabled = false,
  inputProps,
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...props
}, ref) => {
  const [selected, setSelected] = useControllableState({ value, defaultValue, onChange: onValueChange });
  const initialLabel = options.find((option) => option.value === defaultValue)?.label ?? defaultInputValue;
  const [query, setQuery] = useControllableState({ value: inputValue, defaultValue: initialLabel, onChange: onInputValueChange });
  const [resolvedOpen, setOpen] = useControllableState({ value: open, defaultValue: defaultOpen, onChange: onOpenChange });
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const listboxId = React.useId();
  const statusId = React.useId();

  const filtered = React.useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    if (!normalizedQuery || options.some((option) => option.value === selected && option.label === query)) return options;
    return options.filter((option) => filter(option, { query, normalizedQuery }));
  }, [filter, options, query, selected]);

  React.useEffect(() => {
    setActiveIndex((current) => {
      if (current >= 0 && current < filtered.length && !filtered[current].disabled) return current;
      return edgeEnabledIndex(filtered, 'first');
    });
  }, [filtered]);

  React.useEffect(() => {
    if (inputValue !== undefined) return;
    const selectedOption = options.find((option) => option.value === selected);
    if (selectedOption && query !== selectedOption.label && value !== undefined) setQuery(selectedOption.label);
  }, [inputValue, options, query, selected, setQuery, value]);

  const choose = React.useCallback((option: ComboboxOption) => {
    if (option.disabled) return;
    setSelected(option.value);
    setQuery(option.label);
    setOpen(false);
  }, [setOpen, setQuery, setSelected]);

  const trimmedQuery = query.trim();
  const canCreate = Boolean(onCreateOption && trimmedQuery && !loading && !options.some((option) => option.label.toLocaleLowerCase() === trimmedQuery.toLocaleLowerCase()));
  const describedBy = [inputProps?.['aria-describedby'], statusId].filter(Boolean).join(' ') || undefined;

  return <div {...props} ref={ref} data-slot="combobox" data-state={resolvedOpen ? 'open' : 'closed'} className={cn('slr-combobox', className)}>
    <input
      {...inputProps}
      role="combobox"
      aria-label={inputProps?.['aria-label'] ?? ariaLabel}
      aria-labelledby={inputProps?.['aria-labelledby'] ?? ariaLabelledBy}
      aria-describedby={describedBy}
      aria-autocomplete="list"
      aria-controls={listboxId}
      aria-expanded={resolvedOpen}
      aria-activedescendant={resolvedOpen && activeIndex >= 0 ? `${listboxId}-${activeIndex}` : undefined}
      aria-busy={loading || undefined}
      disabled={disabled}
      required={required}
      value={query}
      placeholder={placeholder}
      className={cn('slr-field slr-input slr-combobox__input', inputProps?.className)}
      onFocus={(event) => { inputProps?.onFocus?.(event); if (!event.defaultPrevented) setOpen(true); }}
      onBlur={(event) => { inputProps?.onBlur?.(event); if (!event.defaultPrevented && !event.currentTarget.parentElement?.contains(event.relatedTarget)) setOpen(false); }}
      onChange={(event) => { setQuery(event.target.value); setOpen(true); }}
      onKeyDown={(event) => {
        inputProps?.onKeyDown?.(event);
        if (event.defaultPrevented) return;
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault();
          setOpen(true);
          setActiveIndex((index) => nextEnabledIndex(filtered, index, event.key === 'ArrowDown' ? 1 : -1, loop));
        } else if (event.key === 'Home' || event.key === 'End') {
          event.preventDefault();
          setActiveIndex(edgeEnabledIndex(filtered, event.key === 'Home' ? 'first' : 'last'));
        } else if (event.key === 'Enter' && resolvedOpen) {
          if (filtered[activeIndex] && !filtered[activeIndex].disabled) {
            event.preventDefault();
            choose(filtered[activeIndex]);
          } else if (canCreate) {
            event.preventDefault();
            onCreateOption?.(trimmedQuery);
            setOpen(false);
          }
        } else if (event.key === 'Escape') {
          if (resolvedOpen) event.preventDefault();
          setOpen(false);
        }
      }}
    />
    <span id={statusId} className="slr-visually-hidden" role="status" aria-live="polite">{loading ? loadingMessage : `${filtered.length} options available`}</span>
    {resolvedOpen && <div id={listboxId} role="listbox" aria-busy={loading || undefined} data-slot="combobox-content" className="slr-combobox__content">
      {loading
        ? <div role="presentation" className="slr-combobox__empty">{loadingMessage}</div>
        : filtered.length === 0 && !canCreate
          ? <div role="presentation" className="slr-combobox__empty">{emptyMessage}</div>
          : renderOptions(filtered, { activeIndex, listboxId, selected, setActiveIndex, choose })}
      {canCreate && <button type="button" role="option" aria-selected="false" className="slr-combobox__option slr-combobox__create" onMouseDown={(event) => event.preventDefault()} onClick={() => { onCreateOption?.(trimmedQuery); setOpen(false); }}><span aria-hidden="true">+</span>{createMessage(trimmedQuery)}</button>}
    </div>}
    {name && <input type="hidden" name={name} value={selected} disabled={disabled} form={form} />}
  </div>;
});
Combobox.displayName = 'Combobox';

interface RenderOptionsContext {
  activeIndex: number;
  listboxId: string;
  selected: string;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  choose: (option: ComboboxOption) => void;
}

function renderOptions(options: ComboboxOption[], context: RenderOptionsContext) {
  const groups = new Map<string, Array<{ option: ComboboxOption; index: number }>>();
  options.forEach((option, index) => {
    const group = option.group ?? '';
    groups.set(group, [...(groups.get(group) ?? []), { option, index }]);
  });
  return Array.from(groups, ([group, entries]) => {
    const content = entries.map(({ option, index }) => <button key={option.value} id={`${context.listboxId}-${index}`} type="button" role="option" aria-selected={context.selected === option.value} aria-disabled={option.disabled || undefined} disabled={option.disabled} tabIndex={-1} data-active={context.activeIndex === index || undefined} className="slr-combobox__option" onMouseDown={(event) => event.preventDefault()} onPointerMove={() => { if (!option.disabled) context.setActiveIndex(index); }} onClick={() => context.choose(option)}><span aria-hidden="true">{context.selected === option.value ? '✓' : ''}</span>{option.label}</button>);
    if (!group) return <React.Fragment key="ungrouped">{content}</React.Fragment>;
    return <div key={group} role="group" aria-label={group} className="slr-combobox__group"><div role="presentation" className="slr-combobox__label">{group}</div>{content}</div>;
  });
}
