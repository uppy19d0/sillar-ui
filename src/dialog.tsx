import * as React from 'react';
import { createPortal } from 'react-dom';
import { getFocusableElements, useControllableState, useIsomorphicLayoutEffect } from './internal';
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

type InertRecord = {
  count: number;
  inert: boolean;
  ariaHidden: string | null;
};

const DialogContext = React.createContext<DialogContextValue | null>(null);
const inertRecords = new Map<HTMLElement, InertRecord>();
const dialogStack: HTMLElement[] = [];
let scrollLockCount = 0;
let originalBodyOverflow = '';

function useDialog(component: string) {
  const context = React.useContext(DialogContext);
  if (!context) throw new Error(`${component} must be rendered inside Dialog.`);
  return context;
}

function lockBodyScroll() {
  if (scrollLockCount === 0) {
    originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  scrollLockCount += 1;
  return () => {
    scrollLockCount = Math.max(0, scrollLockCount - 1);
    if (scrollLockCount === 0) document.body.style.overflow = originalBodyOverflow;
  };
}

function makeOutsideContentInert(portal: HTMLElement) {
  const outside = new Set<HTMLElement>();
  let branch: HTMLElement = portal;
  let parent = branch.parentElement;

  while (parent) {
    for (const element of parent.children) {
      if (
        element instanceof HTMLElement
        && element !== branch
        && !['SCRIPT', 'STYLE', 'LINK'].includes(element.tagName)
      ) outside.add(element);
    }
    if (parent === document.body) break;
    branch = parent;
    parent = branch.parentElement;
  }

  const siblings = [...outside];

  siblings.forEach((element) => {
    const current = inertRecords.get(element);
    if (current) {
      current.count += 1;
      return;
    }
    inertRecords.set(element, {
      count: 1,
      inert: element.inert === true,
      ariaHidden: element.getAttribute('aria-hidden'),
    });
    element.inert = true;
    element.setAttribute('aria-hidden', 'true');
  });

  return () => {
    siblings.forEach((element) => {
      const current = inertRecords.get(element);
      if (!current) return;
      current.count -= 1;
      if (current.count > 0) return;
      element.inert = current.inert;
      if (current.ariaHidden === null) element.removeAttribute('aria-hidden');
      else element.setAttribute('aria-hidden', current.ariaHidden);
      inertRecords.delete(element);
    });
  };
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
  return createPortal(
    <div {...props} data-slot="dialog-portal" className={cn('slr-dialog__portal', className)}>
      {children}
    </div>,
    container ?? document.body,
  );
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
      const previousFocus = document.activeElement as HTMLElement | null;
      const portal = content.closest<HTMLElement>('[data-slot="dialog-portal"]');
      const unlockScroll = lockBodyScroll();
      const restoreOutside = portal ? makeOutsideContentInert(portal) : () => undefined;
      dialogStack.push(content);

      const frame = window.requestAnimationFrame(() => {
        if (content.contains(document.activeElement)) return;
        const initialFocus = initialFocusRefRef.current?.current ?? getFocusableElements(content)[0] ?? content;
        initialFocus.focus({ preventScroll: true });
      });

      const isTopLayer = () => dialogStack.at(-1) === content;
      const handleKeyDown = (event: KeyboardEvent) => {
        if (!isTopLayer()) return;
        if (event.key === 'Escape') {
          onEscapeKeyDownRef.current?.(event);
          if (!event.defaultPrevented) setOpenRef.current(false);
          return;
        }
        if (event.key !== 'Tab') return;
        const focusable = getFocusableElements(content);
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
        if (!isTopLayer() || content.contains(event.target as Node)) return;
        (initialFocusRefRef.current?.current ?? getFocusableElements(content)[0] ?? content).focus();
      };

      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('focusin', handleFocusIn);
      return () => {
        window.cancelAnimationFrame(frame);
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('focusin', handleFocusIn);
        const stackIndex = dialogStack.lastIndexOf(content);
        if (stackIndex >= 0) dialogStack.splice(stackIndex, 1);
        restoreOutside();
        unlockScroll();
        const finalFocus = finalFocusRefRef.current?.current ?? context.triggerRef.current ?? previousFocus;
        finalFocus?.focus?.({ preventScroll: true });
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
