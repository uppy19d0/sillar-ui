import { jsx as i } from "react/jsx-runtime";
import { Slot as t } from "./slot.js";
import { cn as r } from "./utils.js";
function p({ asChild: n = !1, className: o, ...s }) {
  return /* @__PURE__ */ i(n ? t : "span", { className: r("slr-visually-hidden", o), ...s });
}
function c({ className: n, ...o }) {
  return /* @__PURE__ */ i("a", { className: r("slr-skip-link", n), ...o });
}
export {
  c as SkipLink,
  p as VisuallyHidden
};
//# sourceMappingURL=a11y.js.map
