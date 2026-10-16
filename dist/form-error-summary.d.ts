import * as React from 'react';
export interface FormErrorSummaryEntry {
    id: string;
    message: React.ReactNode;
}
export interface FormErrorSummaryProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'children'> {
    errors: readonly FormErrorSummaryEntry[];
    /** Localize this heading in the application. */
    title?: React.ReactNode;
}
/** A caller-focusable summary. Rendering errors never moves focus automatically. */
export declare const FormErrorSummary: React.ForwardRefExoticComponent<FormErrorSummaryProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=form-error-summary.d.ts.map