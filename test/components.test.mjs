import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  Badge,
  Button,
  Callout,
  Card,
  CardTitle,
  FieldLabel,
  IconButton,
  Separator,
  SkipLink,
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
