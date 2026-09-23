export type Side = 'top' | 'right' | 'bottom' | 'left';
export type Align = 'start' | 'center' | 'end';

export interface PositionOptions {
  side?: Side;
  align?: Align;
  sideOffset?: number;
  collisionPadding?: number;
  avoidCollisions?: boolean;
  direction?: 'ltr' | 'rtl';
  matchAnchorWidth?: boolean;
}

export interface PositionResult {
  side: Side;
  style: CSSProperties;
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.max(minimum, Math.min(value, maximum));
}

/** Calculates fixed positioning and flips the requested side when space is tighter. */
export function calculatePosition(
  anchor: DOMRect,
  floating: { width: number; height: number },
  viewport: { width: number; height: number },
  options: PositionOptions = {},
): PositionResult {
  const {
    side = 'bottom',
    align = 'start',
    sideOffset = 6,
    collisionPadding = 8,
    avoidCollisions = true,
    direction = 'ltr',
    matchAnchorWidth = false,
  } = options;
  const spaces = {
    top: anchor.top - collisionPadding,
    right: viewport.width - anchor.right - collisionPadding,
    bottom: viewport.height - anchor.bottom - collisionPadding,
    left: anchor.left - collisionPadding,
  };
  const required = side === 'top' || side === 'bottom' ? floating.height : floating.width;
  const opposite: Record<Side, Side> = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' };
  const resolvedSide = avoidCollisions
    && spaces[side] < required
    && spaces[opposite[side]] > spaces[side]
    ? opposite[side]
    : side;

  const isVertical = resolvedSide === 'top' || resolvedSide === 'bottom';
  const logicalStart = direction === 'rtl' ? 'end' : 'start';
  let left: number;
  let top: number;

  if (isVertical) {
    if (align === 'center') left = anchor.left + (anchor.width - floating.width) / 2;
    else if (align === logicalStart) left = anchor.left;
    else left = anchor.right - floating.width;
    top = resolvedSide === 'bottom'
      ? anchor.bottom + sideOffset
      : anchor.top - floating.height - sideOffset;
  } else {
    left = resolvedSide === 'right'
      ? anchor.right + sideOffset
      : anchor.left - floating.width - sideOffset;
    if (align === 'center') top = anchor.top + (anchor.height - floating.height) / 2;
    else if (align === 'start') top = anchor.top;
    else top = anchor.bottom - floating.height;
  }

  if (avoidCollisions) {
    left = clamp(left, collisionPadding, viewport.width - floating.width - collisionPadding);
    top = clamp(top, collisionPadding, viewport.height - floating.height - collisionPadding);
  }

  return {
    side: resolvedSide,
    style: {
      position: 'fixed',
      top,
      left,
      visibility: 'visible',
      ...(matchAnchorWidth ? { minWidth: anchor.width } : {}),
    },
  };
}

/** Keeps a floating element aligned during layout, resize, and nested scrolling changes. */
export function autoUpdatePosition(anchor: HTMLElement, floating: HTMLElement, update: () => void) {
  update();
  const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(update);
  resizeObserver?.observe(anchor);
  resizeObserver?.observe(floating);
  window.addEventListener('resize', update);
  window.addEventListener('scroll', update, true);
  return () => {
    resizeObserver?.disconnect();
    window.removeEventListener('resize', update);
    window.removeEventListener('scroll', update, true);
  };
}
import type { CSSProperties } from 'react';
