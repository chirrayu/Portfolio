import React, { useState, useEffect, useCallback } from 'react';
import '../../styles/safari.css';

/**
 * Dynamically import all images from src/assets/gallery using Vite's import.meta.glob.
 * Supports: jpg, jpeg, png, gif, webp, avif, svg (Vite requires separate globs per extension)
 */
const jpg   = import.meta.glob('../../assets/gallery/*.jpg',  { eager: true });
const jpeg  = import.meta.glob('../../assets/gallery/*.jpeg', { eager: true });
const png   = import.meta.glob('../../assets/gallery/*.png',  { eager: true });
const gif   = import.meta.glob('../../assets/gallery/*.gif',  { eager: true });
const webp  = import.meta.glob('../../assets/gallery/*.webp', { eager: true });
const avif  = import.meta.glob('../../assets/gallery/*.avif', { eager: true });
const svg   = import.meta.glob('../../assets/gallery/*.svg',  { eager: true });
const JPG   = import.meta.glob('../../assets/gallery/*.JPG',  { eager: true });
const PNG   = import.meta.glob('../../assets/gallery/*.PNG',  { eager: true });
const JPEG  = import.meta.glob('../../assets/gallery/*.JPEG', { eager: true });
const WEBP  = import.meta.glob('../../assets/gallery/*.WEBP', { eager: true });

function buildGalleryImages() {
  const allModules = { ...jpg, ...jpeg, ...png, ...gif, ...webp, ...avif, ...svg, ...JPG, ...PNG, ...JPEG, ...WEBP };
  return Object.entries(allModules).map(([path, mod]) => {
    const filename = path.split('/').pop();
    const name = filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
    return {
      src: mod.default || mod,
      filename,
      name: name.charAt(0).toUpperCase() + name.slice(1),
    };
  });
}

// ---- Sub-components ----

function SafariToolbar({ imageCount, view, onViewChange }) {
  return (
    <div className="safari-toolbar">
      {/* Back / Forward nav (decorative — no history) */}
      <button className="safari-nav-btn" aria-label="Back" title="Back" disabled>
        <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
          <path d="M8 1L2 7L8 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button className="safari-nav-btn" aria-label="Forward" title="Forward" disabled>
        <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
          <path d="M2 1L8 7L2 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* URL Bar */}
      <div className="safari-url-bar">
        <span className="safari-url-icon">
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M6 1a5 5 0 1 0 0 10A5 5 0 0 0 6 1zm0 1a4 4 0 1 1 0 8A4 4 0 0 1 6 2z" fill="currentColor" opacity="0.5"/>
          </svg>
        </span>
        <span className="safari-url-text">gallery.chirrayu.dev</span>
      </div>

      {/* View Toggle */}
      <div className="gallery-view-toggle" role="group" aria-label="View mode">
        <button
          className={`gallery-view-btn ${view === 'grid' ? 'active' : ''}`}
          onClick={() => onViewChange('grid')}
          title="Grid view"
          aria-label="Grid view"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <rect x="0" y="0" width="5" height="5" rx="1" fill="currentColor"/>
            <rect x="7" y="0" width="5" height="5" rx="1" fill="currentColor"/>
            <rect x="0" y="7" width="5" height="5" rx="1" fill="currentColor"/>
            <rect x="7" y="7" width="5" height="5" rx="1" fill="currentColor"/>
          </svg>
        </button>
        <button
          className={`gallery-view-btn ${view === 'large' ? 'active' : ''}`}
          onClick={() => onViewChange('large')}
          title="Large view"
          aria-label="Large view"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <rect x="0" y="0" width="12" height="5.5" rx="1.5" fill="currentColor"/>
            <rect x="0" y="6.5" width="12" height="5.5" rx="1.5" fill="currentColor"/>
          </svg>
        </button>
      </div>

      {/* Share / Upload hint */}
      <button className="safari-share-btn" title="Drop images into src/assets/gallery" aria-label="Upload info">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1v8M4 4l3-3 3 3M2 10v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

function GalleryEmpty() {
  return (
    <div className="gallery-empty">
      <div className="gallery-empty-icon">🖼️</div>
      <div className="gallery-empty-title">No Photos Yet</div>
      <div className="gallery-empty-sub">
        Add images to your gallery folder and they'll appear here automatically.
      </div>
      <div className="gallery-empty-path">src/assets/gallery/</div>
      <div className="gallery-empty-sub" style={{ marginTop: 4 }}>
        Supports: JPG, PNG, WebP, GIF, AVIF, SVG
      </div>
    </div>
  );
}

function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const image = images[index];

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext]);

  return (
    <div className="safari-lightbox" onClick={onClose}>
      {/* Close */}
      <button
        className="safari-lightbox-close"
        onClick={onClose}
        aria-label="Close"
        onMouseDown={(e) => e.stopPropagation()}
      >
        ×
      </button>

      {/* Prev */}
      {images.length > 1 && (
        <button
          className="safari-lightbox-nav prev"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous image"
        >
          ‹
        </button>
      )}

      {/* Image */}
      <div className="safari-lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <img
          src={image.src}
          alt={image.name}
          className="safari-lightbox-img"
          draggable={false}
        />
        <div className="safari-lightbox-caption">{image.name}</div>
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          className="safari-lightbox-nav next"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next image"
        >
          ›
        </button>
      )}

      {/* Counter */}
      {images.length > 1 && (
        <div className="safari-lightbox-counter">
          {index + 1} / {images.length}
        </div>
      )}
    </div>
  );
}

// ---- Main Safari App ----

function Safari() {
  const [images] = useState(() => buildGalleryImages());
  const [view, setView] = useState('grid'); // 'grid' | 'large'
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = useCallback((idx) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prevImage = useCallback(() => {
    setLightboxIndex((i) => (i > 0 ? i - 1 : images.length - 1));
  }, [images.length]);

  const nextImage = useCallback(() => {
    setLightboxIndex((i) => (i < images.length - 1 ? i + 1 : 0));
  }, [images.length]);

  return (
    <div className="safari-container">
      {/* Toolbar */}
      <SafariToolbar
        imageCount={images.length}
        view={view}
        onViewChange={setView}
      />

      {/* Gallery Body */}
      <div className="safari-body">
        {/* Header */}
        <div className="gallery-header">
          <div>
            <div className="gallery-title">Gallery</div>
            <div className="gallery-count">
              {images.length === 0 ? 'No photos' : `${images.length} photo${images.length !== 1 ? 's' : ''}`}
            </div>
          </div>
        </div>

        {/* Empty State */}
        {images.length === 0 && <GalleryEmpty />}

        {/* Grid */}
        {images.length > 0 && (
          <div className={`gallery-grid ${view}`}>
            {images.map((img, idx) => (
              <div
                key={img.filename}
                className="gallery-tile"
                onClick={() => openLightbox(idx)}
                role="button"
                tabIndex={0}
                aria-label={`Open ${img.name}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(idx);
                  }
                }}
              >
                <img src={img.src} alt={img.name} loading="lazy" />
                <div className="gallery-tile-overlay">
                  <span className="gallery-tile-name">{img.name}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </div>
  );
}

export default Safari;
