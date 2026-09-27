import * as React from 'react';
import { Badge, type BadgeProps } from './badge';
import { cn } from './utils';

export interface CalculatorShellProps extends Omit<React.ComponentPropsWithoutRef<'section'>, 'title'> {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  badge?: React.ReactNode;
  badgeVariant?: BadgeProps['variant'];
  actions?: React.ReactNode;
  aside?: React.ReactNode;
  footer?: React.ReactNode;
  width?: 'default' | 'wide';
}

export function CalculatorShell({
  className,
  eyebrow,
  title,
  description,
  badge,
  badgeVariant = 'secondary',
  actions,
  aside,
  footer,
  width = 'default',
  children,
  ...props
}: CalculatorShellProps) {
  return (
    <section
      data-slot="calculator-shell"
      data-width={width}
      className={cn('slr-calculator-shell', className)}
      {...props}
    >
      <div className="slr-calculator-shell__header">
        <div className="slr-calculator-shell__intro">
          {eyebrow ? <p className="slr-calculator-shell__eyebrow">{eyebrow}</p> : null}
          <div className="slr-calculator-shell__title-row">
            <h2 className="slr-calculator-shell__title">{title}</h2>
            {badge ? <Badge variant={badgeVariant}>{badge}</Badge> : null}
          </div>
          {description ? <p className="slr-calculator-shell__description">{description}</p> : null}
        </div>
        {actions ? <div className="slr-calculator-shell__actions">{actions}</div> : null}
      </div>
      <div className="slr-calculator-shell__layout" data-has-aside={Boolean(aside) || undefined}>
        <div className="slr-calculator-shell__main">{children}</div>
        {aside ? <aside className="slr-calculator-shell__aside">{aside}</aside> : null}
      </div>
      {footer ? <div className="slr-calculator-shell__footer">{footer}</div> : null}
    </section>
  );
}

export interface CalculatorPanelProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}

export function CalculatorPanel({
  className,
  title,
  description,
  actions,
  children,
  ...props
}: CalculatorPanelProps) {
  return (
    <div data-slot="calculator-panel" className={cn('slr-calculator-panel', className)} {...props}>
      {title || description || actions ? (
        <div className="slr-calculator-panel__header">
          <div className="slr-calculator-panel__intro">
            {title ? <h3 className="slr-calculator-panel__title">{title}</h3> : null}
            {description ? <p className="slr-calculator-panel__description">{description}</p> : null}
          </div>
          {actions ? <div className="slr-calculator-panel__actions">{actions}</div> : null}
        </div>
      ) : null}
      <div className="slr-calculator-panel__content">{children}</div>
    </div>
  );
}
