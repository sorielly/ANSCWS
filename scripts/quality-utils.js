import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const INCLUDED_ROOTS = ['src', 'tests', 'scripts'];

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      walk(fullPath, files);
    } else if (fullPath.endsWith('.js')) {
      files.push(fullPath);
    }
  }
  return files;
}

export function getSourceFiles() {
  return INCLUDED_ROOTS.flatMap((root) => walk(root)).sort();
}

export function readText(filePath) {
  return readFileSync(filePath, 'utf8');
}

export function toProjectPath(filePath) {
  return relative(process.cwd(), filePath);
}
