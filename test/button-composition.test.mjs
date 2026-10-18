import assert from 'node:assert/strict';
import test, { after, afterEach } from 'node:test';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html lang="en"><body></body></html>', {
  pretendToBeVisual: true,
  url: 'https://sillar-ui.test/',
});
for (const name of ['window', 'document', 'navigator', 'HTMLElement', 'Element', 'Node', 'Event', 'MouseEvent', 'KeyboardEvent']) {
  Object.defineProperty(globalThis, name, { configurable: true, writable: true, value: name === 'window' ? dom.window : dom.window[name] });
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const ReactModule = await import('react');
const React = ReactModule.default;
const act = ReactModule.act ?? (await import('react-dom/test-utils')).act;
const { createRoot } = await import('react-dom/client');
const { renderToStaticMarkup } = await import('react-dom/server');
const { Button } = await import('../dist/button.js');
const { Slot } = await import('../dist/slot.js');
const roots = new Set();

async function render(element) {
  const container = document.createElement('div');
  document.body.append(container);
  const root = createRoot(container);
  roots.add(root);
  await act(async () => root.render(element));
  return { container, root };
}

afterEach(async () => {
  await act(async () => { for (const root of roots) root.unmount(); });
  roots.clear();
  document.body.replaceChildren();
});
after(() => dom.window.close());

test('Slot rejects Fragment children that cannot carry activation guards or accessibility props', () => {
  assert.throws(() => renderToStaticMarkup(React.createElement(Button, { asChild: true, disabled: true },
    React.createElement(React.Fragment, null, React.createElement('a', { href: '/unprotected' }, 'Invalid target')))), /non-Fragment React element/);
});

test('enabled Button preserves child-first capture/bubble handlers and defaultPrevented cancellation', async () => {
  const calls = [];
  const { container } = await render(React.createElement('div', {
    onClickCapture: () => calls.push('ancestor capture'),
    onClick: () => calls.push('ancestor bubble'),
  }, React.createElement(Button, {
    asChild: true,
    onClickCapture: () => calls.push('button capture'),
    onClick: () => calls.push('button bubble'),
  }, React.createElement('a', {
    href: '/enabled',
    onClickCapture: () => calls.push('child capture'),
    onClick: event => { calls.push('child bubble'); event.preventDefault(); },
  }, 'Enabled'))));
  const click = new MouseEvent('click', { bubbles: true, cancelable: true });
  await act(async () => container.querySelector('a').dispatchEvent(click));
  assert.equal(click.defaultPrevented, true);
  assert.deepEqual(calls, ['ancestor capture', 'child capture', 'button capture', 'child bubble', 'ancestor bubble']);
});

test('enabled Slot preserves child-first keyboard handlers and skips a canceled parent handler', async () => {
  const calls = [];
  const { container } = await render(React.createElement(Slot, {
    onKeyDown: () => calls.push('slot keydown'),
    onKeyUp: () => calls.push('slot keyup'),
  }, React.createElement('button', {
    onKeyDown: () => calls.push('child keydown'),
    onKeyUp: event => { calls.push('child keyup'); event.preventDefault(); },
  }, 'Keyboard')));
  await act(async () => {
    container.querySelector('button').dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    container.querySelector('button').dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true, cancelable: true }));
  });
  assert.deepEqual(calls, ['child keydown', 'slot keydown', 'child keyup']);
});

test('enabled asChild still activates the child and Button handler in order', async () => {
  const calls = [];
  const { container } = await render(React.createElement(Button, {
    asChild: true,
    onClick: event => { calls.push('button'); event.preventDefault(); },
  }, React.createElement('a', { href: '/enabled', onClick: () => calls.push('child') }, 'Enabled')));
  await act(async () => container.querySelector('a').click());
  assert.deepEqual(calls, ['child', 'button']);
});

for (const state of ['disabled', 'loading']) {
  test(`${state} asChild suppresses child and wrapper activation before side effects`, async () => {
    const calls = [];
    let ancestorCaptures = 0;
    const activation = () => calls.push('activated');
    const handlers = {};
    for (const event of ['onClick', 'onAuxClick', 'onDoubleClick', 'onPointerDown', 'onPointerUp', 'onMouseDown', 'onMouseUp', 'onTouchStart', 'onTouchEnd', 'onKeyDown', 'onKeyUp', 'onKeyPress']) {
      handlers[event] = activation;
      handlers[`${event}Capture`] = activation;
    }
    const { container } = await render(React.createElement('div', {
      onClickCapture: () => ancestorCaptures++,
      onClick: activation,
    }, React.createElement(Button, {
      ...handlers, asChild: true, [state]: true, tabIndex: 4,
      'aria-disabled': false, 'aria-busy': false,
    }, React.createElement('a', {
      ...handlers, href: '/must-not-navigate', tabIndex: 0,
      'aria-disabled': false, 'aria-busy': false, 'data-loading': false,
    }, React.createElement('span', { onClick: activation }, 'Guarded')))));
    const anchor = container.querySelector('a');
    const target = anchor.querySelector('span');
    assert.equal(anchor.getAttribute('aria-disabled'), 'true');
    assert.equal(anchor.tabIndex, -1);
    if (state === 'loading') {
      assert.equal(anchor.getAttribute('aria-busy'), 'true');
      assert.equal(anchor.getAttribute('data-loading'), 'true');
    }
    const click = new MouseEvent('click', { bubbles: true, cancelable: true });
    await act(async () => target.dispatchEvent(click));
    assert.equal(click.defaultPrevented, true);
    assert.equal(ancestorCaptures, 1, 'capture ancestors observe the event before the target guard');
    await act(async () => {
      anchor.click();
      for (const type of ['auxclick', 'dblclick', 'pointerdown', 'pointerup', 'mousedown', 'mouseup', 'touchstart', 'touchend']) {
        const event = new Event(type, { bubbles: true, cancelable: true });
        anchor.dispatchEvent(event);
        assert.equal(event.defaultPrevented, type !== 'touchstart', type);
      }
      for (const key of ['Enter', ' ', 'Spacebar']) {
        for (const type of ['keydown', 'keyup', 'keypress']) {
          const event = new KeyboardEvent(type, { key, charCode: key === 'Enter' ? 13 : 32, bubbles: true, cancelable: true });
          anchor.dispatchEvent(event);
          assert.equal(event.defaultPrevented, true, `${type}: ${key}`);
        }
      }
    });
    assert.deepEqual(calls, [], 'neither child, wrapper, descendant nor bubbling ancestor activates');
  });
}

test('disabled asChild preserves non-activation keyboard composition and bubbling', async () => {
  const calls = [];
  const { container } = await render(React.createElement('div', {
    onKeyDown: () => calls.push('ancestor'),
  }, React.createElement(Button, {
    asChild: true, disabled: true,
    onKeyDownCapture: () => calls.push('button capture'),
    onKeyDown: () => calls.push('button bubble'),
  }, React.createElement('a', {
    href: '/next',
    onKeyDownCapture: () => calls.push('child capture'),
    onKeyDown: () => calls.push('child bubble'),
  }, 'Disabled'))));
  const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true });
  await act(async () => container.querySelector('a').dispatchEvent(event));
  assert.equal(event.defaultPrevented, false);
  assert.deepEqual(calls, ['child capture', 'button capture', 'child bubble', 'button bubble', 'ancestor']);
});

test('disabled slotted native controls cannot override disabled or submit a form', async () => {
  let submissions = 0;
  let clicks = 0;
  const { container } = await render(React.createElement('form', {
    onSubmit: event => { submissions++; event.preventDefault(); },
  }, React.createElement(Button, { asChild: true, loading: true }, React.createElement('button', {
    disabled: false, type: 'submit', tabIndex: 0, 'aria-disabled': false,
    onClick: () => clicks++,
  }, 'Submit'))));
  const button = container.querySelector('button');
  assert.equal(button.disabled, true);
  assert.equal(button.tabIndex, -1);
  assert.equal(button.getAttribute('aria-disabled'), 'true');
  await act(async () => button.click());
  assert.equal(clicks, 0);
  assert.equal(submissions, 0);
});

test('native loading Button preserves authoritative busy/disabled state and a single indicator', async () => {
  const { container } = await render(React.createElement(Button, {
    loading: true, disabled: false, 'aria-busy': false, 'aria-disabled': false,
  }, 'Save'));
  const button = container.querySelector('button');
  assert.equal(button.disabled, true);
  assert.equal(button.getAttribute('aria-busy'), 'true');
  assert.equal(button.getAttribute('aria-disabled'), 'true');
  assert.equal(container.querySelectorAll('[data-slot="loading-indicator"]').length, 1);
});

test('asChild forwards both refs without detaching them on a style or state rerender', async () => {
  const childRef = React.createRef();
  const values = [];
  const errors = [];
  const originalError = console.error;
  console.error = (...args) => errors.push(args.join(' '));
  const forwardedRef = node => { values.push(node); };
  const component = loading => React.createElement(Button, { asChild: true, loading, ref: forwardedRef },
    React.createElement('a', { href: '/ref', ref: childRef }, 'Ref'));
  try {
    const { container, root } = await render(component(false));
    const anchor = container.querySelector('a');
    assert.equal(childRef.current, anchor);
    assert.deepEqual(values, [anchor]);
    await act(async () => root.render(component(true)));
    assert.equal(childRef.current, anchor);
    assert.deepEqual(values, [anchor]);
    await act(async () => root.unmount()); roots.delete(root);
    assert.equal(childRef.current, null);
    assert.deepEqual(values, [anchor, null]);
    assert.deepEqual(errors, []);
  } finally {
    console.error = originalError;
  }
});

test('React19 ref cleanup composes with object refs and does not warn on legacy ref access', {
  skip: Number.parseInt(React.version, 10) < 19,
}, async () => {
  const objectRef = React.createRef();
  const calls = [];
  const errors = [];
  const originalError = console.error;
  console.error = (...args) => errors.push(args.join(' '));
  try {
    const callbackRef = node => {
      calls.push(node);
      return () => calls.push('cleanup');
    };
    const { container, root } = await render(React.createElement(Button, { asChild: true, ref: objectRef },
      React.createElement('a', { href: '/cleanup', ref: callbackRef }, 'Cleanup')));
    const anchor = container.querySelector('a');
    assert.equal(objectRef.current, anchor);
    await act(async () => root.unmount()); roots.delete(root);
    assert.equal(objectRef.current, null);
    assert.deepEqual(calls, [anchor, 'cleanup']);
    assert.deepEqual(errors, []);
  } finally {
    console.error = originalError;
  }
});
