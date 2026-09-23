export interface FocusScopeOptions {
    initialFocus?: HTMLElement | null;
    finalFocus?: HTMLElement | null;
    fallbackFocus?: HTMLElement | null;
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
    onDismiss?: () => void;
}
/** Activates modal keyboard focus behavior and returns a complete cleanup function. */
export declare function activateFocusScope(container: HTMLElement, options: FocusScopeOptions): () => void;
//# sourceMappingURL=focus-scope.d.ts.map