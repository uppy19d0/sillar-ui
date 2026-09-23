import { jsx as e } from "react/jsx-runtime";
import { cn as n } from "./utils.js";
function p({
  className: o,
  orientation: r = "horizontal",
  decorative: a = !0,
  ...t
}) {
  return /* @__PURE__ */ e(
    "div",
    {
      "data-slot": "separator",
      "data-orientation": r,
      role: a ? "none" : "separator",
      "aria-orientation": a ? void 0 : r,
      className: n("slr-separator", o),
      ...t
    }
  );
}
export {
  p as Separator
};
//# sourceMappingURL=separator.js.map
