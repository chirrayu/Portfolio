import { useRef, useCallback } from 'react';

const MENU_BAR_HEIGHT = 25;
const VISIBLE_TITLE_BAR_MARGIN = 80;

/**
 * useDraggable - Custom hook for smooth window title bar dragging with mouse & touch.
 */
export function useDraggable({ id, position, size, isMaximized, moveWindow, focusWindow }) {
  const isDraggingRef = useRef(false);
  const startDragOffsetRef = useRef({ x: 0, y: 0 });

  const handlePointerDown = useCallback(
    (e) => {
      // Only drag with primary mouse button or touch
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      // Do not initiate drag if clicking buttons inside header
      if (e.target.closest('button') || e.target.closest('.window-control-btn')) return;

      focusWindow(id);

      isDraggingRef.current = true;
      startDragOffsetRef.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };

      const handlePointerMove = (moveEvent) => {
        if (!isDraggingRef.current) return;

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        let newX = moveEvent.clientX - startDragOffsetRef.current.x;
        let newY = moveEvent.clientY - startDragOffsetRef.current.y;

        // Apply boundary constraints
        // 1. Never drag title bar above top menu bar (25px)
        newY = Math.max(MENU_BAR_HEIGHT, newY);
        // 2. Keep at least part of the window inside the viewport horizontally
        newX = Math.max(-size.width + VISIBLE_TITLE_BAR_MARGIN, Math.min(screenWidth - VISIBLE_TITLE_BAR_MARGIN, newX));
        // 3. Keep title bar visible above bottom of viewport
        newY = Math.min(screenHeight - 40, newY);

        moveWindow(id, { x: newX, y: newY });
      };

      const handlePointerUp = () => {
        isDraggingRef.current = false;
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
        window.removeEventListener('pointercancel', handlePointerUp);
      };

      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      window.addEventListener('pointercancel', handlePointerUp);
    },
    [id, position, size, focusWindow, moveWindow]
  );

  return {
    dragHandleProps: {
      onPointerDown: handlePointerDown,
    },
  };
}
