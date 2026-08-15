import React, { useState, useCallback } from 'react';
import Wallpaper from './Wallpaper';
import MenuBar from './MenuBar';
import DesktopIcons from './DesktopIcons';
import Dock from './Dock';
import WindowManager from '../window/WindowManager';
import ContextMenu from '../ui/ContextMenu';
import { WindowProvider } from '../../hooks/useWindowManager';
import '../../styles/desktop.css';

/**
 * DesktopInner – Desktop layout inside the WindowProvider context.
 *
 * Layer Hierarchy:
 *   - Wallpaper (z-index 0)
 *   - DesktopIcons (z-index 10)
 *   - WindowManager / Windows (z-index 100+)
 *   - Dock (z-index 900)
 *   - MenuBar (z-index 1000)
 *   - ContextMenu (z-index 2000)
 */
function DesktopInner() {
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

  const handleContextMenu = useCallback((e) => {
    // Only show custom context menu when right-clicking empty desktop area
    // (not on windows, dock, menu bar, or context menu)
    const target = e.target;
    if (
      target.closest('.mac-window') ||
      target.closest('.dock-wrapper') ||
      target.closest('.menu-bar') ||
      target.closest('.context-menu')
    ) {
      return;
    }

    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
    });
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu((prev) => ({ ...prev, visible: false }));
  }, []);

  return (
    <div className="desktop" onContextMenu={handleContextMenu}>
      <Wallpaper />
      <DesktopIcons />
      <WindowManager />
      <Dock />
      <MenuBar />
      <ContextMenu
        visible={contextMenu.visible}
        position={{ x: contextMenu.x, y: contextMenu.y }}
        onClose={closeContextMenu}
      />
    </div>
  );
}

function Desktop() {
  return (
    <WindowProvider>
      <DesktopInner />
    </WindowProvider>
  );
}

export default Desktop;
