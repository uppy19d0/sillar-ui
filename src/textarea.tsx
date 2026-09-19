import * as React from 'react';
import { cn } from './utils';

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentPropsWithoutRef<'textarea'>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      data-slot="textarea"
      className={cn('slr-field slr-textarea', className)}
      {...props}
    />
  ),
);

Textarea.displayName = 'Textarea';
