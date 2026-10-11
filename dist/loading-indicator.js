import { jsxs as t, jsx as i } from "react/jsx-runtime";
import * as e from "react";
import { cn as m } from "./utils.js";
const p = e.forwardRef(
  ({ label: s = "Loading…", size: r = "md", showLabel: d = !0, decorative: a = !1, className: o, ...n }, l) => /* @__PURE__ */ t(
    "span",
    {
      ...n,
      ref: l,
      "data-slot": "loading-indicator",
      "data-size": r,
      className: m("slr-loading-indicator", o),
      role: a ? void 0 : "status",
      "aria-live": a ? void 0 : "polite",
      "aria-atomic": a ? void 0 : !0,
      "aria-hidden": a ? !0 : void 0,
      children: [
        /* @__PURE__ */ i("span", { className: "slr-spinner", "aria-hidden": "true" }),
        a ? null : /* @__PURE__ */ i("span", { className: d ? void 0 : "slr-visually-hidden", children: s })
      ]
    }
  )
);
p.displayName = "LoadingIndicator";
export {
  p as LoadingIndicator
};
//# sourceMappingURL=loading-indicator.js.map
