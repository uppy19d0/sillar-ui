import { jsxs as I, jsx as y } from "react/jsx-runtime";
import * as c from "react";
import { a as V, u as N } from "./internal-D9EwPR7x.js";
import { a as k } from "./dismissable-layer-HbfqlJA5.js";
import { P as O } from "./portal-DEB9SKy7.js";
import { a as H, c as U } from "./positioning-Baw9HQqS.js";
import { m as _ } from "./roving-focus-BBnqq1MU.js";
import { composeRefs as C } from "./slot.js";
import { cn as w } from "./utils.js";
const P = c.createContext(null);
function A(r) {
  const o = c.useContext(P);
  if (!o) throw new Error(`${r} must be rendered inside SelectRoot.`);
  return o;
}
function Q({ value: r, defaultValue: o = "", onValueChange: s, open: l, defaultOpen: m = !1, onOpenChange: g, disabled: f = !1, name: p, children: a }) {
  const [i, e] = N({ value: r, defaultValue: o, onChange: s }), [u, n] = N({ value: l, defaultValue: m, onChange: g }), [b, t] = c.useState(""), d = c.useRef(null), S = c.useId(), h = c.useCallback((R, T) => {
    var v;
    e(R), t(T), n(!1), (v = d.current) == null || v.focus({ preventScroll: !0 });
  }, [e, n]), x = c.useMemo(() => ({ value: i, label: b, setValue: h, open: u, setOpen: n, disabled: f, triggerRef: d, contentId: S, name: p }), [S, f, b, p, u, i, n, h]);
  return /* @__PURE__ */ I(P.Provider, { value: x, children: [
    a,
    p && /* @__PURE__ */ y("input", { type: "hidden", name: p, value: i })
  ] });
}
const D = c.forwardRef(({ className: r, onClick: o, onKeyDown: s, disabled: l, type: m, children: g, ...f }, p) => {
  const a = A("SelectTrigger"), i = a.disabled || l;
  return /* @__PURE__ */ I("button", { ...f, ref: C(p, a.triggerRef), type: m ?? "button", role: "combobox", "aria-controls": a.contentId, "aria-expanded": a.open, "aria-haspopup": "listbox", disabled: i, "data-slot": "select-trigger", "data-state": a.open ? "open" : "closed", className: w("slr-select-trigger", r), onClick: (e) => {
    o == null || o(e), !e.defaultPrevented && !i && a.setOpen(!a.open);
  }, onKeyDown: (e) => {
    s == null || s(e), !(e.defaultPrevented || i) && ["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key) && (e.preventDefault(), a.setOpen(!0));
  }, children: [
    g,
    /* @__PURE__ */ y("span", { "aria-hidden": "true", className: "slr-select-trigger__chevron" })
  ] });
});
D.displayName = "SelectTrigger";
function X({ placeholder: r = "Select an option", className: o, ...s }) {
  const l = A("SelectValue");
  return /* @__PURE__ */ y("span", { ...s, "data-slot": "select-value", "data-placeholder": !l.value || void 0, className: w("slr-select-value", o), children: l.label || l.value || r });
}
const F = c.forwardRef(({ align: r = "start", sideOffset: o = 6, collisionPadding: s = 8, portalContainer: l, className: m, style: g, onKeyDown: f, children: p, ...a }, i) => {
  const e = A("SelectContent"), u = c.useRef(null), [n, b] = c.useState({ side: "bottom", style: { visibility: "hidden" } });
  return V(() => {
    if (!e.open) return;
    const t = e.triggerRef.current, d = u.current;
    return !t || !d ? void 0 : H(t, d, () => b(U(t.getBoundingClientRect(), { width: d.offsetWidth, height: d.offsetHeight }, { width: window.innerWidth, height: window.innerHeight }, { side: "bottom", align: r, sideOffset: o, collisionPadding: s, matchAnchorWidth: !0, direction: window.getComputedStyle(t).direction === "rtl" ? "rtl" : "ltr" })));
  }, [r, s, e.open, e.triggerRef, o]), c.useEffect(() => {
    if (!e.open || !u.current) return;
    const t = u.current, d = k(t, { branches: [e.triggerRef.current], onDismiss: () => e.setOpen(!1) }), S = requestAnimationFrame(() => {
      var x;
      const h = E(t);
      (x = h.find((R) => R.dataset.value === e.value) ?? h[0]) == null || x.focus();
    });
    return () => {
      cancelAnimationFrame(S), d();
    };
  }, [e]), !e.open || typeof document > "u" ? null : /* @__PURE__ */ y(O, { container: l, children: /* @__PURE__ */ y("div", { ...a, ref: C(u, i), id: e.contentId, role: "listbox", tabIndex: -1, "data-slot": "select-content", "data-side": n.side, className: w("slr-select-content", m), style: { ...n.style, ...g }, onKeyDown: (t) => {
    var h, x;
    if (f == null || f(t), t.defaultPrevented) return;
    const d = E(t.currentTarget), S = document.activeElement;
    if (t.key === "Escape" || t.key === "Tab") {
      e.setOpen(!1), t.key === "Escape" && (t.preventDefault(), (h = e.triggerRef.current) == null || h.focus());
      return;
    }
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(t.key)) {
      t.preventDefault();
      const R = t.key === "ArrowDown" ? "next" : t.key === "ArrowUp" ? "previous" : t.key === "Home" ? "first" : "last";
      (x = _(d, S, { direction: R })) == null || x.focus();
    }
  }, children: p }) });
});
F.displayName = "SelectContent";
function E(r) {
  return Array.from(r.querySelectorAll('[role="option"]:not([aria-disabled="true"])'));
}
const L = c.forwardRef(({ value: r, textValue: o, disabled: s, className: l, onClick: m, onPointerMove: g, children: f, type: p, ...a }, i) => {
  const e = A("SelectItem"), u = e.value === r;
  return /* @__PURE__ */ I("button", { ...a, ref: i, type: p ?? "button", role: "option", "aria-selected": u, "aria-disabled": s || void 0, disabled: s, tabIndex: -1, "data-slot": "select-item", "data-state": u ? "checked" : "unchecked", "data-value": r, className: w("slr-select-item", l), onPointerMove: (n) => {
    g == null || g(n), !n.defaultPrevented && !s && n.currentTarget.focus();
  }, onClick: (n) => {
    var b;
    m == null || m(n), !n.defaultPrevented && !s && e.setValue(r, o ?? ((b = n.currentTarget.textContent) == null ? void 0 : b.trim()) ?? r);
  }, children: [
    /* @__PURE__ */ y("span", { "aria-hidden": "true", className: "slr-select-item__check", children: u ? "✓" : "" }),
    f
  ] });
});
L.displayName = "SelectItem";
export {
  F as SelectContent,
  L as SelectItem,
  Q as SelectRoot,
  D as SelectTrigger,
  X as SelectValue
};
//# sourceMappingURL=select-root.js.map
