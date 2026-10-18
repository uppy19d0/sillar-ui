import { jsx as s } from "react/jsx-runtime";
import * as l from "react";
import { DialogContent as D } from "./dialog.js";
import { Dialog as c, DialogClose as f, DialogDescription as C, DialogFooter as T, DialogHeader as _, DialogTitle as x, DialogTrigger as y } from "./dialog.js";
import { cn as r } from "./utils.js";
const g = l.forwardRef(
  ({ side: a = "right", className: e, overlayClassName: o, ...t }, i) => /* @__PURE__ */ s(
    D,
    {
      ...t,
      ref: i,
      "data-side": a,
      className: r("slr-drawer__content", e),
      overlayClassName: r("slr-drawer__overlay", o)
    }
  )
);
g.displayName = "DrawerContent";
export {
  c as Drawer,
  f as DrawerClose,
  g as DrawerContent,
  C as DrawerDescription,
  T as DrawerFooter,
  _ as DrawerHeader,
  x as DrawerTitle,
  y as DrawerTrigger
};
//# sourceMappingURL=drawer.js.map
