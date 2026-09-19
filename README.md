<p align="center">
  <img src="assets/sillar-mark.svg" width="88" height="88" alt="Sillar UI logo" />
</p>

<h1 align="center">Sillar UI</h1>

<p align="center">Accessible React building blocks for consistent product interfaces.</p>

Accessible React components and design tokens for consistent product interfaces. The package is small, typed, themeable with CSS custom properties, and works without a Tailwind runtime.

## Install

```bash
npm install git+https://github.com/uppy19d0/sillar-ui.git#v0.2.0
```

The package is prepared for a future npm release; the versioned GitHub install is available now.

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

## Development

```bash
npm install
npm run check
```

Contributions are welcome through issues and pull requests. Please keep public APIs typed and preserve keyboard focus behavior.

The component source lives in `src/`, declarations and distributable assets are generated in `dist/`, and smoke tests verify the public build exactly as consumers import it.

## License

MIT
