import * as React from 'react';
import { useControllableState } from './internal';
import { cn } from './utils';

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, defaultChecked = false, onCheckedChange, onClick, className, disabled, type, ...props }, ref) => {
    const [resolvedChecked, setChecked] = useControllableState({
      value: checked,
      defaultValue: defaultChecked,
      onChange: onCheckedChange,
    });

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
          if (!event.defaultPrevented && !disabled) setChecked((current) => !current);
        }}
      >
        <span className="slr-switch__thumb" data-state={resolvedChecked ? 'checked' : 'unchecked'} />
      </button>
    );
  },
);

Switch.displayName = 'Switch';
