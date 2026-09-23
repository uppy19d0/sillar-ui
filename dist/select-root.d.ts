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
    name?: string;
    children: React.ReactNode;
}
export declare function SelectRoot({ value, defaultValue, onValueChange, open, defaultOpen, onOpenChange, disabled, name, children }: SelectRootProps): React.JSX.Element;
export declare const SelectTrigger: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;
export interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
    placeholder?: string;
}
export declare function SelectValue({ placeholder, className, ...props }: SelectValueProps): React.JSX.Element;
export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
    align?: Align;
    sideOffset?: number;
    collisionPadding?: number;
    portalContainer?: Element | DocumentFragment | null;
}
export declare const SelectContent: React.ForwardRefExoticComponent<SelectContentProps & React.RefAttributes<HTMLDivElement>>;
export interface SelectItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value: string;
    textValue?: string;
}
export declare const SelectItem: React.ForwardRefExoticComponent<SelectItemProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=select-root.d.ts.map