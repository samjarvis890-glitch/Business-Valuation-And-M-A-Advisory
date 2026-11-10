/**
 * NORTHBRIDGE VALUATION & ADVISORY — SERVICES PAGE JAVASCRIPT
 * Smooth In-Page Directory Navigation, Offset Calculation & Subtle Reveals
 */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. IN-PAGE SMOOTH SCROLLING WITH NAVBAR OFFSET
     ------------------------------------------------------------------------ */
  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll(
      '.hero-index-pill[href^="#"], .dir-card-item[href^="#"], a[href^="#business-valuation"], a[href^="#ma-advisory"], a[href^="#financial-due-diligence"], a[href^="#financial-analysis"], a[href^="#financial-modelling"], a[href^="#transaction-support"], a[href^="#services-consultation"], a[href^="#service-directory"]'
    );

    function getNavbarHeight() {
      const header = document.querySelector('.nb-header') || document.querySelector('.site-header');
      return header ? header.getBoundingClientRect().height : 88;
    }

    anchorLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#') || href === '#') return;

        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();

          const navHeight = getNavbarHeight();
          const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - (navHeight + 16);

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Update URL hash without abrupt jump
          if (history.pushState) {
            history.pushState(null, '', href);
          }

          // Accessibility: set focus to target element or heading
          const heading = targetEl.querySelector('h2') || targetEl;
          if (heading) {
            heading.setAttribute('tabindex', '-1');
            heading.focus({ preventScroll: true });
          }
        }
      });
    });

    // Handle hash on initial page load if present
    if (window.location.hash) {
      setTimeout(() => {
        const initialTarget = document.querySelector(window.location.hash);
        if (initialTarget) {
          const navHeight = getNavbarHeight();
          const pos = initialTarget.getBoundingClientRect().top + window.pageYOffset - (navHeight + 16);
          window.scrollTo({ top: pos, behavior: 'smooth' });
        }
      }, 200);
    }
  }

  /* ------------------------------------------------------------------------
     2. SUBTLE INTERSECTION REVEALS
     ------------------------------------------------------------------------ */
  function initReveals() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

    const targets = document.querySelectorAll(
      '.services-hero-content, .services-hero-img-frame, ' +
      '.dir-card-item, ' +
      '.service-feature-media, .service-point-card, ' +
      '.ma-side-panel, .ma-banner-wrap, ' +
      '.diligence-row-card, ' +
      '.analysis-panel-card, ' +
      '.support-row-item, ' +
      '.closing-media-banner, .services-closing-frame'
    );

    if (!targets.length) return;

    targets.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      el.style.willChange = 'opacity, transform';
    });

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    targets.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------------------------
     3. INITIALIZATION ON DOM READY
     ------------------------------------------------------------------------ */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initSmoothScroll();
      initReveals();
    });
  } else {
    initSmoothScroll();
    initReveals();
  }
})();
