/**
 * NORTHBRIDGE VALUATION & ADVISORY — CASE STUDIES PAGE JAVASCRIPT
 * Interactive Scenario Filtering, Smooth Anchor Navigation & Subtle Reveals
 */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. INTERACTIVE SCENARIO FILTERING (#case-study-index)
     ------------------------------------------------------------------------ */
  function initCaseFilters() {
    const filterButtons = document.querySelectorAll('.case-filter-btn');
    const caseCards = document.querySelectorAll('.case-index-card');

    if (!filterButtons.length || !caseCards.length) return;

    filterButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        const selectedFilter = btn.getAttribute('data-filter') || 'all';

        // Update active state on buttons
        filterButtons.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        // Filter cards with smooth opacity transition
        caseCards.forEach((card) => {
          const cardCat = card.getAttribute('data-category');
          if (selectedFilter === 'all' || cardCat === selectedFilter) {
            card.classList.remove('hidden');
            card.style.opacity = '0';
            card.style.transform = 'translateY(8px)';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.classList.add('hidden');
          }
        });
      });

      // Keyboard navigation between filter buttons (Arrow Left / Arrow Right)
      btn.addEventListener('keydown', (e) => {
        const buttonsArray = Array.from(filterButtons);
        let nextIndex = null;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          nextIndex = (index + 1) % buttonsArray.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          nextIndex = (index - 1 + buttonsArray.length) % buttonsArray.length;
        }

        if (nextIndex !== null && buttonsArray[nextIndex]) {
          buttonsArray[nextIndex].focus();
          buttonsArray[nextIndex].click();
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     2. IN-PAGE SMOOTH SCROLLING WITH NAVBAR OFFSET
     ------------------------------------------------------------------------ */
  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll(
      '.case-index-card[href^="#"], a[href^="#case-01"], a[href^="#case-02"], a[href^="#case-03"], a[href^="#case-04"], a[href^="#case-study-index"], a[href^="#case-studies-cta"], a[href^="#common-themes"]'
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

          // Accessibility: set focus to target heading
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
     3. SUBTLE INTERSECTION REVEALS
     ------------------------------------------------------------------------ */
  function initReveals() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

    const targets = document.querySelectorAll(
      '.triptych-panel, .case-index-card, ' +
      '.case-editorial-media, .case-question-card, .case-challenge-item, .case-takeaway-card, ' +
      '.case-banner-media, .case-dual-perspectives, ' +
      '.prep-check-card, .analysis-media-box-1, .analysis-media-box-2, .diagnostic-chart-container, ' +
      '.analytical-area-card, .theme-row-item, .themes-img-frame, ' +
      '.closing-staircase-banner'
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
     4. INITIALIZATION
     ------------------------------------------------------------------------ */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initCaseFilters();
      initSmoothScroll();
      initReveals();
    });
  } else {
    initCaseFilters();
    initSmoothScroll();
    initReveals();
  }
})();
