import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  Badge,
  Button,
  Callout,
  CalloutDescription,
  CalloutTitle,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Input,
  Select,
  Separator,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
} from '../dist/index.js';

const snapshotUrl = new URL('./__snapshots__/library-contract.snapshot.json', import.meta.url);
const updateSnapshots = process.env.UPDATE_SNAPSHOTS === '1';

function componentGallery() {
  return React.createElement(
    'main',
    { 'data-theme': 'dark', 'aria-label': 'Sillar UI component contract' },
    React.createElement(
      'section',
      { 'aria-label': 'Actions and status' },
      React.createElement(Button, null, 'Save changes'),
      React.createElement(Button, { variant: 'secondary', size: 'sm' }, 'Preview'),
      React.createElement(Button, { variant: 'outline' }, 'Cancel'),
      React.createElement(Button, { variant: 'destructive', loading: true }, 'Delete'),
      React.createElement(Badge, null, 'Default'),
      React.createElement(Badge, { variant: 'success' }, 'Production ready'),
      React.createElement(Badge, { variant: 'destructive' }, 'Action required'),
    ),
    React.createElement(
      Card,
      { variant: 'elevated' },
      React.createElement(
        CardHeader,
        null,
        React.createElement(CardTitle, null, 'Account settings'),
        React.createElement(CardDescription, null, 'A stable composed card contract.'),
      ),
      React.createElement(
        CardContent,
        null,
        React.createElement(
          Field,
          { invalid: true },
          React.createElement(FieldLabel, { htmlFor: 'email', required: true }, 'Email'),
          React.createElement(Input, { id: 'email', defaultValue: 'person@example.com', 'aria-invalid': true }),
          React.createElement(FieldDescription, null, 'Used for product updates.'),
          React.createElement(FieldError, null, 'Confirm this address.'),
        ),
        React.createElement(
          Select,
          { defaultValue: 'designer', 'aria-label': 'Role' },
          React.createElement('option', { value: 'designer' }, 'Designer'),
          React.createElement('option', { value: 'engineer' }, 'Engineer'),
        ),
        React.createElement(Textarea, { defaultValue: 'Snapshot coverage', 'aria-label': 'Notes' }),
      ),
      React.createElement(
        CardFooter,
        null,
        React.createElement(Switch, { defaultChecked: true, 'aria-label': 'Email notifications' }),
      ),
    ),
    React.createElement(Separator, null),
    React.createElement(
      Callout,
      { variant: 'warning' },
      React.createElement(CalloutTitle, null, 'Review changes'),
      React.createElement(CalloutDescription, null, 'Theme and markup changes are snapshot tested.'),
    ),
    React.createElement(
      Tabs,
      { defaultValue: 'preview' },
      React.createElement(
        TabsList,
        { 'aria-label': 'Component view' },
        React.createElement(TabsTrigger, { value: 'preview' }, 'Preview'),
        React.createElement(TabsTrigger, { value: 'code' }, 'Code'),
      ),
      React.createElement(TabsContent, { value: 'preview' }, 'Rendered component'),
      React.createElement(TabsContent, { value: 'code' }, 'Component source'),
    ),
  );
}

function extractTokens(stylesheet, selector) {
  const start = stylesheet.indexOf(selector + '{');
  assert.notEqual(start, -1, 'Missing theme block for ' + selector);
  const contentStart = start + selector.length + 1;
  const end = stylesheet.indexOf('}', contentStart);
  const block = stylesheet.slice(contentStart, end);

  return Object.fromEntries(
    [...block.matchAll(/(--slr-[\w-]+):\s*([^;]+)/g)]
      .map(([, token, value]) => [token, value.trim()])
      .sort(([left], [right]) => left.localeCompare(right)),
  );
}

function normalizeReactIds(markup) {
  const tabsId = markup.match(/id="([^"]+)-tab-preview"/)?.[1];
  assert.ok(tabsId, 'Expected the Tabs snapshot to expose its generated base id.');
  return markup.replaceAll(tabsId, 'sillar-tabs');
}

test('public component markup and theme tokens match the reviewed snapshot', async () => {
  const stylesheet = await readFile(new URL('../dist/styles.css', import.meta.url), 'utf8');
  const markup = normalizeReactIds(renderToStaticMarkup(componentGallery())).replaceAll('><', '>\n<');
  const snapshot = JSON.stringify({
    markup,
    light: extractTokens(stylesheet, ':root'),
    dark: extractTokens(stylesheet, ':is(.dark,[data-theme=dark])'),
  }, null, 2) + '\n';

  if (updateSnapshots) {
    await mkdir(new URL('./__snapshots__/', import.meta.url), { recursive: true });
    await writeFile(snapshotUrl, snapshot);
  }

  const expected = await readFile(snapshotUrl, 'utf8');
  assert.equal(snapshot, expected, 'Run npm run test:snapshots:update after reviewing intentional UI changes.');
});
