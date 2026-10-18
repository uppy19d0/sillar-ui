import { jsx as e, jsxs as P, Fragment as K } from "react/jsx-runtime";
import * as S from "react";
import { u as V } from "./internal-D9EwPR7x.js";
import { cn as R } from "./utils.js";
const N = (t, s) => Array.from({ length: Math.max(0, s - t + 1) }, (c, h) => t + h), p = (t, s, c) => Number.isFinite(t) ? Math.max(c, Math.floor(t)) : s;
function w({ page: t, pageCount: s, siblingCount: c = 1, boundaryCount: h = 1 }) {
  const n = p(s, 0, 0), r = p(c, 1, 0), a = p(h, 1, 0);
  if (n === 0) return [];
  const u = Math.min(Math.max(p(t, 1, 1), 1), n);
  if (n <= r * 2 + 3 + a * 2) return N(1, n);
  const x = N(1, a), g = N(n - a + 1, n), m = Math.max(Math.min(u - r, n - a - r * 2 - 1), a + 2), _ = Math.min(Math.max(u + r, a + r * 2 + 2), g.length > 0 ? g[0] - 2 : n - 1);
  return [
    ...x,
    ...m > a + 2 ? ["ellipsis-start"] : a + 1 < n - a ? [a + 1] : [],
    ...N(m, _),
    ..._ < n - a - 1 ? ["ellipsis-end"] : n - a > a ? [n - a] : [],
    ...g
  ];
}
const A = {
  navigation: "Pagination",
  previous: "Previous",
  next: "Next",
  page: (t) => `Page ${t}`
}, E = S.forwardRef(
  ({ page: t, defaultPage: s = 1, pageCount: c, onPageChange: h, siblingCount: n, boundaryCount: r, labels: a, getHref: u, disabled: x = !1, className: g, ...m }, _) => {
    const [j, D] = V({ value: t, defaultValue: s, onChange: h }), d = { ...A, ...a }, f = p(c, 0, 0), o = f === 0 ? 0 : Math.min(Math.max(p(j, 1, 1), 1), f);
    if (f <= 1) return null;
    const v = (i) => (l) => {
      const M = l.metaKey || l.ctrlKey || l.shiftKey || l.altKey || l.button !== 0;
      if (x || i === o) {
        l.preventDefault();
        return;
      }
      u && M || (l.preventDefault(), D(i));
    }, y = (i, l, M, b = !1, F = !1) => {
      const k = R("slr-pagination__link", b && "slr-pagination__link--active"), C = x || F;
      return u && !C ? /* @__PURE__ */ e("a", { href: u(i), "aria-label": l, "aria-current": b ? "page" : void 0, className: k, "data-active": b ? "" : void 0, onClick: v(i), children: M }) : /* @__PURE__ */ e("button", { type: "button", "aria-label": l, "aria-current": b ? "page" : void 0, disabled: C, className: k, "data-active": b ? "" : void 0, onClick: v(i), children: M });
    };
    return /* @__PURE__ */ e("nav", { ...m, ref: _, "aria-label": m["aria-label"] ?? d.navigation, "data-slot": "pagination", className: R("slr-pagination", g), children: /* @__PURE__ */ P("ul", { className: "slr-pagination__list", children: [
      /* @__PURE__ */ e("li", { children: y(o - 1, d.previous, /* @__PURE__ */ P(K, { children: [
        /* @__PURE__ */ e("span", { "aria-hidden": "true", children: "‹" }),
        /* @__PURE__ */ e("span", { className: "slr-pagination__label", children: d.previous })
      ] }), !1, o <= 1) }),
      w({ page: o, pageCount: f, siblingCount: n, boundaryCount: r }).map((i) => typeof i == "number" ? /* @__PURE__ */ e("li", { children: y(i, d.page(i), i, i === o) }, i) : /* @__PURE__ */ e("li", { className: "slr-pagination__ellipsis", "aria-hidden": "true", children: "…" }, i)),
      /* @__PURE__ */ e("li", { children: y(o + 1, d.next, /* @__PURE__ */ P(K, { children: [
        /* @__PURE__ */ e("span", { className: "slr-pagination__label", children: d.next }),
        /* @__PURE__ */ e("span", { "aria-hidden": "true", children: "›" })
      ] }), !1, o >= f) })
    ] }) });
  }
);
E.displayName = "Pagination";
export {
  E as Pagination,
  w as getPaginationRange
};
//# sourceMappingURL=pagination.js.map
