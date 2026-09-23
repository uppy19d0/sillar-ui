function b(t, e, i) {
  return Math.max(e, Math.min(t, i));
}
function L(t, e, i, o = {}) {
  const {
    side: d = "bottom",
    align: m = "start",
    sideOffset: w = 6,
    collisionPadding: s = 8,
    avoidCollisions: r = !0,
    direction: p = "ltr",
    matchAnchorWidth: g = !1
  } = o, f = {
    top: t.top - s,
    right: i.width - t.right - s,
    bottom: i.height - t.bottom - s,
    left: t.left - s
  }, u = d === "top" || d === "bottom" ? e.height : e.width, c = { top: "bottom", right: "left", bottom: "top", left: "right" }, h = r && f[d] < u && f[c[d]] > f[d] ? c[d] : d, v = h === "top" || h === "bottom", E = p === "rtl" ? "end" : "start";
  let l, n;
  return v ? (m === "center" ? l = t.left + (t.width - e.width) / 2 : m === E ? l = t.left : l = t.right - e.width, n = h === "bottom" ? t.bottom + w : t.top - e.height - w) : (l = h === "right" ? t.right + w : t.left - e.width - w, m === "center" ? n = t.top + (t.height - e.height) / 2 : m === "start" ? n = t.top : n = t.bottom - e.height), r && (l = b(l, s, i.width - e.width - s), n = b(n, s, i.height - e.height - s)), {
    side: h,
    style: {
      position: "fixed",
      top: n,
      left: l,
      visibility: "visible",
      ...g ? { minWidth: t.width } : {}
    }
  };
}
function x(t, e, i) {
  i();
  const o = typeof ResizeObserver > "u" ? null : new ResizeObserver(i);
  return o == null || o.observe(t), o == null || o.observe(e), window.addEventListener("resize", i), window.addEventListener("scroll", i, !0), () => {
    o == null || o.disconnect(), window.removeEventListener("resize", i), window.removeEventListener("scroll", i, !0);
  };
}
export {
  x as a,
  L as c
};
//# sourceMappingURL=positioning-Baw9HQqS.js.map
