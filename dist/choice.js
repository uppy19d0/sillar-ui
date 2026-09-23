import { jsx as n, jsxs as N } from "react/jsx-runtime";
import * as p from "react";
import { u as R } from "./internal-D9EwPR7x.js";
import { m as w } from "./roving-focus-BBnqq1MU.js";
import { cn as k } from "./utils.js";
const A = p.forwardRef(({ checked: a, defaultChecked: d = !1, onCheckedChange: m, className: c, onClick: o, disabled: s, type: u, children: f, ...h }, r) => {
  const [t, i] = R({ value: a, defaultValue: d, onChange: m });
  return /* @__PURE__ */ n("button", { ...h, ref: r, type: u ?? "button", role: "checkbox", "aria-checked": t, disabled: s, "data-slot": "checkbox", "data-state": t ? "checked" : "unchecked", className: k("slr-checkbox", c), onClick: (e) => {
    o == null || o(e), !e.defaultPrevented && !s && i(!t);
  }, children: f ?? /* @__PURE__ */ n("span", { "aria-hidden": "true", className: "slr-checkbox__indicator", children: "✓" }) });
});
A.displayName = "Checkbox";
const y = p.createContext(null);
function I(a) {
  const d = p.useContext(y);
  if (!d) throw new Error(`${a} must be rendered inside RadioGroup.`);
  return d;
}
const P = p.forwardRef(({ value: a, defaultValue: d = "", onValueChange: m, name: c, disabled: o = !1, orientation: s = "vertical", loop: u = !0, className: f, children: h, ...r }, t) => {
  const [i, e] = R({ value: a, defaultValue: d, onChange: m }), b = p.useMemo(() => ({ value: i, setValue: e, name: c, disabled: o, orientation: s, loop: u }), [o, u, c, s, i, e]);
  return /* @__PURE__ */ n(y.Provider, { value: b, children: /* @__PURE__ */ n("div", { ...r, ref: t, role: "radiogroup", "aria-orientation": s, "data-slot": "radio-group", "data-orientation": s, className: k("slr-radio-group", f), children: h }) });
});
P.displayName = "RadioGroup";
const _ = p.forwardRef(({ value: a, disabled: d, className: m, onClick: c, onKeyDown: o, type: s, children: u, ...f }, h) => {
  const r = I("RadioGroupItem"), t = r.value === a, i = r.disabled || d;
  return /* @__PURE__ */ N("button", { ...f, ref: h, type: s ?? "button", role: "radio", "aria-checked": t, disabled: i, tabIndex: t || !r.value ? 0 : -1, "data-slot": "radio-group-item", "data-state": t ? "checked" : "unchecked", className: k("slr-radio", m), onClick: (e) => {
    c == null || c(e), !e.defaultPrevented && !i && r.setValue(a);
  }, onKeyDown: (e) => {
    if (o == null || o(e), e.defaultPrevented) return;
    const b = r.orientation === "vertical" ? "ArrowUp" : "ArrowLeft", g = r.orientation === "vertical" ? "ArrowDown" : "ArrowRight";
    if (![b, g, "Home", "End"].includes(e.key)) return;
    const x = e.currentTarget.closest('[role="radiogroup"]'), v = Array.from((x == null ? void 0 : x.querySelectorAll('[role="radio"]:not(:disabled)')) ?? []), G = e.key === "Home" ? "first" : e.key === "End" ? "last" : e.key === b ? "previous" : "next";
    e.preventDefault();
    const l = w(v, e.currentTarget, { direction: G, loop: r.loop });
    l == null || l.focus(), l == null || l.click();
  }, children: [
    u ?? /* @__PURE__ */ n("span", { "aria-hidden": "true", className: "slr-radio__indicator" }),
    r.name && /* @__PURE__ */ n("input", { type: "radio", name: r.name, value: a, checked: t, readOnly: !0, hidden: !0 })
  ] });
});
_.displayName = "RadioGroupItem";
export {
  A as Checkbox,
  P as RadioGroup,
  _ as RadioGroupItem
};
//# sourceMappingURL=choice.js.map
