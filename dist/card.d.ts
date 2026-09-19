import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
export declare const cardVariants: (props?: ({
    variant?: "default" | "outline" | "elevated" | "subtle" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface CardProps extends React.ComponentPropsWithoutRef<'div'>, VariantProps<typeof cardVariants> {
}
export declare function Card({ className, variant, ...props }: CardProps): React.JSX.Element;
export declare function CardHeader({ className, ...props }: React.ComponentPropsWithoutRef<'div'>): React.JSX.Element;
export declare function CardTitle({ className, ...props }: React.ComponentPropsWithoutRef<'h3'>): React.JSX.Element;
export declare function CardDescription({ className, ...props }: React.ComponentPropsWithoutRef<'p'>): React.JSX.Element;
export declare function CardAction({ className, ...props }: React.ComponentPropsWithoutRef<'div'>): React.JSX.Element;
export declare function CardContent({ className, ...props }: React.ComponentPropsWithoutRef<'div'>): React.JSX.Element;
export declare function CardFooter({ className, ...props }: React.ComponentPropsWithoutRef<'div'>): React.JSX.Element;
//# sourceMappingURL=card.d.ts.map