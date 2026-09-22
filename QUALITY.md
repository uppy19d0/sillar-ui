# Quality contract

Sillar UI treats accessibility, predictable behavior, and package weight as public API. A release must pass the same checks consumers run against the compiled npm package.

## Release gates

- Strict TypeScript validation and a production ESM build.
- Server-rendering smoke tests against the public `dist` entry point.
- DOM interaction tests for focus management, keyboard navigation, dismissal, and controlled state.
- Automated axe checks with zero serious or critical violations in the covered examples.
- A dependency regression test that rejects every `@radix-ui/*` package and import.
- Bundle budgets of 36 kB raw / 9 kB gzip for JavaScript and 22 kB raw / 5.5 kB gzip for CSS.
- Compatibility checks on React 18.3 and React 19.3.
- A production dependency audit at high severity before merge.

Automated accessibility checks find common failures; they do not certify every composition or consumer application. Components still need manual keyboard and assistive-technology testing when their content or behavior is changed.

## Interaction guarantees

Dialog isolates outside content, locks background scrolling, traps focus in the top layer, handles nested dialogs, closes with Escape, and restores focus. DropdownMenu implements directional navigation, Home/End, typeahead, disabled-item exclusion, collision-aware positioning, outside dismissal, and trigger focus restoration. Tabs supports horizontal and vertical navigation plus automatic and manual activation.

These behaviors follow the relevant [WAI-ARIA Authoring Practices patterns](https://www.w3.org/WAI/ARIA/apg/patterns/). Native HTML controls remain the default where the platform already provides the correct behavior.

## Supported baseline

- React and React DOM 18.2 or newer.
- Modern evergreen browsers with ES2022 modules and CSS custom properties.
- Server rendering without access to browser globals during render.
- Styling through the `slr-` class namespace and `--slr-*` custom properties.

## Roadmap

The next quality milestones are browser-driven tests across Chromium, Firefox, and WebKit; documented screen-reader checks; unstyled primitive entry points; and more complete form, overlay, navigation, and collection primitives. Each new component must enter through the same release gates.
