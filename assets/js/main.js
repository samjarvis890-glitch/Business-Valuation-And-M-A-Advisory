/**
 * NORTHBRIDGE VALUATION & ADVISORY
 * Shared JavaScript: Theme (Dark/Light), Direction (LTR/RTL),
 * Sticky Navbar, Mobile & Tablet Drawer Navigation, Back-to-Top
 */

(function () {
  'use strict';

  // Storage Keys
  const THEME_KEY = 'northbridge_theme';
  const DIR_KEY = 'northbridge_direction';

  /* ------------------------------------------------------------------------
     1. THEME MANAGER (DARK / LIGHT MODE)
     ------------------------------------------------------------------------ */
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const activeTheme = savedTheme === 'dark' ? 'dark' : 'light';

    applyTheme(activeTheme);

    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
    themeToggleBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
      });
    });
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem(THEME_KEY, 'light');
    }
    updateThemeToggleIcons(theme);
  }

  function updateThemeToggleIcons(theme) {
    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
    themeToggleBtns.forEach((btn) => {
      const sunIcon = btn.querySelector('.icon-sun');
      const moonIcon = btn.querySelector('.icon-moon');
      const textLabel = btn.querySelector('.theme-text-label');

      if (theme === 'dark') {
        if (sunIcon) sunIcon.style.display = 'block';
        if (moonIcon) moonIcon.style.display = 'none';
        if (textLabel) textLabel.textContent = 'Light Mode';
        btn.setAttribute('aria-label', 'Switch to light mode');
      } else {
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'block';
        if (textLabel) textLabel.textContent = 'Dark Mode';
        btn.setAttribute('aria-label', 'Switch to dark mode');
      }
    });
  }

  /* ------------------------------------------------------------------------
     2. DIRECTION MANAGER (LTR / RTL)
     ------------------------------------------------------------------------ */
  function initDirection() {
    const savedDir = localStorage.getItem(DIR_KEY) || 'ltr';
    applyDirection(savedDir);

    const dirToggleBtns = document.querySelectorAll('.dir-toggle-btn');
    dirToggleBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
        const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
        applyDirection(newDir);
      });
    });
  }

  function applyDirection(dir) {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
    localStorage.setItem(DIR_KEY, dir);
    updateDirectionLabels(dir);
  }

  function updateDirectionLabels(dir) {
    const dirToggleBtns = document.querySelectorAll('.dir-toggle-btn');
    dirToggleBtns.forEach((btn) => {
      const label = btn.querySelector('.nb-dir-label');
      const textLabel = btn.querySelector('.dir-text-label');
      const nextDirText = dir === 'rtl' ? 'LTR' : 'RTL';

      if (label) {
        label.textContent = nextDirText;
      }
      if (textLabel) {
        textLabel.textContent = dir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL';
      }
      btn.setAttribute('aria-label', `Switch layout to ${nextDirText}`);
    });
  }

  /* ------------------------------------------------------------------------
     3. STICKY NAVBAR SCROLL BEHAVIOR
     ------------------------------------------------------------------------ */
  function initNavbarScroll() {
    const header = document.querySelector('.nb-header');
    if (!header) return;

    function handleScroll() {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ------------------------------------------------------------------------
     4. MOBILE & TABLET FULL DRAWER NAVIGATION
     ------------------------------------------------------------------------ */
  function initDrawer() {
    const hamburgerBtn = document.querySelector('.nb-hamburger-btn');
    const drawer = document.querySelector('.nb-drawer');
    const backdrop = document.querySelector('.nb-drawer-backdrop');
    const closeBtn = document.querySelector('.nb-drawer-close-btn');
    const drawerLinks = document.querySelectorAll('.nb-drawer-link, .nb-drawer-sublink, .nb-drawer-cta');

    if (!drawer || !backdrop) return;

    function openDrawer() {
      drawer.classList.add('active');
      backdrop.classList.add('active');
      document.body.classList.add('drawer-open');
      if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'true');
    }

    function closeDrawer() {
      drawer.classList.remove('active');
      backdrop.classList.remove('active');
      document.body.classList.remove('drawer-open');
      if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
    }

    if (hamburgerBtn) {
      hamburgerBtn.addEventListener('click', openDrawer);
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeDrawer);
    }

    backdrop.addEventListener('click', closeDrawer);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('active')) {
        closeDrawer();
      }
    });

    // Close drawer when regular link is selected
    drawerLinks.forEach((link) => {
      if (!link.classList.contains('nb-drawer-toggle-btn')) {
        link.addEventListener('click', () => {
          closeDrawer();
        });
      }
    });

    // Accordion Dropdowns Inside Drawer
    const accordionBtns = document.querySelectorAll('.nb-drawer-toggle-btn');
    accordionBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute('data-target');
        const subnav = document.getElementById(targetId);
        const icon = btn.querySelector('.nb-drawer-toggle-icon');

        if (subnav) {
          const isOpen = subnav.classList.contains('active');
          if (isOpen) {
            subnav.classList.remove('active');
            if (icon) icon.style.transform = 'rotate(0deg)';
            btn.setAttribute('aria-expanded', 'false');
          } else {
            subnav.classList.add('active');
            if (icon) icon.style.transform = 'rotate(180deg)';
            btn.setAttribute('aria-expanded', 'true');
          }
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     5. BACK TO TOP
     ------------------------------------------------------------------------ */
  function initBackToTop() {
    const backToTopBtn = document.querySelector('.nb-back-to-top');
    if (!backToTopBtn) return;

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ------------------------------------------------------------------------
     6. FOOTER NEWSLETTER
     ------------------------------------------------------------------------ */
  function initNewsletter() {
    const form = document.querySelector('.nb-newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.nb-newsletter-input');
      const notice = form.querySelector('.nb-newsletter-notice');
      if (input && input.value && input.checkValidity()) {
        if (notice) {
          notice.textContent = 'Thank you for your interest. Perspectives will be shared as published.';
          notice.style.display = 'block';
          notice.style.color = '#B99A62';
        }
        input.value = '';
      }
    });
  }

  /* ------------------------------------------------------------------------
     INITIALIZE ON DOM CONTENT LOADED
     ------------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initDirection();
    initNavbarScroll();
    initDrawer();
    initBackToTop();
    initNewsletter();
  });
})();
