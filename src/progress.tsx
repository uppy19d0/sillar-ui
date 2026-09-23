import * as React from 'react';
import { cn } from './utils';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> { value?: number | null; max?: number }
export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(({ value = null, max = 100, className, ...props }, ref) => {
  const safeMax = Number.isFinite(max) && max > 0 ? max : 100;
  const safeValue = value === null ? null : Math.max(0, Math.min(value, safeMax));
  const percent = safeValue === null ? null : (safeValue / safeMax) * 100;
  return <div {...props} ref={ref} role="progressbar" aria-valuemin={0} aria-valuemax={safeMax} aria-valuenow={safeValue ?? undefined} data-slot="progress" data-state={safeValue === null ? 'indeterminate' : 'complete'} className={cn('slr-progress', className)}><div data-slot="progress-indicator" className="slr-progress__indicator" style={{ transform: percent === null ? undefined : `translateX(-${100 - percent}%)` }} /></div>;
});
Progress.displayName = 'Progress';

export const Skeleton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div {...props} ref={ref} aria-hidden="true" data-slot="skeleton" className={cn('slr-skeleton', className)} />);
Skeleton.displayName = 'Skeleton';
