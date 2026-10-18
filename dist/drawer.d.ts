import * as React from 'react';
import { type DialogContentProps } from './dialog';
export { Dialog as Drawer, DialogClose as DrawerClose, DialogDescription as DrawerDescription, DialogFooter as DrawerFooter, DialogHeader as DrawerHeader, DialogTitle as DrawerTitle, DialogTrigger as DrawerTrigger, type DialogProps as DrawerProps, } from './dialog';
export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';
export interface DrawerContentProps extends DialogContentProps {
    /** Edge the panel slides from. Defaults to `right`. */
    side?: DrawerSide;
}
export declare const DrawerContent: React.ForwardRefExoticComponent<DrawerContentProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=drawer.d.ts.map