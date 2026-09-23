# Sillar UI architecture

Sillar UI is a small, accessible React component system built and maintained in the Dominican Republic. Its architecture favors predictable behavior, progressive adoption, and a stable public API.

## Design principles

1. **Accessibility is behavior, not decoration.** Keyboard interaction, focus ownership, semantic HTML, accessible names, reduced motion, and contrast are part of each component contract.
2. **One behavior, one implementation.** Components share internal focus, layer, portal, dismissal, controlled-state, and positioning foundations. A bug fixed in the foundation should improve every component that uses it.
3. **Composition over configuration.** Public components expose small primitives that applications can assemble without inheriting product-specific markup.
4. **Native elements first.** Sillar uses browser controls when they already provide the correct semantics and behavior. Custom interaction is reserved for patterns that native HTML cannot express.
5. **Theme through semantic tokens.** Components consume `--slr-*` roles instead of fixed colors. Applications can change the visual language without rewriting component behavior.
6. **Small and observable releases.** Type checks, compiled-package tests, accessibility checks, reviewed snapshots, and bundle budgets guard every release.

## Layers

```text
Application components
        ↓
Public Sillar primitives
        ↓
Behavior kernel              Semantic design tokens
        ↓                              ↓
React + browser platform       CSS custom properties
```

The behavior kernel in `src/internal/` is private. It currently owns:

- `Portal`: consistent server-safe rendering outside the component tree.
- `FocusScope`: initial focus, focus containment, Escape dismissal, nested layer ordering, and focus restoration.
- `DismissableLayer`: outside-pointer dismissal with explicit safe branches.
- `Layer`: nested layer ordering, modal scroll locking, and reference-counted background isolation.
- Shared controlled-state, focusable-element, and layout-effect utilities.

Public components may use these modules, but consumers must not import them. This lets the internal contracts mature without creating breaking changes.

## Component contract

Every interactive primitive must document and test:

- controlled and uncontrolled state;
- keyboard interactions from the relevant WAI-ARIA pattern;
- focus entry, movement, dismissal, and restoration;
- disabled behavior and accessible naming;
- server rendering safety;
- light, dark, high-contrast, and reduced-motion behavior where applicable;
- composition through refs, event handlers, and `asChild` where exposed.

Tests run against `dist/`, the same compiled code applications install. Source-only success is insufficient.

## Evolution toward 1.0

The kernel also owns collision-aware positioning, automatic position updates, roving focus, and exit-animation presence. Collection registration is the next shared foundation. New overlays and composite widgets should be built only after the shared behavior they need exists in the kernel.

Public APIs follow semantic versioning. In the 1.x line, removals require a deprecation cycle. Design tokens are public API and follow the same policy.

Architecture decisions with lasting tradeoffs belong in `docs/decisions/`. Each decision records its context, chosen approach, consequences, and status so contributors can understand why the system works as it does.
