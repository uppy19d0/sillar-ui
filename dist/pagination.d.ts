import * as React from 'react';
export type PaginationItemKind = number | 'ellipsis-start' | 'ellipsis-end';
export interface PaginationRangeOptions {
    /** Current page, 1-based. */
    page: number;
    pageCount: number;
    /** Pages shown on each side of the current page. Defaults to 1. */
    siblingCount?: number;
    /** Pages always shown at the start and end. Defaults to 1. */
    boundaryCount?: number;
}
/** Pages to render, with ellipses where pages are skipped. The length stays constant while navigating, so the control does not jump. */
export declare function getPaginationRange({ page, pageCount, siblingCount, boundaryCount }: PaginationRangeOptions): PaginationItemKind[];
export interface PaginationLabels {
    navigation: string;
    previous: string;
    next: string;
    page: (page: number) => string;
}
export interface PaginationProps extends Omit<React.ComponentPropsWithoutRef<'nav'>, 'onChange' | 'children'> {
    /** Current page (1-based) for controlled use. */
    page?: number;
    defaultPage?: number;
    pageCount: number;
    onPageChange?: (page: number) => void;
    siblingCount?: number;
    boundaryCount?: number;
    /** Localized text. Provide all four keys: they are announced by assistive technology. */
    labels?: Partial<PaginationLabels>;
    /** Render real links (useful for server-rendered or crawlable pages). Clicks still call `onPageChange`. */
    getHref?: (page: number) => string;
    disabled?: boolean;
}
export declare const Pagination: React.ForwardRefExoticComponent<PaginationProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=pagination.d.ts.map