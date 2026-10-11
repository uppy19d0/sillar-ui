import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { LoadingIndicator } from '../dist/loading-indicator.js';
import { Button } from '../dist/button.js';

test('loading status exposes localized text without hiding it from screen readers', () => {
  const html = renderToStaticMarkup(React.createElement(LoadingIndicator, { label: 'Cargando ofertas…', showLabel: false, size: 'lg' }));
  assert.match(html, /role="status"/);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /class="slr-visually-hidden">Cargando ofertas…/);
  assert.match(html, /data-size="lg"/);
});

test('decorative indicator does not create a duplicate live region', () => {
  const html = renderToStaticMarkup(React.createElement(LoadingIndicator, { decorative: true }));
  assert.match(html, /aria-hidden="true"/);
  assert.doesNotMatch(html, /role="status"|aria-live|Loading/);
});

test('busy buttons have one indicator, remain labelled and prevent submission', () => {
  const html = renderToStaticMarkup(React.createElement(Button, { loading: true }, 'Guardar'));
  assert.equal((html.match(/data-slot="loading-indicator"/g) || []).length, 1);
  assert.match(html, /aria-busy="true"/);
  assert.match(html, /disabled=""/);
  assert.match(html, /Guardar/);
});
