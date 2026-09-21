import * as React from 'react';
import { cn } from './utils';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  wrapperClassName?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, wrapperClassName, children, ...props }, ref) => (
    <span className={cn('slr-select-wrap', wrapperClassName)}>
      <select ref={ref} data-slot="select" className={cn('slr-field slr-select', className)} {...props}>
        {children}
      </select>
      <span className="slr-select-chevron" aria-hidden="true" />
    </span>
  ),
);

Select.displayName = 'Select';
