import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  BreakdownList,
  Button,
  Callout,
  CalculatorPanel,
  CalculatorShell,
  Checkbox,
  Combobox,
  Card,
  CardTitle,
  Dialog,
  DialogTrigger,
  DatePicker,
  DropdownMenu,
  DropdownMenuTrigger,
  EmptyState,
  ExportActions,
  FieldLabel,
  FormControl,
  FormGrid,
  FormItem,
  FormLabel,
  FormMessage,
  IconButton,
  Label,
  MoneyInput,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  parseNumericInput,
  PercentageInput,
  Progress,
  RadioGroup,
  RadioGroupItem,
  ResultSummary,
  Select,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  Separator,
  SkipLink,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TextField,
  Tooltip,
  TooltipTrigger,
} from '../dist/index.js';

test('Button includes its variant, size, and safe default type', () => {
  const html = renderToStaticMarkup(
    React.createElement(Button, { variant: 'outline', size: 'lg' }, 'Continue'),
  );

  assert.match(html, /slr-button--outline/);
  assert.match(html, /slr-button--lg/);
  assert.match(html, /type="button"/);
});

test('Button exposes a stable accessible loading state', () => {
  const html = renderToStaticMarkup(
    React.createElement(Button, { loading: true }, 'Save changes'),
  );

  assert.match(html, /aria-busy="true"/);
  assert.match(html, /disabled=""/);
  assert.match(html, /slr-spinner/);
  assert.match(html, />Save changes</);
});

test('IconButton requires and renders an accessible label', () => {
  const html = renderToStaticMarkup(
    React.createElement(IconButton, { label: 'Open navigation', size: 'lg' }, '☰'),
  );

  assert.match(html, /aria-label="Open navigation"/);
  assert.match(html, /slr-button--icon-lg/);
});

test('polymorphic loading buttons preserve a single child', () => {
  const html = renderToStaticMarkup(
    React.createElement(
      Button,
      { asChild: true, loading: true },
      React.createElement('a', { href: '/next' }, 'Continue'),
    ),
  );

  assert.match(html, /aria-disabled="true"/);
  assert.match(html, /tabindex="-1"/);
  assert.doesNotMatch(html, /slr-spinner/);
});

test('Badge and card primitives render semantic content', () => {
  const html = renderToStaticMarkup(
    React.createElement(
      Card,
      null,
      React.createElement(Badge, { variant: 'success' }, 'Ready'),
      React.createElement(CardTitle, null, 'Reusable interface'),
    ),
  );

  assert.match(html, /slr-badge--success/);
  assert.match(html, /<h3[^>]*>Reusable interface<\/h3>/);
});

test('Field and callout primitives expose validation semantics', () => {
  const label = renderToStaticMarkup(
    React.createElement(FieldLabel, { htmlFor: 'email', required: true }, 'Email'),
  );
  const callout = renderToStaticMarkup(
    React.createElement(Callout, { variant: 'danger' }, 'Could not save'),
  );

  assert.match(label, /for="email"/);
  assert.match(label, /slr-field-required/);
  assert.match(callout, /role="alert"/);
  assert.match(callout, /slr-callout--danger/);
});

test('TextField connects labels, messages, adornments, and validation state', () => {
  const html = renderToStaticMarkup(
    React.createElement(TextField, {
      label: 'Workspace name',
      description: 'Use a clear public name.',
      error: 'This name is already taken.',
      leading: '@',
      trailing: '.app',
      variant: 'glass',
      maxLength: 24,
      defaultValue: 'sillar',
      required: true,
    }),
  );

  assert.match(html, /data-slot="text-field"/);
  assert.match(html, /data-variant="glass"/);
  assert.match(html, /aria-invalid="true"/);
  assert.match(html, /role="alert"/);
  assert.match(html, /aria-describedby="[^"]+-description [^"]+-message"/);
  assert.match(html, /6\/24/);
});

test('SkipLink points keyboard users to the requested target', () => {
  const html = renderToStaticMarkup(
    React.createElement(SkipLink, { href: '#content' }, 'Skip to content'),
  );

  assert.match(html, /href="#content"/);
  assert.match(html, /slr-skip-link/);
});

test('Separator can opt into semantic separator behavior', () => {
  const html = renderToStaticMarkup(
    React.createElement(Separator, { decorative: false, orientation: 'vertical' }),
  );

  assert.match(html, /role="separator"/);
  assert.match(html, /aria-orientation="vertical"/);
});

test('form primitives render native accessible controls', () => {
  const html = renderToStaticMarkup(
    React.createElement(
      React.Fragment,
      null,
      React.createElement(Label, { htmlFor: 'role' }, 'Role'),
      React.createElement(
        Select,
        { id: 'role', defaultValue: 'developer' },
        React.createElement('option', { value: 'developer' }, 'Developer'),
      ),
      React.createElement(Switch, { defaultChecked: true, 'aria-label': 'Available for work' }),
    ),
  );

  assert.match(html, /<label[^>]*for="role"/);
  assert.match(html, /<select[^>]*id="role"/);
  assert.match(html, /role="switch"/);
  assert.match(html, /aria-checked="true"/);
});

test('dialog and menu triggers expose their state to assistive technology', () => {
  const dialog = renderToStaticMarkup(
    React.createElement(Dialog, null, React.createElement(DialogTrigger, null, 'Open dialog')),
  );
  const menu = renderToStaticMarkup(
    React.createElement(DropdownMenu, null, React.createElement(DropdownMenuTrigger, null, 'Open menu')),
  );

  assert.match(dialog, /aria-haspopup="dialog"/);
  assert.match(dialog, /aria-expanded="false"/);
  assert.match(menu, /aria-haspopup="menu"/);
  assert.match(menu, /aria-expanded="false"/);
});

test('Tabs render linked tab and panel semantics on the server', () => {
  const html = renderToStaticMarkup(
    React.createElement(
      Tabs,
      { defaultValue: 'first' },
      React.createElement(
        TabsList,
        { 'aria-label': 'Example tabs' },
        React.createElement(TabsTrigger, { value: 'first' }, 'First'),
        React.createElement(TabsTrigger, { value: 'second' }, 'Second'),
      ),
      React.createElement(TabsContent, { value: 'first' }, 'First panel'),
      React.createElement(TabsContent, { value: 'second' }, 'Second panel'),
    ),
  );

  assert.match(html, /role="tablist"/);
  assert.match(html, /role="tab"[^>]*aria-selected="true"/);
  assert.match(html, /role="tabpanel"/);
  assert.match(html, /aria-controls="[^"]+-panel-first"/);
  assert.match(html, /aria-labelledby="[^"]+-tab-first"/);
});

test('new collection primitives expose linked accessible state', () => {
  const html = renderToStaticMarkup(React.createElement(React.Fragment, null,
    React.createElement(Accordion, { defaultValue: 'quality', collapsible: true },
      React.createElement(AccordionItem, { value: 'quality' },
        React.createElement(AccordionTrigger, null, 'Quality'),
        React.createElement(AccordionContent, null, 'Tested behavior'))),
    React.createElement(Checkbox, { defaultChecked: true, 'aria-label': 'Accept' }),
    React.createElement(RadioGroup, { defaultValue: 'one', 'aria-label': 'Choice' },
      React.createElement(RadioGroupItem, { value: 'one', 'aria-label': 'One' }),
      React.createElement(RadioGroupItem, { value: 'two', 'aria-label': 'Two' })),
    React.createElement(Progress, { value: 65, 'aria-label': 'Progress' }),
  ));
  assert.match(html, /aria-expanded="true"/);
  assert.match(html, /role="region"/);
  assert.match(html, /role="checkbox"[^>]*aria-checked="true"/);
  assert.match(html, /role="radiogroup"/);
  assert.match(html, /role="progressbar"[^>]*aria-valuenow="65"/);
});

test('SelectRoot, Combobox, and NavigationMenu render their public contracts', () => {
  const html = renderToStaticMarkup(React.createElement(React.Fragment, null,
    React.createElement(SelectRoot, { defaultValue: 'es', name: 'language' },
      React.createElement(SelectTrigger, null, React.createElement(SelectValue, { placeholder: 'Language' })),
      React.createElement(SelectContent, null, React.createElement(SelectItem, { value: 'es' }, 'Spanish'))),
    React.createElement(Combobox, { options: [{ value: 'nyc', label: 'New York' }], name: 'city' }),
    React.createElement(NavigationMenu, null,
      React.createElement(NavigationMenuList, null,
        React.createElement(NavigationMenuItem, null,
          React.createElement(NavigationMenuTrigger, { value: 'products' }, 'Products'),
          React.createElement(NavigationMenuContent, { value: 'products' }, 'Product links')))),
  ));
  assert.match(html, /role="combobox"/);
  assert.match(html, /type="hidden" name="language" value="es"/);
  assert.match(html, /aria-autocomplete="list"/);
  assert.match(html, /<nav[^>]*aria-label="Primary navigation"/);
});

test('Form and DatePicker connect validation and calendar semantics', () => {
  const html = renderToStaticMarkup(React.createElement(React.Fragment, null,
    React.createElement(FormItem, { invalid: true, required: true },
      React.createElement(FormLabel, null, 'Email'),
      React.createElement(FormControl, null, React.createElement('input', { type: 'email' })),
      React.createElement(FormMessage, null, 'Enter a valid email')),
    React.createElement(DatePicker, { defaultValue: new Date(2026, 8, 23), locale: 'en' }),
    React.createElement(Tooltip, null, React.createElement(TooltipTrigger, null, 'Help')),
  ));
  assert.match(html, /aria-invalid="true"/);
  assert.match(html, /role="alert"/);
  assert.match(html, /role="grid"/);
  assert.match(html, /aria-selected="true"/);
  assert.match(html, /data-state="closed"/);
});

test('application patterns render estimator, numeric, result, and export contracts', () => {
  const html = renderToStaticMarkup(React.createElement(React.Fragment, null,
    React.createElement(CalculatorShell, {
      title: 'Plan estimator',
      eyebrow: 'Pricing',
      badge: 'SaaS ready',
      aside: React.createElement(ResultSummary, {
        title: 'Estimated monthly total',
        value: '$349',
        items: [{ label: 'Usage buffer', value: '$100', tone: 'warning' }],
      }),
    },
      React.createElement(CalculatorPanel, { title: 'Configuration' },
        React.createElement(FormGrid, null,
          React.createElement(MoneyInput, { value: 85000, currency: 'USD', 'aria-label': 'Monthly budget' }),
          React.createElement(PercentageInput, { value: 12, 'aria-label': 'Growth percentage' })))),
    React.createElement(ExportActions, { onPrint() {}, onPdf() {}, onCopy() {} }),
    React.createElement(BreakdownList, { items: [{ label: 'Total', value: '$349', description: 'Base plan plus usage' }] }),
  ));

  assert.match(html, /data-slot="calculator-shell"/);
  assert.match(html, /data-slot="result-summary"/);
  assert.match(html, /data-slot="money-input"/);
  assert.match(html, /data-export-action="pdf"/);
  assert.match(html, /USD/);
});

test('empty states provide stable product feedback markup', () => {
  const html = renderToStaticMarkup(React.createElement(React.Fragment, null,
    React.createElement(EmptyState, {
      title: 'No reports yet',
      description: 'Create your first export.',
      actions: [{ label: 'Create report', href: '/reports/new' }],
    }),
    React.createElement(EmptyState, { title: 'No filters matched' }),
  ));

  assert.match(html, /data-slot="empty-state"/);
  assert.match(html, /href="\/reports\/new"/);
  assert.match(html, /No filters matched/);
});

test('numeric parser handles currency and localized decimal input', () => {
  assert.equal(parseNumericInput('RD$ 85,000.50', 'en-US'), 85000.50);
  assert.equal(parseNumericInput('RD$ 85000,50', 'es-DO'), 85000.50);
  assert.equal(parseNumericInput('invalid', 'en-US'), null);
});

test('published package and bundle have no Radix runtime dependency', async () => {
  const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
  const packageLock = JSON.parse(await readFile(new URL('../package-lock.json', import.meta.url), 'utf8'));
  const bundle = await readFile(new URL('../dist/index.js', import.meta.url), 'utf8');
  const dependencies = Object.keys(packageJson.dependencies ?? {});
  const lockedPackages = Object.keys(packageLock.packages ?? {});

  assert.equal(dependencies.some((dependency) => dependency.startsWith('@radix-ui/')), false);
  assert.equal(lockedPackages.some((packagePath) => packagePath.includes('node_modules/@radix-ui/')), false);
  assert.doesNotMatch(bundle, /@radix-ui\//);
});

test('focused component entry points resolve through package exports', async () => {
  const entries = [
    'accordion',
    'button',
    'calculator-shell',
    'choice',
    'combobox',
    'confirm-dialog',
    'date-picker',
    'dialog',
    'empty-state',
    'export-actions',
    'form',
    'form-grid',
    'money-input',
    'navigation-menu',
    'popover',
    'result-summary',
    'select-root',
    'text-field',
    'toast',
    'tooltip',
  ];
  for (const entry of entries) {
    const module = await import(`sillar-ui/${entry}`);
    assert.ok(Object.keys(module).length > 0, `${entry} must expose a public module`);
  }
});

test('theme stylesheet exposes layered light and dark semantic tokens', async () => {
  const stylesheet = await readFile(new URL('../dist/styles.css', import.meta.url), 'utf8');

  for (const token of [
    '--slr-color-surface-raised',
    '--slr-color-surface-sunken',
    '--slr-color-surface-hover',
    '--slr-color-subtle',
    '--slr-color-border-strong',
    '--slr-color-overlay',
  ]) {
    assert.match(stylesheet, new RegExp(token));
  }

  assert.match(stylesheet, /color-scheme:light/);
  assert.match(stylesheet, /color-scheme:dark/);
  assert.match(stylesheet, /:is\(\.dark,\[data-theme=dark\]\)/);
});
