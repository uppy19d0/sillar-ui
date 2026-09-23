import * as React from 'react';
import { Slot } from './slot';
import { cn } from './utils';

export type FormErrors<T> = Partial<Record<keyof T, string>>;
export interface UseFormOptions<T extends Record<string, unknown>> { initialValues: T; validate?: (values: T) => FormErrors<T>; onSubmit: (values: T) => void | Promise<void> }
export function useForm<T extends Record<string, unknown>>({ initialValues, validate, onSubmit }: UseFormOptions<T>) {
  const [values, setValues] = React.useState(initialValues); const [errors, setErrors] = React.useState<FormErrors<T>>({}); const [submitting, setSubmitting] = React.useState(false);
  const setValue = React.useCallback(<K extends keyof T>(name: K, value: T[K]) => { setValues((current) => ({ ...current, [name]: value })); setErrors((current) => ({ ...current, [name]: undefined })); }, []);
  const handleSubmit = React.useCallback(async (event?: React.FormEvent) => { event?.preventDefault(); const nextErrors = validate?.(values) ?? {}; setErrors(nextErrors); if (Object.values(nextErrors).some(Boolean)) return false; setSubmitting(true); try { await onSubmit(values); return true; } finally { setSubmitting(false); } }, [onSubmit, validate, values]);
  const reset = React.useCallback(() => { setValues(initialValues); setErrors({}); }, [initialValues]);
  return { values, errors, submitting, setValue, setErrors, handleSubmit, reset, field: <K extends keyof T>(name: K) => ({ name: String(name), value: values[name] as string | number | readonly string[] | undefined, 'aria-invalid': Boolean(errors[name]), onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setValue(name, event.target.value as T[K]) }) };
}

export const Form = React.forwardRef<HTMLFormElement, React.FormHTMLAttributes<HTMLFormElement>>(({ className, ...props }, ref) => <form {...props} ref={ref} noValidate={props.noValidate ?? true} className={cn('slr-form', className)} />);
Form.displayName = 'Form';

type FormFieldContextValue = { id: string; invalid: boolean; required: boolean };
const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);
function useFormField(name: string) { const value = React.useContext(FormFieldContext); if (!value) throw new Error(`${name} must be rendered inside FormItem.`); return value; }
export interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> { invalid?: boolean; required?: boolean }
export function FormItem({ invalid = false, required = false, className, children, ...props }: FormItemProps) { const id = React.useId(); return <FormFieldContext.Provider value={{ id, invalid, required }}><div {...props} data-invalid={invalid || undefined} className={cn('slr-form__item', className)}>{children}</div></FormFieldContext.Provider>; }
export function FormLabel({ className, children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) { const field = useFormField('FormLabel'); return <label {...props} htmlFor={props.htmlFor ?? field.id} className={cn('slr-form__label', className)}>{children}{field.required && <span aria-hidden="true" className="slr-form__required">*</span>}</label>; }
export interface FormControlProps extends React.ComponentPropsWithoutRef<typeof Slot> {}
export const FormControl = React.forwardRef<HTMLElement, FormControlProps>((props, ref) => { const field = useFormField('FormControl'); return <Slot {...props} ref={ref} id={field.id} aria-invalid={field.invalid || undefined} aria-describedby={field.invalid ? `${field.id}-message` : undefined} />; });
FormControl.displayName = 'FormControl';
export function FormDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) { return <p {...props} className={cn('slr-form__description', className)} />; }
export function FormMessage({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) { const field = useFormField('FormMessage'); if (!field.invalid && !props.children) return null; return <p {...props} id={`${field.id}-message`} role="alert" className={cn('slr-form__message', className)} />; }
