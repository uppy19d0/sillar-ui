import * as React from 'react';
import { type BadgeProps } from './badge';
export interface CalculatorShellProps extends Omit<React.ComponentPropsWithoutRef<'section'>, 'title'> {
    eyebrow?: React.ReactNode;
    title: React.ReactNode;
    description?: React.ReactNode;
    badge?: React.ReactNode;
    badgeVariant?: BadgeProps['variant'];
    actions?: React.ReactNode;
    aside?: React.ReactNode;
    footer?: React.ReactNode;
    width?: 'default' | 'wide';
}
export declare function CalculatorShell({ className, eyebrow, title, description, badge, badgeVariant, actions, aside, footer, width, children, ...props }: CalculatorShellProps): React.JSX.Element;
export interface CalculatorPanelProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
    title?: React.ReactNode;
    description?: React.ReactNode;
    actions?: React.ReactNode;
}
export declare function CalculatorPanel({ className, title, description, actions, children, ...props }: CalculatorPanelProps): React.JSX.Element;
//# sourceMappingURL=calculator-shell.d.ts.map