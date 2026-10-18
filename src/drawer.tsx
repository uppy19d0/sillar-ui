import * as React from 'react';
import { DialogContent, type DialogContentProps } from './dialog';
import { cn } from './utils';

// A drawer is a dialog anchored to a viewport edge: it keeps the focus trap, scroll lock,
// inert background, Escape handling and focus restoration of Dialog.
export {
  Dialog as Drawer,
  DialogClose as DrawerClose,
  DialogDescription as DrawerDescription,
  DialogFooter as DrawerFooter,
  DialogHeader as DrawerHeader,
  DialogTitle as DrawerTitle,
  DialogTrigger as DrawerTrigger,
  type DialogProps as DrawerProps,
} from './dialog';

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerContentProps extends DialogContentProps {
  /** Edge the panel slides from. Defaults to `right`. */
  side?: DrawerSide;
}

export const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ side = 'right', className, overlayClassName, ...props }, ref) => (
    <DialogContent
      {...props}
      ref={ref}
      data-side={side}
      className={cn('slr-drawer__content', className)}
      overlayClassName={cn('slr-drawer__overlay', overlayClassName)}
    />
  ),
);
DrawerContent.displayName = 'DrawerContent';
