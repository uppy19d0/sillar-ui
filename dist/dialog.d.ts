import * as React from 'react';
export interface DialogProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
}
export declare function Dialog({ open, defaultOpen, onOpenChange, children }: DialogProps): React.JSX.Element;
interface DialogActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
}
export declare const DialogTrigger: React.ForwardRefExoticComponent<DialogActionProps & React.RefAttributes<HTMLButtonElement>>;
export declare const DialogClose: React.ForwardRefExoticComponent<DialogActionProps & React.RefAttributes<HTMLButtonElement>>;
export interface DialogPortalProps extends React.HTMLAttributes<HTMLDivElement> {
    container?: Element | DocumentFragment | null;
}
export declare function DialogPortal({ children, container, className, ...props }: DialogPortalProps): React.ReactPortal | null;
export declare const DialogOverlay: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
    overlayClassName?: string;
    portalContainer?: Element | DocumentFragment | null;
    initialFocusRef?: React.RefObject<HTMLElement | null>;
    finalFocusRef?: React.RefObject<HTMLElement | null>;
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
}
export declare const DialogContent: React.ForwardRefExoticComponent<DialogContentProps & React.RefAttributes<HTMLDivElement>>;
export declare const DialogHeader: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => React.JSX.Element;
export declare const DialogFooter: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => React.JSX.Element;
export declare const DialogTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
export declare const DialogDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
export {};
//# sourceMappingURL=dialog.d.ts.map