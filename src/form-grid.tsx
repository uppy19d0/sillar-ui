import * as React from 'react';
import { cn } from './utils';

export interface FormGridProps extends React.ComponentPropsWithoutRef<'div'> {
  columns?: 1 | 2 | 3 | 4;
  minColumnWidth?: string;
}

export function FormGrid({
  className,
  columns = 2,
  minColumnWidth = '16rem',
  style,
  ...props
}: FormGridProps) {
  return (
    <div
      data-slot="form-grid"
      data-columns={columns}
      className={cn('slr-form-grid', className)}
      style={{
        '--slr-form-grid-columns': columns,
        '--slr-form-grid-min': minColumnWidth,
        ...style,
      } as React.CSSProperties}
      {...props}
    />
  );
}

export interface FieldGroupProps extends React.ComponentPropsWithoutRef<'fieldset'> {
  legend: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}

export function FieldGroup({
  className,
  legend,
  description,
  actions,
  children,
  ...props
}: FieldGroupProps) {
  return (
    <fieldset data-slot="field-group-panel" className={cn('slr-field-group-panel', className)} {...props}>
      <div className="slr-field-group-panel__header">
        <div>
          <legend className="slr-field-group-panel__legend">{legend}</legend>
          {description ? <p className="slr-field-group-panel__description">{description}</p> : null}
        </div>
        {actions ? <div className="slr-field-group-panel__actions">{actions}</div> : null}
      </div>
      <div className="slr-field-group-panel__content">{children}</div>
    </fieldset>
  );
}
