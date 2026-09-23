import { jsxs as k, jsx as c } from "react/jsx-runtime";
import * as f from "react";
import { cn as V } from "./utils.js";
const w = (r, s) => r.getFullYear() === s.getFullYear() && r.getMonth() === s.getMonth() && r.getDate() === s.getDate(), m = (r) => new Date(r.getFullYear(), r.getMonth(), r.getDate()), a = (r, s) => new Date(r.getFullYear(), r.getMonth(), r.getDate() + s), u = (r, s) => new Date(r.getFullYear(), r.getMonth() + s, 1), C = f.forwardRef(({ value: r, defaultValue: s = null, onValueChange: y, month: _, defaultMonth: R, onMonthChange: D, min: F, max: M, locale: h = "en", weekStartsOn: d = 0, previousLabel: T = "Previous month", nextLabel: j = "Next month", className: q, ...x }, B) => {
  const b = r !== void 0, [U, z] = f.useState(s), g = b ? r : U, N = _ !== void 0, [E, H] = f.useState(() => m(R ?? g ?? /* @__PURE__ */ new Date())), n = N ? _ : E, [K, Y] = f.useState(() => m(g ?? /* @__PURE__ */ new Date())), p = (t) => {
    const o = new Date(t.getFullYear(), t.getMonth(), 1);
    N || H(o), D == null || D(o);
  }, L = (t) => {
    b || z(t), y == null || y(t), Y(t);
  }, v = new Date(n.getFullYear(), n.getMonth(), 1), G = (v.getDay() - d + 7) % 7, J = a(v, -G), Q = Array.from({ length: 42 }, (t, o) => a(J, o)), A = new Intl.DateTimeFormat(h, { weekday: "short" }), I = new Intl.DateTimeFormat(h, { month: "long", year: "numeric" }), W = new Intl.DateTimeFormat(h, { dateStyle: "full" }), $ = new Date(2024, 0, d === 1 ? 1 : 7), P = (t) => !!(F && m(t) < m(F) || M && m(t) > m(M)), X = (t) => {
    Y(t), (t.getMonth() !== n.getMonth() || t.getFullYear() !== n.getFullYear()) && p(t), requestAnimationFrame(() => {
      var o;
      return (o = document.querySelector(`[data-sillar-date="${t.getFullYear()}-${t.getMonth()}-${t.getDate()}"]`)) == null ? void 0 : o.focus();
    });
  };
  return /* @__PURE__ */ k("div", { ...x, ref: B, "data-slot": "date-picker", className: V("slr-date-picker", q), children: [
    /* @__PURE__ */ k("div", { className: "slr-date-picker__header", children: [
      /* @__PURE__ */ c("button", { type: "button", "aria-label": T, className: "slr-date-picker__nav", onClick: () => p(u(n, -1)), children: "‹" }),
      /* @__PURE__ */ c("div", { "aria-live": "polite", className: "slr-date-picker__month", children: I.format(n) }),
      /* @__PURE__ */ c("button", { type: "button", "aria-label": j, className: "slr-date-picker__nav", onClick: () => p(u(n, 1)), children: "›" })
    ] }),
    /* @__PURE__ */ k("div", { role: "grid", "aria-label": I.format(n), className: "slr-date-picker__grid", children: [
      /* @__PURE__ */ c("div", { role: "row", className: "slr-date-picker__row", children: Array.from({ length: 7 }, (t, o) => /* @__PURE__ */ c("div", { role: "columnheader", "aria-label": A.format(a($, o)), className: "slr-date-picker__weekday", children: A.format(a($, o)).slice(0, 2) }, o)) }),
      Array.from({ length: 6 }, (t, o) => /* @__PURE__ */ c("div", { role: "row", className: "slr-date-picker__row", children: Q.slice(o * 7, o * 7 + 7).map((e) => {
        const Z = e.getMonth() !== n.getMonth(), S = g ? w(e, g) : !1, O = P(e);
        return /* @__PURE__ */ c("button", { type: "button", role: "gridcell", "aria-label": W.format(e), "aria-selected": S, disabled: O, tabIndex: w(e, K) ? 0 : -1, "data-sillar-date": `${e.getFullYear()}-${e.getMonth()}-${e.getDate()}`, "data-outside": Z || void 0, "data-today": w(e, /* @__PURE__ */ new Date()) || void 0, "data-state": S ? "selected" : "unselected", className: "slr-date-picker__day", onClick: () => L(e), onKeyDown: (i) => {
          let l = null;
          i.key === "ArrowLeft" && (l = a(e, -1)), i.key === "ArrowRight" && (l = a(e, 1)), i.key === "ArrowUp" && (l = a(e, -7)), i.key === "ArrowDown" && (l = a(e, 7)), i.key === "Home" && (l = a(e, -((e.getDay() - d + 7) % 7))), i.key === "End" && (l = a(e, 6 - (e.getDay() - d + 7) % 7)), i.key === "PageUp" && (l = u(e, -1)), i.key === "PageDown" && (l = u(e, 1)), l && !P(l) && (i.preventDefault(), X(l));
        }, children: e.getDate() }, e.toISOString());
      }) }, o))
    ] })
  ] });
});
C.displayName = "DatePicker";
export {
  C as DatePicker
};
//# sourceMappingURL=date-picker.js.map
