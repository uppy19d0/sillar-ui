import * as React from 'react';
import { cn } from './utils';

export const Input = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<'input'>>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn('slr-field slr-input', className)}
      {...props}
    />
  ),
);

Input.displayName = 'Input';
