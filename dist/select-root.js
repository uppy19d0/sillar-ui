import { jsxs as E, jsx as h } from "react/jsx-runtime";
import * as o from "react";
import { a as q, u as P } from "./internal-D9EwPR7x.js";
import { a as F } from "./dismissable-layer-HbfqlJA5.js";
import { P as G } from "./portal-DEB9SKy7.js";
import { a as z, c as $ } from "./positioning-Baw9HQqS.js";
import { m as B } from "./roving-focus-BBnqq1MU.js";
import { composeRefs as L } from "./slot.js";
import { cn as v } from "./utils.js";
function V(e) {
  return e.trim().toLocaleLowerCase();
}
function J(e, t) {
  return Array.from(e.querySelectorAll(t)).filter((r) => r.getAttribute("aria-disabled") !== "true" && !r.hasAttribute("disabled")).map((r) => {
    var s;
    return {
      element: r,
      textValue: r.dataset.textValue ?? ((s = r.textContent) == null ? void 0 : s.trim()) ?? ""
    };
  });
}
function M(e, t, r) {
  var d;
  const s = V(t);
  if (!s || e.length === 0) return null;
  const l = e.findIndex(({ element: f }) => f === r);
  return ((d = [...e.slice(l + 1), ...e.slice(0, l + 1)].find(({ textValue: f }) => V(f).startsWith(s))) == null ? void 0 : d.element) ?? null;
}
function Q(e) {
  return e.key.length === 1 && !e.altKey && !e.ctrlKey && !e.metaKey;
}
const D = o.createContext(null);
function N(e) {
  const t = o.useContext(D);
  if (!t) throw new Error(`${e} must be rendered inside SelectRoot.`);
  return t;
}
function ie({ value: e, defaultValue: t = "", onValueChange: r, open: s, defaultOpen: l = !1, onOpenChange: p, disabled: d = !1, required: f = !1, name: c, form: y, children: i }) {
  const [a, b] = P({ value: e, defaultValue: t, onChange: r }), [u, m] = P({ value: s, defaultValue: l, onChange: p }), [w, S] = o.useState({ value: "", label: "" }), n = o.useRef(null), g = o.useId(), C = o.useMemo(() => W(i, a), [i, a]), R = w.value === a ? w.label : C, x = o.useCallback((A) => S({ value: a, label: A }), [a]), I = o.useCallback((A, j) => {
    var k;
    b(A), S({ value: A, label: j }), m(!1), (k = n.current) == null || k.focus({ preventScroll: !0 });
  }, [b, m]), T = o.useMemo(() => ({ value: a, label: R, setValue: I, setLabel: x, open: u, setOpen: m, disabled: d, required: f, triggerRef: n, contentId: g, name: c }), [g, d, R, c, f, u, a, x, m, I]);
  return /* @__PURE__ */ E(D.Provider, { value: T, children: [
    i,
    c && /* @__PURE__ */ h("input", { type: "hidden", name: c, value: a, disabled: d, required: f, form: y })
  ] });
}
const X = o.forwardRef(({ className: e, onClick: t, onKeyDown: r, disabled: s, type: l, children: p, ...d }, f) => {
  const c = N("SelectTrigger"), y = c.disabled || s;
  return /* @__PURE__ */ E("button", { ...d, ref: L(f, c.triggerRef), type: l ?? "button", role: "combobox", "aria-controls": c.contentId, "aria-expanded": c.open, "aria-haspopup": "listbox", "aria-required": c.required || void 0, disabled: y, "data-slot": "select-trigger", "data-state": c.open ? "open" : "closed", className: v("slr-select-trigger", e), onClick: (i) => {
    t == null || t(i), !i.defaultPrevented && !y && c.setOpen(!c.open);
  }, onKeyDown: (i) => {
    r == null || r(i), !(i.defaultPrevented || y) && ["ArrowDown", "ArrowUp", "Enter", " "].includes(i.key) && (i.preventDefault(), c.setOpen(!0));
  }, children: [
    p,
    /* @__PURE__ */ h("span", { "aria-hidden": "true", className: "slr-select-trigger__chevron" })
  ] });
});
X.displayName = "SelectTrigger";
function ue({ placeholder: e = "Select an option", className: t, ...r }) {
  const s = N("SelectValue");
  return /* @__PURE__ */ h("span", { ...r, "data-slot": "select-value", "data-placeholder": !s.value || void 0, className: v("slr-select-value", t), children: s.label || s.value || e });
}
const Y = o.forwardRef(({ align: e = "start", sideOffset: t = 6, collisionPadding: r = 8, loop: s = !0, portalContainer: l, className: p, style: d, onKeyDown: f, children: c, ...y }, i) => {
  const a = N("SelectContent"), b = o.useRef(null), [u, m] = o.useState({ side: "bottom", style: { visibility: "hidden" } }), w = o.useRef(""), S = o.useRef(null);
  return q(() => {
    if (!a.open) return;
    const n = a.triggerRef.current, g = b.current;
    return !n || !g ? void 0 : z(n, g, () => m($(n.getBoundingClientRect(), { width: g.offsetWidth, height: g.offsetHeight }, { width: window.innerWidth, height: window.innerHeight }, { side: "bottom", align: e, sideOffset: t, collisionPadding: r, matchAnchorWidth: !0, direction: window.getComputedStyle(n).direction === "rtl" ? "rtl" : "ltr" })));
  }, [e, r, a.open, a.triggerRef, t]), o.useEffect(() => {
    if (!a.open || !b.current) return;
    const n = b.current, g = F(n, { branches: [a.triggerRef.current], onDismiss: () => a.setOpen(!1) }), C = requestAnimationFrame(() => {
      var x;
      const R = O(n);
      (x = R.find((I) => I.dataset.value === a.value) ?? R[0]) == null || x.focus();
    });
    return () => {
      cancelAnimationFrame(C), S.current && clearTimeout(S.current), w.current = "", g();
    };
  }, [a.open, a.setOpen, a.triggerRef, a.value]), !a.open || typeof document > "u" ? null : /* @__PURE__ */ h(G, { container: l, children: /* @__PURE__ */ h("div", { ...y, ref: L(b, i), id: a.contentId, role: "listbox", tabIndex: -1, "data-slot": "select-content", "data-side": u.side, className: v("slr-select-content", p), style: { ...u.style, ...d }, onKeyDown: (n) => {
    var R, x, I;
    if (f == null || f(n), n.defaultPrevented) return;
    const g = O(n.currentTarget), C = document.activeElement;
    if (n.key === "Escape" || n.key === "Tab") {
      a.setOpen(!1), n.key === "Escape" && (n.preventDefault(), (R = a.triggerRef.current) == null || R.focus());
      return;
    }
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(n.key)) {
      n.preventDefault();
      const T = n.key === "ArrowDown" ? "next" : n.key === "ArrowUp" ? "previous" : n.key === "Home" ? "first" : "last";
      (x = B(g, C, { direction: T, loop: s })) == null || x.focus();
      return;
    }
    Q(n.nativeEvent) && (n.preventDefault(), w.current += n.key, S.current && clearTimeout(S.current), S.current = setTimeout(() => {
      w.current = "";
    }, 700), (I = M(J(n.currentTarget, '[role="option"]'), w.current, C)) == null || I.focus());
  }, children: c }) });
});
Y.displayName = "SelectContent";
function O(e) {
  return Array.from(e.querySelectorAll('[role="option"]:not([aria-disabled="true"])'));
}
const H = o.forwardRef(({ value: e, textValue: t, disabled: r, className: s, onClick: l, onPointerMove: p, children: d, type: f, ...c }, y) => {
  const i = N("SelectItem"), a = i.value === e, b = o.useRef(null);
  return q(() => {
    var u, m;
    a && i.setLabel(t ?? ((m = (u = b.current) == null ? void 0 : u.textContent) == null ? void 0 : m.trim()) ?? e);
  }, [i.setLabel, a, t, e]), /* @__PURE__ */ E("button", { ...c, ref: L(y, b), type: f ?? "button", role: "option", "aria-selected": a, "aria-disabled": r || void 0, disabled: r, tabIndex: -1, "data-slot": "select-item", "data-state": a ? "checked" : "unchecked", "data-value": e, "data-text-value": t, className: v("slr-select-item", s), onPointerMove: (u) => {
    p == null || p(u), !u.defaultPrevented && !r && u.currentTarget.focus();
  }, onClick: (u) => {
    var m;
    l == null || l(u), !u.defaultPrevented && !r && i.setValue(e, t ?? ((m = u.currentTarget.textContent) == null ? void 0 : m.trim()) ?? e);
  }, children: [
    /* @__PURE__ */ h("span", { "aria-hidden": "true", className: "slr-select-item__check", children: a ? "✓" : "" }),
    d
  ] });
});
H.displayName = "SelectItem";
const U = o.createContext(void 0), Z = o.forwardRef(({ className: e, children: t, "aria-label": r, "aria-labelledby": s, ...l }, p) => {
  const d = o.useId();
  return /* @__PURE__ */ h(U.Provider, { value: d, children: /* @__PURE__ */ h("div", { ...l, ref: p, role: "group", "aria-label": r, "aria-labelledby": r ? s : s ?? d, "data-slot": "select-group", className: v("slr-select-group", e), children: t }) });
});
Z.displayName = "SelectGroup";
const K = o.forwardRef(({ className: e, id: t, ...r }, s) => {
  const l = o.useContext(U);
  return /* @__PURE__ */ h("div", { ...r, ref: s, id: t ?? l, "data-slot": "select-label", className: v("slr-select-label", e) });
});
K.displayName = "SelectLabel";
const ee = o.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ h("div", { ...t, ref: r, role: "separator", "aria-orientation": "horizontal", "data-slot": "select-separator", className: v("slr-select-separator", e) }));
ee.displayName = "SelectSeparator";
function W(e, t) {
  let r = "";
  return o.Children.forEach(e, (s) => {
    if (r || !o.isValidElement(s)) return;
    const l = s.props;
    if (s.type === H && l.value === t) {
      r = l.textValue ?? _(l.children) ?? t;
      return;
    }
    l.children && (r = W(l.children, t));
  }), r;
}
function _(e) {
  return o.Children.toArray(e).map((t) => typeof t == "string" || typeof t == "number" ? String(t) : o.isValidElement(t) ? _(t.props.children) : "").join("").trim();
}
export {
  Y as SelectContent,
  Z as SelectGroup,
  H as SelectItem,
  K as SelectLabel,
  ie as SelectRoot,
  ee as SelectSeparator,
  X as SelectTrigger,
  ue as SelectValue
};
//# sourceMappingURL=select-root.js.map
