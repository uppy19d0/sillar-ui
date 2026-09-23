import * as React from 'react';
import { cn } from './utils';

export type ToastVariant = 'default' | 'success' | 'warning' | 'danger';
export interface ToastInput { id?: string; title: React.ReactNode; description?: React.ReactNode; variant?: ToastVariant; duration?: number; action?: React.ReactNode }
type ToastRecord = ToastInput & { id: string };
type ToastContextValue = { toasts: ToastRecord[]; toast: (input: ToastInput) => string; dismiss: (id: string) => void; defaultDuration: number };
const ToastContext = React.createContext<ToastContextValue | null>(null);
function useToastContext(name: string) { const value = React.useContext(ToastContext); if (!value) throw new Error(`${name} must be rendered inside ToastProvider.`); return value; }

export interface ToastProviderProps { children: React.ReactNode; duration?: number }
export function ToastProvider({ children, duration = 5000 }: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastRecord[]>([]); const timers = React.useRef(new Map<string, number>());
  const dismiss = React.useCallback((id: string) => { const timer = timers.current.get(id); if (timer) window.clearTimeout(timer); timers.current.delete(id); setToasts((current) => current.filter((item) => item.id !== id)); }, []);
  const toast = React.useCallback((input: ToastInput) => { const id = input.id ?? `slr-toast-${Date.now()}-${Math.random().toString(36).slice(2)}`; setToasts((current) => [...current.filter((item) => item.id !== id), { ...input, id }]); const timeout = input.duration ?? duration; if (timeout > 0) timers.current.set(id, window.setTimeout(() => dismiss(id), timeout)); return id; }, [dismiss, duration]);
  React.useEffect(() => () => { timers.current.forEach((timer) => window.clearTimeout(timer)); }, []);
  const context = React.useMemo(() => ({ toasts, toast, dismiss, defaultDuration: duration }), [dismiss, duration, toast, toasts]);
  return <ToastContext.Provider value={context}>{children}</ToastContext.Provider>;
}

export function useToast() { const { toast, dismiss } = useToastContext('useToast'); return { toast, dismiss }; }

export interface ToastViewportProps extends React.HTMLAttributes<HTMLDivElement> { closeLabel?: string }
export const ToastViewport = React.forwardRef<HTMLDivElement, ToastViewportProps>(({ className, closeLabel = 'Dismiss notification', ...props }, ref) => {
  const { toasts, dismiss } = useToastContext('ToastViewport');
  return <div {...props} ref={ref} data-slot="toast-viewport" className={cn('slr-toast-viewport', className)}>{toasts.map((item) => <div key={item.id} role={item.variant === 'danger' ? 'alert' : 'status'} aria-atomic="true" data-slot="toast" data-variant={item.variant ?? 'default'} className="slr-toast"><div className="slr-toast__body"><div className="slr-toast__title">{item.title}</div>{item.description && <div className="slr-toast__description">{item.description}</div>}</div>{item.action}<button type="button" aria-label={closeLabel} className="slr-toast__close" onClick={() => dismiss(item.id)}>×</button></div>)}</div>;
});
ToastViewport.displayName = 'ToastViewport';
