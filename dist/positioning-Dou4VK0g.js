function p(t, e, l) {
  return Math.max(e, Math.min(t, l));
}
function E(t, e, l, n = {}) {
  const {
    side: o = "bottom",
    align: s = "start",
    sideOffset: i = 6,
    collisionPadding: d = 8,
    avoidCollisions: f = !0,
    direction: c = "ltr",
    matchAnchorWidth: b = !1
  } = n, r = {
    top: t.top - d,
    right: l.width - t.right - d,
    bottom: l.height - t.bottom - d,
    left: t.left - d
  }, g = o === "top" || o === "bottom" ? e.height : e.width, w = { top: "bottom", right: "left", bottom: "top", left: "right" }, m = f && r[o] < g && r[w[o]] > r[o] ? w[o] : o, a = m === "top" || m === "bottom", v = c === "rtl" ? "end" : "start";
  let h, u;
  return a ? (s === "center" ? h = t.left + (t.width - e.width) / 2 : s === v ? h = t.left : h = t.right - e.width, u = m === "bottom" ? t.bottom + i : t.top - e.height - i) : (h = m === "right" ? t.right + i : t.left - e.width - i, s === "center" ? u = t.top + (t.height - e.height) / 2 : s === "start" ? u = t.top : u = t.bottom - e.height), f && (h = p(h, d, l.width - e.width - d), u = p(u, d, l.height - e.height - d)), {
    side: m,
    style: {
      position: "fixed",
      top: u,
      left: h,
      visibility: "visible",
      ...b ? { minWidth: t.width } : {}
    }
  };
}
function L(t, e, l) {
  let n = null, o = !1;
  const s = () => {
    o || n !== null || (n = window.requestAnimationFrame(() => {
      n = null, o || l();
    }));
  };
  l();
  const i = typeof ResizeObserver > "u" ? null : new ResizeObserver(s);
  return i == null || i.observe(t), i == null || i.observe(e), window.addEventListener("resize", s), window.addEventListener("scroll", s, { capture: !0, passive: !0 }), () => {
    o = !0, n !== null && window.cancelAnimationFrame(n), i == null || i.disconnect(), window.removeEventListener("resize", s), window.removeEventListener("scroll", s, !0);
  };
}
export {
  L as a,
  E as c
};
//# sourceMappingURL=positioning-Dou4VK0g.js.map
