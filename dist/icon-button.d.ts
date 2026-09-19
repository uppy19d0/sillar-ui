import * as React from 'react';
import { type ButtonProps } from './button';
export interface IconButtonProps extends Omit<ButtonProps, 'aria-label' | 'children' | 'size'> {
    label: string;
    children: React.ReactNode;
    size?: 'sm' | 'default' | 'lg';
    tooltip?: string;
}
export declare const IconButton: React.ForwardRefExoticComponent<IconButtonProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=icon-button.d.ts.map