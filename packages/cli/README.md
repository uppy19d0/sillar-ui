# Sillar CLI

Project setup, focused component aliases, and installation diagnostics for Sillar UI.

```bash
npx sillar-cli init
npx sillar-cli add button dialog select
npx sillar-cli doctor
npx sillar-cli migrate radix --report
npx sillar-cli tokens init --brand '#6750a4'
npx sillar-cli tokens check
```

`init` creates `sillar.config.json` and a local UI directory. `add` creates small focused entry files that keep application imports consistent while Sillar remains an npm dependency. `doctor` verifies React, Sillar UI, the CLI configuration, and the global stylesheet import. `migrate radix` inventories dependencies and source imports, identifies supported Sillar replacements, and can write a reviewable migration report without rewriting application code.

`tokens init` generates a light and dark semantic brand theme without replacing Sillar's base stylesheet. `tokens check` validates the complete override contract and verifies that brand foreground pairs meet the WCAG AA 4.5:1 contrast threshold. Configure a different location with `tokensFile` in `sillar.config.json`.

The CLI never overwrites a configuration or component file unless `--force` is passed.


## Supply-chain verification and runtime permissions

Runtime: React components and styling utilities with published peer/dependency contracts. The separate sillar-cli intentionally reads and writes files in the project selected by the user; it rejects linked output paths. UI components do not silently install or invoke the CLI.

Install the exact version required by your application and commit your lockfile. Releases request npm provenance from GitHub Actions, and CI checks the dependency graph and package contents before publication. The artifact guard rejects recognized credential patterns, private/environment files, unsafe paths, missing attribution/metadata and unexpected consumer install hooks. It is a focused release check, not proof that every secret or malicious behavior is detectable.

```sh
npm install --save-exact sillar-cli@0.1.2
npm audit
npm audit signatures
```

When the installed graph has no registry dependencies, npm may report that there are no dependency signatures to verify.

Inspect the exact-version [Socket report](https://socket.dev/npm/package/sillar-cli/overview/0.1.2) and the npm provenance link. A successful CI check is not the same as a package score of 100. Socket also weighs dependency counts and real adoption; no score, download history or security guarantee is fabricated. Report suspected issues through SECURITY.md.
