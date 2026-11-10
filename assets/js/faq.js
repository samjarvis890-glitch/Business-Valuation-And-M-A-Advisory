/**
 * NORTHBRIDGE VALUATION & ADVISORY — FAQ INTERACTIVE CONTROLLER
 * Handles accordion interactions, live search filtering, category tabs,
 * bulk expand/collapse, deep-linking hashes, and status counters.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', initFaq);

  function initFaq() {
    const searchInput = document.getElementById('faqSearchInput');
    const searchForm = document.getElementById('faqSearchForm');
    const clearSearchBtn = document.getElementById('faqClearSearchBtn');
    const expandAllBtn = document.getElementById('faqExpandAllBtn');
    const collapseAllBtn = document.getElementById('faqCollapseAllBtn');
    const statusText = document.getElementById('faqStatusText');
    const noResultsBox = document.getElementById('faqNoResults');
    const resetSearchBtn = document.getElementById('faqResetSearchBtn');
    const categoryBtns = document.querySelectorAll('.faq-category-card-btn');
    const faqItems = document.querySelectorAll('.faq-item');
    const sections = [
      document.getElementById('valuation-faq'),
      document.getElementById('ma-faq'),
      document.getElementById('due-diligence-faq'),
      document.getElementById('analysis-modelling-faq'),
      document.getElementById('working-with-northbridge-faq')
    ].filter(Boolean);

    let activeCategory = 'all';
    let searchQuery = '';

    // ------------------------------------------------------------------------
    // 1. Accordion Toggle
    // ------------------------------------------------------------------------
    faqItems.forEach(item => {
      const btn = item.querySelector('.faq-question-btn');
      const panel = item.querySelector('.faq-answer-panel');
      if (!btn || !panel) return;

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = item.classList.contains('active');
        toggleFaqItem(item, !isOpen);
      });
    });

    function toggleFaqItem(item, open) {
      const btn = item.querySelector('.faq-question-btn');
      const panel = item.querySelector('.faq-answer-panel');
      if (!panel) return;

      if (open) {
        item.classList.add('active');
        if (btn) btn.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        if (btn) btn.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = null;
      }
    }

    // ------------------------------------------------------------------------
    // 2. Expand All & Collapse All Controls
    // ------------------------------------------------------------------------
    if (expandAllBtn) {
      expandAllBtn.addEventListener('click', () => {
        faqItems.forEach(item => {
          if (!item.classList.contains('hidden')) {
            toggleFaqItem(item, true);
          }
        });
      });
    }

    if (collapseAllBtn) {
      collapseAllBtn.addEventListener('click', () => {
        faqItems.forEach(item => {
          toggleFaqItem(item, false);
        });
      });
    }

    // ------------------------------------------------------------------------
    // 3. Category Filter Navigation
    // ------------------------------------------------------------------------
    categoryBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const cat = btn.getAttribute('data-category') || 'all';
        activeCategory = cat;

        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        applyFilters();

        // Smooth scroll to the relevant section
        const targetSectionId = btn.getAttribute('data-target') || (cat !== 'all' ? cat + '-faq' : 'valuation-faq');
        const targetSection = document.getElementById(targetSectionId);
        if (targetSection) {
          const navHeight = getNavHeight();
          const targetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
          window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
          });
        }
      });
    });

    // ------------------------------------------------------------------------
    // 4. Live Search Handler
    // ------------------------------------------------------------------------
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        applyFilters();
      });

      if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
          e.preventDefault();
          searchQuery = searchInput.value.trim().toLowerCase();
          applyFilters();

          // Scroll to first matching section or toolbar
          const toolbar = document.querySelector('.faq-action-toolbar');
          if (toolbar) {
            const navHeight = getNavHeight();
            const top = toolbar.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        });
      }
    }

    function clearSearch() {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      applyFilters();
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', clearSearch);
    }

    if (resetSearchBtn) {
      resetSearchBtn.addEventListener('click', () => {
        clearSearch();
        activeCategory = 'all';
        categoryBtns.forEach(b => {
          if (b.getAttribute('data-category') === 'all') {
            b.classList.add('active');
          } else {
            b.classList.remove('active');
          }
        });
        applyFilters();
      });
    }

    // ------------------------------------------------------------------------
    // 5. Filter Application Logic (Search + Category)
    // ------------------------------------------------------------------------
    function applyFilters() {
      let visibleCount = 0;
      const totalCount = faqItems.length;

      faqItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category') || '';
        const qText = (item.querySelector('.faq-q-text')?.textContent || '').toLowerCase();
        const aText = (item.querySelector('.faq-answer-content')?.textContent || '').toLowerCase();

        const matchesCat = activeCategory === 'all' || itemCategory === activeCategory;
        const matchesQuery = !searchQuery || qText.includes(searchQuery) || aText.includes(searchQuery);

        if (matchesCat && matchesQuery) {
          item.classList.remove('hidden');
          visibleCount++;

          // Auto-expand item if search query is actively matching
          if (searchQuery.length > 1) {
            toggleFaqItem(item, true);
          }
        } else {
          item.classList.add('hidden');
          toggleFaqItem(item, false);
        }
      });

      // Show/hide sections based on whether they contain any visible items
      sections.forEach(sec => {
        const hasVisible = Array.from(sec.querySelectorAll('.faq-item')).some(item => !item.classList.contains('hidden'));
        if (hasVisible) {
          sec.style.display = '';
        } else {
          sec.style.display = 'none';
        }
      });

      // Update status text
      if (statusText) {
        if (searchQuery) {
          statusText.textContent = `Found ${visibleCount} question${visibleCount === 1 ? '' : 's'} matching "${searchQuery}"`;
        } else if (activeCategory !== 'all') {
          const categoryName = getCategoryName(activeCategory);
          statusText.textContent = `Showing ${visibleCount} questions in ${categoryName}`;
        } else {
          statusText.textContent = `Showing all ${totalCount} questions across 5 advisory categories`;
        }
      }

      // Handle No Results state
      if (noResultsBox) {
        if (visibleCount === 0) {
          noResultsBox.classList.add('active');
          const termEl = noResultsBox.querySelector('.no-results-term');
          if (termEl) termEl.textContent = searchQuery || 'selected criteria';
        } else {
          noResultsBox.classList.remove('active');
        }
      }
    }

    function getCategoryName(cat) {
      switch (cat) {
        case 'valuation': return 'Business Valuation';
        case 'ma': return 'M&A Advisory';
        case 'due-diligence': return 'Financial Due Diligence';
        case 'analysis-modelling': return 'Financial Analysis & Modelling';
        case 'working-with-northbridge': return 'Working with Northbridge';
        default: return 'All Advisory Areas';
      }
    }

    function getNavHeight() {
      const header = document.querySelector('.nb-header') || document.querySelector('header');
      return header ? header.offsetHeight : 88;
    }

    // ------------------------------------------------------------------------
    // 6. Deep Linking via URL Hash (e.g. #valuation-faq, #q-dcf)
    // ------------------------------------------------------------------------
    if (window.location.hash) {
      const hash = window.location.hash;
      const targetElement = document.querySelector(hash);
      if (targetElement) {
        setTimeout(() => {
          const navHeight = getNavHeight();
          const targetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
          window.scrollTo({ top: targetTop, behavior: 'smooth' });

          // If hash points to an accordion item, expand it
          if (targetElement.classList.contains('faq-item')) {
            toggleFaqItem(targetElement, true);
          } else {
            const firstItem = targetElement.querySelector('.faq-item');
            if (firstItem) toggleFaqItem(firstItem, true);
          }
        }, 300);
      }
    }

    // Initial calculation of visible questions
    applyFilters();
  }
})();
