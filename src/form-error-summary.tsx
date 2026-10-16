import * as React from 'react';
import { cn } from './utils';

export interface FormErrorSummaryEntry { id: string; message: React.ReactNode }
export interface FormErrorSummaryProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'children'> {
  errors: readonly FormErrorSummaryEntry[];
  /** Localize this heading in the application. */
  title?: React.ReactNode;
}

/** A caller-focusable summary. Rendering errors never moves focus automatically. */
export const FormErrorSummary = React.forwardRef<HTMLDivElement, FormErrorSummaryProps>(
  ({ errors, title = 'There is a problem', className, id, tabIndex = -1, role = 'region', ...props }, ref) => {
    const generatedId = React.useId();
    if (errors.length === 0) return null;
    const headingId = `${id ?? generatedId}-title`;
    return (
      <div
        {...props}
        ref={ref}
        id={id}
        role={role}
        tabIndex={tabIndex}
        aria-labelledby={props['aria-labelledby'] ?? (props['aria-label'] ? undefined : headingId)}
        className={cn('slr-form-error-summary', className)}
      >
        <h2 id={headingId} className="slr-form-error-summary__title">{title}</h2>
        <ul className="slr-form-error-summary__list">
          {errors.map((error, index) => (
            <li key={`${error.id}-${index}`}>
              <a
                href={`#${encodeURIComponent(error.id)}`}
                className="slr-form-error-summary__link"
                onClick={(event) => {
                  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                  event.preventDefault();
                  // Exact lookup also handles punctuation in IDs without selector injection.
                  const control = event.currentTarget.ownerDocument.getElementById(error.id);
                  if (control && 'focus' in control && typeof control.focus === 'function') control.focus();
                }}
              >{error.message}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
FormErrorSummary.displayName = 'FormErrorSummary';
