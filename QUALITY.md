# Quality contract

Sillar UI treats accessibility, predictable behavior, and package weight as public API. A release must pass the same checks consumers run against the compiled npm package.

## Release gates

- Strict TypeScript validation and a production ESM build.
- Server-rendering smoke tests against the public `dist` entry point.
- Reviewed snapshots for composed public markup and the complete light/dark token contract.
- DOM interaction tests for focus management, keyboard navigation, dismissal, and controlled state.
- Automated axe checks with zero serious or critical violations in the covered examples.
- A dependency regression test that rejects every `@radix-ui/*` package and import.
- Per-component JavaScript budgets of 10 kB raw / 4 kB gzip, an aggregate 90 kB raw / 35 kB gzip ceiling across every entry, and a 34 kB raw / 7 kB gzip CSS budget.
- Compatibility checks on React 18.3 and React 19.3.
- A production dependency audit at high severity before merge.
- Tokenless npm Trusted Publishing through GitHub OIDC with registry provenance.

Automated accessibility checks find common failures; they do not certify every composition or consumer application. Components still need manual keyboard and assistive-technology testing when their content or behavior is changed.

## Interaction guarantees

Dialog isolates outside content, locks background scrolling, traps focus in the top layer, handles nested dialogs, closes with Escape, and restores focus. DropdownMenu implements directional navigation, Home/End, typeahead, disabled-item exclusion, collision-aware positioning, outside dismissal, and trigger focus restoration. Tabs supports horizontal and vertical navigation plus automatic and manual activation.

These behaviors follow the relevant [WAI-ARIA Authoring Practices patterns](https://www.w3.org/WAI/ARIA/apg/patterns/). Native HTML controls remain the default where the platform already provides the correct behavior.

## Supported baseline

- React and React DOM 18.2 or newer.
- Modern evergreen browsers with ES2022 modules and CSS custom properties.
- Server rendering without access to browser globals during render.
- Styling through the `slr-` class namespace and `--slr-*` custom properties.

Intentional markup or theme-token changes must update the reviewed snapshot with `npm run test:snapshots:update`. The regular test command remains read-only and fails when the compiled package diverges from that contract.

## Next quality milestones

The next quality milestones are browser-driven tests across Chromium, Firefox, and WebKit and documented screen-reader checks across VoiceOver, NVDA, and JAWS. Each new component must enter through the same release gates.
