import * as React from 'react';
import { useControllableState } from './internal';
import { cn } from './utils';

type TabsContextValue = {
  value: string;
  setValue: (value: string) => void;
  orientation: 'horizontal' | 'vertical';
  activationMode: 'automatic' | 'manual';
  loop: boolean;
  baseId: string;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabs(component: string) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error(`${component} must be rendered inside Tabs.`);
  return context;
}

function getTabId(baseId: string, value: string) {
  return `${baseId}-tab-${encodeURIComponent(value)}`;
}

function getPanelId(baseId: string, value: string) {
  return `${baseId}-panel-${encodeURIComponent(value)}`;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  activationMode?: 'automatic' | 'manual';
  loop?: boolean;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({
    value,
    defaultValue,
    onValueChange,
    orientation = 'horizontal',
    activationMode = 'automatic',
    loop = true,
    className,
    children,
    ...props
  }, ref) => {
    const [resolvedValue, setValue] = useControllableState({
      value,
      defaultValue: defaultValue ?? '',
      onChange: onValueChange,
    });
    const baseId = React.useId();
    const context = React.useMemo(() => ({
      value: resolvedValue,
      setValue,
      orientation,
      activationMode,
      loop,
      baseId,
    }), [activationMode, baseId, loop, orientation, resolvedValue, setValue]);

    return (
      <TabsContext.Provider value={context}>
        <div
          {...props}
          ref={ref}
          data-slot="tabs"
          data-orientation={orientation}
          className={cn('slr-tabs', className)}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);

Tabs.displayName = 'Tabs';

export const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useTabs('TabsList');
    return (
      <div
        {...props}
        ref={ref}
        role="tablist"
        aria-orientation={orientation}
        data-slot="tabs-list"
        data-orientation={orientation}
        className={cn('slr-tabs__list', className)}
      />
    );
  },
);

TabsList.displayName = 'TabsList';

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, className, disabled, onClick, onFocus, onKeyDown, type, ...props }, ref) => {
    const context = useTabs('TabsTrigger');
    const selected = context.value === value;

    return (
      <button
        {...props}
        ref={ref}
        id={getTabId(context.baseId, value)}
        type={type ?? 'button'}
        role="tab"
        aria-selected={selected}
        aria-controls={getPanelId(context.baseId, value)}
        tabIndex={selected ? 0 : -1}
        disabled={disabled}
        data-slot="tabs-trigger"
        data-state={selected ? 'active' : 'inactive'}
        data-orientation={context.orientation}
        className={cn('slr-tabs__trigger', className)}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented && !disabled) context.setValue(value);
        }}
        onFocus={(event) => {
          onFocus?.(event);
          if (!event.defaultPrevented && !disabled && context.activationMode === 'automatic') {
            context.setValue(value);
          }
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented) return;

          if (context.activationMode === 'manual' && ['Enter', ' '].includes(event.key)) {
            event.preventDefault();
            context.setValue(value);
            return;
          }

          const isRtl = context.orientation === 'horizontal'
            && window.getComputedStyle(event.currentTarget).direction === 'rtl';
          const previousKey = context.orientation === 'horizontal'
            ? (isRtl ? 'ArrowRight' : 'ArrowLeft')
            : 'ArrowUp';
          const nextKey = context.orientation === 'horizontal'
            ? (isRtl ? 'ArrowLeft' : 'ArrowRight')
            : 'ArrowDown';
          if (![previousKey, nextKey, 'Home', 'End'].includes(event.key)) return;

          const list = event.currentTarget.closest<HTMLElement>('[role="tablist"]');
          const tabs = Array.from(list?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])') ?? []);
          const currentIndex = tabs.indexOf(event.currentTarget);
          let nextIndex = currentIndex;
          if (event.key === 'Home') nextIndex = 0;
          if (event.key === 'End') nextIndex = tabs.length - 1;
          if (event.key === previousKey) nextIndex = currentIndex - 1;
          if (event.key === nextKey) nextIndex = currentIndex + 1;
          if (context.loop) nextIndex = (nextIndex + tabs.length) % tabs.length;
          else nextIndex = Math.max(0, Math.min(nextIndex, tabs.length - 1));
          event.preventDefault();
          tabs[nextIndex]?.focus();
        }}
      />
    );
  },
);

TabsTrigger.displayName = 'TabsTrigger';

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, className, ...props }, ref) => {
    const context = useTabs('TabsContent');
    const selected = context.value === value;
    return (
      <div
        {...props}
        ref={ref}
        id={getPanelId(context.baseId, value)}
        role="tabpanel"
        aria-labelledby={getTabId(context.baseId, value)}
        tabIndex={0}
        hidden={!selected}
        data-slot="tabs-content"
        data-state={selected ? 'active' : 'inactive'}
        data-orientation={context.orientation}
        className={cn('slr-tabs__content', className)}
      />
    );
  },
);

TabsContent.displayName = 'TabsContent';
