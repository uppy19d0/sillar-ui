import { jsx as l, jsxs as s } from "react/jsx-runtime";
import { Badge as N } from "./badge.js";
import { cn as m } from "./utils.js";
function w({
  className: d,
  eyebrow: a,
  title: t,
  value: r,
  description: e,
  badge: u,
  badgeVariant: i = "secondary",
  tone: o = "brand",
  items: n,
  actions: c,
  children: _,
  ...h
}) {
  return /* @__PURE__ */ s(
    "section",
    {
      "data-slot": "result-summary",
      "data-tone": o,
      className: m("slr-result-summary", d),
      ...h,
      children: [
        /* @__PURE__ */ s("div", { className: "slr-result-summary__header", children: [
          /* @__PURE__ */ s("div", { className: "slr-result-summary__intro", children: [
            a ? /* @__PURE__ */ l("p", { className: "slr-result-summary__eyebrow", children: a }) : null,
            /* @__PURE__ */ s("div", { className: "slr-result-summary__title-row", children: [
              /* @__PURE__ */ l("h3", { className: "slr-result-summary__title", children: t }),
              u ? /* @__PURE__ */ l(N, { variant: i, children: u }) : null
            ] }),
            /* @__PURE__ */ l("p", { className: "slr-result-summary__value", children: r }),
            e ? /* @__PURE__ */ l("p", { className: "slr-result-summary__description", children: e }) : null
          ] }),
          c ? /* @__PURE__ */ l("div", { className: "slr-result-summary__actions", children: c }) : null
        ] }),
        n != null && n.length ? /* @__PURE__ */ l(y, { items: n }) : null,
        _
      ]
    }
  );
}
function y({ className: d, items: a, ...t }) {
  return /* @__PURE__ */ l("dl", { "data-slot": "breakdown-list", className: m("slr-breakdown-list", d), ...t, children: a.map((r, e) => /* @__PURE__ */ s(
    "div",
    {
      className: "slr-breakdown-list__item",
      "data-tone": r.tone ?? "neutral",
      children: [
        /* @__PURE__ */ s("dt", { className: "slr-breakdown-list__label", children: [
          r.label,
          r.description ? /* @__PURE__ */ l("span", { children: r.description }) : null
        ] }),
        /* @__PURE__ */ l("dd", { className: "slr-breakdown-list__value", children: r.value })
      ]
    },
    `${String(r.label)}-${e}`
  )) });
}
export {
  y as BreakdownList,
  w as ResultSummary
};
//# sourceMappingURL=result-summary.js.map
