export type FocusDirection = 'first' | 'last' | 'next' | 'previous';
export interface MoveFocusOptions {
    direction: FocusDirection;
    loop?: boolean;
}
/** Moves focus within an ordered collection while respecting its loop policy. */
export declare function moveFocus(items: HTMLElement[], current: HTMLElement | null, { direction, loop }: MoveFocusOptions): HTMLElement | null;
//# sourceMappingURL=roving-focus.d.ts.map