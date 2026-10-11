# Security policy

Report a vulnerability privately through the [Sillar UI security advisory form](https://github.com/uppy19d0/sillar-ui/security/advisories/new). Include the affected `sillar-cli` version, reproduction steps, and expected impact. Please allow time for a coordinated fix before sharing a public report.

The CLI writes local project files when you run its commands. It does not download remote component code or run package installation commands.

Generated output refuses symbolic links below the selected project root, including existing files used with `--force`. On platforms that expose it, files are also opened with `O_NOFOLLOW`. The CLI still requires a trusted local working directory: concurrent hostile replacement of parent directories is outside this protection. File access is necessary for project setup; a Socket filesystem-access signal is not a reason to hide that behavior.
