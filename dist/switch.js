import { jsx as c } from "react/jsx-runtime";
import * as n from "react";
import { u as p } from "./internal-D9EwPR7x.js";
import { cn as w } from "./utils.js";
const k = n.forwardRef(
  ({ checked: r, defaultChecked: o = !1, onCheckedChange: h, onClick: e, className: d, disabled: a, type: l, ...m }, u) => {
    const [t, f] = p({
      value: r,
      defaultValue: o,
      onChange: h
    });
    return /* @__PURE__ */ c(
      "button",
      {
        ...m,
        ref: u,
        type: l ?? "button",
        role: "switch",
        "aria-checked": t,
        disabled: a,
        "data-slot": "switch",
        "data-state": t ? "checked" : "unchecked",
        className: w("slr-switch", d),
        onClick: (s) => {
          e == null || e(s), !s.defaultPrevented && !a && f((i) => !i);
        },
        children: /* @__PURE__ */ c("span", { className: "slr-switch__thumb", "data-state": t ? "checked" : "unchecked" })
      }
    );
  }
);
k.displayName = "Switch";
export {
  k as Switch
};
//# sourceMappingURL=switch.js.map
