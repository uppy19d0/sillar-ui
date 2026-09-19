import { jsx as r } from "react/jsx-runtime";
import { Slot as i } from "@radix-ui/react-slot";
import { cva as c } from "class-variance-authority";
import { clsx as f } from "clsx";
import { twMerge as m } from "tailwind-merge";
import * as o from "react";
function e(...t) {
  return m(f(t));
}
const p = c("slr-badge", {
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
function w({ className: t, variant: a, asChild: n = !1, ...s }) {
  return /* @__PURE__ */ r(
    n ? i : "span",
    {
      "data-slot": "badge",
      className: e(p({ variant: a }), t),
      ...s
    }
  );
}
const b = c("slr-button", {
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
      icon: "slr-button--icon"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
}), N = o.forwardRef(
  ({ className: t, variant: a, size: n, asChild: s = !1, type: l, ...d }, u) => /* @__PURE__ */ r(
    s ? i : "button",
    {
      ref: u,
      "data-slot": "button",
      className: e(b({ variant: a, size: n }), t),
      type: s ? void 0 : l ?? "button",
      ...d
    }
  )
);
N.displayName = "Button";
function R({ className: t, ...a }) {
  return /* @__PURE__ */ r("div", { "data-slot": "card", className: e("slr-card", t), ...a });
}
function T({ className: t, ...a }) {
  return /* @__PURE__ */ r("div", { "data-slot": "card-header", className: e("slr-card__header", t), ...a });
}
function V({ className: t, ...a }) {
  return /* @__PURE__ */ r("h3", { "data-slot": "card-title", className: e("slr-card__title", t), ...a });
}
function z({ className: t, ...a }) {
  return /* @__PURE__ */ r("p", { "data-slot": "card-description", className: e("slr-card__description", t), ...a });
}
function B({ className: t, ...a }) {
  return /* @__PURE__ */ r("div", { "data-slot": "card-action", className: e("slr-card__action", t), ...a });
}
function k({ className: t, ...a }) {
  return /* @__PURE__ */ r("div", { "data-slot": "card-content", className: e("slr-card__content", t), ...a });
}
function D({ className: t, ...a }) {
  return /* @__PURE__ */ r("div", { "data-slot": "card-footer", className: e("slr-card__footer", t), ...a });
}
const v = o.forwardRef(
  ({ className: t, type: a, ...n }, s) => /* @__PURE__ */ r(
    "input",
    {
      ref: s,
      type: a,
      "data-slot": "input",
      className: e("slr-field slr-input", t),
      ...n
    }
  )
);
v.displayName = "Input";
function H({ className: t, containerClassName: a, children: n, ...s }) {
  return /* @__PURE__ */ r("section", { className: e("slr-section", t), ...s, children: /* @__PURE__ */ r("div", { className: e("slr-container", a), children: n }) });
}
function I({ className: t, ...a }) {
  return /* @__PURE__ */ r("header", { className: e("slr-section-header", t), ...a });
}
function j({ className: t, ...a }) {
  return /* @__PURE__ */ r("span", { className: e("slr-eyebrow", t), ...a });
}
function A({ className: t, ...a }) {
  return /* @__PURE__ */ r("h2", { className: e("slr-section-title", t), ...a });
}
function E({ className: t, ...a }) {
  return /* @__PURE__ */ r("p", { className: e("slr-section-description", t), ...a });
}
function F({
  className: t,
  orientation: a = "horizontal",
  decorative: n = !0,
  ...s
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-slot": "separator",
      "data-orientation": a,
      role: n ? "none" : "separator",
      "aria-orientation": n ? void 0 : a,
      className: e("slr-separator", t),
      ...s
    }
  );
}
const g = o.forwardRef(
  ({ className: t, ...a }, n) => /* @__PURE__ */ r(
    "textarea",
    {
      ref: n,
      "data-slot": "textarea",
      className: e("slr-field slr-textarea", t),
      ...a
    }
  )
);
g.displayName = "Textarea";
export {
  w as Badge,
  N as Button,
  R as Card,
  B as CardAction,
  k as CardContent,
  z as CardDescription,
  D as CardFooter,
  T as CardHeader,
  V as CardTitle,
  v as Input,
  H as Section,
  E as SectionDescription,
  j as SectionEyebrow,
  I as SectionHeader,
  A as SectionTitle,
  F as Separator,
  g as Textarea,
  p as badgeVariants,
  b as buttonVariants,
  e as cn
};
//# sourceMappingURL=index.js.map
