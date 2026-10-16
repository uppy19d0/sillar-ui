import * as r from "react";
import { cn as s } from "./utils.js";
function i(...n) {
  return (e) => {
    const o = n.map((t) => {
      if (typeof t == "function") return t(e);
      t && (t.current = e);
    });
    if (o.some((t) => typeof t == "function"))
      return () => {
        n.forEach((t, c) => {
          const f = o[c];
          typeof f == "function" ? f() : typeof t == "function" ? t(null) : t && (t.current = null);
        });
      };
  };
}
function p(n) {
  const e = Object.getOwnPropertyDescriptor(n.props, "ref"), o = Object.getOwnPropertyDescriptor(n, "ref");
  return (e && "value" in e ? e.value : void 0) ?? (o && "value" in o ? o.value : void 0);
}
function a(n, e) {
  return (o) => {
    n == null || n(o), o.defaultPrevented || e == null || e(o);
  };
}
const m = r.forwardRef(
  ({ children: n, ...e }, o) => {
    if (!r.isValidElement(n) || n.type === r.Fragment)
      throw new Error("Sillar UI Slot expects exactly one valid non-Fragment React element.");
    const t = n.props, c = { ...e, ...t };
    Object.keys(e).forEach((u) => {
      /^on[A-Z]/.test(u) && typeof e[u] == "function" && (c[u] = a(
        t[u],
        e[u]
      ));
    }), c.className = s(e.className, t.className), c.style = {
      ...e.style,
      ...t.style
    };
    const f = p(n);
    return c.ref = r.useMemo(() => i(o, f), [o, f]), r.cloneElement(n, c);
  }
);
m.displayName = "Slot";
export {
  m as Slot,
  i as composeRefs
};
//# sourceMappingURL=slot.js.map
