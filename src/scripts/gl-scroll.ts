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

// Function to refresh scroll triggers after dynamic content load or images
window.addEventListener('load', () => {
    ScrollTrigger.refresh();
});
