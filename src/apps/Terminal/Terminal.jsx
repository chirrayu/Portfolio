import React, { useState, useRef, useEffect, useCallback } from 'react';
import TerminalOutput from './TerminalOutput';
import TerminalInput from './TerminalInput';
import { parseCommandLine } from './terminalParser';
import { executeTerminalCommand } from './terminalCommands';
import { formatPromptPath } from './terminalUtils';
import { useWindowManager } from '../../hooks/useWindowManager';
import '../../styles/terminal.css';

/**
 * Terminal - Main Application Component running inside the Window Manager.
 */
function Terminal() {
  const [currentPath, setCurrentPath] = useState([]);
  const [history, setHistory] = useState([]);
  const [records, setRecords] = useState([
    {
      id: 'init-1',
      promptPath: '~',
      command: 'neofetch',
      result: executeTerminalCommand(
        parseCommandLine('neofetch'),
        [],
        {}
      ),
    },
  ]);

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const { openWindow } = useWindowManager();

  // Scroll to bottom when records change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [records]);

  // Focus input when clicking anywhere in terminal body
  const handleContainerClick = useCallback((e) => {
    // Only focus if not selecting text
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) return;

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleClear = useCallback(() => {
    setRecords([]);
  }, []);

  const handleExecute = useCallback(
    (rawInput, isCancelled = false) => {
      const promptPath = formatPromptPath(currentPath);

      if (isCancelled) {
        setRecords((prev) => [
          ...prev,
          {
            id: `rec-${Date.now()}-${Math.random()}`,
            promptPath,
            command: rawInput,
            result: null,
          },
        ]);
        return;
      }

      const trimmed = rawInput.trim();

      if (!trimmed) {
        setRecords((prev) => [
          ...prev,
          {
            id: `rec-${Date.now()}-${Math.random()}`,
            promptPath,
            command: '',
            result: null,
          },
        ]);
        return;
      }

      // Add to command history
      setHistory((prev) => [...prev, trimmed]);

      const parsed = parseCommandLine(trimmed);
      const result = executeTerminalCommand(parsed, currentPath, { openWindow });

      if (result.clear) {
        setRecords([]);
        return;
      }

      if (result.newPath !== undefined) {
        setCurrentPath(result.newPath);
      }

      setRecords((prev) => [
        ...prev,
        {
          id: `rec-${Date.now()}-${Math.random()}`,
          promptPath,
          command: trimmed,
          result,
        },
      ]);
    },
    [currentPath, openWindow]
  );

  return (
    <div
      ref={containerRef}
      className="terminal-container"
      onClick={handleContainerClick}
    >
      {records.map((rec) => (
        <div key={rec.id} className="terminal-record">
          <div className="terminal-prompt-line">
            <span className="terminal-prompt-user">chirrayu@portfolio</span>
            <span className="terminal-prompt-path">{rec.promptPath}</span>
            <span className="terminal-prompt-symbol">%</span>
            <span className="terminal-command-text">{rec.command}</span>
          </div>
          {rec.result && <TerminalOutput result={rec.result} />}
        </div>
      ))}

      <TerminalInput
        currentPath={currentPath}
        history={history}
        onExecute={handleExecute}
        onClear={handleClear}
        inputRef={inputRef}
      />
    </div>
  );
}

export default Terminal;
