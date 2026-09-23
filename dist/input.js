import { jsx as a } from "react/jsx-runtime";
import * as s from "react";
import { cn as i } from "./utils.js";
const m = s.forwardRef(
  ({ className: t, type: r, ...o }, p) => /* @__PURE__ */ a(
    "input",
    {
      ref: p,
      type: r,
      "data-slot": "input",
      className: i("slr-field slr-input", t),
      ...o
    }
  )
);
m.displayName = "Input";
export {
  m as Input
};
//# sourceMappingURL=input.js.map
