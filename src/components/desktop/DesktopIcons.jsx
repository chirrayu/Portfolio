import React, { useState, useEffect, useCallback } from 'react';
import { useWindowManager } from '../../hooks/useWindowManager';

/**
 * Inline SVG icons for the three desktop items.
 * These are self-contained so no external SVG files are needed.
 */
const iconSvgs = {
  projects: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="14" width="56" height="44" rx="4" fill="#4A9EF7" />
      <path d="M4 18a4 4 0 0 1 4-4h16l6 8h26a4 4 0 0 1 4 4v2H4v-10z" fill="#3A8DE6" />
      <rect x="4" y="28" width="56" height="30" rx="3" fill="#5BB0FF" />
    </svg>
  ),
  resume: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="4" width="40" height="56" rx="4" fill="#F5F5F5" />
      <rect x="12" y="4" width="40" height="56" rx="4" stroke="#DDDDDD" strokeWidth="1" />
      <rect x="20" y="14" width="24" height="3" rx="1.5" fill="#CCCCCC" />
      <rect x="20" y="22" width="24" height="2" rx="1" fill="#DDDDDD" />
      <rect x="20" y="28" width="20" height="2" rx="1" fill="#DDDDDD" />
      <rect x="20" y="34" width="24" height="2" rx="1" fill="#DDDDDD" />
      <rect x="20" y="40" width="16" height="2" rx="1" fill="#DDDDDD" />
      <rect x="20" y="46" width="22" height="2" rx="1" fill="#DDDDDD" />
    </svg>
  ),
  about: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="8" width="56" height="48" rx="6" fill="#2C2C2E" />
      <rect x="4" y="8" width="56" height="12" rx="6" fill="#3A3A3C" />
      <circle cx="14" cy="14" r="3" fill="#FF5F56" />
      <circle cx="24" cy="14" r="3" fill="#FFBD2E" />
      <circle cx="34" cy="14" r="3" fill="#27C93F" />
      <circle cx="32" cy="38" r="10" fill="#5BB0FF" opacity="0.7" />
      <rect x="28" y="34" width="8" height="2" rx="1" fill="#fff" opacity="0.8" />
      <rect x="31" y="37" width="2" height="8" rx="1" fill="#fff" opacity="0.8" />
    </svg>
  ),
};

const icons = [
  { id: 'projects', label: 'Projects', svgKey: 'projects' },
  { id: 'resume',   label: 'Resume',   svgKey: 'resume' },
  { id: 'about',    label: 'About',    svgKey: 'about' },
];

/**
 * DesktopIcons – macOS-style desktop icon list positioned top-right.
 * Supports single-click selection, double-click window open, and Escape to deselect.
 */
function DesktopIcons() {
  const [selectedId, setSelectedId] = useState(null);
  const { openWindow } = useWindowManager();

  // Escape to deselect
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      setSelectedId(null);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Click empty desktop area to deselect
  const handleDesktopClick = useCallback((e) => {
    if (!e.target.closest('.desktop-icon')) {
      setSelectedId(null);
    }
  }, []);

  useEffect(() => {
    const desktop = document.querySelector('.desktop');
    if (desktop) {
      desktop.addEventListener('click', handleDesktopClick);
      return () => desktop.removeEventListener('click', handleDesktopClick);
    }
  }, [handleDesktopClick]);

  return (
    <div className="desktop-icons">
      {icons.map((icon) => (
        <div
          key={icon.id}
          className={`desktop-icon${selectedId === icon.id ? ' selected' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedId(icon.id);
          }}
          onDoubleClick={() => {
            console.log(`Opening ${icon.label}...`);
            openWindow(icon.id);
          }}
          tabIndex={0}
          role="button"
          aria-label={icon.label}
          aria-pressed={selectedId === icon.id}
        >
          <div className="desktop-icon-image">
            {iconSvgs[icon.svgKey]}
          </div>
          <span className="desktop-icon-label">{icon.label}</span>
        </div>
      ))}
    </div>
  );
}

export default DesktopIcons;
