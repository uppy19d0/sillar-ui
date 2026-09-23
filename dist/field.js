import { jsx as r, jsxs as s } from "react/jsx-runtime";
import { cn as i } from "./utils.js";
function o({ className: l, invalid: e = !1, ...a }) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-slot": "field",
      "data-invalid": e || void 0,
      className: i("slr-field-group", l),
      ...a
    }
  );
}
function f({ className: l, required: e = !1, children: a, ...d }) {
  return /* @__PURE__ */ s("label", { "data-slot": "field-label", className: i("slr-field-label", l), ...d, children: [
    a,
    e ? /* @__PURE__ */ r("span", { className: "slr-field-required", "aria-hidden": "true", children: "*" }) : null
  ] });
}
function c({ className: l, ...e }) {
  return /* @__PURE__ */ r("p", { "data-slot": "field-description", className: i("slr-field-description", l), ...e });
}
function u({ className: l, ...e }) {
  return /* @__PURE__ */ r("p", { "data-slot": "field-error", role: "alert", className: i("slr-field-error", l), ...e });
}
export {
  o as Field,
  c as FieldDescription,
  u as FieldError,
  f as FieldLabel
};
//# sourceMappingURL=field.js.map
