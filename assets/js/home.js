/**
 * NORTHBRIDGE VALUATION & ADVISORY — HOMEPAGE SCRIPTS
 * Subtle reveals and in-page anchor scroll handling
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
      const revealElements = document.querySelectorAll(
        '.perspective-block, .service-card, .approach-step-card, .insight-card, .resource-feature-card, .resource-link-row, .cta-inner-frame'
      );

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
              observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: '0px 0px -40px 0px',
          threshold: 0.1
        }
      );

      revealElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition = 'opacity 0.45s ease-out, transform 0.45s ease-out';
        observer.observe(el);
      });
    }
  });
})();
