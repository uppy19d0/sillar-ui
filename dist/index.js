import { jsx as l, jsxs as z, Fragment as oe } from "react/jsx-runtime";
import * as i from "react";
import { clsx as se } from "clsx";
import { twMerge as ie } from "tailwind-merge";
import { cva as q } from "class-variance-authority";
import { createPortal as le } from "react-dom";
function u(...t) {
  return ie(se(t));
}
function P(...t) {
  return (e) => {
    t.forEach((r) => {
      typeof r == "function" ? r(e) : r && (r.current = e);
    });
  };
}
function ce(t, e) {
  return (r) => {
    t == null || t(r), r.defaultPrevented || e == null || e(r);
  };
}
const M = i.forwardRef(
  ({ children: t, ...e }, r) => {
    if (!i.isValidElement(t))
      throw new Error("Sillar UI Slot expects exactly one valid React element.");
    const n = t.props, o = { ...e, ...n };
    Object.keys(e).forEach((c) => {
      /^on[A-Z]/.test(c) && typeof e[c] == "function" && (o[c] = ce(
        n[c],
        e[c]
      ));
    }), o.className = u(e.className, n.className), o.style = {
      ...e.style,
      ...n.style
    };
    const a = n.ref ?? t.ref;
    return o.ref = P(r, a), i.cloneElement(t, o);
  }
);
M.displayName = "Slot";
function Ge({ asChild: t = !1, className: e, ...r }) {
  return /* @__PURE__ */ l(t ? M : "span", { className: u("slr-visually-hidden", e), ...r });
}
function Ye({ className: t, ...e }) {
  return /* @__PURE__ */ l("a", { className: u("slr-skip-link", t), ...e });
}
const ue = q("slr-badge", {
  variants: {
    variant: {
      default: "slr-badge--default",
      secondary: "slr-badge--secondary",
      destructive: "slr-badge--destructive",
      outline: "slr-badge--outline",
      success: "slr-badge--success"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
function Ze({ className: t, variant: e, asChild: r = !1, ...n }) {
  return /* @__PURE__ */ l(
    r ? M : "span",
    {
      "data-slot": "badge",
      className: u(ue({ variant: e }), t),
      ...n
    }
  );
}
const de = q("slr-button", {
  variants: {
    variant: {
      default: "slr-button--default",
      destructive: "slr-button--destructive",
      outline: "slr-button--outline",
      secondary: "slr-button--secondary",
      ghost: "slr-button--ghost",
      link: "slr-button--link"
    },
    size: {
      default: "slr-button--md",
      sm: "slr-button--sm",
      lg: "slr-button--lg",
      iconSm: "slr-button--icon-sm",
      icon: "slr-button--icon",
      iconLg: "slr-button--icon-lg"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
}), Q = i.forwardRef(
  ({ className: t, variant: e, size: r, asChild: n = !1, type: o, loading: a = !1, disabled: c, children: b, onClick: d, tabIndex: s, ...w }, p) => {
    const m = n ? M : "button", g = c || a, D = (N) => {
      if (g) {
        N.preventDefault();
        return;
      }
      d == null || d(N);
    };
    return /* @__PURE__ */ l(
      m,
      {
        ref: p,
        "data-slot": "button",
        "data-loading": a || void 0,
        className: u(de({ variant: e, size: r }), t),
        type: n ? void 0 : o ?? "button",
        disabled: n ? void 0 : g,
        "aria-busy": a || void 0,
        "aria-disabled": n && g ? !0 : void 0,
        tabIndex: n && g ? -1 : s,
        onClick: D,
        ...w,
        children: n ? b : /* @__PURE__ */ z(oe, { children: [
          a ? /* @__PURE__ */ l("span", { className: "slr-spinner", "aria-hidden": "true" }) : null,
          b
        ] })
      }
    );
  }
);
Q.displayName = "Button";
const fe = q("slr-callout", {
  variants: {
    variant: {
      info: "slr-callout--info",
      success: "slr-callout--success",
      warning: "slr-callout--warning",
      danger: "slr-callout--danger"
    }
  },
  defaultVariants: { variant: "info" }
});
function Je({ className: t, variant: e, ...r }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "callout",
      role: e === "danger" ? "alert" : void 0,
      className: u(fe({ variant: e }), t),
      ...r
    }
  );
}
function Ke({ className: t, ...e }) {
  return /* @__PURE__ */ l("span", { "data-slot": "callout-icon", className: u("slr-callout__icon", t), ...e });
}
function Qe({ className: t, ...e }) {
  return /* @__PURE__ */ l("h3", { "data-slot": "callout-title", className: u("slr-callout__title", t), ...e });
}
function Xe({ className: t, ...e }) {
  return /* @__PURE__ */ l("div", { "data-slot": "callout-description", className: u("slr-callout__description", t), ...e });
}
const pe = q("slr-card", {
  variants: {
    variant: {
      default: "slr-card--default",
      elevated: "slr-card--elevated",
      subtle: "slr-card--subtle",
      outline: "slr-card--outline"
    }
  },
  defaultVariants: { variant: "default" }
});
function et({ className: t, variant: e, ...r }) {
  return /* @__PURE__ */ l("div", { "data-slot": "card", className: u(pe({ variant: e }), t), ...r });
}
function tt({ className: t, ...e }) {
  return /* @__PURE__ */ l("div", { "data-slot": "card-header", className: u("slr-card__header", t), ...e });
}
function rt({ className: t, ...e }) {
  return /* @__PURE__ */ l("h3", { "data-slot": "card-title", className: u("slr-card__title", t), ...e });
}
function nt({ className: t, ...e }) {
  return /* @__PURE__ */ l("p", { "data-slot": "card-description", className: u("slr-card__description", t), ...e });
}
function at({ className: t, ...e }) {
  return /* @__PURE__ */ l("div", { "data-slot": "card-action", className: u("slr-card__action", t), ...e });
}
function ot({ className: t, ...e }) {
  return /* @__PURE__ */ l("div", { "data-slot": "card-content", className: u("slr-card__content", t), ...e });
}
function st({ className: t, ...e }) {
  return /* @__PURE__ */ l("div", { "data-slot": "card-footer", className: u("slr-card__footer", t), ...e });
}
const j = typeof window > "u" ? i.useEffect : i.useLayoutEffect;
function H({
  value: t,
  defaultValue: e,
  onChange: r
}) {
  const [n, o] = i.useState(e), a = t !== void 0, c = a ? t : n, b = i.useRef(c), d = i.useRef(a), s = i.useRef(r);
  b.current = c, d.current = a, s.current = r;
  const w = i.useCallback((p) => {
    var g;
    const m = typeof p == "function" ? p(b.current) : p;
    Object.is(m, b.current) || (b.current = m, d.current || o(m), (g = s.current) == null || g.call(s, m));
  }, []);
  return [c, w];
}
const me = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])'
].join(",");
function Y(t) {
  return Array.from(t.querySelectorAll(me)).filter((e) => !e.hidden && e.getAttribute("aria-hidden") !== "true");
}
const B = /* @__PURE__ */ new Map(), $ = [];
let F = 0, Z = "";
function ge(t) {
  return $.push(t), () => {
    const e = $.lastIndexOf(t);
    e >= 0 && $.splice(e, 1);
  };
}
function J(t) {
  return $.at(-1) === t;
}
function be() {
  return F === 0 && (Z = document.body.style.overflow, document.body.style.overflow = "hidden"), F += 1, () => {
    F = Math.max(0, F - 1), F === 0 && (document.body.style.overflow = Z);
  };
}
function we(t) {
  const e = /* @__PURE__ */ new Set();
  let r = t, n = r.parentElement;
  for (; n; ) {
    for (const a of n.children)
      a instanceof HTMLElement && a !== r && !["SCRIPT", "STYLE", "LINK"].includes(a.tagName) && e.add(a);
    if (n === document.body) break;
    r = n, n = r.parentElement;
  }
  const o = [...e];
  return o.forEach((a) => {
    const c = B.get(a);
    if (c) {
      c.count += 1;
      return;
    }
    B.set(a, {
      count: 1,
      inert: a.inert === !0,
      ariaHidden: a.getAttribute("aria-hidden")
    }), a.inert = !0, a.setAttribute("aria-hidden", "true");
  }), () => {
    o.forEach((a) => {
      const c = B.get(a);
      c && (c.count -= 1, !(c.count > 0) && (a.inert = c.inert, c.ariaHidden === null ? a.removeAttribute("aria-hidden") : a.setAttribute("aria-hidden", c.ariaHidden), B.delete(a)));
    });
  };
}
function ye(t, e) {
  const r = document.activeElement, n = ge(t), o = () => {
    t.contains(document.activeElement) || (e.initialFocus ?? Y(t)[0] ?? t).focus({ preventScroll: !0 });
  }, a = window.requestAnimationFrame(o), c = (d) => {
    var m, g;
    if (!J(t)) return;
    if (d.key === "Escape") {
      (m = e.onEscapeKeyDown) == null || m.call(e, d), d.defaultPrevented || (g = e.onDismiss) == null || g.call(e);
      return;
    }
    if (d.key !== "Tab") return;
    const s = Y(t);
    if (s.length === 0) {
      d.preventDefault(), t.focus();
      return;
    }
    const w = s[0], p = s[s.length - 1];
    d.shiftKey && (document.activeElement === w || !t.contains(document.activeElement)) ? (d.preventDefault(), p.focus()) : !d.shiftKey && document.activeElement === p && (d.preventDefault(), w.focus());
  }, b = (d) => {
    !J(t) || t.contains(d.target) || o();
  };
  return document.addEventListener("keydown", c), document.addEventListener("focusin", b), () => {
    var s;
    window.cancelAnimationFrame(a), document.removeEventListener("keydown", c), document.removeEventListener("focusin", b), n();
    const d = e.finalFocus ?? e.fallbackFocus ?? r;
    (s = d == null ? void 0 : d.focus) == null || s.call(d, { preventScroll: !0 });
  };
}
function W({ children: t, container: e }) {
  return typeof document > "u" ? null : le(t, e ?? document.body);
}
const X = i.createContext(null);
function A(t) {
  const e = i.useContext(X);
  if (!e) throw new Error(`${t} must be rendered inside Dialog.`);
  return e;
}
function it({ open: t, defaultOpen: e = !1, onOpenChange: r, children: n }) {
  const [o, a] = H({
    value: t,
    defaultValue: e,
    onChange: r
  }), c = i.useRef(null), b = i.useId(), d = i.useId(), [s, w] = i.useState(0), [p, m] = i.useState(0), g = i.useCallback(() => (w((h) => h + 1), () => w((h) => Math.max(0, h - 1))), []), D = i.useCallback(() => (m((h) => h + 1), () => m((h) => Math.max(0, h - 1))), []), N = i.useMemo(() => ({
    open: o,
    setOpen: a,
    triggerRef: c,
    titleId: b,
    descriptionId: d,
    hasTitle: s > 0,
    hasDescription: p > 0,
    registerTitle: g,
    registerDescription: D
  }), [
    p,
    d,
    D,
    g,
    o,
    a,
    s,
    b
  ]);
  return /* @__PURE__ */ l(X.Provider, { value: N, children: n });
}
const he = i.forwardRef(
  ({ asChild: t = !1, onClick: e, type: r, ...n }, o) => {
    const a = A("DialogTrigger");
    return /* @__PURE__ */ l(
      t ? M : "button",
      {
        ...n,
        ref: P(o, a.triggerRef),
        type: t ? void 0 : r ?? "button",
        "aria-haspopup": "dialog",
        "aria-expanded": a.open,
        "data-state": a.open ? "open" : "closed",
        onClick: (b) => {
          e == null || e(b), b.defaultPrevented || a.setOpen(!0);
        }
      }
    );
  }
);
he.displayName = "DialogTrigger";
const ve = i.forwardRef(
  ({ asChild: t = !1, onClick: e, type: r, ...n }, o) => {
    const a = A("DialogClose");
    return /* @__PURE__ */ l(
      t ? M : "button",
      {
        ...n,
        ref: o,
        type: t ? void 0 : r ?? "button",
        onClick: (b) => {
          e == null || e(b), b.defaultPrevented || a.setOpen(!1);
        }
      }
    );
  }
);
ve.displayName = "DialogClose";
function Ne({ children: t, container: e, className: r, ...n }) {
  const { open: o } = A("DialogPortal");
  return !o || typeof document > "u" ? null : /* @__PURE__ */ l(W, { container: e, children: /* @__PURE__ */ l("div", { ...n, "data-slot": "dialog-portal", className: u("slr-dialog__portal", r), children: t }) });
}
const ee = i.forwardRef(
  ({ className: t, onPointerDown: e, ...r }, n) => {
    const o = A("DialogOverlay");
    return /* @__PURE__ */ l(
      "div",
      {
        ...r,
        ref: n,
        "data-slot": "dialog-overlay",
        "data-state": o.open ? "open" : "closed",
        className: u("slr-dialog__overlay", t),
        onPointerDown: (a) => {
          e == null || e(a), !a.defaultPrevented && a.target === a.currentTarget && o.setOpen(!1);
        }
      }
    );
  }
);
ee.displayName = "DialogOverlay";
const De = i.forwardRef(
  ({
    className: t,
    overlayClassName: e,
    children: r,
    portalContainer: n,
    initialFocusRef: o,
    finalFocusRef: a,
    onEscapeKeyDown: c,
    role: b = "dialog",
    "aria-label": d,
    "aria-labelledby": s,
    "aria-describedby": w,
    ...p
  }, m) => {
    const g = A("DialogContent"), D = i.useRef(null), N = i.useRef(g.setOpen), h = i.useRef(c), S = i.useRef(o), f = i.useRef(a);
    return N.current = g.setOpen, h.current = c, S.current = o, f.current = a, i.useEffect(() => {
      var I, T;
      if (!g.open) return;
      const y = D.current;
      if (!y) return;
      const R = y.closest('[data-slot="dialog-portal"]'), x = be(), v = R ? we(R) : () => {
      }, _ = ye(y, {
        initialFocus: (I = S.current) == null ? void 0 : I.current,
        finalFocus: (T = f.current) == null ? void 0 : T.current,
        fallbackFocus: g.triggerRef.current,
        onEscapeKeyDown: (E) => {
          var C;
          return (C = h.current) == null ? void 0 : C.call(h, E);
        },
        onDismiss: () => N.current(!1)
      });
      return () => {
        v(), x(), _();
      };
    }, [g.open, g.triggerRef]), /* @__PURE__ */ z(Ne, { container: n, children: [
      /* @__PURE__ */ l(ee, { className: e }),
      /* @__PURE__ */ l(
        "div",
        {
          ...p,
          ref: P(D, m),
          "data-slot": "dialog-content",
          "data-state": g.open ? "open" : "closed",
          role: b,
          "aria-modal": "true",
          "aria-label": d,
          "aria-labelledby": s ?? (!d && g.hasTitle ? g.titleId : void 0),
          "aria-describedby": w ?? (g.hasDescription ? g.descriptionId : void 0),
          tabIndex: -1,
          className: u("slr-dialog__content", t),
          children: r
        }
      )
    ] });
  }
);
De.displayName = "DialogContent";
const lt = ({ className: t, ...e }) => /* @__PURE__ */ l("div", { "data-slot": "dialog-header", className: u("slr-dialog__header", t), ...e }), ct = ({ className: t, ...e }) => /* @__PURE__ */ l("div", { "data-slot": "dialog-footer", className: u("slr-dialog__footer", t), ...e }), Re = i.forwardRef(
  ({ className: t, ...e }, r) => {
    const { titleId: n, registerTitle: o } = A("DialogTitle");
    return j(() => o(), [o]), /* @__PURE__ */ l("h2", { ...e, ref: r, id: n, className: u("slr-dialog__title", t) });
  }
);
Re.displayName = "DialogTitle";
const xe = i.forwardRef(
  ({ className: t, ...e }, r) => {
    const { descriptionId: n, registerDescription: o } = A("DialogDescription");
    return j(() => o(), [o]), /* @__PURE__ */ l("p", { ...e, ref: r, id: n, className: u("slr-dialog__description", t) });
  }
);
xe.displayName = "DialogDescription";
function Ie(t, e) {
  const r = (n) => {
    var a;
    const o = n.target;
    t.contains(o) || (a = e.branches) != null && a.some((c) => c == null ? void 0 : c.contains(o)) || e.onDismiss();
  };
  return document.addEventListener("pointerdown", r), () => document.removeEventListener("pointerdown", r);
}
const te = i.createContext(null), Te = '[role="menuitem"]:not([disabled]):not([aria-disabled="true"])';
function U(t) {
  const e = i.useContext(te);
  if (!e) throw new Error(`${t} must be rendered inside DropdownMenu.`);
  return e;
}
function K(t) {
  return Array.from(t.querySelectorAll(Te));
}
function ut({ open: t, defaultOpen: e = !1, onOpenChange: r, children: n }) {
  const [o, a] = H({
    value: t,
    defaultValue: e,
    onChange: r
  }), [c, b] = i.useState("first"), d = i.useRef(null), s = i.useId(), w = i.useMemo(
    () => ({ open: o, setOpen: a, triggerRef: d, contentId: s, focusIntent: c, setFocusIntent: b }),
    [s, c, o, a]
  );
  return /* @__PURE__ */ l(te.Provider, { value: w, children: n });
}
const _e = i.forwardRef(
  ({ asChild: t = !1, onClick: e, onKeyDown: r, type: n, ...o }, a) => {
    const c = U("DropdownMenuTrigger"), b = t ? M : "button", d = (s) => {
      c.setFocusIntent(s), c.setOpen(!0);
    };
    return /* @__PURE__ */ l(
      b,
      {
        ...o,
        ref: P(a, c.triggerRef),
        type: t ? void 0 : n ?? "button",
        "aria-haspopup": "menu",
        "aria-expanded": c.open,
        "aria-controls": c.open ? c.contentId : void 0,
        "data-state": c.open ? "open" : "closed",
        onClick: (s) => {
          e == null || e(s), !s.defaultPrevented && (c.open || c.setFocusIntent("first"), c.setOpen(!c.open));
        },
        onKeyDown: (s) => {
          r == null || r(s), !s.defaultPrevented && (s.key === "ArrowDown" || s.key === "Enter" || s.key === " " ? (s.preventDefault(), d("first")) : s.key === "ArrowUp" && (s.preventDefault(), d("last")));
        }
      }
    );
  }
);
_e.displayName = "DropdownMenuTrigger";
function dt({ children: t, container: e }) {
  const { open: r } = U("DropdownMenuPortal");
  return !r || typeof document > "u" ? null : /* @__PURE__ */ l(W, { container: e, children: t });
}
const Ee = i.forwardRef(
  ({
    className: t,
    align: e = "start",
    side: r = "bottom",
    sideOffset: n = 6,
    collisionPadding: o = 8,
    avoidCollisions: a = !0,
    portalContainer: c,
    style: b,
    onKeyDown: d,
    children: s,
    ...w
  }, p) => {
    const m = U("DropdownMenuContent"), g = i.useRef(null), D = i.useRef(m.setOpen), N = i.useRef({ value: "", time: 0 }), [h, S] = i.useState({ side: r, style: { visibility: "hidden" } });
    return D.current = m.setOpen, j(() => {
      if (!m.open) return;
      const f = () => {
        const R = m.triggerRef.current, x = g.current;
        if (!R || !x) return;
        const v = R.getBoundingClientRect(), _ = x.offsetWidth, I = x.offsetHeight, T = window.getComputedStyle(R).direction, E = v.top - o, C = window.innerHeight - v.bottom - o;
        let L = r;
        a && (r === "bottom" && I > C && E > C && (L = "top"), r === "top" && I > E && C > E && (L = "bottom"));
        let k = T === "rtl" ? v.right - _ : v.left;
        e === "center" && (k = v.left + (v.width - _) / 2), e === "end" && (k = T === "rtl" ? v.left : v.right - _), k = Math.max(o, Math.min(k, window.innerWidth - _ - o));
        const O = L === "bottom" ? v.bottom + n : v.top - I - n, V = a ? Math.max(o, Math.min(O, window.innerHeight - I - o)) : O;
        S({
          side: L,
          style: {
            position: "fixed",
            top: V,
            left: k,
            minWidth: v.width,
            visibility: "visible"
          }
        });
      };
      f();
      const y = typeof ResizeObserver > "u" ? null : new ResizeObserver(f);
      return g.current && (y == null || y.observe(g.current)), m.triggerRef.current && (y == null || y.observe(m.triggerRef.current)), window.addEventListener("resize", f), window.addEventListener("scroll", f, !0), () => {
        y == null || y.disconnect(), window.removeEventListener("resize", f), window.removeEventListener("scroll", f, !0);
      };
    }, [e, a, o, m.open, m.triggerRef, r, n]), i.useEffect(() => {
      if (!m.open) return;
      const f = window.requestAnimationFrame(() => {
        const R = g.current;
        if (!R) return;
        const x = K(R), v = m.focusIntent === "last" ? x.at(-1) : x[0];
        v == null || v.focus({ preventScroll: !0 });
      }), y = g.current ? Ie(g.current, {
        branches: [m.triggerRef.current],
        onDismiss: () => D.current(!1)
      }) : () => {
      };
      return () => {
        window.cancelAnimationFrame(f), y(), N.current = { value: "", time: 0 };
      };
    }, [m.focusIntent, m.open, m.triggerRef]), !m.open || typeof document > "u" ? null : /* @__PURE__ */ l(W, { container: c, children: /* @__PURE__ */ l(
      "div",
      {
        ...w,
        ref: P(g, p),
        id: m.contentId,
        role: "menu",
        "data-slot": "dropdown-menu-content",
        "data-state": "open",
        "data-side": h.side,
        className: u("slr-dropdown__content", t),
        style: { ...h.style, ...b },
        onKeyDown: (f) => {
          var x, v, _, I;
          if (d == null || d(f), f.defaultPrevented) return;
          const y = K(f.currentTarget), R = y.indexOf(document.activeElement);
          if (f.key === "Escape")
            f.preventDefault(), m.setOpen(!1), (x = m.triggerRef.current) == null || x.focus({ preventScroll: !0 });
          else if (f.key === "ArrowDown" || f.key === "ArrowUp") {
            if (f.preventDefault(), y.length === 0) return;
            const T = f.key === "ArrowDown" ? 1 : -1;
            (v = y[(R + T + y.length) % y.length]) == null || v.focus();
          } else if (f.key === "Home")
            f.preventDefault(), (_ = y[0]) == null || _.focus();
          else if (f.key === "End")
            f.preventDefault(), (I = y.at(-1)) == null || I.focus();
          else if (f.key === "Tab")
            m.setOpen(!1);
          else if (f.key.length === 1 && f.key !== " " && !f.ctrlKey && !f.metaKey && !f.altKey) {
            const T = Date.now(), E = T - N.current.time < 700 ? N.current.value : "", L = E.length > 0 && E.split("").every((V) => V === f.key.toLowerCase()) ? f.key.toLowerCase() : `${E}${f.key.toLowerCase()}`;
            N.current = { value: L, time: T };
            const O = [...y.slice(R + 1), ...y.slice(0, R + 1)].find((V) => (V.dataset.textValue ?? V.textContent ?? "").trim().toLocaleLowerCase().startsWith(L));
            O && (f.preventDefault(), O.focus());
          }
        },
        children: s
      }
    ) });
  }
);
Ee.displayName = "DropdownMenuContent";
const Se = i.forwardRef(
  ({ className: t, inset: e, variant: r = "default", textValue: n, onClick: o, onPointerMove: a, type: c, ...b }, d) => {
    const s = U("DropdownMenuItem");
    return /* @__PURE__ */ l(
      "button",
      {
        ...b,
        ref: d,
        type: c ?? "button",
        role: "menuitem",
        tabIndex: -1,
        "data-inset": e || void 0,
        "data-variant": r,
        "data-text-value": n,
        className: u("slr-dropdown__item", t),
        onPointerMove: (w) => {
          a == null || a(w), !w.defaultPrevented && !w.currentTarget.disabled && w.currentTarget.focus();
        },
        onClick: (w) => {
          var p;
          o == null || o(w), w.defaultPrevented || (s.setOpen(!1), (p = s.triggerRef.current) == null || p.focus({ preventScroll: !0 }));
        }
      }
    );
  }
);
Se.displayName = "DropdownMenuItem";
function ft(t) {
  return /* @__PURE__ */ l("div", { role: "group", "data-slot": "dropdown-menu-group", ...t });
}
function pt({ className: t, ...e }) {
  return /* @__PURE__ */ l("div", { "data-slot": "dropdown-menu-label", className: u("slr-dropdown__label", t), ...e });
}
function mt({ className: t, ...e }) {
  return /* @__PURE__ */ l("hr", { "data-slot": "dropdown-menu-separator", className: u("slr-dropdown__separator", t), ...e });
}
function gt({ className: t, invalid: e = !1, ...r }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "field",
      "data-invalid": e || void 0,
      className: u("slr-field-group", t),
      ...r
    }
  );
}
function bt({ className: t, required: e = !1, children: r, ...n }) {
  return /* @__PURE__ */ z("label", { "data-slot": "field-label", className: u("slr-field-label", t), ...n, children: [
    r,
    e ? /* @__PURE__ */ l("span", { className: "slr-field-required", "aria-hidden": "true", children: "*" }) : null
  ] });
}
function wt({ className: t, ...e }) {
  return /* @__PURE__ */ l("p", { "data-slot": "field-description", className: u("slr-field-description", t), ...e });
}
function yt({ className: t, ...e }) {
  return /* @__PURE__ */ l("p", { "data-slot": "field-error", role: "alert", className: u("slr-field-error", t), ...e });
}
const Ce = {
  sm: "iconSm",
  default: "icon",
  lg: "iconLg"
}, Le = i.forwardRef(
  ({ label: t, tooltip: e, size: r = "default", children: n, ...o }, a) => /* @__PURE__ */ l(
    Q,
    {
      ref: a,
      size: Ce[r],
      "aria-label": t,
      title: e,
      ...o,
      children: n
    }
  )
);
Le.displayName = "IconButton";
const Me = i.forwardRef(
  ({ className: t, type: e, ...r }, n) => /* @__PURE__ */ l(
    "input",
    {
      ref: n,
      type: e,
      "data-slot": "input",
      className: u("slr-field slr-input", t),
      ...r
    }
  )
);
Me.displayName = "Input";
const Ae = i.forwardRef(
  ({ className: t, ...e }, r) => /* @__PURE__ */ l("label", { ref: r, "data-slot": "label", className: u("slr-label", t), ...e })
);
Ae.displayName = "Label";
const ke = i.forwardRef(
  ({ className: t, wrapperClassName: e, children: r, ...n }, o) => /* @__PURE__ */ z("span", { className: u("slr-select-wrap", e), children: [
    /* @__PURE__ */ l("select", { ref: o, "data-slot": "select", className: u("slr-field slr-select", t), ...n, children: r }),
    /* @__PURE__ */ l("span", { className: "slr-select-chevron", "aria-hidden": "true" })
  ] })
);
ke.displayName = "Select";
function ht({ className: t, containerClassName: e, children: r, ...n }) {
  return /* @__PURE__ */ l("section", { className: u("slr-section", t), ...n, children: /* @__PURE__ */ l("div", { className: u("slr-container", e), children: r }) });
}
function vt({ className: t, ...e }) {
  return /* @__PURE__ */ l("header", { className: u("slr-section-header", t), ...e });
}
function Nt({ className: t, ...e }) {
  return /* @__PURE__ */ l("span", { className: u("slr-eyebrow", t), ...e });
}
function Dt({ className: t, ...e }) {
  return /* @__PURE__ */ l("h2", { className: u("slr-section-title", t), ...e });
}
function Rt({ className: t, ...e }) {
  return /* @__PURE__ */ l("p", { className: u("slr-section-description", t), ...e });
}
function xt({
  className: t,
  orientation: e = "horizontal",
  decorative: r = !0,
  ...n
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "separator",
      "data-orientation": e,
      role: r ? "none" : "separator",
      "aria-orientation": r ? void 0 : e,
      className: u("slr-separator", t),
      ...n
    }
  );
}
const Ve = i.forwardRef(
  ({ checked: t, defaultChecked: e = !1, onCheckedChange: r, onClick: n, className: o, disabled: a, type: c, ...b }, d) => {
    const [s, w] = H({
      value: t,
      defaultValue: e,
      onChange: r
    });
    return /* @__PURE__ */ l(
      "button",
      {
        ...b,
        ref: d,
        type: c ?? "button",
        role: "switch",
        "aria-checked": s,
        disabled: a,
        "data-slot": "switch",
        "data-state": s ? "checked" : "unchecked",
        className: u("slr-switch", o),
        onClick: (p) => {
          n == null || n(p), !p.defaultPrevented && !a && w((m) => !m);
        },
        children: /* @__PURE__ */ l("span", { className: "slr-switch__thumb", "data-state": s ? "checked" : "unchecked" })
      }
    );
  }
);
Ve.displayName = "Switch";
const re = i.createContext(null);
function G(t) {
  const e = i.useContext(re);
  if (!e) throw new Error(`${t} must be rendered inside Tabs.`);
  return e;
}
function ne(t, e) {
  return `${t}-tab-${encodeURIComponent(e)}`;
}
function ae(t, e) {
  return `${t}-panel-${encodeURIComponent(e)}`;
}
const Oe = i.forwardRef(
  ({
    value: t,
    defaultValue: e,
    onValueChange: r,
    orientation: n = "horizontal",
    activationMode: o = "automatic",
    loop: a = !0,
    className: c,
    children: b,
    ...d
  }, s) => {
    const [w, p] = H({
      value: t,
      defaultValue: e ?? "",
      onChange: r
    }), m = i.useId(), g = i.useMemo(() => ({
      value: w,
      setValue: p,
      orientation: n,
      activationMode: o,
      loop: a,
      baseId: m
    }), [o, m, a, n, w, p]);
    return /* @__PURE__ */ l(re.Provider, { value: g, children: /* @__PURE__ */ l(
      "div",
      {
        ...d,
        ref: s,
        "data-slot": "tabs",
        "data-orientation": n,
        className: u("slr-tabs", c),
        children: b
      }
    ) });
  }
);
Oe.displayName = "Tabs";
const Fe = i.forwardRef(
  ({ className: t, ...e }, r) => {
    const { orientation: n } = G("TabsList");
    return /* @__PURE__ */ l(
      "div",
      {
        ...e,
        ref: r,
        role: "tablist",
        "aria-orientation": n,
        "data-slot": "tabs-list",
        "data-orientation": n,
        className: u("slr-tabs__list", t)
      }
    );
  }
);
Fe.displayName = "TabsList";
const Pe = i.forwardRef(
  ({ value: t, className: e, disabled: r, onClick: n, onFocus: o, onKeyDown: a, type: c, ...b }, d) => {
    const s = G("TabsTrigger"), w = s.value === t;
    return /* @__PURE__ */ l(
      "button",
      {
        ...b,
        ref: d,
        id: ne(s.baseId, t),
        type: c ?? "button",
        role: "tab",
        "aria-selected": w,
        "aria-controls": ae(s.baseId, t),
        tabIndex: w ? 0 : -1,
        disabled: r,
        "data-slot": "tabs-trigger",
        "data-state": w ? "active" : "inactive",
        "data-orientation": s.orientation,
        className: u("slr-tabs__trigger", e),
        onClick: (p) => {
          n == null || n(p), !p.defaultPrevented && !r && s.setValue(t);
        },
        onFocus: (p) => {
          o == null || o(p), !p.defaultPrevented && !r && s.activationMode === "automatic" && s.setValue(t);
        },
        onKeyDown: (p) => {
          var y;
          if (a == null || a(p), p.defaultPrevented) return;
          if (s.activationMode === "manual" && ["Enter", " "].includes(p.key)) {
            p.preventDefault(), s.setValue(t);
            return;
          }
          const m = s.orientation === "horizontal" && window.getComputedStyle(p.currentTarget).direction === "rtl", g = s.orientation === "horizontal" ? m ? "ArrowRight" : "ArrowLeft" : "ArrowUp", D = s.orientation === "horizontal" ? m ? "ArrowLeft" : "ArrowRight" : "ArrowDown";
          if (![g, D, "Home", "End"].includes(p.key)) return;
          const N = p.currentTarget.closest('[role="tablist"]'), h = Array.from((N == null ? void 0 : N.querySelectorAll('[role="tab"]:not([disabled])')) ?? []), S = h.indexOf(p.currentTarget);
          let f = S;
          p.key === "Home" && (f = 0), p.key === "End" && (f = h.length - 1), p.key === g && (f = S - 1), p.key === D && (f = S + 1), s.loop ? f = (f + h.length) % h.length : f = Math.max(0, Math.min(f, h.length - 1)), p.preventDefault(), (y = h[f]) == null || y.focus();
        }
      }
    );
  }
);
Pe.displayName = "TabsTrigger";
const Be = i.forwardRef(
  ({ value: t, className: e, ...r }, n) => {
    const o = G("TabsContent"), a = o.value === t;
    return /* @__PURE__ */ l(
      "div",
      {
        ...r,
        ref: n,
        id: ae(o.baseId, t),
        role: "tabpanel",
        "aria-labelledby": ne(o.baseId, t),
        tabIndex: 0,
        hidden: !a,
        "data-slot": "tabs-content",
        "data-state": a ? "active" : "inactive",
        "data-orientation": o.orientation,
        className: u("slr-tabs__content", e)
      }
    );
  }
);
Be.displayName = "TabsContent";
const $e = i.forwardRef(
  ({ className: t, ...e }, r) => /* @__PURE__ */ l(
    "textarea",
    {
      ref: r,
      "data-slot": "textarea",
      className: u("slr-field slr-textarea", t),
      ...e
    }
  )
);
$e.displayName = "Textarea";
export {
  Ze as Badge,
  Q as Button,
  Je as Callout,
  Xe as CalloutDescription,
  Ke as CalloutIcon,
  Qe as CalloutTitle,
  et as Card,
  at as CardAction,
  ot as CardContent,
  nt as CardDescription,
  st as CardFooter,
  tt as CardHeader,
  rt as CardTitle,
  it as Dialog,
  ve as DialogClose,
  De as DialogContent,
  xe as DialogDescription,
  ct as DialogFooter,
  lt as DialogHeader,
  ee as DialogOverlay,
  Ne as DialogPortal,
  Re as DialogTitle,
  he as DialogTrigger,
  ut as DropdownMenu,
  Ee as DropdownMenuContent,
  ft as DropdownMenuGroup,
  Se as DropdownMenuItem,
  pt as DropdownMenuLabel,
  dt as DropdownMenuPortal,
  mt as DropdownMenuSeparator,
  _e as DropdownMenuTrigger,
  gt as Field,
  wt as FieldDescription,
  yt as FieldError,
  bt as FieldLabel,
  Le as IconButton,
  Me as Input,
  Ae as Label,
  ht as Section,
  Rt as SectionDescription,
  Nt as SectionEyebrow,
  vt as SectionHeader,
  Dt as SectionTitle,
  ke as Select,
  xt as Separator,
  Ye as SkipLink,
  M as Slot,
  Ve as Switch,
  Oe as Tabs,
  Be as TabsContent,
  Fe as TabsList,
  Pe as TabsTrigger,
  $e as Textarea,
  Ge as VisuallyHidden,
  ue as badgeVariants,
  de as buttonVariants,
  fe as calloutVariants,
  pe as cardVariants,
  u as cn
};
//# sourceMappingURL=index.js.map
