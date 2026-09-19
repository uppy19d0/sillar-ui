import { jsx as e, jsxs as u } from "react/jsx-runtime";
import { Slot as f } from "@radix-ui/react-slot";
import { clsx as D } from "clsx";
import { twMerge as C } from "tailwind-merge";
import { cva as d } from "class-variance-authority";
import * as o from "react";
import * as n from "@radix-ui/react-dialog";
function l(...a) {
  return C(D(a));
}
function E({ asChild: a = !1, className: t, ...r }) {
  return /* @__PURE__ */ e(a ? f : "span", { className: l("slr-visually-hidden", t), ...r });
}
function M({ className: a, ...t }) {
  return /* @__PURE__ */ e("a", { className: l("slr-skip-link", a), ...t });
}
const h = d("slr-badge", {
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
function q({ className: a, variant: t, asChild: r = !1, ...s }) {
  return /* @__PURE__ */ e(
    r ? f : "span",
    {
      "data-slot": "badge",
      className: l(h({ variant: t }), a),
      ...s
    }
  );
}
const w = d("slr-button", {
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
}), p = o.forwardRef(
  ({ className: a, variant: t, size: r, asChild: s = !1, type: i, loading: c = !1, disabled: v, children: N, ...b }, _) => {
    const y = s ? f : "button", m = v || c;
    return /* @__PURE__ */ u(
      y,
      {
        ref: _,
        "data-slot": "button",
        "data-loading": c || void 0,
        className: l(w({ variant: t, size: r }), a),
        type: s ? void 0 : i ?? "button",
        disabled: s ? void 0 : m,
        "aria-busy": c || void 0,
        "aria-disabled": s && m ? !0 : void 0,
        ...b,
        children: [
          c ? /* @__PURE__ */ e("span", { className: "slr-spinner", "aria-hidden": "true" }) : null,
          N
        ]
      }
    );
  }
);
p.displayName = "Button";
const R = d("slr-callout", {
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
function A({ className: a, variant: t, ...r }) {
  return /* @__PURE__ */ e(
    "div",
    {
      "data-slot": "callout",
      role: t === "danger" ? "alert" : void 0,
      className: l(R({ variant: t }), a),
      ...r
    }
  );
}
function G({ className: a, ...t }) {
  return /* @__PURE__ */ e("span", { "data-slot": "callout-icon", className: l("slr-callout__icon", a), ...t });
}
function J({ className: a, ...t }) {
  return /* @__PURE__ */ e("h3", { "data-slot": "callout-title", className: l("slr-callout__title", a), ...t });
}
function K({ className: a, ...t }) {
  return /* @__PURE__ */ e("div", { "data-slot": "callout-description", className: l("slr-callout__description", a), ...t });
}
const S = d("slr-card", {
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
function Q({ className: a, variant: t, ...r }) {
  return /* @__PURE__ */ e("div", { "data-slot": "card", className: l(S({ variant: t }), a), ...r });
}
function U({ className: a, ...t }) {
  return /* @__PURE__ */ e("div", { "data-slot": "card-header", className: l("slr-card__header", a), ...t });
}
function W({ className: a, ...t }) {
  return /* @__PURE__ */ e("h3", { "data-slot": "card-title", className: l("slr-card__title", a), ...t });
}
function X({ className: a, ...t }) {
  return /* @__PURE__ */ e("p", { "data-slot": "card-description", className: l("slr-card__description", a), ...t });
}
function Y({ className: a, ...t }) {
  return /* @__PURE__ */ e("div", { "data-slot": "card-action", className: l("slr-card__action", a), ...t });
}
function Z({ className: a, ...t }) {
  return /* @__PURE__ */ e("div", { "data-slot": "card-content", className: l("slr-card__content", a), ...t });
}
function $({ className: a, ...t }) {
  return /* @__PURE__ */ e("div", { "data-slot": "card-footer", className: l("slr-card__footer", a), ...t });
}
const aa = n.Root, ta = n.Trigger, T = n.Portal, ea = n.Close, g = o.forwardRef(({ className: a, ...t }, r) => /* @__PURE__ */ e(
  n.Overlay,
  {
    ref: r,
    "data-slot": "dialog-overlay",
    className: l("slr-dialog__overlay", a),
    ...t
  }
));
g.displayName = "DialogOverlay";
const x = o.forwardRef(({ className: a, overlayClassName: t, children: r, ...s }, i) => /* @__PURE__ */ u(T, { children: [
  /* @__PURE__ */ e(g, { className: t }),
  /* @__PURE__ */ e(
    n.Content,
    {
      ref: i,
      "data-slot": "dialog-content",
      className: l("slr-dialog__content", a),
      ...s,
      children: r
    }
  )
] }));
x.displayName = "DialogContent";
const la = ({ className: a, ...t }) => /* @__PURE__ */ e("div", { "data-slot": "dialog-header", className: l("slr-dialog__header", a), ...t }), ra = ({ className: a, ...t }) => /* @__PURE__ */ e("div", { "data-slot": "dialog-footer", className: l("slr-dialog__footer", a), ...t }), V = o.forwardRef(({ className: a, ...t }, r) => /* @__PURE__ */ e(n.Title, { ref: r, className: l("slr-dialog__title", a), ...t }));
V.displayName = "DialogTitle";
const k = o.forwardRef(({ className: a, ...t }, r) => /* @__PURE__ */ e(n.Description, { ref: r, className: l("slr-dialog__description", a), ...t }));
k.displayName = "DialogDescription";
function sa({ className: a, invalid: t = !1, ...r }) {
  return /* @__PURE__ */ e(
    "div",
    {
      "data-slot": "field",
      "data-invalid": t || void 0,
      className: l("slr-field-group", a),
      ...r
    }
  );
}
function oa({ className: a, required: t = !1, children: r, ...s }) {
  return /* @__PURE__ */ u("label", { "data-slot": "field-label", className: l("slr-field-label", a), ...s, children: [
    r,
    t ? /* @__PURE__ */ e("span", { className: "slr-field-required", "aria-hidden": "true", children: "*" }) : null
  ] });
}
function na({ className: a, ...t }) {
  return /* @__PURE__ */ e("p", { "data-slot": "field-description", className: l("slr-field-description", a), ...t });
}
function ia({ className: a, ...t }) {
  return /* @__PURE__ */ e("p", { "data-slot": "field-error", role: "alert", className: l("slr-field-error", a), ...t });
}
const F = {
  sm: "iconSm",
  default: "icon",
  lg: "iconLg"
}, z = o.forwardRef(
  ({ label: a, tooltip: t, size: r = "default", children: s, ...i }, c) => /* @__PURE__ */ e(
    p,
    {
      ref: c,
      size: F[r],
      "aria-label": a,
      title: t,
      ...i,
      children: s
    }
  )
);
z.displayName = "IconButton";
const B = o.forwardRef(
  ({ className: a, type: t, ...r }, s) => /* @__PURE__ */ e(
    "input",
    {
      ref: s,
      type: t,
      "data-slot": "input",
      className: l("slr-field slr-input", a),
      ...r
    }
  )
);
B.displayName = "Input";
function ca({ className: a, containerClassName: t, children: r, ...s }) {
  return /* @__PURE__ */ e("section", { className: l("slr-section", a), ...s, children: /* @__PURE__ */ e("div", { className: l("slr-container", t), children: r }) });
}
function da({ className: a, ...t }) {
  return /* @__PURE__ */ e("header", { className: l("slr-section-header", a), ...t });
}
function ua({ className: a, ...t }) {
  return /* @__PURE__ */ e("span", { className: l("slr-eyebrow", a), ...t });
}
function fa({ className: a, ...t }) {
  return /* @__PURE__ */ e("h2", { className: l("slr-section-title", a), ...t });
}
function ma({ className: a, ...t }) {
  return /* @__PURE__ */ e("p", { className: l("slr-section-description", a), ...t });
}
function pa({
  className: a,
  orientation: t = "horizontal",
  decorative: r = !0,
  ...s
}) {
  return /* @__PURE__ */ e(
    "div",
    {
      "data-slot": "separator",
      "data-orientation": t,
      role: r ? "none" : "separator",
      "aria-orientation": r ? void 0 : t,
      className: l("slr-separator", a),
      ...s
    }
  );
}
const I = o.forwardRef(
  ({ className: a, ...t }, r) => /* @__PURE__ */ e(
    "textarea",
    {
      ref: r,
      "data-slot": "textarea",
      className: l("slr-field slr-textarea", a),
      ...t
    }
  )
);
I.displayName = "Textarea";
export {
  q as Badge,
  p as Button,
  A as Callout,
  K as CalloutDescription,
  G as CalloutIcon,
  J as CalloutTitle,
  Q as Card,
  Y as CardAction,
  Z as CardContent,
  X as CardDescription,
  $ as CardFooter,
  U as CardHeader,
  W as CardTitle,
  aa as Dialog,
  ea as DialogClose,
  x as DialogContent,
  k as DialogDescription,
  ra as DialogFooter,
  la as DialogHeader,
  g as DialogOverlay,
  T as DialogPortal,
  V as DialogTitle,
  ta as DialogTrigger,
  sa as Field,
  na as FieldDescription,
  ia as FieldError,
  oa as FieldLabel,
  z as IconButton,
  B as Input,
  ca as Section,
  ma as SectionDescription,
  ua as SectionEyebrow,
  da as SectionHeader,
  fa as SectionTitle,
  pa as Separator,
  M as SkipLink,
  I as Textarea,
  E as VisuallyHidden,
  h as badgeVariants,
  w as buttonVariants,
  R as calloutVariants,
  S as cardVariants,
  l as cn
};
//# sourceMappingURL=index.js.map
