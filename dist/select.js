import { jsxs as o, jsx as e } from "react/jsx-runtime";
import * as m from "react";
import { cn as s } from "./utils.js";
const i = m.forwardRef(
  ({ className: a, wrapperClassName: l, children: r, ...t }, c) => /* @__PURE__ */ o("span", { className: s("slr-select-wrap", l), children: [
    /* @__PURE__ */ e("select", { ref: c, "data-slot": "select", className: s("slr-field slr-select", a), ...t, children: r }),
    /* @__PURE__ */ e("span", { className: "slr-select-chevron", "aria-hidden": "true" })
  ] })
);
i.displayName = "Select";
export {
  i as Select
};
//# sourceMappingURL=select.js.map
