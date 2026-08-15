import React, { useEffect } from 'react';
import logo from '../../assets/logo.png';
import chime from '../../assets/sound/mac_chime.mp3';

function BootLogo({ reducedMotion }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Create audio instance with fallback to public path if needed
    const audio = new Audio(chime || '/sound/mac_chime.mp3');
    audio.volume = 0.7;
    audio.preload = 'auto';

    let played = false;

    const playAudio = () => {
      if (played) return;
      audio
        .play()
        .then(() => {
          played = true;
          removeListeners();
        })
        .catch(() => {
          // Autoplay blocked by browser policy — wait for first user interaction
        });
    };

    const handleUserInteraction = () => {
      if (!played) {
        playAudio();
      }
    };

    const removeListeners = () => {
      window.removeEventListener('pointerdown', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };

    // Attempt immediate playback
    playAudio();

    // Register user interaction fallback listeners to unlock audio
    window.addEventListener('pointerdown', handleUserInteraction, { passive: true });
    window.addEventListener('touchstart', handleUserInteraction, { passive: true });
    window.addEventListener('click', handleUserInteraction, { passive: true });
    window.addEventListener('keydown', handleUserInteraction, { passive: true });

    return () => {
      removeListeners();
    };
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
