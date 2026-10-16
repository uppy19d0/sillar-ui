import { jsx as f, jsxs as q } from "react/jsx-runtime";
import * as n from "react";
import { Slot as V } from "./slot.js";
import { cn as C } from "./utils.js";
const w = typeof window > "u" ? n.useEffect : n.useLayoutEffect;
function D({ initialValues: r, validate: e, onSubmit: t }) {
  const [o, i] = n.useState(r), [s, c] = n.useState({}), [d, m] = n.useState(!1), u = n.useRef(o), F = n.useRef({ initialValues: r, validate: e, onSubmit: t }), l = n.useRef(!1), v = n.useRef(!0);
  w(() => {
    F.current = { initialValues: r, validate: e, onSubmit: t };
  }, [r, e, t]), w(() => (v.current = !0, () => {
    v.current = !1;
  }), []);
  const p = n.useCallback((a, b) => {
    const y = { ...u.current, [a]: b };
    u.current = y, i(y), c((g) => ({ ...g, [a]: void 0 }));
  }, []), I = n.useCallback(async (a) => {
    var b;
    if (a == null || a.preventDefault(), l.current) return !1;
    l.current = !0;
    try {
      const y = u.current, g = F.current, _ = ((b = g.validate) == null ? void 0 : b.call(g, y)) ?? {};
      return c(_), Object.values(_).some(Boolean) ? !1 : (m(!0), await g.onSubmit(y), !0);
    } finally {
      l.current = !1, v.current && m(!1);
    }
  }, []), S = n.useCallback(() => {
    const a = F.current.initialValues;
    u.current = a, i(a), c({});
  }, []);
  return {
    values: o,
    errors: s,
    submitting: d,
    setValue: p,
    setErrors: c,
    handleSubmit: I,
    reset: S,
    field: (a) => ({
      name: String(a),
      value: o[a],
      "aria-invalid": !!s[a],
      onChange: (b) => p(a, b.target.value)
    })
  };
}
const $ = n.forwardRef(
  ({ className: r, ...e }, t) => /* @__PURE__ */ f("form", { ...e, ref: t, noValidate: e.noValidate ?? !0, className: C("slr-form", r) })
);
$.displayName = "Form";
const R = n.createContext(null);
function E(r) {
  const e = n.useContext(R);
  if (!e) throw new Error(`${r} must be rendered inside FormItem.`);
  return e;
}
function x(r, e, t = 0) {
  if (t > 8) return;
  const o = n.Children.toArray(r);
  for (const i of o.slice(0, 128)) {
    if (!n.isValidElement(i)) continue;
    const s = i;
    if (s.type === e) return s;
    if (s.type === n.Fragment) {
      const c = x(s.props.children, e, t + 1);
      if (c) return c;
    }
  }
}
function j(...r) {
  return [...new Set(r.flatMap((e) => (e == null ? void 0 : e.split(/\s+/).filter(Boolean)) ?? []))].join(" ") || void 0;
}
function A({ invalid: r = !1, required: e = !1, controlId: t, className: o, children: i, ...s }) {
  const c = n.useId(), d = x(i, N), m = n.isValidElement(d == null ? void 0 : d.props.children) ? d.props.children : void 0, u = (m == null ? void 0 : m.props.id) ?? (d == null ? void 0 : d.props.id) ?? t ?? c, F = x(i, M), l = x(i, k), v = F ? F.props.id ?? `${u}-description` : void 0, p = (l == null ? void 0 : l.props.id) ?? `${u}-message`, I = n.useMemo(() => ({ id: u, invalid: r, required: e, descriptionId: v, messageId: p }), [u, r, e, v, p]);
  return /* @__PURE__ */ f(R.Provider, { value: I, children: /* @__PURE__ */ f("div", { ...s, "data-invalid": r || void 0, className: C("slr-form__item", o), children: i }) });
}
function O({ className: r, children: e, ...t }) {
  const o = E("FormLabel");
  return /* @__PURE__ */ q("label", { ...t, htmlFor: t.htmlFor ?? o.id, className: C("slr-form__label", r), children: [
    e,
    o.required && /* @__PURE__ */ f("span", { "aria-hidden": "true", className: "slr-form__required", children: "*" })
  ] });
}
const N = n.forwardRef(({ children: r, ...e }, t) => {
  const o = E("FormControl"), i = n.isValidElement(r) ? r : void 0, s = i == null ? void 0 : i.props, c = {
    id: (s == null ? void 0 : s.id) ?? e.id ?? o.id,
    "aria-invalid": (s == null ? void 0 : s["aria-invalid"]) ?? e["aria-invalid"] ?? (o.invalid || void 0),
    "aria-required": (s == null ? void 0 : s["aria-required"]) ?? e["aria-required"] ?? (o.required || void 0),
    "aria-describedby": j(s == null ? void 0 : s["aria-describedby"], e["aria-describedby"], o.descriptionId, o.invalid ? o.messageId : void 0)
  };
  return /* @__PURE__ */ f(V, { ...e, ...c, ref: t, children: i ? n.cloneElement(i, c) : r });
});
N.displayName = "FormControl";
function M({ className: r, ...e }) {
  const t = n.useContext(R);
  return /* @__PURE__ */ f("p", { ...e, id: e.id ?? (t == null ? void 0 : t.descriptionId) ?? (t ? `${t.id}-description` : void 0), className: C("slr-form__description", r) });
}
function k({ className: r, ...e }) {
  const t = E("FormMessage");
  return !t.invalid && !e.children ? null : /* @__PURE__ */ f("p", { ...e, id: e.id ?? t.messageId ?? `${t.id}-message`, role: "alert", className: C("slr-form__message", r) });
}
export {
  $ as Form,
  N as FormControl,
  M as FormDescription,
  A as FormItem,
  O as FormLabel,
  k as FormMessage,
  D as useForm
};
//# sourceMappingURL=form.js.map
