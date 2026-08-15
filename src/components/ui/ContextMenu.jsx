import React, { useState, useEffect, useCallback, useRef } from 'react';

const menuItems = [
  { label: 'New Folder', action: () => console.log('New Folder') },
  { label: 'Get Info', action: () => console.log('Get Info') },
  { label: 'Change Wallpaper', action: () => console.log('Wallpaper settings coming soon.') },
  { type: 'divider' },
  { label: 'Sort By', action: () => console.log('Sort By') },
  { label: 'Show View Options', action: () => console.log('Show View Options') },
];

/**
 * ContextMenu – custom right-click menu for the desktop.
 *
 * Controlled externally:
 *   visible  – boolean
 *   position – { x, y }
 *   onClose  – callback to hide the menu
 */
function ContextMenu({ visible, position, onClose }) {
  const menuRef = useRef(null);

  // Close on Escape
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  // Close on click outside
  const handleClickOutside = useCallback(
    (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (visible) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible, handleKeyDown, handleClickOutside]);

  if (!visible) return null;

  // Prevent menu from going off-screen
  const style = {
    left: position.x,
    top: position.y,
  };

  return (
    <div className="context-menu" style={style} ref={menuRef} role="menu">
      {menuItems.map((item, index) =>
        item.type === 'divider' ? (
          <div key={`divider-${index}`} className="context-menu-divider" />
        ) : (
          <div
            key={item.label}
            className="context-menu-item"
            role="menuitem"
            tabIndex={0}
            onClick={() => {
              item.action();
              onClose();
            }}
          >
            {item.label}
          </div>
        ),
      )}
    </div>
  );
}

export default ContextMenu;
