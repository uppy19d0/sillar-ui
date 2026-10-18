import { jsx as g, jsxs as V } from "react/jsx-runtime";
import * as i from "react";
import { g as T, a as k, u as Y } from "./internal-D9EwPR7x.js";
import { P as $ } from "./portal-DEB9SKy7.js";
import { Slot as P, composeRefs as A } from "./slot.js";
import { cn as b } from "./utils.js";
const w = /* @__PURE__ */ new Map(), E = [];
let R = 0, L = "";
function z(e) {
  return E.push(e), () => {
    const t = E.lastIndexOf(e);
    t >= 0 && E.splice(t, 1);
  };
}
function C(e) {
  return E.at(-1) === e;
}
function G() {
  return R === 0 && (L = document.body.style.overflow, document.body.style.overflow = "hidden"), R += 1, () => {
    R = Math.max(0, R - 1), R === 0 && (document.body.style.overflow = L);
  };
}
function J(e) {
  const t = /* @__PURE__ */ new Set();
  let s = e, a = s.parentElement;
  for (; a; ) {
    for (const o of a.children)
      o instanceof HTMLElement && o !== s && !["SCRIPT", "STYLE", "LINK"].includes(o.tagName) && t.add(o);
    if (a === document.body) break;
    s = a, a = s.parentElement;
  }
  const r = [...t];
  return r.forEach((o) => {
    const l = w.get(o);
    if (l) {
      l.count += 1;
      return;
    }
    w.set(o, {
      count: 1,
      inert: o.inert === !0,
      ariaHidden: o.getAttribute("aria-hidden")
    }), o.inert = !0, o.setAttribute("aria-hidden", "true");
  }), () => {
    r.forEach((o) => {
      const l = w.get(o);
      l && (l.count -= 1, !(l.count > 0) && (o.inert = l.inert, l.ariaHidden === null ? o.removeAttribute("aria-hidden") : o.setAttribute("aria-hidden", l.ariaHidden), w.delete(o)));
    });
  };
}
function Q(e, t) {
  const s = document.activeElement, a = z(e), r = () => {
    e.contains(document.activeElement) || (t.initialFocus ?? T(e)[0] ?? e).focus({ preventScroll: !0 });
  }, o = window.requestAnimationFrame(r), l = (n) => {
    var D, c;
    if (!C(e)) return;
    if (n.key === "Escape") {
      (D = t.onEscapeKeyDown) == null || D.call(t, n), n.defaultPrevented || (c = t.onDismiss) == null || c.call(t);
      return;
    }
    if (n.key !== "Tab") return;
    const f = T(e);
    if (f.length === 0) {
      n.preventDefault(), e.focus();
      return;
    }
    const p = f[0], y = f[f.length - 1];
    if (n.shiftKey && (document.activeElement === p || !e.contains(document.activeElement)))
      n.preventDefault(), y.focus();
    else if (!n.shiftKey && document.activeElement === y)
      n.preventDefault(), p.focus();
    else {
      const v = n.shiftKey;
      window.setTimeout(() => {
        var u;
        if (!C(e) || e.contains(document.activeElement)) return;
        const m = T(e);
        (u = v ? m[m.length - 1] : m[0] ?? e) == null || u.focus({ preventScroll: !0 });
      }, 0);
    }
  }, d = (n) => {
    !C(e) || e.contains(n.target) || r();
  };
  return document.addEventListener("keydown", l), document.addEventListener("focusin", d), () => {
    var f;
    window.cancelAnimationFrame(o), document.removeEventListener("keydown", l), document.removeEventListener("focusin", d), a();
    const n = t.finalFocus ?? t.fallbackFocus ?? s;
    (f = n == null ? void 0 : n.focus) == null || f.call(n, { preventScroll: !0 });
  };
}
const M = i.createContext(null);
function h(e) {
  const t = i.useContext(M);
  if (!t) throw new Error(`${e} must be rendered inside Dialog.`);
  return t;
}
function ie({ open: e, defaultOpen: t = !1, onOpenChange: s, children: a }) {
  const [r, o] = Y({
    value: e,
    defaultValue: t,
    onChange: s
  }), l = i.useRef(null), d = i.useId(), n = i.useId(), [f, p] = i.useState(0), [y, D] = i.useState(0), c = i.useCallback(() => (p((u) => u + 1), () => p((u) => Math.max(0, u - 1))), []), v = i.useCallback(() => (D((u) => u + 1), () => D((u) => Math.max(0, u - 1))), []), m = i.useMemo(() => ({
    open: r,
    setOpen: o,
    triggerRef: l,
    titleId: d,
    descriptionId: n,
    hasTitle: f > 0,
    hasDescription: y > 0,
    registerTitle: c,
    registerDescription: v
  }), [
    y,
    n,
    v,
    c,
    r,
    o,
    f,
    d
  ]);
  return /* @__PURE__ */ g(M.Provider, { value: m, children: a });
}
const U = i.forwardRef(
  ({ asChild: e = !1, onClick: t, type: s, ...a }, r) => {
    const o = h("DialogTrigger");
    return /* @__PURE__ */ g(
      e ? P : "button",
      {
        ...a,
        ref: A(r, o.triggerRef),
        type: e ? void 0 : s ?? "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "data-state": o.open ? "open" : "closed",
        onClick: (d) => {
          t == null || t(d), d.defaultPrevented || o.setOpen(!0);
        }
      }
    );
  }
);
U.displayName = "DialogTrigger";
const W = i.forwardRef(
  ({ asChild: e = !1, onClick: t, type: s, ...a }, r) => {
    const o = h("DialogClose");
    return /* @__PURE__ */ g(
      e ? P : "button",
      {
        ...a,
        ref: r,
        type: e ? void 0 : s ?? "button",
        onClick: (d) => {
          t == null || t(d), d.defaultPrevented || o.setOpen(!1);
        }
      }
    );
  }
);
W.displayName = "DialogClose";
function X({ children: e, container: t, className: s, ...a }) {
  const { open: r } = h("DialogPortal");
  return !r || typeof document > "u" ? null : /* @__PURE__ */ g($, { container: t, children: /* @__PURE__ */ g("div", { ...a, "data-slot": "dialog-portal", className: b("slr-dialog__portal", s), children: e }) });
}
const H = i.forwardRef(
  ({ className: e, onPointerDown: t, ...s }, a) => {
    const r = h("DialogOverlay");
    return /* @__PURE__ */ g(
      "div",
      {
        ...s,
        ref: a,
        "data-slot": "dialog-overlay",
        "data-state": r.open ? "open" : "closed",
        className: b("slr-dialog__overlay", e),
        onPointerDown: (o) => {
          t == null || t(o), !o.defaultPrevented && o.target === o.currentTarget && r.setOpen(!1);
        }
      }
    );
  }
);
H.displayName = "DialogOverlay";
const Z = i.forwardRef(
  ({
    className: e,
    overlayClassName: t,
    children: s,
    portalContainer: a,
    initialFocusRef: r,
    finalFocusRef: o,
    onEscapeKeyDown: l,
    role: d = "dialog",
    "aria-label": n,
    "aria-labelledby": f,
    "aria-describedby": p,
    ...y
  }, D) => {
    const c = h("DialogContent"), v = i.useRef(null), m = i.useRef(c.setOpen), u = i.useRef(l), I = i.useRef(r), N = i.useRef(o);
    return m.current = c.setOpen, u.current = l, I.current = r, N.current = o, i.useEffect(() => {
      var S, F;
      if (!c.open) return;
      const x = v.current;
      if (!x) return;
      const O = x.closest('[data-slot="dialog-portal"]'), K = G(), j = O ? J(O) : () => {
      }, B = Q(x, {
        initialFocus: (S = I.current) == null ? void 0 : S.current,
        finalFocus: (F = N.current) == null ? void 0 : F.current,
        fallbackFocus: c.triggerRef.current,
        onEscapeKeyDown: (q) => {
          var _;
          return (_ = u.current) == null ? void 0 : _.call(u, q);
        },
        onDismiss: () => m.current(!1)
      });
      return () => {
        j(), K(), B();
      };
    }, [c.open, c.triggerRef]), /* @__PURE__ */ V(X, { container: a, children: [
      /* @__PURE__ */ g(H, { className: t }),
      /* @__PURE__ */ g(
        "div",
        {
          ...y,
          ref: A(v, D),
          "data-slot": "dialog-content",
          "data-state": c.open ? "open" : "closed",
          role: d,
          "aria-modal": "true",
          "aria-label": n,
          "aria-labelledby": f ?? (!n && c.hasTitle ? c.titleId : void 0),
          "aria-describedby": p ?? (c.hasDescription ? c.descriptionId : void 0),
          tabIndex: -1,
          className: b("slr-dialog__content", e),
          children: s
        }
      )
    ] });
  }
);
Z.displayName = "DialogContent";
const le = ({ className: e, ...t }) => /* @__PURE__ */ g("div", { "data-slot": "dialog-header", className: b("slr-dialog__header", e), ...t }), ce = ({ className: e, ...t }) => /* @__PURE__ */ g("div", { "data-slot": "dialog-footer", className: b("slr-dialog__footer", e), ...t }), ee = i.forwardRef(
  ({ className: e, ...t }, s) => {
    const { titleId: a, registerTitle: r } = h("DialogTitle");
    return k(() => r(), [r]), /* @__PURE__ */ g("h2", { ...t, ref: s, id: a, className: b("slr-dialog__title", e) });
  }
);
ee.displayName = "DialogTitle";
const te = i.forwardRef(
  ({ className: e, ...t }, s) => {
    const { descriptionId: a, registerDescription: r } = h("DialogDescription");
    return k(() => r(), [r]), /* @__PURE__ */ g("p", { ...t, ref: s, id: a, className: b("slr-dialog__description", e) });
  }
);
te.displayName = "DialogDescription";
export {
  ie as Dialog,
  W as DialogClose,
  Z as DialogContent,
  te as DialogDescription,
  ce as DialogFooter,
  le as DialogHeader,
  H as DialogOverlay,
  X as DialogPortal,
  ee as DialogTitle,
  U as DialogTrigger
};
//# sourceMappingURL=dialog.js.map
