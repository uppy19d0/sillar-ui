import { jsx as m } from "react/jsx-runtime";
import * as o from "react";
import { a as C, u as b } from "./internal-D9EwPR7x.js";
import { P as x } from "./portal-DEB9SKy7.js";
import { a as y, c as S } from "./positioning-Baw9HQqS.js";
import { Slot as I, composeRefs as h } from "./slot.js";
import { cn as v } from "./utils.js";
const w = o.createContext(null);
function R(s) {
  const r = o.useContext(w);
  if (!r) throw new Error(`${s} must be rendered inside Tooltip.`);
  return r;
}
function M({ open: s, defaultOpen: r = !1, onOpenChange: c, delayDuration: l = 500, children: f }) {
  const [u, a] = b({ value: s, defaultValue: r, onChange: c }), n = o.useRef(null), e = o.useRef(null), i = o.useId(), t = o.useCallback(() => {
    n.current !== null && window.clearTimeout(n.current), n.current = null, a(!1);
  }, [a]), d = o.useCallback(() => {
    n.current !== null && window.clearTimeout(n.current), n.current = window.setTimeout(() => a(!0), l);
  }, [l, a]);
  o.useEffect(() => () => {
    n.current !== null && window.clearTimeout(n.current);
  }, []);
  const g = o.useMemo(() => ({ open: u, setOpenSoon: d, close: t, triggerRef: e, contentId: i }), [t, i, u, d]);
  return /* @__PURE__ */ m(w.Provider, { value: g, children: f });
}
const P = o.forwardRef(({ asChild: s = !1, onPointerEnter: r, onPointerLeave: c, onFocus: l, onBlur: f, onKeyDown: u, ...a }, n) => {
  const e = R("TooltipTrigger");
  return /* @__PURE__ */ m(s ? I : "button", { ...a, ref: h(n, e.triggerRef), "aria-describedby": e.open ? e.contentId : void 0, "data-state": e.open ? "open" : "closed", onPointerEnter: (t) => {
    r == null || r(t), t.defaultPrevented || e.setOpenSoon();
  }, onPointerLeave: (t) => {
    c == null || c(t), t.defaultPrevented || e.close();
  }, onFocus: (t) => {
    l == null || l(t), t.defaultPrevented || e.setOpenSoon();
  }, onBlur: (t) => {
    f == null || f(t), t.defaultPrevented || e.close();
  }, onKeyDown: (t) => {
    u == null || u(t), !t.defaultPrevented && t.key === "Escape" && e.close();
  } });
});
P.displayName = "TooltipTrigger";
const k = o.forwardRef(({ side: s = "top", align: r = "center", sideOffset: c = 7, collisionPadding: l = 8, portalContainer: f, className: u, style: a, ...n }, e) => {
  const i = R("TooltipContent"), t = o.useRef(null), [d, g] = o.useState({ side: s, style: { visibility: "hidden" } });
  return C(() => {
    if (!i.open) return;
    const T = i.triggerRef.current, p = t.current;
    return !T || !p ? void 0 : y(T, p, () => g(S(T.getBoundingClientRect(), { width: p.offsetWidth, height: p.offsetHeight }, { width: window.innerWidth, height: window.innerHeight }, { side: s, align: r, sideOffset: c, collisionPadding: l })));
  }, [r, l, i.open, i.triggerRef, s, c]), !i.open || typeof document > "u" ? null : /* @__PURE__ */ m(x, { container: f, children: /* @__PURE__ */ m("div", { ...n, ref: h(t, e), id: i.contentId, role: "tooltip", "data-slot": "tooltip-content", "data-state": "open", "data-side": d.side, className: v("slr-tooltip__content", u), style: { ...d.style, ...a } }) });
});
k.displayName = "TooltipContent";
export {
  M as Tooltip,
  k as TooltipContent,
  P as TooltipTrigger
};
//# sourceMappingURL=tooltip.js.map
