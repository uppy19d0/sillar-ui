import * as React from 'react';
import { type Align, type Side } from './internal/positioning';
export interface PopoverProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
}
export declare function Popover({ open, defaultOpen, onOpenChange, children }: PopoverProps): React.JSX.Element;
export interface PopoverTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
}
export declare const PopoverTrigger: React.ForwardRefExoticComponent<PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>>;
export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
    side?: Side;
    align?: Align;
    sideOffset?: number;
    collisionPadding?: number;
    portalContainer?: Element | DocumentFragment | null;
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
}
export declare const PopoverContent: React.ForwardRefExoticComponent<PopoverContentProps & React.RefAttributes<HTMLDivElement>>;
export declare const PopoverClose: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=popover.d.ts.map