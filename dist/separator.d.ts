import * as React from 'react';
export interface SeparatorProps extends React.ComponentPropsWithoutRef<'div'> {
    orientation?: 'horizontal' | 'vertical';
    decorative?: boolean;
}
export declare function Separator({ className, orientation, decorative, ...props }: SeparatorProps): React.JSX.Element;
//# sourceMappingURL=separator.d.ts.map