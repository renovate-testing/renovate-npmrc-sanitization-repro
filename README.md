# Renovate `.npmrc` sanitization reproduction

This repository exercises two behaviors fixed by renovatebot/renovate#44652:

- an environment-variable authentication setting with whitespace around `=` must be removed from the temporary `.npmrc` used for artifact generation
- the original nested repository `.npmrc` must be restored before post-upgrade files are collected

The post-upgrade command compares `packages/a/.npmrc` with its original contents and fails if they differ. Its `**/*` file filter would include any temporary `.npmrc` edit in the Renovate pull request.

Expected Renovate pull request changes:

- update `lodash` and `pnpm-lock.yaml`
- add `post-upgrade-verification.txt`
- do not change `packages/a/.npmrc`
