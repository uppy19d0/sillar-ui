import assert from 'node:assert/strict';
import test, { after, afterEach } from 'node:test';
import axe from 'axe-core';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html lang="en"><body></body></html>', {
  pretendToBeVisual: true,
  url: 'https://sillar-ui.test/',
});

const globals = {
  window: dom.window,
  document: dom.window.document,
  navigator: dom.window.navigator,
  HTMLElement: dom.window.HTMLElement,
  Element: dom.window.Element,
  Node: dom.window.Node,
  Event: dom.window.Event,
  FocusEvent: dom.window.FocusEvent,
  KeyboardEvent: dom.window.KeyboardEvent,
  MouseEvent: dom.window.MouseEvent,
  PointerEvent: dom.window.PointerEvent ?? dom.window.MouseEvent,
  getComputedStyle: dom.window.getComputedStyle,
  requestAnimationFrame: dom.window.requestAnimationFrame.bind(dom.window),
  cancelAnimationFrame: dom.window.cancelAnimationFrame.bind(dom.window),
};

for (const [name, value] of Object.entries(globals)) {
  Object.defineProperty(globalThis, name, { configurable: true, writable: true, value });
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const ReactModule = await import('react');
const React = ReactModule.default;
const { act } = ReactModule;
const { createRoot } = await import('react-dom/client');

const {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} = await import('../dist/index.js');

const roots = new Set();

async function render(element) {
  const container = document.createElement('div');
  container.dataset.testRoot = '';
  document.body.append(container);
  const root = createRoot(container);
  roots.add(root);
  await act(async () => root.render(element));
  return { container, root };
}

async function nextFrame() {
  await act(async () => {
    await new Promise((resolve) => window.requestAnimationFrame(resolve));
  });
}

function keydown(target, key, options = {}) {
  target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...options }));
}

async function assertNoSeriousA11yViolations(root) {
  const results = await axe.run(root, {
    rules: {
      region: { enabled: false },
      'color-contrast': { enabled: false },
    },
  });
  const serious = results.violations.filter(({ impact }) => impact === 'serious' || impact === 'critical');
  assert.deepEqual(serious, []);
}

afterEach(async () => {
  await act(async () => {
    for (const root of roots) root.unmount();
  });
  roots.clear();
  document.body.replaceChildren();
  document.body.style.overflow = '';
});

after(() => dom.window.close());

test('Dialog isolates background content, traps focus, and restores the trigger', async () => {
  const { container } = await render(
    React.createElement(
      Dialog,
      null,
      React.createElement(DialogTrigger, null, 'Open dialog'),
      React.createElement(
        DialogContent,
        null,
        React.createElement(DialogTitle, null, 'Edit profile'),
        React.createElement(DialogDescription, null, 'Update your public profile.'),
        React.createElement('input', { 'aria-label': 'Display name' }),
        React.createElement(DialogClose, null, 'Save'),
      ),
    ),
  );
  const trigger = container.querySelector('button');
  trigger.focus();

  await act(async () => trigger.click());
  await nextFrame();

  const dialog = document.querySelector('[role="dialog"]');
  const input = dialog.querySelector('input');
  const close = dialog.querySelector('button');
  assert.equal(container.inert, true);
  assert.equal(container.getAttribute('aria-hidden'), 'true');
  assert.equal(document.body.style.overflow, 'hidden');
  assert.equal(document.activeElement, input);
  assert.equal(document.getElementById(dialog.getAttribute('aria-labelledby')).textContent, 'Edit profile');
  assert.equal(document.getElementById(dialog.getAttribute('aria-describedby')).textContent, 'Update your public profile.');
  await assertNoSeriousA11yViolations(document.body);

  close.focus();
  await act(async () => keydown(document, 'Tab'));
  assert.equal(document.activeElement, input);

  await act(async () => keydown(document, 'Escape'));
  assert.equal(document.querySelector('[role="dialog"]'), null);
  assert.equal(container.inert, false);
  assert.equal(container.hasAttribute('aria-hidden'), false);
  assert.equal(document.body.style.overflow, '');
  assert.equal(document.activeElement, trigger);
});

test('DropdownMenu supports ArrowUp entry, typeahead, disabled items, and focus return', async () => {
  const { container } = await render(
    React.createElement(
      DropdownMenu,
      null,
      React.createElement(DropdownMenuTrigger, null, 'Actions'),
      React.createElement(
        DropdownMenuContent,
        null,
        React.createElement(DropdownMenuItem, null, 'Archive'),
        React.createElement(DropdownMenuItem, { disabled: true }, 'Blocked'),
        React.createElement(DropdownMenuItem, null, 'Banana'),
        React.createElement(DropdownMenuItem, null, 'Copy'),
      ),
    ),
  );
  const trigger = container.querySelector('button');
  trigger.focus();

  await act(async () => keydown(trigger, 'ArrowUp'));
  await nextFrame();
  assert.equal(document.activeElement.textContent, 'Copy');
  await assertNoSeriousA11yViolations(document.body);

  await act(async () => keydown(document.activeElement, 'b'));
  assert.equal(document.activeElement.textContent, 'Banana');

  await act(async () => keydown(document.activeElement, 'ArrowUp'));
  assert.equal(document.activeElement.textContent, 'Archive');

  await act(async () => keydown(document.activeElement, 'Escape'));
  assert.equal(document.querySelector('[role="menu"]'), null);
  assert.equal(document.activeElement, trigger);
});

test('Tabs follow WAI-ARIA automatic and manual activation behavior', async () => {
  const automatic = await render(
    React.createElement(
      Tabs,
      { defaultValue: 'overview' },
      React.createElement(
        TabsList,
        { 'aria-label': 'Account' },
        React.createElement(TabsTrigger, { value: 'overview' }, 'Overview'),
        React.createElement(TabsTrigger, { value: 'security' }, 'Security'),
      ),
      React.createElement(TabsContent, { value: 'overview' }, 'Overview panel'),
      React.createElement(TabsContent, { value: 'security' }, 'Security panel'),
    ),
  );
  const automaticTabs = automatic.container.querySelectorAll('[role="tab"]');
  automaticTabs[0].focus();
  await act(async () => keydown(automaticTabs[0], 'ArrowRight'));
  assert.equal(document.activeElement, automaticTabs[1]);
  assert.equal(automaticTabs[1].getAttribute('aria-selected'), 'true');
  assert.equal(automatic.container.textContent.includes('Security panel'), true);

  const manual = await render(
    React.createElement(
      Tabs,
      { defaultValue: 'one', activationMode: 'manual' },
      React.createElement(
        TabsList,
        { 'aria-label': 'Manual example' },
        React.createElement(TabsTrigger, { value: 'one' }, 'One'),
        React.createElement(TabsTrigger, { value: 'two' }, 'Two'),
      ),
      React.createElement(TabsContent, { value: 'one' }, 'First panel'),
      React.createElement(TabsContent, { value: 'two' }, 'Second panel'),
    ),
  );
  const manualTabs = manual.container.querySelectorAll('[role="tab"]');
  manualTabs[0].focus();
  await act(async () => keydown(manualTabs[0], 'ArrowRight'));
  assert.equal(document.activeElement, manualTabs[1]);
  assert.equal(manualTabs[0].getAttribute('aria-selected'), 'true');
  await act(async () => keydown(manualTabs[1], 'Enter'));
  assert.equal(manualTabs[1].getAttribute('aria-selected'), 'true');
});

test('interactive primitives have no detectable serious accessibility violations', async () => {
  const { container } = await render(
    React.createElement(
      React.Fragment,
      null,
      React.createElement(
        Tabs,
        { defaultValue: 'details' },
        React.createElement(
          TabsList,
          { 'aria-label': 'Project' },
          React.createElement(TabsTrigger, { value: 'details' }, 'Details'),
          React.createElement(TabsTrigger, { value: 'activity' }, 'Activity'),
        ),
        React.createElement(TabsContent, { value: 'details' }, 'Project details'),
        React.createElement(TabsContent, { value: 'activity' }, 'Project activity'),
      ),
      React.createElement(
        DropdownMenu,
        null,
        React.createElement(DropdownMenuTrigger, null, 'Open actions'),
        React.createElement(DropdownMenuContent, null, React.createElement(DropdownMenuItem, null, 'Edit')),
      ),
    ),
  );

  await assertNoSeriousA11yViolations(container);
});
