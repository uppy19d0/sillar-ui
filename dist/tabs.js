import { jsx as u } from "react/jsx-runtime";
import * as l from "react";
import { u as N } from "./internal-D9EwPR7x.js";
import { m as V } from "./roving-focus-BBnqq1MU.js";
import { cn as f } from "./utils.js";
const w = l.createContext(null);
function x(e) {
  const r = l.useContext(w);
  if (!r) throw new Error(`${e} must be rendered inside Tabs.`);
  return r;
}
function I(e, r) {
  return `${e}-tab-${encodeURIComponent(r)}`;
}
function h(e, r) {
  return `${e}-panel-${encodeURIComponent(r)}`;
}
const _ = l.forwardRef(
  ({
    value: e,
    defaultValue: r,
    onValueChange: n,
    orientation: o = "horizontal",
    activationMode: s = "automatic",
    loop: i = !0,
    className: m,
    children: p,
    ...T
  }, a) => {
    const [d, t] = N({
      value: e,
      defaultValue: r ?? "",
      onChange: n
    }), c = l.useId(), b = l.useMemo(() => ({
      value: d,
      setValue: t,
      orientation: o,
      activationMode: s,
      loop: i,
      baseId: c
    }), [s, c, i, o, d, t]);
    return /* @__PURE__ */ u(w.Provider, { value: b, children: /* @__PURE__ */ u(
      "div",
      {
        ...T,
        ref: a,
        "data-slot": "tabs",
        "data-orientation": o,
        className: f("slr-tabs", m),
        children: p
      }
    ) });
  }
);
_.displayName = "Tabs";
const L = l.forwardRef(
  ({ className: e, ...r }, n) => {
    const { orientation: o } = x("TabsList");
    return /* @__PURE__ */ u(
      "div",
      {
        ...r,
        ref: n,
        role: "tablist",
        "aria-orientation": o,
        "data-slot": "tabs-list",
        "data-orientation": o,
        className: f("slr-tabs__list", e)
      }
    );
  }
);
L.displayName = "TabsList";
const P = l.forwardRef(
  ({ value: e, className: r, disabled: n, onClick: o, onFocus: s, onKeyDown: i, type: m, ...p }, T) => {
    const a = x("TabsTrigger"), d = a.value === e;
    return /* @__PURE__ */ u(
      "button",
      {
        ...p,
        ref: T,
        id: I(a.baseId, e),
        type: m ?? "button",
        role: "tab",
        "aria-selected": d,
        "aria-controls": h(a.baseId, e),
        tabIndex: d ? 0 : -1,
        disabled: n,
        "data-slot": "tabs-trigger",
        "data-state": d ? "active" : "inactive",
        "data-orientation": a.orientation,
        className: f("slr-tabs__trigger", r),
        onClick: (t) => {
          o == null || o(t), !t.defaultPrevented && !n && a.setValue(e);
        },
        onFocus: (t) => {
          s == null || s(t), !t.defaultPrevented && !n && a.activationMode === "automatic" && a.setValue(e);
        },
        onKeyDown: (t) => {
          var y;
          if (i == null || i(t), t.defaultPrevented) return;
          if (a.activationMode === "manual" && ["Enter", " "].includes(t.key)) {
            t.preventDefault(), a.setValue(e);
            return;
          }
          const c = a.orientation === "horizontal" && window.getComputedStyle(t.currentTarget).direction === "rtl", b = a.orientation === "horizontal" ? c ? "ArrowRight" : "ArrowLeft" : "ArrowUp", R = a.orientation === "horizontal" ? c ? "ArrowLeft" : "ArrowRight" : "ArrowDown";
          if (![b, R, "Home", "End"].includes(t.key)) return;
          const g = t.currentTarget.closest('[role="tablist"]'), A = Array.from((g == null ? void 0 : g.querySelectorAll('[role="tab"]:not([disabled])')) ?? []);
          t.preventDefault();
          const C = t.key === "Home" ? "first" : t.key === "End" ? "last" : t.key === b ? "previous" : "next";
          (y = V(A, t.currentTarget, { direction: C, loop: a.loop })) == null || y.focus();
        }
      }
    );
  }
);
P.displayName = "TabsTrigger";
const $ = l.forwardRef(
  ({ value: e, className: r, ...n }, o) => {
    const s = x("TabsContent"), i = s.value === e;
    return /* @__PURE__ */ u(
      "div",
      {
        ...n,
        ref: o,
        id: h(s.baseId, e),
        role: "tabpanel",
        "aria-labelledby": I(s.baseId, e),
        tabIndex: 0,
        hidden: !i,
        "data-slot": "tabs-content",
        "data-state": i ? "active" : "inactive",
        "data-orientation": s.orientation,
        className: f("slr-tabs__content", r)
      }
    );
  }
);
$.displayName = "TabsContent";
export {
  _ as Tabs,
  $ as TabsContent,
  L as TabsList,
  P as TabsTrigger
};
//# sourceMappingURL=tabs.js.map
