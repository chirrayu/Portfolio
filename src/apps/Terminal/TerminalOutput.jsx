import React from 'react';

const CHIRRAYU_ASCII = `
      .----.
     / .--. \\
    | /   
    | | 
    | \\   
     \\ '--' /
      '----'
   CHIRRAYU
`;

/**
 * TerminalOutput - Renders individual command execution results based on structured types.
 */
function TerminalOutput({ result }) {
  if (!result || result.type === 'empty' || result.type === 'clear') {
    return null;
  }

  // 1. Directory Listing (ls)
  if (result.type === 'ls') {
    return (
      <div className="terminal-ls-grid">
        {result.items.map((item) => (
          <div key={item.name} className={`terminal-ls-item ${item.type}`}>
            <span>{item.type === 'dir' ? '📁' : '📄'}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    );
  }

  // 2. Neofetch Profile Banner
  if (result.type === 'neofetch' && result.data) {
    const { user, os, host, kernel, uptime, shell, terminal, theme, projects, status, skills } =
      result.data;

    return (
      <div className="terminal-neofetch">
        <pre className="terminal-neofetch-ascii">{CHIRRAYU_ASCII}</pre>
        <div className="terminal-neofetch-info">
          <div className="neofetch-header">{user}</div>
          <div className="neofetch-divider">────────────────────────────────────</div>
          <div className="neofetch-row"><span className="neofetch-key">OS:</span><span className="neofetch-val">{os}</span></div>
          <div className="neofetch-row"><span className="neofetch-key">Host:</span><span className="neofetch-val">{host}</span></div>
          <div className="neofetch-row"><span className="neofetch-key">Kernel:</span><span className="neofetch-val">{kernel}</span></div>
          <div className="neofetch-row"><span className="neofetch-key">Uptime:</span><span className="neofetch-val">{uptime}</span></div>
          <div className="neofetch-row"><span className="neofetch-key">Shell:</span><span className="neofetch-val">{shell}</span></div>
          <div className="neofetch-row"><span className="neofetch-key">Terminal:</span><span className="neofetch-val">{terminal}</span></div>
          <div className="neofetch-row"><span className="neofetch-key">Theme:</span><span className="neofetch-val">{theme}</span></div>
          <div className="neofetch-row"><span className="neofetch-key">Projects:</span><span className="neofetch-val">{projects}</span></div>
          <div className="neofetch-row"><span className="neofetch-key">Skills:</span><span className="neofetch-val">{skills}</span></div>
          <div className="neofetch-row"><span className="neofetch-key">Status:</span><span className="neofetch-val">{status}</span></div>
          <div className="neofetch-colors">
            {['#000', '#ff453a', '#30d158', '#ffd60a', '#0a84ff', '#bf5af2', '#5ac8fa', '#fff'].map(
              (c, i) => (
                <div key={i} className="neofetch-block" style={{ background: c }} />
              )
            )}
          </div>
        </div>
      </div>
    );
  }

  // 3. Error Output
  if (result.type === 'error') {
    return <div className="terminal-output error">{result.content}</div>;
  }

  // 4. Help / Text Output
  return <div className={`terminal-output ${result.type}`}>{result.content}</div>;
}

export default TerminalOutput;
