import * as React from 'react';
import { cn } from './utils';

export type TableDensity = 'comfortable' | 'compact';
export type TableSortDirection = 'ascending' | 'descending' | 'none';

export interface TableProps extends React.ComponentPropsWithoutRef<'table'> {
  /** Accessible name for the horizontally scrollable region. Provide it for wide tables so keyboard users can scroll them. */
  label?: string;
  density?: TableDensity;
  striped?: boolean;
  /** Keep the header row visible while the region scrolls vertically (give the region a height with `containerClassName`). */
  stickyHeader?: boolean;
  containerClassName?: string;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ label, 'aria-labelledby': labelledBy, density = 'comfortable', striped = false, stickyHeader = false, className, containerClassName, ...props }, ref) => {
    const named = Boolean(label || labelledBy);
    return (
      <div
        data-slot="table-container"
        className={cn('slr-table__container', containerClassName)}
        {...(named ? { role: 'region', tabIndex: 0, 'aria-label': label, 'aria-labelledby': label ? undefined : labelledBy } : {})}
      >
        <table
          {...props}
          ref={ref}
          data-slot="table"
          data-density={density}
          data-striped={striped ? '' : undefined}
          data-sticky-header={stickyHeader ? '' : undefined}
          className={cn('slr-table', className)}
        />
      </div>
    );
  },
);
Table.displayName = 'Table';

export const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.ComponentPropsWithoutRef<'caption'>>(
  ({ className, ...props }, ref) => <caption {...props} ref={ref} data-slot="table-caption" className={cn('slr-table__caption', className)} />,
);
TableCaption.displayName = 'TableCaption';

export const TableHeader = React.forwardRef<HTMLTableSectionElement, React.ComponentPropsWithoutRef<'thead'>>(
  ({ className, ...props }, ref) => <thead {...props} ref={ref} data-slot="table-header" className={cn('slr-table__header', className)} />,
);
TableHeader.displayName = 'TableHeader';

export const TableBody = React.forwardRef<HTMLTableSectionElement, React.ComponentPropsWithoutRef<'tbody'>>(
  ({ className, ...props }, ref) => <tbody {...props} ref={ref} data-slot="table-body" className={cn('slr-table__body', className)} />,
);
TableBody.displayName = 'TableBody';

export const TableFooter = React.forwardRef<HTMLTableSectionElement, React.ComponentPropsWithoutRef<'tfoot'>>(
  ({ className, ...props }, ref) => <tfoot {...props} ref={ref} data-slot="table-footer" className={cn('slr-table__footer', className)} />,
);
TableFooter.displayName = 'TableFooter';

export interface TableRowProps extends React.ComponentPropsWithoutRef<'tr'> {
  selected?: boolean;
}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ selected = false, className, ...props }, ref) => (
    <tr {...props} ref={ref} data-slot="table-row" data-state={selected ? 'selected' : undefined} aria-selected={selected || undefined} className={cn('slr-table__row', className)} />
  ),
);
TableRow.displayName = 'TableRow';

export interface TableHeadProps extends Omit<React.ComponentPropsWithoutRef<'th'>, 'align'> {
  /** Current sort of this column; sets `aria-sort`. */
  sort?: TableSortDirection;
  /** When provided, the header content becomes a button that requests a sort change. */
  onSort?: () => void;
  align?: 'start' | 'center' | 'end';
}

const sortGlyph: Record<TableSortDirection, string> = { ascending: '↑', descending: '↓', none: '↕' };

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ sort, onSort, align = 'start', scope = 'col', className, children, ...props }, ref) => (
    <th
      {...props}
      ref={ref}
      scope={scope}
      aria-sort={sort}
      data-slot="table-head"
      data-align={align}
      className={cn('slr-table__head', className)}
    >
      {onSort ? (
        <button type="button" className="slr-table__sort" onClick={onSort}>
          {children}
          <span aria-hidden="true" className="slr-table__sort-icon" data-sort={sort ?? 'none'}>{sortGlyph[sort ?? 'none']}</span>
        </button>
      ) : children}
    </th>
  ),
);
TableHead.displayName = 'TableHead';

export interface TableCellProps extends Omit<React.ComponentPropsWithoutRef<'td'>, 'align'> {
  align?: 'start' | 'center' | 'end';
  /** Use tabular figures so numeric columns line up. */
  numeric?: boolean;
}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ align, numeric = false, className, ...props }, ref) => (
    <td
      {...props}
      ref={ref}
      data-slot="table-cell"
      data-align={align ?? (numeric ? 'end' : 'start')}
      data-numeric={numeric ? '' : undefined}
      className={cn('slr-table__cell', className)}
    />
  ),
);
TableCell.displayName = 'TableCell';
