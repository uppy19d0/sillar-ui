import { jsxs as a, jsx as l } from "react/jsx-runtime";
import { cn as n } from "./utils.js";
function c({
  className: s,
  columns: r = 2,
  minColumnWidth: e = "16rem",
  style: d,
  ...i
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "form-grid",
      "data-columns": r,
      className: n("slr-form-grid", s),
      style: {
        "--slr-form-grid-columns": r,
        "--slr-form-grid-min": e,
        ...d
      },
      ...i
    }
  );
}
function f({
  className: s,
  legend: r,
  description: e,
  actions: d,
  children: i,
  ...o
}) {
  return /* @__PURE__ */ a("fieldset", { "data-slot": "field-group-panel", className: n("slr-field-group-panel", s), ...o, children: [
    /* @__PURE__ */ a("div", { className: "slr-field-group-panel__header", children: [
      /* @__PURE__ */ a("div", { children: [
        /* @__PURE__ */ l("legend", { className: "slr-field-group-panel__legend", children: r }),
        e ? /* @__PURE__ */ l("p", { className: "slr-field-group-panel__description", children: e }) : null
      ] }),
      d ? /* @__PURE__ */ l("div", { className: "slr-field-group-panel__actions", children: d }) : null
    ] }),
    /* @__PURE__ */ l("div", { className: "slr-field-group-panel__content", children: i })
  ] });
}
export {
  f as FieldGroup,
  c as FormGrid
};
//# sourceMappingURL=form-grid.js.map
