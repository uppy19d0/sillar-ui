import * as React from 'react';
import { Slot } from './slot';
import { cn } from './utils';

const useCommitEffect = typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

export type FormErrors<T> = Partial<Record<keyof T, string>>;
export interface UseFormOptions<T extends Record<string, unknown>> {
  initialValues: T;
  validate?: (values: T) => FormErrors<T>;
  onSubmit: (values: T) => void | Promise<void>;
}

export function useForm<T extends Record<string, unknown>>({ initialValues, validate, onSubmit }: UseFormOptions<T>) {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState<FormErrors<T>>({});
  const [submitting, setSubmitting] = React.useState(false);
  const valuesRef = React.useRef(values);
  const optionsRef = React.useRef({ initialValues, validate, onSubmit });
  const inFlightRef = React.useRef(false);
  const mountedRef = React.useRef(true);
  // Publish callbacks/defaults only after commit. A suspended parent render
  // must not replace the callbacks used by the still-visible form.
  useCommitEffect(() => {
    optionsRef.current = { initialValues, validate, onSubmit };
  }, [initialValues, validate, onSubmit]);

  useCommitEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  const setValue = React.useCallback(<K extends keyof T>(name: K, value: T[K]) => {
    // Keep the imperative snapshot current even before React renders a batched update.
    const next = { ...valuesRef.current, [name]: value };
    valuesRef.current = next;
    setValues(next);
    setErrors((current) => ({ ...current, [name]: undefined }));
  }, []);

  const handleSubmit = React.useCallback(async (event?: React.FormEvent) => {
    event?.preventDefault();
    if (inFlightRef.current) return false;
    inFlightRef.current = true;
    try {
      const snapshot = valuesRef.current;
      const options = optionsRef.current;
      const nextErrors = options.validate?.(snapshot) ?? {};
      setErrors(nextErrors);
      if (Object.values(nextErrors).some(Boolean)) return false;
      setSubmitting(true);
      await options.onSubmit(snapshot);
      return true;
    } finally {
      inFlightRef.current = false;
      if (mountedRef.current) setSubmitting(false);
    }
  }, []);

  const reset = React.useCallback(() => {
    const next = optionsRef.current.initialValues;
    valuesRef.current = next;
    setValues(next);
    setErrors({});
    // Resetting a draft does not cancel an already running submission.
    // Its lock and busy state remain until the actual promise settles.
  }, []);

  return {
    values, errors, submitting, setValue, setErrors, handleSubmit, reset,
    field: <K extends keyof T>(name: K) => ({
      name: String(name),
      value: values[name] as string | number | readonly string[] | undefined,
      'aria-invalid': Boolean(errors[name]),
      onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setValue(name, event.target.value as T[K]),
    }),
  };
}

export const Form = React.forwardRef<HTMLFormElement, React.FormHTMLAttributes<HTMLFormElement>>(
  ({ className, ...props }, ref) => <form {...props} ref={ref} noValidate={props.noValidate ?? true} className={cn('slr-form', className)} />,
);
Form.displayName = 'Form';

type FormFieldContextValue = { id: string; invalid: boolean; required: boolean; descriptionId?: string; messageId?: string };
const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);
function useFormField(name: string) {
  const value = React.useContext(FormFieldContext);
  if (!value) throw new Error(`${name} must be rendered inside FormItem.`);
  return value;
}

type DeclarativePart = React.ReactElement<{ id?: string; children?: React.ReactNode }>;
// Only inspect direct declarative parts and fragments. Opaque component output
// is never rendered or guessed; those compositions can use explicit controlId/ARIA IDs.
function findPart(children: React.ReactNode, type: unknown, depth = 0): DeclarativePart | undefined {
  if (depth > 8) return undefined;
  const nodes = React.Children.toArray(children);
  for (const node of nodes.slice(0, 128)) {
    if (!React.isValidElement(node)) continue;
    const element = node as DeclarativePart;
    if (element.type === type) return element;
    if (element.type === React.Fragment) {
      const result = findPart(element.props.children, type, depth + 1);
      if (result) return result;
    }
  }
  return undefined;
}
function mergeIds(...values: Array<string | undefined>) {
  return [...new Set(values.flatMap((value) => value?.split(/\s+/).filter(Boolean) ?? []))].join(' ') || undefined;
}

export interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  invalid?: boolean;
  required?: boolean;
  /** Stable control ID for labels, descriptions, validation messages and summary links. */
  controlId?: string;
}
export function FormItem({ invalid = false, required = false, controlId, className, children, ...props }: FormItemProps) {
  const generatedId = React.useId();
  const control = findPart(children, FormControl);
  const controlChild = React.isValidElement(control?.props.children) ? control.props.children as DeclarativePart : undefined;
  const id = controlChild?.props.id ?? control?.props.id ?? controlId ?? generatedId;
  const description = findPart(children, FormDescription);
  const message = findPart(children, FormMessage);
  const descriptionId = description ? description.props.id ?? `${id}-description` : undefined;
  // Preserve the existing implicit error ID through opaque wrappers, including SSR.
  const messageId = message?.props.id ?? `${id}-message`;
  const context = React.useMemo(() => ({ id, invalid, required, descriptionId, messageId }), [id, invalid, required, descriptionId, messageId]);
  return <FormFieldContext.Provider value={context}><div {...props} data-invalid={invalid || undefined} className={cn('slr-form__item', className)}>{children}</div></FormFieldContext.Provider>;
}

export function FormLabel({ className, children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  const field = useFormField('FormLabel');
  return <label {...props} htmlFor={props.htmlFor ?? field.id} className={cn('slr-form__label', className)}>{children}{field.required && <span aria-hidden="true" className="slr-form__required">*</span>}</label>;
}

export interface FormControlProps extends React.ComponentPropsWithoutRef<typeof Slot> {}
export const FormControl = React.forwardRef<HTMLElement, FormControlProps>(({ children, ...props }, ref) => {
  const field = useFormField('FormControl');
  const child = React.isValidElement(children) ? children as React.ReactElement<React.HTMLAttributes<HTMLElement>> : undefined;
  const childProps = child?.props;
  const association = {
    id: childProps?.id ?? props.id ?? field.id,
    'aria-invalid': childProps?.['aria-invalid'] ?? props['aria-invalid'] ?? (field.invalid || undefined),
    'aria-required': childProps?.['aria-required'] ?? props['aria-required'] ?? (field.required || undefined),
    'aria-describedby': mergeIds(childProps?.['aria-describedby'], props['aria-describedby'], field.descriptionId, field.invalid ? field.messageId : undefined),
  };
  return <Slot {...props} {...association} ref={ref}>{child ? React.cloneElement(child, association) : children}</Slot>;
});
FormControl.displayName = 'FormControl';

export function FormDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const field = React.useContext(FormFieldContext);
  return <p {...props} id={props.id ?? field?.descriptionId ?? (field ? `${field.id}-description` : undefined)} className={cn('slr-form__description', className)} />;
}
export function FormMessage({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const field = useFormField('FormMessage');
  if (!field.invalid && !props.children) return null;
  return <p {...props} id={props.id ?? field.messageId ?? `${field.id}-message`} role="alert" className={cn('slr-form__message', className)} />;
}
