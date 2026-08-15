import React from 'react';
import wallpaperImg from '../../assets/wallpaper.jpg';

/**
 * Wallpaper – full-screen background image layer.
 * Sits behind all other desktop elements (z-index: 0 via CSS).
 */
function Wallpaper() {
  return (
    <div
      className="wallpaper"
      style={{ backgroundImage: `url(${wallpaperImg})` }}
      role="presentation"
      aria-hidden="true"
    />
  );
}

export default Wallpaper;
