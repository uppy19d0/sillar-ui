import { jsx as b, jsxs as D, Fragment as P } from "react/jsx-runtime";
import * as d from "react";
import { Slot as w } from "./slot.js";
import { cva as E } from "class-variance-authority";
import { cn as K } from "./utils.js";
import { LoadingIndicator as S } from "./loading-indicator.js";
const z = E("slr-button", {
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
});
function u(t) {
  t.type !== "touchstart" && t.preventDefault(), t.stopPropagation();
}
function f(t) {
  return (o) => {
    o.key === "Enter" || o.key === " " || o.key === "Spacebar" ? u(o) : typeof t == "function" && t(o);
  };
}
function m(t) {
  const o = {};
  for (const n of ["onClick", "onAuxClick", "onDoubleClick", "onPointerDown", "onPointerUp", "onMouseDown", "onMouseUp", "onTouchStart", "onTouchEnd"])
    o[n] = u, o[`${n}Capture`] = u;
  for (const n of ["onKeyDown", "onKeyUp", "onKeyPress"])
    o[n] = f(t[n]), o[`${n}Capture`] = f(t[`${n}Capture`]);
  return o;
}
function A(t, o) {
  const n = {
    ...m(t.props),
    "aria-disabled": !0,
    tabIndex: -1
  };
  return o && (n["aria-busy"] = !0, n["data-loading"] = !0), (typeof t.type != "string" || ["button", "input", "select", "textarea", "fieldset", "optgroup", "option"].includes(t.type)) && (n.disabled = !0), d.cloneElement(t, n);
}
const I = d.forwardRef(
  ({ className: t, variant: o, size: n, asChild: e = !1, type: p, loading: a = !1, disabled: y, children: s, onClick: l, tabIndex: g, ...i }, v) => {
    const k = e ? w : "button", r = y || a, x = (c) => {
      if (r) {
        u(c);
        return;
      }
      l == null || l(c);
    };
    return /* @__PURE__ */ b(
      k,
      {
        ...i,
        ...e && r ? m(i) : {},
        ref: v,
        "data-slot": "button",
        "data-loading": a || void 0,
        className: K(z({ variant: o, size: n }), t),
        type: e ? void 0 : p ?? "button",
        disabled: e ? void 0 : r,
        "aria-busy": a || i["aria-busy"],
        "aria-disabled": r && (e || i["aria-disabled"] !== void 0) ? !0 : i["aria-disabled"],
        tabIndex: e && r ? -1 : g,
        onClick: x,
        children: e ? r && d.isValidElement(s) ? A(s, a) : s : /* @__PURE__ */ D(P, { children: [
          a ? /* @__PURE__ */ b(S, { decorative: !0, size: "sm" }) : null,
          s
        ] })
      }
    );
  }
);
I.displayName = "Button";
export {
  I as Button,
  z as buttonVariants
};
//# sourceMappingURL=button.js.map
