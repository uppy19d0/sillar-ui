import { jsxs as l, jsx as i } from "react/jsx-runtime";
import { Button as n } from "./button.js";
import { Dialog as C, DialogTrigger as m, DialogContent as f, DialogHeader as p, DialogTitle as v, DialogDescription as x, DialogFooter as j, DialogClose as o } from "./dialog.js";
function F({
  trigger: r,
  title: a,
  description: e,
  children: t,
  confirmLabel: d = "Confirm",
  cancelLabel: c = "Cancel",
  confirmVariant: h = "destructive",
  confirmLoading: g = !1,
  onConfirm: u,
  contentProps: D,
  ...s
}) {
  return /* @__PURE__ */ l(C, { ...s, children: [
    r ? /* @__PURE__ */ i(m, { asChild: !0, children: r }) : null,
    /* @__PURE__ */ l(f, { ...D, children: [
      /* @__PURE__ */ l(p, { children: [
        /* @__PURE__ */ i(v, { children: a }),
        e ? /* @__PURE__ */ i(x, { children: e }) : null
      ] }),
      t,
      /* @__PURE__ */ l(j, { children: [
        /* @__PURE__ */ i(o, { asChild: !0, children: /* @__PURE__ */ i(n, { variant: "outline", children: c }) }),
        /* @__PURE__ */ i(o, { asChild: !0, children: /* @__PURE__ */ i(n, { variant: h, loading: g, onClick: u, children: d }) })
      ] })
    ] })
  ] });
}
export {
  F as ConfirmDialog
};
//# sourceMappingURL=confirm-dialog.js.map
