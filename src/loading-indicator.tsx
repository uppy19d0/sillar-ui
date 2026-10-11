import * as React from 'react';
import { cn } from './utils';

export interface LoadingIndicatorProps extends React.ComponentPropsWithoutRef<'span'> {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  /** Use inside an already labelled busy control to avoid duplicate announcements. */
  decorative?: boolean;
}

export const LoadingIndicator = React.forwardRef<HTMLSpanElement, LoadingIndicatorProps>(
  ({ label = 'Loading…', size = 'md', showLabel = true, decorative = false, className, ...props }, ref) => (
    <span {...props} ref={ref} data-slot="loading-indicator" data-size={size}
      className={cn('slr-loading-indicator', className)}
      role={decorative ? undefined : 'status'} aria-live={decorative ? undefined : 'polite'}
      aria-atomic={decorative ? undefined : true} aria-hidden={decorative ? true : undefined}>
      <span className="slr-spinner" aria-hidden="true" />
      {!decorative ? <span className={showLabel ? undefined : 'slr-visually-hidden'}>{label}</span> : null}
    </span>
  ),
);
LoadingIndicator.displayName = 'LoadingIndicator';
