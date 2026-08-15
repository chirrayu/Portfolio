import React, { useEffect } from 'react';
import logo from '../../assets/logo.png';
import chime from '../../assets/sound/mac_chime.mp3';

function BootLogo({ reducedMotion }) {
  // Play boot chime on mount (unless reduced motion is preferred)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      const audio = new Audio(chime);
      audio.play().catch(() => {});
    }
  }, []);

  return (
    <img
      src={logo}
      alt="Chirrayu logo"
      className={reducedMotion ? 'boot-logo' : 'boot-logo fade-in'}
    />
  );
}

export default BootLogo;
