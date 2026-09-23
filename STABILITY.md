# Stability policy

Sillar UI 1.x follows semantic versioning for components, exported types, behavior, markup relied on for accessibility, and documented `--slr-*` design tokens.

## What is stable

- Names and import paths exported from `sillar-ui` and `sillar-ui/styles.css`.
- Component props, ref targets, controlled-state callbacks, and documented defaults.
- Keyboard and focus behavior described in `QUALITY.md`.
- Documented semantic design tokens and the `slr-` CSS namespace.
- React 18.2 and newer support within the 1.x release line.

Internal modules under `src/internal/`, generated DOM IDs, source file locations, and undocumented CSS details are implementation details.

## Deprecations

A stable API is deprecated in a minor release before removal in the next major release. The changelog identifies the replacement and migration path. Security or correctness issues may require faster action, but releases will preserve compatibility whenever a safe path exists.

## Releases

- Patch: compatible fixes, documentation, and internal improvements.
- Minor: compatible components, props, tokens, and capabilities.
- Major: removals or incompatible public behavior, with a migration guide.

Every release must pass the gates in `QUALITY.md` against its compiled package.
