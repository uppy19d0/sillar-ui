import * as React from 'react';
import { cn } from './utils';

type PossibleRef<T> = React.Ref<T> | undefined;

export function composeRefs<T>(...refs: PossibleRef<T>[]) {
  return (node: T | null) => {
    const cleanups = refs.map((ref) => {
      if (typeof ref === 'function') return ref(node);
      else if (ref) (ref as React.MutableRefObject<T | null>).current = node;
    });
    if (cleanups.some((cleanup) => typeof cleanup === 'function')) {
      return () => {
        refs.forEach((ref, index) => {
          const cleanup = cleanups[index];
          if (typeof cleanup === 'function') cleanup();
          else if (typeof ref === 'function') ref(null);
          else if (ref) (ref as React.MutableRefObject<T | null>).current = null;
        });
      };
    }
  };
}

function elementRef(element: React.ReactElement): PossibleRef<HTMLElement> {
  // React 18 warns when reading props.ref; React 19 warns on element.ref.
  // Their stored value descriptors let us avoid either warning getter.
  const propsRef = Object.getOwnPropertyDescriptor(element.props, 'ref');
  const legacyRef = Object.getOwnPropertyDescriptor(element, 'ref');
  return (propsRef && 'value' in propsRef ? propsRef.value : undefined)
    ?? (legacyRef && 'value' in legacyRef ? legacyRef.value : undefined);
}

function composeEventHandlers(
  childHandler: ((event: Event) => void) | undefined,
  slotHandler: ((event: Event) => void) | undefined,
) {
  return (event: Event) => {
    childHandler?.(event);
    if (!event.defaultPrevented) slotHandler?.(event);
  };
}

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, ...slotProps }, forwardedRef) => {
    if (!React.isValidElement(children) || children.type === React.Fragment) {
      throw new Error('Sillar UI Slot expects exactly one valid non-Fragment React element.');
    }

    const childProps = children.props as Record<string, unknown>;
    const mergedProps: Record<string, unknown> = { ...slotProps, ...childProps };

    Object.keys(slotProps).forEach((key) => {
      if (/^on[A-Z]/.test(key) && typeof slotProps[key as keyof typeof slotProps] === 'function') {
        mergedProps[key] = composeEventHandlers(
          childProps[key] as ((event: Event) => void) | undefined,
          slotProps[key as keyof typeof slotProps] as (event: Event) => void,
        );
      }
    });

    mergedProps.className = cn(slotProps.className, childProps.className as string | undefined);
    mergedProps.style = {
      ...slotProps.style,
      ...(childProps.style as React.CSSProperties | undefined),
    };

    const childRef = elementRef(children);
    mergedProps.ref = React.useMemo(() => composeRefs(forwardedRef, childRef), [forwardedRef, childRef]);

    return React.cloneElement(children, mergedProps);
  },
);

Slot.displayName = 'Slot';
