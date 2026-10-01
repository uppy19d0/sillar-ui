import * as React from 'react';
import { Input } from './input';
import { cn } from './utils';

export function parseNumericInput(input: string, locale = 'en-US') {
  const localeParts = Intl.NumberFormat(locale).formatToParts(1000.1);
  const localeDecimalSeparator = localeParts.find((part) => part.type === 'decimal')?.value ?? '.';
  const localeGroupSeparator = localeParts.find((part) => part.type === 'group')?.value ?? ',';
  const cleaned = input.trim().replaceAll(/\s/g, '').replace(/[^\d.,-]/g, '');
  if (!/\d/.test(cleaned)) return null;

  const firstMinus = cleaned.includes('-') ? '-' : '';
  const unsigned = cleaned.replaceAll('-', '');
  const lastDot = unsigned.lastIndexOf('.');
  const lastComma = unsigned.lastIndexOf(',');
  let decimalSeparator = '';

  if (lastDot >= 0 && lastComma >= 0) {
    decimalSeparator = lastDot > lastComma ? '.' : ',';
  } else if (lastDot >= 0 || lastComma >= 0) {
    const separator = lastDot >= 0 ? '.' : ',';
    const parts = unsigned.split(separator);
    const lastPart = parts.at(-1) ?? '';
    const looksLikeDecimal = lastPart.length > 0 && lastPart.length <= 2;

    if (separator === localeDecimalSeparator && lastPart.length > 0) {
      decimalSeparator = separator;
    } else if (separator !== localeGroupSeparator && looksLikeDecimal) {
      decimalSeparator = separator;
    } else if (parts.length === 2 && looksLikeDecimal && unsigned.length > 3) {
      decimalSeparator = separator;
    }
  }

  const decimalIndex = decimalSeparator ? unsigned.lastIndexOf(decimalSeparator) : -1;
  const integer = decimalIndex >= 0
    ? unsigned.slice(0, decimalIndex).replace(/\D/g, '')
    : unsigned.replace(/\D/g, '');
  const fraction = decimalIndex >= 0
    ? unsigned.slice(decimalIndex + 1).replace(/\D/g, '')
    : '';
  const normalized = `${firstMinus}${integer || '0'}${fraction ? `.${fraction}` : ''}`;
  const value = Number(normalized);

  return Number.isFinite(value) ? value : null;
}

function formatNumber(value: number, locale: string, options: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(locale, options).format(value);
}

function getInputDisplayValue(
  value: string | number | null | undefined,
  locale: string,
  options: Intl.NumberFormatOptions,
) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'number') return formatNumber(value, locale, options);
  return value;
}

export interface MoneyInputProps
  extends Omit<React.ComponentPropsWithoutRef<'input'>, 'type' | 'value' | 'defaultValue' | 'onChange' | 'inputMode'> {
  value?: string | number | null;
  defaultValue?: string | number | null;
  locale?: string;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  leadingLabel?: React.ReactNode;
  trailingLabel?: React.ReactNode;
  onValueChange?: (value: number | null, event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MoneyInput = React.forwardRef<HTMLInputElement, MoneyInputProps>(
  ({
    className,
    value,
    defaultValue,
    locale = 'en-US',
    currency = 'USD',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
    leadingLabel,
    trailingLabel,
    onValueChange,
    onBlur,
    ...props
  }, ref) => {
    const formatterOptions = React.useMemo<Intl.NumberFormatOptions>(() => ({
      currency,
      maximumFractionDigits,
      minimumFractionDigits,
      style: 'currency',
    }), [currency, maximumFractionDigits, minimumFractionDigits]);
    const [internalValue, setInternalValue] = React.useState(() => (
      getInputDisplayValue(defaultValue, locale, formatterOptions)
    ));
    const isControlled = value !== undefined;
    const displayValue = isControlled
      ? getInputDisplayValue(value, locale, formatterOptions)
      : internalValue;

    return (
      <span data-slot="money-input" className={cn('slr-number-input', className)}>
        {leadingLabel ? <span className="slr-number-input__adornment">{leadingLabel}</span> : null}
        <Input
          {...props}
          ref={ref}
          type="text"
          inputMode="decimal"
          value={displayValue}
          className="slr-number-input__control"
          onChange={(event) => {
            if (!isControlled) setInternalValue(event.target.value);
            onValueChange?.(parseNumericInput(event.target.value, locale), event);
          }}
          onBlur={(event) => {
            if (!isControlled) {
              const parsed = parseNumericInput(event.target.value, locale);
              setInternalValue(parsed === null ? '' : formatNumber(parsed, locale, formatterOptions));
            }
            onBlur?.(event);
          }}
        />
        <span className="slr-number-input__adornment" aria-hidden="true">
          {trailingLabel ?? currency}
        </span>
      </span>
    );
  },
);

MoneyInput.displayName = 'MoneyInput';

export interface PercentageInputProps
  extends Omit<React.ComponentPropsWithoutRef<'input'>, 'type' | 'value' | 'defaultValue' | 'onChange' | 'inputMode'> {
  value?: string | number | null;
  defaultValue?: string | number | null;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  onValueChange?: (value: number | null, event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PercentageInput = React.forwardRef<HTMLInputElement, PercentageInputProps>(
  ({
    className,
    value,
    defaultValue,
    locale = 'en-US',
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
    onValueChange,
    onBlur,
    ...props
  }, ref) => {
    const formatterOptions = React.useMemo<Intl.NumberFormatOptions>(() => ({
      maximumFractionDigits,
      minimumFractionDigits,
    }), [maximumFractionDigits, minimumFractionDigits]);
    const [internalValue, setInternalValue] = React.useState(() => (
      getInputDisplayValue(defaultValue, locale, formatterOptions)
    ));
    const isControlled = value !== undefined;
    const displayValue = isControlled
      ? getInputDisplayValue(value, locale, formatterOptions)
      : internalValue;

    return (
      <span data-slot="percentage-input" className={cn('slr-number-input', className)}>
        <Input
          {...props}
          ref={ref}
          type="text"
          inputMode="decimal"
          value={displayValue}
          className="slr-number-input__control"
          onChange={(event) => {
            if (!isControlled) setInternalValue(event.target.value);
            onValueChange?.(parseNumericInput(event.target.value, locale), event);
          }}
          onBlur={(event) => {
            if (!isControlled) {
              const parsed = parseNumericInput(event.target.value, locale);
              setInternalValue(parsed === null ? '' : formatNumber(parsed, locale, formatterOptions));
            }
            onBlur?.(event);
          }}
        />
        <span className="slr-number-input__adornment" aria-hidden="true">%</span>
      </span>
    );
  },
);

PercentageInput.displayName = 'PercentageInput';
