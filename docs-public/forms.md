# Form validation and recovery

This example is part of the unreleased source. Use it after building this branch; it is not a claim that the current npm release contains the new API.

Use a summary for long account, application or checkout forms. Each entry links to an existing control ID. `FormItem controlId` connects the label, description and validation message to that control. IDs must be unique in the document; use React `useId` when rendering several copies.

```tsx
import * as React from 'react';
import { Button } from 'sillar-ui/button';
import { Form, FormControl, FormDescription, FormItem,
  FormLabel, FormMessage, useForm } from 'sillar-ui/form';
import { FormErrorSummary } from 'sillar-ui/form-error-summary';
import 'sillar-ui/styles.css';

export function ContactForm() {
  const summary = React.useRef<HTMLDivElement>(null);
  const focusErrors = React.useRef(false);
  const [requestError, setRequestError] = React.useState('');
  const form = useForm({
    initialValues: { email: '' },
    validate: values => ({
      email: /\S+@\S+\.\S+/.test(values.email)
        ? undefined : 'Enter a valid email.',
    }),
    onSubmit: async values => {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error('Could not save. Try again.');
    },
  });
  React.useEffect(() => {
    if (focusErrors.current && form.errors.email) {
      summary.current?.focus();
      focusErrors.current = false;
    }
  }, [form.errors]);

  return <Form onSubmit={async event => {
    setRequestError('');
    focusErrors.current = true;
    try {
      if (await form.handleSubmit(event)) focusErrors.current = false;
    } catch {
      focusErrors.current = false;
      setRequestError('Could not save. Try again.');
    }
  }}>
    <FormErrorSummary ref={summary} title="Check the form"
      errors={form.errors.email
        ? [{ id: 'contact-email', message: form.errors.email }] : []} />
    <FormItem controlId="contact-email"
      invalid={Boolean(form.errors.email)} required>
      <FormLabel>Email</FormLabel>
      <FormControl><input type="email" {...form.field('email')} /></FormControl>
      <FormDescription>We use this address to reply.</FormDescription>
      <FormMessage>{form.errors.email}</FormMessage>
    </FormItem>
    {requestError && <p role="alert">{requestError}</p>}
    <Button type="submit" loading={form.submitting}>
      {form.submitting ? 'Saving…' : 'Save'}
    </Button>
  </Form>;
}
```

`/api/contact` is an example application endpoint; Sillar does not implement it. Validate and authorize requests on your server. The documentation site's demo is local and sends no data.

- The summary is absent for an empty error list. Its default heading is English; supply `title` for your locale.
- Updating errors does not move focus. The example focuses the summary only after this form's failed submit, once React has committed the errors.
- Native links support keyboard navigation and exact field IDs, including punctuation. A custom input must forward IDs, ARIA attributes, events and refs.
- `handleSubmit` returns false for validation failures or a concurrent submission. Exceptions from `validate` or `onSubmit` propagate; catch request failures and give the user a retry path.
- Reset restores the latest committed initial values and clears field errors. It does not cancel an active request or allow another submit until that request settles. Cancellation, idempotency and server-side error mapping belong to the application.
- Keep network errors separate from field errors. Do not retry writes automatically unless the endpoint's contract allows it.

## Consumer performance checks

Run `npm run check` to build and test the library, its size budgets and docs. `npm run size:consumer` bundles examples including class utility dependencies, while excluding React peers, CSS and app code. The 18 kB gzip per-fixture ceiling is a regression guard, not a page-weight or latency promise.

Overlays position immediately when opened. Subsequent scroll, resize and ResizeObserver bursts share one animation frame; closing an overlay cancels scheduled work.
