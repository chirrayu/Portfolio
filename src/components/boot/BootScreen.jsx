import React from 'react';
import BootLogo from './BootLogo';
import BootProgress from './BootProgress';
import '../../styles/boot.css';

function BootScreen({ statusOverride, progressOverride }) {
  const status = statusOverride;
  const progress = progressOverride;
  if (status === 'DESKTOP') return null;
  return (
    <div className="boot-screen" data-status={status}>
      <BootLogo />
      <BootProgress progress={progress} />
    </div>
  );
}

export default BootScreen;
