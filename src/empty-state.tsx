import * as React from 'react';
import { Button, type ButtonProps } from './button';
import { Skeleton } from './progress';
import { cn } from './utils';

export interface EmptyStateAction {
  label: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  href?: string;
  variant?: ButtonProps['variant'];
}

export interface EmptyStateProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: EmptyStateAction[];
}

export function EmptyState({
  className,
  icon,
  title,
  description,
  actions,
  children,
  ...props
}: EmptyStateProps) {
  return (
    <div data-slot="empty-state" className={cn('slr-empty-state', className)} {...props}>
      {icon ? <div className="slr-empty-state__icon" aria-hidden="true">{icon}</div> : null}
      <div className="slr-empty-state__body">
        <h3 className="slr-empty-state__title">{title}</h3>
        {description ? <p className="slr-empty-state__description">{description}</p> : null}
      </div>
      {children}
      {actions?.length ? (
        <div className="slr-empty-state__actions">
          {actions.map((action, index) => (
            action.href ? (
              <Button key={`${String(action.label)}-${index}`} asChild variant={action.variant ?? 'default'}>
                <a href={action.href}>{action.label}</a>
              </Button>
            ) : (
              <Button
                key={`${String(action.label)}-${index}`}
                variant={action.variant ?? (index === 0 ? 'default' : 'outline')}
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            )
          ))}
        </div>
      ) : null}
    </div>
  );
}

export interface ErrorStateProps extends Omit<EmptyStateProps, 'icon'> {
  retryLabel?: React.ReactNode;
  onRetry?: React.MouseEventHandler<HTMLButtonElement>;
}

export function ErrorState({ actions, retryLabel = 'Try again', onRetry, ...props }: ErrorStateProps) {
  const retryAction = onRetry ? [{ label: retryLabel, onClick: onRetry, variant: 'default' as const }] : [];

  return (
    <EmptyState
      {...props}
      data-tone="danger"
      icon={<span>!</span>}
      actions={[...retryAction, ...(actions ?? [])]}
    />
  );
}

export interface LoadingStateProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  rows?: number;
}

export function LoadingState({
  className,
  title = 'Loading',
  description,
  rows = 3,
  ...props
}: LoadingStateProps) {
  return (
    <div data-slot="loading-state" className={cn('slr-loading-state', className)} aria-busy="true" {...props}>
      <div className="slr-loading-state__copy">
        <p className="slr-loading-state__title">{title}</p>
        {description ? <p className="slr-loading-state__description">{description}</p> : null}
      </div>
      <div className="slr-loading-state__skeletons" aria-hidden="true">
        {Array.from({ length: rows }, (_, index) => (
          <Skeleton key={index} style={{ width: `${100 - index * 12}%` }} />
        ))}
      </div>
    </div>
  );
}
