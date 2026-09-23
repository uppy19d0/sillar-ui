import { jsx as t } from "react/jsx-runtime";
import { cva as c } from "class-variance-authority";
import { cn as d } from "./utils.js";
const n = c("slr-card", {
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
function i({ className: a, variant: r, ...e }) {
  return /* @__PURE__ */ t("div", { "data-slot": "card", className: d(n({ variant: r }), a), ...e });
}
function u({ className: a, ...r }) {
  return /* @__PURE__ */ t("div", { "data-slot": "card-header", className: d("slr-card__header", a), ...r });
}
function f({ className: a, ...r }) {
  return /* @__PURE__ */ t("h3", { "data-slot": "card-title", className: d("slr-card__title", a), ...r });
}
function m({ className: a, ...r }) {
  return /* @__PURE__ */ t("p", { "data-slot": "card-description", className: d("slr-card__description", a), ...r });
}
function _({ className: a, ...r }) {
  return /* @__PURE__ */ t("div", { "data-slot": "card-action", className: d("slr-card__action", a), ...r });
}
function v({ className: a, ...r }) {
  return /* @__PURE__ */ t("div", { "data-slot": "card-content", className: d("slr-card__content", a), ...r });
}
function p({ className: a, ...r }) {
  return /* @__PURE__ */ t("div", { "data-slot": "card-footer", className: d("slr-card__footer", a), ...r });
}
export {
  i as Card,
  _ as CardAction,
  v as CardContent,
  m as CardDescription,
  p as CardFooter,
  u as CardHeader,
  f as CardTitle,
  n as cardVariants
};
//# sourceMappingURL=card.js.map
