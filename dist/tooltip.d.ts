import * as React from 'react';
import { type Align, type Side } from './internal/positioning';
export interface TooltipProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    delayDuration?: number;
    children: React.ReactNode;
}
export declare function Tooltip({ open, defaultOpen, onOpenChange, delayDuration, children }: TooltipProps): React.JSX.Element;
export interface TooltipTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
}
export declare const TooltipTrigger: React.ForwardRefExoticComponent<TooltipTriggerProps & React.RefAttributes<HTMLButtonElement>>;
export interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
    side?: Side;
    align?: Align;
    sideOffset?: number;
    collisionPadding?: number;
    portalContainer?: Element | DocumentFragment | null;
}
export declare const TooltipContent: React.ForwardRefExoticComponent<TooltipContentProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=tooltip.d.ts.map