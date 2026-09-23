import { jsx as c, jsxs as f } from "react/jsx-runtime";
import * as o from "react";
import { cn as h } from "./utils.js";
const w = o.createContext(null);
function v(r) {
  const t = o.useContext(w);
  if (!t) throw new Error(`${r} must be rendered inside ToastProvider.`);
  return t;
}
function C({ children: r, duration: t = 5e3 }) {
  const [l, d] = o.useState([]), i = o.useRef(/* @__PURE__ */ new Map()), n = o.useCallback((e) => {
    const a = i.current.get(e);
    a && window.clearTimeout(a), i.current.delete(e), d((u) => u.filter((m) => m.id !== e));
  }, []), s = o.useCallback((e) => {
    const a = e.id ?? `slr-toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    d((m) => [...m.filter((T) => T.id !== a), { ...e, id: a }]);
    const u = e.duration ?? t;
    return u > 0 && i.current.set(a, window.setTimeout(() => n(a), u)), a;
  }, [n, t]);
  o.useEffect(() => () => {
    i.current.forEach((e) => window.clearTimeout(e));
  }, []);
  const p = o.useMemo(() => ({ toasts: l, toast: s, dismiss: n, defaultDuration: t }), [n, t, s, l]);
  return /* @__PURE__ */ c(w.Provider, { value: p, children: r });
}
function N() {
  const { toast: r, dismiss: t } = v("useToast");
  return { toast: r, dismiss: t };
}
const x = o.forwardRef(({ className: r, closeLabel: t = "Dismiss notification", ...l }, d) => {
  const { toasts: i, dismiss: n } = v("ToastViewport");
  return /* @__PURE__ */ c("div", { ...l, ref: d, "data-slot": "toast-viewport", className: h("slr-toast-viewport", r), children: i.map((s) => /* @__PURE__ */ f("div", { role: s.variant === "danger" ? "alert" : "status", "aria-atomic": "true", "data-slot": "toast", "data-variant": s.variant ?? "default", className: "slr-toast", children: [
    /* @__PURE__ */ f("div", { className: "slr-toast__body", children: [
      /* @__PURE__ */ c("div", { className: "slr-toast__title", children: s.title }),
      s.description && /* @__PURE__ */ c("div", { className: "slr-toast__description", children: s.description })
    ] }),
    s.action,
    /* @__PURE__ */ c("button", { type: "button", "aria-label": t, className: "slr-toast__close", onClick: () => n(s.id), children: "×" })
  ] }, s.id)) });
});
x.displayName = "ToastViewport";
export {
  C as ToastProvider,
  x as ToastViewport,
  N as useToast
};
//# sourceMappingURL=toast.js.map
