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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Checkbox,
  Combobox,
  DatePicker,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Pagination,
  RadioGroup,
  RadioGroupItem,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
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

test('nested Dialog layers dismiss in order and retain modal isolation', async () => {
  const { container } = await render(
    React.createElement(
      Dialog,
      null,
      React.createElement(DialogTrigger, null, 'Open parent'),
      React.createElement(
        DialogContent,
        { 'aria-label': 'Parent dialog' },
        React.createElement(
          Dialog,
          null,
          React.createElement(DialogTrigger, null, 'Open child'),
          React.createElement(
            DialogContent,
            { 'aria-label': 'Child dialog' },
            React.createElement(DialogClose, null, 'Close child'),
          ),
        ),
        React.createElement(DialogClose, null, 'Close parent'),
      ),
    ),
  );
  const parentTrigger = container.querySelector('button');
  parentTrigger.focus();
  await act(async () => parentTrigger.click());
  await nextFrame();

  const childTrigger = [...document.querySelectorAll('button')]
    .find((button) => button.textContent === 'Open child');
  await act(async () => childTrigger.click());
  await nextFrame();
  assert.equal(document.querySelectorAll('[role="dialog"]').length, 2);
  assert.equal(document.body.style.overflow, 'hidden');

  await act(async () => keydown(document, 'Escape'));
  assert.equal(document.querySelectorAll('[role="dialog"]').length, 1);
  assert.equal(document.body.style.overflow, 'hidden');
  assert.equal(document.activeElement, childTrigger);

  await act(async () => keydown(document, 'Escape'));
  assert.equal(document.querySelectorAll('[role="dialog"]').length, 0);
  assert.equal(document.body.style.overflow, '');
  assert.equal(container.inert, false);
  assert.equal(document.activeElement, parentTrigger);
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

test('DropdownMenu dismisses only for pointers outside its content and trigger', async () => {
  const { container } = await render(
    React.createElement(
      DropdownMenu,
      null,
      React.createElement(DropdownMenuTrigger, null, 'Actions'),
      React.createElement(DropdownMenuContent, null, React.createElement(DropdownMenuItem, null, 'Edit')),
    ),
  );
  const trigger = container.querySelector('button');
  await act(async () => trigger.click());
  await nextFrame();
  const menu = document.querySelector('[role="menu"]');

  await act(async () => menu.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
  assert.ok(document.querySelector('[role="menu"]'));

  await act(async () => document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
  assert.equal(document.querySelector('[role="menu"]'), null);
});

test('DropdownMenu flips above its trigger when the viewport has no room below', async () => {
  const { container } = await render(
    React.createElement(
      DropdownMenu,
      null,
      React.createElement(DropdownMenuTrigger, null, 'Position menu'),
      React.createElement(DropdownMenuContent, null, React.createElement(DropdownMenuItem, null, 'Edit')),
    ),
  );
  const trigger = container.querySelector('button');
  trigger.getBoundingClientRect = () => ({
    top: 700, right: 140, bottom: 730, left: 100, width: 40, height: 30,
    x: 100, y: 700, toJSON() {},
  });
  await act(async () => trigger.click());
  const menu = document.querySelector('[role="menu"]');
  Object.defineProperties(menu, {
    offsetWidth: { configurable: true, value: 160 },
    offsetHeight: { configurable: true, value: 120 },
  });
  await act(async () => window.dispatchEvent(new Event('resize')));
  await nextFrame();
  assert.equal(menu.dataset.side, 'top');
  assert.equal(menu.style.visibility, 'visible');
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

test('Accordion and RadioGroup share predictable roving keyboard focus', async () => {
  const accordion = await render(React.createElement(Accordion, { defaultValue: 'one' },
    React.createElement(AccordionItem, { value: 'one' }, React.createElement(AccordionTrigger, null, 'One'), React.createElement(AccordionContent, null, 'First')),
    React.createElement(AccordionItem, { value: 'two' }, React.createElement(AccordionTrigger, null, 'Two'), React.createElement(AccordionContent, null, 'Second')),
  ));
  const triggers = accordion.container.querySelectorAll('[data-slot="accordion-trigger"]');
  triggers[0].focus();
  await act(async () => keydown(triggers[0], 'ArrowDown'));
  assert.equal(document.activeElement, triggers[1]);
  await act(async () => triggers[1].click());
  assert.equal(triggers[1].getAttribute('aria-expanded'), 'true');

  const radios = await render(React.createElement(RadioGroup, { defaultValue: 'a', 'aria-label': 'Options' },
    React.createElement(RadioGroupItem, { value: 'a', 'aria-label': 'A' }),
    React.createElement(RadioGroupItem, { value: 'b', 'aria-label': 'B' }),
  ));
  const items = radios.container.querySelectorAll('[role="radio"]');
  items[0].focus();
  await act(async () => keydown(items[0], 'ArrowDown'));
  assert.equal(document.activeElement, items[1]);
  assert.equal(items[1].getAttribute('aria-checked'), 'true');
});

test('composed Select opens from the keyboard and commits an option', async () => {
  const changes = [];
  const { container } = await render(React.createElement(SelectRoot, { defaultValue: 'es', onValueChange: (value) => changes.push(value) },
    React.createElement(SelectTrigger, null, React.createElement(SelectValue, null)),
    React.createElement(SelectContent, null,
      React.createElement(SelectItem, { value: 'es' }, 'Spanish'),
      React.createElement(SelectItem, { value: 'en' }, 'English')),
  ));
  const trigger = container.querySelector('[role="combobox"]');
  trigger.focus();
  await act(async () => keydown(trigger, 'ArrowDown'));
  await nextFrame();
  const options = document.querySelectorAll('[role="option"]');
  assert.equal(options.length, 2);
  await act(async () => options[1].click());
  assert.deepEqual(changes, ['en']);
  assert.equal(document.querySelector('[role="listbox"]'), null);
  assert.equal(document.activeElement, trigger);
});

test('composed Select supports groups, separators, initial labels, and typeahead', async () => {
  const { container } = await render(React.createElement(SelectRoot, { defaultValue: 'us', required: true },
    React.createElement(SelectTrigger, null, React.createElement(SelectValue, null)),
    React.createElement(SelectContent, null,
      React.createElement(SelectGroup, null,
        React.createElement(SelectLabel, null, 'North America'),
        React.createElement(SelectItem, { value: 'us' }, 'United States'),
        React.createElement(SelectItem, { value: 'ca', disabled: true }, 'Canada')),
      React.createElement(SelectSeparator),
      React.createElement(SelectGroup, { 'aria-label': 'Global' },
        React.createElement(SelectItem, { value: 'sg' }, 'Singapore'),
        React.createElement(SelectItem, { value: 'gb' }, 'United Kingdom'))),
  ));
  const trigger = container.querySelector('[role="combobox"]');
  assert.equal(trigger.textContent.includes('United States'), true);
  assert.equal(trigger.getAttribute('aria-required'), 'true');
  await act(async () => keydown(trigger, 'ArrowDown'));
  await nextFrame();
  const listbox = document.querySelector('[role="listbox"]');
  const groups = listbox.querySelectorAll('[role="group"]');
  assert.equal(groups.length, 2);
  assert.equal(groups[0].getAttribute('aria-labelledby'), groups[0].querySelector('[data-slot="select-label"]').id);
  assert.equal(listbox.querySelectorAll('[role="separator"]').length, 1);
  await act(async () => keydown(document.activeElement, 's'));
  assert.equal(document.activeElement.dataset.value, 'sg');
});

test('Combobox filters and selects while DatePicker moves by keyboard', async () => {
  const selections = [];
  const combo = await render(React.createElement(Combobox, { options: [{ value: 'nyc', label: 'New York' }, { value: 'lon', label: 'London' }], onValueChange: (value) => selections.push(value) }));
  const input = combo.container.querySelector('[role="combobox"]');
  await act(async () => input.focus());
  await act(async () => keydown(input, 'ArrowDown'));
  await act(async () => keydown(input, 'Enter'));
  assert.deepEqual(selections, ['lon']);

  const calendar = await render(React.createElement(DatePicker, { defaultValue: new Date(2026, 8, 23), locale: 'en' }));
  const selected = calendar.container.querySelector('[aria-selected="true"]');
  await act(async () => selected.focus());
  await act(async () => keydown(selected, 'ArrowRight'));
  await nextFrame();
  assert.notEqual(document.activeElement, selected);
  assert.equal(document.activeElement.textContent, '24');
});

test('Combobox supports groups, loading, disabled-item navigation, and option creation', async () => {
  const selections = [];
  const combo = await render(React.createElement(Combobox, {
    'aria-label': 'City',
    defaultOpen: true,
    options: [
      { value: 'nyc', label: 'New York', disabled: true, group: 'North America' },
      { value: 'lon', label: 'London', group: 'Global' },
      { value: 'sg', label: 'Singapore', group: 'Global' },
    ],
    onValueChange: (value) => selections.push(value),
  }));
  const input = combo.container.querySelector('[role="combobox"]');
  assert.equal(input.getAttribute('aria-label'), 'City');
  assert.equal(combo.container.querySelectorAll('[role="group"]').length, 2);
  await act(async () => keydown(input, 'Home'));
  assert.match(input.getAttribute('aria-activedescendant'), /-1$/);
  await act(async () => keydown(input, 'End'));
  await act(async () => keydown(input, 'Enter'));
  assert.deepEqual(selections, ['sg']);

  const created = [];
  const creatable = await render(React.createElement(Combobox, { options: [], defaultInputValue: 'La Vega', defaultOpen: true, onCreateOption: (value) => created.push(value) }));
  const createInput = creatable.container.querySelector('[role="combobox"]');
  await act(async () => keydown(createInput, 'Enter'));
  assert.deepEqual(created, ['La Vega']);

  const loading = await render(React.createElement(Combobox, { options: [], defaultOpen: true, loading: true, loadingMessage: 'Loading cities' }));
  assert.equal(loading.container.querySelector('[role="listbox"]').getAttribute('aria-busy'), 'true');
  assert.match(loading.container.textContent, /Loading cities/);
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

test('Drawer keeps the Dialog focus contract, exposes its edge, and restores the trigger', async () => {
  const { container } = await render(
    React.createElement(
      Drawer,
      null,
      React.createElement(DrawerTrigger, null, 'Open filters'),
      React.createElement(
        DrawerContent,
        { side: 'left' },
        React.createElement(DrawerTitle, null, 'Filters'),
        React.createElement(DrawerDescription, null, 'Narrow the results.'),
        React.createElement('input', { 'aria-label': 'Keyword' }),
        React.createElement(DrawerClose, null, 'Apply'),
      ),
    ),
  );
  const trigger = container.querySelector('button');
  trigger.focus();
  await act(async () => trigger.click());
  await nextFrame();

  const drawer = document.querySelector('[role="dialog"]');
  assert.equal(drawer.getAttribute('data-side'), 'left');
  assert.match(drawer.className, /slr-drawer__content/);
  assert.equal(drawer.getAttribute('aria-modal'), 'true');
  assert.equal(container.inert, true);
  assert.equal(document.getElementById(drawer.getAttribute('aria-labelledby')).textContent, 'Filters');
  await assertNoSeriousA11yViolations(document.body);

  drawer.querySelector('input').focus();
  await act(async () => keydown(document, 'Tab'));
  assert.ok(drawer.contains(document.activeElement), 'focus stays inside the drawer');

  await act(async () => keydown(document, 'Escape'));
  assert.equal(document.querySelector('[role="dialog"]'), null);
  assert.equal(document.activeElement, trigger);
});

test('Drawer defaults to the right edge', async () => {
  await render(React.createElement(Drawer, { defaultOpen: true }, React.createElement(DrawerContent, { 'aria-label': 'Menu' }, 'Content')));
  assert.equal(document.querySelector('[role="dialog"]').getAttribute('data-side'), 'right');
});

test('Pagination moves between pages, marks the current page and disables the ends', async () => {
  const changes = [];
  const { container } = await render(React.createElement(Pagination, {
    defaultPage: 1, pageCount: 9, onPageChange: (page) => changes.push(page),
    labels: { navigation: 'Paginación', previous: 'Anterior', next: 'Siguiente', page: (page) => `Página ${page}` },
  }));
  const nav = container.querySelector('nav');
  const button = (label) => [...container.querySelectorAll('button')].find((item) => item.getAttribute('aria-label') === label);
  assert.equal(nav.getAttribute('aria-label'), 'Paginación');
  assert.equal(button('Anterior').disabled, true);
  assert.equal(button('Página 1').getAttribute('aria-current'), 'page');

  await act(async () => button('Siguiente').click());
  await act(async () => button('Página 9').click());
  assert.deepEqual(changes, [2, 9]);
  assert.equal(button('Página 9').getAttribute('aria-current'), 'page');
  assert.equal(button('Siguiente').disabled, true);
  assert.equal(container.querySelectorAll('[aria-current="page"]').length, 1);
  await assertNoSeriousA11yViolations(container);
});

test('Pagination renders links when getHref is provided and stays controlled', async () => {
  const changes = [];
  const { container } = await render(React.createElement(Pagination, { page: 2, pageCount: 4, getHref: (page) => `/results?page=${page}`, onPageChange: (page) => changes.push(page) }));
  const link = container.querySelector('a[href="/results?page=3"]');
  assert.ok(link);
  await act(async () => link.click());
  assert.deepEqual(changes, [3]);
  assert.equal(container.querySelector('[aria-current="page"]').textContent, '2', 'controlled page does not change by itself');
});

test('Pagination renders nothing for a single page', async () => {
  const { container } = await render(React.createElement(Pagination, { pageCount: 1 }));
  assert.equal(container.querySelector('nav'), null);
});

test('Breadcrumb exposes a labelled landmark and marks only the current page', async () => {
  const { container } = await render(React.createElement(Breadcrumb, { 'aria-label': 'Ruta de navegación' },
    React.createElement(BreadcrumbList, null,
      React.createElement(BreadcrumbItem, null, React.createElement(BreadcrumbLink, { href: '/' }, 'Inicio')),
      React.createElement(BreadcrumbSeparator),
      React.createElement(BreadcrumbItem, null, React.createElement(BreadcrumbLink, { href: '/docs' }, 'Docs')),
      React.createElement(BreadcrumbSeparator),
      React.createElement(BreadcrumbItem, null, React.createElement(BreadcrumbPage, null, 'Tabla')),
    )));
  assert.equal(container.querySelector('nav').getAttribute('aria-label'), 'Ruta de navegación');
  assert.equal(container.querySelectorAll('[aria-current="page"]').length, 1);
  assert.equal(container.querySelector('[aria-current="page"]').tagName, 'SPAN');
  assert.equal(container.querySelectorAll('[role="presentation"][aria-hidden="true"]').length, 2);
  await assertNoSeriousA11yViolations(container);
});

test('Table links headers to cells, announces sort state and names its scroll region', async () => {
  const sorts = [];
  const { container } = await render(React.createElement(Table, { label: 'Salarios', striped: true },
    React.createElement(TableCaption, null, 'Resumen mensual'),
    React.createElement(TableHeader, null, React.createElement(TableRow, null,
      React.createElement(TableHead, { sort: 'ascending', onSort: () => sorts.push('name') }, 'Nombre'),
      React.createElement(TableHead, { align: 'end', sort: 'none' }, 'Monto'))),
    React.createElement(TableBody, null, React.createElement(TableRow, { selected: true },
      React.createElement(TableCell, null, 'Ana'),
      React.createElement(TableCell, { numeric: true }, '45,000')))));
  const region = container.querySelector('[role="region"]');
  assert.equal(region.getAttribute('aria-label'), 'Salarios');
  assert.equal(region.getAttribute('tabindex'), '0');
  const [name, amount] = container.querySelectorAll('th');
  assert.equal(name.getAttribute('scope'), 'col');
  assert.equal(name.getAttribute('aria-sort'), 'ascending');
  assert.equal(amount.getAttribute('aria-sort'), 'none');
  await act(async () => name.querySelector('button').click());
  assert.deepEqual(sorts, ['name']);
  assert.equal(container.querySelector('tbody tr').getAttribute('aria-selected'), 'true');
  assert.equal(container.querySelector('td[data-numeric]').getAttribute('data-align'), 'end');
  await assertNoSeriousA11yViolations(container);
});

test('Table without a label does not add an unnamed focusable region', async () => {
  const { container } = await render(React.createElement(Table, null,
    React.createElement(TableBody, null, React.createElement(TableRow, null, React.createElement(TableCell, null, 'Only cell')))));
  assert.equal(container.querySelector('[role="region"]'), null);
  assert.equal(container.querySelector('[tabindex]'), null);
});
