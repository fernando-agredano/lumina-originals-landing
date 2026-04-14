import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis
const lenis = new Lenis({
  lerp: 0.08,
  smoothWheel: true,
});

// Sync ScrollTrigger with Lenis
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// Expose useful globals for other components if needed, or we just handle triggers in line
(window as any).lenis = lenis;

// Anchor links: use Lenis so scroll position respects target `scroll-margin-top` (fixed header offset)
document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!(target instanceof HTMLElement)) return;
    e.preventDefault();
    lenis.scrollTo(target, { duration: 1.15, lock: true });
  });
});

// Function to refresh scroll triggers after dynamic content load or images
window.addEventListener('load', () => {
    ScrollTrigger.refresh();
});
