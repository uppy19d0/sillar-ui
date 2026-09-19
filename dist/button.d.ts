import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
export declare const buttonVariants: (props?: ({
    variant?: "default" | "secondary" | "destructive" | "outline" | "link" | "ghost" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=button.d.ts.map