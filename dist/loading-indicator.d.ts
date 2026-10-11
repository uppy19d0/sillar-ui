import * as React from 'react';
export interface LoadingIndicatorProps extends React.ComponentPropsWithoutRef<'span'> {
    label?: string;
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
    /** Use inside an already labelled busy control to avoid duplicate announcements. */
    decorative?: boolean;
}
export declare const LoadingIndicator: React.ForwardRefExoticComponent<LoadingIndicatorProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=loading-indicator.d.ts.map