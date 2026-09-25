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
