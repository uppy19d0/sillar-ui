export interface DismissableLayerOptions {
    branches?: Array<HTMLElement | null>;
    onDismiss: () => void;
}
/** Dismisses a non-modal layer when a pointer starts outside all registered branches. */
export declare function activateDismissableLayer(container: HTMLElement, options: DismissableLayerOptions): () => void;
//# sourceMappingURL=dismissable-layer.d.ts.map