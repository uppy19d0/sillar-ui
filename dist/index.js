import { jsx as c, jsxs as P, Fragment as st } from "react/jsx-runtime";
import * as l from "react";
import { clsx as it } from "clsx";
import { twMerge as lt } from "tailwind-merge";
import { cva as $ } from "class-variance-authority";
import { createPortal as ct } from "react-dom";
function d(...t) {
  return lt(it(t));
}
function M(...t) {
  return (e) => {
    t.forEach((r) => {
      typeof r == "function" ? r(e) : r && (r.current = e);
    });
  };
}
function ut(t, e) {
  return (r) => {
    t == null || t(r), r.defaultPrevented || e == null || e(r);
  };
}
const T = l.forwardRef(
  ({ children: t, ...e }, r) => {
    if (!l.isValidElement(t))
      throw new Error("Sillar UI Slot expects exactly one valid React element.");
    const n = t.props, a = { ...e, ...n };
    Object.keys(e).forEach((s) => {
      /^on[A-Z]/.test(s) && typeof e[s] == "function" && (a[s] = ut(
        n[s],
        e[s]
      ));
    }), a.className = d(e.className, n.className), a.style = {
      ...e.style,
      ...n.style
    };
    const o = n.ref ?? t.ref;
    return a.ref = M(r, o), l.cloneElement(t, a);
  }
);
T.displayName = "Slot";
function Kt({ asChild: t = !1, className: e, ...r }) {
  return /* @__PURE__ */ c(t ? T : "span", { className: d("slr-visually-hidden", e), ...r });
}
function Qt({ className: t, ...e }) {
  return /* @__PURE__ */ c("a", { className: d("slr-skip-link", t), ...e });
}
const dt = $("slr-badge", {
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
function Xt({ className: t, variant: e, asChild: r = !1, ...n }) {
  return /* @__PURE__ */ c(
    r ? T : "span",
    {
      "data-slot": "badge",
      className: d(dt({ variant: e }), t),
      ...n
    }
  );
}
const ft = $("slr-button", {
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
}), X = l.forwardRef(
  ({ className: t, variant: e, size: r, asChild: n = !1, type: a, loading: o = !1, disabled: s, children: p, onClick: u, tabIndex: i, ...h }, f) => {
    const g = n ? T : "button", b = s || o, v = (N) => {
      if (b) {
        N.preventDefault();
        return;
      }
      u == null || u(N);
    };
    return /* @__PURE__ */ c(
      g,
      {
        ref: f,
        "data-slot": "button",
        "data-loading": o || void 0,
        className: d(ft({ variant: e, size: r }), t),
        type: n ? void 0 : a ?? "button",
        disabled: n ? void 0 : b,
        "aria-busy": o || void 0,
        "aria-disabled": n && b ? !0 : void 0,
        tabIndex: n && b ? -1 : i,
        onClick: v,
        ...h,
        children: n ? p : /* @__PURE__ */ P(st, { children: [
          o ? /* @__PURE__ */ c("span", { className: "slr-spinner", "aria-hidden": "true" }) : null,
          p
        ] })
      }
    );
  }
);
X.displayName = "Button";
const pt = $("slr-callout", {
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
function te({ className: t, variant: e, ...r }) {
  return /* @__PURE__ */ c(
    "div",
    {
      "data-slot": "callout",
      role: e === "danger" ? "alert" : void 0,
      className: d(pt({ variant: e }), t),
      ...r
    }
  );
}
function ee({ className: t, ...e }) {
  return /* @__PURE__ */ c("span", { "data-slot": "callout-icon", className: d("slr-callout__icon", t), ...e });
}
function re({ className: t, ...e }) {
  return /* @__PURE__ */ c("h3", { "data-slot": "callout-title", className: d("slr-callout__title", t), ...e });
}
function ne({ className: t, ...e }) {
  return /* @__PURE__ */ c("div", { "data-slot": "callout-description", className: d("slr-callout__description", t), ...e });
}
const mt = $("slr-card", {
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
function oe({ className: t, variant: e, ...r }) {
  return /* @__PURE__ */ c("div", { "data-slot": "card", className: d(mt({ variant: e }), t), ...r });
}
function ae({ className: t, ...e }) {
  return /* @__PURE__ */ c("div", { "data-slot": "card-header", className: d("slr-card__header", t), ...e });
}
function se({ className: t, ...e }) {
  return /* @__PURE__ */ c("h3", { "data-slot": "card-title", className: d("slr-card__title", t), ...e });
}
function ie({ className: t, ...e }) {
  return /* @__PURE__ */ c("p", { "data-slot": "card-description", className: d("slr-card__description", t), ...e });
}
function le({ className: t, ...e }) {
  return /* @__PURE__ */ c("div", { "data-slot": "card-action", className: d("slr-card__action", t), ...e });
}
function ce({ className: t, ...e }) {
  return /* @__PURE__ */ c("div", { "data-slot": "card-content", className: d("slr-card__content", t), ...e });
}
function ue({ className: t, ...e }) {
  return /* @__PURE__ */ c("div", { "data-slot": "card-footer", className: d("slr-card__footer", t), ...e });
}
const U = typeof window > "u" ? l.useEffect : l.useLayoutEffect;
function q({
  value: t,
  defaultValue: e,
  onChange: r
}) {
  const [n, a] = l.useState(e), o = t !== void 0, s = o ? t : n, p = l.useRef(s), u = l.useRef(o), i = l.useRef(r);
  p.current = s, u.current = o, i.current = r;
  const h = l.useCallback((f) => {
    var b;
    const g = typeof f == "function" ? f(p.current) : f;
    Object.is(g, p.current) || (p.current = g, u.current || a(g), (b = i.current) == null || b.call(i, g));
  }, []);
  return [s, h];
}
const gt = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])'
].join(",");
function Y(t) {
  return Array.from(t.querySelectorAll(gt)).filter((e) => !e.hidden && e.getAttribute("aria-hidden") !== "true");
}
const O = /* @__PURE__ */ new Map(), V = [];
let L = 0, Z = "";
function bt(t) {
  return V.push(t), () => {
    const e = V.lastIndexOf(t);
    e >= 0 && V.splice(e, 1);
  };
}
function J(t) {
  return V.at(-1) === t;
}
function ht() {
  return L === 0 && (Z = document.body.style.overflow, document.body.style.overflow = "hidden"), L += 1, () => {
    L = Math.max(0, L - 1), L === 0 && (document.body.style.overflow = Z);
  };
}
function wt(t) {
  const e = /* @__PURE__ */ new Set();
  let r = t, n = r.parentElement;
  for (; n; ) {
    for (const o of n.children)
      o instanceof HTMLElement && o !== r && !["SCRIPT", "STYLE", "LINK"].includes(o.tagName) && e.add(o);
    if (n === document.body) break;
    r = n, n = r.parentElement;
  }
  const a = [...e];
  return a.forEach((o) => {
    const s = O.get(o);
    if (s) {
      s.count += 1;
      return;
    }
    O.set(o, {
      count: 1,
      inert: o.inert === !0,
      ariaHidden: o.getAttribute("aria-hidden")
    }), o.inert = !0, o.setAttribute("aria-hidden", "true");
  }), () => {
    a.forEach((o) => {
      const s = O.get(o);
      s && (s.count -= 1, !(s.count > 0) && (o.inert = s.inert, s.ariaHidden === null ? o.removeAttribute("aria-hidden") : o.setAttribute("aria-hidden", s.ariaHidden), O.delete(o)));
    });
  };
}
function yt(t, e) {
  const r = document.activeElement, n = bt(t), a = () => {
    t.contains(document.activeElement) || (e.initialFocus ?? Y(t)[0] ?? t).focus({ preventScroll: !0 });
  }, o = window.requestAnimationFrame(a), s = (u) => {
    var g, b;
    if (!J(t)) return;
    if (u.key === "Escape") {
      (g = e.onEscapeKeyDown) == null || g.call(e, u), u.defaultPrevented || (b = e.onDismiss) == null || b.call(e);
      return;
    }
    if (u.key !== "Tab") return;
    const i = Y(t);
    if (i.length === 0) {
      u.preventDefault(), t.focus();
      return;
    }
    const h = i[0], f = i[i.length - 1];
    u.shiftKey && (document.activeElement === h || !t.contains(document.activeElement)) ? (u.preventDefault(), f.focus()) : !u.shiftKey && document.activeElement === f && (u.preventDefault(), h.focus());
  }, p = (u) => {
    !J(t) || t.contains(u.target) || a();
  };
  return document.addEventListener("keydown", s), document.addEventListener("focusin", p), () => {
    var i;
    window.cancelAnimationFrame(o), document.removeEventListener("keydown", s), document.removeEventListener("focusin", p), n();
    const u = e.finalFocus ?? e.fallbackFocus ?? r;
    (i = u == null ? void 0 : u.focus) == null || i.call(u, { preventScroll: !0 });
  };
}
function W({ children: t, container: e }) {
  return typeof document > "u" ? null : ct(t, e ?? document.body);
}
const tt = l.createContext(null);
function _(t) {
  const e = l.useContext(tt);
  if (!e) throw new Error(`${t} must be rendered inside Dialog.`);
  return e;
}
function de({ open: t, defaultOpen: e = !1, onOpenChange: r, children: n }) {
  const [a, o] = q({
    value: t,
    defaultValue: e,
    onChange: r
  }), s = l.useRef(null), p = l.useId(), u = l.useId(), [i, h] = l.useState(0), [f, g] = l.useState(0), b = l.useCallback(() => (h((y) => y + 1), () => h((y) => Math.max(0, y - 1))), []), v = l.useCallback(() => (g((y) => y + 1), () => g((y) => Math.max(0, y - 1))), []), N = l.useMemo(() => ({
    open: a,
    setOpen: o,
    triggerRef: s,
    titleId: p,
    descriptionId: u,
    hasTitle: i > 0,
    hasDescription: f > 0,
    registerTitle: b,
    registerDescription: v
  }), [
    f,
    u,
    v,
    b,
    a,
    o,
    i,
    p
  ]);
  return /* @__PURE__ */ c(tt.Provider, { value: N, children: n });
}
const vt = l.forwardRef(
  ({ asChild: t = !1, onClick: e, type: r, ...n }, a) => {
    const o = _("DialogTrigger");
    return /* @__PURE__ */ c(
      t ? T : "button",
      {
        ...n,
        ref: M(a, o.triggerRef),
        type: t ? void 0 : r ?? "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "data-state": o.open ? "open" : "closed",
        onClick: (p) => {
          e == null || e(p), p.defaultPrevented || o.setOpen(!0);
        }
      }
    );
  }
);
vt.displayName = "DialogTrigger";
const Nt = l.forwardRef(
  ({ asChild: t = !1, onClick: e, type: r, ...n }, a) => {
    const o = _("DialogClose");
    return /* @__PURE__ */ c(
      t ? T : "button",
      {
        ...n,
        ref: a,
        type: t ? void 0 : r ?? "button",
        onClick: (p) => {
          e == null || e(p), p.defaultPrevented || o.setOpen(!1);
        }
      }
    );
  }
);
Nt.displayName = "DialogClose";
function Dt({ children: t, container: e, className: r, ...n }) {
  const { open: a } = _("DialogPortal");
  return !a || typeof document > "u" ? null : /* @__PURE__ */ c(W, { container: e, children: /* @__PURE__ */ c("div", { ...n, "data-slot": "dialog-portal", className: d("slr-dialog__portal", r), children: t }) });
}
const et = l.forwardRef(
  ({ className: t, onPointerDown: e, ...r }, n) => {
    const a = _("DialogOverlay");
    return /* @__PURE__ */ c(
      "div",
      {
        ...r,
        ref: n,
        "data-slot": "dialog-overlay",
        "data-state": a.open ? "open" : "closed",
        className: d("slr-dialog__overlay", t),
        onPointerDown: (o) => {
          e == null || e(o), !o.defaultPrevented && o.target === o.currentTarget && a.setOpen(!1);
        }
      }
    );
  }
);
et.displayName = "DialogOverlay";
const Rt = l.forwardRef(
  ({
    className: t,
    overlayClassName: e,
    children: r,
    portalContainer: n,
    initialFocusRef: a,
    finalFocusRef: o,
    onEscapeKeyDown: s,
    role: p = "dialog",
    "aria-label": u,
    "aria-labelledby": i,
    "aria-describedby": h,
    ...f
  }, g) => {
    const b = _("DialogContent"), v = l.useRef(null), N = l.useRef(b.setOpen), y = l.useRef(s), D = l.useRef(a), m = l.useRef(o);
    return N.current = b.setOpen, y.current = s, D.current = a, m.current = o, l.useEffect(() => {
      var E, S;
      if (!b.open) return;
      const w = v.current;
      if (!w) return;
      const R = w.closest('[data-slot="dialog-portal"]'), x = ht(), I = R ? wt(R) : () => {
      }, A = yt(w, {
        initialFocus: (E = D.current) == null ? void 0 : E.current,
        finalFocus: (S = m.current) == null ? void 0 : S.current,
        fallbackFocus: b.triggerRef.current,
        onEscapeKeyDown: (C) => {
          var B;
          return (B = y.current) == null ? void 0 : B.call(y, C);
        },
        onDismiss: () => N.current(!1)
      });
      return () => {
        I(), x(), A();
      };
    }, [b.open, b.triggerRef]), /* @__PURE__ */ P(Dt, { container: n, children: [
      /* @__PURE__ */ c(et, { className: e }),
      /* @__PURE__ */ c(
        "div",
        {
          ...f,
          ref: M(v, g),
          "data-slot": "dialog-content",
          "data-state": b.open ? "open" : "closed",
          role: p,
          "aria-modal": "true",
          "aria-label": u,
          "aria-labelledby": i ?? (!u && b.hasTitle ? b.titleId : void 0),
          "aria-describedby": h ?? (b.hasDescription ? b.descriptionId : void 0),
          tabIndex: -1,
          className: d("slr-dialog__content", t),
          children: r
        }
      )
    ] });
  }
);
Rt.displayName = "DialogContent";
const fe = ({ className: t, ...e }) => /* @__PURE__ */ c("div", { "data-slot": "dialog-header", className: d("slr-dialog__header", t), ...e }), pe = ({ className: t, ...e }) => /* @__PURE__ */ c("div", { "data-slot": "dialog-footer", className: d("slr-dialog__footer", t), ...e }), xt = l.forwardRef(
  ({ className: t, ...e }, r) => {
    const { titleId: n, registerTitle: a } = _("DialogTitle");
    return U(() => a(), [a]), /* @__PURE__ */ c("h2", { ...e, ref: r, id: n, className: d("slr-dialog__title", t) });
  }
);
xt.displayName = "DialogTitle";
const It = l.forwardRef(
  ({ className: t, ...e }, r) => {
    const { descriptionId: n, registerDescription: a } = _("DialogDescription");
    return U(() => a(), [a]), /* @__PURE__ */ c("p", { ...e, ref: r, id: n, className: d("slr-dialog__description", t) });
  }
);
It.displayName = "DialogDescription";
function Tt(t, e) {
  const r = (n) => {
    var o;
    const a = n.target;
    t.contains(a) || (o = e.branches) != null && o.some((s) => s == null ? void 0 : s.contains(a)) || e.onDismiss();
  };
  return document.addEventListener("pointerdown", r), () => document.removeEventListener("pointerdown", r);
}
function K(t, e, r) {
  return Math.max(e, Math.min(t, r));
}
function _t(t, e, r, n = {}) {
  const {
    side: a = "bottom",
    align: o = "start",
    sideOffset: s = 6,
    collisionPadding: p = 8,
    avoidCollisions: u = !0,
    direction: i = "ltr",
    matchAnchorWidth: h = !1
  } = n, f = {
    top: t.top - p,
    right: r.width - t.right - p,
    bottom: r.height - t.bottom - p,
    left: t.left - p
  }, g = a === "top" || a === "bottom" ? e.height : e.width, b = { top: "bottom", right: "left", bottom: "top", left: "right" }, v = u && f[a] < g && f[b[a]] > f[a] ? b[a] : a, N = v === "top" || v === "bottom", y = i === "rtl" ? "end" : "start";
  let D, m;
  return N ? (o === "center" ? D = t.left + (t.width - e.width) / 2 : o === y ? D = t.left : D = t.right - e.width, m = v === "bottom" ? t.bottom + s : t.top - e.height - s) : (D = v === "right" ? t.right + s : t.left - e.width - s, o === "center" ? m = t.top + (t.height - e.height) / 2 : o === "start" ? m = t.top : m = t.bottom - e.height), u && (D = K(D, p, r.width - e.width - p), m = K(m, p, r.height - e.height - p)), {
    side: v,
    style: {
      position: "fixed",
      top: m,
      left: D,
      visibility: "visible",
      ...h ? { minWidth: t.width } : {}
    }
  };
}
function Et(t, e, r) {
  r();
  const n = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
  return n == null || n.observe(t), n == null || n.observe(e), window.addEventListener("resize", r), window.addEventListener("scroll", r, !0), () => {
    n == null || n.disconnect(), window.removeEventListener("resize", r), window.removeEventListener("scroll", r, !0);
  };
}
function F(t, e, { direction: r, loop: n = !0 }) {
  if (t.length === 0) return null;
  if (r === "first") return t[0];
  if (r === "last") return t.at(-1) ?? null;
  const s = Math.max(0, t.indexOf(e ?? t[0])) + (r === "next" ? 1 : -1), p = n ? (s + t.length) % t.length : Math.max(0, Math.min(s, t.length - 1));
  return t[p] ?? null;
}
const rt = l.createContext(null), St = '[role="menuitem"]:not([disabled]):not([aria-disabled="true"])';
function z(t) {
  const e = l.useContext(rt);
  if (!e) throw new Error(`${t} must be rendered inside DropdownMenu.`);
  return e;
}
function Q(t) {
  return Array.from(t.querySelectorAll(St));
}
function me({ open: t, defaultOpen: e = !1, onOpenChange: r, children: n }) {
  const [a, o] = q({
    value: t,
    defaultValue: e,
    onChange: r
  }), [s, p] = l.useState("first"), u = l.useRef(null), i = l.useId(), h = l.useMemo(
    () => ({ open: a, setOpen: o, triggerRef: u, contentId: i, focusIntent: s, setFocusIntent: p }),
    [i, s, a, o]
  );
  return /* @__PURE__ */ c(rt.Provider, { value: h, children: n });
}
const Ct = l.forwardRef(
  ({ asChild: t = !1, onClick: e, onKeyDown: r, type: n, ...a }, o) => {
    const s = z("DropdownMenuTrigger"), p = t ? T : "button", u = (i) => {
      s.setFocusIntent(i), s.setOpen(!0);
    };
    return /* @__PURE__ */ c(
      p,
      {
        ...a,
        ref: M(o, s.triggerRef),
        type: t ? void 0 : n ?? "button",
        "aria-haspopup": "menu",
        "aria-expanded": s.open,
        "aria-controls": s.open ? s.contentId : void 0,
        "data-state": s.open ? "open" : "closed",
        onClick: (i) => {
          e == null || e(i), !i.defaultPrevented && (s.open || s.setFocusIntent("first"), s.setOpen(!s.open));
        },
        onKeyDown: (i) => {
          r == null || r(i), !i.defaultPrevented && (i.key === "ArrowDown" || i.key === "Enter" || i.key === " " ? (i.preventDefault(), u("first")) : i.key === "ArrowUp" && (i.preventDefault(), u("last")));
        }
      }
    );
  }
);
Ct.displayName = "DropdownMenuTrigger";
function ge({ children: t, container: e }) {
  const { open: r } = z("DropdownMenuPortal");
  return !r || typeof document > "u" ? null : /* @__PURE__ */ c(W, { container: e, children: t });
}
const Lt = l.forwardRef(
  ({
    className: t,
    align: e = "start",
    side: r = "bottom",
    sideOffset: n = 6,
    collisionPadding: a = 8,
    avoidCollisions: o = !0,
    portalContainer: s,
    style: p,
    onKeyDown: u,
    children: i,
    ...h
  }, f) => {
    const g = z("DropdownMenuContent"), b = l.useRef(null), v = l.useRef(g.setOpen), N = l.useRef({ value: "", time: 0 }), [y, D] = l.useState({ side: r, style: { visibility: "hidden" } });
    return v.current = g.setOpen, U(() => {
      if (!g.open) return;
      const m = g.triggerRef.current, w = b.current;
      return !m || !w ? void 0 : Et(m, w, () => {
        const x = window.getComputedStyle(m).direction;
        D(_t(
          m.getBoundingClientRect(),
          { width: w.offsetWidth, height: w.offsetHeight },
          { width: window.innerWidth, height: window.innerHeight },
          {
            side: r,
            align: e,
            sideOffset: n,
            collisionPadding: a,
            avoidCollisions: o,
            direction: x === "rtl" ? "rtl" : "ltr",
            matchAnchorWidth: !0
          }
        ));
      });
    }, [e, o, a, g.open, g.triggerRef, r, n]), l.useEffect(() => {
      if (!g.open) return;
      const m = window.requestAnimationFrame(() => {
        const R = b.current;
        if (!R) return;
        const x = Q(R), I = g.focusIntent === "last" ? x.at(-1) : x[0];
        I == null || I.focus({ preventScroll: !0 });
      }), w = b.current ? Tt(b.current, {
        branches: [g.triggerRef.current],
        onDismiss: () => v.current(!1)
      }) : () => {
      };
      return () => {
        window.cancelAnimationFrame(m), w(), N.current = { value: "", time: 0 };
      };
    }, [g.focusIntent, g.open, g.triggerRef]), !g.open || typeof document > "u" ? null : /* @__PURE__ */ c(W, { container: s, children: /* @__PURE__ */ c(
      "div",
      {
        ...h,
        ref: M(b, f),
        id: g.contentId,
        role: "menu",
        "data-slot": "dropdown-menu-content",
        "data-state": "open",
        "data-side": y.side,
        className: d("slr-dropdown__content", t),
        style: { ...y.style, ...p },
        onKeyDown: (m) => {
          var x, I, A, E;
          if (u == null || u(m), m.defaultPrevented) return;
          const w = Q(m.currentTarget), R = w.indexOf(document.activeElement);
          if (m.key === "Escape")
            m.preventDefault(), g.setOpen(!1), (x = g.triggerRef.current) == null || x.focus({ preventScroll: !0 });
          else if (m.key === "ArrowDown" || m.key === "ArrowUp") {
            if (m.preventDefault(), w.length === 0) return;
            (I = F(w, w[R], {
              direction: m.key === "ArrowDown" ? "next" : "previous"
            })) == null || I.focus();
          } else if (m.key === "Home")
            m.preventDefault(), (A = F(w, w[R], { direction: "first" })) == null || A.focus();
          else if (m.key === "End")
            m.preventDefault(), (E = F(w, w[R], { direction: "last" })) == null || E.focus();
          else if (m.key === "Tab")
            g.setOpen(!1);
          else if (m.key.length === 1 && m.key !== " " && !m.ctrlKey && !m.metaKey && !m.altKey) {
            const S = Date.now(), C = S - N.current.time < 700 ? N.current.value : "", j = C.length > 0 && C.split("").every((k) => k === m.key.toLowerCase()) ? m.key.toLowerCase() : `${C}${m.key.toLowerCase()}`;
            N.current = { value: j, time: S };
            const G = [...w.slice(R + 1), ...w.slice(0, R + 1)].find((k) => (k.dataset.textValue ?? k.textContent ?? "").trim().toLocaleLowerCase().startsWith(j));
            G && (m.preventDefault(), G.focus());
          }
        },
        children: i
      }
    ) });
  }
);
Lt.displayName = "DropdownMenuContent";
const Mt = l.forwardRef(
  ({ className: t, inset: e, variant: r = "default", textValue: n, onClick: a, onPointerMove: o, type: s, ...p }, u) => {
    const i = z("DropdownMenuItem");
    return /* @__PURE__ */ c(
      "button",
      {
        ...p,
        ref: u,
        type: s ?? "button",
        role: "menuitem",
        tabIndex: -1,
        "data-inset": e || void 0,
        "data-variant": r,
        "data-text-value": n,
        className: d("slr-dropdown__item", t),
        onPointerMove: (h) => {
          o == null || o(h), !h.defaultPrevented && !h.currentTarget.disabled && h.currentTarget.focus();
        },
        onClick: (h) => {
          var f;
          a == null || a(h), h.defaultPrevented || (i.setOpen(!1), (f = i.triggerRef.current) == null || f.focus({ preventScroll: !0 }));
        }
      }
    );
  }
);
Mt.displayName = "DropdownMenuItem";
function be(t) {
  return /* @__PURE__ */ c("div", { role: "group", "data-slot": "dropdown-menu-group", ...t });
}
function he({ className: t, ...e }) {
  return /* @__PURE__ */ c("div", { "data-slot": "dropdown-menu-label", className: d("slr-dropdown__label", t), ...e });
}
function we({ className: t, ...e }) {
  return /* @__PURE__ */ c("hr", { "data-slot": "dropdown-menu-separator", className: d("slr-dropdown__separator", t), ...e });
}
function ye({ className: t, invalid: e = !1, ...r }) {
  return /* @__PURE__ */ c(
    "div",
    {
      "data-slot": "field",
      "data-invalid": e || void 0,
      className: d("slr-field-group", t),
      ...r
    }
  );
}
function ve({ className: t, required: e = !1, children: r, ...n }) {
  return /* @__PURE__ */ P("label", { "data-slot": "field-label", className: d("slr-field-label", t), ...n, children: [
    r,
    e ? /* @__PURE__ */ c("span", { className: "slr-field-required", "aria-hidden": "true", children: "*" }) : null
  ] });
}
function Ne({ className: t, ...e }) {
  return /* @__PURE__ */ c("p", { "data-slot": "field-description", className: d("slr-field-description", t), ...e });
}
function De({ className: t, ...e }) {
  return /* @__PURE__ */ c("p", { "data-slot": "field-error", role: "alert", className: d("slr-field-error", t), ...e });
}
const At = {
  sm: "iconSm",
  default: "icon",
  lg: "iconLg"
}, kt = l.forwardRef(
  ({ label: t, tooltip: e, size: r = "default", children: n, ...a }, o) => /* @__PURE__ */ c(
    X,
    {
      ref: o,
      size: At[r],
      "aria-label": t,
      title: e,
      ...a,
      children: n
    }
  )
);
kt.displayName = "IconButton";
const Ot = l.forwardRef(
  ({ className: t, type: e, ...r }, n) => /* @__PURE__ */ c(
    "input",
    {
      ref: n,
      type: e,
      "data-slot": "input",
      className: d("slr-field slr-input", t),
      ...r
    }
  )
);
Ot.displayName = "Input";
const Vt = l.forwardRef(
  ({ className: t, ...e }, r) => /* @__PURE__ */ c("label", { ref: r, "data-slot": "label", className: d("slr-label", t), ...e })
);
Vt.displayName = "Label";
const Ft = l.forwardRef(
  ({ className: t, wrapperClassName: e, children: r, ...n }, a) => /* @__PURE__ */ P("span", { className: d("slr-select-wrap", e), children: [
    /* @__PURE__ */ c("select", { ref: a, "data-slot": "select", className: d("slr-field slr-select", t), ...n, children: r }),
    /* @__PURE__ */ c("span", { className: "slr-select-chevron", "aria-hidden": "true" })
  ] })
);
Ft.displayName = "Select";
function Re({ className: t, containerClassName: e, children: r, ...n }) {
  return /* @__PURE__ */ c("section", { className: d("slr-section", t), ...n, children: /* @__PURE__ */ c("div", { className: d("slr-container", e), children: r }) });
}
function xe({ className: t, ...e }) {
  return /* @__PURE__ */ c("header", { className: d("slr-section-header", t), ...e });
}
function Ie({ className: t, ...e }) {
  return /* @__PURE__ */ c("span", { className: d("slr-eyebrow", t), ...e });
}
function Te({ className: t, ...e }) {
  return /* @__PURE__ */ c("h2", { className: d("slr-section-title", t), ...e });
}
function _e({ className: t, ...e }) {
  return /* @__PURE__ */ c("p", { className: d("slr-section-description", t), ...e });
}
function Ee({
  className: t,
  orientation: e = "horizontal",
  decorative: r = !0,
  ...n
}) {
  return /* @__PURE__ */ c(
    "div",
    {
      "data-slot": "separator",
      "data-orientation": e,
      role: r ? "none" : "separator",
      "aria-orientation": r ? void 0 : e,
      className: d("slr-separator", t),
      ...n
    }
  );
}
const Pt = l.forwardRef(
  ({ checked: t, defaultChecked: e = !1, onCheckedChange: r, onClick: n, className: a, disabled: o, type: s, ...p }, u) => {
    const [i, h] = q({
      value: t,
      defaultValue: e,
      onChange: r
    });
    return /* @__PURE__ */ c(
      "button",
      {
        ...p,
        ref: u,
        type: s ?? "button",
        role: "switch",
        "aria-checked": i,
        disabled: o,
        "data-slot": "switch",
        "data-state": i ? "checked" : "unchecked",
        className: d("slr-switch", a),
        onClick: (f) => {
          n == null || n(f), !f.defaultPrevented && !o && h((g) => !g);
        },
        children: /* @__PURE__ */ c("span", { className: "slr-switch__thumb", "data-state": i ? "checked" : "unchecked" })
      }
    );
  }
);
Pt.displayName = "Switch";
const nt = l.createContext(null);
function H(t) {
  const e = l.useContext(nt);
  if (!e) throw new Error(`${t} must be rendered inside Tabs.`);
  return e;
}
function ot(t, e) {
  return `${t}-tab-${encodeURIComponent(e)}`;
}
function at(t, e) {
  return `${t}-panel-${encodeURIComponent(e)}`;
}
const $t = l.forwardRef(
  ({
    value: t,
    defaultValue: e,
    onValueChange: r,
    orientation: n = "horizontal",
    activationMode: a = "automatic",
    loop: o = !0,
    className: s,
    children: p,
    ...u
  }, i) => {
    const [h, f] = q({
      value: t,
      defaultValue: e ?? "",
      onChange: r
    }), g = l.useId(), b = l.useMemo(() => ({
      value: h,
      setValue: f,
      orientation: n,
      activationMode: a,
      loop: o,
      baseId: g
    }), [a, g, o, n, h, f]);
    return /* @__PURE__ */ c(nt.Provider, { value: b, children: /* @__PURE__ */ c(
      "div",
      {
        ...u,
        ref: i,
        "data-slot": "tabs",
        "data-orientation": n,
        className: d("slr-tabs", s),
        children: p
      }
    ) });
  }
);
$t.displayName = "Tabs";
const qt = l.forwardRef(
  ({ className: t, ...e }, r) => {
    const { orientation: n } = H("TabsList");
    return /* @__PURE__ */ c(
      "div",
      {
        ...e,
        ref: r,
        role: "tablist",
        "aria-orientation": n,
        "data-slot": "tabs-list",
        "data-orientation": n,
        className: d("slr-tabs__list", t)
      }
    );
  }
);
qt.displayName = "TabsList";
const zt = l.forwardRef(
  ({ value: t, className: e, disabled: r, onClick: n, onFocus: a, onKeyDown: o, type: s, ...p }, u) => {
    const i = H("TabsTrigger"), h = i.value === t;
    return /* @__PURE__ */ c(
      "button",
      {
        ...p,
        ref: u,
        id: ot(i.baseId, t),
        type: s ?? "button",
        role: "tab",
        "aria-selected": h,
        "aria-controls": at(i.baseId, t),
        tabIndex: h ? 0 : -1,
        disabled: r,
        "data-slot": "tabs-trigger",
        "data-state": h ? "active" : "inactive",
        "data-orientation": i.orientation,
        className: d("slr-tabs__trigger", e),
        onClick: (f) => {
          n == null || n(f), !f.defaultPrevented && !r && i.setValue(t);
        },
        onFocus: (f) => {
          a == null || a(f), !f.defaultPrevented && !r && i.activationMode === "automatic" && i.setValue(t);
        },
        onKeyDown: (f) => {
          var m;
          if (o == null || o(f), f.defaultPrevented) return;
          if (i.activationMode === "manual" && ["Enter", " "].includes(f.key)) {
            f.preventDefault(), i.setValue(t);
            return;
          }
          const g = i.orientation === "horizontal" && window.getComputedStyle(f.currentTarget).direction === "rtl", b = i.orientation === "horizontal" ? g ? "ArrowRight" : "ArrowLeft" : "ArrowUp", v = i.orientation === "horizontal" ? g ? "ArrowLeft" : "ArrowRight" : "ArrowDown";
          if (![b, v, "Home", "End"].includes(f.key)) return;
          const N = f.currentTarget.closest('[role="tablist"]'), y = Array.from((N == null ? void 0 : N.querySelectorAll('[role="tab"]:not([disabled])')) ?? []);
          f.preventDefault();
          const D = f.key === "Home" ? "first" : f.key === "End" ? "last" : f.key === b ? "previous" : "next";
          (m = F(y, f.currentTarget, { direction: D, loop: i.loop })) == null || m.focus();
        }
      }
    );
  }
);
zt.displayName = "TabsTrigger";
const Bt = l.forwardRef(
  ({ value: t, className: e, ...r }, n) => {
    const a = H("TabsContent"), o = a.value === t;
    return /* @__PURE__ */ c(
      "div",
      {
        ...r,
        ref: n,
        id: at(a.baseId, t),
        role: "tabpanel",
        "aria-labelledby": ot(a.baseId, t),
        tabIndex: 0,
        hidden: !o,
        "data-slot": "tabs-content",
        "data-state": o ? "active" : "inactive",
        "data-orientation": a.orientation,
        className: d("slr-tabs__content", e)
      }
    );
  }
);
Bt.displayName = "TabsContent";
const Ut = l.forwardRef(
  ({ className: t, ...e }, r) => /* @__PURE__ */ c(
    "textarea",
    {
      ref: r,
      "data-slot": "textarea",
      className: d("slr-field slr-textarea", t),
      ...e
    }
  )
);
Ut.displayName = "Textarea";
export {
  Xt as Badge,
  X as Button,
  te as Callout,
  ne as CalloutDescription,
  ee as CalloutIcon,
  re as CalloutTitle,
  oe as Card,
  le as CardAction,
  ce as CardContent,
  ie as CardDescription,
  ue as CardFooter,
  ae as CardHeader,
  se as CardTitle,
  de as Dialog,
  Nt as DialogClose,
  Rt as DialogContent,
  It as DialogDescription,
  pe as DialogFooter,
  fe as DialogHeader,
  et as DialogOverlay,
  Dt as DialogPortal,
  xt as DialogTitle,
  vt as DialogTrigger,
  me as DropdownMenu,
  Lt as DropdownMenuContent,
  be as DropdownMenuGroup,
  Mt as DropdownMenuItem,
  he as DropdownMenuLabel,
  ge as DropdownMenuPortal,
  we as DropdownMenuSeparator,
  Ct as DropdownMenuTrigger,
  ye as Field,
  Ne as FieldDescription,
  De as FieldError,
  ve as FieldLabel,
  kt as IconButton,
  Ot as Input,
  Vt as Label,
  Re as Section,
  _e as SectionDescription,
  Ie as SectionEyebrow,
  xe as SectionHeader,
  Te as SectionTitle,
  Ft as Select,
  Ee as Separator,
  Qt as SkipLink,
  T as Slot,
  Pt as Switch,
  $t as Tabs,
  Bt as TabsContent,
  qt as TabsList,
  zt as TabsTrigger,
  Ut as Textarea,
  Kt as VisuallyHidden,
  dt as badgeVariants,
  ft as buttonVariants,
  pt as calloutVariants,
  mt as cardVariants,
  d as cn
};
//# sourceMappingURL=index.js.map
