import { jsx as i, jsxs as z, Fragment as ot } from "react/jsx-runtime";
import * as s from "react";
import { clsx as st } from "clsx";
import { twMerge as it } from "tailwind-merge";
import { cva as q } from "class-variance-authority";
import { createPortal as G } from "react-dom";
function d(...e) {
  return it(st(e));
}
function P(...e) {
  return (t) => {
    e.forEach((r) => {
      typeof r == "function" ? r(t) : r && (r.current = t);
    });
  };
}
function lt(e, t) {
  return (r) => {
    e == null || e(r), r.defaultPrevented || t == null || t(r);
  };
}
const V = s.forwardRef(
  ({ children: e, ...t }, r) => {
    if (!s.isValidElement(e))
      throw new Error("Sillar UI Slot expects exactly one valid React element.");
    const n = e.props, o = { ...t, ...n };
    Object.keys(t).forEach((l) => {
      /^on[A-Z]/.test(l) && typeof t[l] == "function" && (o[l] = lt(
        n[l],
        t[l]
      ));
    }), o.className = d(t.className, n.className), o.style = {
      ...t.style,
      ...n.style
    };
    const a = n.ref ?? e.ref;
    return o.ref = P(r, a), s.cloneElement(e, o);
  }
);
V.displayName = "Slot";
function qt({ asChild: e = !1, className: t, ...r }) {
  return /* @__PURE__ */ i(e ? V : "span", { className: d("slr-visually-hidden", t), ...r });
}
function Ht({ className: e, ...t }) {
  return /* @__PURE__ */ i("a", { className: d("slr-skip-link", e), ...t });
}
const ct = q("slr-badge", {
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
function Ut({ className: e, variant: t, asChild: r = !1, ...n }) {
  return /* @__PURE__ */ i(
    r ? V : "span",
    {
      "data-slot": "badge",
      className: d(ct({ variant: t }), e),
      ...n
    }
  );
}
const dt = q("slr-button", {
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
}), X = s.forwardRef(
  ({ className: e, variant: t, size: r, asChild: n = !1, type: o, loading: a = !1, disabled: l, children: b, onClick: w, tabIndex: c, ...y }, f) => {
    const m = n ? V : "button", g = l || a, T = (x) => {
      if (g) {
        x.preventDefault();
        return;
      }
      w == null || w(x);
    };
    return /* @__PURE__ */ i(
      m,
      {
        ref: f,
        "data-slot": "button",
        "data-loading": a || void 0,
        className: d(dt({ variant: t, size: r }), e),
        type: n ? void 0 : o ?? "button",
        disabled: n ? void 0 : g,
        "aria-busy": a || void 0,
        "aria-disabled": n && g ? !0 : void 0,
        tabIndex: n && g ? -1 : c,
        onClick: T,
        ...y,
        children: n ? b : /* @__PURE__ */ z(ot, { children: [
          a ? /* @__PURE__ */ i("span", { className: "slr-spinner", "aria-hidden": "true" }) : null,
          b
        ] })
      }
    );
  }
);
X.displayName = "Button";
const ut = q("slr-callout", {
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
function jt({ className: e, variant: t, ...r }) {
  return /* @__PURE__ */ i(
    "div",
    {
      "data-slot": "callout",
      role: t === "danger" ? "alert" : void 0,
      className: d(ut({ variant: t }), e),
      ...r
    }
  );
}
function Wt({ className: e, ...t }) {
  return /* @__PURE__ */ i("span", { "data-slot": "callout-icon", className: d("slr-callout__icon", e), ...t });
}
function Gt({ className: e, ...t }) {
  return /* @__PURE__ */ i("h3", { "data-slot": "callout-title", className: d("slr-callout__title", e), ...t });
}
function Yt({ className: e, ...t }) {
  return /* @__PURE__ */ i("div", { "data-slot": "callout-description", className: d("slr-callout__description", e), ...t });
}
const ft = q("slr-card", {
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
function Zt({ className: e, variant: t, ...r }) {
  return /* @__PURE__ */ i("div", { "data-slot": "card", className: d(ft({ variant: t }), e), ...r });
}
function Jt({ className: e, ...t }) {
  return /* @__PURE__ */ i("div", { "data-slot": "card-header", className: d("slr-card__header", e), ...t });
}
function Qt({ className: e, ...t }) {
  return /* @__PURE__ */ i("h3", { "data-slot": "card-title", className: d("slr-card__title", e), ...t });
}
function Xt({ className: e, ...t }) {
  return /* @__PURE__ */ i("p", { "data-slot": "card-description", className: d("slr-card__description", e), ...t });
}
function Kt({ className: e, ...t }) {
  return /* @__PURE__ */ i("div", { "data-slot": "card-action", className: d("slr-card__action", e), ...t });
}
function te({ className: e, ...t }) {
  return /* @__PURE__ */ i("div", { "data-slot": "card-content", className: d("slr-card__content", e), ...t });
}
function ee({ className: e, ...t }) {
  return /* @__PURE__ */ i("div", { "data-slot": "card-footer", className: d("slr-card__footer", e), ...t });
}
const Y = typeof window > "u" ? s.useEffect : s.useLayoutEffect;
function H({
  value: e,
  defaultValue: t,
  onChange: r
}) {
  const [n, o] = s.useState(t), a = e !== void 0, l = a ? e : n, b = s.useRef(l), w = s.useRef(a), c = s.useRef(r);
  b.current = l, w.current = a, c.current = r;
  const y = s.useCallback((f) => {
    var g;
    const m = typeof f == "function" ? f(b.current) : f;
    Object.is(m, b.current) || (b.current = m, w.current || o(m), (g = c.current) == null || g.call(c, m));
  }, []);
  return [l, y];
}
const pt = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])'
].join(",");
function W(e) {
  return Array.from(e.querySelectorAll(pt)).filter((t) => !t.hidden && t.getAttribute("aria-hidden") !== "true");
}
const K = s.createContext(null), B = /* @__PURE__ */ new Map(), $ = [];
let F = 0, J = "";
function O(e) {
  const t = s.useContext(K);
  if (!t) throw new Error(`${e} must be rendered inside Dialog.`);
  return t;
}
function mt() {
  return F === 0 && (J = document.body.style.overflow, document.body.style.overflow = "hidden"), F += 1, () => {
    F = Math.max(0, F - 1), F === 0 && (document.body.style.overflow = J);
  };
}
function gt(e) {
  const t = /* @__PURE__ */ new Set();
  let r = e, n = r.parentElement;
  for (; n; ) {
    for (const a of n.children)
      a instanceof HTMLElement && a !== r && !["SCRIPT", "STYLE", "LINK"].includes(a.tagName) && t.add(a);
    if (n === document.body) break;
    r = n, n = r.parentElement;
  }
  const o = [...t];
  return o.forEach((a) => {
    const l = B.get(a);
    if (l) {
      l.count += 1;
      return;
    }
    B.set(a, {
      count: 1,
      inert: a.inert === !0,
      ariaHidden: a.getAttribute("aria-hidden")
    }), a.inert = !0, a.setAttribute("aria-hidden", "true");
  }), () => {
    o.forEach((a) => {
      const l = B.get(a);
      l && (l.count -= 1, !(l.count > 0) && (a.inert = l.inert, l.ariaHidden === null ? a.removeAttribute("aria-hidden") : a.setAttribute("aria-hidden", l.ariaHidden), B.delete(a)));
    });
  };
}
function re({ open: e, defaultOpen: t = !1, onOpenChange: r, children: n }) {
  const [o, a] = H({
    value: e,
    defaultValue: t,
    onChange: r
  }), l = s.useRef(null), b = s.useId(), w = s.useId(), [c, y] = s.useState(0), [f, m] = s.useState(0), g = s.useCallback(() => (y((R) => R + 1), () => y((R) => Math.max(0, R - 1))), []), T = s.useCallback(() => (m((R) => R + 1), () => m((R) => Math.max(0, R - 1))), []), x = s.useMemo(() => ({
    open: o,
    setOpen: a,
    triggerRef: l,
    titleId: b,
    descriptionId: w,
    hasTitle: c > 0,
    hasDescription: f > 0,
    registerTitle: g,
    registerDescription: T
  }), [
    f,
    w,
    T,
    g,
    o,
    a,
    c,
    b
  ]);
  return /* @__PURE__ */ i(K.Provider, { value: x, children: n });
}
const bt = s.forwardRef(
  ({ asChild: e = !1, onClick: t, type: r, ...n }, o) => {
    const a = O("DialogTrigger");
    return /* @__PURE__ */ i(
      e ? V : "button",
      {
        ...n,
        ref: P(o, a.triggerRef),
        type: e ? void 0 : r ?? "button",
        "aria-haspopup": "dialog",
        "aria-expanded": a.open,
        "data-state": a.open ? "open" : "closed",
        onClick: (b) => {
          t == null || t(b), b.defaultPrevented || a.setOpen(!0);
        }
      }
    );
  }
);
bt.displayName = "DialogTrigger";
const wt = s.forwardRef(
  ({ asChild: e = !1, onClick: t, type: r, ...n }, o) => {
    const a = O("DialogClose");
    return /* @__PURE__ */ i(
      e ? V : "button",
      {
        ...n,
        ref: o,
        type: e ? void 0 : r ?? "button",
        onClick: (b) => {
          t == null || t(b), b.defaultPrevented || a.setOpen(!1);
        }
      }
    );
  }
);
wt.displayName = "DialogClose";
function yt({ children: e, container: t, className: r, ...n }) {
  const { open: o } = O("DialogPortal");
  return !o || typeof document > "u" ? null : G(
    /* @__PURE__ */ i("div", { ...n, "data-slot": "dialog-portal", className: d("slr-dialog__portal", r), children: e }),
    t ?? document.body
  );
}
const tt = s.forwardRef(
  ({ className: e, onPointerDown: t, ...r }, n) => {
    const o = O("DialogOverlay");
    return /* @__PURE__ */ i(
      "div",
      {
        ...r,
        ref: n,
        "data-slot": "dialog-overlay",
        "data-state": o.open ? "open" : "closed",
        className: d("slr-dialog__overlay", e),
        onPointerDown: (a) => {
          t == null || t(a), !a.defaultPrevented && a.target === a.currentTarget && o.setOpen(!1);
        }
      }
    );
  }
);
tt.displayName = "DialogOverlay";
const ht = s.forwardRef(
  ({
    className: e,
    overlayClassName: t,
    children: r,
    portalContainer: n,
    initialFocusRef: o,
    finalFocusRef: a,
    onEscapeKeyDown: l,
    role: b = "dialog",
    "aria-label": w,
    "aria-labelledby": c,
    "aria-describedby": y,
    ...f
  }, m) => {
    const g = O("DialogContent"), T = s.useRef(null), x = s.useRef(g.setOpen), R = s.useRef(l), M = s.useRef(o), u = s.useRef(a);
    return x.current = g.setOpen, R.current = l, M.current = o, u.current = a, s.useEffect(() => {
      if (!g.open) return;
      const p = T.current;
      if (!p) return;
      const I = document.activeElement, D = p.closest('[data-slot="dialog-portal"]'), h = mt(), _ = D ? gt(D) : () => {
      };
      $.push(p);
      const A = window.requestAnimationFrame(() => {
        var N;
        if (p.contains(document.activeElement)) return;
        (((N = M.current) == null ? void 0 : N.current) ?? W(p)[0] ?? p).focus({ preventScroll: !0 });
      }), C = () => $.at(-1) === p, L = (v) => {
        var j;
        if (!C()) return;
        if (v.key === "Escape") {
          (j = R.current) == null || j.call(R, v), v.defaultPrevented || x.current(!1);
          return;
        }
        if (v.key !== "Tab") return;
        const N = W(p);
        if (N.length === 0) {
          v.preventDefault(), p.focus();
          return;
        }
        const S = N[0], E = N[N.length - 1];
        v.shiftKey && (document.activeElement === S || !p.contains(document.activeElement)) ? (v.preventDefault(), E.focus()) : !v.shiftKey && document.activeElement === E && (v.preventDefault(), S.focus());
      }, k = (v) => {
        var N;
        !C() || p.contains(v.target) || (((N = M.current) == null ? void 0 : N.current) ?? W(p)[0] ?? p).focus();
      };
      return document.addEventListener("keydown", L), document.addEventListener("focusin", k), () => {
        var S, E;
        window.cancelAnimationFrame(A), document.removeEventListener("keydown", L), document.removeEventListener("focusin", k);
        const v = $.lastIndexOf(p);
        v >= 0 && $.splice(v, 1), _(), h();
        const N = ((S = u.current) == null ? void 0 : S.current) ?? g.triggerRef.current ?? I;
        (E = N == null ? void 0 : N.focus) == null || E.call(N, { preventScroll: !0 });
      };
    }, [g.open, g.triggerRef]), /* @__PURE__ */ z(yt, { container: n, children: [
      /* @__PURE__ */ i(tt, { className: t }),
      /* @__PURE__ */ i(
        "div",
        {
          ...f,
          ref: P(T, m),
          "data-slot": "dialog-content",
          "data-state": g.open ? "open" : "closed",
          role: b,
          "aria-modal": "true",
          "aria-label": w,
          "aria-labelledby": c ?? (!w && g.hasTitle ? g.titleId : void 0),
          "aria-describedby": y ?? (g.hasDescription ? g.descriptionId : void 0),
          tabIndex: -1,
          className: d("slr-dialog__content", e),
          children: r
        }
      )
    ] });
  }
);
ht.displayName = "DialogContent";
const ne = ({ className: e, ...t }) => /* @__PURE__ */ i("div", { "data-slot": "dialog-header", className: d("slr-dialog__header", e), ...t }), ae = ({ className: e, ...t }) => /* @__PURE__ */ i("div", { "data-slot": "dialog-footer", className: d("slr-dialog__footer", e), ...t }), vt = s.forwardRef(
  ({ className: e, ...t }, r) => {
    const { titleId: n, registerTitle: o } = O("DialogTitle");
    return Y(() => o(), [o]), /* @__PURE__ */ i("h2", { ...t, ref: r, id: n, className: d("slr-dialog__title", e) });
  }
);
vt.displayName = "DialogTitle";
const Nt = s.forwardRef(
  ({ className: e, ...t }, r) => {
    const { descriptionId: n, registerDescription: o } = O("DialogDescription");
    return Y(() => o(), [o]), /* @__PURE__ */ i("p", { ...t, ref: r, id: n, className: d("slr-dialog__description", e) });
  }
);
Nt.displayName = "DialogDescription";
const et = s.createContext(null), Rt = '[role="menuitem"]:not([disabled]):not([aria-disabled="true"])';
function U(e) {
  const t = s.useContext(et);
  if (!t) throw new Error(`${e} must be rendered inside DropdownMenu.`);
  return t;
}
function Q(e) {
  return Array.from(e.querySelectorAll(Rt));
}
function oe({ open: e, defaultOpen: t = !1, onOpenChange: r, children: n }) {
  const [o, a] = H({
    value: e,
    defaultValue: t,
    onChange: r
  }), [l, b] = s.useState("first"), w = s.useRef(null), c = s.useId(), y = s.useMemo(
    () => ({ open: o, setOpen: a, triggerRef: w, contentId: c, focusIntent: l, setFocusIntent: b }),
    [c, l, o, a]
  );
  return /* @__PURE__ */ i(et.Provider, { value: y, children: n });
}
const xt = s.forwardRef(
  ({ asChild: e = !1, onClick: t, onKeyDown: r, type: n, ...o }, a) => {
    const l = U("DropdownMenuTrigger"), b = e ? V : "button", w = (c) => {
      l.setFocusIntent(c), l.setOpen(!0);
    };
    return /* @__PURE__ */ i(
      b,
      {
        ...o,
        ref: P(a, l.triggerRef),
        type: e ? void 0 : n ?? "button",
        "aria-haspopup": "menu",
        "aria-expanded": l.open,
        "aria-controls": l.open ? l.contentId : void 0,
        "data-state": l.open ? "open" : "closed",
        onClick: (c) => {
          t == null || t(c), !c.defaultPrevented && (l.open || l.setFocusIntent("first"), l.setOpen(!l.open));
        },
        onKeyDown: (c) => {
          r == null || r(c), !c.defaultPrevented && (c.key === "ArrowDown" || c.key === "Enter" || c.key === " " ? (c.preventDefault(), w("first")) : c.key === "ArrowUp" && (c.preventDefault(), w("last")));
        }
      }
    );
  }
);
xt.displayName = "DropdownMenuTrigger";
function se({ children: e, container: t }) {
  const { open: r } = U("DropdownMenuPortal");
  return !r || typeof document > "u" ? null : G(e, t ?? document.body);
}
const Dt = s.forwardRef(
  ({
    className: e,
    align: t = "start",
    side: r = "bottom",
    sideOffset: n = 6,
    collisionPadding: o = 8,
    avoidCollisions: a = !0,
    portalContainer: l,
    style: b,
    onKeyDown: w,
    children: c,
    ...y
  }, f) => {
    const m = U("DropdownMenuContent"), g = s.useRef(null), T = s.useRef(m.setOpen), x = s.useRef({ value: "", time: 0 }), [R, M] = s.useState({ side: r, style: { visibility: "hidden" } });
    return T.current = m.setOpen, Y(() => {
      if (!m.open) return;
      const u = () => {
        const I = m.triggerRef.current, D = g.current;
        if (!I || !D) return;
        const h = I.getBoundingClientRect(), _ = D.offsetWidth, A = D.offsetHeight, C = window.getComputedStyle(I).direction, L = h.top - o, k = window.innerHeight - h.bottom - o;
        let v = r;
        a && (r === "bottom" && A > k && L > k && (v = "top"), r === "top" && A > L && k > L && (v = "bottom"));
        let N = C === "rtl" ? h.right - _ : h.left;
        t === "center" && (N = h.left + (h.width - _) / 2), t === "end" && (N = C === "rtl" ? h.left : h.right - _), N = Math.max(o, Math.min(N, window.innerWidth - _ - o));
        const S = v === "bottom" ? h.bottom + n : h.top - A - n, E = a ? Math.max(o, Math.min(S, window.innerHeight - A - o)) : S;
        M({
          side: v,
          style: {
            position: "fixed",
            top: E,
            left: N,
            minWidth: h.width,
            visibility: "visible"
          }
        });
      };
      u();
      const p = typeof ResizeObserver > "u" ? null : new ResizeObserver(u);
      return g.current && (p == null || p.observe(g.current)), m.triggerRef.current && (p == null || p.observe(m.triggerRef.current)), window.addEventListener("resize", u), window.addEventListener("scroll", u, !0), () => {
        p == null || p.disconnect(), window.removeEventListener("resize", u), window.removeEventListener("scroll", u, !0);
      };
    }, [t, a, o, m.open, m.triggerRef, r, n]), s.useEffect(() => {
      if (!m.open) return;
      const u = window.requestAnimationFrame(() => {
        const I = g.current;
        if (!I) return;
        const D = Q(I), h = m.focusIntent === "last" ? D.at(-1) : D[0];
        h == null || h.focus({ preventScroll: !0 });
      }), p = (I) => {
        var h, _;
        const D = I.target;
        !((h = g.current) != null && h.contains(D)) && !((_ = m.triggerRef.current) != null && _.contains(D)) && T.current(!1);
      };
      return document.addEventListener("pointerdown", p), () => {
        window.cancelAnimationFrame(u), document.removeEventListener("pointerdown", p), x.current = { value: "", time: 0 };
      };
    }, [m.focusIntent, m.open, m.triggerRef]), !m.open || typeof document > "u" ? null : G(
      /* @__PURE__ */ i(
        "div",
        {
          ...y,
          ref: P(g, f),
          id: m.contentId,
          role: "menu",
          "data-slot": "dropdown-menu-content",
          "data-state": "open",
          "data-side": R.side,
          className: d("slr-dropdown__content", e),
          style: { ...R.style, ...b },
          onKeyDown: (u) => {
            var D, h, _, A;
            if (w == null || w(u), u.defaultPrevented) return;
            const p = Q(u.currentTarget), I = p.indexOf(document.activeElement);
            if (u.key === "Escape")
              u.preventDefault(), m.setOpen(!1), (D = m.triggerRef.current) == null || D.focus({ preventScroll: !0 });
            else if (u.key === "ArrowDown" || u.key === "ArrowUp") {
              if (u.preventDefault(), p.length === 0) return;
              const C = u.key === "ArrowDown" ? 1 : -1;
              (h = p[(I + C + p.length) % p.length]) == null || h.focus();
            } else if (u.key === "Home")
              u.preventDefault(), (_ = p[0]) == null || _.focus();
            else if (u.key === "End")
              u.preventDefault(), (A = p.at(-1)) == null || A.focus();
            else if (u.key === "Tab")
              m.setOpen(!1);
            else if (u.key.length === 1 && u.key !== " " && !u.ctrlKey && !u.metaKey && !u.altKey) {
              const C = Date.now(), L = C - x.current.time < 700 ? x.current.value : "", v = L.length > 0 && L.split("").every((E) => E === u.key.toLowerCase()) ? u.key.toLowerCase() : `${L}${u.key.toLowerCase()}`;
              x.current = { value: v, time: C };
              const S = [...p.slice(I + 1), ...p.slice(0, I + 1)].find((E) => (E.dataset.textValue ?? E.textContent ?? "").trim().toLocaleLowerCase().startsWith(v));
              S && (u.preventDefault(), S.focus());
            }
          },
          children: c
        }
      ),
      l ?? document.body
    );
  }
);
Dt.displayName = "DropdownMenuContent";
const It = s.forwardRef(
  ({ className: e, inset: t, variant: r = "default", textValue: n, onClick: o, onPointerMove: a, type: l, ...b }, w) => {
    const c = U("DropdownMenuItem");
    return /* @__PURE__ */ i(
      "button",
      {
        ...b,
        ref: w,
        type: l ?? "button",
        role: "menuitem",
        tabIndex: -1,
        "data-inset": t || void 0,
        "data-variant": r,
        "data-text-value": n,
        className: d("slr-dropdown__item", e),
        onPointerMove: (y) => {
          a == null || a(y), !y.defaultPrevented && !y.currentTarget.disabled && y.currentTarget.focus();
        },
        onClick: (y) => {
          var f;
          o == null || o(y), y.defaultPrevented || (c.setOpen(!1), (f = c.triggerRef.current) == null || f.focus({ preventScroll: !0 }));
        }
      }
    );
  }
);
It.displayName = "DropdownMenuItem";
function ie(e) {
  return /* @__PURE__ */ i("div", { role: "group", "data-slot": "dropdown-menu-group", ...e });
}
function le({ className: e, ...t }) {
  return /* @__PURE__ */ i("div", { "data-slot": "dropdown-menu-label", className: d("slr-dropdown__label", e), ...t });
}
function ce({ className: e, ...t }) {
  return /* @__PURE__ */ i("hr", { "data-slot": "dropdown-menu-separator", className: d("slr-dropdown__separator", e), ...t });
}
function de({ className: e, invalid: t = !1, ...r }) {
  return /* @__PURE__ */ i(
    "div",
    {
      "data-slot": "field",
      "data-invalid": t || void 0,
      className: d("slr-field-group", e),
      ...r
    }
  );
}
function ue({ className: e, required: t = !1, children: r, ...n }) {
  return /* @__PURE__ */ z("label", { "data-slot": "field-label", className: d("slr-field-label", e), ...n, children: [
    r,
    t ? /* @__PURE__ */ i("span", { className: "slr-field-required", "aria-hidden": "true", children: "*" }) : null
  ] });
}
function fe({ className: e, ...t }) {
  return /* @__PURE__ */ i("p", { "data-slot": "field-description", className: d("slr-field-description", e), ...t });
}
function pe({ className: e, ...t }) {
  return /* @__PURE__ */ i("p", { "data-slot": "field-error", role: "alert", className: d("slr-field-error", e), ...t });
}
const Tt = {
  sm: "iconSm",
  default: "icon",
  lg: "iconLg"
}, _t = s.forwardRef(
  ({ label: e, tooltip: t, size: r = "default", children: n, ...o }, a) => /* @__PURE__ */ i(
    X,
    {
      ref: a,
      size: Tt[r],
      "aria-label": e,
      title: t,
      ...o,
      children: n
    }
  )
);
_t.displayName = "IconButton";
const Et = s.forwardRef(
  ({ className: e, type: t, ...r }, n) => /* @__PURE__ */ i(
    "input",
    {
      ref: n,
      type: t,
      "data-slot": "input",
      className: d("slr-field slr-input", e),
      ...r
    }
  )
);
Et.displayName = "Input";
const St = s.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ i("label", { ref: r, "data-slot": "label", className: d("slr-label", e), ...t })
);
St.displayName = "Label";
const Ct = s.forwardRef(
  ({ className: e, wrapperClassName: t, children: r, ...n }, o) => /* @__PURE__ */ z("span", { className: d("slr-select-wrap", t), children: [
    /* @__PURE__ */ i("select", { ref: o, "data-slot": "select", className: d("slr-field slr-select", e), ...n, children: r }),
    /* @__PURE__ */ i("span", { className: "slr-select-chevron", "aria-hidden": "true" })
  ] })
);
Ct.displayName = "Select";
function me({ className: e, containerClassName: t, children: r, ...n }) {
  return /* @__PURE__ */ i("section", { className: d("slr-section", e), ...n, children: /* @__PURE__ */ i("div", { className: d("slr-container", t), children: r }) });
}
function ge({ className: e, ...t }) {
  return /* @__PURE__ */ i("header", { className: d("slr-section-header", e), ...t });
}
function be({ className: e, ...t }) {
  return /* @__PURE__ */ i("span", { className: d("slr-eyebrow", e), ...t });
}
function we({ className: e, ...t }) {
  return /* @__PURE__ */ i("h2", { className: d("slr-section-title", e), ...t });
}
function ye({ className: e, ...t }) {
  return /* @__PURE__ */ i("p", { className: d("slr-section-description", e), ...t });
}
function he({
  className: e,
  orientation: t = "horizontal",
  decorative: r = !0,
  ...n
}) {
  return /* @__PURE__ */ i(
    "div",
    {
      "data-slot": "separator",
      "data-orientation": t,
      role: r ? "none" : "separator",
      "aria-orientation": r ? void 0 : t,
      className: d("slr-separator", e),
      ...n
    }
  );
}
const Lt = s.forwardRef(
  ({ checked: e, defaultChecked: t = !1, onCheckedChange: r, onClick: n, className: o, disabled: a, type: l, ...b }, w) => {
    const [c, y] = H({
      value: e,
      defaultValue: t,
      onChange: r
    });
    return /* @__PURE__ */ i(
      "button",
      {
        ...b,
        ref: w,
        type: l ?? "button",
        role: "switch",
        "aria-checked": c,
        disabled: a,
        "data-slot": "switch",
        "data-state": c ? "checked" : "unchecked",
        className: d("slr-switch", o),
        onClick: (f) => {
          n == null || n(f), !f.defaultPrevented && !a && y((m) => !m);
        },
        children: /* @__PURE__ */ i("span", { className: "slr-switch__thumb", "data-state": c ? "checked" : "unchecked" })
      }
    );
  }
);
Lt.displayName = "Switch";
const rt = s.createContext(null);
function Z(e) {
  const t = s.useContext(rt);
  if (!t) throw new Error(`${e} must be rendered inside Tabs.`);
  return t;
}
function nt(e, t) {
  return `${e}-tab-${encodeURIComponent(t)}`;
}
function at(e, t) {
  return `${e}-panel-${encodeURIComponent(t)}`;
}
const Mt = s.forwardRef(
  ({
    value: e,
    defaultValue: t,
    onValueChange: r,
    orientation: n = "horizontal",
    activationMode: o = "automatic",
    loop: a = !0,
    className: l,
    children: b,
    ...w
  }, c) => {
    const [y, f] = H({
      value: e,
      defaultValue: t ?? "",
      onChange: r
    }), m = s.useId(), g = s.useMemo(() => ({
      value: y,
      setValue: f,
      orientation: n,
      activationMode: o,
      loop: a,
      baseId: m
    }), [o, m, a, n, y, f]);
    return /* @__PURE__ */ i(rt.Provider, { value: g, children: /* @__PURE__ */ i(
      "div",
      {
        ...w,
        ref: c,
        "data-slot": "tabs",
        "data-orientation": n,
        className: d("slr-tabs", l),
        children: b
      }
    ) });
  }
);
Mt.displayName = "Tabs";
const At = s.forwardRef(
  ({ className: e, ...t }, r) => {
    const { orientation: n } = Z("TabsList");
    return /* @__PURE__ */ i(
      "div",
      {
        ...t,
        ref: r,
        role: "tablist",
        "aria-orientation": n,
        "data-slot": "tabs-list",
        "data-orientation": n,
        className: d("slr-tabs__list", e)
      }
    );
  }
);
At.displayName = "TabsList";
const kt = s.forwardRef(
  ({ value: e, className: t, disabled: r, onClick: n, onFocus: o, onKeyDown: a, type: l, ...b }, w) => {
    const c = Z("TabsTrigger"), y = c.value === e;
    return /* @__PURE__ */ i(
      "button",
      {
        ...b,
        ref: w,
        id: nt(c.baseId, e),
        type: l ?? "button",
        role: "tab",
        "aria-selected": y,
        "aria-controls": at(c.baseId, e),
        tabIndex: y ? 0 : -1,
        disabled: r,
        "data-slot": "tabs-trigger",
        "data-state": y ? "active" : "inactive",
        "data-orientation": c.orientation,
        className: d("slr-tabs__trigger", t),
        onClick: (f) => {
          n == null || n(f), !f.defaultPrevented && !r && c.setValue(e);
        },
        onFocus: (f) => {
          o == null || o(f), !f.defaultPrevented && !r && c.activationMode === "automatic" && c.setValue(e);
        },
        onKeyDown: (f) => {
          var p;
          if (a == null || a(f), f.defaultPrevented) return;
          if (c.activationMode === "manual" && ["Enter", " "].includes(f.key)) {
            f.preventDefault(), c.setValue(e);
            return;
          }
          const m = c.orientation === "horizontal" && window.getComputedStyle(f.currentTarget).direction === "rtl", g = c.orientation === "horizontal" ? m ? "ArrowRight" : "ArrowLeft" : "ArrowUp", T = c.orientation === "horizontal" ? m ? "ArrowLeft" : "ArrowRight" : "ArrowDown";
          if (![g, T, "Home", "End"].includes(f.key)) return;
          const x = f.currentTarget.closest('[role="tablist"]'), R = Array.from((x == null ? void 0 : x.querySelectorAll('[role="tab"]:not([disabled])')) ?? []), M = R.indexOf(f.currentTarget);
          let u = M;
          f.key === "Home" && (u = 0), f.key === "End" && (u = R.length - 1), f.key === g && (u = M - 1), f.key === T && (u = M + 1), c.loop ? u = (u + R.length) % R.length : u = Math.max(0, Math.min(u, R.length - 1)), f.preventDefault(), (p = R[u]) == null || p.focus();
        }
      }
    );
  }
);
kt.displayName = "TabsTrigger";
const Vt = s.forwardRef(
  ({ value: e, className: t, ...r }, n) => {
    const o = Z("TabsContent"), a = o.value === e;
    return /* @__PURE__ */ i(
      "div",
      {
        ...r,
        ref: n,
        id: at(o.baseId, e),
        role: "tabpanel",
        "aria-labelledby": nt(o.baseId, e),
        tabIndex: 0,
        hidden: !a,
        "data-slot": "tabs-content",
        "data-state": a ? "active" : "inactive",
        "data-orientation": o.orientation,
        className: d("slr-tabs__content", t)
      }
    );
  }
);
Vt.displayName = "TabsContent";
const Ot = s.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ i(
    "textarea",
    {
      ref: r,
      "data-slot": "textarea",
      className: d("slr-field slr-textarea", e),
      ...t
    }
  )
);
Ot.displayName = "Textarea";
export {
  Ut as Badge,
  X as Button,
  jt as Callout,
  Yt as CalloutDescription,
  Wt as CalloutIcon,
  Gt as CalloutTitle,
  Zt as Card,
  Kt as CardAction,
  te as CardContent,
  Xt as CardDescription,
  ee as CardFooter,
  Jt as CardHeader,
  Qt as CardTitle,
  re as Dialog,
  wt as DialogClose,
  ht as DialogContent,
  Nt as DialogDescription,
  ae as DialogFooter,
  ne as DialogHeader,
  tt as DialogOverlay,
  yt as DialogPortal,
  vt as DialogTitle,
  bt as DialogTrigger,
  oe as DropdownMenu,
  Dt as DropdownMenuContent,
  ie as DropdownMenuGroup,
  It as DropdownMenuItem,
  le as DropdownMenuLabel,
  se as DropdownMenuPortal,
  ce as DropdownMenuSeparator,
  xt as DropdownMenuTrigger,
  de as Field,
  fe as FieldDescription,
  pe as FieldError,
  ue as FieldLabel,
  _t as IconButton,
  Et as Input,
  St as Label,
  me as Section,
  ye as SectionDescription,
  be as SectionEyebrow,
  ge as SectionHeader,
  we as SectionTitle,
  Ct as Select,
  he as Separator,
  Ht as SkipLink,
  V as Slot,
  Lt as Switch,
  Mt as Tabs,
  Vt as TabsContent,
  At as TabsList,
  kt as TabsTrigger,
  Ot as Textarea,
  qt as VisuallyHidden,
  ct as badgeVariants,
  dt as buttonVariants,
  ut as calloutVariants,
  ft as cardVariants,
  d as cn
};
//# sourceMappingURL=index.js.map
