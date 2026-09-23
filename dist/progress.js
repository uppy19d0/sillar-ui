import { jsx as l } from "react/jsx-runtime";
import * as n from "react";
import { cn as i } from "./utils.js";
const c = n.forwardRef(({ value: e = null, max: a = 100, className: s, ...d }, m) => {
  const t = Number.isFinite(a) && a > 0 ? a : 100, r = e === null ? null : Math.max(0, Math.min(e, t)), o = r === null ? null : r / t * 100;
  return /* @__PURE__ */ l("div", { ...d, ref: m, role: "progressbar", "aria-valuemin": 0, "aria-valuemax": t, "aria-valuenow": r ?? void 0, "data-slot": "progress", "data-state": r === null ? "indeterminate" : "complete", className: i("slr-progress", s), children: /* @__PURE__ */ l("div", { "data-slot": "progress-indicator", className: "slr-progress__indicator", style: { transform: o === null ? void 0 : `translateX(-${100 - o}%)` } }) });
});
c.displayName = "Progress";
const p = n.forwardRef(({ className: e, ...a }, s) => /* @__PURE__ */ l("div", { ...a, ref: s, "aria-hidden": "true", "data-slot": "skeleton", className: i("slr-skeleton", e) }));
p.displayName = "Skeleton";
export {
  c as Progress,
  p as Skeleton
};
//# sourceMappingURL=progress.js.map
