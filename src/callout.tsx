import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './utils';

export const calloutVariants = cva('slr-callout', {
  variants: {
    variant: {
      info: 'slr-callout--info',
      success: 'slr-callout--success',
      warning: 'slr-callout--warning',
      danger: 'slr-callout--danger',
    },
  },
  defaultVariants: { variant: 'info' },
});

export interface CalloutProps
  extends React.ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof calloutVariants> {}

export function Callout({ className, variant, ...props }: CalloutProps) {
  return (
    <div
      data-slot="callout"
      role={variant === 'danger' ? 'alert' : undefined}
      className={cn(calloutVariants({ variant }), className)}
      {...props}
    />
  );
}

export function CalloutIcon({ className, ...props }: React.ComponentPropsWithoutRef<'span'>) {
  return <span data-slot="callout-icon" className={cn('slr-callout__icon', className)} {...props} />;
}

export function CalloutTitle({ className, ...props }: React.ComponentPropsWithoutRef<'h3'>) {
  return <h3 data-slot="callout-title" className={cn('slr-callout__title', className)} {...props} />;
}

export function CalloutDescription({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div data-slot="callout-description" className={cn('slr-callout__description', className)} {...props} />;
}
