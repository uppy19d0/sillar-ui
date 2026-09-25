# ADR 0002: Separate CLI package

- Status: accepted
- Date: 2026-09-24

## Context

Project diagnostics, scaffolding, migrations, and token generation need Node.js APIs. Shipping those APIs from the React package would increase the installed surface and mix browser and command-line responsibilities.

## Decision

Sillar maintains the CLI in `packages/cli` and publishes it independently as `sillar-cli`, exposing the `sillar` binary. The first contract provides `init`, `add`, `doctor`, and `list`. Commands use only Node.js built-ins, reject paths outside the project, and do not overwrite files unless the user passes `--force`.

The React package remains independently publishable and has no runtime dependency on the CLI. Future migration and token commands will use the same configuration file and command parser.

## Consequences

- Applications can run the CLI temporarily through `npx sillar-cli`.
- CLI releases can move independently from component releases.
- Registry additions require a CLI release until a signed remote registry is introduced.
- CI must test both the React package and the CLI.
