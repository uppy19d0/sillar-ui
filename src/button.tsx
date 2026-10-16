import * as React from 'react';
import { Slot } from './slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './utils';
import { LoadingIndicator } from './loading-indicator';

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

function blockActivation(event: React.SyntheticEvent) {
  // React delegates touchstart to a passive listener. Preserve scrolling and
  // stop the press handlers; the later click is canceled separately.
  if (event.type !== 'touchstart') event.preventDefault();
  event.stopPropagation();
}

function guardActivationKey(handler: unknown) {
  return (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
      blockActivation(event);
    } else if (typeof handler === 'function') {
      handler(event);
    }
  };
}

function disabledHandlers(props: Record<string, unknown>) {
  const handlers: Record<string, unknown> = {};
  for (const event of ['onClick', 'onAuxClick', 'onDoubleClick', 'onPointerDown', 'onPointerUp', 'onMouseDown', 'onMouseUp', 'onTouchStart', 'onTouchEnd']) {
    handlers[event] = blockActivation;
    handlers[`${event}Capture`] = blockActivation;
  }
  for (const event of ['onKeyDown', 'onKeyUp', 'onKeyPress']) {
    handlers[event] = guardActivationKey(props[event]);
    handlers[`${event}Capture`] = guardActivationKey(props[`${event}Capture`]);
  }
  return handlers;
}

function disabledChild(child: React.ReactElement, loading: boolean) {
  const protectedProps: Record<string, unknown> = {
    ...disabledHandlers(child.props as Record<string, unknown>),
    'aria-disabled': true,
    tabIndex: -1,
  };
  if (loading) {
    protectedProps['aria-busy'] = true;
    protectedProps['data-loading'] = true;
  }
  // A custom component must forward these props to its interactive element.
  // Anchors use ARIA plus event guards; native controls also get disabled.
  if (typeof child.type !== 'string' || ['button', 'input', 'select', 'textarea', 'fieldset', 'optgroup', 'option'].includes(child.type)) {
    protectedProps.disabled = true;
  }
  return React.cloneElement(child, protectedProps);
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type, loading = false, disabled, children, onClick, tabIndex, ...props }, ref) => {
    const Component = asChild ? Slot : 'button';
    const isDisabled = disabled || loading;

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
      if (isDisabled) {
        blockActivation(event);
        return;
      }

      onClick?.(event);
    };

    return (
      <Component
        {...props}
        {...(asChild && isDisabled ? disabledHandlers(props) : {})}
        ref={ref}
        data-slot="button"
        data-loading={loading || undefined}
        className={cn(buttonVariants({ variant, size }), className)}
        type={asChild ? undefined : type ?? 'button'}
        disabled={asChild ? undefined : isDisabled}
        aria-busy={loading || props['aria-busy']}
        aria-disabled={isDisabled && (asChild || props['aria-disabled'] !== undefined) ? true : props['aria-disabled']}
        tabIndex={asChild && isDisabled ? -1 : tabIndex}
        onClick={handleClick}
      >
        {asChild ? (isDisabled && React.isValidElement(children) ? disabledChild(children, loading) : children) : (
          <>
            {loading ? <LoadingIndicator decorative size="sm" /> : null}
            {children}
          </>
        )}
      </Component>
    );
  },
);

Button.displayName = 'Button';
