import * as React from 'react';
export interface ComboboxOption {
    value: string;
    label: string;
    disabled?: boolean;
    keywords?: string[];
    group?: string;
}
export interface ComboboxFilterContext {
    query: string;
    normalizedQuery: string;
}
export interface ComboboxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
    options: ComboboxOption[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    inputValue?: string;
    defaultInputValue?: string;
    onInputValueChange?: (value: string) => void;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    filter?: (option: ComboboxOption, context: ComboboxFilterContext) => boolean;
    onCreateOption?: (value: string) => void;
    placeholder?: string;
    emptyMessage?: string;
    loadingMessage?: string;
    createMessage?: (value: string) => string;
    loading?: boolean;
    loop?: boolean;
    name?: string;
    form?: string;
    required?: boolean;
    disabled?: boolean;
    inputProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'role' | 'name' | 'disabled' | 'required' | 'form'>;
}
export declare const Combobox: React.ForwardRefExoticComponent<ComboboxProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=combobox.d.ts.map