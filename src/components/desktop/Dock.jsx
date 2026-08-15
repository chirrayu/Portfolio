import React, { useState } from 'react';
import { dockApps } from '../../data/apps';
import { useWindowManager } from '../../hooks/useWindowManager';

/**
 * Inline SVG icon map.
 * Each key corresponds to the `icon` field in apps.js.
 * These are high-quality macOS-inspired icons rendered inline.
 */
const iconMap = {
  finder: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="linear-gradient(135deg, #38BDF8, #0284C7)" />
      <defs>
        <linearGradient id="finder-bg" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#finder-bg)" />
      <rect x="14" y="10" width="36" height="44" rx="3" fill="#fff" opacity="0.95" />
      <rect x="14" y="10" width="36" height="10" rx="3" fill="#E2E8F0" />
      <circle cx="20" cy="15" r="2" fill="#EF4444" />
      <circle cx="26" cy="15" r="2" fill="#F59E0B" />
      <circle cx="32" cy="15" r="2" fill="#22C55E" />
      <rect x="18" y="24" width="28" height="2" rx="1" fill="#CBD5E1" />
      <rect x="18" y="30" width="20" height="2" rx="1" fill="#CBD5E1" />
      <rect x="18" y="36" width="24" height="2" rx="1" fill="#CBD5E1" />
      <rect x="18" y="42" width="16" height="2" rx="1" fill="#CBD5E1" />
    </svg>
  ),
  terminal: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="#1E1E1E" />
      <rect x="4" y="4" width="56" height="56" rx="12" fill="#2D2D2D" />
      <polyline points="18,24 28,32 18,40" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="32" y1="40" x2="46" y2="40" stroke="#A3A3A3" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="#24292E" />
      <path d="M32 12C20.954 12 12 20.954 12 32c0 8.837 5.73 16.332 13.68 18.986.999.184 1.364-.434 1.364-.964 0-.474-.017-1.732-.027-3.4-5.564 1.21-6.737-2.682-6.737-2.682-.91-2.31-2.22-2.924-2.22-2.924-1.814-1.24.137-1.214.137-1.214 2.006.14 3.06 2.06 3.06 2.06 1.784 3.054 4.68 2.172 5.82 1.662.181-1.292.698-2.172 1.27-2.672-4.44-.504-9.108-2.22-9.108-9.884 0-2.184.78-3.968 2.058-5.368-.206-.504-.892-2.54.196-5.29 0 0 1.68-.538 5.5 2.05A19.18 19.18 0 0 1 32 21.88c1.7.008 3.412.23 5.01.672 3.816-2.588 5.494-2.05 5.494-2.05 1.09 2.75.404 4.786.198 5.29 1.28 1.4 2.054 3.184 2.054 5.368 0 7.684-4.676 9.374-9.128 9.868.718.618 1.358 1.838 1.358 3.706 0 2.674-.024 4.832-.024 5.49 0 .534.36 1.156 1.374.96C46.276 48.326 52 40.834 52 32c0-11.046-8.954-20-20-20z" fill="#fff" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="#0A66C2" />
      <path d="M18 27h6v18h-6V27zm3-9a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zm8 9h5.76l.24 2.64C36.36 27.84 38.76 27 41 27c5.52 0 7 3.24 7 8.28V45h-6V36.6c0-2.16-.36-4.32-3-4.32-3 0-3.48 2.28-3.48 4.2V45h-6V27z" fill="#fff" />
    </svg>
  ),
  safari: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="#fff" />
      <circle cx="32" cy="32" r="24" fill="#fff" stroke="#5AC8FA" strokeWidth="3" />
      <defs>
        <linearGradient id="safari-grad" x1="20" y1="12" x2="44" y2="52">
          <stop offset="0%" stopColor="#FF3B30" />
          <stop offset="100%" stopColor="#FF9500" />
        </linearGradient>
      </defs>
      <polygon points="32,14 38,30 32,32 26,30" fill="url(#safari-grad)" />
      <polygon points="32,50 26,34 32,32 38,34" fill="#5AC8FA" />
    </svg>
  ),
  projects: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="#6366F1" />
      <rect x="12" y="18" width="40" height="30" rx="4" fill="#fff" opacity="0.2" />
      <rect x="16" y="22" width="14" height="10" rx="2" fill="#fff" opacity="0.85" />
      <rect x="34" y="22" width="14" height="10" rx="2" fill="#fff" opacity="0.85" />
      <rect x="16" y="36" width="14" height="8" rx="2" fill="#fff" opacity="0.85" />
      <rect x="34" y="36" width="14" height="8" rx="2" fill="#fff" opacity="0.85" />
    </svg>
  ),
  resume: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="#EC4899" />
      <rect x="16" y="10" width="32" height="44" rx="4" fill="#fff" opacity="0.95" />
      <rect x="22" y="18" width="20" height="3" rx="1.5" fill="#F9A8D4" />
      <rect x="22" y="25" width="20" height="2" rx="1" fill="#E5E7EB" />
      <rect x="22" y="30" width="16" height="2" rx="1" fill="#E5E7EB" />
      <rect x="22" y="35" width="20" height="2" rx="1" fill="#E5E7EB" />
      <rect x="22" y="40" width="12" height="2" rx="1" fill="#E5E7EB" />
      <rect x="22" y="45" width="18" height="2" rx="1" fill="#E5E7EB" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="#6B7280" />
      <circle cx="32" cy="32" r="8" stroke="#fff" strokeWidth="3" fill="none" />
      <g stroke="#fff" strokeWidth="3" strokeLinecap="round">
        <line x1="32" y1="8" x2="32" y2="16" />
        <line x1="32" y1="48" x2="32" y2="56" />
        <line x1="8" y1="32" x2="16" y2="32" />
        <line x1="48" y1="32" x2="56" y2="32" />
        <line x1="14.06" y1="14.06" x2="19.72" y2="19.72" />
        <line x1="44.28" y1="44.28" x2="49.94" y2="49.94" />
        <line x1="14.06" y1="49.94" x2="19.72" y2="44.28" />
        <line x1="44.28" y1="19.72" x2="49.94" y2="14.06" />
      </g>
    </svg>
  ),
  trash: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="#959595ff" />
      <rect x="18" y="18" width="28" height="4" rx="2" fill="#fff" opacity="0.9" />
      <rect x="26" y="14" width="12" height="6" rx="2" fill="none" stroke="#fff" strokeWidth="2" opacity="0.9" />
      <path d="M20 24h24l-2 30a2 2 0 0 1-2 2H24a2 2 0 0 1-2-2L20 24z" fill="#fff" opacity="0.85" />
      <line x1="27" y1="30" x2="27" y2="50" stroke="#78716C" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="30" x2="32" y2="50" stroke="#78716C" strokeWidth="2" strokeLinecap="round" />
      <line x1="37" y1="30" x2="37" y2="50" stroke="#78716C" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

/**
 * Dock – macOS-style translucent dock pinned to the bottom-center.
 * Connected to Window Manager to open, restore, and focus application windows.
 */
function Dock() {
  const [hoveredId, setHoveredId] = useState(null);
  const { windows, activeWindowId, openWindow, restoreWindow, focusWindow, minimizeWindow } =
    useWindowManager();

  // Split regular apps from system apps for separator
  const regularApps = dockApps.filter((a) => !a.isSystem);
  const systemApps = dockApps.filter((a) => a.isSystem);

  const handleAppClick = (app) => {
    console.log(`Clicked: ${app.name}`);
    const existingWindow = windows.find((w) => w.appId === app.id && !w.isClosing);

    if (!existingWindow) {
      openWindow(app.id);
    } else if (existingWindow.isMinimized) {
      restoreWindow(existingWindow.id);
    } else if (activeWindowId === existingWindow.id) {
      // Toggle minimize if clicking currently active window
      minimizeWindow(existingWindow.id);
    } else {
      focusWindow(existingWindow.id);
    }
  };

  const renderItem = (app) => {
    const isAppOpen = windows.some((w) => w.appId === app.id && !w.isClosing);

    return (
      <div
        key={app.id}
        className="dock-item-container"
        onMouseEnter={() => setHoveredId(app.id)}
        onMouseLeave={() => setHoveredId(null)}
      >
        {/* Tooltip */}
        <div className="dock-tooltip">{app.name}</div>

        {/* Icon */}
        <div
          className="dock-icon"
          onClick={() => handleAppClick(app)}
          tabIndex={0}
          role="button"
          aria-label={app.name}
        >
          <div className="dock-icon-img">
            {iconMap[app.icon] || (
              <svg viewBox="0 0 64 64">
                <rect width="64" height="64" rx="14" fill="#999" />
              </svg>
            )}
          </div>
        </div>

        {/* Active app indicator dot */}
        {isAppOpen && <div className="dock-active-dot" />}
      </div>
    );
  };

  return (
    <div className="dock-wrapper">
      <div className="dock">
        {regularApps.map(renderItem)}
        <div className="dock-separator" />
        {systemApps.map(renderItem)}
      </div>
    </div>
  );
}

export default Dock;
