import * as React from 'react';
import { type ButtonProps } from './button';
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
export declare function ExportActions({ className, actions, labels, onPrint, onPdf, onCopy, onShare, onDownload, disabled, size, ...props }: ExportActionsProps): React.JSX.Element | null;
//# sourceMappingURL=export-actions.d.ts.map