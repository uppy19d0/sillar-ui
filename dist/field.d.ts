import * as React from 'react';
export interface FieldProps extends React.ComponentPropsWithoutRef<'div'> {
    invalid?: boolean;
}
export declare function Field({ className, invalid, ...props }: FieldProps): React.JSX.Element;
export interface FieldLabelProps extends React.ComponentPropsWithoutRef<'label'> {
    required?: boolean;
}
export declare function FieldLabel({ className, required, children, ...props }: FieldLabelProps): React.JSX.Element;
export declare function FieldDescription({ className, ...props }: React.ComponentPropsWithoutRef<'p'>): React.JSX.Element;
export declare function FieldError({ className, ...props }: React.ComponentPropsWithoutRef<'p'>): React.JSX.Element;
//# sourceMappingURL=field.d.ts.map