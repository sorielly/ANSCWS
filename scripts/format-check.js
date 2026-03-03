import { getSourceFiles, readText, toProjectPath } from './quality-utils.js';

const files = getSourceFiles();
const issues = [];

for (const file of files) {
  const text = readText(file);
  const lines = text.split('\n');

  if (!text.endsWith('\n')) {
    issues.push(`Missing final newline: ${toProjectPath(file)}`);
  }

  lines.forEach((line, idx) => {
    if (/\s+$/.test(line)) {
      issues.push(`Trailing whitespace: ${toProjectPath(file)}:${idx + 1}`);
    }
    if (line.includes('\t')) {
      issues.push(`Tab indentation found: ${toProjectPath(file)}:${idx + 1}`);
    }
  });
}

if (issues.length > 0) {
  console.error('Format checks failed:\n');
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exit(1);
}

console.log(`Format checks passed for ${files.length} files.`);
