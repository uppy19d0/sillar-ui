import { jsxs as t, jsx as e } from "react/jsx-runtime";
import * as I from "react";
import { cn as n } from "./utils.js";
function C(...r) {
  return r.filter(Boolean).join(" ") || void 0;
}
const D = I.forwardRef(
  ({
    id: r,
    className: $,
    containerClassName: j,
    inputClassName: F,
    label: _,
    description: i,
    error: l,
    success: d,
    leading: u,
    trailing: p,
    action: x,
    variant: T = "default",
    tone: B = "neutral",
    fieldSize: R = "md",
    hideLabel: w = !1,
    required: v = !1,
    disabled: h,
    "aria-describedby": z,
    "aria-invalid": N,
    maxLength: a,
    value: b,
    defaultValue: g,
    ...S
  }, k) => {
    const q = I.useId(), s = r ?? q, y = i ? `${s}-description` : void 0, o = l || d ? `${s}-message` : void 0, c = !!l || N === !0 || N === "true", A = c ? "danger" : B, f = b ?? g, m = typeof f == "string" || typeof f == "number" ? String(f).length : void 0;
    return /* @__PURE__ */ t(
      "div",
      {
        "data-slot": "text-field",
        "data-variant": T,
        "data-tone": A,
        "data-size": R,
        "data-disabled": h || void 0,
        "data-invalid": c || void 0,
        className: n("slr-text-field", j),
        children: [
          _ ? /* @__PURE__ */ t(
            "label",
            {
              htmlFor: s,
              "data-slot": "text-field-label",
              className: n("slr-text-field__label", w && "slr-visually-hidden"),
              children: [
                _,
                v ? /* @__PURE__ */ e("span", { className: "slr-text-field__required", "aria-hidden": "true", children: "*" }) : null
              ]
            }
          ) : null,
          /* @__PURE__ */ t("div", { className: n("slr-text-field__control", $), children: [
            u ? /* @__PURE__ */ e("span", { className: "slr-text-field__adornment", "data-position": "leading", "aria-hidden": "true", children: u }) : null,
            /* @__PURE__ */ e(
              "input",
              {
                ...S,
                ref: k,
                id: s,
                "data-slot": "text-field-input",
                className: n("slr-text-field__input", F),
                disabled: h,
                required: v,
                "aria-invalid": c || void 0,
                "aria-describedby": C(z, y, o),
                maxLength: a,
                value: b,
                defaultValue: g
              }
            ),
            p ? /* @__PURE__ */ e("span", { className: "slr-text-field__adornment", "data-position": "trailing", "aria-hidden": "true", children: p }) : null,
            x ? /* @__PURE__ */ e("span", { className: "slr-text-field__action", children: x }) : null
          ] }),
          i || l || d || a ? /* @__PURE__ */ t("div", { className: "slr-text-field__meta", children: [
            /* @__PURE__ */ t("div", { className: "slr-text-field__messages", children: [
              i ? /* @__PURE__ */ e("p", { id: y, className: "slr-text-field__description", children: i }) : null,
              l ? /* @__PURE__ */ e("p", { id: o, role: "alert", className: "slr-text-field__message", children: l }) : null,
              !l && d ? /* @__PURE__ */ e("p", { id: o, className: "slr-text-field__message", children: d }) : null
            ] }),
            a ? /* @__PURE__ */ t("p", { className: "slr-text-field__counter", "aria-label": m === void 0 ? void 0 : `${m} of ${a} characters`, children: [
              m ?? 0,
              "/",
              a
            ] }) : null
          ] }) : null
        ]
      }
    );
  }
);
D.displayName = "TextField";
export {
  D as TextField
};
//# sourceMappingURL=text-field.js.map
