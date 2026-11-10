/**
 * NORTHBRIDGE VALUATION & ADVISORY — HOME 2 JAVASCRIPT
 * Interactive Valuation Specialisation Selector, Smooth Anchors & Reveals
 */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. VALUATION SPECIALISATIONS INTERACTIVE SELECTOR
     ------------------------------------------------------------------------ */
  const specialisationData = [
    {
      id: 'spec-valuation',
      num: '01',
      title: 'Business Valuation',
      badge: 'SPECIALISATION 01',
      desc: 'Explore financial performance, business characteristics and valuation considerations to develop an informed perspective on business value.',
      image: 'assets/images/home2/specialisation-valuation.webp',
      alt: 'Quantitative business valuation models and financial performance analysis',
      link: 'services.html#business-valuation'
    },
    {
      id: 'spec-ma',
      num: '02',
      title: 'Mergers & Acquisitions',
      badge: 'SPECIALISATION 02',
      desc: 'Consider transaction objectives, financial factors and strategic questions involved in mergers and acquisitions.',
      image: 'assets/images/home2/specialisation-ma.webp',
      alt: 'Mergers and acquisitions strategic transaction consultation',
      link: 'services.html#ma-advisory'
    },
    {
      id: 'spec-diligence',
      num: '03',
      title: 'Financial Due Diligence',
      badge: 'SPECIALISATION 03',
      desc: 'Review financial information and relevant business considerations as part of transaction evaluation.',
      image: 'assets/images/home2/specialisation-diligence.webp',
      alt: 'Senior financial due diligence advisors conducting quality of earnings and transactional risk examination',
      link: 'services.html#financial-due-diligence'
    },
    {
      id: 'spec-modelling',
      num: '04',
      title: 'Financial Modelling & Analysis',
      badge: 'SPECIALISATION 04',
      desc: 'Organise financial information and evaluate assumptions, scenarios and performance drivers.',
      image: 'assets/images/home2/specialisation-modelling.webp',
      alt: 'Multi-variable scenario modelling and financial forecasts',
      link: 'services.html#financial-analysis'
    },
    {
      id: 'spec-transaction',
      num: '05',
      title: 'Transaction Support',
      badge: 'SPECIALISATION 05',
      desc: 'Prepare and organise relevant financial information throughout important transaction stages.',
      image: 'assets/images/home2/specialisation-transaction.webp',
      alt: 'Organised deal room transaction documentation and closing support',
      link: 'services.html#transaction-support'
    }
  ];

  function initSpecialisationSelector() {
    const tabBtns = document.querySelectorAll('.spec-tab-btn');
    const detailImg = document.getElementById('specDetailImg');
    const detailBadge = document.getElementById('specDetailBadge');
    const detailTitle = document.getElementById('specDetailTitle');
    const detailDesc = document.getElementById('specDetailDesc');
    const detailLink = document.getElementById('specDetailLink');

    if (!tabBtns.length || !detailImg) return;

    function selectSpecialisation(index) {
      if (index < 0 || index >= specialisationData.length) return;
      const data = specialisationData[index];

      // Update Tabs State
      tabBtns.forEach((btn, i) => {
        const isActive = i === index;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        btn.setAttribute('tabindex', isActive ? '0' : '-1');
      });

      // Smooth Crossfade for Detail Panel
      detailImg.style.opacity = '0.3';
      setTimeout(() => {
        detailImg.src = data.image;
        detailImg.alt = data.alt;
        if (detailBadge) detailBadge.textContent = data.badge;
        if (detailTitle) detailTitle.textContent = data.title;
        if (detailDesc) detailDesc.textContent = data.desc;
        if (detailLink) detailLink.href = data.link;
        detailImg.style.opacity = '1';
      }, 180);
    }

    tabBtns.forEach((btn, index) => {
      // Click & Touch Support
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        selectSpecialisation(index);
      });

      // Keyboard Navigation (Arrow Keys, Home, End)
      btn.addEventListener('keydown', (e) => {
        let newIndex = null;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          newIndex = (index + 1) % tabBtns.length;
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          newIndex = (index - 1 + tabBtns.length) % tabBtns.length;
        } else if (e.key === 'Home') {
          e.preventDefault();
          newIndex = 0;
        } else if (e.key === 'End') {
          e.preventDefault();
          newIndex = tabBtns.length - 1;
        }

        if (newIndex !== null) {
          tabBtns[newIndex].focus();
          selectSpecialisation(newIndex);
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     2. HERO SCROLL INDICATOR
     ------------------------------------------------------------------------ */
  function initHeroScrollIndicator() {
    const scrollLink = document.querySelector('.hero2-scroll-indicator');
    if (!scrollLink) return;

    scrollLink.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector('#decision-landscape');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  /* ------------------------------------------------------------------------
     3. SUBTLE INTERSECTION REVEALS
     ------------------------------------------------------------------------ */
  function initReveals() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

    const targets = document.querySelectorAll(
      '.landscape-statement-row, .landscape-img-frame, .spec-tab-btn, .spec-detail-panel, ' +
      '.journey-stage-item, .mosaic-card-featured, .mosaic-mini-card, .scenario-panel, ' +
      '.journal-card-featured, .journal-card-secondary, .closing-content-box'
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
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity 0.45s ease-out, transform 0.45s ease-out';
      observer.observe(el);
    });
  }

  /* ------------------------------------------------------------------------
     DOM CONTENT LOADED INITIALIZATION
     ------------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    initSpecialisationSelector();
    initHeroScrollIndicator();
    initReveals();
  });
})();
