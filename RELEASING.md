# Releasing Sillar UI

Sillar UI releases are built from immutable Git tags and published through npm Trusted Publishing. Maintainers do not need an npm token.

In npm package settings, configure the GitHub Actions trusted publisher for `sillar-ui` with owner `uppy19d0`, repository `sillar-ui`, workflow filename `publish.yml`, and direct `npm publish` allowed. Configure `sillar-cli` separately with workflow filename `publish-cli.yml`. Neither workflow uses a GitHub environment. Revoke any old npm publish token after a successful trusted release.

The source for the published `sillar-ui@1.2.0` package is now on `main` through [PR #15](https://github.com/uppy19d0/sillar-ui/pull/15). All 202 files in that npm tarball match commit `fd46a22ad26f2bc14193cba3eb603b61b77c3c65` byte for byte. Version 1.2.0 was published without a matching Git tag or npm provenance attestation and cannot be replaced. The next trusted release is 1.2.1; verify its attestation on npm before retiring any old publishing token.

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
