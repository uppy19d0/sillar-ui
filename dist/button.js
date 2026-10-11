import { jsx as a, jsxs as g, Fragment as y } from "react/jsx-runtime";
import * as x from "react";
import { Slot as z } from "./slot.js";
import { cva as j } from "class-variance-authority";
import { cn as B } from "./utils.js";
import { LoadingIndicator as D } from "./loading-indicator.js";
const I = j("slr-button", {
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
}), L = x.forwardRef(
  ({ className: u, variant: i, size: l, asChild: t = !1, type: d, loading: o = !1, disabled: b, children: s, onClick: n, tabIndex: m, ...c }, f) => {
    const v = t ? z : "button", r = b || o, p = (e) => {
      if (r) {
        e.preventDefault();
        return;
      }
      n == null || n(e);
    };
    return /* @__PURE__ */ a(
      v,
      {
        ref: f,
        "data-slot": "button",
        "data-loading": o || void 0,
        className: B(I({ variant: i, size: l }), u),
        type: t ? void 0 : d ?? "button",
        disabled: t ? void 0 : r,
        "aria-busy": o || void 0,
        "aria-disabled": t && r ? !0 : void 0,
        tabIndex: t && r ? -1 : m,
        onClick: p,
        ...c,
        children: t ? s : /* @__PURE__ */ g(y, { children: [
          o ? /* @__PURE__ */ a(D, { decorative: !0, size: "sm" }) : null,
          s
        ] })
      }
    );
  }
);
L.displayName = "Button";
export {
  L as Button,
  I as buttonVariants
};
//# sourceMappingURL=button.js.map
