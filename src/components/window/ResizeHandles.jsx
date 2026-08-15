import React, { useCallback } from 'react';

const MENU_BAR_HEIGHT = 25;

const DIRECTIONS = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];

/**
 * ResizeHandles - 8-directional window resize handles with pointer capture.
 */
function ResizeHandles({ id, position, size, minSize, isMaximized, resizeWindow, focusWindow }) {
  const handlePointerDown = useCallback(
    (direction, e) => {
      if (isMaximized) return;
      if (e.button !== 0 && e.pointerType === 'mouse') return;

      e.stopPropagation();
      focusWindow(id);

      const startPointerX = e.clientX;
      const startPointerY = e.clientY;
      const startWidth = size.width;
      const startHeight = size.height;
      const startPosX = position.x;
      const startPosY = position.y;

      const minW = minSize?.width || 400;
      const minH = minSize?.height || 250;

      const handlePointerMove = (moveEvent) => {
        const deltaX = moveEvent.clientX - startPointerX;
        const deltaY = moveEvent.clientY - startPointerY;

        let newWidth = startWidth;
        let newHeight = startHeight;
        let newX = startPosX;
        let newY = startPosY;

        // Horizontal resizing
        if (direction.includes('e')) {
          newWidth = Math.max(minW, startWidth + deltaX);
        } else if (direction.includes('w')) {
          const desiredWidth = startWidth - deltaX;
          if (desiredWidth >= minW) {
            newWidth = desiredWidth;
            newX = startPosX + deltaX;
          } else {
            newWidth = minW;
            newX = startPosX + (startWidth - minW);
          }
        }

        // Vertical resizing
        if (direction.includes('s')) {
          newHeight = Math.max(minH, startHeight + deltaY);
        } else if (direction.includes('n')) {
          const desiredHeight = startHeight - deltaY;
          const desiredY = startPosY + deltaY;

          if (desiredY >= MENU_BAR_HEIGHT) {
            if (desiredHeight >= minH) {
              newHeight = desiredHeight;
              newY = desiredY;
            } else {
              newHeight = minH;
              newY = startPosY + (startHeight - minH);
            }
          }
        }

        resizeWindow(id, { width: newWidth, height: newHeight }, { x: newX, y: newY });
      };

      const handlePointerUp = () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
        window.removeEventListener('pointercancel', handlePointerUp);
      };

      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      window.addEventListener('pointercancel', handlePointerUp);
    },
    [id, isMaximized, minSize, position, size, focusWindow, resizeWindow]
  );

  if (isMaximized) return null;

  return (
    <>
      {DIRECTIONS.map((dir) => (
        <div
          key={dir}
          className={`resize-handle ${dir}`}
          onPointerDown={(e) => handlePointerDown(dir, e)}
          role="presentation"
        />
      ))}
    </>
  );
}

export default ResizeHandles;
