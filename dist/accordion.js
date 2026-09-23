import { jsx as f, jsxs as R } from "react/jsx-runtime";
import * as c from "react";
import { u as T } from "./internal-D9EwPR7x.js";
import { m as E } from "./roving-focus-BBnqq1MU.js";
import { cn as I } from "./utils.js";
const _ = c.createContext(null), h = c.createContext(null);
function y(o) {
  const r = c.useContext(_);
  if (!r) throw new Error(`${o} must be rendered inside Accordion.`);
  return r;
}
function b(o) {
  const r = c.useContext(h);
  if (!r) throw new Error(`${o} must be rendered inside AccordionItem.`);
  return r;
}
const P = c.forwardRef(({
  type: o = "single",
  value: r,
  defaultValue: d,
  onValueChange: n,
  collapsible: a = !1,
  orientation: s = "vertical",
  loop: l = !0,
  className: u,
  children: i,
  ...m
}, t) => {
  const A = c.useCallback((e) => e === void 0 ? [] : Array.isArray(e) ? e : [e], []), [p, g] = T({ value: r === void 0 ? void 0 : A(r), defaultValue: A(d), onChange: (e) => n == null ? void 0 : n(o === "single" ? e[0] ?? "" : e) }), v = c.useCallback((e) => g((w) => {
    const N = w.includes(e);
    return o === "multiple" ? N ? w.filter((C) => C !== e) : [...w, e] : N && a ? [] : [e];
  }), [a, g, o]), x = c.useMemo(() => ({ values: p, toggle: v, type: o, collapsible: a, orientation: s, loop: l }), [a, l, s, v, o, p]);
  return /* @__PURE__ */ f(_.Provider, { value: x, children: /* @__PURE__ */ f("div", { ...m, ref: t, "data-slot": "accordion", "data-orientation": s, className: I("slr-accordion", u), children: i }) });
});
P.displayName = "Accordion";
const $ = c.forwardRef(({ value: o, disabled: r, className: d, children: n, ...a }, s) => {
  const l = y("AccordionItem"), u = c.useId(), i = c.useMemo(() => ({ value: o, open: l.values.includes(o), triggerId: `${u}-trigger`, contentId: `${u}-content` }), [l.values, u, o]);
  return /* @__PURE__ */ f(h.Provider, { value: i, children: /* @__PURE__ */ f("div", { ...a, ref: s, "data-slot": "accordion-item", "data-state": i.open ? "open" : "closed", "data-disabled": r || void 0, className: I("slr-accordion__item", d), children: n }) });
});
$.displayName = "AccordionItem";
const k = c.forwardRef(({ className: o, onClick: r, onKeyDown: d, type: n, disabled: a, children: s, ...l }, u) => {
  const i = y("AccordionTrigger"), m = b("AccordionTrigger");
  return /* @__PURE__ */ f("h3", { className: "slr-accordion__heading", children: /* @__PURE__ */ R("button", { ...l, ref: u, id: m.triggerId, type: n ?? "button", disabled: a, "aria-expanded": m.open, "aria-controls": m.contentId, "data-slot": "accordion-trigger", "data-state": m.open ? "open" : "closed", className: I("slr-accordion__trigger", o), onClick: (t) => {
    r == null || r(t), !t.defaultPrevented && !a && i.toggle(m.value);
  }, onKeyDown: (t) => {
    var e;
    if (d == null || d(t), t.defaultPrevented) return;
    const A = i.orientation === "vertical" ? "ArrowUp" : "ArrowLeft", p = i.orientation === "vertical" ? "ArrowDown" : "ArrowRight";
    if (![A, p, "Home", "End"].includes(t.key)) return;
    const g = t.currentTarget.closest('[data-slot="accordion"]'), v = Array.from((g == null ? void 0 : g.querySelectorAll('[data-slot="accordion-trigger"]:not(:disabled)')) ?? []), x = t.key === "Home" ? "first" : t.key === "End" ? "last" : t.key === A ? "previous" : "next";
    t.preventDefault(), (e = E(v, t.currentTarget, { direction: x, loop: i.loop })) == null || e.focus();
  }, children: [
    s,
    /* @__PURE__ */ f("span", { "aria-hidden": "true", className: "slr-accordion__chevron" })
  ] }) });
});
k.displayName = "AccordionTrigger";
const j = c.forwardRef(({ className: o, ...r }, d) => {
  const n = b("AccordionContent");
  return /* @__PURE__ */ f("div", { ...r, ref: d, id: n.contentId, role: "region", "aria-labelledby": n.triggerId, hidden: !n.open, "data-slot": "accordion-content", "data-state": n.open ? "open" : "closed", className: I("slr-accordion__content", o) });
});
j.displayName = "AccordionContent";
export {
  P as Accordion,
  j as AccordionContent,
  $ as AccordionItem,
  k as AccordionTrigger
};
//# sourceMappingURL=accordion.js.map
