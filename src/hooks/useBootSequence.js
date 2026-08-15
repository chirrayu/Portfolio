import { useState, useEffect, useRef } from 'react';

/**
 * useBootSequence - custom hook managing the boot screen state machine.
 *
 * States:
 *   - INITIALIZING: short initial delay (simulates hardware power‑on).
 *   - LOADING: progress bar animation from 0 → 100%.
 *   - COMPLETE: brief pause after progress hits 100%.
 *   - DESKTOP: indicates boot sequence finished; UI can hide the boot screen.
 */
export default function useBootSequence() {
  const [status, setStatus] = useState('INITIALIZING'); // 'INITIALIZING' | 'LOADING' | 'COMPLETE' | 'DESKTOP'
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef(null);
  const animationFrameId = useRef(null);

  // Helper to transition to next state after a timeout
  const scheduleTransition = (nextState, delay) => {
    const timer = setTimeout(() => {
      setStatus(nextState);
    }, delay);
    return () => clearTimeout(timer);
  };

  // Progress animation using requestAnimationFrame for smoothness
  const animateProgress = (timestamp) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    const duration = 3000; // loading phase duration in ms
    const newProgress = Math.min(100, Math.round((elapsed / duration) * 100));
    setProgress(newProgress);
    if (newProgress < 100) {
      animationFrameId.current = requestAnimationFrame(animateProgress);
    } else {
      setStatus('COMPLETE');
    }
  };

  // INITIALIZING -> LOADING after brief pause
  useEffect(() => {
    const cleanup = scheduleTransition('LOADING', 500);
    return cleanup;
  }, []);

  // Start progress when LOADING
  useEffect(() => {
    if (status === 'LOADING') {
      startTimeRef.current = null;
      animationFrameId.current = requestAnimationFrame(animateProgress);
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };
  }, [status]);

  // After COMPLETE, transition to DESKTOP
  useEffect(() => {
    if (status === 'COMPLETE') {
      const cleanup = scheduleTransition('DESKTOP', 800);
      return cleanup;
    }
  }, [status]);

  return { status, progress };
}
