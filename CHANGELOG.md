# Changelog

## 1.4.0 — 2026-10-18

- Add `Table`, `Pagination`, `Breadcrumb` and `Drawer` with focused `sillar-ui/table`, `sillar-ui/pagination`, `sillar-ui/breadcrumb` and `sillar-ui/drawer` entry points, `sillar-cli add` support and reference documentation.
- Add `getPaginationRange` for headless pagination with a constant item count; `Table` names its scroll region only when a label is provided.
- Keep keyboard focus inside Dialog (and Drawer) when the browser skips buttons while tabbing, as Safari does with default settings; focus that escapes is returned to the first or last control.
- Add live Table, Pagination, Breadcrumb and Drawer demos to the documentation site and cross-browser Playwright coverage (Chromium, Firefox, WebKit, mobile).
- Raise the aggregate size budgets (JavaScript 120→128 kB raw / 45→48.5 kB gzip, CSS 48→55.5 kB raw / 8→9.1 kB gzip, about 1–2% above the measured size) to cover the four new components; per-module and consumer-bundle budgets are unchanged.
- Prevent disabled/loading `Button asChild` controls from executing child activation handlers; preserve enabled composition and support React 18/19 ref lifecycles.
- Add `FormErrorSummary` with field links, localization and caller-controlled focus, plus stable form control/description/error associations.
- Prevent duplicate asynchronous form submissions and keep same-tick edits/reset values current.
- Batch overlay scroll/resize/observer updates into one animation frame and cancel pending work on cleanup.
- Add real consumer-bundle budgets including runtime class utilities and bilingual form workflow examples.

## 1.3.1

- Document package runtime permissions, supply-chain verification and scanner limitations.
- Gate CI/publication on reviewed artifact contents and add regression checks for packaging risks.
- Keep reviewed dependency update automation and preserve existing runtime APIs.

## 1.3.0

- Add LoadingIndicator with localized status text, three sizes, decorative mode and reduced-motion support.
- Reuse the indicator in busy buttons to keep loading feedback consistent.

## 1.2.1 — 2026-09-30

- Prepare npm Trusted Publishing with provenance and hardened release checks.
- Keep the component contract snapshot stable across React 18 and 19 by normalizing generated field IDs.

## 1.2.0

- Deepen the composed Select with shared collection typeahead, labeled groups, separators, configurable focus looping, required state, and correct initial value labels.
- Add the independent `sillar-cli` foundation with safe project initialization, focused component aliases, installation diagnostics, and a discoverable component registry.
- Expand Combobox with controlled open state, groups, custom filters, async loading feedback, creatable options, accessible result announcements, and disabled-item-aware navigation.
- Add a non-destructive `sillar migrate radix` audit that maps supported packages, reports source locations, and generates a reviewable migration plan.
- Add `sillar tokens init` and `sillar tokens check` to generate branded light/dark overrides and enforce complete, WCAG AA contrast-safe token contracts.
- Add the Sillar Browser Lab with real-browser interaction coverage across Chromium, Firefox, WebKit, mobile overflow checks, and reviewed light/dark visual snapshots.
- Add composed application patterns for pricing and business forms, with reusable numeric inputs and result summaries.

All notable changes to Sillar UI are documented here.

## 1.1.0 — 2026-09-23

- Add Tooltip, Popover, Accordion, Collapsible, Toast, Checkbox, RadioGroup, composed Select, Combobox, NavigationMenu, Progress, Skeleton, typed Form validation, and DatePicker.
- Add per-component package entry points with independent bundle budgets.
- Launch bilingual documentation with interactive examples, an editable playground, keyboard and token references, Radix migration guidance, and an ecosystem comparison.
- Add `llms.txt` and Markdown component documentation for AI-assisted development.
- Add automated GitHub Pages deployment for the documentation site.

## 1.0.0 — 2026-09-22

- Introduce a private behavior kernel shared by Dialog, DropdownMenu, and future overlay primitives.
- Centralize portals, focus containment, nested layer ordering, modal isolation, scroll locking, and outside-pointer dismissal.
- Document the system architecture, component contract, evolution policy, and first architecture decision record.
- Share collision-aware positioning and roving focus behavior across DropdownMenu and Tabs.
- Add a presence foundation for future animated overlays without premature unmounting.
- Establish semantic-versioning, support, contribution, and community policies for the stable 1.x line.
- Move continuous integration to the Node 24 action runtime.
- Publish official releases through tokenless npm Trusted Publishing with verifiable provenance.
- Celebrate the project as made with love in the Dominican Republic by @uppy19d0.

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
