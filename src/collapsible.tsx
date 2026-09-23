import * as React from 'react';
import { useControllableState } from './internal';
import { cn } from './utils';

type CollapsibleContextValue = { open: boolean; setOpen: (open: boolean) => void; contentId: string };
const CollapsibleContext = React.createContext<CollapsibleContextValue | null>(null);

function useCollapsible(name: string) {
  const context = React.useContext(CollapsibleContext);
  if (!context) throw new Error(`${name} must be rendered inside Collapsible.`);
  return context;
}

export interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
}

export const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ open, defaultOpen = false, onOpenChange, disabled, className, children, ...props }, ref) => {
    const [resolvedOpen, setOpen] = useControllableState({ value: open, defaultValue: defaultOpen, onChange: onOpenChange });
    const contentId = React.useId();
    const value = React.useMemo(() => ({
      open: resolvedOpen,
      setOpen: (next: boolean) => { if (!disabled) setOpen(next); },
      contentId,
    }), [contentId, disabled, resolvedOpen, setOpen]);
    return <CollapsibleContext.Provider value={value}>
      <div {...props} ref={ref} data-slot="collapsible" data-state={resolvedOpen ? 'open' : 'closed'} data-disabled={disabled || undefined} className={cn('slr-collapsible', className)}>{children}</div>
    </CollapsibleContext.Provider>;
  },
);
Collapsible.displayName = 'Collapsible';

export const CollapsibleTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ onClick, type, ...props }, ref) => {
    const context = useCollapsible('CollapsibleTrigger');
    return <button {...props} ref={ref} type={type ?? 'button'} aria-expanded={context.open} aria-controls={context.contentId} data-slot="collapsible-trigger" data-state={context.open ? 'open' : 'closed'} onClick={(event) => { onClick?.(event); if (!event.defaultPrevented) context.setOpen(!context.open); }} />;
  },
);
CollapsibleTrigger.displayName = 'CollapsibleTrigger';

export const CollapsibleContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const context = useCollapsible('CollapsibleContent');
    return <div {...props} ref={ref} id={context.contentId} hidden={!context.open} data-slot="collapsible-content" data-state={context.open ? 'open' : 'closed'} className={cn('slr-collapsible__content', className)} />;
  },
);
CollapsibleContent.displayName = 'CollapsibleContent';
