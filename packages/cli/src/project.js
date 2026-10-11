import { access, lstat, open, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';

export async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function readJson(filePath) {
  try {
    return JSON.parse(await readFile(filePath, 'utf8'));
  } catch (error) {
    if (error && error.code === 'ENOENT') return null;
    throw new Error(`Could not read ${path.basename(filePath)}: ${error.message}`);
  }
}

export function resolveInside(root, relativePath) {
  const resolvedRoot = path.resolve(root);
  const resolved = path.resolve(resolvedRoot, relativePath);
  if (resolved !== resolvedRoot && !resolved.startsWith(`${resolvedRoot}${path.sep}`)) {
    throw new Error(`Path must stay inside the project: ${relativePath}`);
  }
  return resolved;
}

export async function findSourceEntry(root) {
  const candidates = ['src/main.tsx', 'src/main.jsx', 'src/index.tsx', 'src/index.jsx', 'app/layout.tsx', 'app/layout.jsx'];
  for (const candidate of candidates) {
    if (await exists(path.join(root, candidate))) return candidate;
  }
  return null;
}

/** Reject symlinks below the selected project root, including dangling links. */
export async function assertProjectPath(root, target) {
  const resolvedRoot = path.resolve(root);
  const resolvedTarget = resolveInside(resolvedRoot, path.relative(resolvedRoot, target));
  let current = resolvedRoot;
  for (const part of path.relative(resolvedRoot, resolvedTarget).split(path.sep).filter(Boolean)) {
    current = path.join(current, part);
    try {
      if ((await lstat(current)).isSymbolicLink()) throw new Error(`Refusing symbolic link in project output: ${path.relative(resolvedRoot, current)}`);
    } catch (error) {
      if (error?.code !== 'ENOENT') throw error;
    }
  }
  return resolvedTarget;
}

/** Where supported, O_NOFOLLOW also protects the final file at open time. */
export async function writeProjectFile(root, target, source, force = false) {
  const safeTarget = await assertProjectPath(root, target);
  const flags = constants.O_WRONLY | constants.O_CREAT | (constants.O_NOFOLLOW ?? 0)
    | (force ? constants.O_TRUNC : constants.O_EXCL);
  const file = await open(safeTarget, flags);
  try { await file.writeFile(source); } finally { await file.close(); }
}
