import * as React from 'react';
import { cn } from './utils';

export type TextFieldVariant = 'default' | 'filled' | 'glass' | 'elevated';
export type TextFieldTone = 'neutral' | 'success' | 'warning' | 'danger';
export type TextFieldSize = 'sm' | 'md' | 'lg';

export interface TextFieldProps
  extends Omit<React.ComponentPropsWithoutRef<'input'>, 'prefix' | 'size'> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  success?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  action?: React.ReactNode;
  variant?: TextFieldVariant;
  tone?: TextFieldTone;
  fieldSize?: TextFieldSize;
  hideLabel?: boolean;
  containerClassName?: string;
  inputClassName?: string;
  required?: boolean;
}

function mergeIds(...ids: Array<string | undefined>) {
  return ids.filter(Boolean).join(' ') || undefined;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({
    id,
    className,
    containerClassName,
    inputClassName,
    label,
    description,
    error,
    success,
    leading,
    trailing,
    action,
    variant = 'default',
    tone = 'neutral',
    fieldSize = 'md',
    hideLabel = false,
    required = false,
    disabled,
    'aria-describedby': ariaDescribedBy,
    'aria-invalid': ariaInvalid,
    maxLength,
    value,
    defaultValue,
    ...props
  }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const descriptionId = description ? `${inputId}-description` : undefined;
    const messageId = error || success ? `${inputId}-message` : undefined;
    const invalid = Boolean(error) || ariaInvalid === true || ariaInvalid === 'true';
    const resolvedTone = invalid ? 'danger' : tone;
    const textValue = value ?? defaultValue;
    const currentLength = typeof textValue === 'string' || typeof textValue === 'number'
      ? String(textValue).length
      : undefined;

    return (
      <div
        data-slot="text-field"
        data-variant={variant}
        data-tone={resolvedTone}
        data-size={fieldSize}
        data-disabled={disabled || undefined}
        data-invalid={invalid || undefined}
        className={cn('slr-text-field', containerClassName)}
      >
        {label ? (
          <label
            htmlFor={inputId}
            data-slot="text-field-label"
            className={cn('slr-text-field__label', hideLabel && 'slr-visually-hidden')}
          >
            {label}
            {required ? <span className="slr-text-field__required" aria-hidden="true">*</span> : null}
          </label>
        ) : null}
        <div className={cn('slr-text-field__control', className)}>
          {leading ? <span className="slr-text-field__adornment" data-position="leading" aria-hidden="true">{leading}</span> : null}
          <input
            {...props}
            ref={ref}
            id={inputId}
            data-slot="text-field-input"
            className={cn('slr-text-field__input', inputClassName)}
            disabled={disabled}
            required={required}
            aria-invalid={invalid || undefined}
            aria-describedby={mergeIds(ariaDescribedBy, descriptionId, messageId)}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
          />
          {trailing ? <span className="slr-text-field__adornment" data-position="trailing" aria-hidden="true">{trailing}</span> : null}
          {action ? <span className="slr-text-field__action">{action}</span> : null}
        </div>
        {description || error || success || maxLength ? (
          <div className="slr-text-field__meta">
            <div className="slr-text-field__messages">
              {description ? <p id={descriptionId} className="slr-text-field__description">{description}</p> : null}
              {error ? <p id={messageId} role="alert" className="slr-text-field__message">{error}</p> : null}
              {!error && success ? <p id={messageId} className="slr-text-field__message">{success}</p> : null}
            </div>
            {maxLength ? (
              <p className="slr-text-field__counter" aria-label={currentLength === undefined ? undefined : `${currentLength} of ${maxLength} characters`}>
                {currentLength ?? 0}/{maxLength}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  },
);

TextField.displayName = 'TextField';
