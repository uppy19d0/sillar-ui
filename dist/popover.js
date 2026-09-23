import { jsx as f } from "react/jsx-runtime";
import * as n from "react";
import { a as I, u as S } from "./internal-D9EwPR7x.js";
import { a as L } from "./dismissable-layer-HbfqlJA5.js";
import { P as N } from "./portal-DEB9SKy7.js";
import { a as O, c as T } from "./positioning-Baw9HQqS.js";
import { Slot as H, composeRefs as y } from "./slot.js";
import { cn as W } from "./utils.js";
const w = n.createContext(null);
function P(t) {
  const o = n.useContext(w);
  if (!o) throw new Error(`${t} must be rendered inside Popover.`);
  return o;
}
function A({ open: t, defaultOpen: o = !1, onOpenChange: a, children: u }) {
  const [i, e] = S({ value: t, defaultValue: o, onChange: a }), c = n.useRef(null), s = n.useId(), m = n.useMemo(() => ({ open: i, setOpen: e, triggerRef: c, contentId: s }), [s, i, e]);
  return /* @__PURE__ */ f(w.Provider, { value: m, children: u });
}
const _ = n.forwardRef(({ asChild: t = !1, onClick: o, type: a, ...u }, i) => {
  const e = P("PopoverTrigger");
  return /* @__PURE__ */ f(t ? H : "button", { ...u, ref: y(i, e.triggerRef), type: t ? void 0 : a ?? "button", "aria-haspopup": "dialog", "aria-expanded": e.open, "aria-controls": e.open ? e.contentId : void 0, "data-state": e.open ? "open" : "closed", onClick: (s) => {
    o == null || o(s), s.defaultPrevented || e.setOpen(!e.open);
  } });
});
_.displayName = "PopoverTrigger";
const j = n.forwardRef(({ side: t = "bottom", align: o = "center", sideOffset: a = 8, collisionPadding: u = 8, portalContainer: i, className: e, style: c, onEscapeKeyDown: s, children: m, ...b }, x) => {
  const r = P("PopoverContent"), l = n.useRef(null), [h, C] = n.useState({ side: t, style: { visibility: "hidden" } });
  return I(() => {
    if (!r.open) return;
    const d = r.triggerRef.current, p = l.current;
    return !d || !p ? void 0 : O(d, p, () => C(T(d.getBoundingClientRect(), { width: p.offsetWidth, height: p.offsetHeight }, { width: window.innerWidth, height: window.innerHeight }, { side: t, align: o, sideOffset: a, collisionPadding: u, direction: window.getComputedStyle(d).direction === "rtl" ? "rtl" : "ltr" })));
  }, [o, u, r.open, r.triggerRef, t, a]), n.useEffect(() => {
    if (!r.open || !l.current) return;
    const d = l.current, p = L(d, { branches: [r.triggerRef.current], onDismiss: () => r.setOpen(!1) }), g = (v) => {
      var R;
      v.key === "Escape" && (s == null || s(v), v.defaultPrevented || (r.setOpen(!1), (R = r.triggerRef.current) == null || R.focus({ preventScroll: !0 })));
    };
    return document.addEventListener("keydown", g), () => {
      p(), document.removeEventListener("keydown", g);
    };
  }, [r, s]), !r.open || typeof document > "u" ? null : /* @__PURE__ */ f(N, { container: i, children: /* @__PURE__ */ f("div", { ...b, ref: y(l, x), id: r.contentId, role: "dialog", "data-slot": "popover-content", "data-state": "open", "data-side": h.side, className: W("slr-popover__content", e), style: { ...h.style, ...c }, children: m }) });
});
j.displayName = "PopoverContent";
const B = n.forwardRef(({ onClick: t, type: o, ...a }, u) => {
  const i = P("PopoverClose");
  return /* @__PURE__ */ f("button", { ...a, ref: u, type: o ?? "button", onClick: (e) => {
    var c;
    t == null || t(e), e.defaultPrevented || (i.setOpen(!1), (c = i.triggerRef.current) == null || c.focus());
  } });
});
B.displayName = "PopoverClose";
export {
  A as Popover,
  B as PopoverClose,
  j as PopoverContent,
  _ as PopoverTrigger
};
//# sourceMappingURL=popover.js.map
