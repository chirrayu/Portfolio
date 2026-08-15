import React from 'react';
import WindowControls from './WindowControls';
import { useDraggable } from '../../hooks/useDraggable';

/**
 * WindowHeader - macOS Window title bar / toolbar with traffic lights and double-click maximize
 */
function WindowHeader({
  id,
  title,
  position,
  size,
  isMaximized,
  onClose,
  onMinimize,
  onMaximize,
  moveWindow,
  focusWindow,
}) {
  const { dragHandleProps } = useDraggable({
    id,
    position,
    size,
    isMaximized,
    moveWindow,
    focusWindow,
  });

  return (
    <div
      className="window-header"
      {...(!isMaximized ? dragHandleProps : {})}
      onDoubleClick={() => onMaximize(id)}
      onMouseDown={() => focusWindow(id)}
    >
      <WindowControls
        id={id}
        title={title}
        isMaximized={isMaximized}
        onClose={onClose}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
      />
      <div className="window-header-title">{title}</div>
      {/* Right spacer to balance traffic lights */}
      <div style={{ width: 52 }} aria-hidden="true" />
    </div>
  );
}

export default WindowHeader;
