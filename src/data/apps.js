/**
 * Dock applications data.
 * Each entry defines an app shown in the macOS-style dock.
 * Icons are inline SVG paths rendered by the Dock component.
 */
export const dockApps = [
  {
    id: 'finder',
    name: 'Finder',
    // Two-tone face icon
    icon: 'finder',
    isSystem: false,
  },
  {
    id: 'terminal',
    name: 'Terminal',
    icon: 'terminal',
    isSystem: false,
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: 'github',
    isSystem: false,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'linkedin',
    isSystem: false,
  },
  {
    id: 'safari',
    name: 'Safari',
    icon: 'safari',
    isSystem: false,
  },
  {
    id: 'projects',
    name: 'Projects',
    icon: 'projects',
    isSystem: false,
  },
  {
    id: 'resume',
    name: 'Resume',
    icon: 'resume',
    isSystem: false,
  },
  // --- separator ---
  {
    id: 'settings',
    name: 'Settings',
    icon: 'settings',
    isSystem: true,
  },
  {
    id: 'trash',
    name: 'Trash',
    icon: 'trash',
    isSystem: true,
  },
];
