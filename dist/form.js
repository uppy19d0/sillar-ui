import { jsx as l, jsxs as q } from "react/jsx-runtime";
import * as n from "react";
import { Slot as V } from "./slot.js";
import { cn as C } from "./utils.js";
const w = typeof window > "u" ? n.useEffect : n.useLayoutEffect;
function D({ initialValues: r, validate: e, onSubmit: t }) {
  const [o, i] = n.useState(r), [s, d] = n.useState({}), [c, f] = n.useState(!1), u = n.useRef(o), m = n.useRef({ initialValues: r, validate: e, onSubmit: t }), F = n.useRef(!1), v = n.useRef(!0);
  w(() => {
    m.current = { initialValues: r, validate: e, onSubmit: t };
  }, [r, e, t]), w(() => (v.current = !0, () => {
    v.current = !1;
  }), []);
  const p = n.useCallback((a, g) => {
    const y = { ...u.current, [a]: g };
    u.current = y, i(y), d((b) => ({ ...b, [a]: void 0 }));
  }, []), I = n.useCallback(async (a) => {
    var g;
    if (a == null || a.preventDefault(), F.current) return !1;
    F.current = !0;
    try {
      const y = u.current, b = m.current, _ = ((g = b.validate) == null ? void 0 : g.call(b, y)) ?? {};
      return d(_), Object.values(_).some(Boolean) ? !1 : (f(!0), await b.onSubmit(y), !0);
    } finally {
      F.current = !1, v.current && f(!1);
    }
  }, []), S = n.useCallback(() => {
    const a = m.current.initialValues;
    u.current = a, i(a), d({});
  }, []);
  return {
    values: o,
    errors: s,
    submitting: c,
    setValue: p,
    setErrors: d,
    handleSubmit: I,
    reset: S,
    field: (a) => ({
      name: String(a),
      value: o[a],
      "aria-invalid": !!s[a],
      onChange: (g) => p(a, g.target.value)
    })
  };
}
const $ = n.forwardRef(
  ({ className: r, ...e }, t) => /* @__PURE__ */ l("form", { ...e, ref: t, noValidate: e.noValidate ?? !0, className: C("slr-form", r) })
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
      const d = x(s.props.children, e, t + 1);
      if (d) return d;
    }
  }
}
function j(...r) {
  return [...new Set(r.flatMap((e) => (e == null ? void 0 : e.split(/\s+/).filter(Boolean)) ?? []))].join(" ") || void 0;
}
function A({ invalid: r = !1, required: e = !1, controlId: t, className: o, children: i, ...s }) {
  const d = n.useId(), c = x(i, N), f = n.isValidElement(c == null ? void 0 : c.props.children) ? c.props.children : void 0, u = (f == null ? void 0 : f.props.id) ?? (c == null ? void 0 : c.props.id) ?? t ?? d, m = x(i, M), F = x(i, k), v = m ? m.props.id ?? `${u}-description` : void 0, p = F ? F.props.id ?? `${u}-message` : void 0, I = n.useMemo(() => ({ id: u, invalid: r, required: e, descriptionId: v, messageId: p }), [u, r, e, v, p]);
  return /* @__PURE__ */ l(R.Provider, { value: I, children: /* @__PURE__ */ l("div", { ...s, "data-invalid": r || void 0, className: C("slr-form__item", o), children: i }) });
}
function O({ className: r, children: e, ...t }) {
  const o = E("FormLabel");
  return /* @__PURE__ */ q("label", { ...t, htmlFor: t.htmlFor ?? o.id, className: C("slr-form__label", r), children: [
    e,
    o.required && /* @__PURE__ */ l("span", { "aria-hidden": "true", className: "slr-form__required", children: "*" })
  ] });
}
const N = n.forwardRef(({ children: r, ...e }, t) => {
  const o = E("FormControl"), i = n.isValidElement(r) ? r : void 0, s = i == null ? void 0 : i.props, d = {
    id: (s == null ? void 0 : s.id) ?? e.id ?? o.id,
    "aria-invalid": (s == null ? void 0 : s["aria-invalid"]) ?? e["aria-invalid"] ?? (o.invalid || void 0),
    "aria-required": (s == null ? void 0 : s["aria-required"]) ?? e["aria-required"] ?? (o.required || void 0),
    "aria-describedby": j(s == null ? void 0 : s["aria-describedby"], e["aria-describedby"], o.descriptionId, o.invalid ? o.messageId : void 0)
  };
  return /* @__PURE__ */ l(V, { ...e, ...d, ref: t, children: i ? n.cloneElement(i, d) : r });
});
N.displayName = "FormControl";
function M({ className: r, ...e }) {
  const t = n.useContext(R);
  return /* @__PURE__ */ l("p", { ...e, id: e.id ?? (t == null ? void 0 : t.descriptionId) ?? (t ? `${t.id}-description` : void 0), className: C("slr-form__description", r) });
}
function k({ className: r, ...e }) {
  const t = E("FormMessage");
  return !t.invalid && !e.children ? null : /* @__PURE__ */ l("p", { ...e, id: e.id ?? t.messageId ?? `${t.id}-message`, role: "alert", className: C("slr-form__message", r) });
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
