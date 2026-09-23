# Contributing to Sillar UI

Thank you for helping build accessible interface foundations from the Dominican Republic for developers everywhere.

## Before opening a pull request

1. Discuss substantial public API changes in an issue first.
2. Keep components composable and product-agnostic.
3. Use semantic HTML and follow the relevant WAI-ARIA pattern.
4. Preserve user event handlers, refs, controlled state, keyboard behavior, and server rendering.
5. Add interaction tests for behavior and update reviewed snapshots only for intentional contract changes.
6. Run `npm run check`.

Architecture changes need a short ADR in `docs/decisions/`. Public breaking changes must include migration notes and follow `STABILITY.md`.

By participating, you agree to follow `CODE_OF_CONDUCT.md`.
