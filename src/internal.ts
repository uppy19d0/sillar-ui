import * as React from 'react';

export const useIsomorphicLayoutEffect = typeof window === 'undefined'
  ? React.useEffect
  : React.useLayoutEffect;

export type ControllableStateUpdater<T> = T | ((previous: T) => T);

export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}): [T, (next: ControllableStateUpdater<T>) => void] {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const resolvedValue = isControlled ? value : uncontrolledValue;
  const valueRef = React.useRef(resolvedValue);
  const controlledRef = React.useRef(isControlled);
  const onChangeRef = React.useRef(onChange);

  valueRef.current = resolvedValue;
  controlledRef.current = isControlled;
  onChangeRef.current = onChange;

  const setValue = React.useCallback((next: ControllableStateUpdater<T>) => {
    const nextValue = typeof next === 'function'
      ? (next as (previous: T) => T)(valueRef.current)
      : next;
    if (Object.is(nextValue, valueRef.current)) return;
    valueRef.current = nextValue;
    if (!controlledRef.current) setUncontrolledValue(nextValue);
    onChangeRef.current?.(nextValue);
  }, []);

  return [resolvedValue, setValue];
}

export const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function getFocusableElements(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector))
    .filter((element) => !element.hidden && element.getAttribute('aria-hidden') !== 'true');
}
