type InertRecord = {
  count: number;
  inert: boolean;
  ariaHidden: string | null;
};

const inertRecords = new Map<HTMLElement, InertRecord>();
const layerStack: HTMLElement[] = [];
let scrollLockCount = 0;
let originalBodyOverflow = '';

export function registerLayer(layer: HTMLElement) {
  layerStack.push(layer);
  return () => {
    const index = layerStack.lastIndexOf(layer);
    if (index >= 0) layerStack.splice(index, 1);
  };
}

export function isTopLayer(layer: HTMLElement) {
  return layerStack.at(-1) === layer;
}

export function lockBodyScroll() {
  if (scrollLockCount === 0) {
    originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  scrollLockCount += 1;
  return () => {
    scrollLockCount = Math.max(0, scrollLockCount - 1);
    if (scrollLockCount === 0) document.body.style.overflow = originalBodyOverflow;
  };
}

/** Hides every branch outside a modal portal and safely supports nested modals. */
export function makeOutsideContentInert(portal: HTMLElement) {
  const outside = new Set<HTMLElement>();
  let branch: HTMLElement = portal;
  let parent = branch.parentElement;

  while (parent) {
    for (const element of parent.children) {
      if (
        element instanceof HTMLElement
        && element !== branch
        && !['SCRIPT', 'STYLE', 'LINK'].includes(element.tagName)
      ) outside.add(element);
    }
    if (parent === document.body) break;
    branch = parent;
    parent = branch.parentElement;
  }

  const siblings = [...outside];
  siblings.forEach((element) => {
    const current = inertRecords.get(element);
    if (current) {
      current.count += 1;
      return;
    }
    inertRecords.set(element, {
      count: 1,
      inert: element.inert === true,
      ariaHidden: element.getAttribute('aria-hidden'),
    });
    element.inert = true;
    element.setAttribute('aria-hidden', 'true');
  });

  return () => {
    siblings.forEach((element) => {
      const current = inertRecords.get(element);
      if (!current) return;
      current.count -= 1;
      if (current.count > 0) return;
      element.inert = current.inert;
      if (current.ariaHidden === null) element.removeAttribute('aria-hidden');
      else element.setAttribute('aria-hidden', current.ariaHidden);
      inertRecords.delete(element);
    });
  };
}
