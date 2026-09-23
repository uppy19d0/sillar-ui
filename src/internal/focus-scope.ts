import { getFocusableElements } from '../internal';
import { isTopLayer, registerLayer } from './layer';

export interface FocusScopeOptions {
  initialFocus?: HTMLElement | null;
  finalFocus?: HTMLElement | null;
  fallbackFocus?: HTMLElement | null;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onDismiss?: () => void;
}

/** Activates modal keyboard focus behavior and returns a complete cleanup function. */
export function activateFocusScope(container: HTMLElement, options: FocusScopeOptions) {
  const previousFocus = document.activeElement as HTMLElement | null;
  const unregisterLayer = registerLayer(container);
  const focusInitial = () => {
    if (container.contains(document.activeElement)) return;
    (options.initialFocus ?? getFocusableElements(container)[0] ?? container).focus({ preventScroll: true });
  };
  const frame = window.requestAnimationFrame(focusInitial);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!isTopLayer(container)) return;
    if (event.key === 'Escape') {
      options.onEscapeKeyDown?.(event);
      if (!event.defaultPrevented) options.onDismiss?.();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = getFocusableElements(container);
    if (focusable.length === 0) {
      event.preventDefault();
      container.focus();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && (document.activeElement === first || !container.contains(document.activeElement))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const handleFocusIn = (event: FocusEvent) => {
    if (!isTopLayer(container) || container.contains(event.target as Node)) return;
    focusInitial();
  };

  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('focusin', handleFocusIn);
  return () => {
    window.cancelAnimationFrame(frame);
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('focusin', handleFocusIn);
    unregisterLayer();
    const target = options.finalFocus ?? options.fallbackFocus ?? previousFocus;
    target?.focus?.({ preventScroll: true });
  };
}
