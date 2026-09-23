import * as React from 'react';
export type ToastVariant = 'default' | 'success' | 'warning' | 'danger';
export interface ToastInput {
    id?: string;
    title: React.ReactNode;
    description?: React.ReactNode;
    variant?: ToastVariant;
    duration?: number;
    action?: React.ReactNode;
}
export interface ToastProviderProps {
    children: React.ReactNode;
    duration?: number;
}
export declare function ToastProvider({ children, duration }: ToastProviderProps): React.JSX.Element;
export declare function useToast(): {
    toast: (input: ToastInput) => string;
    dismiss: (id: string) => void;
};
export interface ToastViewportProps extends React.HTMLAttributes<HTMLDivElement> {
    closeLabel?: string;
}
export declare const ToastViewport: React.ForwardRefExoticComponent<ToastViewportProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=toast.d.ts.map