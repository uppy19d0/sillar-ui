import * as React from 'react';
import { Button, type ButtonProps } from './button';
import { cn } from './utils';

export type ExportActionKind = 'print' | 'pdf' | 'copy' | 'share' | 'download';

export interface ExportAction {
  kind: ExportActionKind;
  label: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
  variant?: ButtonProps['variant'];
}

export interface ExportActionsProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onCopy'> {
  actions?: ExportAction[];
  labels?: Partial<Record<ExportActionKind, React.ReactNode>>;
  onPrint?: React.MouseEventHandler<HTMLButtonElement>;
  onPdf?: React.MouseEventHandler<HTMLButtonElement>;
  onCopy?: React.MouseEventHandler<HTMLButtonElement>;
  onShare?: React.MouseEventHandler<HTMLButtonElement>;
  onDownload?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  size?: ButtonProps['size'];
}

const defaultLabels: Record<ExportActionKind, React.ReactNode> = {
  copy: 'Copy',
  download: 'Download',
  pdf: 'Export PDF',
  print: 'Print',
  share: 'Share',
};

function getDefaultActions({
  labels,
  onCopy,
  onDownload,
  onPdf,
  onPrint,
  onShare,
}: Pick<ExportActionsProps, 'labels' | 'onCopy' | 'onDownload' | 'onPdf' | 'onPrint' | 'onShare'>) {
  const defaultActions: ExportAction[] = [];

  if (onPrint) {
    defaultActions.push({ kind: 'print', label: labels?.print ?? defaultLabels.print, onClick: onPrint });
  }
  if (onPdf) {
    defaultActions.push({ kind: 'pdf', label: labels?.pdf ?? defaultLabels.pdf, onClick: onPdf });
  }
  if (onCopy) {
    defaultActions.push({ kind: 'copy', label: labels?.copy ?? defaultLabels.copy, onClick: onCopy });
  }
  if (onShare) {
    defaultActions.push({ kind: 'share', label: labels?.share ?? defaultLabels.share, onClick: onShare });
  }
  if (onDownload) {
    defaultActions.push({
      kind: 'download',
      label: labels?.download ?? defaultLabels.download,
      onClick: onDownload,
    });
  }

  return defaultActions;
}

export function ExportActions({
  className,
  actions,
  labels,
  onPrint,
  onPdf,
  onCopy,
  onShare,
  onDownload,
  disabled = false,
  size = 'sm',
  ...props
}: ExportActionsProps) {
  const resolvedActions = actions ?? getDefaultActions({ labels, onCopy, onDownload, onPdf, onPrint, onShare });

  if (resolvedActions.length === 0) return null;

  return (
    <div data-slot="export-actions" className={cn('slr-export-actions', className)} {...props}>
      {resolvedActions.map((action) => (
        <Button
          key={action.kind}
          size={size}
          variant={action.variant ?? (action.kind === 'pdf' ? 'default' : 'outline')}
          loading={action.loading}
          disabled={disabled || action.disabled}
          onClick={action.onClick}
          data-export-action={action.kind}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}
