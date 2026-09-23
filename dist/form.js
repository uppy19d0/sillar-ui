import { jsx as n, jsxs as v } from "react/jsx-runtime";
import * as t from "react";
import { Slot as N } from "./slot.js";
import { cn as i } from "./utils.js";
function j({ initialValues: e, validate: r, onSubmit: o }) {
  const [a, m] = t.useState(e), [u, c] = t.useState({}), [h, F] = t.useState(!1), b = t.useCallback((s, l) => {
    m((d) => ({ ...d, [s]: l })), c((d) => ({ ...d, [s]: void 0 }));
  }, []), C = t.useCallback(async (s) => {
    s == null || s.preventDefault();
    const l = (r == null ? void 0 : r(a)) ?? {};
    if (c(l), Object.values(l).some(Boolean)) return !1;
    F(!0);
    try {
      return await o(a), !0;
    } finally {
      F(!1);
    }
  }, [o, r, a]), _ = t.useCallback(() => {
    m(e), c({});
  }, [e]);
  return { values: a, errors: u, submitting: h, setValue: b, setErrors: c, handleSubmit: C, reset: _, field: (s) => ({ name: String(s), value: a[s], "aria-invalid": !!u[s], onChange: (l) => b(s, l.target.value) }) };
}
const p = t.forwardRef(({ className: e, ...r }, o) => /* @__PURE__ */ n("form", { ...r, ref: o, noValidate: r.noValidate ?? !0, className: i("slr-form", e) }));
p.displayName = "Form";
const g = t.createContext(null);
function f(e) {
  const r = t.useContext(g);
  if (!r) throw new Error(`${e} must be rendered inside FormItem.`);
  return r;
}
function k({ invalid: e = !1, required: r = !1, className: o, children: a, ...m }) {
  const u = t.useId();
  return /* @__PURE__ */ n(g.Provider, { value: { id: u, invalid: e, required: r }, children: /* @__PURE__ */ n("div", { ...m, "data-invalid": e || void 0, className: i("slr-form__item", o), children: a }) });
}
function E({ className: e, children: r, ...o }) {
  const a = f("FormLabel");
  return /* @__PURE__ */ v("label", { ...o, htmlFor: o.htmlFor ?? a.id, className: i("slr-form__label", e), children: [
    r,
    a.required && /* @__PURE__ */ n("span", { "aria-hidden": "true", className: "slr-form__required", children: "*" })
  ] });
}
const x = t.forwardRef((e, r) => {
  const o = f("FormControl");
  return /* @__PURE__ */ n(N, { ...e, ref: r, id: o.id, "aria-invalid": o.invalid || void 0, "aria-describedby": o.invalid ? `${o.id}-message` : void 0 });
});
x.displayName = "FormControl";
function I({ className: e, ...r }) {
  return /* @__PURE__ */ n("p", { ...r, className: i("slr-form__description", e) });
}
function R({ className: e, ...r }) {
  const o = f("FormMessage");
  return !o.invalid && !r.children ? null : /* @__PURE__ */ n("p", { ...r, id: `${o.id}-message`, role: "alert", className: i("slr-form__message", e) });
}
export {
  p as Form,
  x as FormControl,
  I as FormDescription,
  k as FormItem,
  E as FormLabel,
  R as FormMessage,
  j as useForm
};
//# sourceMappingURL=form.js.map
