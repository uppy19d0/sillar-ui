import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
export declare const badgeVariants: (props?: ({
    variant?: "default" | "secondary" | "destructive" | "outline" | "success" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface BadgeProps extends React.ComponentPropsWithoutRef<'span'>, VariantProps<typeof badgeVariants> {
    asChild?: boolean;
}
export declare function Badge({ className, variant, asChild, ...props }: BadgeProps): React.JSX.Element;
//# sourceMappingURL=badge.d.ts.map