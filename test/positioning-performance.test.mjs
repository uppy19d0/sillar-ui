import assert from 'node:assert/strict';
import test from 'node:test';
import { JSDOM } from 'jsdom';

test('compiled Popover batches layout bursts into one frame and cancels pending work on unmount', async () => {
  const dom = new JSDOM('<!doctype html><html lang="en"><body></body></html>', { pretendToBeVisual: true });
  for (const name of ['window', 'document', 'navigator', 'HTMLElement', 'Element', 'Node', 'Event', 'MouseEvent', 'KeyboardEvent']) {
    Object.defineProperty(globalThis, name, { configurable: true, value: name === 'window' ? dom.window : name === 'document' ? dom.window.document : dom.window[name] });
  }
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  let nextFrame = 0;
  const frames = new Map();
  window.requestAnimationFrame = callback => { const id = ++nextFrame; frames.set(id, callback); return id; };
  window.cancelAnimationFrame = id => frames.delete(id);
  globalThis.requestAnimationFrame = window.requestAnimationFrame;
  globalThis.cancelAnimationFrame = window.cancelAnimationFrame;
  const observers = [];
  globalThis.ResizeObserver = class {
    constructor(callback) { this.callback = callback; observers.push(this); }
    observe() {}
    disconnect() { this.disconnected = true; }
  };
  const React = await import('react');
  const { createRoot } = await import('react-dom/client');
  const { Popover, PopoverTrigger, PopoverContent } = await import('../dist/index.js');
  let measurements = 0;
  const originalRect = window.HTMLElement.prototype.getBoundingClientRect;
  window.HTMLElement.prototype.getBoundingClientRect = function () {
    if (this.tagName === 'BUTTON') measurements++;
    return originalRect.call(this);
  };
  const container = document.createElement('main');
  document.body.append(container);
  const root = createRoot(container);
  let unmounted = false;
  try {
    await React.act(async () => root.render(React.createElement(Popover, { defaultOpen: true },
      React.createElement(PopoverTrigger, null, 'Details'),
      React.createElement(PopoverContent, { 'aria-label': 'Details' }, 'Supporting content'))));
    assert.ok(measurements > 0, 'initial placement happens before waiting for a frame');
    const initial = measurements;
    await React.act(async () => {
      for (let i = 0; i < 100; i++) {
        window.dispatchEvent(new Event('resize'));
        document.dispatchEvent(new Event('scroll', { bubbles: true }));
        for (const observer of observers) observer.callback([]);
      }
    });
    assert.equal(measurements, initial, 'layout events defer repeated geometry reads');
    await React.act(async () => {
      const pending = [...frames.values()]; frames.clear();
      pending.forEach(callback => callback(16));
    });
    assert.equal(measurements, initial + 1, 'the whole burst performs one geometry read');
    window.dispatchEvent(new Event('resize'));
    await React.act(async () => root.unmount()); unmounted = true;
    const afterUnmount = measurements;
    for (const observer of observers) observer.callback([]);
    window.dispatchEvent(new Event('resize'));
    window.dispatchEvent(new Event('scroll'));
    for (const callback of frames.values()) callback(32);
    assert.equal(measurements, afterUnmount, 'queued callbacks cannot access unmounted controls');
    assert.ok(observers.every(observer => observer.disconnected));
  } finally {
    if (!unmounted) await React.act(async () => root.unmount());
    dom.window.close();
    delete globalThis.ResizeObserver;
  }
});
