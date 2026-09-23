import { jsx as m } from "react/jsx-runtime";
import * as u from "react";
import { a as H, u as U } from "./internal-D9EwPR7x.js";
import { a as $ } from "./dismissable-layer-HbfqlJA5.js";
import { P as T } from "./portal-DEB9SKy7.js";
import { a as v, c as V } from "./positioning-Baw9HQqS.js";
import { m as S } from "./roving-focus-BBnqq1MU.js";
import { Slot as j, composeRefs as F } from "./slot.js";
import { cn as x } from "./utils.js";
const W = u.createContext(null), B = '[role="menuitem"]:not([disabled]):not([aria-disabled="true"])';
function M(r) {
  const n = u.useContext(W);
  if (!n) throw new Error(`${r} must be rendered inside DropdownMenu.`);
  return n;
}
function N(r) {
  return Array.from(r.querySelectorAll(B));
}
function ae({ open: r, defaultOpen: n = !1, onOpenChange: i, children: w }) {
  const [c, d] = U({
    value: r,
    defaultValue: n,
    onChange: i
  }), [o, g] = u.useState("first"), l = u.useRef(null), t = u.useId(), f = u.useMemo(
    () => ({ open: c, setOpen: d, triggerRef: l, contentId: t, focusIntent: o, setFocusIntent: g }),
    [t, o, c, d]
  );
  return /* @__PURE__ */ m(W.Provider, { value: f, children: w });
}
const G = u.forwardRef(
  ({ asChild: r = !1, onClick: n, onKeyDown: i, type: w, ...c }, d) => {
    const o = M("DropdownMenuTrigger"), g = r ? j : "button", l = (t) => {
      o.setFocusIntent(t), o.setOpen(!0);
    };
    return /* @__PURE__ */ m(
      g,
      {
        ...c,
        ref: F(d, o.triggerRef),
        type: r ? void 0 : w ?? "button",
        "aria-haspopup": "menu",
        "aria-expanded": o.open,
        "aria-controls": o.open ? o.contentId : void 0,
        "data-state": o.open ? "open" : "closed",
        onClick: (t) => {
          n == null || n(t), !t.defaultPrevented && (o.open || o.setFocusIntent("first"), o.setOpen(!o.open));
        },
        onKeyDown: (t) => {
          i == null || i(t), !t.defaultPrevented && (t.key === "ArrowDown" || t.key === "Enter" || t.key === " " ? (t.preventDefault(), l("first")) : t.key === "ArrowUp" && (t.preventDefault(), l("last")));
        }
      }
    );
  }
);
G.displayName = "DropdownMenuTrigger";
function ue({ children: r, container: n }) {
  const { open: i } = M("DropdownMenuPortal");
  return !i || typeof document > "u" ? null : /* @__PURE__ */ m(T, { container: n, children: r });
}
const z = u.forwardRef(
  ({
    className: r,
    align: n = "start",
    side: i = "bottom",
    sideOffset: w = 6,
    collisionPadding: c = 8,
    avoidCollisions: d = !0,
    portalContainer: o,
    style: g,
    onKeyDown: l,
    children: t,
    ...f
  }, b) => {
    const s = M("DropdownMenuContent"), D = u.useRef(null), k = u.useRef(s.setOpen), R = u.useRef({ value: "", time: 0 }), [A, q] = u.useState({ side: i, style: { visibility: "hidden" } });
    return k.current = s.setOpen, H(() => {
      if (!s.open) return;
      const e = s.triggerRef.current, a = D.current;
      return !e || !a ? void 0 : v(e, a, () => {
        const y = window.getComputedStyle(e).direction;
        q(V(
          e.getBoundingClientRect(),
          { width: a.offsetWidth, height: a.offsetHeight },
          { width: window.innerWidth, height: window.innerHeight },
          {
            side: i,
            align: n,
            sideOffset: w,
            collisionPadding: c,
            avoidCollisions: d,
            direction: y === "rtl" ? "rtl" : "ltr",
            matchAnchorWidth: !0
          }
        ));
      });
    }, [n, d, c, s.open, s.triggerRef, i, w]), u.useEffect(() => {
      if (!s.open) return;
      const e = window.requestAnimationFrame(() => {
        const p = D.current;
        if (!p) return;
        const y = N(p), h = s.focusIntent === "last" ? y.at(-1) : y[0];
        h == null || h.focus({ preventScroll: !0 });
      }), a = D.current ? $(D.current, {
        branches: [s.triggerRef.current],
        onDismiss: () => k.current(!1)
      }) : () => {
      };
      return () => {
        window.cancelAnimationFrame(e), a(), R.current = { value: "", time: 0 };
      };
    }, [s.focusIntent, s.open, s.triggerRef]), !s.open || typeof document > "u" ? null : /* @__PURE__ */ m(T, { container: o, children: /* @__PURE__ */ m(
      "div",
      {
        ...f,
        ref: F(D, b),
        id: s.contentId,
        role: "menu",
        "data-slot": "dropdown-menu-content",
        "data-state": "open",
        "data-side": A.side,
        className: x("slr-dropdown__content", r),
        style: { ...A.style, ...g },
        onKeyDown: (e) => {
          var y, h, O, L;
          if (l == null || l(e), e.defaultPrevented) return;
          const a = N(e.currentTarget), p = a.indexOf(document.activeElement);
          if (e.key === "Escape")
            e.preventDefault(), s.setOpen(!1), (y = s.triggerRef.current) == null || y.focus({ preventScroll: !0 });
          else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            if (e.preventDefault(), a.length === 0) return;
            (h = S(a, a[p], {
              direction: e.key === "ArrowDown" ? "next" : "previous"
            })) == null || h.focus();
          } else if (e.key === "Home")
            e.preventDefault(), (O = S(a, a[p], { direction: "first" })) == null || O.focus();
          else if (e.key === "End")
            e.preventDefault(), (L = S(a, a[p], { direction: "last" })) == null || L.focus();
          else if (e.key === "Tab")
            s.setOpen(!1);
          else if (e.key.length === 1 && e.key !== " " && !e.ctrlKey && !e.metaKey && !e.altKey) {
            const C = Date.now(), P = C - R.current.time < 700 ? R.current.value : "", _ = P.length > 0 && P.split("").every((I) => I === e.key.toLowerCase()) ? e.key.toLowerCase() : `${P}${e.key.toLowerCase()}`;
            R.current = { value: _, time: C };
            const E = [...a.slice(p + 1), ...a.slice(0, p + 1)].find((I) => (I.dataset.textValue ?? I.textContent ?? "").trim().toLocaleLowerCase().startsWith(_));
            E && (e.preventDefault(), E.focus());
          }
        },
        children: t
      }
    ) });
  }
);
z.displayName = "DropdownMenuContent";
const J = u.forwardRef(
  ({ className: r, inset: n, variant: i = "default", textValue: w, onClick: c, onPointerMove: d, type: o, ...g }, l) => {
    const t = M("DropdownMenuItem");
    return /* @__PURE__ */ m(
      "button",
      {
        ...g,
        ref: l,
        type: o ?? "button",
        role: "menuitem",
        tabIndex: -1,
        "data-inset": n || void 0,
        "data-variant": i,
        "data-text-value": w,
        className: x("slr-dropdown__item", r),
        onPointerMove: (f) => {
          d == null || d(f), !f.defaultPrevented && !f.currentTarget.disabled && f.currentTarget.focus();
        },
        onClick: (f) => {
          var b;
          c == null || c(f), f.defaultPrevented || (t.setOpen(!1), (b = t.triggerRef.current) == null || b.focus({ preventScroll: !0 }));
        }
      }
    );
  }
);
J.displayName = "DropdownMenuItem";
function ie(r) {
  return /* @__PURE__ */ m("div", { role: "group", "data-slot": "dropdown-menu-group", ...r });
}
function ce({ className: r, ...n }) {
  return /* @__PURE__ */ m("div", { "data-slot": "dropdown-menu-label", className: x("slr-dropdown__label", r), ...n });
}
function de({ className: r, ...n }) {
  return /* @__PURE__ */ m("hr", { "data-slot": "dropdown-menu-separator", className: x("slr-dropdown__separator", r), ...n });
}
export {
  ae as DropdownMenu,
  z as DropdownMenuContent,
  ie as DropdownMenuGroup,
  J as DropdownMenuItem,
  ce as DropdownMenuLabel,
  ue as DropdownMenuPortal,
  de as DropdownMenuSeparator,
  G as DropdownMenuTrigger
};
//# sourceMappingURL=dropdown-menu.js.map
