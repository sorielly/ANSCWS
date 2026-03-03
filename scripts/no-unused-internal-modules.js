import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();

const blockedModules = [
  {
    path: 'src/app/store.js',
    references: ['src/app/store.js', './store.js', '../app/store.js']
  },
  {
    path: 'src/features/audit/audit.js',
    references: ['src/features/audit/audit.js', '../features/audit/audit.js', './audit.js']
  }
];

const walk = (dir) => {
  const entries = readdirSync(dir);
  let files = [];
  for (const name of entries) {
    if (name === 'node_modules' || name === '.git' || name === 'dist') continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      files = files.concat(walk(full));
    } else if (full.endsWith('.js')) {
      files.push(full);
    }
  }
  return files;
};

const filesToScan = walk(join(root, 'src'));

const errors = [];

for (const blocked of blockedModules) {
  if (existsSync(join(root, blocked.path))) {
    errors.push(`Obsolete module still exists: ${blocked.path}`);
  }
}

for (const file of filesToScan) {
  if (!existsSync(file)) continue;
  const text = readFileSync(file, 'utf8');
  const rel = file.startsWith(root) ? file.slice(root.length + 1) : file;

  for (const blocked of blockedModules) {
    for (const ref of blocked.references) {
      if (text.includes(ref)) {
        errors.push(`Stale reference in ${rel}: ${ref}`);
      }
    }
  }
}

if (errors.length) {
  console.error('no-unused-internal-modules check failed:');
  errors.forEach((e) => console.error(`- ${e}`));
  process.exit(1);
}

console.log('no-unused-internal-modules check passed.');
