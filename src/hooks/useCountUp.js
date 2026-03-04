import { useEffect, useRef, useState } from 'react';

/**
 * useCountUp — animates a number from 0 to `target` when the element
 * enters the viewport. Returns [ref, displayValue].
 *
 * @param {number} target   - Final number to count to
 * @param {number} duration - Animation duration in ms (default 1800)
 * @param {string} suffix   - Appended after number, e.g. "+" or "K+"
 */
export default function useCountUp(target, duration = 1800, suffix = '') {
  const ref = useRef(null);
  const [display, setDisplay] = useState('0' + suffix);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      observer.disconnect();

      const startTime = performance.now();
      // easeOutExpo
      const ease = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.round(ease(progress) * target);
        setDisplay(current.toLocaleString() + suffix);
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    }, { threshold: 0.4 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, suffix]);

  return [ref, display];
}