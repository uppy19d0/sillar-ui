# ADR 0001: Shared behavior kernel

- Status: accepted
- Date: 2026-09-22

## Context

Dialog and DropdownMenu initially implemented portals, dismissal, and layer behavior independently. More overlays such as Tooltip, Popover, Select, and NavigationMenu would multiply that code and allow accessibility behavior to drift.

## Decision

Sillar UI will maintain a private behavior kernel in `src/internal/`. Public primitives compose small internal modules for portals, focus scopes, dismissable layers, modal isolation, positioning, presence, collections, and roving focus.

Internal modules stay outside package exports. Their behavior is covered through public component interaction tests, including nested layers and cleanup.

## Consequences

- Fixes to shared interaction behavior benefit every consuming primitive.
- New components start with established accessibility behavior.
- Internal changes require wider regression testing because several components can depend on one module.
- Public APIs remain independent from the kernel and can stay stable while its implementation evolves.
