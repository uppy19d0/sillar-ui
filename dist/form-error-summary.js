import { jsxs as b, jsx as l } from "react/jsx-runtime";
import * as t from "react";
import { cn as g } from "./utils.js";
const p = t.forwardRef(
  ({ errors: o, title: n = "There is a problem", className: c, id: i, tabIndex: d = -1, role: f = "region", ...m }, u) => {
    const y = t.useId();
    if (o.length === 0) return null;
    const s = `${i ?? y}-title`;
    return /* @__PURE__ */ b(
      "div",
      {
        ...m,
        ref: u,
        id: i,
        role: f,
        tabIndex: d,
        "aria-labelledby": m["aria-labelledby"] ?? (m["aria-label"] ? void 0 : s),
        className: g("slr-form-error-summary", c),
        children: [
          /* @__PURE__ */ l("h2", { id: s, className: "slr-form-error-summary__title", children: n }),
          /* @__PURE__ */ l("ul", { className: "slr-form-error-summary__list", children: o.map((e, h) => /* @__PURE__ */ l("li", { children: /* @__PURE__ */ l(
            "a",
            {
              href: `#${encodeURIComponent(e.id)}`,
              className: "slr-form-error-summary__link",
              onClick: (r) => {
                if (r.defaultPrevented || r.button !== 0 || r.metaKey || r.ctrlKey || r.shiftKey || r.altKey) return;
                r.preventDefault();
                const a = r.currentTarget.ownerDocument.getElementById(e.id);
                a && "focus" in a && typeof a.focus == "function" && a.focus();
              },
              children: e.message
            }
          ) }, `${e.id}-${h}`)) })
        ]
      }
    );
  }
);
p.displayName = "FormErrorSummary";
export {
  p as FormErrorSummary
};
//# sourceMappingURL=form-error-summary.js.map
