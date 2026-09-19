import * as React from 'react';
import { cn } from './utils';

export function Card({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div data-slot="card" className={cn('slr-card', className)} {...props} />;
}

export function CardHeader({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div data-slot="card-header" className={cn('slr-card__header', className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.ComponentPropsWithoutRef<'h3'>) {
  return <h3 data-slot="card-title" className={cn('slr-card__title', className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) {
  return <p data-slot="card-description" className={cn('slr-card__description', className)} {...props} />;
}

export function CardAction({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div data-slot="card-action" className={cn('slr-card__action', className)} {...props} />;
}

export function CardContent({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div data-slot="card-content" className={cn('slr-card__content', className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div data-slot="card-footer" className={cn('slr-card__footer', className)} {...props} />;
}
