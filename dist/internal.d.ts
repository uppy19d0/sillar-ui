import * as React from 'react';
export declare const useIsomorphicLayoutEffect: typeof React.useEffect;
export type ControllableStateUpdater<T> = T | ((previous: T) => T);
export declare function useControllableState<T>({ value, defaultValue, onChange, }: {
    value?: T;
    defaultValue: T;
    onChange?: (value: T) => void;
}): [T, (next: ControllableStateUpdater<T>) => void];
export declare const focusableSelector: string;
export declare function getFocusableElements(container: HTMLElement): HTMLElement[];
//# sourceMappingURL=internal.d.ts.map