import { jsx as r } from "react/jsx-runtime";
import * as a from "react";
import { u as x } from "./internal-D9EwPR7x.js";
import { cn as c } from "./utils.js";
const u = a.createContext(null);
function b(e) {
  const o = a.useContext(u);
  if (!o) throw new Error(`${e} must be rendered inside Collapsible.`);
  return o;
}
const v = a.forwardRef(
  ({ open: e, defaultOpen: o = !1, onOpenChange: n, disabled: t, className: l, children: s, ...f }, C) => {
    const [p, i] = x({ value: e, defaultValue: o, onChange: n }), d = a.useId(), m = a.useMemo(() => ({
      open: p,
      setOpen: (g) => {
        t || i(g);
      },
      contentId: d
    }), [d, t, p, i]);
    return /* @__PURE__ */ r(u.Provider, { value: m, children: /* @__PURE__ */ r("div", { ...f, ref: C, "data-slot": "collapsible", "data-state": p ? "open" : "closed", "data-disabled": t || void 0, className: c("slr-collapsible", l), children: s }) });
  }
);
v.displayName = "Collapsible";
const w = a.forwardRef(
  ({ onClick: e, type: o, ...n }, t) => {
    const l = b("CollapsibleTrigger");
    return /* @__PURE__ */ r("button", { ...n, ref: t, type: o ?? "button", "aria-expanded": l.open, "aria-controls": l.contentId, "data-slot": "collapsible-trigger", "data-state": l.open ? "open" : "closed", onClick: (s) => {
      e == null || e(s), s.defaultPrevented || l.setOpen(!l.open);
    } });
  }
);
w.displayName = "CollapsibleTrigger";
const N = a.forwardRef(
  ({ className: e, ...o }, n) => {
    const t = b("CollapsibleContent");
    return /* @__PURE__ */ r("div", { ...o, ref: n, id: t.contentId, hidden: !t.open, "data-slot": "collapsible-content", "data-state": t.open ? "open" : "closed", className: c("slr-collapsible__content", e) });
  }
);
N.displayName = "CollapsibleContent";
export {
  v as Collapsible,
  N as CollapsibleContent,
  w as CollapsibleTrigger
};
//# sourceMappingURL=collapsible.js.map
