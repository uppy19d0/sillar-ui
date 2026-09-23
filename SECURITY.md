# Security policy

## Supported versions

Security fixes are released for the latest minor version of Sillar UI. Upgrade to the newest published version before reporting an issue that may already be resolved.

## Reporting a vulnerability

Please use [GitHub's private vulnerability report](https://github.com/uppy19d0/sillar-ui/security/advisories/new) and include the affected version, a minimal reproduction, impact, and any known workaround. Do not open a public issue for an undisclosed vulnerability.

The project will acknowledge a complete report, validate its impact, and coordinate a fix and disclosure through the private advisory.

## Response targets

- Acknowledge a complete report within three business days.
- Start impact assessment within seven business days.
- Prioritise a coordinated patch according to exploitability and user impact.
- Publish an advisory, fixed version, and mitigation guidance together whenever possible.

These are response targets rather than a guarantee. Please keep reports private until a coordinated disclosure is complete.

## Supply-chain controls

Releases are created only by the repository's tag-triggered GitHub Actions workflow. npm Trusted Publishing exchanges GitHub's short-lived OIDC identity directly with npm, and npm attaches provenance to each public release. The workflow verifies that the tag exactly matches `package.json`, installs from the lockfile, checks registry signatures, runs the complete quality suite, and uses immutable action revisions.

Production and development dependencies are audited in CI. Dependabot monitors npm packages and GitHub Actions, dependency review blocks newly introduced high-severity vulnerabilities, and CodeQL scans JavaScript and TypeScript changes.
