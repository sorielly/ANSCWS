import { spawnSync } from 'node:child_process';
import { getSourceFiles, readText, toProjectPath } from './quality-utils.js';

const files = getSourceFiles();
const errors = [];

for (const file of files) {
  const text = readText(file);
  const lines = text.split('\n');

  const syntaxResult = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  if (syntaxResult.status !== 0) {
    errors.push(`Syntax check failed: ${toProjectPath(file)}\n${syntaxResult.stderr.trim()}`);
  }

  if (text.includes('\t')) {
    errors.push(`Tab character found: ${toProjectPath(file)}`);
  }

  if (!text.endsWith('\n')) {
    errors.push(`Missing final newline: ${toProjectPath(file)}`);
  }

  lines.forEach((line, idx) => {
    if (/\s+$/.test(line)) {
      errors.push(`Trailing whitespace: ${toProjectPath(file)}:${idx + 1}`);
    }
  });
}

if (errors.length > 0) {
  console.error('Lint checks failed:\n');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Lint checks passed for ${files.length} files.`);
