import { jsx as e, jsxs as m, Fragment as x } from "react/jsx-runtime";
import { Slot as p } from "@radix-ui/react-slot";
import { clsx as R } from "clsx";
import { twMerge as S } from "tailwind-merge";
import { cva as u } from "class-variance-authority";
import * as o from "react";
import * as n from "@radix-ui/react-dialog";
function r(...a) {
  return S(R(a));
}
function J({ asChild: a = !1, className: t, ...l }) {
  return /* @__PURE__ */ e(a ? p : "span", { className: r("slr-visually-hidden", t), ...l });
}
function K({ className: a, ...t }) {
  return /* @__PURE__ */ e("a", { className: r("slr-skip-link", a), ...t });
}
const T = u("slr-badge", {
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
function Q({ className: a, variant: t, asChild: l = !1, ...s }) {
  return /* @__PURE__ */ e(
    l ? p : "span",
    {
      "data-slot": "badge",
      className: r(T({ variant: t }), a),
      ...s
    }
  );
}
const V = u("slr-button", {
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
}), N = o.forwardRef(
  ({ className: a, variant: t, size: l, asChild: s = !1, type: i, loading: c = !1, disabled: _, children: g, onClick: f, tabIndex: D, ...y }, h) => {
    const C = s ? p : "button", d = _ || c, w = (v) => {
      if (d) {
        v.preventDefault();
        return;
      }
      f == null || f(v);
    };
    return /* @__PURE__ */ e(
      C,
      {
        ref: h,
        "data-slot": "button",
        "data-loading": c || void 0,
        className: r(V({ variant: t, size: l }), a),
        type: s ? void 0 : i ?? "button",
        disabled: s ? void 0 : d,
        "aria-busy": c || void 0,
        "aria-disabled": s && d ? !0 : void 0,
        tabIndex: s && d ? -1 : D,
        onClick: w,
        ...y,
        children: s ? g : /* @__PURE__ */ m(x, { children: [
          c ? /* @__PURE__ */ e("span", { className: "slr-spinner", "aria-hidden": "true" }) : null,
          g
        ] })
      }
    );
  }
);
N.displayName = "Button";
const F = u("slr-callout", {
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
function U({ className: a, variant: t, ...l }) {
  return /* @__PURE__ */ e(
    "div",
    {
      "data-slot": "callout",
      role: t === "danger" ? "alert" : void 0,
      className: r(F({ variant: t }), a),
      ...l
    }
  );
}
function W({ className: a, ...t }) {
  return /* @__PURE__ */ e("span", { "data-slot": "callout-icon", className: r("slr-callout__icon", a), ...t });
}
function X({ className: a, ...t }) {
  return /* @__PURE__ */ e("h3", { "data-slot": "callout-title", className: r("slr-callout__title", a), ...t });
}
function Y({ className: a, ...t }) {
  return /* @__PURE__ */ e("div", { "data-slot": "callout-description", className: r("slr-callout__description", a), ...t });
}
const I = u("slr-card", {
  variants: {
    variant: {
      default: "slr-card--default",
      elevated: "slr-card--elevated",
      subtle: "slr-card--subtle",
      outline: "slr-card--outline"
    }
  },
  defaultVariants: { variant: "default" }
});
function Z({ className: a, variant: t, ...l }) {
  return /* @__PURE__ */ e("div", { "data-slot": "card", className: r(I({ variant: t }), a), ...l });
}
function $({ className: a, ...t }) {
  return /* @__PURE__ */ e("div", { "data-slot": "card-header", className: r("slr-card__header", a), ...t });
}
function aa({ className: a, ...t }) {
  return /* @__PURE__ */ e("h3", { "data-slot": "card-title", className: r("slr-card__title", a), ...t });
}
function ta({ className: a, ...t }) {
  return /* @__PURE__ */ e("p", { "data-slot": "card-description", className: r("slr-card__description", a), ...t });
}
function ea({ className: a, ...t }) {
  return /* @__PURE__ */ e("div", { "data-slot": "card-action", className: r("slr-card__action", a), ...t });
}
function ra({ className: a, ...t }) {
  return /* @__PURE__ */ e("div", { "data-slot": "card-content", className: r("slr-card__content", a), ...t });
}
function la({ className: a, ...t }) {
  return /* @__PURE__ */ e("div", { "data-slot": "card-footer", className: r("slr-card__footer", a), ...t });
}
const sa = n.Root, oa = n.Trigger, z = n.Portal, na = n.Close, b = o.forwardRef(({ className: a, ...t }, l) => /* @__PURE__ */ e(
  n.Overlay,
  {
    ref: l,
    "data-slot": "dialog-overlay",
    className: r("slr-dialog__overlay", a),
    ...t
  }
));
b.displayName = "DialogOverlay";
const B = o.forwardRef(({ className: a, overlayClassName: t, children: l, ...s }, i) => /* @__PURE__ */ m(z, { children: [
  /* @__PURE__ */ e(b, { className: t }),
  /* @__PURE__ */ e(
    n.Content,
    {
      ref: i,
      "data-slot": "dialog-content",
      className: r("slr-dialog__content", a),
      ...s,
      children: l
    }
  )
] }));
B.displayName = "DialogContent";
const ia = ({ className: a, ...t }) => /* @__PURE__ */ e("div", { "data-slot": "dialog-header", className: r("slr-dialog__header", a), ...t }), ca = ({ className: a, ...t }) => /* @__PURE__ */ e("div", { "data-slot": "dialog-footer", className: r("slr-dialog__footer", a), ...t }), k = o.forwardRef(({ className: a, ...t }, l) => /* @__PURE__ */ e(n.Title, { ref: l, className: r("slr-dialog__title", a), ...t }));
k.displayName = "DialogTitle";
const H = o.forwardRef(({ className: a, ...t }, l) => /* @__PURE__ */ e(n.Description, { ref: l, className: r("slr-dialog__description", a), ...t }));
H.displayName = "DialogDescription";
function da({ className: a, invalid: t = !1, ...l }) {
  return /* @__PURE__ */ e(
    "div",
    {
      "data-slot": "field",
      "data-invalid": t || void 0,
      className: r("slr-field-group", a),
      ...l
    }
  );
}
function ua({ className: a, required: t = !1, children: l, ...s }) {
  return /* @__PURE__ */ m("label", { "data-slot": "field-label", className: r("slr-field-label", a), ...s, children: [
    l,
    t ? /* @__PURE__ */ e("span", { className: "slr-field-required", "aria-hidden": "true", children: "*" }) : null
  ] });
}
function fa({ className: a, ...t }) {
  return /* @__PURE__ */ e("p", { "data-slot": "field-description", className: r("slr-field-description", a), ...t });
}
function ma({ className: a, ...t }) {
  return /* @__PURE__ */ e("p", { "data-slot": "field-error", role: "alert", className: r("slr-field-error", a), ...t });
}
const L = {
  sm: "iconSm",
  default: "icon",
  lg: "iconLg"
}, O = o.forwardRef(
  ({ label: a, tooltip: t, size: l = "default", children: s, ...i }, c) => /* @__PURE__ */ e(
    N,
    {
      ref: c,
      size: L[l],
      "aria-label": a,
      title: t,
      ...i,
      children: s
    }
  )
);
O.displayName = "IconButton";
const P = o.forwardRef(
  ({ className: a, type: t, ...l }, s) => /* @__PURE__ */ e(
    "input",
    {
      ref: s,
      type: t,
      "data-slot": "input",
      className: r("slr-field slr-input", a),
      ...l
    }
  )
);
P.displayName = "Input";
function pa({ className: a, containerClassName: t, children: l, ...s }) {
  return /* @__PURE__ */ e("section", { className: r("slr-section", a), ...s, children: /* @__PURE__ */ e("div", { className: r("slr-container", t), children: l }) });
}
function ga({ className: a, ...t }) {
  return /* @__PURE__ */ e("header", { className: r("slr-section-header", a), ...t });
}
function va({ className: a, ...t }) {
  return /* @__PURE__ */ e("span", { className: r("slr-eyebrow", a), ...t });
}
function Na({ className: a, ...t }) {
  return /* @__PURE__ */ e("h2", { className: r("slr-section-title", a), ...t });
}
function ba({ className: a, ...t }) {
  return /* @__PURE__ */ e("p", { className: r("slr-section-description", a), ...t });
}
function _a({
  className: a,
  orientation: t = "horizontal",
  decorative: l = !0,
  ...s
}) {
  return /* @__PURE__ */ e(
    "div",
    {
      "data-slot": "separator",
      "data-orientation": t,
      role: l ? "none" : "separator",
      "aria-orientation": l ? void 0 : t,
      className: r("slr-separator", a),
      ...s
    }
  );
}
const j = o.forwardRef(
  ({ className: a, ...t }, l) => /* @__PURE__ */ e(
    "textarea",
    {
      ref: l,
      "data-slot": "textarea",
      className: r("slr-field slr-textarea", a),
      ...t
    }
  )
);
j.displayName = "Textarea";
export {
  Q as Badge,
  N as Button,
  U as Callout,
  Y as CalloutDescription,
  W as CalloutIcon,
  X as CalloutTitle,
  Z as Card,
  ea as CardAction,
  ra as CardContent,
  ta as CardDescription,
  la as CardFooter,
  $ as CardHeader,
  aa as CardTitle,
  sa as Dialog,
  na as DialogClose,
  B as DialogContent,
  H as DialogDescription,
  ca as DialogFooter,
  ia as DialogHeader,
  b as DialogOverlay,
  z as DialogPortal,
  k as DialogTitle,
  oa as DialogTrigger,
  da as Field,
  fa as FieldDescription,
  ma as FieldError,
  ua as FieldLabel,
  O as IconButton,
  P as Input,
  pa as Section,
  ba as SectionDescription,
  va as SectionEyebrow,
  ga as SectionHeader,
  Na as SectionTitle,
  _a as Separator,
  K as SkipLink,
  j as Textarea,
  J as VisuallyHidden,
  T as badgeVariants,
  V as buttonVariants,
  F as calloutVariants,
  I as cardVariants,
  r as cn
};
//# sourceMappingURL=index.js.map
