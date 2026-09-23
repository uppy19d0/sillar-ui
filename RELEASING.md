# Releasing Sillar UI

Sillar UI releases are built from immutable Git tags and published through npm Trusted Publishing. Maintainers do not need an npm token.

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
