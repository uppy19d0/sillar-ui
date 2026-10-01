import * as React from 'react';
export interface FormGridProps extends React.ComponentPropsWithoutRef<'div'> {
    columns?: 1 | 2 | 3 | 4;
    minColumnWidth?: string;
}
export declare function FormGrid({ className, columns, minColumnWidth, style, ...props }: FormGridProps): React.JSX.Element;
export interface FieldGroupProps extends React.ComponentPropsWithoutRef<'fieldset'> {
    legend: React.ReactNode;
    description?: React.ReactNode;
    actions?: React.ReactNode;
}
export declare function FieldGroup({ className, legend, description, actions, children, ...props }: FieldGroupProps): React.JSX.Element;
//# sourceMappingURL=form-grid.d.ts.map