import { useRef, useEffect, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const SplitText = ({
  text,
  className = '',
  delay = 50,
  duration = 0.2, // Default from user request
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}) => {
  const ref = useRef(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  // Manual split logic
  const elements = useMemo(() => {
    if (!text) return [];
    if (splitType === 'chars') {
      return text.split('').map((char, i) => (
        <span key={i} className="split-char" style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
          {char}
        </span>
      ));
    }
    if (splitType === 'words') {
      return text.split(' ').map((word, i) => (
        <span key={i} className="split-word" style={{ display: 'inline-block' }}>
          {word}&nbsp;
        </span>
      ));
    }
    return [text];
  }, [text, splitType]);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      
      const targets = ref.current.querySelectorAll(
        splitType === 'chars' ? '.split-char' : '.split-word'
      );

      if (targets.length === 0) return;

      gsap.fromTo(
        targets,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          scrollTrigger: {
            trigger: ref.current,
            start: `top ${100 - threshold * 100}%`,
            once: true,
          },
          onComplete: () => {
            onLetterAnimationComplete?.();
          }
        }
      );
    },
    {
      dependencies: [text, delay, duration, ease, splitType, threshold, fontsLoaded],
      scope: ref
    }
  );

  const Tag = tag;

  return (
    <Tag
      ref={ref}
      className={`split-parent ${className}`}
      style={{
        textAlign,
        display: 'inline-block',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
      }}
    >
      {elements}
    </Tag>
  );
};

export default SplitText;
