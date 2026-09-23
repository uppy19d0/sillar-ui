export interface DismissableLayerOptions {
  branches?: Array<HTMLElement | null>;
  onDismiss: () => void;
}

/** Dismisses a non-modal layer when a pointer starts outside all registered branches. */
export function activateDismissableLayer(container: HTMLElement, options: DismissableLayerOptions) {
  const handlePointerDown = (event: PointerEvent) => {
    const target = event.target as Node;
    if (container.contains(target)) return;
    if (options.branches?.some((branch) => branch?.contains(target))) return;
    options.onDismiss();
  };
  document.addEventListener('pointerdown', handlePointerDown);
  return () => document.removeEventListener('pointerdown', handlePointerDown);
}
