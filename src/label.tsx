import * as React from 'react';
import { cn } from './utils';

export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label ref={ref} data-slot="label" className={cn('slr-label', className)} {...props} />
  ),
);

Label.displayName = 'Label';
