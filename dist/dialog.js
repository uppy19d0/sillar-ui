import { jsx as g, jsxs as V } from "react/jsx-runtime";
import * as i from "react";
import { g as S, a as k, u as Y } from "./internal-D9EwPR7x.js";
import { P as $ } from "./portal-DEB9SKy7.js";
import { Slot as P, composeRefs as A } from "./slot.js";
import { cn as D } from "./utils.js";
const E = /* @__PURE__ */ new Map(), w = [];
let h = 0, _ = "";
function z(t) {
  return w.push(t), () => {
    const e = w.lastIndexOf(t);
    e >= 0 && w.splice(e, 1);
  };
}
function L(t) {
  return w.at(-1) === t;
}
function G() {
  return h === 0 && (_ = document.body.style.overflow, document.body.style.overflow = "hidden"), h += 1, () => {
    h = Math.max(0, h - 1), h === 0 && (document.body.style.overflow = _);
  };
}
function J(t) {
  const e = /* @__PURE__ */ new Set();
  let s = t, n = s.parentElement;
  for (; n; ) {
    for (const o of n.children)
      o instanceof HTMLElement && o !== s && !["SCRIPT", "STYLE", "LINK"].includes(o.tagName) && e.add(o);
    if (n === document.body) break;
    s = n, n = s.parentElement;
  }
  const r = [...e];
  return r.forEach((o) => {
    const l = E.get(o);
    if (l) {
      l.count += 1;
      return;
    }
    E.set(o, {
      count: 1,
      inert: o.inert === !0,
      ariaHidden: o.getAttribute("aria-hidden")
    }), o.inert = !0, o.setAttribute("aria-hidden", "true");
  }), () => {
    r.forEach((o) => {
      const l = E.get(o);
      l && (l.count -= 1, !(l.count > 0) && (o.inert = l.inert, l.ariaHidden === null ? o.removeAttribute("aria-hidden") : o.setAttribute("aria-hidden", l.ariaHidden), E.delete(o)));
    });
  };
}
function Q(t, e) {
  const s = document.activeElement, n = z(t), r = () => {
    t.contains(document.activeElement) || (e.initialFocus ?? S(t)[0] ?? t).focus({ preventScroll: !0 });
  }, o = window.requestAnimationFrame(r), l = (a) => {
    var y, c;
    if (!L(t)) return;
    if (a.key === "Escape") {
      (y = e.onEscapeKeyDown) == null || y.call(e, a), a.defaultPrevented || (c = e.onDismiss) == null || c.call(e);
      return;
    }
    if (a.key !== "Tab") return;
    const d = S(t);
    if (d.length === 0) {
      a.preventDefault(), t.focus();
      return;
    }
    const p = d[0], m = d[d.length - 1];
    a.shiftKey && (document.activeElement === p || !t.contains(document.activeElement)) ? (a.preventDefault(), m.focus()) : !a.shiftKey && document.activeElement === m && (a.preventDefault(), p.focus());
  }, u = (a) => {
    !L(t) || t.contains(a.target) || r();
  };
  return document.addEventListener("keydown", l), document.addEventListener("focusin", u), () => {
    var d;
    window.cancelAnimationFrame(o), document.removeEventListener("keydown", l), document.removeEventListener("focusin", u), n();
    const a = e.finalFocus ?? e.fallbackFocus ?? s;
    (d = a == null ? void 0 : a.focus) == null || d.call(a, { preventScroll: !0 });
  };
}
const M = i.createContext(null);
function b(t) {
  const e = i.useContext(M);
  if (!e) throw new Error(`${t} must be rendered inside Dialog.`);
  return e;
}
function ie({ open: t, defaultOpen: e = !1, onOpenChange: s, children: n }) {
  const [r, o] = Y({
    value: t,
    defaultValue: e,
    onChange: s
  }), l = i.useRef(null), u = i.useId(), a = i.useId(), [d, p] = i.useState(0), [m, y] = i.useState(0), c = i.useCallback(() => (p((f) => f + 1), () => p((f) => Math.max(0, f - 1))), []), v = i.useCallback(() => (y((f) => f + 1), () => y((f) => Math.max(0, f - 1))), []), R = i.useMemo(() => ({
    open: r,
    setOpen: o,
    triggerRef: l,
    titleId: u,
    descriptionId: a,
    hasTitle: d > 0,
    hasDescription: m > 0,
    registerTitle: c,
    registerDescription: v
  }), [
    m,
    a,
    v,
    c,
    r,
    o,
    d,
    u
  ]);
  return /* @__PURE__ */ g(M.Provider, { value: R, children: n });
}
const U = i.forwardRef(
  ({ asChild: t = !1, onClick: e, type: s, ...n }, r) => {
    const o = b("DialogTrigger");
    return /* @__PURE__ */ g(
      t ? P : "button",
      {
        ...n,
        ref: A(r, o.triggerRef),
        type: t ? void 0 : s ?? "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "data-state": o.open ? "open" : "closed",
        onClick: (u) => {
          e == null || e(u), u.defaultPrevented || o.setOpen(!0);
        }
      }
    );
  }
);
U.displayName = "DialogTrigger";
const W = i.forwardRef(
  ({ asChild: t = !1, onClick: e, type: s, ...n }, r) => {
    const o = b("DialogClose");
    return /* @__PURE__ */ g(
      t ? P : "button",
      {
        ...n,
        ref: r,
        type: t ? void 0 : s ?? "button",
        onClick: (u) => {
          e == null || e(u), u.defaultPrevented || o.setOpen(!1);
        }
      }
    );
  }
);
W.displayName = "DialogClose";
function X({ children: t, container: e, className: s, ...n }) {
  const { open: r } = b("DialogPortal");
  return !r || typeof document > "u" ? null : /* @__PURE__ */ g($, { container: e, children: /* @__PURE__ */ g("div", { ...n, "data-slot": "dialog-portal", className: D("slr-dialog__portal", s), children: t }) });
}
const H = i.forwardRef(
  ({ className: t, onPointerDown: e, ...s }, n) => {
    const r = b("DialogOverlay");
    return /* @__PURE__ */ g(
      "div",
      {
        ...s,
        ref: n,
        "data-slot": "dialog-overlay",
        "data-state": r.open ? "open" : "closed",
        className: D("slr-dialog__overlay", t),
        onPointerDown: (o) => {
          e == null || e(o), !o.defaultPrevented && o.target === o.currentTarget && r.setOpen(!1);
        }
      }
    );
  }
);
H.displayName = "DialogOverlay";
const Z = i.forwardRef(
  ({
    className: t,
    overlayClassName: e,
    children: s,
    portalContainer: n,
    initialFocusRef: r,
    finalFocusRef: o,
    onEscapeKeyDown: l,
    role: u = "dialog",
    "aria-label": a,
    "aria-labelledby": d,
    "aria-describedby": p,
    ...m
  }, y) => {
    const c = b("DialogContent"), v = i.useRef(null), R = i.useRef(c.setOpen), f = i.useRef(l), T = i.useRef(r), C = i.useRef(o);
    return R.current = c.setOpen, f.current = l, T.current = r, C.current = o, i.useEffect(() => {
      var N, O;
      if (!c.open) return;
      const x = v.current;
      if (!x) return;
      const I = x.closest('[data-slot="dialog-portal"]'), K = G(), j = I ? J(I) : () => {
      }, B = Q(x, {
        initialFocus: (N = T.current) == null ? void 0 : N.current,
        finalFocus: (O = C.current) == null ? void 0 : O.current,
        fallbackFocus: c.triggerRef.current,
        onEscapeKeyDown: (q) => {
          var F;
          return (F = f.current) == null ? void 0 : F.call(f, q);
        },
        onDismiss: () => R.current(!1)
      });
      return () => {
        j(), K(), B();
      };
    }, [c.open, c.triggerRef]), /* @__PURE__ */ V(X, { container: n, children: [
      /* @__PURE__ */ g(H, { className: e }),
      /* @__PURE__ */ g(
        "div",
        {
          ...m,
          ref: A(v, y),
          "data-slot": "dialog-content",
          "data-state": c.open ? "open" : "closed",
          role: u,
          "aria-modal": "true",
          "aria-label": a,
          "aria-labelledby": d ?? (!a && c.hasTitle ? c.titleId : void 0),
          "aria-describedby": p ?? (c.hasDescription ? c.descriptionId : void 0),
          tabIndex: -1,
          className: D("slr-dialog__content", t),
          children: s
        }
      )
    ] });
  }
);
Z.displayName = "DialogContent";
const le = ({ className: t, ...e }) => /* @__PURE__ */ g("div", { "data-slot": "dialog-header", className: D("slr-dialog__header", t), ...e }), ce = ({ className: t, ...e }) => /* @__PURE__ */ g("div", { "data-slot": "dialog-footer", className: D("slr-dialog__footer", t), ...e }), ee = i.forwardRef(
  ({ className: t, ...e }, s) => {
    const { titleId: n, registerTitle: r } = b("DialogTitle");
    return k(() => r(), [r]), /* @__PURE__ */ g("h2", { ...e, ref: s, id: n, className: D("slr-dialog__title", t) });
  }
);
ee.displayName = "DialogTitle";
const te = i.forwardRef(
  ({ className: t, ...e }, s) => {
    const { descriptionId: n, registerDescription: r } = b("DialogDescription");
    return k(() => r(), [r]), /* @__PURE__ */ g("p", { ...e, ref: s, id: n, className: D("slr-dialog__description", t) });
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
