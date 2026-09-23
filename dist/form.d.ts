import * as React from 'react';
import { Slot } from './slot';
export type FormErrors<T> = Partial<Record<keyof T, string>>;
export interface UseFormOptions<T extends Record<string, unknown>> {
    initialValues: T;
    validate?: (values: T) => FormErrors<T>;
    onSubmit: (values: T) => void | Promise<void>;
}
export declare function useForm<T extends Record<string, unknown>>({ initialValues, validate, onSubmit }: UseFormOptions<T>): {
    values: T;
    errors: Partial<Record<keyof T, string>>;
    submitting: boolean;
    setValue: <K extends keyof T>(name: K, value: T[K]) => void;
    setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof T, string>>>>;
    handleSubmit: (event?: React.FormEvent) => Promise<boolean>;
    reset: () => void;
    field: <K extends keyof T>(name: K) => {
        name: string;
        value: string | number | readonly string[] | undefined;
        'aria-invalid': boolean;
        onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    };
};
export declare const Form: React.ForwardRefExoticComponent<React.FormHTMLAttributes<HTMLFormElement> & React.RefAttributes<HTMLFormElement>>;
export interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
    invalid?: boolean;
    required?: boolean;
}
export declare function FormItem({ invalid, required, className, children, ...props }: FormItemProps): React.JSX.Element;
export declare function FormLabel({ className, children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>): React.JSX.Element;
export interface FormControlProps extends React.ComponentPropsWithoutRef<typeof Slot> {
}
export declare const FormControl: React.ForwardRefExoticComponent<FormControlProps & React.RefAttributes<HTMLElement>>;
export declare function FormDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>): React.JSX.Element;
export declare function FormMessage({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>): React.JSX.Element | null;
//# sourceMappingURL=form.d.ts.map