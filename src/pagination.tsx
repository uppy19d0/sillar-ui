import * as React from 'react';
import { useControllableState } from './internal';
import { cn } from './utils';

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

const range = (start: number, end: number) => Array.from({ length: Math.max(0, end - start + 1) }, (_, index) => start + index);
const integer = (value: number | undefined, fallback: number, minimum: number) => Number.isFinite(value) ? Math.max(minimum, Math.floor(value as number)) : fallback;

/** Pages to render, with ellipses where pages are skipped. The length stays constant while navigating, so the control does not jump. */
export function getPaginationRange({ page, pageCount, siblingCount = 1, boundaryCount = 1 }: PaginationRangeOptions): PaginationItemKind[] {
  const total = integer(pageCount, 0, 0), siblings = integer(siblingCount, 1, 0), boundary = integer(boundaryCount, 1, 0);
  if (total === 0) return [];
  const current = Math.min(Math.max(integer(page, 1, 1), 1), total);
  if (total <= siblings * 2 + 3 + boundary * 2) return range(1, total);

  const startPages = range(1, boundary), endPages = range(total - boundary + 1, total);
  const siblingsStart = Math.max(Math.min(current - siblings, total - boundary - siblings * 2 - 1), boundary + 2);
  const siblingsEnd = Math.min(Math.max(current + siblings, boundary + siblings * 2 + 2), endPages.length > 0 ? endPages[0] - 2 : total - 1);
  return [
    ...startPages,
    ...(siblingsStart > boundary + 2 ? ['ellipsis-start' as const] : boundary + 1 < total - boundary ? [boundary + 1] : []),
    ...range(siblingsStart, siblingsEnd),
    ...(siblingsEnd < total - boundary - 1 ? ['ellipsis-end' as const] : total - boundary > boundary ? [total - boundary] : []),
    ...endPages,
  ];
}

export interface PaginationLabels {
  navigation: string;
  previous: string;
  next: string;
  page: (page: number) => string;
}

const defaultLabels: PaginationLabels = {
  navigation: 'Pagination',
  previous: 'Previous',
  next: 'Next',
  page: (page) => `Page ${page}`,
};

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

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ page, defaultPage = 1, pageCount, onPageChange, siblingCount, boundaryCount, labels, getHref, disabled = false, className, ...props }, ref) => {
    const [value, setValue] = useControllableState({ value: page, defaultValue: defaultPage, onChange: onPageChange });
    const text = { ...defaultLabels, ...labels };
    const total = integer(pageCount, 0, 0);
    const current = total === 0 ? 0 : Math.min(Math.max(integer(value, 1, 1), 1), total);
    if (total <= 1) return null;

    const select = (target: number) => (event: React.MouseEvent<HTMLElement>) => {
      const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
      if (disabled || target === current) { event.preventDefault(); return; }
      if (getHref && modified) return;
      event.preventDefault();
      setValue(target);
    };
    const control = (target: number, label: string, children: React.ReactNode, active = false, unavailable = false) => {
      const className = cn('slr-pagination__link', active && 'slr-pagination__link--active');
      const blocked = disabled || unavailable;
      return getHref && !blocked
        ? <a href={getHref(target)} aria-label={label} aria-current={active ? 'page' : undefined} className={className} data-active={active ? '' : undefined} onClick={select(target)}>{children}</a>
        : <button type="button" aria-label={label} aria-current={active ? 'page' : undefined} disabled={blocked} className={className} data-active={active ? '' : undefined} onClick={select(target)}>{children}</button>;
    };

    return (
      <nav {...props} ref={ref} aria-label={props['aria-label'] ?? text.navigation} data-slot="pagination" className={cn('slr-pagination', className)}>
        <ul className="slr-pagination__list">
          <li>{control(current - 1, text.previous, <><span aria-hidden="true">‹</span><span className="slr-pagination__label">{text.previous}</span></>, false, current <= 1)}</li>
          {getPaginationRange({ page: current, pageCount: total, siblingCount, boundaryCount }).map((item) => typeof item === 'number'
            ? <li key={item}>{control(item, text.page(item), item, item === current)}</li>
            : <li key={item} className="slr-pagination__ellipsis" aria-hidden="true">…</li>)}
          <li>{control(current + 1, text.next, <><span className="slr-pagination__label">{text.next}</span><span aria-hidden="true">›</span></>, false, current >= total)}</li>
        </ul>
      </nav>
    );
  },
);
Pagination.displayName = 'Pagination';
