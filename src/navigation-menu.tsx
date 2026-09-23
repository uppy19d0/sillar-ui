import * as React from 'react';
import { useControllableState } from './internal';
import { moveFocus } from './internal/roving-focus';
import { cn } from './utils';

type NavigationContextValue = { value: string; setValue: (value: string) => void; baseId: string };
const NavigationContext = React.createContext<NavigationContextValue | null>(null);
function useNavigation(name: string) { const value = React.useContext(NavigationContext); if (!value) throw new Error(`${name} must be rendered inside NavigationMenu.`); return value; }
export interface NavigationMenuProps extends Omit<React.HTMLAttributes<HTMLElement>, 'defaultValue' | 'onChange'> { value?: string; defaultValue?: string; onValueChange?: (value: string) => void; label?: string }
export const NavigationMenu = React.forwardRef<HTMLElement, NavigationMenuProps>(({ value, defaultValue = '', onValueChange, label = 'Primary navigation', className, children, ...props }, ref) => { const [resolved, setValue] = useControllableState({ value, defaultValue, onChange: onValueChange }); const baseId = React.useId(); const context = React.useMemo(() => ({ value: resolved, setValue, baseId }), [baseId, resolved, setValue]); return <NavigationContext.Provider value={context}><nav {...props} ref={ref} aria-label={label} data-slot="navigation-menu" className={cn('slr-navigation', className)}>{children}</nav></NavigationContext.Provider>; });
NavigationMenu.displayName = 'NavigationMenu';
export const NavigationMenuList = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(({ className, ...props }, ref) => <ul {...props} ref={ref} data-slot="navigation-menu-list" className={cn('slr-navigation__list', className)} />);
NavigationMenuList.displayName = 'NavigationMenuList';
export const NavigationMenuItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>((props, ref) => <li {...props} ref={ref} data-slot="navigation-menu-item" />);
NavigationMenuItem.displayName = 'NavigationMenuItem';
export interface NavigationMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { value: string }
export const NavigationMenuTrigger = React.forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>(({ value, className, onClick, onKeyDown, type, ...props }, ref) => { const context = useNavigation('NavigationMenuTrigger'); const open = context.value === value; return <button {...props} ref={ref} type={type ?? 'button'} aria-expanded={open} aria-controls={`${context.baseId}-${value}-content`} data-slot="navigation-menu-trigger" data-state={open ? 'open' : 'closed'} className={cn('slr-navigation__trigger', className)} onClick={(event) => { onClick?.(event); if (!event.defaultPrevented) context.setValue(open ? '' : value); }} onKeyDown={(event) => { onKeyDown?.(event); if (event.defaultPrevented || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return; const root = event.currentTarget.closest('[data-slot="navigation-menu-list"]'); const items = Array.from(root?.querySelectorAll<HTMLElement>('[data-slot="navigation-menu-trigger"]:not(:disabled),a[href]') ?? []); const direction = event.key === 'ArrowLeft' ? 'previous' : event.key === 'ArrowRight' ? 'next' : event.key === 'Home' ? 'first' : 'last'; event.preventDefault(); moveFocus(items, event.currentTarget, { direction })?.focus(); }} />; });
NavigationMenuTrigger.displayName = 'NavigationMenuTrigger';
export interface NavigationMenuContentProps extends React.HTMLAttributes<HTMLDivElement> { value: string }
export const NavigationMenuContent = React.forwardRef<HTMLDivElement, NavigationMenuContentProps>(({ value, className, ...props }, ref) => { const context = useNavigation('NavigationMenuContent'); const open = context.value === value; return <div {...props} ref={ref} id={`${context.baseId}-${value}-content`} hidden={!open} data-slot="navigation-menu-content" data-state={open ? 'open' : 'closed'} className={cn('slr-navigation__content', className)} />; });
NavigationMenuContent.displayName = 'NavigationMenuContent';
export const NavigationMenuLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(({ className, ...props }, ref) => <a {...props} ref={ref} data-slot="navigation-menu-link" className={cn('slr-navigation__link', className)} />);
NavigationMenuLink.displayName = 'NavigationMenuLink';
