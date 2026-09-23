# Changelog

All notable changes to Sillar UI are documented here.

## 0.6.0 — 2026-09-22

- Add layered semantic tokens for raised, sunken, and hover surfaces, stronger borders, subtle text, overlays, and soft feedback states.
- Rebalance the built-in light and dark palettes for clearer depth, calmer contrast, and more legible secondary content.
- Refine buttons, badges, cards, fields, switches, callouts, menus, dialogs, and tabs to use the new theme layers consistently.
- Apply the correct native `color-scheme` in light and dark theme scopes and document explicit theme composition.
- Ensure root-level `.dark` and `data-theme="dark"` selectors override the light defaults reliably.
- Add reviewed snapshots for representative component composition and the complete light/dark token contract.

## 0.5.0 — 2026-09-21

- Add accessible Tabs with automatic or manual activation, horizontal or vertical orientation, looping navigation, and controlled state.
- Strengthen Dialog with outside-content isolation, nested-layer handling, valid accessible naming, initial/final focus controls, and shared controlled-state behavior.
- Add DropdownMenu typeahead, ArrowUp entry, collision-aware positioning, side and alignment controls, and disabled-item exclusion.
- Add DOM interaction and axe accessibility tests for focus, keyboard, dismissal, and ARIA relationships.
- Publish bundle-size budgets, a quality contract, a security policy, and React 18/19 CI compatibility checks.

## 0.4.0 — 2026-09-20

- Replace Radix Slot and Dialog with Sillar-owned accessible primitives.
- Add Sillar-owned DropdownMenu, Select, Switch, Label, and Slot components.
- Add focus trapping, Escape handling, focus restoration, scroll locking, and keyboard menu navigation.
- Remove all `@radix-ui/*` runtime dependencies.

## 0.3.0 — 2026-09-20

- Refine component surfaces with clearer hierarchy, layered shadows, and more consistent radii.
- Improve button depth, hover feedback, outlines, and compact sizing.
- Improve cards, fields, badges, callouts, and dialogs in light and dark themes.
- Add more legible typography and calmer focus and border treatments.

## 0.2.1 — 2026-09-20

- Prevent disabled or loading polymorphic buttons from following links.
- Preserve the single-child contract when `asChild` is used.
- Prepare the package for installation from the npm registry.

## 0.2.0 — 2026-09-19

- Add accessible Dialog primitives powered by Radix UI.
- Add IconButton, Callout, Field, SkipLink, and VisuallyHidden components.
- Add Button loading states and three icon sizes.
- Add four Card surface variants and stronger invalid field states.
- Expand dark-mode tokens, motion preferences, and component tests.

## 0.1.1 — 2026-09-19

- Clarify versioned installation from the public GitHub repository.
- Add the Sillar visual mark and theming example.

## 0.1.0 — 2026-09-19

- Launch Button, Badge, Card, Input, Textarea, Separator, and Section primitives.
- Ship typed ESM output, semantic CSS tokens, dark mode, reduced motion, tests, and CI.
