import * as React from 'react';
import { cn } from './utils';

export interface FieldProps extends React.ComponentPropsWithoutRef<'div'> {
  invalid?: boolean;
}

export function Field({ className, invalid = false, ...props }: FieldProps) {
  return (
    <div
      data-slot="field"
      data-invalid={invalid || undefined}
      className={cn('slr-field-group', className)}
      {...props}
    />
  );
}

export interface FieldLabelProps extends React.ComponentPropsWithoutRef<'label'> {
  required?: boolean;
}

export function FieldLabel({ className, required = false, children, ...props }: FieldLabelProps) {
  return (
    <label data-slot="field-label" className={cn('slr-field-label', className)} {...props}>
      {children}
      {required ? <span className="slr-field-required" aria-hidden="true">*</span> : null}
    </label>
  );
}

export function FieldDescription({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) {
  return <p data-slot="field-description" className={cn('slr-field-description', className)} {...props} />;
}

export function FieldError({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) {
  return <p data-slot="field-error" role="alert" className={cn('slr-field-error', className)} {...props} />;
}
