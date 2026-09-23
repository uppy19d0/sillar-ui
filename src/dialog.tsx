import * as React from 'react';
import { useControllableState, useIsomorphicLayoutEffect } from './internal';
import { activateFocusScope } from './internal/focus-scope';
import { lockBodyScroll, makeOutsideContentInert } from './internal/layer';
import { Portal } from './internal/portal';
import { Slot, composeRefs } from './slot';
import { cn } from './utils';

type DialogContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  titleId: string;
  descriptionId: string;
  hasTitle: boolean;
  hasDescription: boolean;
  registerTitle: () => () => void;
  registerDescription: () => () => void;
};

const DialogContext = React.createContext<DialogContextValue | null>(null);

function useDialog(component: string) {
  const context = React.useContext(DialogContext);
  if (!context) throw new Error(`${component} must be rendered inside Dialog.`);
  return context;
}

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, defaultOpen = false, onOpenChange, children }: DialogProps) {
  const [resolvedOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const triggerRef = React.useRef<HTMLElement>(null);
  const titleId = React.useId();
  const descriptionId = React.useId();
  const [titleCount, setTitleCount] = React.useState(0);
  const [descriptionCount, setDescriptionCount] = React.useState(0);
  const registerTitle = React.useCallback(() => {
    setTitleCount((count) => count + 1);
    return () => setTitleCount((count) => Math.max(0, count - 1));
  }, []);
  const registerDescription = React.useCallback(() => {
    setDescriptionCount((count) => count + 1);
    return () => setDescriptionCount((count) => Math.max(0, count - 1));
  }, []);
  const value = React.useMemo(() => ({
    open: resolvedOpen,
    setOpen,
    triggerRef,
    titleId,
    descriptionId,
    hasTitle: titleCount > 0,
    hasDescription: descriptionCount > 0,
    registerTitle,
    registerDescription,
  }), [
    descriptionCount,
    descriptionId,
    registerDescription,
    registerTitle,
    resolvedOpen,
    setOpen,
    titleCount,
    titleId,
  ]);

  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
}

interface DialogActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogActionProps>(
  ({ asChild = false, onClick, type, ...props }, ref) => {
    const context = useDialog('DialogTrigger');
    const Component = asChild ? Slot : 'button';
    return (
      <Component
        {...props}
        ref={composeRefs(ref as React.Ref<HTMLElement>, context.triggerRef)}
        type={asChild ? undefined : type ?? 'button'}
        aria-haspopup="dialog"
        aria-expanded={context.open}
        data-state={context.open ? 'open' : 'closed'}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          onClick?.(event);
          if (!event.defaultPrevented) context.setOpen(true);
        }}
      />
    );
  },
);

DialogTrigger.displayName = 'DialogTrigger';

export const DialogClose = React.forwardRef<HTMLButtonElement, DialogActionProps>(
  ({ asChild = false, onClick, type, ...props }, ref) => {
    const context = useDialog('DialogClose');
    const Component = asChild ? Slot : 'button';
    return (
      <Component
        {...props}
        ref={ref as React.Ref<HTMLButtonElement>}
        type={asChild ? undefined : type ?? 'button'}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          onClick?.(event);
          if (!event.defaultPrevented) context.setOpen(false);
        }}
      />
    );
  },
);

DialogClose.displayName = 'DialogClose';

export interface DialogPortalProps extends React.HTMLAttributes<HTMLDivElement> {
  container?: Element | DocumentFragment | null;
}

export function DialogPortal({ children, container, className, ...props }: DialogPortalProps) {
  const { open } = useDialog('DialogPortal');
  if (!open || typeof document === 'undefined') return null;
  return <Portal container={container}>
    <div {...props} data-slot="dialog-portal" className={cn('slr-dialog__portal', className)}>
      {children}
    </div>
  </Portal>;
}

export const DialogOverlay = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, onPointerDown, ...props }, ref) => {
    const context = useDialog('DialogOverlay');
    return (
      <div
        {...props}
        ref={ref}
        data-slot="dialog-overlay"
        data-state={context.open ? 'open' : 'closed'}
        className={cn('slr-dialog__overlay', className)}
        onPointerDown={(event) => {
          onPointerDown?.(event);
          if (!event.defaultPrevented && event.target === event.currentTarget) context.setOpen(false);
        }}
      />
    );
  },
);

DialogOverlay.displayName = 'DialogOverlay';

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  overlayClassName?: string;
  portalContainer?: Element | DocumentFragment | null;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  finalFocusRef?: React.RefObject<HTMLElement | null>;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
}

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({
    className,
    overlayClassName,
    children,
    portalContainer,
    initialFocusRef,
    finalFocusRef,
    onEscapeKeyDown,
    role = 'dialog',
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    ...props
  }, forwardedRef) => {
    const context = useDialog('DialogContent');
    const contentRef = React.useRef<HTMLDivElement>(null);
    const setOpenRef = React.useRef(context.setOpen);
    const onEscapeKeyDownRef = React.useRef(onEscapeKeyDown);
    const initialFocusRefRef = React.useRef(initialFocusRef);
    const finalFocusRefRef = React.useRef(finalFocusRef);

    setOpenRef.current = context.setOpen;
    onEscapeKeyDownRef.current = onEscapeKeyDown;
    initialFocusRefRef.current = initialFocusRef;
    finalFocusRefRef.current = finalFocusRef;

    React.useEffect(() => {
      if (!context.open) return;
      const content = contentRef.current;
      if (!content) return;
      const portal = content.closest<HTMLElement>('[data-slot="dialog-portal"]');
      const unlockScroll = lockBodyScroll();
      const restoreOutside = portal ? makeOutsideContentInert(portal) : () => undefined;
      const deactivateFocusScope = activateFocusScope(content, {
        initialFocus: initialFocusRefRef.current?.current,
        finalFocus: finalFocusRefRef.current?.current,
        fallbackFocus: context.triggerRef.current,
        onEscapeKeyDown: (event) => onEscapeKeyDownRef.current?.(event),
        onDismiss: () => setOpenRef.current(false),
      });
      return () => {
        restoreOutside();
        unlockScroll();
        deactivateFocusScope();
      };
    }, [context.open, context.triggerRef]);

    return (
      <DialogPortal container={portalContainer}>
        <DialogOverlay className={overlayClassName} />
        <div
          {...props}
          ref={composeRefs(contentRef, forwardedRef)}
          data-slot="dialog-content"
          data-state={context.open ? 'open' : 'closed'}
          role={role}
          aria-modal="true"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy ?? (!ariaLabel && context.hasTitle ? context.titleId : undefined)}
          aria-describedby={ariaDescribedBy ?? (context.hasDescription ? context.descriptionId : undefined)}
          tabIndex={-1}
          className={cn('slr-dialog__content', className)}
        >
          {children}
        </div>
      </DialogPortal>
    );
  },
);

DialogContent.displayName = 'DialogContent';

export const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div data-slot="dialog-header" className={cn('slr-dialog__header', className)} {...props} />
);

export const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div data-slot="dialog-footer" className={cn('slr-dialog__footer', className)} {...props} />
);

export const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    const { titleId, registerTitle } = useDialog('DialogTitle');
    useIsomorphicLayoutEffect(() => registerTitle(), [registerTitle]);
    return <h2 {...props} ref={ref} id={titleId} className={cn('slr-dialog__title', className)} />;
  },
);

DialogTitle.displayName = 'DialogTitle';

export const DialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { descriptionId, registerDescription } = useDialog('DialogDescription');
    useIsomorphicLayoutEffect(() => registerDescription(), [registerDescription]);
    return <p {...props} ref={ref} id={descriptionId} className={cn('slr-dialog__description', className)} />;
  },
);

DialogDescription.displayName = 'DialogDescription';
