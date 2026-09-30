# Releasing Sillar UI

Sillar UI releases are built from immutable Git tags and published through npm Trusted Publishing. Maintainers do not need an npm token.

In npm package settings, configure the GitHub Actions trusted publisher for `sillar-ui` with owner `uppy19d0`, repository `sillar-ui`, workflow filename `publish.yml`, and direct `npm publish` allowed. Configure `sillar-cli` separately with workflow filename `publish-cli.yml`. Neither workflow uses a GitHub environment. Revoke any old npm publish token after a successful trusted release.

Before the next `sillar-ui` release, reconcile `sillar-ui@1.2.0` on npm with its source: the public `main` branch currently declares 1.1.0 and has no `v1.2.0` tag. Recover and review the exact 1.2.0 source commit before advancing the root package version. Do not tag the older 1.1.0 source as 1.2.0.

## Release process

1. Update `CHANGELOG.md` and the version in `package.json` and `package-lock.json`.
2. Run `npm ci`, `npm audit signatures`, and `npm run check` from a clean checkout.
3. Merge through a pull request after every required check succeeds.
4. Create an annotated tag that exactly matches the package version: `v<version>`.
5. Push the tag. The publish workflow verifies the tag, rebuilds and tests the package, then publishes with npm provenance.
6. Confirm the version and provenance on npm, then create the matching GitHub release.

Never retry a failed release by moving or replacing a published tag. Fix the cause, increment the version, and create a new tag. npm versions and Git tags are immutable release records.

## Version policy

- Patch: compatible fixes, documentation corrections, and internal changes.
- Minor: compatible components, properties, tokens, and behavior.
- Major: removals or incompatible changes after the deprecation process in `STABILITY.md`.

Prereleases use a SemVer prerelease version and an explicit npm distribution tag. Stable releases always publish to `latest`.

## CLI releases

The companion CLI is versioned independently in `packages/cli/package.json`. Tag CLI releases as `cli-v<version>`. The dedicated workflow validates the tag, runs the complete Sillar quality suite, and publishes `sillar-cli` with npm provenance.
