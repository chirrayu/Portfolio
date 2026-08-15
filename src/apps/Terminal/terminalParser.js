/**
 * Parse raw terminal command line into command and argument tokens.
 * Supports single and double quoted arguments.
 */
export function parseCommandLine(input) {
  if (!input || typeof input !== 'string') {
    return { command: '', args: [], raw: '' };
  }

  const trimmed = input.trim();
  if (!trimmed) {
    return { command: '', args: [], raw: '' };
  }

  // Regex to split by spaces while respecting quotes
  const matches = trimmed.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [];
  const tokens = matches.map((t) => {
    if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
      return t.slice(1, -1);
    }
    return t;
  });

  const command = (tokens[0] || '').toLowerCase();
  const args = tokens.slice(1);

  return { command, args, raw: trimmed };
}
