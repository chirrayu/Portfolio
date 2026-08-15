import React, { useRef } from 'react';
import WindowHeader from './WindowHeader';
import ResizeHandles from './ResizeHandles';

/**
 * Window - Reusable macOS-style application window container.
 */
function Window({
  id,
  title,
  children,
  position,
  size,
  minSize,
  isActive,
  isMinimized,
  isMaximized,
  isClosing,
  zIndex,
  onClose,
  onMinimize,
  onMaximize,
  moveWindow,
  resizeWindow,
  focusWindow,
}) {
  const windowRef = useRef(null);

  const style = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: `${size.width}px`,
    height: `${size.height}px`,
    zIndex,
  };

  const classNames = [
    'mac-window',
    isActive ? 'active' : '',
    isMaximized ? 'maximized' : '',
    isClosing ? 'closing' : '',
    isMinimized ? 'minimized' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={windowRef}
      className={classNames}
      style={style}
      onMouseDown={() => focusWindow(id)}
      onTouchStart={() => focusWindow(id)}
      role="region"
      aria-label={`${title} Window`}
    >
      <WindowHeader
        id={id}
        title={title}
        position={position}
        size={size}
        isMaximized={isMaximized}
        onClose={onClose}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        moveWindow={moveWindow}
        focusWindow={focusWindow}
      />

      <div className="window-body">{children}</div>

      <ResizeHandles
        id={id}
        position={position}
        size={size}
        minSize={minSize}
        isMaximized={isMaximized}
        resizeWindow={resizeWindow}
        focusWindow={focusWindow}
      />
    </div>
  );
}

export default Window;
