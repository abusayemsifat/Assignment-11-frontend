import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — reveals children with [data-reveal] as they enter viewport.
 *
 * Attributes:
 *   data-reveal                — required, triggers animation
 *   data-reveal-delay="150"   — ms delay (default 0)
 *   data-reveal-dir="left"    — slide direction: up (default) | left | right | scale
 */
export default function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll('[data-reveal]'));
    if (!items.length) return;

    // Initial hidden state
    items.forEach(el => {
      const dir = el.dataset.revealDir || 'up';
      el.style.opacity    = '0';
      el.style.willChange = 'opacity, transform';
      if (dir === 'left')       el.style.transform = 'translateX(-36px)';
      else if (dir === 'right') el.style.transform = 'translateX(36px)';
      else if (dir === 'scale') el.style.transform = 'scale(0.85)';
      else                      el.style.transform = 'translateY(32px)';
    });

    const reveal = (el) => {
      const delay = parseInt(el.dataset.revealDelay || '0', 10);
      // Use cubic-bezier for a springier feel
      el.style.transition = `opacity 0.62s cubic-bezier(.22,1,.36,1) ${delay}ms,
                              transform 0.62s cubic-bezier(.22,1,.36,1) ${delay}ms`;
      // rAF ensures transition is registered before state change
      requestAnimationFrame(() => {
        el.style.opacity   = '1';
        el.style.transform = 'none';
      });
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, ...options });

    items.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return ref;
}