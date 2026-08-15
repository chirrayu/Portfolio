import React, { useState, useRef, useEffect, useCallback } from 'react';
import { formatPromptPath, getAutoCompletions } from './terminalUtils';

/**
 * TerminalInput - Interactive prompt line with command history, tab completion, and shortcuts.
 */
function TerminalInput({
  currentPath,
  history,
  onExecute,
  onClear,
  inputRef,
}) {
  const [value, setValue] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const tempInputRef = useRef('');

  // Auto focus input on mount
  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleKeyDown = useCallback(
    (e) => {
      // 1. Enter: execute command
      if (e.key === 'Enter') {
        e.preventDefault();
        const cmdToRun = value;
        setValue('');
        setHistoryIndex(-1);
        tempInputRef.current = '';
        onExecute(cmdToRun);
        return;
      }

      // 2. Up Arrow: previous command in history
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (history.length === 0) return;

        if (historyIndex === -1) {
          tempInputRef.current = value;
          const newIdx = history.length - 1;
          setHistoryIndex(newIdx);
          setValue(history[newIdx]);
        } else if (historyIndex > 0) {
          const newIdx = historyIndex - 1;
          setHistoryIndex(newIdx);
          setValue(history[newIdx]);
        }
        return;
      }

      // 3. Down Arrow: next command in history
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex === -1) return;

        if (historyIndex < history.length - 1) {
          const newIdx = historyIndex + 1;
          setHistoryIndex(newIdx);
          setValue(history[newIdx]);
        } else {
          setHistoryIndex(-1);
          setValue(tempInputRef.current);
        }
        return;
      }

      // 4. Tab: auto-completion
      if (e.key === 'Tab') {
        e.preventDefault();
        const parts = value.split(' ');
        const lastPart = parts[parts.length - 1];

        if (lastPart) {
          const matches = getAutoCompletions(lastPart, currentPath);
          if (matches.length === 1) {
            parts[parts.length - 1] = matches[0];
            setValue(parts.join(' '));
          }
        }
        return;
      }

      // 5. Ctrl+L: clear screen
      if (e.ctrlKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        onClear();
        return;
      }

      // 6. Ctrl+C: cancel current line
      if (e.ctrlKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        onExecute(`${value}^C`, true); // mark as cancelled
        setValue('');
        setHistoryIndex(-1);
        return;
      }
    },
    [value, history, historyIndex, currentPath, onExecute, onClear]
  );

  const promptPath = formatPromptPath(currentPath);

  return (
    <div className="terminal-active-line">
      <div className="terminal-prompt-line">
        <span className="terminal-prompt-user">chirrayu@portfolio</span>
        <span className="terminal-prompt-path">{promptPath}</span>
        <span className="terminal-prompt-symbol">%</span>
      </div>

      <div className="terminal-input-wrapper">
        <span className="terminal-input-display">
          {value}
          <span className="terminal-cursor" aria-hidden="true" />
        </span>

        <input
          ref={inputRef}
          type="text"
          className="terminal-input-hidden"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          aria-label="Terminal Command Prompt"
        />
      </div>
    </div>
  );
}

export default TerminalInput;
