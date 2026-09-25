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
- Input, Textarea, and Field composition with help and error states
- Accessible Dialog primitives with focus trapping, Escape handling, and scroll locking
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
- Localized DatePicker calendar grid

Every component also has a focused entry point for smaller application bundles:

```tsx
import { Button } from 'sillar-ui/button';
import { Dialog, DialogContent, DialogTrigger } from 'sillar-ui/dialog';
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
