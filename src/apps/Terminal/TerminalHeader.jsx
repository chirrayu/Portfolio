import React from 'react';

/**
 * TerminalHeader - Sub-header or session status bar if needed for extended views.
 */
function TerminalHeader({ title = 'Terminal — zsh', path = '~' }) {
  return (
    <div className="terminal-sub-header" style={{ display: 'none' }}>
      <span>{title}</span>
      <span>{path}</span>
    </div>
  );
}

export default TerminalHeader;
