import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './utils';

export const buttonVariants = cva('slr-button', {
  variants: {
    variant: {
      default: 'slr-button--default',
      destructive: 'slr-button--destructive',
      outline: 'slr-button--outline',
      secondary: 'slr-button--secondary',
      ghost: 'slr-button--ghost',
      link: 'slr-button--link',
    },
    size: {
      default: 'slr-button--md',
      sm: 'slr-button--sm',
      lg: 'slr-button--lg',
      icon: 'slr-button--icon',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type, ...props }, ref) => {
    const Component = asChild ? Slot : 'button';

    return (
      <Component
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size }), className)}
        type={asChild ? undefined : type ?? 'button'}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
