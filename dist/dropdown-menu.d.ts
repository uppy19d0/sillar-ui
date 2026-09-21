import * as React from 'react';
export interface DropdownMenuProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
}
export declare function DropdownMenu({ open, defaultOpen, onOpenChange, children }: DropdownMenuProps): React.JSX.Element;
interface MenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
}
export declare const DropdownMenuTrigger: React.ForwardRefExoticComponent<MenuTriggerProps & React.RefAttributes<HTMLButtonElement>>;
export declare function DropdownMenuPortal({ children }: {
    children: React.ReactNode;
}): React.ReactPortal | null;
export interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
}
export declare const DropdownMenuContent: React.ForwardRefExoticComponent<DropdownMenuContentProps & React.RefAttributes<HTMLDivElement>>;
export interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    inset?: boolean;
    variant?: 'default' | 'destructive';
}
export declare const DropdownMenuItem: React.ForwardRefExoticComponent<DropdownMenuItemProps & React.RefAttributes<HTMLButtonElement>>;
export declare function DropdownMenuGroup(props: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
export declare function DropdownMenuLabel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
export declare function DropdownMenuSeparator({ className, ...props }: React.HTMLAttributes<HTMLHRElement>): React.JSX.Element;
export {};
//# sourceMappingURL=dropdown-menu.d.ts.map