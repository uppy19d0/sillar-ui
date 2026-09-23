function c(n, r, { direction: t, loop: a = !0 }) {
  if (n.length === 0) return null;
  if (t === "first") return n[0];
  if (t === "last") return n.at(-1) ?? null;
  const l = Math.max(0, n.indexOf(r ?? n[0])) + (t === "next" ? 1 : -1), e = a ? (l + n.length) % n.length : Math.max(0, Math.min(l, n.length - 1));
  return n[e] ?? null;
}
export {
  c as m
};
//# sourceMappingURL=roving-focus-BBnqq1MU.js.map
