import * as React from 'react';
export interface SectionProps extends React.ComponentPropsWithoutRef<'section'> {
    containerClassName?: string;
}
export declare function Section({ className, containerClassName, children, ...props }: SectionProps): React.JSX.Element;
export declare function SectionHeader({ className, ...props }: React.ComponentPropsWithoutRef<'header'>): React.JSX.Element;
export declare function SectionEyebrow({ className, ...props }: React.ComponentPropsWithoutRef<'span'>): React.JSX.Element;
export declare function SectionTitle({ className, ...props }: React.ComponentPropsWithoutRef<'h2'>): React.JSX.Element;
export declare function SectionDescription({ className, ...props }: React.ComponentPropsWithoutRef<'p'>): React.JSX.Element;
//# sourceMappingURL=section.d.ts.map