import * as n from "react";
import { cn as a } from "./utils.js";
function r(...t) {
  return (e) => {
    t.forEach((f) => {
      typeof f == "function" ? f(e) : f && (f.current = e);
    });
  };
}
function i(t, e) {
  return (f) => {
    t == null || t(f), f.defaultPrevented || e == null || e(f);
  };
}
const u = n.forwardRef(
  ({ children: t, ...e }, f) => {
    if (!n.isValidElement(t))
      throw new Error("Sillar UI Slot expects exactly one valid React element.");
    const c = t.props, o = { ...e, ...c };
    Object.keys(e).forEach((m) => {
      /^on[A-Z]/.test(m) && typeof e[m] == "function" && (o[m] = i(
        c[m],
        e[m]
      ));
    }), o.className = a(e.className, c.className), o.style = {
      ...e.style,
      ...c.style
    };
    const s = c.ref ?? t.ref;
    return o.ref = r(f, s), n.cloneElement(t, o);
  }
);
u.displayName = "Slot";
export {
  u as Slot,
  r as composeRefs
};
//# sourceMappingURL=slot.js.map
