# Sillar CLI

Project setup, focused component aliases, and installation diagnostics for Sillar UI.

```bash
npx sillar-cli init
npx sillar-cli add button dialog select
npx sillar-cli doctor
npx sillar-cli migrate radix --report
```

`init` creates `sillar.config.json` and a local UI directory. `add` creates small focused entry files that keep application imports consistent while Sillar remains an npm dependency. `doctor` verifies React, Sillar UI, the CLI configuration, and the global stylesheet import. `migrate radix` inventories Radix dependencies and source imports, identifies supported Sillar replacements, and can write a reviewable migration report without rewriting application code.

The CLI never overwrites a configuration or component file unless `--force` is passed.
