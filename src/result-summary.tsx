import * as React from 'react';
import { Badge, type BadgeProps } from './badge';
import { cn } from './utils';

export type ResultSummaryTone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info';

export interface ResultSummaryItem {
  label: React.ReactNode;
  value: React.ReactNode;
  description?: React.ReactNode;
  tone?: ResultSummaryTone;
}

export interface ResultSummaryProps extends Omit<React.ComponentPropsWithoutRef<'section'>, 'title'> {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  value: React.ReactNode;
  description?: React.ReactNode;
  badge?: React.ReactNode;
  badgeVariant?: BadgeProps['variant'];
  tone?: ResultSummaryTone;
  items?: ResultSummaryItem[];
  actions?: React.ReactNode;
}

export function ResultSummary({
  className,
  eyebrow,
  title,
  value,
  description,
  badge,
  badgeVariant = 'secondary',
  tone = 'brand',
  items,
  actions,
  children,
  ...props
}: ResultSummaryProps) {
  return (
    <section
      data-slot="result-summary"
      data-tone={tone}
      className={cn('slr-result-summary', className)}
      {...props}
    >
      <div className="slr-result-summary__header">
        <div className="slr-result-summary__intro">
          {eyebrow ? <p className="slr-result-summary__eyebrow">{eyebrow}</p> : null}
          <div className="slr-result-summary__title-row">
            <h3 className="slr-result-summary__title">{title}</h3>
            {badge ? <Badge variant={badgeVariant}>{badge}</Badge> : null}
          </div>
          <p className="slr-result-summary__value">{value}</p>
          {description ? <p className="slr-result-summary__description">{description}</p> : null}
        </div>
        {actions ? <div className="slr-result-summary__actions">{actions}</div> : null}
      </div>
      {items?.length ? <BreakdownList items={items} /> : null}
      {children}
    </section>
  );
}

export interface BreakdownListProps extends React.ComponentPropsWithoutRef<'dl'> {
  items: ResultSummaryItem[];
}

export function BreakdownList({ className, items, ...props }: BreakdownListProps) {
  return (
    <dl data-slot="breakdown-list" className={cn('slr-breakdown-list', className)} {...props}>
      {items.map((item, index) => (
        <div
          key={`${String(item.label)}-${index}`}
          className="slr-breakdown-list__item"
          data-tone={item.tone ?? 'neutral'}
        >
          <dt className="slr-breakdown-list__label">
            {item.label}
            {item.description ? <span>{item.description}</span> : null}
          </dt>
          <dd className="slr-breakdown-list__value">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
