import * as React from 'react';
type PossibleRef<T> = React.Ref<T> | undefined;
export declare function composeRefs<T>(...refs: PossibleRef<T>[]): (node: T | null) => void;
export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
}
export declare const Slot: React.ForwardRefExoticComponent<SlotProps & React.RefAttributes<HTMLElement>>;
export {};
//# sourceMappingURL=slot.d.ts.map