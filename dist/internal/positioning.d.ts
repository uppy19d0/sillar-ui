export type Side = 'top' | 'right' | 'bottom' | 'left';
export type Align = 'start' | 'center' | 'end';
export interface PositionOptions {
    side?: Side;
    align?: Align;
    sideOffset?: number;
    collisionPadding?: number;
    avoidCollisions?: boolean;
    direction?: 'ltr' | 'rtl';
    matchAnchorWidth?: boolean;
}
export interface PositionResult {
    side: Side;
    style: CSSProperties;
}
/** Calculates fixed positioning and flips the requested side when space is tighter. */
export declare function calculatePosition(anchor: DOMRect, floating: {
    width: number;
    height: number;
}, viewport: {
    width: number;
    height: number;
}, options?: PositionOptions): PositionResult;
/** Keeps a floating element aligned during layout, resize, and nested scrolling changes. */
export declare function autoUpdatePosition(anchor: HTMLElement, floating: HTMLElement, update: () => void): () => void;
import type { CSSProperties } from 'react';
//# sourceMappingURL=positioning.d.ts.map