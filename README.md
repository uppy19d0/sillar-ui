<p align="center">
  <img src="assets/sillar-mark.svg" width="88" height="88" alt="Sillar UI logo" />
</p>

<p align="center"><a href="https://uppy19d0.github.io/sillar-ui/"><strong>Documentation</strong></a> · <a href="https://uppy19d0.github.io/sillar-ui/#components">Components</a> · <a href="https://uppy19d0.github.io/sillar-ui/#playground">Playground</a> · <a href="https://uppy19d0.github.io/sillar-ui/llms.txt">llms.txt</a></p>

<h1 align="center">Sillar UI</h1>

<p align="center">Accessible React building blocks for consistent product interfaces.</p>

<p align="center"><strong>Made with love in the Dominican Republic by <a href="https://github.com/uppy19d0">@uppy19d0</a>.</strong></p>

<p align="center">
  <a href="https://www.npmjs.com/package/sillar-ui"><img alt="npm version" src="https://img.shields.io/npm/v/sillar-ui" /></a>
  <a href="https://github.com/uppy19d0/sillar-ui/actions/workflows/ci.yml"><img alt="CI status" src="https://github.com/uppy19d0/sillar-ui/actions/workflows/ci.yml/badge.svg" /></a>
  <a href="LICENSE"><img alt="MIT license" src="https://img.shields.io/npm/l/sillar-ui" /></a>
</p>

Accessible React components and design tokens for consistent product interfaces. The package is small, typed, themeable with CSS custom properties, and works without a Tailwind runtime. Its interactive primitives are implemented by Sillar UI and do not depend on Radix UI or another component runtime.

## Install

```bash
npm install sillar-ui
```

Set up and verify a project with the companion CLI:

```bash
npx sillar-cli init
npx sillar-cli add button dialog select
npx sillar-cli doctor
npx sillar-cli migrate radix --report
npx sillar-cli tokens init --brand '#6750a4'
npx sillar-cli tokens check
```

Import the stylesheet once at the application entry point:

```tsx
import 'sillar-ui/styles.css';
```

Then compose the primitives:

```tsx
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from 'sillar-ui';

export function Example() {
  return (
    <Card>
      <CardHeader>
        <Badge variant="success">Production ready</Badge>
        <CardTitle>Clear defaults, flexible composition</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Start building</Button>
      </CardContent>
    </Card>
  );
}
```

## Components

- Button with loading state, six visual variants, seven sizes, and `asChild` composition
- IconButton with a required accessible label
- Badge with status and neutral variants
- Card primitives with default, elevated, subtle, and outline surfaces
- Input, Textarea, TextField, and Field composition with premium states, help text, counters, adornments, and errors
- Accessible Dialog primitives with focus trapping, Escape handling, and scroll locking
- Drawer panels from any viewport edge, built on the Dialog focus and scroll contract
- Table primitives with semantic headers, announced sort state, density and a named scroll region
- Pagination with a stable-width range, localized labels and optional real links, plus Breadcrumb navigation
- DropdownMenu with collision-aware positioning, typeahead, outside-click dismissal, and full keyboard navigation
- Tabs with automatic or manual activation and horizontal or vertical keyboard navigation
- Native Select, Label, and accessible controlled or uncontrolled Switch
- Slot for polymorphic composition without a third-party primitive layer
- Callout for information, success, warning, and error messages
- Separator with decorative and semantic modes
- Section primitives for product and marketing pages
- SkipLink and VisuallyHidden accessibility utilities
- `cn` utility for predictable class composition
- Tooltip and Popover with collision-aware positioning and dismissal
- Accordion and Collapsible disclosure primitives
- Toast notifications with live-region semantics
- Checkbox and RadioGroup choice controls
- Composed Select with typeahead and labeled groups, plus Combobox with groups, async loading, custom filtering, and creatable options
- NavigationMenu with roving keyboard focus
- Progress and Skeleton loading feedback
- Typed Form validation composition
- FormErrorSummary with linked field errors, localized headings and explicit focus control; duplicate async submissions are guarded.
- Localized DatePicker calendar grid
- CalculatorShell and CalculatorPanel for pricing tools, estimators, configurators, and guided workflows
- TextField for premium product forms with glass, filled, elevated, and default variants
- MoneyInput and PercentageInput with locale-aware numeric parsing
- ResultSummary and BreakdownList for totals, comparisons, KPI cards, invoices, and calculated outcomes
- ExportActions for print, PDF, copy, share, and download workflows
- FormGrid and FieldGroup for responsive product forms
- EmptyState, ErrorState, LoadingState, and ConfirmDialog for production feedback flows

Every component also has a focused entry point for smaller application bundles:

```tsx
import { Button } from 'sillar-ui/button';
import { Dialog, DialogContent, DialogTrigger } from 'sillar-ui/dialog';
import { MoneyInput } from 'sillar-ui/money-input';
import { TextField } from 'sillar-ui/text-field';
```

## Product patterns

Sillar UI includes composed patterns for real applications that need consistent UX across calculators, configurators, dashboards, checkout flows, backoffice screens, and self-service portals. These patterns use the same tokens and accessibility contracts as the primitives.

```tsx
import {
  CalculatorPanel,
  CalculatorShell,
  FormGrid,
  MoneyInput,
  PercentageInput,
  ResultSummary,
} from 'sillar-ui';

export function PricingEstimator() {
  return (
    <CalculatorShell
      eyebrow="Pricing"
      title="Plan estimator"
      badge="SaaS ready"
      aside={
        <ResultSummary
          title="Estimated monthly total"
          value="$349"
          description="Projected total based on the selected configuration."
          items={[
            { label: 'Base plan', value: '$249' },
            { label: 'Usage buffer', value: '$100', tone: 'warning' },
          ]}
        />
      }
    >
      <CalculatorPanel title="Configuration inputs">
        <FormGrid>
          <MoneyInput currency="USD" aria-label="Monthly budget" />
          <PercentageInput aria-label="Growth percentage" />
          <TextField label="Workspace" leading="@" trailing=".app" variant="glass" />
        </FormGrid>
      </CalculatorPanel>
    </CalculatorShell>
  );
}
```

## Theming

Override the `--slr-*` custom properties on `:root`, a theme wrapper, or `.dark`. The package ships layered light and dark defaults for page backgrounds, raised and sunken surfaces, hover states, borders, text, feedback colors, overlays, focus rings, and elevation. It also respects `prefers-reduced-motion`.

Apply the dark theme with either a class or an explicit data attribute:

```tsx
<main data-theme="dark">
  <Card>Dark theme content</Card>
</main>
```

```css
:root {
  --slr-color-brand: #2563eb;
  --slr-color-brand-hover: #1d4ed8;
  --slr-color-brand-soft: #eff6ff;
  --slr-color-surface-raised: #ffffff;
  --slr-color-surface-sunken: #f8fafc;
  --slr-radius-md: 1rem;
}
```

Use `--slr-color-surface`, `--slr-color-surface-raised`, and `--slr-color-surface-sunken` to preserve depth across themes. Use `--slr-color-muted` for readable secondary copy and `--slr-color-subtle` for low-emphasis metadata. Every feedback color also includes a matching `*-soft` surface token.

Sillar UI owns only its `slr-` class namespace and `--slr-` variables, so it can coexist with Tailwind, CSS Modules, CSS-in-JS, or plain CSS.

## Accessibility and quality

Dialog, DropdownMenu, and Tabs follow the corresponding [WAI-ARIA Authoring Practices patterns](https://www.w3.org/WAI/ARIA/apg/patterns/). Their keyboard, focus, dismissal, and ARIA relationships are exercised against the compiled package with DOM interaction tests and axe. Native controls are used when the browser already provides the required semantics.

Every release enforces public JavaScript and CSS size budgets and rejects Radix dependencies in both the manifest and lockfile. See the [quality contract](QUALITY.md) for the current guarantees, supported baseline, and next milestones. Security reports are handled through the private process in [SECURITY.md](SECURITY.md).

### Form workflows and performance

Use `FormItem controlId` to connect labels, help text, error messages and summary links to the same input. `FormErrorSummary` accepts `errors={[{ id: 'email', message: 'Enter a valid email.' }]}` and a localized `title`. Its forwarded ref lets the application focus the summary after a failed submit; mounting it never moves focus automatically. See the complete [English example](docs-public/forms.md) or [ejemplo en español](docs-public/formularios.md).

`useForm` prevents concurrent submits, reads same-tick edits correctly and releases its submit lock after success or failure. Resetting a draft keeps an existing request busy until it settles; it does not cancel that request. Applications remain responsible for server validation and request cancellation.

Disabled or loading `Button asChild` controls block child activation handlers, including keyboard activation. Supply one element; custom components must forward events, attributes and refs. Fragments cannot provide that contract. Enabled composition keeps child-first handler ordering and honors `preventDefault()`.

Overlay placement is immediate on opening; bursts of scroll, resize and observer notifications share one animation frame. `npm run size:consumer` measures consumer bundles with runtime class utilities included and checks that unrelated components are removed. These fixtures exclude React, CSS and app code; they are size checks, not latency benchmarks.

Official releases publish from GitHub Actions through npm Trusted Publishing. Each npm artifact receives verifiable provenance without storing a long-lived registry token. The complete immutable-tag workflow is documented in [the release guide](RELEASING.md).

The shared behavior kernel prevents focus, portal, dismissal, positioning, and nested-layer logic from drifting between components. Read [the architecture guide](ARCHITECTURE.md) for its boundaries and component contract.

Sillar UI 1.x follows a documented [stability policy](STABILITY.md). Support requests and reproducible defects are welcome through the channels in [SUPPORT.md](SUPPORT.md), and contributions follow [CONTRIBUTING.md](CONTRIBUTING.md).

## Development

```bash
npm install
npm run check
```

Contributions are welcome through issues and pull requests. Please keep public APIs typed and preserve keyboard focus behavior. `npm run check` verifies the production build, bundle budgets, interaction behavior, accessibility examples, and that the published runtime stays free of Radix dependencies.

The component source lives in `src/`, declarations and distributable assets are generated in `dist/`, and smoke tests verify the public build exactly as consumers import it.

## License

MIT

Made with love in the Dominican Republic by [@uppy19d0](https://github.com/uppy19d0).

## Loading feedback

```tsx
import { LoadingIndicator } from 'sillar-ui/loading-indicator';
import 'sillar-ui/styles.css';

<LoadingIndicator label="Cargando ofertas…" size="md" />
```

Render it only while work is pending. `showLabel={false}` keeps the localized text available to assistive technology. Use `decorative` inside an already labelled busy button; `Button loading` includes it automatically. Keep existing results visible during refresh and set `aria-busy` on the region being updated. The indicator uses CSS only, honors reduced motion and never steals focus. Use `Progress` for known percentages and `LoadingState` for skeleton layouts.


## Supply-chain verification and runtime permissions

Runtime: React components and styling utilities with published peer/dependency contracts. The separate sillar-cli intentionally reads and writes files in the project selected by the user; it rejects linked output paths. UI components do not silently install or invoke the CLI.

Install the exact version required by your application and commit your lockfile. Releases request npm provenance from GitHub Actions, and CI checks the dependency graph and package contents before publication. The artifact guard rejects recognized credential patterns, private/environment files, unsafe paths, missing attribution/metadata and unexpected consumer install hooks. It is a focused release check, not proof that every secret or malicious behavior is detectable.

```sh
npm install --save-exact sillar-ui@1.3.1
npm audit
npm audit signatures
```

When the installed graph has no registry dependencies, npm may report that there are no dependency signatures to verify.

Inspect the exact-version [Socket report](https://socket.dev/npm/package/sillar-ui/overview/1.3.1) and the npm provenance link. A successful CI check is not the same as a package score of 100. Socket also weighs dependency counts and real adoption; no score, download history or security guarantee is fabricated. Report suspected issues through SECURITY.md.

## Visual foundations

See [product design foundations](docs/decisions/0003-product-design-foundations.md) for spacing, typography, themes and component states. The complete stylesheet includes the tokens; `sillar-ui/tokens.css` is also exported for custom interfaces that only need the foundations.
