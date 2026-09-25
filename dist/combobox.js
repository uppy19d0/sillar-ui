import { jsxs as I, jsx as n } from "react/jsx-runtime";
import * as m from "react";
import { u as C } from "./internal-D9EwPR7x.js";
import { cn as K } from "./utils.js";
function ee(l, { normalizedQuery: d }) {
  return [l.label, l.value, ...l.keywords ?? []].some((r) => r.toLocaleLowerCase().includes(d));
}
function ae(l, d, r, t) {
  var f;
  if (!l.some((c) => !c.disabled)) return -1;
  let s = d;
  for (let c = 0; c < l.length; c += 1) {
    if (s += r, t && (s = (s + l.length) % l.length), !t && (s < 0 || s >= l.length)) return d;
    if (!((f = l[s]) != null && f.disabled)) return s;
  }
  return d;
}
function R(l, d) {
  if (d === "first") return l.findIndex((r) => !r.disabled);
  for (let r = l.length - 1; r >= 0; r -= 1) if (!l[r].disabled) return r;
  return -1;
}
const le = m.forwardRef(({
  options: l,
  value: d,
  defaultValue: r = "",
  onValueChange: t,
  inputValue: s,
  defaultInputValue: f = "",
  onInputValueChange: c,
  open: _,
  defaultOpen: E = !1,
  onOpenChange: T,
  filter: $ = ee,
  onCreateOption: y,
  placeholder: q = "Search options",
  emptyMessage: z = "No options found",
  loadingMessage: B = "Loading options",
  createMessage: U = (u) => `Create “${u}”`,
  loading: g = !1,
  loop: G = !0,
  name: F,
  form: J,
  required: W = !1,
  disabled: M = !1,
  inputProps: a,
  className: X,
  "aria-label": Y,
  "aria-labelledby": Z,
  ...V
}, O) => {
  var H;
  const [u, S] = C({ value: d, defaultValue: r, onChange: t }), P = ((H = l.find((e) => e.value === r)) == null ? void 0 : H.label) ?? f, [h, w] = C({ value: s, defaultValue: P, onChange: c }), [v, i] = C({ value: _, defaultValue: E, onChange: T }), [x, N] = m.useState(-1), k = m.useId(), j = m.useId(), o = m.useMemo(() => {
    const e = h.trim().toLocaleLowerCase();
    return !e || l.some((b) => b.value === u && b.label === h) ? l : l.filter((b) => $(b, { query: h, normalizedQuery: e }));
  }, [$, l, h, u]);
  m.useEffect(() => {
    N((e) => e >= 0 && e < o.length && !o[e].disabled ? e : R(o, "first"));
  }, [o]), m.useEffect(() => {
    if (s !== void 0) return;
    const e = l.find((b) => b.value === u);
    e && h !== e.label && d !== void 0 && w(e.label);
  }, [s, l, h, u, w, d]);
  const Q = m.useCallback((e) => {
    e.disabled || (S(e.value), w(e.label), i(!1));
  }, [i, w, S]), D = h.trim(), A = !!(y && D && !g && !l.some((e) => e.label.toLocaleLowerCase() === D.toLocaleLowerCase())), p = [a == null ? void 0 : a["aria-describedby"], j].filter(Boolean).join(" ") || void 0;
  return /* @__PURE__ */ I("div", { ...V, ref: O, "data-slot": "combobox", "data-state": v ? "open" : "closed", className: K("slr-combobox", X), children: [
    /* @__PURE__ */ n(
      "input",
      {
        ...a,
        role: "combobox",
        "aria-label": (a == null ? void 0 : a["aria-label"]) ?? Y,
        "aria-labelledby": (a == null ? void 0 : a["aria-labelledby"]) ?? Z,
        "aria-describedby": p,
        "aria-autocomplete": "list",
        "aria-controls": k,
        "aria-expanded": v,
        "aria-activedescendant": v && x >= 0 ? `${k}-${x}` : void 0,
        "aria-busy": g || void 0,
        disabled: M,
        required: W,
        value: h,
        placeholder: q,
        className: K("slr-field slr-input slr-combobox__input", a == null ? void 0 : a.className),
        onFocus: (e) => {
          var b;
          (b = a == null ? void 0 : a.onFocus) == null || b.call(a, e), e.defaultPrevented || i(!0);
        },
        onBlur: (e) => {
          var b, L;
          (b = a == null ? void 0 : a.onBlur) == null || b.call(a, e), !e.defaultPrevented && !((L = e.currentTarget.parentElement) != null && L.contains(e.relatedTarget)) && i(!1);
        },
        onChange: (e) => {
          w(e.target.value), i(!0);
        },
        onKeyDown: (e) => {
          var b;
          (b = a == null ? void 0 : a.onKeyDown) == null || b.call(a, e), !e.defaultPrevented && (e.key === "ArrowDown" || e.key === "ArrowUp" ? (e.preventDefault(), i(!0), N((L) => ae(o, L, e.key === "ArrowDown" ? 1 : -1, G))) : e.key === "Home" || e.key === "End" ? (e.preventDefault(), N(R(o, e.key === "Home" ? "first" : "last"))) : e.key === "Enter" && v ? o[x] && !o[x].disabled ? (e.preventDefault(), Q(o[x])) : A && (e.preventDefault(), y == null || y(D), i(!1)) : e.key === "Escape" && (v && e.preventDefault(), i(!1)));
        }
      }
    ),
    /* @__PURE__ */ n("span", { id: j, className: "slr-visually-hidden", role: "status", "aria-live": "polite", children: g ? B : `${o.length} options available` }),
    v && /* @__PURE__ */ I("div", { id: k, role: "listbox", "aria-busy": g || void 0, "data-slot": "combobox-content", className: "slr-combobox__content", children: [
      g ? /* @__PURE__ */ n("div", { role: "presentation", className: "slr-combobox__empty", children: B }) : o.length === 0 && !A ? /* @__PURE__ */ n("div", { role: "presentation", className: "slr-combobox__empty", children: z }) : de(o, { activeIndex: x, listboxId: k, selected: u, setActiveIndex: N, choose: Q }),
      A && /* @__PURE__ */ I("button", { type: "button", role: "option", "aria-selected": "false", className: "slr-combobox__option slr-combobox__create", onMouseDown: (e) => e.preventDefault(), onClick: () => {
        y == null || y(D), i(!1);
      }, children: [
        /* @__PURE__ */ n("span", { "aria-hidden": "true", children: "+" }),
        U(D)
      ] })
    ] }),
    F && /* @__PURE__ */ n("input", { type: "hidden", name: F, value: u, disabled: M, form: J })
  ] });
});
le.displayName = "Combobox";
function de(l, d) {
  const r = /* @__PURE__ */ new Map();
  return l.forEach((t, s) => {
    const f = t.group ?? "";
    r.set(f, [...r.get(f) ?? [], { option: t, index: s }]);
  }), Array.from(r, ([t, s]) => {
    const f = s.map(({ option: c, index: _ }) => /* @__PURE__ */ I("button", { id: `${d.listboxId}-${_}`, type: "button", role: "option", "aria-selected": d.selected === c.value, "aria-disabled": c.disabled || void 0, disabled: c.disabled, tabIndex: -1, "data-active": d.activeIndex === _ || void 0, className: "slr-combobox__option", onMouseDown: (E) => E.preventDefault(), onPointerMove: () => {
      c.disabled || d.setActiveIndex(_);
    }, onClick: () => d.choose(c), children: [
      /* @__PURE__ */ n("span", { "aria-hidden": "true", children: d.selected === c.value ? "✓" : "" }),
      c.label
    ] }, c.value));
    return t ? /* @__PURE__ */ I("div", { role: "group", "aria-label": t, className: "slr-combobox__group", children: [
      /* @__PURE__ */ n("div", { role: "presentation", className: "slr-combobox__label", children: t }),
      f
    ] }, t) : /* @__PURE__ */ n(m.Fragment, { children: f }, "ungrouped");
  });
}
export {
  le as Combobox
};
//# sourceMappingURL=combobox.js.map
