import * as React from 'react';
export interface VisuallyHiddenProps extends React.ComponentPropsWithoutRef<'span'> {
    asChild?: boolean;
}
export declare function VisuallyHidden({ asChild, className, ...props }: VisuallyHiddenProps): React.JSX.Element;
export declare function SkipLink({ className, ...props }: React.ComponentPropsWithoutRef<'a'>): React.JSX.Element;
//# sourceMappingURL=a11y.d.ts.map