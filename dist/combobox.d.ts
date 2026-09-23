import * as React from 'react';
export interface ComboboxOption {
    value: string;
    label: string;
    disabled?: boolean;
    keywords?: string[];
}
export interface ComboboxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
    options: ComboboxOption[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    inputValue?: string;
    defaultInputValue?: string;
    onInputValueChange?: (value: string) => void;
    placeholder?: string;
    emptyMessage?: string;
    name?: string;
    disabled?: boolean;
}
export declare const Combobox: React.ForwardRefExoticComponent<ComboboxProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=combobox.d.ts.map