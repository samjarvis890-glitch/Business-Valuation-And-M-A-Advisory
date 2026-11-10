/**
 * NORTHBRIDGE VALUATION & ADVISORY — INSIGHTS / BLOG JAVASCRIPT
 * Article Filtering & Live Search, Educational Article Modal,
 * Newsletter Demo Feedback & Smooth Offset Scrolling
 */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. ARTICLES DATABASE FOR MODAL READING DIALOG
     ------------------------------------------------------------------------ */
  const ARTICLE_DATA = {
    'featured': {
      category: 'Business Valuation',
      readTime: '7 MIN READ',
      title: 'What Actually Determines the Value of a Business?',
      content: `
        <p>A business's value is frequently misunderstood as a simple multiple of headline turnover or reported historical profit. In reality, business valuation represents an assessment of expected future cash flows adjusted for the operational, financial and market risks required to generate them.</p>
        <h4>1. Earnings Quality and Sustainability</h4>
        <p>Valuation begins with dissecting reported earnings to understand normalized run-rate EBITDA. One-off windfalls, non-recurring expenses, owner discretionary payments and working capital cyclicality must be adjusted to reveal sustainable cash flow capability.</p>
        <h4>2. Operating Profile and Key Dependencies</h4>
        <p>Two businesses with identical revenue may carry radically different valuations depending on their operational risks. Customer concentration, supplier dependency, proprietary intellectual property, employee retention and capital reinvestment requirements directly alter risk premiums and discount rates.</p>
        <h4>3. Market Context and Capital Structure</h4>
        <p>External macroeconomic conditions, prevailing interest rates, industry M&amp;A multiple benchmarks and capital availability shape the transaction multiples that realistic buyers are willing to support.</p>
      `
    },
    'article-01': {
      category: 'Business Valuation',
      readTime: '6 MIN READ',
      title: 'Understanding the Foundations of Business Valuation',
      content: `
        <p>Business valuation provides an objective appraisal of the economic worth of an enterprise, equity stake or intangible asset. It establishes an empirical baseline for corporate transactions, partner buyouts, taxation planning and shareholder disputes.</p>
        <h4>Core Valuation Principles</h4>
        <p>Every credible valuation rests on three fundamental questions: What returns does the business generate? How sustainable and defensible are those returns? And what level of operational and financial risk is associated with achieving them?</p>
        <p>By assessing historical consistency alongside forward-looking capacity limits, analysts construct defensible valuation ranges that withstand scrutiny from boards, tax authorities and institutional counterparties.</p>
      `
    },
    'article-02': {
      category: 'Business Valuation',
      readTime: '5 MIN READ',
      title: 'Revenue, Profit and Cash Flow: Why the Differences Matter',
      content: `
        <p>Revenue reflects market demand, accounting profit records accrued performance, but cash flow dictates corporate survival and equity value. In valuation analysis, distinguishing between these three metrics is critical.</p>
        <h4>The Working Capital Bridge</h4>
        <p>High revenue growth can mask aggressive inventory accumulation or delayed customer collections. A company showing strong statutory accounting profit can experience severe cash flow deficits if working capital demands expand faster than operational cash generation.</p>
        <p>Independent valuation advisors focus on Free Cash Flow to Firm (FCFF) and Operating Cash Flow conversion ratios rather than surface-level EBITDA multiples alone.</p>
      `
    },
    'article-03': {
      category: 'Business Valuation',
      readTime: '8 MIN READ',
      title: 'Understanding the Main Approaches to Business Valuation',
      content: `
        <p>International valuation standards recognize three primary appraisal methodologies: the Income Approach, the Market Approach, and the Asset-Based (Cost) Approach. Each methodology provides a distinct analytical lens.</p>
        <h4>The Income Approach (Discounted Cash Flow)</h4>
        <p>Projects multi-year unlevered cash flows discounted back to present value using a Weighted Average Cost of Capital (WACC) reflecting cost of debt, equity risk premiums and size adjustments.</p>
        <h4>The Market Approach (Comparables & Precedents)</h4>
        <p>Benchmarks enterprise value against trading multiples of comparable public companies and precedent M&amp;A transactions with similar margin profiles and operating scale.</p>
        <h4>The Asset-Based Approach</h4>
        <p>Appraises the fair economic value of tangible assets and identifiable intellectual property net of liabilities, commonly applied in holding companies or asset-heavy operations.</p>
      `
    },
    'article-04': {
      category: 'Mergers & Acquisitions',
      readTime: '7 MIN READ',
      title: 'Preparing a Business for a Potential Sale',
      content: `
        <p>Successful business divestitures require extensive preparation well before approaching potential counterparties. Disorganized documentation, unrecorded obligations or unclear historical accounting significantly impede deal velocity and invite price re-negotiations.</p>
        <h4>Transaction Readiness Checklist</h4>
        <p>Business owners preparing for an ownership transition should establish three-to-five years of reconciled management accounts, document key operational workflows, review contracts with top customers and suppliers, and resolve potential tax or legal contingencies early.</p>
        <p>A well-prepared data room and defensible EBITDA bridge inspire confidence in prospective acquirers, preserving competitive momentum throughout the diligence process.</p>
      `
    },
    'article-05': {
      category: 'Mergers & Acquisitions',
      readTime: '6 MIN READ',
      title: 'What Buyers Consider Before an Acquisition',
      content: `
        <p>Strategic buyers and financial sponsors evaluate prospective acquisitions through a disciplined risk-and-return filter. Understanding what acquirers scrutinize enables vendors to address potential concerns proactively.</p>
        <h4>Primary Buyer Scrutiny Areas</h4>
        <p>Key areas evaluated include: recurring revenue stability versus one-off project volatility, customer concentration risks (where a single client represents over 15-20% of gross margin), competitive defensibility, management depth, and post-transaction working capital needs.</p>
        <p>Clear historical reporting on unit economics and operational metrics allows buyers to model synergies and offer structures with greater certainty.</p>
      `
    },
    'article-06': {
      category: 'Financial Due Diligence',
      readTime: '7 MIN READ',
      title: 'Financial Due Diligence: An Overview for Business Owners',
      content: `
        <p>Financial Due Diligence (FDD) serves as an audit-grade investigation into the underlying financial health, historical earnings quality and balance sheet integrity of a business entering a transaction.</p>
        <h4>The Quality of Earnings (QofE) Report</h4>
        <p>Unlike a statutory audit which confirms compliance with historical accounting standards, a Quality of Earnings assessment determines whether historical EBITDA is sustainable on a go-forward operational basis.</p>
        <p>Normalisation adjustments identify non-operating expenses, related-party transactions, extraordinary COVID or supply chain subsidies, and pro-forma adjustments necessary to establish a realistic baseline for pricing.</p>
      `
    },
    'article-07': {
      category: 'Financial Analysis',
      readTime: '6 MIN READ',
      title: 'Reading Financial Statements Beyond the Headline Numbers',
      content: `
        <p>Examining financial performance requires integrating the income statement, balance sheet and cash flow statement into a cohesive diagnostic narrative rather than viewing them in isolation.</p>
        <h4>Variance and Margin Decomposition</h4>
        <p>A thorough financial diagnostic tracks gross margin volatility, operating leverage, return on invested capital (ROIC) and cash conversion cycles across multiple economic periods.</p>
        <p>Understanding whether margin shifts stem from volume elasticity, direct material cost inflation or overhead deleverage empowers boards to implement targeted strategic corrections.</p>
      `
    },
    'article-08': {
      category: 'Financial Modelling',
      readTime: '8 MIN READ',
      title: 'Financial Forecasting: Understanding Assumptions and Scenarios',
      content: `
        <p>Financial models are decision-support engines engineered to test strategic choices under uncertain market conditions. An effective model combines robust accounting logic with dynamic sensitivity analysis.</p>
        <h4>Multi-Scenario Architecture</h4>
        <p>Institutional financial modelling structures distinct cases: Base Case (management expectations), Downside Case (moderate market stress), and Stress Test (severe volume reduction or cost spikes). Testing cash flow and debt service coverage ratios across all three scenarios provides leadership with measured conviction.</p>
      `
    },
    'article-09': {
      category: 'Business Strategy',
      readTime: '6 MIN READ',
      title: 'Building a Stronger Foundation for Long-Term Business Value',
      content: `
        <p>Long-term enterprise value is built through operational discipline, transparent financial visibility and deliberate strategic positioning. Businesses that operate with institutional rigor trade at significant valuation premiums.</p>
        <h4>Value Acceleration Pillars</h4>
        <p>Key drivers include developing recurring contracted revenue streams, diversifying client and supplier dependencies, institutionalizing operating procedures to eliminate key-person risk, and maintaining monthly financial governance.</p>
        <p>Firms that cultivate these capabilities retain greater strategic flexibility, whether pursuing organic growth, debt refinancing, or future equity transitions.</p>
      `
    }
  };

  /* ------------------------------------------------------------------------
     2. ARTICLE FILTERING & LIVE SEARCH
     ------------------------------------------------------------------------ */
  function initArticleFiltering() {
    const searchInput = document.getElementById('articleSearchInput');
    const searchClearBtn = document.getElementById('searchClearBtn');
    const filterPills = document.querySelectorAll('.filter-pill-btn');
    const articleCards = document.querySelectorAll('.article-card');
    const resultsCountEl = document.getElementById('resultsCount');
    const resetFiltersBtn = document.getElementById('resetFiltersBtn');
    const emptyStateEl = document.getElementById('articlesEmptyState');

    if (!articleCards.length) return;

    let currentCategory = 'all';
    let searchQuery = '';

    function applyFilterAndSearch() {
      let visibleCount = 0;
      const query = searchQuery.trim().toLowerCase();

      articleCards.forEach((card) => {
        const cardCat = card.getAttribute('data-category');
        const title = (card.querySelector('.article-card-title')?.textContent || '').toLowerCase();
        const summary = (card.querySelector('.article-card-summary')?.textContent || '').toLowerCase();

        const matchesCat = currentCategory === 'all' || cardCat === currentCategory;
        const matchesQuery = !query || title.includes(query) || summary.includes(query);

        if (matchesCat && matchesQuery) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      // Update counter
      if (resultsCountEl) {
        resultsCountEl.textContent = `Showing ${visibleCount} of ${articleCards.length} Articles`;
      }

      // Show/Hide Empty State
      if (emptyStateEl) {
        if (visibleCount === 0) {
          emptyStateEl.classList.add('active');
        } else {
          emptyStateEl.classList.remove('active');
        }
      }
    }

    // Category button click
    filterPills.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterPills.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        currentCategory = btn.getAttribute('data-filter') || 'all';
        applyFilterAndSearch();
      });
    });

    // Real-time Search input
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        if (searchClearBtn) {
          if (searchQuery.length > 0) {
            searchClearBtn.classList.add('active');
          } else {
            searchClearBtn.classList.remove('active');
          }
        }
        applyFilterAndSearch();
      });
    }

    // Clear search button
    if (searchClearBtn && searchInput) {
      searchClearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        searchClearBtn.classList.remove('active');
        searchInput.focus();
        applyFilterAndSearch();
      });
    }

    // Reset filters button
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          searchQuery = '';
        }
        if (searchClearBtn) searchClearBtn.classList.remove('active');

        currentCategory = 'all';
        filterPills.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
          if (b.getAttribute('data-filter') === 'all') {
            b.classList.add('active');
            b.setAttribute('aria-pressed', 'true');
          }
        });

        applyFilterAndSearch();
      });
    }
  }

  /* ------------------------------------------------------------------------
     3. TOPIC DIRECTORY CLICK HANDLERS
     ------------------------------------------------------------------------ */
  function initTopicDirectory() {
    const topicCards = document.querySelectorAll('.topic-item-card');
    if (!topicCards.length) return;

    topicCards.forEach((card) => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const targetCat = card.getAttribute('data-topic-filter');
        if (!targetCat) return;

        // Find matching filter pill in article library
        const matchingPill = document.querySelector(`.filter-pill-btn[data-filter="${targetCat}"]`);
        if (matchingPill) {
          matchingPill.click();
        }

        // Smooth scroll to latest insights
        const latestInsightsSection = document.getElementById('latest-insights');
        if (latestInsightsSection) {
          const header = document.querySelector('.nb-header');
          const navHeight = header ? header.getBoundingClientRect().height : 88;
          const pos = latestInsightsSection.getBoundingClientRect().top + window.pageYOffset - (navHeight + 16);
          window.scrollTo({ top: pos, behavior: 'smooth' });
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     4. ARTICLE MODAL (READING DIALOG)
     ------------------------------------------------------------------------ */
  function initArticleModal() {
    const backdrop = document.getElementById('articleModalBackdrop');
    const closeBtn = document.getElementById('articleModalCloseBtn');
    const modalFooterClose = document.getElementById('articleModalFooterClose');
    const modalCat = document.getElementById('modalCatTag');
    const modalReadTime = document.getElementById('modalReadTime');
    const modalTitle = document.getElementById('modalArticleTitle');
    const modalContent = document.getElementById('modalArticleContent');

    if (!backdrop) return;

    function openModal(articleId) {
      const data = ARTICLE_DATA[articleId];
      if (!data) return;

      if (modalCat) modalCat.textContent = data.category;
      if (modalReadTime) modalReadTime.textContent = data.readTime;
      if (modalTitle) modalTitle.textContent = data.title;
      if (modalContent) modalContent.innerHTML = data.content;

      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';

      if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Attach to all article read triggers
    const readTriggers = document.querySelectorAll('[data-open-article]');
    readTriggers.forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const articleId = trigger.getAttribute('data-open-article');
        if (articleId) openModal(articleId);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modalFooterClose) modalFooterClose.addEventListener('click', closeModal);

    // Click outside dialog to close
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal();
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && backdrop.classList.contains('active')) {
        closeModal();
      }
    });
  }

  /* ------------------------------------------------------------------------
     5. NEWSLETTER DEMO FORM VALIDATION & HONEST FEEDBACK
     ------------------------------------------------------------------------ */
  function initNewsletter() {
    const form = document.getElementById('insightsNewsletterForm');
    const input = document.getElementById('newsletterEmailInput');
    const statusMsg = document.getElementById('newsletterStatusMsg');

    if (!form || !input || !statusMsg) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = input.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        statusMsg.textContent = 'Please provide a valid professional email address.';
        statusMsg.style.color = '#B99A62';
        input.focus();
        return;
      }

      // Truthful message per strict instructions:
      // "THANK YOU. THIS DEMO FORM IS READY, BUT SUBSCRIPTIONS ARE NOT CURRENTLY CONNECTED."
      statusMsg.textContent = 'THANK YOU. THIS DEMO FORM IS READY, BUT SUBSCRIPTIONS ARE NOT CURRENTLY CONNECTED.';
      statusMsg.style.color = '#3D8065';
      input.value = '';
    });
  }

  /* ------------------------------------------------------------------------
     6. IN-PAGE SMOOTH SCROLLING WITH NAVBAR OFFSET
     ------------------------------------------------------------------------ */
  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll(
      'a[href^="#latest-insights"], a[href^="#featured-story"], a[href^="#valuation-explainer"], a[href^="#transaction-insight"], a[href^="#knowledge-toolkit"], a[href^="#insights-newsletter"]'
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

          if (history.pushState) {
            history.pushState(null, '', href);
          }

          const heading = targetEl.querySelector('h2') || targetEl;
          if (heading) {
            heading.setAttribute('tabindex', '-1');
            heading.focus({ preventScroll: true });
          }
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     7. SUBTLE INTERSECTION REVEALS
     ------------------------------------------------------------------------ */
  function initReveals() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

    const targets = document.querySelectorAll(
      '.insights-hero-content, .insights-masthead-card, ' +
      '.featured-story-card, .topic-item-card, .article-card, ' +
      '.explainer-left-media, .explainer-step-card, ' +
      '.tx-timeline-item, .tx-media-frame, .toolkit-item-card, ' +
      '.insights-closing-banner'
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
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    targets.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------------------------
     8. INITIALIZATION
     ------------------------------------------------------------------------ */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initArticleFiltering();
      initTopicDirectory();
      initArticleModal();
      initNewsletter();
      initSmoothScroll();
      initReveals();
    });
  } else {
    initArticleFiltering();
    initTopicDirectory();
    initArticleModal();
    initNewsletter();
    initSmoothScroll();
    initReveals();
  }
})();
