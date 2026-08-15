import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { demoAppConfigs } from '../apps/Demo/demoApps';

const WindowContext = createContext(null);

const MENU_BAR_HEIGHT = 25;
const INITIAL_Z_INDEX = 100;

export function WindowProvider({ children }) {
  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const highestZIndexRef = useRef(INITIAL_Z_INDEX);
  const openCountRef = useRef(0);

  /**
   * Helper: Calculate next cascading window position
   */
  const getCascadingPosition = (width, height) => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const offset = (openCountRef.current % 8) * 32;
    openCountRef.current += 1;

    let x = Math.max(40, Math.min(screenWidth - width - 40, 100 + offset));
    let y = Math.max(MENU_BAR_HEIGHT + 20, Math.min(screenHeight - height - 100, 60 + offset));
    return { x, y };
  };

  /**
   * Bring window to the front and make it active
   */
  const focusWindow = useCallback((id) => {
    highestZIndexRef.current += 1;
    const newZIndex = highestZIndexRef.current;

    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, zIndex: newZIndex, isMinimized: false }
          : w
      )
    );
    setActiveWindowId(id);
  }, []);

  /**
   * Open a window by appId or full config object
   */
  const openWindow = useCallback(
    (appConfigOrId) => {
      const config =
        typeof appConfigOrId === 'string'
          ? demoAppConfigs[appConfigOrId] || {
              id: appConfigOrId,
              appId: appConfigOrId,
              title: appConfigOrId.charAt(0).toUpperCase() + appConfigOrId.slice(1),
              defaultSize: { width: 680, height: 440 },
              minSize: { width: 400, height: 250 },
            }
          : appConfigOrId;

      setWindows((prev) => {
        const existing = prev.find((w) => w.id === config.id);
        if (existing) {
          // If already open, restore if minimized and focus
          highestZIndexRef.current += 1;
          return prev.map((w) =>
            w.id === config.id
              ? {
                  ...w,
                  isMinimized: false,
                  isClosing: false,
                  zIndex: highestZIndexRef.current,
                }
              : w
          );
        }

        // New window creation
        highestZIndexRef.current += 1;
        const size = config.defaultSize || { width: 680, height: 440 };
        const position = getCascadingPosition(size.width, size.height);

        const newWindow = {
          id: config.id,
          appId: config.appId || config.id,
          title: config.title || 'Window',
          icon: config.icon || config.appId || config.id,
          badge: config.badge,
          description: config.description,
          theme: config.theme || 'dark',
          position,
          size,
          minSize: config.minSize || { width: 400, height: 250 },
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          isClosing: false,
          prevBounds: null, // used when restoring from maximized
          zIndex: highestZIndexRef.current,
        };

        return [...prev, newWindow];
      });

      setActiveWindowId(config.id);
    },
    []
  );

  /**
   * Close a window with exit animation
   */
  const closeWindow = useCallback((id) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isClosing: true } : w))
    );

    // Remove from state after animation completes (200ms)
    setTimeout(() => {
      setWindows((prev) => {
        const remaining = prev.filter((w) => w.id !== id);
        return remaining;
      });

      setActiveWindowId((prevActive) => {
        if (prevActive === id) {
          return null;
        }
        return prevActive;
      });
    }, 180);
  }, []);

  /**
   * Minimize window
   */
  const minimizeWindow = useCallback((id) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
    setActiveWindowId((prevActive) => (prevActive === id ? null : prevActive));
  }, []);

  /**
   * Toggle maximize / restore
   */
  const maximizeWindow = useCallback((id) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;

        if (w.isMaximized) {
          // Restore to previous bounds
          return {
            ...w,
            isMaximized: false,
            position: w.prevBounds?.position || w.position,
            size: w.prevBounds?.size || w.size,
          };
        } else {
          // Save current bounds and maximize (leaving space for menu bar)
          const margin = 4;
          return {
            ...w,
            isMaximized: true,
            prevBounds: {
              position: { ...w.position },
              size: { ...w.size },
            },
            position: { x: margin, y: MENU_BAR_HEIGHT + margin },
            size: {
              width: window.innerWidth - margin * 2,
              height: window.innerHeight - MENU_BAR_HEIGHT - margin * 2,
            },
          };
        }
      })
    );
    focusWindow(id);
  }, [focusWindow]);

  /**
   * Restore a minimized window
   */
  const restoreWindow = useCallback((id) => {
    highestZIndexRef.current += 1;
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              isMinimized: false,
              zIndex: highestZIndexRef.current,
            }
          : w
      )
    );
    setActiveWindowId(id);
  }, []);

  /**
   * Move window to a new position
   */
  const moveWindow = useCallback((id, newPosition) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              isMaximized: false, // moving breaks maximize state
              position: newPosition,
            }
          : w
      )
    );
  }, []);

  /**
   * Resize window
   */
  const resizeWindow = useCallback((id, newSize, newPosition) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              isMaximized: false,
              size: newSize,
              position: newPosition || w.position,
            }
          : w
      )
    );
  }, []);

  const value = {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    focusWindow,
    moveWindow,
    resizeWindow,
  };

  return <WindowContext.Provider value={value}>{children}</WindowContext.Provider>;
}

export function useWindowManager() {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error('useWindowManager must be used within a WindowProvider');
  }
  return context;
}
