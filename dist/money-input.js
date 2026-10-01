import { jsxs as D, jsx as _ } from "react/jsx-runtime";
import * as y from "react";
import { Input as U } from "./input.js";
import { cn as $ } from "./utils.js";
function x(r, l = "en-US") {
  var u, S;
  const o = Intl.NumberFormat(l).formatToParts(1000.1), s = ((u = o.find((t) => t.type === "decimal")) == null ? void 0 : u.value) ?? ".", d = ((S = o.find((t) => t.type === "group")) == null ? void 0 : S.value) ?? ",", i = r.trim().replaceAll(/\s/g, "").replace(/[^\d.,-]/g, "");
  if (!/\d/.test(i)) return null;
  const m = i.includes("-") ? "-" : "", e = i.replaceAll("-", ""), f = e.lastIndexOf("."), p = e.lastIndexOf(",");
  let n = "";
  if (f >= 0 && p >= 0)
    n = f > p ? "." : ",";
  else if (f >= 0 || p >= 0) {
    const t = f >= 0 ? "." : ",", g = e.split(t), h = g.at(-1) ?? "", P = h.length > 0 && h.length <= 2;
    (t === s && h.length > 0 || t !== d && P || g.length === 2 && P && e.length > 3) && (n = t);
  }
  const I = n ? e.lastIndexOf(n) : -1, N = I >= 0 ? e.slice(0, I).replace(/\D/g, "") : e.replace(/\D/g, ""), c = I >= 0 ? e.slice(I + 1).replace(/\D/g, "") : "", b = `${m}${N || "0"}${c ? `.${c}` : ""}`, a = Number(b);
  return Number.isFinite(a) ? a : null;
}
function O(r, l, o) {
  return new Intl.NumberFormat(l, o).format(r);
}
function M(r, l, o) {
  return r == null ? "" : typeof r == "number" ? O(r, l, o) : r;
}
const w = y.forwardRef(
  ({
    className: r,
    value: l,
    defaultValue: o,
    locale: s = "en-US",
    currency: d = "USD",
    minimumFractionDigits: i = 2,
    maximumFractionDigits: m = 2,
    leadingLabel: e,
    trailingLabel: f,
    onValueChange: p,
    onBlur: n,
    ...I
  }, N) => {
    const c = y.useMemo(() => ({
      currency: d,
      maximumFractionDigits: m,
      minimumFractionDigits: i,
      style: "currency"
    }), [d, m, i]), [b, a] = y.useState(() => M(o, s, c)), u = l !== void 0, S = u ? M(l, s, c) : b;
    return /* @__PURE__ */ D("span", { "data-slot": "money-input", className: $("slr-number-input", r), children: [
      e ? /* @__PURE__ */ _("span", { className: "slr-number-input__adornment", children: e }) : null,
      /* @__PURE__ */ _(
        U,
        {
          ...I,
          ref: N,
          type: "text",
          inputMode: "decimal",
          value: S,
          className: "slr-number-input__control",
          onChange: (t) => {
            u || a(t.target.value), p == null || p(x(t.target.value, s), t);
          },
          onBlur: (t) => {
            if (!u) {
              const g = x(t.target.value, s);
              a(g === null ? "" : O(g, s, c));
            }
            n == null || n(t);
          }
        }
      ),
      /* @__PURE__ */ _("span", { className: "slr-number-input__adornment", "aria-hidden": "true", children: f ?? d })
    ] });
  }
);
w.displayName = "MoneyInput";
const R = y.forwardRef(
  ({
    className: r,
    value: l,
    defaultValue: o,
    locale: s = "en-US",
    minimumFractionDigits: d = 0,
    maximumFractionDigits: i = 2,
    onValueChange: m,
    onBlur: e,
    ...f
  }, p) => {
    const n = y.useMemo(() => ({
      maximumFractionDigits: i,
      minimumFractionDigits: d
    }), [i, d]), [I, N] = y.useState(() => M(o, s, n)), c = l !== void 0, b = c ? M(l, s, n) : I;
    return /* @__PURE__ */ D("span", { "data-slot": "percentage-input", className: $("slr-number-input", r), children: [
      /* @__PURE__ */ _(
        U,
        {
          ...f,
          ref: p,
          type: "text",
          inputMode: "decimal",
          value: b,
          className: "slr-number-input__control",
          onChange: (a) => {
            c || N(a.target.value), m == null || m(x(a.target.value, s), a);
          },
          onBlur: (a) => {
            if (!c) {
              const u = x(a.target.value, s);
              N(u === null ? "" : O(u, s, n));
            }
            e == null || e(a);
          }
        }
      ),
      /* @__PURE__ */ _("span", { className: "slr-number-input__adornment", "aria-hidden": "true", children: "%" })
    ] });
  }
);
R.displayName = "PercentageInput";
export {
  w as MoneyInput,
  R as PercentageInput,
  x as parseNumericInput
};
//# sourceMappingURL=money-input.js.map
