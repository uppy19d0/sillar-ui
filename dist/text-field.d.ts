import * as React from 'react';
export type TextFieldVariant = 'default' | 'filled' | 'glass' | 'elevated';
export type TextFieldTone = 'neutral' | 'success' | 'warning' | 'danger';
export type TextFieldSize = 'sm' | 'md' | 'lg';
export interface TextFieldProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'prefix' | 'size'> {
    label?: React.ReactNode;
    description?: React.ReactNode;
    error?: React.ReactNode;
    success?: React.ReactNode;
    leading?: React.ReactNode;
    trailing?: React.ReactNode;
    action?: React.ReactNode;
    variant?: TextFieldVariant;
    tone?: TextFieldTone;
    fieldSize?: TextFieldSize;
    hideLabel?: boolean;
    containerClassName?: string;
    inputClassName?: string;
    required?: boolean;
}
export declare const TextField: React.ForwardRefExoticComponent<TextFieldProps & React.RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=text-field.d.ts.map