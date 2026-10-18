import * as React from 'react';
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
export declare const Table: React.ForwardRefExoticComponent<TableProps & React.RefAttributes<HTMLTableElement>>;
export declare const TableCaption: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & React.RefAttributes<HTMLTableCaptionElement>>;
export declare const TableHeader: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>, "ref"> & React.RefAttributes<HTMLTableSectionElement>>;
export declare const TableBody: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>, "ref"> & React.RefAttributes<HTMLTableSectionElement>>;
export declare const TableFooter: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>, "ref"> & React.RefAttributes<HTMLTableSectionElement>>;
export interface TableRowProps extends React.ComponentPropsWithoutRef<'tr'> {
    selected?: boolean;
}
export declare const TableRow: React.ForwardRefExoticComponent<TableRowProps & React.RefAttributes<HTMLTableRowElement>>;
export interface TableHeadProps extends Omit<React.ComponentPropsWithoutRef<'th'>, 'align'> {
    /** Current sort of this column; sets `aria-sort`. */
    sort?: TableSortDirection;
    /** When provided, the header content becomes a button that requests a sort change. */
    onSort?: () => void;
    align?: 'start' | 'center' | 'end';
}
export declare const TableHead: React.ForwardRefExoticComponent<TableHeadProps & React.RefAttributes<HTMLTableCellElement>>;
export interface TableCellProps extends Omit<React.ComponentPropsWithoutRef<'td'>, 'align'> {
    align?: 'start' | 'center' | 'end';
    /** Use tabular figures so numeric columns line up. */
    numeric?: boolean;
}
export declare const TableCell: React.ForwardRefExoticComponent<TableCellProps & React.RefAttributes<HTMLTableCellElement>>;
//# sourceMappingURL=table.d.ts.map