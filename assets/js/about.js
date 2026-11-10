/**
 * NORTHBRIDGE VALUATION & ADVISORY — ABOUT PAGE JAVASCRIPT
 * Interactive Q&A Accordion & Subtle Intersection Reveals
 */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. INTERACTIVE QUESTIONS ACCORDION (#key-questions)
     ------------------------------------------------------------------------ */
  function initAccordion() {
    const qaItems = document.querySelectorAll('.qa-item');
    if (!qaItems.length) return;

    function closeAllExcept(currentItem) {
      qaItems.forEach((item) => {
        if (item !== currentItem && item.classList.contains('active')) {
          item.classList.remove('active');
          const btn = item.querySelector('.qa-trigger-btn');
          const panel = item.querySelector('.qa-answer-panel');
          if (btn) btn.setAttribute('aria-expanded', 'false');
          if (panel) panel.style.maxHeight = null;
        }
      });
    }

    qaItems.forEach((item, index) => {
      const btn = item.querySelector('.qa-trigger-btn');
      const panel = item.querySelector('.qa-answer-panel');
      if (!btn || !panel) return;

      // Click to toggle
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = item.classList.contains('active');

        if (isOpen) {
          item.classList.remove('active');
          btn.setAttribute('aria-expanded', 'false');
          panel.style.maxHeight = null;
        } else {
          closeAllExcept(item);
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });

      // Keyboard navigation between accordion triggers
      btn.addEventListener('keydown', (e) => {
        const triggers = Array.from(document.querySelectorAll('.qa-trigger-btn'));
        let targetIndex = null;

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          targetIndex = (index + 1) % triggers.length;
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          targetIndex = (index - 1 + triggers.length) % triggers.length;
        } else if (e.key === 'Home') {
          e.preventDefault();
          targetIndex = 0;
        } else if (e.key === 'End') {
          e.preventDefault();
          targetIndex = triggers.length - 1;
        }

        if (targetIndex !== null && triggers[targetIndex]) {
          triggers[targetIndex].focus();
        }
      });
    });

    // Open first question by default on desktop for inviting UX
    if (qaItems[0] && window.innerWidth >= 768) {
      const firstBtn = qaItems[0].querySelector('.qa-trigger-btn');
      const firstPanel = qaItems[0].querySelector('.qa-answer-panel');
      if (firstBtn && firstPanel) {
        qaItems[0].classList.add('active');
        firstBtn.setAttribute('aria-expanded', 'true');
        firstPanel.style.maxHeight = firstPanel.scrollHeight + 'px';
      }
    }
  }

  /* ------------------------------------------------------------------------
     2. SUBTLE INTERSECTION REVEALS
     ------------------------------------------------------------------------ */
  function initReveals() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

    const targets = document.querySelectorAll(
      '.about-hero-media-wrap, .identity-block, .identity-img-frame, ' +
      '.philosophy-card, .philosophy-img-frame, .principle-row-item, .principles-img-frame, ' +
      '.dimension-card, .dimensions-center-media, .approach-doc-col, .approach-media-banner, ' +
      '.qa-item, .about-closing-content'
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
        threshold: 0.08
      }
    );

    targets.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.45s ease-out, transform 0.45s ease-out';
      observer.observe(el);
    });
  }

  /* ------------------------------------------------------------------------
     DOM CONTENT LOADED INITIALIZATION
     ------------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    initAccordion();
    initReveals();
  });
})();
