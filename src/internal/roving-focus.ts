export type FocusDirection = 'first' | 'last' | 'next' | 'previous';

export interface MoveFocusOptions {
  direction: FocusDirection;
  loop?: boolean;
}

/** Moves focus within an ordered collection while respecting its loop policy. */
export function moveFocus(
  items: HTMLElement[],
  current: HTMLElement | null,
  { direction, loop = true }: MoveFocusOptions,
) {
  if (items.length === 0) return null;
  if (direction === 'first') return items[0];
  if (direction === 'last') return items.at(-1) ?? null;
  const currentIndex = Math.max(0, items.indexOf(current ?? items[0]));
  const delta = direction === 'next' ? 1 : -1;
  const candidate = currentIndex + delta;
  const nextIndex = loop
    ? (candidate + items.length) % items.length
    : Math.max(0, Math.min(candidate, items.length - 1));
  return items[nextIndex] ?? null;
}
