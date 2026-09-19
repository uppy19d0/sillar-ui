import * as React from 'react';
import { Button, type ButtonProps } from './button';

export interface IconButtonProps extends Omit<ButtonProps, 'aria-label' | 'children' | 'size'> {
  label: string;
  children: React.ReactNode;
  size?: 'sm' | 'default' | 'lg';
  tooltip?: string;
}

const sizeMap = {
  sm: 'iconSm',
  default: 'icon',
  lg: 'iconLg',
} as const;

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ label, tooltip, size = 'default', children, ...props }, ref) => (
    <Button
      ref={ref}
      size={sizeMap[size]}
      aria-label={label}
      title={tooltip}
      {...props}
    >
      {children}
    </Button>
  ),
);

IconButton.displayName = 'IconButton';
