import * as React from 'react';
import { type Align } from './internal/positioning';
export interface SelectRootProps {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    form?: string;
    children: React.ReactNode;
}
export declare function SelectRoot({ value, defaultValue, onValueChange, open, defaultOpen, onOpenChange, disabled, required, name, form, children }: SelectRootProps): React.JSX.Element;
export declare const SelectTrigger: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;
export interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
    placeholder?: string;
}
export declare function SelectValue({ placeholder, className, ...props }: SelectValueProps): React.JSX.Element;
export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
    align?: Align;
    sideOffset?: number;
    collisionPadding?: number;
    loop?: boolean;
    portalContainer?: Element | DocumentFragment | null;
}
export declare const SelectContent: React.ForwardRefExoticComponent<SelectContentProps & React.RefAttributes<HTMLDivElement>>;
export interface SelectItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value: string;
    textValue?: string;
}
export declare const SelectItem: React.ForwardRefExoticComponent<SelectItemProps & React.RefAttributes<HTMLButtonElement>>;
export declare const SelectGroup: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export declare const SelectLabel: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export declare const SelectSeparator: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=select-root.d.ts.map