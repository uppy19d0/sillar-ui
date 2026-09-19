import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
export declare const calloutVariants: (props?: ({
    variant?: "success" | "info" | "warning" | "danger" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface CalloutProps extends React.ComponentPropsWithoutRef<'div'>, VariantProps<typeof calloutVariants> {
}
export declare function Callout({ className, variant, ...props }: CalloutProps): React.JSX.Element;
export declare function CalloutIcon({ className, ...props }: React.ComponentPropsWithoutRef<'span'>): React.JSX.Element;
export declare function CalloutTitle({ className, ...props }: React.ComponentPropsWithoutRef<'h3'>): React.JSX.Element;
export declare function CalloutDescription({ className, ...props }: React.ComponentPropsWithoutRef<'div'>): React.JSX.Element;
//# sourceMappingURL=callout.d.ts.map