import * as React from 'react';
import { type ButtonProps } from './button';
export interface EmptyStateAction {
    label: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    href?: string;
    variant?: ButtonProps['variant'];
}
export interface EmptyStateProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
    icon?: React.ReactNode;
    title: React.ReactNode;
    description?: React.ReactNode;
    actions?: EmptyStateAction[];
}
export declare function EmptyState({ className, icon, title, description, actions, children, ...props }: EmptyStateProps): React.JSX.Element;
export interface ErrorStateProps extends Omit<EmptyStateProps, 'icon'> {
    retryLabel?: React.ReactNode;
    onRetry?: React.MouseEventHandler<HTMLButtonElement>;
}
export declare function ErrorState({ actions, retryLabel, onRetry, ...props }: ErrorStateProps): React.JSX.Element;
export interface LoadingStateProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
    title?: React.ReactNode;
    description?: React.ReactNode;
    rows?: number;
}
export declare function LoadingState({ className, title, description, rows, ...props }: LoadingStateProps): React.JSX.Element;
//# sourceMappingURL=empty-state.d.ts.map