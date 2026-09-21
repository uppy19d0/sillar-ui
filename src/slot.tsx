import * as React from 'react';
import { cn } from './utils';

type PossibleRef<T> = React.Ref<T> | undefined;

export function composeRefs<T>(...refs: PossibleRef<T>[]) {
  return (node: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<T | null>).current = node;
    });
  };
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
    if (!React.isValidElement(children)) {
      throw new Error('Sillar UI Slot expects exactly one valid React element.');
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

    const childRef = (childProps.ref ?? (children as React.ReactElement & { ref?: React.Ref<HTMLElement> }).ref) as PossibleRef<HTMLElement>;
    mergedProps.ref = composeRefs(forwardedRef, childRef);

    return React.cloneElement(children, mergedProps);
  },
);

Slot.displayName = 'Slot';
