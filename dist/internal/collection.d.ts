export interface CollectionItem {
    element: HTMLElement;
    textValue: string;
}
/** Returns enabled collection items in DOM order. */
export declare function getCollectionItems(root: HTMLElement, selector: string): CollectionItem[];
/** Finds the next prefix match, beginning after the active item and wrapping once. */
export declare function findTypeaheadMatch(items: CollectionItem[], search: string, activeElement: HTMLElement | null): HTMLElement | null;
export declare function isPrintableKey(event: Pick<KeyboardEvent, 'key' | 'altKey' | 'ctrlKey' | 'metaKey'>): boolean;
//# sourceMappingURL=collection.d.ts.map