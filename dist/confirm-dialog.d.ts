import * as React from 'react';
import { type ButtonProps } from './button';
import { type DialogContentProps, type DialogProps } from './dialog';
export interface ConfirmDialogProps extends Omit<DialogProps, 'children'> {
    trigger?: React.ReactNode;
    title: React.ReactNode;
    description?: React.ReactNode;
    children?: React.ReactNode;
    confirmLabel?: React.ReactNode;
    cancelLabel?: React.ReactNode;
    confirmVariant?: ButtonProps['variant'];
    confirmLoading?: boolean;
    onConfirm?: React.MouseEventHandler<HTMLButtonElement>;
    contentProps?: Omit<DialogContentProps, 'children'>;
}
export declare function ConfirmDialog({ trigger, title, description, children, confirmLabel, cancelLabel, confirmVariant, confirmLoading, onConfirm, contentProps, ...props }: ConfirmDialogProps): React.JSX.Element;
//# sourceMappingURL=confirm-dialog.d.ts.map