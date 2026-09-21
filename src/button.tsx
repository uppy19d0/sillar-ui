import * as React from 'react';
import { Slot } from './slot';
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
      iconSm: 'slr-button--icon-sm',
      icon: 'slr-button--icon',
      iconLg: 'slr-button--icon-lg',
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
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type, loading = false, disabled, children, onClick, tabIndex, ...props }, ref) => {
    const Component = asChild ? Slot : 'button';
    const isDisabled = disabled || loading;

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }

      onClick?.(event);
    };

    return (
      <Component
        ref={ref}
        data-slot="button"
        data-loading={loading || undefined}
        className={cn(buttonVariants({ variant, size }), className)}
        type={asChild ? undefined : type ?? 'button'}
        disabled={asChild ? undefined : isDisabled}
        aria-busy={loading || undefined}
        aria-disabled={asChild && isDisabled ? true : undefined}
        tabIndex={asChild && isDisabled ? -1 : tabIndex}
        onClick={handleClick}
        {...props}
      >
        {asChild ? children : (
          <>
            {loading ? <span className="slr-spinner" aria-hidden="true" /> : null}
            {children}
          </>
        )}
      </Component>
    );
  },
);

Button.displayName = 'Button';
