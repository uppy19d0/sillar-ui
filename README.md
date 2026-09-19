# Sillar UI

Accessible React components and design tokens for consistent product interfaces. The package is small, typed, themeable with CSS custom properties, and works without a Tailwind runtime.

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

- Button with six visual variants, four sizes, and `asChild` composition
- Badge with status and neutral variants
- Card primitives for flexible content structure
- Input and Textarea with consistent focus and invalid states
- Separator with decorative and semantic modes
- Section primitives for product and marketing pages
- `cn` utility for predictable class composition

## Theming

Override the `--slr-*` custom properties on `:root`, a theme wrapper, or `.dark`. The package ships light and dark defaults and respects `prefers-reduced-motion`.

## Development

```bash
npm install
npm run check
```

Contributions are welcome through issues and pull requests. Please keep public APIs typed and preserve keyboard focus behavior.

## License

MIT
