import { virtualFs } from '../../data/virtualFs';

/**
 * Format path for terminal prompt (~ for /home/chirrayu, ~/Projects, etc.)
 */
export function formatPromptPath(pathSegments) {
  if (!pathSegments || pathSegments.length === 0) {
    return '~';
  }
  return `~/${pathSegments.join('/')}`;
}

/**
 * Resolve directory node from path segments array
 */
export function resolveDirectoryNode(pathSegments) {
  let current = virtualFs;
  for (const seg of pathSegments) {
    if (!current.children || !current.children[seg] || current.children[seg].type !== 'dir') {
      return null;
    }
    current = current.children[seg];
  }
  return current;
}

/**
 * Resolve relative or absolute target path against current directory segments.
 * Returns new pathSegments array or null if invalid.
 */
export function resolvePath(target, currentSegments) {
  if (!target || target === '~' || target === '/home/chirrayu' || target === '/') {
    return [];
  }

  const parts = target.split('/').filter(Boolean);
  let segments = target.startsWith('/') ? [] : [...currentSegments];

  for (const part of parts) {
    if (part === '.') {
      continue;
    } else if (part === '..') {
      if (segments.length > 0) {
        segments.pop();
      }
    } else if (part === '~') {
      segments = [];
    } else {
      // Check if directory exists at next step
      const current = resolveDirectoryNode(segments);
      if (!current || !current.children || !current.children[part] || current.children[part].type !== 'dir') {
        return null; // not a directory
      }
      segments.push(part);
    }
  }

  // Verify final destination exists and is a directory
  const finalNode = resolveDirectoryNode(segments);
  if (!finalNode || finalNode.type !== 'dir') {
    return null;
  }

  return segments;
}

/**
 * Resolve a file node from current path and filename.
 */
export function resolveFileNode(filename, currentSegments) {
  const current = resolveDirectoryNode(currentSegments);
  if (!current || !current.children) return null;

  const targetNode = current.children[filename];
  if (!targetNode) return null;

  return targetNode;
}

/**
 * Get autocompletion options for current input token.
 */
export function getAutoCompletions(partialToken, currentSegments) {
  const current = resolveDirectoryNode(currentSegments);
  if (!current || !current.children) return [];

  const items = Object.keys(current.children);
  return items.filter((item) => item.toLowerCase().startsWith(partialToken.toLowerCase()));
}
