import React, { useState, useEffect } from 'react';
import logoImg from '../../assets/logo.png';

/**
 * MenuBar – macOS-style translucent menu bar fixed to the top of the viewport.
 *
 * Left side:  Chirrayu logo + Finder + standard menu items
 * Right side: Wi-Fi, Battery, Date, Time (live-updating)
 */
function MenuBar() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    // Update once per minute
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const timeStr = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const dateStr = now.toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const leftItems = ['File', 'Edit', 'View', 'Go', 'Window', 'Help'];

  return (
    <div className="menu-bar" role="menubar">
      {/* Left side */}
      <div className="menu-bar-left">
        {/* Logo / brand */}
        <div className="menu-bar-item" tabIndex={0} role="menuitem">
          <img
            src={logoImg}
            alt="Chirrayu"
            className="menu-bar-logo"
          />
        </div>

        {/* App name */}
        <div
          className="menu-bar-item app-name"
          tabIndex={0}
          role="menuitem"
        >
          Finder
        </div>

        {/* Standard menus */}
        {leftItems.map((item) => (
          <div
            key={item}
            className="menu-bar-item"
            tabIndex={0}
            role="menuitem"
          >
            {item}
          </div>
        ))}
      </div>

      {/* Right side */}
      <div className="menu-bar-right">
        {/* Wi-Fi icon */}
        <div className="menu-bar-right-item" aria-label="Wi-Fi">
          <svg
            className="menu-bar-right-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12.55a11 11 0 0 1 14.08 0" />
            <path d="M1.42 9a16 16 0 0 1 21.16 0" />
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
            <circle cx="12" cy="20" r="1" fill="currentColor" />
          </svg>
        </div>

        {/* Battery icon */}
        <div className="menu-bar-right-item" aria-label="Battery">
          <svg
            className="menu-bar-right-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="1" y="6" width="18" height="12" rx="2" ry="2" />
            <rect x="3" y="8" width="12" height="8" rx="1" fill="currentColor" opacity="0.7" />
            <line x1="23" y1="10" x2="23" y2="14" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Date */}
        <div className="menu-bar-right-item">{dateStr}</div>

        {/* Time */}
        <div className="menu-bar-right-item" style={{ fontWeight: 500 }}>
          {timeStr}
        </div>
      </div>
    </div>
  );
}

export default MenuBar;
