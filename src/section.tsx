import * as React from 'react';
import { cn } from './utils';

export interface SectionProps extends React.ComponentPropsWithoutRef<'section'> {
  containerClassName?: string;
}

export function Section({ className, containerClassName, children, ...props }: SectionProps) {
  return (
    <section className={cn('slr-section', className)} {...props}>
      <div className={cn('slr-container', containerClassName)}>{children}</div>
    </section>
  );
}

export function SectionHeader({ className, ...props }: React.ComponentPropsWithoutRef<'header'>) {
  return <header className={cn('slr-section-header', className)} {...props} />;
}

export function SectionEyebrow({ className, ...props }: React.ComponentPropsWithoutRef<'span'>) {
  return <span className={cn('slr-eyebrow', className)} {...props} />;
}

export function SectionTitle({ className, ...props }: React.ComponentPropsWithoutRef<'h2'>) {
  return <h2 className={cn('slr-section-title', className)} {...props} />;
}

export function SectionDescription({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) {
  return <p className={cn('slr-section-description', className)} {...props} />;
}
