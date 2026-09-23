import { jsx as r } from "react/jsx-runtime";
import * as i from "react";
import { u as y } from "./internal-D9EwPR7x.js";
import { m as x } from "./roving-focus-BBnqq1MU.js";
import { cn as c } from "./utils.js";
const N = i.createContext(null);
function p(a) {
  const n = i.useContext(N);
  if (!n) throw new Error(`${a} must be rendered inside NavigationMenu.`);
  return n;
}
const b = i.forwardRef(({ value: a, defaultValue: n = "", onValueChange: e, label: o = "Primary navigation", className: s, children: l, ...m }, g) => {
  const [u, t] = y({ value: a, defaultValue: n, onChange: e }), d = i.useId(), v = i.useMemo(() => ({ value: u, setValue: t, baseId: d }), [d, u, t]);
  return /* @__PURE__ */ r(N.Provider, { value: v, children: /* @__PURE__ */ r("nav", { ...m, ref: g, "aria-label": o, "data-slot": "navigation-menu", className: c("slr-navigation", s), children: l }) });
});
b.displayName = "NavigationMenu";
const w = i.forwardRef(({ className: a, ...n }, e) => /* @__PURE__ */ r("ul", { ...n, ref: e, "data-slot": "navigation-menu-list", className: c("slr-navigation__list", a) }));
w.displayName = "NavigationMenuList";
const R = i.forwardRef((a, n) => /* @__PURE__ */ r("li", { ...a, ref: n, "data-slot": "navigation-menu-item" }));
R.displayName = "NavigationMenuItem";
const _ = i.forwardRef(({ value: a, className: n, onClick: e, onKeyDown: o, type: s, ...l }, m) => {
  const g = p("NavigationMenuTrigger"), u = g.value === a;
  return /* @__PURE__ */ r("button", { ...l, ref: m, type: s ?? "button", "aria-expanded": u, "aria-controls": `${g.baseId}-${a}-content`, "data-slot": "navigation-menu-trigger", "data-state": u ? "open" : "closed", className: c("slr-navigation__trigger", n), onClick: (t) => {
    e == null || e(t), t.defaultPrevented || g.setValue(u ? "" : a);
  }, onKeyDown: (t) => {
    var f;
    if (o == null || o(t), t.defaultPrevented || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key)) return;
    const d = t.currentTarget.closest('[data-slot="navigation-menu-list"]'), v = Array.from((d == null ? void 0 : d.querySelectorAll('[data-slot="navigation-menu-trigger"]:not(:disabled),a[href]')) ?? []), M = t.key === "ArrowLeft" ? "previous" : t.key === "ArrowRight" ? "next" : t.key === "Home" ? "first" : "last";
    t.preventDefault(), (f = x(v, t.currentTarget, { direction: M })) == null || f.focus();
  } });
});
_.displayName = "NavigationMenuTrigger";
const h = i.forwardRef(({ value: a, className: n, ...e }, o) => {
  const s = p("NavigationMenuContent"), l = s.value === a;
  return /* @__PURE__ */ r("div", { ...e, ref: o, id: `${s.baseId}-${a}-content`, hidden: !l, "data-slot": "navigation-menu-content", "data-state": l ? "open" : "closed", className: c("slr-navigation__content", n) });
});
h.displayName = "NavigationMenuContent";
const A = i.forwardRef(({ className: a, ...n }, e) => /* @__PURE__ */ r("a", { ...n, ref: e, "data-slot": "navigation-menu-link", className: c("slr-navigation__link", a) }));
A.displayName = "NavigationMenuLink";
export {
  b as NavigationMenu,
  h as NavigationMenuContent,
  R as NavigationMenuItem,
  A as NavigationMenuLink,
  w as NavigationMenuList,
  _ as NavigationMenuTrigger
};
//# sourceMappingURL=navigation-menu.js.map
