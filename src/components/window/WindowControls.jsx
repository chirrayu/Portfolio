import React from 'react';

/**
 * WindowControls - macOS Traffic Light buttons (🔴 Close, 🟡 Minimize, 🟢 Maximize/Restore)
 */
function WindowControls({ id, title, isMaximized, onClose, onMinimize, onMaximize }) {
  return (
    <div className="window-controls">
      {/* Close (Red) */}
      <button
        type="button"
        className="window-control-btn close"
        aria-label={`Close ${title || 'window'}`}
        title="Close"
        onClick={(e) => {
          e.stopPropagation();
          onClose(id);
        }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <svg viewBox="0 0 10 10">
          <line x1="1.5" y1="1.5" x2="8.5" y2="8.5" />
          <line x1="8.5" y1="1.5" x2="1.5" y2="8.5" />
        </svg>
      </button>

      {/* Minimize (Yellow) */}
      <button
        type="button"
        className="window-control-btn minimize"
        aria-label={`Minimize ${title || 'window'}`}
        title="Minimize"
        onClick={(e) => {
          e.stopPropagation();
          onMinimize(id);
        }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <svg viewBox="0 0 10 10">
          <line x1="1" y1="5" x2="9" y2="5" />
        </svg>
      </button>

      {/* Maximize / Restore (Green) */}
      <button
        type="button"
        className="window-control-btn maximize"
        aria-label={isMaximized ? `Restore ${title || 'window'}` : `Maximize ${title || 'window'}`}
        title={isMaximized ? 'Restore' : 'Maximize'}
        onClick={(e) => {
          e.stopPropagation();
          onMaximize(id);
        }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <svg viewBox="0 0 10 10">
          {isMaximized ? (
            // Restore icon (two overlapping triangles/rectangles)
            <polygon points="1.5,1.5 5,1.5 1.5,5" />
          ) : (
            // Maximize icon (two outward triangles)
            <>
              <polygon points="2,8 2,4 6,8" />
              <polygon points="8,2 8,6 4,2" />
            </>
          )}
        </svg>
      </button>
    </div>
  );
}

export default WindowControls;
