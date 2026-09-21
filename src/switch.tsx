import * as React from 'react';
import { cn } from './utils';

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, defaultChecked = false, onCheckedChange, onClick, className, disabled, type, ...props }, ref) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const isControlled = checked !== undefined;
    const resolvedChecked = isControlled ? checked : internalChecked;

    const updateChecked = (next: boolean) => {
      if (!isControlled) setInternalChecked(next);
      onCheckedChange?.(next);
    };

    return (
      <button
        {...props}
        ref={ref}
        type={type ?? 'button'}
        role="switch"
        aria-checked={resolvedChecked}
        disabled={disabled}
        data-slot="switch"
        data-state={resolvedChecked ? 'checked' : 'unchecked'}
        className={cn('slr-switch', className)}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented && !disabled) updateChecked(!resolvedChecked);
        }}
      >
        <span className="slr-switch__thumb" data-state={resolvedChecked ? 'checked' : 'unchecked'} />
      </button>
    );
  },
);

Switch.displayName = 'Switch';
