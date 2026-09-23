import { jsx as r } from "react/jsx-runtime";
import { Slot as o } from "./slot.js";
import { cva as n } from "class-variance-authority";
import { cn as d } from "./utils.js";
const l = n("slr-badge", {
  variants: {
    variant: {
      default: "slr-badge--default",
      secondary: "slr-badge--secondary",
      destructive: "slr-badge--destructive",
      outline: "slr-badge--outline",
      success: "slr-badge--success"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
function g({ className: a, variant: e, asChild: t = !1, ...s }) {
  return /* @__PURE__ */ r(
    t ? o : "span",
    {
      "data-slot": "badge",
      className: d(l({ variant: e }), a),
      ...s
    }
  );
}
export {
  g as Badge,
  l as badgeVariants
};
//# sourceMappingURL=badge.js.map
