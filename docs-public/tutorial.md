# Build your first interface with Sillar UI

This tutorial takes a React project from installation to a themed, keyboard-friendly product card.

## 1. Install and diagnose

```bash
npm install sillar-ui
npx sillar-cli init
npx sillar-cli doctor
```

## 2. Load the design system

Import the stylesheet once in your application entry point:

```tsx
import 'sillar-ui/styles.css';
```

## 3. Compose a product surface

```tsx
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from 'sillar-ui';

export function AccountSummary() {
  return (
    <Card variant="elevated">
      <CardHeader>
        <Badge variant="success">Active</Badge>
        <CardTitle>Caribbean account</CardTitle>
        <CardDescription>Your available balance and recent activity.</CardDescription>
      </CardHeader>
      <CardContent>
        <strong>RD$ 84,250.00</strong>
        <Button>View activity</Button>
      </CardContent>
    </Card>
  );
}
```

## 4. Add themes

Set `data-theme="dark"` on a wrapper or the document root. Override semantic `--slr-*` tokens for your brand instead of styling component internals.

## 5. Verify before shipping

- Navigate every action with the keyboard.
- Confirm visible focus and accessible labels.
- Check light and dark themes.
- Run `npx sillar-cli doctor` and your production build.

Continue with the [interactive documentation](https://uppy19d0.github.io/sillar-ui/) or read the [component reference](./components.md).
