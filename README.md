<p align="center">
  <img src="assets/sillar-mark.svg" width="88" height="88" alt="Sillar UI logo" />
</p>

<h1 align="center">Sillar UI</h1>

<p align="center">Accessible React building blocks for consistent product interfaces.</p>

Accessible React components and design tokens for consistent product interfaces. The package is small, typed, themeable with CSS custom properties, and works without a Tailwind runtime. Its interactive primitives are implemented by Sillar UI and do not depend on Radix UI or another component runtime.

## Install

```bash
npm install sillar-ui
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

## Theming

Override the `--slr-*` custom properties on `:root`, a theme wrapper, or `.dark`. The package ships light and dark defaults and respects `prefers-reduced-motion`.

```css
:root {
  --slr-color-brand: #2563eb;
  --slr-color-brand-hover: #1d4ed8;
  --slr-radius-md: 1rem;
}
```

Sillar UI owns only its `slr-` class namespace and `--slr-` variables, so it can coexist with Tailwind, CSS Modules, CSS-in-JS, or plain CSS.

## Accessibility and quality

Dialog, DropdownMenu, and Tabs follow the corresponding [WAI-ARIA Authoring Practices patterns](https://www.w3.org/WAI/ARIA/apg/patterns/). Their keyboard, focus, dismissal, and ARIA relationships are exercised against the compiled package with DOM interaction tests and axe. Native controls are used when the browser already provides the required semantics.

Every release enforces public JavaScript and CSS size budgets and rejects Radix dependencies in both the manifest and lockfile. See the [quality contract](QUALITY.md) for the current guarantees, supported baseline, and next milestones. Security reports are handled through the private process in [SECURITY.md](SECURITY.md).

## Development

```bash
npm install
npm run check
```

Contributions are welcome through issues and pull requests. Please keep public APIs typed and preserve keyboard focus behavior. `npm run check` verifies the production build, bundle budgets, interaction behavior, accessibility examples, and that the published runtime stays free of Radix dependencies.

The component source lives in `src/`, declarations and distributable assets are generated in `dist/`, and smoke tests verify the public build exactly as consumers import it.

## License

MIT
