import { jsx as r } from "react/jsx-runtime";
import * as m from "react";
import { Button as c } from "./button.js";
const s = {
  sm: "iconSm",
  default: "icon",
  lg: "iconLg"
}, f = m.forwardRef(
  ({ label: o, tooltip: t, size: a = "default", children: i, ...e }, n) => /* @__PURE__ */ r(
    c,
    {
      ref: n,
      size: s[a],
      "aria-label": o,
      title: t,
      ...e,
      children: i
    }
  )
);
f.displayName = "IconButton";
export {
  f as IconButton
};
//# sourceMappingURL=icon-button.js.map
