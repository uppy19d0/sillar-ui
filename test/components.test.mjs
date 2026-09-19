import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Badge, Button, Card, CardTitle, Separator } from '../dist/index.js';

test('Button includes its variant, size, and safe default type', () => {
  const html = renderToStaticMarkup(
    React.createElement(Button, { variant: 'outline', size: 'lg' }, 'Continue'),
  );

  assert.match(html, /slr-button--outline/);
  assert.match(html, /slr-button--lg/);
  assert.match(html, /type="button"/);
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

test('Separator can opt into semantic separator behavior', () => {
  const html = renderToStaticMarkup(
    React.createElement(Separator, { decorative: false, orientation: 'vertical' }),
  );

  assert.match(html, /role="separator"/);
  assert.match(html, /aria-orientation="vertical"/);
});
