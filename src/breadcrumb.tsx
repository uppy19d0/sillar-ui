import * as React from 'react';
import { Slot } from './slot';
import { cn } from './utils';

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<'nav'> {}

/** Navigation landmark. The default accessible name is English: pass `aria-label` to localize it. */
export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, 'aria-label': ariaLabel = 'Breadcrumb', ...props }, ref) => (
    <nav {...props} ref={ref} aria-label={ariaLabel} data-slot="breadcrumb" className={cn('slr-breadcrumb', className)} />
  ),
);
Breadcrumb.displayName = 'Breadcrumb';

export const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<'ol'>>(
  ({ className, ...props }, ref) => (
    <ol {...props} ref={ref} data-slot="breadcrumb-list" className={cn('slr-breadcrumb__list', className)} />
  ),
);
BreadcrumbList.displayName = 'BreadcrumbList';

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<'li'>>(
  ({ className, ...props }, ref) => (
    <li {...props} ref={ref} data-slot="breadcrumb-item" className={cn('slr-breadcrumb__item', className)} />
  ),
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

export interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<'a'> {
  /** Render the child element (for example a router link) instead of an anchor. */
  asChild?: boolean;
}

export const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ asChild = false, className, ...props }, ref) => {
    const Component = asChild ? Slot : 'a';
    return <Component {...props} ref={ref as React.Ref<HTMLAnchorElement>} data-slot="breadcrumb-link" className={cn('slr-breadcrumb__link', className)} />;
  },
);
BreadcrumbLink.displayName = 'BreadcrumbLink';

/** The current page: announced as such and intentionally not a link. */
export const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<'span'>>(
  ({ className, ...props }, ref) => (
    <span {...props} ref={ref} aria-current="page" data-slot="breadcrumb-page" className={cn('slr-breadcrumb__page', className)} />
  ),
);
BreadcrumbPage.displayName = 'BreadcrumbPage';

export const BreadcrumbSeparator = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<'li'>>(
  ({ className, children, ...props }, ref) => (
    <li {...props} ref={ref} role="presentation" aria-hidden="true" data-slot="breadcrumb-separator" className={cn('slr-breadcrumb__separator', className)}>
      {children ?? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" focusable="false">
          <path d="m9 18 6-6-6-6" />
        </svg>
      )}
    </li>
  ),
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';
