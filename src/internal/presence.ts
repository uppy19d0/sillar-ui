import * as React from 'react';
import { useIsomorphicLayoutEffect } from '../internal';

/** Keeps content mounted until its CSS exit animation or transition completes. */
export function usePresence(present: boolean) {
  const [mounted, setMounted] = React.useState(present);
  const nodeRef = React.useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (present) setMounted(true);
  }, [present]);

  useIsomorphicLayoutEffect(() => {
    if (present || !mounted) return;
    const node = nodeRef.current;
    if (!node || typeof window === 'undefined') {
      setMounted(false);
      return;
    }
    const styles = window.getComputedStyle(node);
    const hasExitMotion = styles.animationName !== 'none'
      || styles.transitionDuration.split(',').some((duration) => Number.parseFloat(duration) > 0);
    if (!hasExitMotion) {
      setMounted(false);
      return;
    }
    const finish = () => setMounted(false);
    node.addEventListener('animationend', finish, { once: true });
    node.addEventListener('transitionend', finish, { once: true });
    return () => {
      node.removeEventListener('animationend', finish);
      node.removeEventListener('transitionend', finish);
    };
  }, [mounted, present]);

  return { mounted, present, ref: nodeRef };
}
