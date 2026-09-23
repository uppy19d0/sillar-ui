import { jsx as a } from "react/jsx-runtime";
import { cva as n } from "class-variance-authority";
import { cn as o } from "./utils.js";
const s = n("slr-callout", {
  variants: {
    variant: {
      info: "slr-callout--info",
      success: "slr-callout--success",
      warning: "slr-callout--warning",
      danger: "slr-callout--danger"
    }
  },
  defaultVariants: { variant: "info" }
});
function e({ className: t, variant: l, ...r }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "callout",
      role: l === "danger" ? "alert" : void 0,
      className: o(s({ variant: l }), t),
      ...r
    }
  );
}
function d({ className: t, ...l }) {
  return /* @__PURE__ */ a("span", { "data-slot": "callout-icon", className: o("slr-callout__icon", t), ...l });
}
function f({ className: t, ...l }) {
  return /* @__PURE__ */ a("h3", { "data-slot": "callout-title", className: o("slr-callout__title", t), ...l });
}
function m({ className: t, ...l }) {
  return /* @__PURE__ */ a("div", { "data-slot": "callout-description", className: o("slr-callout__description", t), ...l });
}
export {
  e as Callout,
  m as CalloutDescription,
  d as CalloutIcon,
  f as CalloutTitle,
  s as calloutVariants
};
//# sourceMappingURL=callout.js.map
