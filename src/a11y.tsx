import * as React from 'react';
import { Slot } from './slot';
import { cn } from './utils';

export interface VisuallyHiddenProps extends React.ComponentPropsWithoutRef<'span'> {
  asChild?: boolean;
}

export function VisuallyHidden({ asChild = false, className, ...props }: VisuallyHiddenProps) {
  const Component = asChild ? Slot : 'span';
  return <Component className={cn('slr-visually-hidden', className)} {...props} />;
}

export function SkipLink({ className, ...props }: React.ComponentPropsWithoutRef<'a'>) {
  return <a className={cn('slr-skip-link', className)} {...props} />;
}
