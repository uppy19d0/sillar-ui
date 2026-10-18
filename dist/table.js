import { jsx as t, jsxs as m } from "react/jsx-runtime";
import * as s from "react";
import { cn as o } from "./utils.js";
const p = s.forwardRef(
  ({ label: a, "aria-labelledby": e, density: l = "comfortable", striped: d = !1, stickyHeader: r = !1, className: n, containerClassName: b, ...i }, c) => {
    const f = !!(a || e);
    return /* @__PURE__ */ t(
      "div",
      {
        "data-slot": "table-container",
        className: o("slr-table__container", b),
        ...f ? { role: "region", tabIndex: 0, "aria-label": a, "aria-labelledby": a ? void 0 : e } : {},
        children: /* @__PURE__ */ t(
          "table",
          {
            ...i,
            ref: c,
            "data-slot": "table",
            "data-density": l,
            "data-striped": d ? "" : void 0,
            "data-sticky-header": r ? "" : void 0,
            className: o("slr-table", n)
          }
        )
      }
    );
  }
);
p.displayName = "Table";
const _ = s.forwardRef(
  ({ className: a, ...e }, l) => /* @__PURE__ */ t("caption", { ...e, ref: l, "data-slot": "table-caption", className: o("slr-table__caption", a) })
);
_.displayName = "TableCaption";
const N = s.forwardRef(
  ({ className: a, ...e }, l) => /* @__PURE__ */ t("thead", { ...e, ref: l, "data-slot": "table-header", className: o("slr-table__header", a) })
);
N.displayName = "TableHeader";
const y = s.forwardRef(
  ({ className: a, ...e }, l) => /* @__PURE__ */ t("tbody", { ...e, ref: l, "data-slot": "table-body", className: o("slr-table__body", a) })
);
y.displayName = "TableBody";
const T = s.forwardRef(
  ({ className: a, ...e }, l) => /* @__PURE__ */ t("tfoot", { ...e, ref: l, "data-slot": "table-footer", className: o("slr-table__footer", a) })
);
T.displayName = "TableFooter";
const h = s.forwardRef(
  ({ selected: a = !1, className: e, ...l }, d) => /* @__PURE__ */ t("tr", { ...l, ref: d, "data-slot": "table-row", "data-state": a ? "selected" : void 0, "aria-selected": a || void 0, className: o("slr-table__row", e) })
);
h.displayName = "TableRow";
const w = { ascending: "↑", descending: "↓", none: "↕" }, R = s.forwardRef(
  ({ sort: a, onSort: e, align: l = "start", scope: d = "col", className: r, children: n, ...b }, i) => /* @__PURE__ */ t(
    "th",
    {
      ...b,
      ref: i,
      scope: d,
      "aria-sort": a,
      "data-slot": "table-head",
      "data-align": l,
      className: o("slr-table__head", r),
      children: e ? /* @__PURE__ */ m("button", { type: "button", className: "slr-table__sort", onClick: e, children: [
        n,
        /* @__PURE__ */ t("span", { "aria-hidden": "true", className: "slr-table__sort-icon", "data-sort": a ?? "none", children: w[a ?? "none"] })
      ] }) : n
    }
  )
);
R.displayName = "TableHead";
const v = s.forwardRef(
  ({ align: a, numeric: e = !1, className: l, ...d }, r) => /* @__PURE__ */ t(
    "td",
    {
      ...d,
      ref: r,
      "data-slot": "table-cell",
      "data-align": a ?? (e ? "end" : "start"),
      "data-numeric": e ? "" : void 0,
      className: o("slr-table__cell", l)
    }
  )
);
v.displayName = "TableCell";
export {
  p as Table,
  y as TableBody,
  _ as TableCaption,
  v as TableCell,
  T as TableFooter,
  R as TableHead,
  N as TableHeader,
  h as TableRow
};
//# sourceMappingURL=table.js.map
