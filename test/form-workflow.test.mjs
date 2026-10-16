import assert from 'node:assert/strict';
import test, { after, afterEach } from 'node:test';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html lang="en"><body></body></html>', { url: 'https://sillar-ui.test/', pretendToBeVisual: true });
for (const [name, value] of Object.entries({ window: dom.window, document: dom.window.document, navigator: dom.window.navigator, HTMLElement: dom.window.HTMLElement, Element: dom.window.Element, Node: dom.window.Node, Event: dom.window.Event, MouseEvent: dom.window.MouseEvent })) {
  Object.defineProperty(globalThis, name, { configurable: true, writable: true, value });
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const ReactModule = await import('react');
const React = ReactModule.default;
const { act } = ReactModule;
const { createRoot } = await import('react-dom/client');
const { renderToStaticMarkup } = await import('react-dom/server');
const { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, useForm } = await import('../dist/form.js');
const { FormErrorSummary } = await import('../dist/form-error-summary.js');
const roots = new Set();
async function render(element) {
  const container = document.createElement('div');
  document.body.append(container);
  const root = createRoot(container);
  roots.add(root);
  await act(async () => root.render(element));
  return { root, container };
}
async function renderHook(options) {
  let current;
  function Harness(props) { current = useForm(props); return null; }
  const mounted = await render(React.createElement(Harness, options));
  return { ...mounted, get form() { return current; }, rerender: async (next) => act(async () => mounted.root.render(React.createElement(Harness, next))) };
}
function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}
afterEach(async () => {
  await act(async () => { for (const root of roots) root.unmount(); });
  roots.clear(); document.body.replaceChildren();
});
after(() => dom.window.close());

test('useForm blocks duplicate same-tick and pending asynchronous submissions', async () => {
  const pending = deferred();
  const snapshots = [];
  const hook = await renderHook({ initialValues: { email: 'one@example.test' }, onSubmit: (values) => { snapshots.push(values); return pending.promise; } });
  let first, second;
  let prevented = 0;
  await act(async () => {
    first = hook.form.handleSubmit({ preventDefault() { prevented++; } });
    second = await hook.form.handleSubmit({ preventDefault() { prevented++; } });
  });
  assert.equal(second, false);
  assert.equal(prevented, 2);
  assert.equal(snapshots.length, 1);
  assert.equal(hook.form.submitting, true);
  let third;
  await act(async () => { third = await hook.form.handleSubmit(); });
  assert.equal(third, false);
  await act(async () => { pending.resolve(); assert.equal(await first, true); });
  assert.equal(hook.form.submitting, false);
});

test('a rejected submission releases its lock, propagates the failure and permits a retry', async () => {
  let calls = 0;
  const hook = await renderHook({ initialValues: { name: 'Ada' }, onSubmit: async () => { if (++calls === 1) throw new Error('Synthetic save failure'); } });
  await act(async () => { await assert.rejects(hook.form.handleSubmit(), /Synthetic save failure/); });
  assert.equal(hook.form.submitting, false);
  await act(async () => { assert.equal(await hook.form.handleSubmit(), true); });
  assert.equal(calls, 2);
});

test('rapid field edits validate and submit the latest values before a React rerender', async () => {
  const validated = [], submitted = [];
  const hook = await renderHook({ initialValues: { first: '', last: '' }, validate: (values) => { validated.push(values); return values.first && values.last ? {} : { first: 'Required' }; }, onSubmit: (values) => { submitted.push(values); } });
  await act(async () => {
    hook.form.setValue('first', 'Ada'); hook.form.setValue('last', 'Lovelace');
    assert.equal(await hook.form.handleSubmit(), true);
  });
  assert.deepEqual(validated, [{ first: 'Ada', last: 'Lovelace' }]);
  assert.deepEqual(submitted, validated);
  assert.deepEqual(hook.form.errors, {});
});

test('validation failures skip submission; editing clears only that field error; reset uses the latest defaults', async () => {
  const submitted = [];
  const validate = (values) => values.name ? {} : { name: 'Required', email: 'Enter an email' };
  const hook = await renderHook({ initialValues: { name: '', email: '' }, validate, onSubmit: (values) => submitted.push(values) });
  await act(async () => { assert.equal(await hook.form.handleSubmit(), false); });
  assert.equal(submitted.length, 0);
  await act(async () => { hook.form.setValue('name', 'Draft'); });
  assert.equal(hook.form.errors.name, undefined);
  assert.equal(hook.form.errors.email, 'Enter an email');
  const oldReset = hook.form.reset, oldSubmit = hook.form.handleSubmit;
  await hook.rerender({ initialValues: { name: 'Updated default', email: 'new@example.test' }, validate, onSubmit: (values) => submitted.push(values) });
  await act(async () => { oldReset(); assert.equal(await oldSubmit(), true); });
  assert.deepEqual(submitted, [{ name: 'Updated default', email: 'new@example.test' }]);
  assert.deepEqual(hook.form.values, submitted[0]);
  assert.deepEqual(hook.form.errors, {});
});

test('resetting during a submission preserves its busy lock and does not restore obsolete draft values on completion', async () => {
  const pending = deferred();
  let snapshot, first;
  const hook = await renderHook({ initialValues: { name: 'Initial' }, onSubmit: (values) => { snapshot = values; return pending.promise; } });
  await act(async () => { hook.form.setValue('name', 'Submitted draft'); first = hook.form.handleSubmit(); });
  await act(async () => { hook.form.setValue('name', 'Later edit'); hook.form.reset(); });
  assert.deepEqual(snapshot, { name: 'Submitted draft' });
  assert.deepEqual(hook.form.values, { name: 'Initial' });
  assert.equal(hook.form.submitting, true);
  await act(async () => { assert.equal(await hook.form.handleSubmit(), false); });
  await act(async () => { pending.resolve(); await first; });
  assert.equal(hook.form.submitting, false);
  assert.deepEqual(hook.form.values, { name: 'Initial' });
  assert.deepEqual(hook.form.errors, {});
});

test('a synchronous validator exception also releases the submission lock for retry', async () => {
  let shouldThrow = true, calls = 0;
  const hook = await renderHook({ initialValues: { name: 'Ada' }, validate: () => { if (shouldThrow) throw new Error('Validator failed'); return {}; }, onSubmit: () => { calls++; } });
  await act(async () => { await assert.rejects(hook.form.handleSubmit(), /Validator failed/); });
  assert.equal(calls, 0);
  shouldThrow = false;
  await act(async () => { assert.equal(await hook.form.handleSubmit(), true); });
  assert.equal(calls, 1);
});

test('FormErrorSummary is caller-focusable, localized and links literal punctuation-containing field IDs safely', async () => {
  const fieldId = 'email"] [data-target="other';
  const trigger = document.createElement('button'); document.body.append(trigger); trigger.focus();
  const ref = React.createRef();
  const errors = Object.freeze([Object.freeze({ id: fieldId, message: 'Escribe un correo válido.' })]);
  const { container } = await render(React.createElement(React.Fragment, null,
    React.createElement(FormErrorSummary, { ref, errors, title: 'Revisa los errores', className: 'custom-summary' }),
    React.createElement('label', { htmlFor: fieldId }, 'Email'),
    React.createElement('input', { id: fieldId }),
    React.createElement('input', { id: 'other', 'aria-label': 'Other field' }),
  ));
  const summary = container.querySelector('[role="region"]'), link = summary.querySelector('a');
  assert.equal(document.activeElement, trigger, 'Rendering errors must not move focus');
  assert.equal(summary.tabIndex, -1);
  assert.equal(document.getElementById(summary.getAttribute('aria-labelledby')).textContent, 'Revisa los errores');
  assert.equal(summary.classList.contains('custom-summary'), true);
  assert.equal(link.getAttribute('href'), '#' + encodeURIComponent(fieldId));
  ref.current.focus(); assert.equal(document.activeElement, summary);
  await act(async () => link.click());
  assert.equal(document.activeElement, document.getElementById(fieldId));
  assert.notEqual(document.activeElement.id, 'other');
  assert.equal(locationHash(), '');
});
function locationHash() { return dom.window.location.hash; }

test('summary capture handlers can prevent field focus, and missing targets never throw or steal focus', async () => {
  const ref = React.createRef();
  const { root, container } = await render(React.createElement(React.Fragment, null,
    React.createElement(FormErrorSummary, { ref, errors: [{ id: 'field', message: 'Fix field' }], onClickCapture: (event) => event.preventDefault() }),
    React.createElement('input', { id: 'field', 'aria-label': 'Field' }),
  ));
  ref.current.focus();
  await act(async () => container.querySelector('a').click());
  assert.equal(document.activeElement, ref.current);
  await act(async () => root.render(React.createElement(FormErrorSummary, { ref, errors: [{ id: 'missing', message: 'Missing field' }] })));
  ref.current.focus();
  await act(async () => container.querySelector('a').click());
  assert.equal(document.activeElement, ref.current);
});

test('empty summaries render no region or heading and clear the forwarded ref', async () => {
  const ref = React.createRef();
  const { root, container } = await render(React.createElement(FormErrorSummary, { ref, errors: [] }));
  assert.equal(container.innerHTML, ''); assert.equal(ref.current, null);
  await act(async () => root.render(React.createElement(FormErrorSummary, { ref, errors: [{ id: 'field', message: 'Fix field' }] })));
  assert.ok(ref.current);
  await act(async () => root.render(React.createElement(FormErrorSummary, { ref, errors: [] })));
  assert.equal(container.innerHTML, ''); assert.equal(ref.current, null);
});

test('form composition preserves direct child IDs through fragments and merges all help/error associations during SSR', () => {
  const html = renderToStaticMarkup(React.createElement(Form, null,
    React.createElement(FormItem, { controlId: 'configured-email', required: true, invalid: true },
      React.createElement(FormLabel, null, 'Email'),
      React.createElement(React.Fragment, null,
        React.createElement(FormControl, { 'aria-describedby': 'shared parent-help' }, React.createElement('input', { id: 'explicit:email', 'aria-describedby': 'shared child-help' })),
        React.createElement(FormDescription, { id: 'custom-help' }, 'Use your work email.'),
        React.createElement(FormMessage, { id: 'custom-error' }, 'Invalid email.'),
      ),
    ),
  ));
  assert.match(html, /for="explicit:email"/);
  assert.match(html, /id="explicit:email"/);
  assert.match(html, /aria-required="true"/);
  assert.match(html, /aria-invalid="true"/);
  assert.match(html, /aria-describedby="shared child-help parent-help custom-help custom-error"/);
  assert.match(html, /id="custom-help"/); assert.match(html, /id="custom-error"/);
});

test('explicit controlId supports opaque compositions without guessing their output; absent help produces no dangling references', () => {
  let calls = 0;
  function OpaqueControl() { calls++; return React.createElement(FormControl, null, React.createElement('input')); }
  const html = renderToStaticMarkup(React.createElement(FormItem, { controlId: 'stable-field', invalid: true },
    React.createElement(FormLabel, null, 'Name'), React.createElement(OpaqueControl),
  ));
  assert.equal(calls, 1);
  assert.match(html, /for="stable-field"/); assert.match(html, /id="stable-field"/);
  assert.doesNotMatch(html, /aria-describedby/);
});

test('summary and form primitives render on the server without window or document', () => {
  const previousWindow = globalThis.window, previousDocument = globalThis.document;
  try {
    delete globalThis.window; delete globalThis.document;
    const html = renderToStaticMarkup(React.createElement(React.Fragment, null,
      React.createElement(FormErrorSummary, { errors: [{ id: 'server-field', message: 'A name is required.' }] }),
      React.createElement(FormItem, { controlId: 'server-field', invalid: true },
        React.createElement(FormLabel, null, 'Name'),
        React.createElement(FormControl, null, React.createElement('input')),
        React.createElement(FormDescription, null, 'Your public name.'),
        React.createElement(FormMessage, null, 'A name is required.'),
      ),
    ));
    assert.match(html, /href="#server-field"/);
    assert.match(html, /aria-describedby="server-field-description server-field-message"/);
    assert.match(html, /There is a problem/);
  } finally { globalThis.window = previousWindow; globalThis.document = previousDocument; }
});

test('a suspended parent transition cannot publish uncommitted validation, submission or reset defaults', async () => {
  const suspended = deferred();
  const submissions = [], validations = [];
  let current;
  function Harness({ speculative }) {
    const label = speculative ? 'speculative' : 'committed';
    current = useForm({
      initialValues: { name: label },
      validate: () => { validations.push(label); return {}; },
      onSubmit: () => { submissions.push(label); },
    });
    if (speculative) throw suspended.promise;
    return React.createElement('p', null, 'Committed form');
  }
  const content = (speculative) => React.createElement(React.Suspense, { fallback: 'Loading' }, React.createElement(Harness, { speculative }));
  const { root, container } = await render(content(false));
  const submit = current.handleSubmit, reset = current.reset;
  await act(async () => { React.startTransition(() => root.render(content(true))); });
  assert.equal(container.textContent, 'Committed form');
  await act(async () => { assert.equal(await submit(), true); });
  assert.deepEqual(validations, ['committed']);
  assert.deepEqual(submissions, ['committed']);
  await act(async () => { reset(); });
  // Only the old committed render is permitted to supply reset defaults.
  assert.equal(current.values.name, 'committed');
  await act(async () => root.render(content(false)));
});
