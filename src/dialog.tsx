import * as React from 'react';
import { createPortal } from 'react-dom';
import { Slot, composeRefs } from './slot';
import { cn } from './utils';

type DialogContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  titleId: string;
  descriptionId: string;
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
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const triggerRef = React.useRef<HTMLElement>(null);
  const titleId = React.useId();
  const descriptionId = React.useId();
  const isControlled = open !== undefined;
  const resolvedOpen = isControlled ? open : internalOpen;

  const setOpen = React.useCallback((nextOpen: boolean) => {
    if (!isControlled) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  }, [isControlled, onOpenChange]);

  const value = React.useMemo(() => ({
    open: resolvedOpen,
    setOpen,
    triggerRef,
    titleId,
    descriptionId,
  }), [descriptionId, resolvedOpen, setOpen, titleId]);

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

export interface DialogPortalProps {
  children: React.ReactNode;
  container?: Element | DocumentFragment | null;
}

export function DialogPortal({ children, container }: DialogPortalProps) {
  const { open } = useDialog('DialogPortal');
  if (!open || typeof document === 'undefined') return null;
  return createPortal(children, container ?? document.body);
}

export const DialogOverlay = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, onMouseDown, ...props }, ref) => {
    const context = useDialog('DialogOverlay');
    return (
      <div
        {...props}
        ref={ref}
        data-slot="dialog-overlay"
        data-state={context.open ? 'open' : 'closed'}
        className={cn('slr-dialog__overlay', className)}
        onMouseDown={(event) => {
          onMouseDown?.(event);
          if (!event.defaultPrevented && event.target === event.currentTarget) context.setOpen(false);
        }}
      />
    );
  },
);

DialogOverlay.displayName = 'DialogOverlay';

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  overlayClassName?: string;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
}

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, overlayClassName, children, onEscapeKeyDown, ...props }, forwardedRef) => {
    const context = useDialog('DialogContent');
    const contentRef = React.useRef<HTMLDivElement>(null);
    const setOpenRef = React.useRef(context.setOpen);
    const onEscapeKeyDownRef = React.useRef(onEscapeKeyDown);

    setOpenRef.current = context.setOpen;
    onEscapeKeyDownRef.current = onEscapeKeyDown;

    React.useEffect(() => {
      if (!context.open) return;
      const previousFocus = document.activeElement as HTMLElement | null;
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const frame = window.requestAnimationFrame(() => {
        const content = contentRef.current;
        if (!content || content.contains(document.activeElement)) return;
        const firstFocusable = content.querySelector<HTMLElement>(focusableSelector);
        (firstFocusable ?? content).focus();
      });

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onEscapeKeyDownRef.current?.(event);
          if (!event.defaultPrevented) setOpenRef.current(false);
          return;
        }
        if (event.key !== 'Tab') return;
        const content = contentRef.current;
        if (!content) return;
        const focusable = Array.from(content.querySelectorAll<HTMLElement>(focusableSelector));
        if (focusable.length === 0) {
          event.preventDefault();
          content.focus();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && (document.activeElement === first || !content.contains(document.activeElement))) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      };

      const handleFocusIn = (event: FocusEvent) => {
        const content = contentRef.current;
        if (!content || content.contains(event.target as Node)) return;
        (content.querySelector<HTMLElement>(focusableSelector) ?? content).focus();
      };

      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('focusin', handleFocusIn);
      return () => {
        window.cancelAnimationFrame(frame);
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('focusin', handleFocusIn);
        document.body.style.overflow = previousOverflow;
        context.triggerRef.current?.focus?.();
        if (!context.triggerRef.current) previousFocus?.focus?.();
      };
    }, [context.open, context.triggerRef]);

    return (
      <DialogPortal>
        <DialogOverlay className={overlayClassName} />
        <div
          {...props}
          ref={composeRefs(contentRef, forwardedRef)}
          data-slot="dialog-content"
          data-state={context.open ? 'open' : 'closed'}
          role="dialog"
          aria-modal="true"
          aria-labelledby={context.titleId}
          aria-describedby={context.descriptionId}
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
    const { titleId } = useDialog('DialogTitle');
    return <h2 {...props} ref={ref} id={titleId} className={cn('slr-dialog__title', className)} />;
  },
);

DialogTitle.displayName = 'DialogTitle';

export const DialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { descriptionId } = useDialog('DialogDescription');
    return <p {...props} ref={ref} id={descriptionId} className={cn('slr-dialog__description', className)} />;
  },
);

DialogDescription.displayName = 'DialogDescription';
