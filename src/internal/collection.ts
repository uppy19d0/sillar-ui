export interface CollectionItem {
  element: HTMLElement;
  textValue: string;
}

function normalize(value: string) {
  return value.trim().toLocaleLowerCase();
}

/** Returns enabled collection items in DOM order. */
export function getCollectionItems(root: HTMLElement, selector: string): CollectionItem[] {
  return Array.from(root.querySelectorAll<HTMLElement>(selector))
    .filter((element) => element.getAttribute('aria-disabled') !== 'true' && !element.hasAttribute('disabled'))
    .map((element) => ({
      element,
      textValue: element.dataset.textValue ?? element.textContent?.trim() ?? '',
    }));
}

/** Finds the next prefix match, beginning after the active item and wrapping once. */
export function findTypeaheadMatch(
  items: CollectionItem[],
  search: string,
  activeElement: HTMLElement | null,
) {
  const query = normalize(search);
  if (!query || items.length === 0) return null;

  const activeIndex = items.findIndex(({ element }) => element === activeElement);
  const ordered = [...items.slice(activeIndex + 1), ...items.slice(0, activeIndex + 1)];
  return ordered.find(({ textValue }) => normalize(textValue).startsWith(query))?.element ?? null;
}

export function isPrintableKey(event: Pick<KeyboardEvent, 'key' | 'altKey' | 'ctrlKey' | 'metaKey'>) {
  return event.key.length === 1 && !event.altKey && !event.ctrlKey && !event.metaKey;
}
