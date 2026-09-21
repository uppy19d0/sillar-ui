import { jsx as o, jsxs as I, Fragment as V } from "react/jsx-runtime";
import * as a from "react";
import { clsx as q } from "clsx";
import { twMerge as z } from "tailwind-merge";
import { cva as S } from "class-variance-authority";
import { createPortal as T } from "react-dom";
function s(...t) {
  return z(q(t));
}
function x(...t) {
  return (e) => {
    t.forEach((r) => {
      typeof r == "function" ? r(e) : r && (r.current = e);
    });
  };
}
function B(t, e) {
  return (r) => {
    t == null || t(r), r.defaultPrevented || e == null || e(r);
  };
}
const R = a.forwardRef(
  ({ children: t, ...e }, r) => {
    if (!a.isValidElement(t))
      throw new Error("Sillar UI Slot expects exactly one valid React element.");
    const n = t.props, c = { ...e, ...n };
    Object.keys(e).forEach((i) => {
      /^on[A-Z]/.test(i) && typeof e[i] == "function" && (c[i] = B(
        n[i],
        e[i]
      ));
    }), c.className = s(e.className, n.className), c.style = {
      ...e.style,
      ...n.style
    };
    const d = n.ref ?? t.ref;
    return c.ref = x(r, d), a.cloneElement(t, c);
  }
);
R.displayName = "Slot";
function fe({ asChild: t = !1, className: e, ...r }) {
  return /* @__PURE__ */ o(t ? R : "span", { className: s("slr-visually-hidden", e), ...r });
}
function pe({ className: t, ...e }) {
  return /* @__PURE__ */ o("a", { className: s("slr-skip-link", t), ...e });
}
const C = S("slr-badge", {
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
function me({ className: t, variant: e, asChild: r = !1, ...n }) {
  return /* @__PURE__ */ o(
    r ? R : "span",
    {
      "data-slot": "badge",
      className: s(C({ variant: e }), t),
      ...n
    }
  );
}
const j = S("slr-button", {
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
}), P = a.forwardRef(
  ({ className: t, variant: e, size: r, asChild: n = !1, type: c, loading: d = !1, disabled: i, children: m, onClick: l, tabIndex: g, ...w }, D) => {
    const y = n ? R : "button", u = i || d, b = (f) => {
      if (u) {
        f.preventDefault();
        return;
      }
      l == null || l(f);
    };
    return /* @__PURE__ */ o(
      y,
      {
        ref: D,
        "data-slot": "button",
        "data-loading": d || void 0,
        className: s(j({ variant: e, size: r }), t),
        type: n ? void 0 : c ?? "button",
        disabled: n ? void 0 : u,
        "aria-busy": d || void 0,
        "aria-disabled": n && u ? !0 : void 0,
        tabIndex: n && u ? -1 : g,
        onClick: b,
        ...w,
        children: n ? m : /* @__PURE__ */ I(V, { children: [
          d ? /* @__PURE__ */ o("span", { className: "slr-spinner", "aria-hidden": "true" }) : null,
          m
        ] })
      }
    );
  }
);
P.displayName = "Button";
const k = S("slr-callout", {
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
function ge({ className: t, variant: e, ...r }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "callout",
      role: e === "danger" ? "alert" : void 0,
      className: s(k({ variant: e }), t),
      ...r
    }
  );
}
function be({ className: t, ...e }) {
  return /* @__PURE__ */ o("span", { "data-slot": "callout-icon", className: s("slr-callout__icon", t), ...e });
}
function we({ className: t, ...e }) {
  return /* @__PURE__ */ o("h3", { "data-slot": "callout-title", className: s("slr-callout__title", t), ...e });
}
function ve({ className: t, ...e }) {
  return /* @__PURE__ */ o("div", { "data-slot": "callout-description", className: s("slr-callout__description", t), ...e });
}
const W = S("slr-card", {
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
function ye({ className: t, variant: e, ...r }) {
  return /* @__PURE__ */ o("div", { "data-slot": "card", className: s(W({ variant: e }), t), ...r });
}
function Ne({ className: t, ...e }) {
  return /* @__PURE__ */ o("div", { "data-slot": "card-header", className: s("slr-card__header", t), ...e });
}
function De({ className: t, ...e }) {
  return /* @__PURE__ */ o("h3", { "data-slot": "card-title", className: s("slr-card__title", t), ...e });
}
function Re({ className: t, ...e }) {
  return /* @__PURE__ */ o("p", { "data-slot": "card-description", className: s("slr-card__description", t), ...e });
}
function _e({ className: t, ...e }) {
  return /* @__PURE__ */ o("div", { "data-slot": "card-action", className: s("slr-card__action", t), ...e });
}
function he({ className: t, ...e }) {
  return /* @__PURE__ */ o("div", { "data-slot": "card-content", className: s("slr-card__content", t), ...e });
}
function xe({ className: t, ...e }) {
  return /* @__PURE__ */ o("div", { "data-slot": "card-footer", className: s("slr-card__footer", t), ...e });
}
const O = a.createContext(null);
function _(t) {
  const e = a.useContext(O);
  if (!e) throw new Error(`${t} must be rendered inside Dialog.`);
  return e;
}
function Ee({ open: t, defaultOpen: e = !1, onOpenChange: r, children: n }) {
  const [c, d] = a.useState(e), i = a.useRef(null), m = a.useId(), l = a.useId(), g = t !== void 0, w = g ? t : c, D = a.useCallback((u) => {
    g || d(u), r == null || r(u);
  }, [g, r]), y = a.useMemo(() => ({
    open: w,
    setOpen: D,
    triggerRef: i,
    titleId: m,
    descriptionId: l
  }), [l, w, D, m]);
  return /* @__PURE__ */ o(O.Provider, { value: y, children: n });
}
const U = a.forwardRef(
  ({ asChild: t = !1, onClick: e, type: r, ...n }, c) => {
    const d = _("DialogTrigger");
    return /* @__PURE__ */ o(
      t ? R : "button",
      {
        ...n,
        ref: x(c, d.triggerRef),
        type: t ? void 0 : r ?? "button",
        "aria-haspopup": "dialog",
        "aria-expanded": d.open,
        "data-state": d.open ? "open" : "closed",
        onClick: (m) => {
          e == null || e(m), m.defaultPrevented || d.setOpen(!0);
        }
      }
    );
  }
);
U.displayName = "DialogTrigger";
const $ = a.forwardRef(
  ({ asChild: t = !1, onClick: e, type: r, ...n }, c) => {
    const d = _("DialogClose");
    return /* @__PURE__ */ o(
      t ? R : "button",
      {
        ...n,
        ref: c,
        type: t ? void 0 : r ?? "button",
        onClick: (m) => {
          e == null || e(m), m.defaultPrevented || d.setOpen(!1);
        }
      }
    );
  }
);
$.displayName = "DialogClose";
function G({ children: t, container: e }) {
  const { open: r } = _("DialogPortal");
  return !r || typeof document > "u" ? null : T(t, e ?? document.body);
}
const A = a.forwardRef(
  ({ className: t, onMouseDown: e, ...r }, n) => {
    const c = _("DialogOverlay");
    return /* @__PURE__ */ o(
      "div",
      {
        ...r,
        ref: n,
        "data-slot": "dialog-overlay",
        "data-state": c.open ? "open" : "closed",
        className: s("slr-dialog__overlay", t),
        onMouseDown: (d) => {
          e == null || e(d), !d.defaultPrevented && d.target === d.currentTarget && c.setOpen(!1);
        }
      }
    );
  }
);
A.displayName = "DialogOverlay";
const L = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])'
].join(","), Z = a.forwardRef(
  ({ className: t, overlayClassName: e, children: r, onEscapeKeyDown: n, ...c }, d) => {
    const i = _("DialogContent"), m = a.useRef(null), l = a.useRef(i.setOpen), g = a.useRef(n);
    return l.current = i.setOpen, g.current = n, a.useEffect(() => {
      if (!i.open) return;
      const w = document.activeElement, D = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const y = window.requestAnimationFrame(() => {
        const f = m.current;
        if (!f || f.contains(document.activeElement)) return;
        (f.querySelector(L) ?? f).focus();
      }), u = (f) => {
        var E;
        if (f.key === "Escape") {
          (E = g.current) == null || E.call(g, f), f.defaultPrevented || l.current(!1);
          return;
        }
        if (f.key !== "Tab") return;
        const p = m.current;
        if (!p) return;
        const v = Array.from(p.querySelectorAll(L));
        if (v.length === 0) {
          f.preventDefault(), p.focus();
          return;
        }
        const N = v[0], h = v[v.length - 1];
        f.shiftKey && (document.activeElement === N || !p.contains(document.activeElement)) ? (f.preventDefault(), h.focus()) : !f.shiftKey && document.activeElement === h && (f.preventDefault(), N.focus());
      }, b = (f) => {
        const p = m.current;
        !p || p.contains(f.target) || (p.querySelector(L) ?? p).focus();
      };
      return document.addEventListener("keydown", u), document.addEventListener("focusin", b), () => {
        var f, p, v;
        window.cancelAnimationFrame(y), document.removeEventListener("keydown", u), document.removeEventListener("focusin", b), document.body.style.overflow = D, (p = (f = i.triggerRef.current) == null ? void 0 : f.focus) == null || p.call(f), i.triggerRef.current || (v = w == null ? void 0 : w.focus) == null || v.call(w);
      };
    }, [i.open, i.triggerRef]), /* @__PURE__ */ I(G, { children: [
      /* @__PURE__ */ o(A, { className: e }),
      /* @__PURE__ */ o(
        "div",
        {
          ...c,
          ref: x(m, d),
          "data-slot": "dialog-content",
          "data-state": i.open ? "open" : "closed",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": i.titleId,
          "aria-describedby": i.descriptionId,
          tabIndex: -1,
          className: s("slr-dialog__content", t),
          children: r
        }
      )
    ] });
  }
);
Z.displayName = "DialogContent";
const Ie = ({ className: t, ...e }) => /* @__PURE__ */ o("div", { "data-slot": "dialog-header", className: s("slr-dialog__header", t), ...e }), Se = ({ className: t, ...e }) => /* @__PURE__ */ o("div", { "data-slot": "dialog-footer", className: s("slr-dialog__footer", t), ...e }), J = a.forwardRef(
  ({ className: t, ...e }, r) => {
    const { titleId: n } = _("DialogTitle");
    return /* @__PURE__ */ o("h2", { ...e, ref: r, id: n, className: s("slr-dialog__title", t) });
  }
);
J.displayName = "DialogTitle";
const Q = a.forwardRef(
  ({ className: t, ...e }, r) => {
    const { descriptionId: n } = _("DialogDescription");
    return /* @__PURE__ */ o("p", { ...e, ref: r, id: n, className: s("slr-dialog__description", t) });
  }
);
Q.displayName = "DialogDescription";
const F = a.createContext(null), X = typeof window > "u" ? a.useEffect : a.useLayoutEffect;
function M(t) {
  const e = a.useContext(F);
  if (!e) throw new Error(`${t} must be rendered inside DropdownMenu.`);
  return e;
}
function Me({ open: t, defaultOpen: e = !1, onOpenChange: r, children: n }) {
  const [c, d] = a.useState(e), i = a.useRef(null), m = a.useId(), l = t !== void 0, g = l ? t : c, w = a.useCallback((y) => {
    l || d(y), r == null || r(y);
  }, [l, r]), D = a.useMemo(
    () => ({ open: g, setOpen: w, triggerRef: i, contentId: m }),
    [m, g, w]
  );
  return /* @__PURE__ */ o(F.Provider, { value: D, children: n });
}
const Y = a.forwardRef(
  ({ asChild: t = !1, onClick: e, onKeyDown: r, type: n, ...c }, d) => {
    const i = M("DropdownMenuTrigger");
    return /* @__PURE__ */ o(
      t ? R : "button",
      {
        ...c,
        ref: x(d, i.triggerRef),
        type: t ? void 0 : n ?? "button",
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? i.contentId : void 0,
        "data-state": i.open ? "open" : "closed",
        onClick: (l) => {
          e == null || e(l), l.defaultPrevented || i.setOpen(!i.open);
        },
        onKeyDown: (l) => {
          r == null || r(l), !l.defaultPrevented && ["ArrowDown", "Enter", " "].includes(l.key) && (l.preventDefault(), i.setOpen(!0));
        }
      }
    );
  }
);
Y.displayName = "DropdownMenuTrigger";
function Le({ children: t }) {
  const { open: e } = M("DropdownMenuPortal");
  return !e || typeof document > "u" ? null : T(t, document.body);
}
const H = a.forwardRef(
  ({ className: t, align: e = "start", sideOffset: r = 6, style: n, onKeyDown: c, children: d, ...i }, m) => {
    const l = M("DropdownMenuContent"), g = a.useRef(null), w = a.useRef(l.setOpen), [D, y] = a.useState({ visibility: "hidden" });
    return w.current = l.setOpen, X(() => {
      if (!l.open) return;
      const u = () => {
        const b = l.triggerRef.current, f = g.current;
        if (!b || !f) return;
        const p = b.getBoundingClientRect(), v = f.offsetWidth;
        let N = p.left;
        e === "center" && (N = p.left + (p.width - v) / 2), e === "end" && (N = p.right - v), N = Math.max(8, Math.min(N, window.innerWidth - v - 8)), y({ position: "fixed", top: p.bottom + r, left: N, minWidth: p.width, visibility: "visible" });
      };
      return u(), window.addEventListener("resize", u), window.addEventListener("scroll", u, !0), () => {
        window.removeEventListener("resize", u), window.removeEventListener("scroll", u, !0);
      };
    }, [e, l.open, l.triggerRef, r]), a.useEffect(() => {
      if (!l.open) return;
      const u = window.requestAnimationFrame(() => {
        var f, p;
        (p = (f = g.current) == null ? void 0 : f.querySelector('[role="menuitem"]:not([disabled])')) == null || p.focus();
      }), b = (f) => {
        var v, N;
        const p = f.target;
        !((v = g.current) != null && v.contains(p)) && !((N = l.triggerRef.current) != null && N.contains(p)) && w.current(!1);
      };
      return document.addEventListener("pointerdown", b), () => {
        window.cancelAnimationFrame(u), document.removeEventListener("pointerdown", b);
      };
    }, [l.open, l.triggerRef]), !l.open || typeof document > "u" ? null : T(
      /* @__PURE__ */ o(
        "div",
        {
          ...i,
          ref: x(g, m),
          id: l.contentId,
          role: "menu",
          "data-slot": "dropdown-menu-content",
          "data-state": "open",
          className: s("slr-dropdown__content", t),
          style: { ...D, ...n },
          onKeyDown: (u) => {
            var p, v, N, h;
            if (c == null || c(u), u.defaultPrevented) return;
            const b = Array.from(u.currentTarget.querySelectorAll('[role="menuitem"]:not([disabled])')), f = b.indexOf(document.activeElement);
            if (u.key === "Escape")
              u.preventDefault(), l.setOpen(!1), (p = l.triggerRef.current) == null || p.focus();
            else if (u.key === "ArrowDown" || u.key === "ArrowUp") {
              u.preventDefault();
              const E = u.key === "ArrowDown" ? 1 : -1;
              (v = b[(f + E + b.length) % b.length]) == null || v.focus();
            } else u.key === "Home" ? (u.preventDefault(), (N = b[0]) == null || N.focus()) : u.key === "End" ? (u.preventDefault(), (h = b.at(-1)) == null || h.focus()) : u.key === "Tab" && l.setOpen(!1);
          },
          children: d
        }
      ),
      document.body
    );
  }
);
H.displayName = "DropdownMenuContent";
const K = a.forwardRef(
  ({ className: t, inset: e, variant: r = "default", onClick: n, type: c, ...d }, i) => {
    const m = M("DropdownMenuItem");
    return /* @__PURE__ */ o(
      "button",
      {
        ...d,
        ref: i,
        type: c ?? "button",
        role: "menuitem",
        tabIndex: -1,
        "data-inset": e || void 0,
        "data-variant": r,
        className: s("slr-dropdown__item", t),
        onClick: (l) => {
          var g;
          n == null || n(l), l.defaultPrevented || (m.setOpen(!1), (g = m.triggerRef.current) == null || g.focus());
        }
      }
    );
  }
);
K.displayName = "DropdownMenuItem";
function Te(t) {
  return /* @__PURE__ */ o("div", { role: "group", "data-slot": "dropdown-menu-group", ...t });
}
function Pe({ className: t, ...e }) {
  return /* @__PURE__ */ o("div", { "data-slot": "dropdown-menu-label", className: s("slr-dropdown__label", t), ...e });
}
function Oe({ className: t, ...e }) {
  return /* @__PURE__ */ o("hr", { "data-slot": "dropdown-menu-separator", className: s("slr-dropdown__separator", t), ...e });
}
function Ae({ className: t, invalid: e = !1, ...r }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "field",
      "data-invalid": e || void 0,
      className: s("slr-field-group", t),
      ...r
    }
  );
}
function Fe({ className: t, required: e = !1, children: r, ...n }) {
  return /* @__PURE__ */ I("label", { "data-slot": "field-label", className: s("slr-field-label", t), ...n, children: [
    r,
    e ? /* @__PURE__ */ o("span", { className: "slr-field-required", "aria-hidden": "true", children: "*" }) : null
  ] });
}
function Ve({ className: t, ...e }) {
  return /* @__PURE__ */ o("p", { "data-slot": "field-description", className: s("slr-field-description", t), ...e });
}
function qe({ className: t, ...e }) {
  return /* @__PURE__ */ o("p", { "data-slot": "field-error", role: "alert", className: s("slr-field-error", t), ...e });
}
const ee = {
  sm: "iconSm",
  default: "icon",
  lg: "iconLg"
}, te = a.forwardRef(
  ({ label: t, tooltip: e, size: r = "default", children: n, ...c }, d) => /* @__PURE__ */ o(
    P,
    {
      ref: d,
      size: ee[r],
      "aria-label": t,
      title: e,
      ...c,
      children: n
    }
  )
);
te.displayName = "IconButton";
const re = a.forwardRef(
  ({ className: t, type: e, ...r }, n) => /* @__PURE__ */ o(
    "input",
    {
      ref: n,
      type: e,
      "data-slot": "input",
      className: s("slr-field slr-input", t),
      ...r
    }
  )
);
re.displayName = "Input";
const ne = a.forwardRef(
  ({ className: t, ...e }, r) => /* @__PURE__ */ o("label", { ref: r, "data-slot": "label", className: s("slr-label", t), ...e })
);
ne.displayName = "Label";
const oe = a.forwardRef(
  ({ className: t, wrapperClassName: e, children: r, ...n }, c) => /* @__PURE__ */ I("span", { className: s("slr-select-wrap", e), children: [
    /* @__PURE__ */ o("select", { ref: c, "data-slot": "select", className: s("slr-field slr-select", t), ...n, children: r }),
    /* @__PURE__ */ o("span", { className: "slr-select-chevron", "aria-hidden": "true" })
  ] })
);
oe.displayName = "Select";
function ze({ className: t, containerClassName: e, children: r, ...n }) {
  return /* @__PURE__ */ o("section", { className: s("slr-section", t), ...n, children: /* @__PURE__ */ o("div", { className: s("slr-container", e), children: r }) });
}
function Be({ className: t, ...e }) {
  return /* @__PURE__ */ o("header", { className: s("slr-section-header", t), ...e });
}
function Ce({ className: t, ...e }) {
  return /* @__PURE__ */ o("span", { className: s("slr-eyebrow", t), ...e });
}
function je({ className: t, ...e }) {
  return /* @__PURE__ */ o("h2", { className: s("slr-section-title", t), ...e });
}
function ke({ className: t, ...e }) {
  return /* @__PURE__ */ o("p", { className: s("slr-section-description", t), ...e });
}
function We({
  className: t,
  orientation: e = "horizontal",
  decorative: r = !0,
  ...n
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "separator",
      "data-orientation": e,
      role: r ? "none" : "separator",
      "aria-orientation": r ? void 0 : e,
      className: s("slr-separator", t),
      ...n
    }
  );
}
const ae = a.forwardRef(
  ({ checked: t, defaultChecked: e = !1, onCheckedChange: r, onClick: n, className: c, disabled: d, type: i, ...m }, l) => {
    const [g, w] = a.useState(e), D = t !== void 0, y = D ? t : g, u = (b) => {
      D || w(b), r == null || r(b);
    };
    return /* @__PURE__ */ o(
      "button",
      {
        ...m,
        ref: l,
        type: i ?? "button",
        role: "switch",
        "aria-checked": y,
        disabled: d,
        "data-slot": "switch",
        "data-state": y ? "checked" : "unchecked",
        className: s("slr-switch", c),
        onClick: (b) => {
          n == null || n(b), !b.defaultPrevented && !d && u(!y);
        },
        children: /* @__PURE__ */ o("span", { className: "slr-switch__thumb", "data-state": y ? "checked" : "unchecked" })
      }
    );
  }
);
ae.displayName = "Switch";
const se = a.forwardRef(
  ({ className: t, ...e }, r) => /* @__PURE__ */ o(
    "textarea",
    {
      ref: r,
      "data-slot": "textarea",
      className: s("slr-field slr-textarea", t),
      ...e
    }
  )
);
se.displayName = "Textarea";
export {
  me as Badge,
  P as Button,
  ge as Callout,
  ve as CalloutDescription,
  be as CalloutIcon,
  we as CalloutTitle,
  ye as Card,
  _e as CardAction,
  he as CardContent,
  Re as CardDescription,
  xe as CardFooter,
  Ne as CardHeader,
  De as CardTitle,
  Ee as Dialog,
  $ as DialogClose,
  Z as DialogContent,
  Q as DialogDescription,
  Se as DialogFooter,
  Ie as DialogHeader,
  A as DialogOverlay,
  G as DialogPortal,
  J as DialogTitle,
  U as DialogTrigger,
  Me as DropdownMenu,
  H as DropdownMenuContent,
  Te as DropdownMenuGroup,
  K as DropdownMenuItem,
  Pe as DropdownMenuLabel,
  Le as DropdownMenuPortal,
  Oe as DropdownMenuSeparator,
  Y as DropdownMenuTrigger,
  Ae as Field,
  Ve as FieldDescription,
  qe as FieldError,
  Fe as FieldLabel,
  te as IconButton,
  re as Input,
  ne as Label,
  ze as Section,
  ke as SectionDescription,
  Ce as SectionEyebrow,
  Be as SectionHeader,
  je as SectionTitle,
  oe as Select,
  We as Separator,
  pe as SkipLink,
  R as Slot,
  ae as Switch,
  se as Textarea,
  fe as VisuallyHidden,
  C as badgeVariants,
  j as buttonVariants,
  k as calloutVariants,
  W as cardVariants,
  s as cn
};
//# sourceMappingURL=index.js.map
