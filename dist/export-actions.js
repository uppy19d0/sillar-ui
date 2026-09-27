import { jsx as k } from "react/jsx-runtime";
import { Button as x } from "./button.js";
import { cn as C } from "./utils.js";
const d = {
  copy: "Copy",
  download: "Download",
  pdf: "Export PDF",
  print: "Print",
  share: "Share"
};
function s({
  labels: i,
  onCopy: t,
  onDownload: r,
  onPdf: p,
  onPrint: c,
  onShare: f
}) {
  const n = [];
  return c && n.push({ kind: "print", label: (i == null ? void 0 : i.print) ?? d.print, onClick: c }), p && n.push({ kind: "pdf", label: (i == null ? void 0 : i.pdf) ?? d.pdf, onClick: p }), t && n.push({ kind: "copy", label: (i == null ? void 0 : i.copy) ?? d.copy, onClick: t }), f && n.push({ kind: "share", label: (i == null ? void 0 : i.share) ?? d.share, onClick: f }), r && n.push({
    kind: "download",
    label: (i == null ? void 0 : i.download) ?? d.download,
    onClick: r
  }), n;
}
function y({
  className: i,
  actions: t,
  labels: r,
  onPrint: p,
  onPdf: c,
  onCopy: f,
  onShare: n,
  onDownload: h,
  disabled: e = !1,
  size: m = "sm",
  ...a
}) {
  const u = t ?? s({ labels: r, onCopy: f, onDownload: h, onPdf: c, onPrint: p, onShare: n });
  return u.length === 0 ? null : /* @__PURE__ */ k("div", { "data-slot": "export-actions", className: C("slr-export-actions", i), ...a, children: u.map((o) => /* @__PURE__ */ k(
    x,
    {
      size: m,
      variant: o.variant ?? (o.kind === "pdf" ? "default" : "outline"),
      loading: o.loading,
      disabled: e || o.disabled,
      onClick: o.onClick,
      "data-export-action": o.kind,
      children: o.label
    },
    o.kind
  )) });
}
export {
  y as ExportActions
};
//# sourceMappingURL=export-actions.js.map
