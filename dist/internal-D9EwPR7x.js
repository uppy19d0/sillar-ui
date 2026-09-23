import * as e from "react";
const R = typeof window > "u" ? e.useEffect : e.useLayoutEffect;
function V({
  value: t,
  defaultValue: o,
  onChange: a
}) {
  const [f, b] = e.useState(o), s = t !== void 0, c = s ? t : f, n = e.useRef(c), i = e.useRef(s), r = e.useRef(a);
  n.current = c, i.current = s, r.current = a;
  const p = e.useCallback((l) => {
    var d;
    const u = typeof l == "function" ? l(n.current) : l;
    Object.is(u, n.current) || (n.current = u, i.current || b(u), (d = r.current) == null || d.call(r, u));
  }, []);
  return [c, p];
}
const y = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])'
].join(",");
function m(t) {
  return Array.from(t.querySelectorAll(y)).filter((o) => !o.hidden && o.getAttribute("aria-hidden") !== "true");
}
export {
  R as a,
  m as g,
  V as u
};
//# sourceMappingURL=internal-D9EwPR7x.js.map
