function a(s, t) {
  const n = (r) => {
    var i;
    const o = r.target;
    s.contains(o) || (i = t.branches) != null && i.some((e) => e == null ? void 0 : e.contains(o)) || t.onDismiss();
  };
  return document.addEventListener("pointerdown", n), () => document.removeEventListener("pointerdown", n);
}
export {
  a
};
//# sourceMappingURL=dismissable-layer-HbfqlJA5.js.map
