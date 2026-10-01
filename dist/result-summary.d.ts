import * as React from 'react';
import { type BadgeProps } from './badge';
export type ResultSummaryTone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info';
export interface ResultSummaryItem {
    label: React.ReactNode;
    value: React.ReactNode;
    description?: React.ReactNode;
    tone?: ResultSummaryTone;
}
export interface ResultSummaryProps extends Omit<React.ComponentPropsWithoutRef<'section'>, 'title'> {
    eyebrow?: React.ReactNode;
    title: React.ReactNode;
    value: React.ReactNode;
    description?: React.ReactNode;
    badge?: React.ReactNode;
    badgeVariant?: BadgeProps['variant'];
    tone?: ResultSummaryTone;
    items?: ResultSummaryItem[];
    actions?: React.ReactNode;
}
export declare function ResultSummary({ className, eyebrow, title, value, description, badge, badgeVariant, tone, items, actions, children, ...props }: ResultSummaryProps): React.JSX.Element;
export interface BreakdownListProps extends React.ComponentPropsWithoutRef<'dl'> {
    items: ResultSummaryItem[];
}
export declare function BreakdownList({ className, items, ...props }: BreakdownListProps): React.JSX.Element;
//# sourceMappingURL=result-summary.d.ts.map