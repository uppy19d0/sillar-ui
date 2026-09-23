import { jsx as e, jsxs as g, Fragment as y } from "react/jsx-runtime";
import * as x from "react";
import { Slot as N } from "./slot.js";
import { cva as j } from "class-variance-authority";
import { cn as z } from "./utils.js";
const B = j("slr-button", {
  variants: {
    variant: {
      default: "slr-button--default",
      destructive: "slr-button--destructive",
      outline: "slr-button--outline",
      secondary: "slr-button--secondary",
      ghost: "slr-button--ghost",
      link: "slr-button--link"
    },
    size: {
      default: "slr-button--md",
      sm: "slr-button--sm",
      lg: "slr-button--lg",
      iconSm: "slr-button--icon-sm",
      icon: "slr-button--icon",
      iconLg: "slr-button--icon-lg"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
}), D = x.forwardRef(
  ({ className: u, variant: l, size: i, asChild: t = !1, type: d, loading: o = !1, disabled: b, children: s, onClick: r, tabIndex: m, ...c }, f) => {
    const p = t ? N : "button", n = b || o, v = (a) => {
      if (n) {
        a.preventDefault();
        return;
      }
      r == null || r(a);
    };
    return /* @__PURE__ */ e(
      p,
      {
        ref: f,
        "data-slot": "button",
        "data-loading": o || void 0,
        className: z(B({ variant: l, size: i }), u),
        type: t ? void 0 : d ?? "button",
        disabled: t ? void 0 : n,
        "aria-busy": o || void 0,
        "aria-disabled": t && n ? !0 : void 0,
        tabIndex: t && n ? -1 : m,
        onClick: v,
        ...c,
        children: t ? s : /* @__PURE__ */ g(y, { children: [
          o ? /* @__PURE__ */ e("span", { className: "slr-spinner", "aria-hidden": "true" }) : null,
          s
        ] })
      }
    );
  }
);
D.displayName = "Button";
export {
  D as Button,
  B as buttonVariants
};
//# sourceMappingURL=button.js.map
