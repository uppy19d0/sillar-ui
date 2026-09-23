import { jsxs as y, jsx as n } from "react/jsx-runtime";
import * as c from "react";
import { u as w } from "./internal-D9EwPR7x.js";
import { cn as j } from "./utils.js";
const R = c.forwardRef(({ options: t, value: C, defaultValue: f = "", onValueChange: g, inputValue: _, defaultInputValue: D = "", onInputValueChange: N, placeholder: k = "Search options", emptyMessage: I = "No options found", name: v, disabled: L, className: M, ...S }, $) => {
  var p;
  const [r, A] = w({ value: C, defaultValue: f, onChange: g }), E = ((p = t.find((e) => e.value === f)) == null ? void 0 : p.label) ?? D, [i, x] = w({ value: _, defaultValue: E, onChange: N }), [d, l] = c.useState(!1), [s, u] = c.useState(0), b = c.useId(), o = c.useMemo(() => {
    const e = i.trim().toLocaleLowerCase();
    return !e || t.some((a) => a.value === r && a.label === i) ? t : t.filter((a) => [a.label, a.value, ...a.keywords ?? []].some((m) => m.toLocaleLowerCase().includes(e)));
  }, [t, i, r]), h = (e) => {
    e.disabled || (A(e.value), x(e.label), l(!1));
  };
  return /* @__PURE__ */ y("div", { ...S, ref: $, "data-slot": "combobox", className: j("slr-combobox", M), children: [
    /* @__PURE__ */ n("input", { role: "combobox", "aria-autocomplete": "list", "aria-controls": b, "aria-expanded": d, "aria-activedescendant": d && o[s] ? `${b}-${s}` : void 0, disabled: L, value: i, placeholder: k, className: "slr-field slr-input slr-combobox__input", onFocus: () => l(!0), onBlur: (e) => {
      var a;
      (a = e.currentTarget.parentElement) != null && a.contains(e.relatedTarget) || l(!1);
    }, onChange: (e) => {
      x(e.target.value), l(!0), u(0);
    }, onKeyDown: (e) => {
      e.key === "ArrowDown" ? (e.preventDefault(), l(!0), u((a) => Math.min(a + 1, o.length - 1))) : e.key === "ArrowUp" ? (e.preventDefault(), u((a) => Math.max(a - 1, 0))) : e.key === "Enter" && d && o[s] ? (e.preventDefault(), h(o[s])) : e.key === "Escape" && l(!1);
    } }),
    d && /* @__PURE__ */ n("div", { id: b, role: "listbox", "data-slot": "combobox-content", className: "slr-combobox__content", children: o.length === 0 ? /* @__PURE__ */ n("div", { className: "slr-combobox__empty", children: I }) : o.map((e, a) => /* @__PURE__ */ y("button", { id: `${b}-${a}`, type: "button", role: "option", "aria-selected": r === e.value, "aria-disabled": e.disabled || void 0, disabled: e.disabled, tabIndex: -1, "data-active": s === a || void 0, className: "slr-combobox__option", onMouseDown: (m) => m.preventDefault(), onPointerMove: () => u(a), onClick: () => h(e), children: [
      /* @__PURE__ */ n("span", { "aria-hidden": "true", children: r === e.value ? "✓" : "" }),
      e.label
    ] }, e.value)) }),
    v && /* @__PURE__ */ n("input", { type: "hidden", name: v, value: r })
  ] });
});
R.displayName = "Combobox";
export {
  R as Combobox
};
//# sourceMappingURL=combobox.js.map
