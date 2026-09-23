import { jsx as r } from "react/jsx-runtime";
import { cn as t } from "./utils.js";
function a({ className: e, containerClassName: n, children: s, ...c }) {
  return /* @__PURE__ */ r("section", { className: t("slr-section", e), ...c, children: /* @__PURE__ */ r("div", { className: t("slr-container", n), children: s }) });
}
function l({ className: e, ...n }) {
  return /* @__PURE__ */ r("header", { className: t("slr-section-header", e), ...n });
}
function m({ className: e, ...n }) {
  return /* @__PURE__ */ r("span", { className: t("slr-eyebrow", e), ...n });
}
function u({ className: e, ...n }) {
  return /* @__PURE__ */ r("h2", { className: t("slr-section-title", e), ...n });
}
function f({ className: e, ...n }) {
  return /* @__PURE__ */ r("p", { className: t("slr-section-description", e), ...n });
}
export {
  a as Section,
  f as SectionDescription,
  m as SectionEyebrow,
  l as SectionHeader,
  u as SectionTitle
};
//# sourceMappingURL=section.js.map
