import { jsx as s } from "react/jsx-runtime";
import * as t from "react";
import { Slot as o } from "./slot.js";
import { cn as d } from "./utils.js";
const c = t.forwardRef(
  ({ className: r, "aria-label": a = "Breadcrumb", ...e }, m) => /* @__PURE__ */ s("nav", { ...e, ref: m, "aria-label": a, "data-slot": "breadcrumb", className: d("slr-breadcrumb", r) })
);
c.displayName = "Breadcrumb";
const l = t.forwardRef(
  ({ className: r, ...a }, e) => /* @__PURE__ */ s("ol", { ...a, ref: e, "data-slot": "breadcrumb-list", className: d("slr-breadcrumb__list", r) })
);
l.displayName = "BreadcrumbList";
const b = t.forwardRef(
  ({ className: r, ...a }, e) => /* @__PURE__ */ s("li", { ...a, ref: e, "data-slot": "breadcrumb-item", className: d("slr-breadcrumb__item", r) })
);
b.displayName = "BreadcrumbItem";
const i = t.forwardRef(
  ({ asChild: r = !1, className: a, ...e }, m) => /* @__PURE__ */ s(r ? o : "a", { ...e, ref: m, "data-slot": "breadcrumb-link", className: d("slr-breadcrumb__link", a) })
);
i.displayName = "BreadcrumbLink";
const n = t.forwardRef(
  ({ className: r, ...a }, e) => /* @__PURE__ */ s("span", { ...a, ref: e, "aria-current": "page", "data-slot": "breadcrumb-page", className: d("slr-breadcrumb__page", r) })
);
n.displayName = "BreadcrumbPage";
const u = t.forwardRef(
  ({ className: r, children: a, ...e }, m) => /* @__PURE__ */ s("li", { ...e, ref: m, role: "presentation", "aria-hidden": "true", "data-slot": "breadcrumb-separator", className: d("slr-breadcrumb__separator", r), children: a ?? /* @__PURE__ */ s("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", focusable: "false", children: /* @__PURE__ */ s("path", { d: "m9 18 6-6-6-6" }) }) })
);
u.displayName = "BreadcrumbSeparator";
export {
  c as Breadcrumb,
  b as BreadcrumbItem,
  i as BreadcrumbLink,
  l as BreadcrumbList,
  n as BreadcrumbPage,
  u as BreadcrumbSeparator
};
//# sourceMappingURL=breadcrumb.js.map
