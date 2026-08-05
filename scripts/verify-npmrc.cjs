const { readFileSync, writeFileSync } = require('node:fs');

const npmrcPath = 'packages/a/.npmrc';
const expected = [
  'package-lock = false',
  '//registry.npmjs.org/:_authToken = "${RENOVATE_REPRO_TOKEN}"',
  'strict-ssl = true',
  '',
].join('\n');
const actual = readFileSync(npmrcPath, 'utf8');

if (actual !== expected) {
  throw new Error(`${npmrcPath} was not restored before post-upgrade tasks`);
}

writeFileSync(
  'post-upgrade-verification.txt',
  'Repository .npmrc was restored before the post-upgrade task.\n',
);
