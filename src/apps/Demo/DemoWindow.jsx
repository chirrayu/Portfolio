import React from 'react';

/**
 * DemoWindow - Reusable placeholder content for testing the Window Manager in Phase 3.
 */
function DemoWindow({ title, badge, description, appId }) {
  return (
    <div className="demo-window-content">
      <div className="demo-window-header">
        <div className="demo-window-badge">{badge || 'Application'}</div>
        <h2 className="demo-window-title">{title}</h2>
      </div>
      <p className="demo-window-desc">
        {description || 'Window Manager stress-test demo application.'}
      </p>
      <div className="demo-window-card">
        <div className="demo-window-card-row">
          <span className="demo-label">Status:</span>
          <span className="demo-value active">Phase 3 — Window Manager Active</span>
        </div>
        <div className="demo-window-card-row">
          <span className="demo-label">App ID:</span>
          <span className="demo-value font-mono">{appId}</span>
        </div>
        <div className="demo-window-card-row">
          <span className="demo-label">Capabilities:</span>
          <span className="demo-value">Drag Header • 8-Way Resize • Minimize • Maximize • Stacking</span>
        </div>
      </div>
      <div className="demo-window-footer">
        Application content and interactive interfaces will be implemented in Phase 4.
      </div>
    </div>
  );
}

export default DemoWindow;
