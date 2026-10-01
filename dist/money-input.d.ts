import * as React from 'react';
export declare function parseNumericInput(input: string, locale?: string): number | null;
export interface MoneyInputProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'type' | 'value' | 'defaultValue' | 'onChange' | 'inputMode'> {
    value?: string | number | null;
    defaultValue?: string | number | null;
    locale?: string;
    currency?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    leadingLabel?: React.ReactNode;
    trailingLabel?: React.ReactNode;
    onValueChange?: (value: number | null, event: React.ChangeEvent<HTMLInputElement>) => void;
}
export declare const MoneyInput: React.ForwardRefExoticComponent<MoneyInputProps & React.RefAttributes<HTMLInputElement>>;
export interface PercentageInputProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'type' | 'value' | 'defaultValue' | 'onChange' | 'inputMode'> {
    value?: string | number | null;
    defaultValue?: string | number | null;
    locale?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    onValueChange?: (value: number | null, event: React.ChangeEvent<HTMLInputElement>) => void;
}
export declare const PercentageInput: React.ForwardRefExoticComponent<PercentageInputProps & React.RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=money-input.d.ts.map