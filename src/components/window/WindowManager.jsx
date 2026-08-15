import React from 'react';
import Window from './Window';
import DemoWindow from '../../apps/Demo/DemoWindow';
import Terminal from '../../apps/Terminal/Terminal';
import Safari from '../../apps/Safari/Safari';
import { useWindowManager } from '../../hooks/useWindowManager';
import '../../styles/window.css';

/**
 * WindowManager - Renders and manages all active desktop windows.
 */
function WindowManager() {
  const {
    windows,
    activeWindowId,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    moveWindow,
    resizeWindow,
    focusWindow,
  } = useWindowManager();

  const renderAppContent = (w) => {
    if (w.appId === 'terminal') {
      return <Terminal />;
    }
    if (w.appId === 'safari') {
      return <Safari />;
    }
    return (
      <DemoWindow
        title={w.title}
        badge={w.badge}
        description={w.description}
        appId={w.appId}
      />
    );
  };

  return (
    <div className="window-manager" style={{ pointerEvents: 'none' }}>
      {windows.map((w) => (
        <div key={w.id} style={{ pointerEvents: 'auto' }}>
          <Window
            id={w.id}
            title={w.title}
            position={w.position}
            size={w.size}
            minSize={w.minSize}
            isActive={activeWindowId === w.id}
            isMinimized={w.isMinimized}
            isMaximized={w.isMaximized}
            isClosing={w.isClosing}
            zIndex={w.zIndex}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onMaximize={maximizeWindow}
            moveWindow={moveWindow}
            resizeWindow={resizeWindow}
            focusWindow={focusWindow}
          >
            {renderAppContent(w)}
          </Window>
        </div>
      ))}
    </div>
  );
}

export default WindowManager;
