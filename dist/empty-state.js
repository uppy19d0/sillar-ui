import { jsxs as d, jsx as e } from "react/jsx-runtime";
import { Button as o } from "./button.js";
import { Skeleton as u } from "./progress.js";
import { cn as h } from "./utils.js";
function p({
  className: n,
  icon: r,
  title: t,
  description: s,
  actions: a,
  children: c,
  ...i
}) {
  return /* @__PURE__ */ d("div", { "data-slot": "empty-state", className: h("slr-empty-state", n), ...i, children: [
    r ? /* @__PURE__ */ e("div", { className: "slr-empty-state__icon", "aria-hidden": "true", children: r }) : null,
    /* @__PURE__ */ d("div", { className: "slr-empty-state__body", children: [
      /* @__PURE__ */ e("h3", { className: "slr-empty-state__title", children: t }),
      s ? /* @__PURE__ */ e("p", { className: "slr-empty-state__description", children: s }) : null
    ] }),
    c,
    a != null && a.length ? /* @__PURE__ */ e("div", { className: "slr-empty-state__actions", children: a.map((l, m) => l.href ? /* @__PURE__ */ e(o, { asChild: !0, variant: l.variant ?? "default", children: /* @__PURE__ */ e("a", { href: l.href, children: l.label }) }, `${String(l.label)}-${m}`) : /* @__PURE__ */ e(
      o,
      {
        variant: l.variant ?? (m === 0 ? "default" : "outline"),
        onClick: l.onClick,
        children: l.label
      },
      `${String(l.label)}-${m}`
    )) }) : null
  ] });
}
function v({ actions: n, retryLabel: r = "Try again", onRetry: t, ...s }) {
  return /* @__PURE__ */ e(
    p,
    {
      ...s,
      "data-tone": "danger",
      icon: /* @__PURE__ */ e("span", { children: "!" }),
      actions: [...t ? [{ label: r, onClick: t, variant: "default" }] : [], ...n ?? []]
    }
  );
}
function N({
  className: n,
  title: r = "Loading",
  description: t,
  rows: s = 3,
  ...a
}) {
  return /* @__PURE__ */ d("div", { "data-slot": "loading-state", className: h("slr-loading-state", n), "aria-busy": "true", ...a, children: [
    /* @__PURE__ */ d("div", { className: "slr-loading-state__copy", children: [
      /* @__PURE__ */ e("p", { className: "slr-loading-state__title", children: r }),
      t ? /* @__PURE__ */ e("p", { className: "slr-loading-state__description", children: t }) : null
    ] }),
    /* @__PURE__ */ e("div", { className: "slr-loading-state__skeletons", "aria-hidden": "true", children: Array.from({ length: s }, (c, i) => /* @__PURE__ */ e(u, { style: { width: `${100 - i * 12}%` } }, i)) })
  ] });
}
export {
  p as EmptyState,
  v as ErrorState,
  N as LoadingState
};
//# sourceMappingURL=empty-state.js.map
