import { jsxs as a, jsx as l } from "react/jsx-runtime";
import { Badge as N } from "./badge.js";
import { cn as u } from "./utils.js";
function x({
  className: n,
  eyebrow: c,
  title: s,
  description: r,
  badge: e,
  badgeVariant: t = "secondary",
  actions: i,
  aside: o,
  footer: d,
  width: h = "default",
  children: _,
  ...m
}) {
  return /* @__PURE__ */ a(
    "section",
    {
      "data-slot": "calculator-shell",
      "data-width": h,
      className: u("slr-calculator-shell", n),
      ...m,
      children: [
        /* @__PURE__ */ a("div", { className: "slr-calculator-shell__header", children: [
          /* @__PURE__ */ a("div", { className: "slr-calculator-shell__intro", children: [
            c ? /* @__PURE__ */ l("p", { className: "slr-calculator-shell__eyebrow", children: c }) : null,
            /* @__PURE__ */ a("div", { className: "slr-calculator-shell__title-row", children: [
              /* @__PURE__ */ l("h2", { className: "slr-calculator-shell__title", children: s }),
              e ? /* @__PURE__ */ l(N, { variant: t, children: e }) : null
            ] }),
            r ? /* @__PURE__ */ l("p", { className: "slr-calculator-shell__description", children: r }) : null
          ] }),
          i ? /* @__PURE__ */ l("div", { className: "slr-calculator-shell__actions", children: i }) : null
        ] }),
        /* @__PURE__ */ a("div", { className: "slr-calculator-shell__layout", "data-has-aside": !!o || void 0, children: [
          /* @__PURE__ */ l("div", { className: "slr-calculator-shell__main", children: _ }),
          o ? /* @__PURE__ */ l("aside", { className: "slr-calculator-shell__aside", children: o }) : null
        ] }),
        d ? /* @__PURE__ */ l("div", { className: "slr-calculator-shell__footer", children: d }) : null
      ]
    }
  );
}
function j({
  className: n,
  title: c,
  description: s,
  actions: r,
  children: e,
  ...t
}) {
  return /* @__PURE__ */ a("div", { "data-slot": "calculator-panel", className: u("slr-calculator-panel", n), ...t, children: [
    c || s || r ? /* @__PURE__ */ a("div", { className: "slr-calculator-panel__header", children: [
      /* @__PURE__ */ a("div", { className: "slr-calculator-panel__intro", children: [
        c ? /* @__PURE__ */ l("h3", { className: "slr-calculator-panel__title", children: c }) : null,
        s ? /* @__PURE__ */ l("p", { className: "slr-calculator-panel__description", children: s }) : null
      ] }),
      r ? /* @__PURE__ */ l("div", { className: "slr-calculator-panel__actions", children: r }) : null
    ] }) : null,
    /* @__PURE__ */ l("div", { className: "slr-calculator-panel__content", children: e })
  ] });
}
export {
  j as CalculatorPanel,
  x as CalculatorShell
};
//# sourceMappingURL=calculator-shell.js.map
