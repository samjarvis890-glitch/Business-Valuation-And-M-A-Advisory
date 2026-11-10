/**
 * NORTHBRIDGE VALUATION & ADVISORY — CONTACT & CONSULTATION CONTROLLER
 * Handles enquiry panel preselection, smooth scrolling, robust client-side validation,
 * honest frontend demonstration notice, configurable office map, and contact FAQ accordions.
 */

(function () {
  'use strict';

  // Corporate Advisory Office Location
  const NORTHBRIDGE_OFFICE_ADDRESS = 'Northbridge Advisory Tower, Level 34, 100 Financial Centre Boulevard, Financial District';
  const NORTHBRIDGE_MAP_EMBED_URL = '';
  const NORTHBRIDGE_GOOGLE_MAPS_URL = 'https://maps.google.com';

  document.addEventListener('DOMContentLoaded', initContact);

  function initContact() {
    initEnquirySelection();
    initConsultationForm();
    initContactFaq();
    initLocationMap();
    handleUrlHash();
  }

  // --------------------------------------------------------------------------
  // 1. Enquiry Selection Panels & Auto-Scroll
  // --------------------------------------------------------------------------
  function initEnquirySelection() {
    const panels = document.querySelectorAll('.enquiry-panel-item');
    const selectEl = document.getElementById('enquiryType');
    const consultationSection = document.getElementById('consultation');

    panels.forEach(panel => {
      panel.addEventListener('click', (e) => {
        e.preventDefault();
        const enquiryVal = panel.getAttribute('data-enquiry-val');

        // Update active class on panels
        panels.forEach(p => p.classList.remove('active'));
        panel.classList.add('active');

        // Preselect form dropdown
        if (selectEl && enquiryVal) {
          selectEl.value = enquiryVal;
          selectEl.classList.remove('is-invalid');
          const errorMsg = document.getElementById('enquiryTypeError');
          if (errorMsg) errorMsg.classList.remove('visible');
        }

        // Smooth scroll to consultation form
        if (consultationSection) {
          const navHeight = getNavHeight();
          const targetTop = consultationSection.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
          window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
          });

          // Focus the form for accessibility
          setTimeout(() => {
            const nameInput = document.getElementById('fullName');
            if (nameInput) nameInput.focus();
          }, 450);
        }
      });
    });

    // If dropdown changed manually, update panel highlight
    if (selectEl) {
      selectEl.addEventListener('change', () => {
        const selectedVal = selectEl.value;
        panels.forEach(p => {
          if (p.getAttribute('data-enquiry-val') === selectedVal) {
            p.classList.add('active');
          } else {
            p.classList.remove('active');
          }
        });
      });
    }
  }

  // --------------------------------------------------------------------------
  // 2. Consultation Form Validation & Honest Demonstration State
  // --------------------------------------------------------------------------
  function initConsultationForm() {
    const form = document.getElementById('enquiryForm');
    const clearBtn = document.getElementById('clearFormBtn');
    const demoNotice = document.getElementById('enquiryDemoNotice');
    const summaryBox = document.getElementById('demoSummaryContent');

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Reset previous error states
      clearErrors();

      const fullName = document.getElementById('fullName');
      const workEmail = document.getElementById('workEmail');
      const enquiryType = document.getElementById('enquiryType');
      const enquiryMessage = document.getElementById('enquiryMessage');
      const privacyAgree = document.getElementById('privacyAgree');
      const businessName = document.getElementById('businessName')?.value.trim() || 'Not specified';
      const contactNumber = document.getElementById('contactNumber')?.value.trim() || 'Not specified';
      const businessStage = document.getElementById('businessStage')?.value || 'Not specified';
      const timeframe = document.getElementById('timeframe')?.value || 'Not specified';
      const businessSize = document.getElementById('businessSize')?.value || 'Not specified';

      let isValid = true;
      let firstInvalidField = null;

      // 1. Validate Full Name
      if (!fullName || !fullName.value.trim() || fullName.value.trim().length < 2) {
        showError(fullName, 'fullNameError', 'Please enter your full name (minimum 2 characters).');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = fullName;
      }

      // 2. Validate Work Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!workEmail || !workEmail.value.trim() || !emailRegex.test(workEmail.value.trim())) {
        showError(workEmail, 'workEmailError', 'Please enter a valid work email address (e.g. name@company.com).');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = workEmail;
      }

      // 3. Validate Enquiry Type
      if (!enquiryType || !enquiryType.value) {
        showError(enquiryType, 'enquiryTypeError', 'Please select an enquiry category.');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = enquiryType;
      }

      // 4. Validate Message
      if (!enquiryMessage || !enquiryMessage.value.trim() || enquiryMessage.value.trim().length < 10) {
        showError(enquiryMessage, 'enquiryMessageError', 'Please briefly outline your business requirement (minimum 10 characters).');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = enquiryMessage;
      }

      // 5. Validate Privacy Checkbox
      if (!privacyAgree || !privacyAgree.checked) {
        showError(privacyAgree, 'privacyAgreeError', 'You must acknowledge the demonstration terms to proceed.');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = privacyAgree;
      }

      if (!isValid) {
        if (firstInvalidField) firstInvalidField.focus();
        return;
      }

      // Successful Frontend Validation
      // STRICT REQUIREMENT: No backend, no API, no localStorage storage of personal data
      if (demoNotice) {
        if (summaryBox) {
          summaryBox.innerHTML = `
            <div class="space-y-1 text-sm">
              <p><strong>Client / Contact:</strong> ${escapeHtml(fullName.value.trim())}</p>
              <p><strong>Work Email:</strong> ${escapeHtml(workEmail.value.trim())}</p>
              <p><strong>Organisation:</strong> ${escapeHtml(businessName)}</p>
              <p><strong>Contact Number:</strong> ${escapeHtml(contactNumber)}</p>
              <p><strong>Enquiry Category:</strong> ${escapeHtml(enquiryType.value)}</p>
              <p><strong>Business Stage:</strong> ${escapeHtml(businessStage)}</p>
              <p><strong>Expected Timeframe:</strong> ${escapeHtml(timeframe)}</p>
              <p><strong>Indicative Size Range:</strong> ${escapeHtml(businessSize)}</p>
              <p class="mt-2"><strong>Requirement Overview:</strong><br><span class="italic text-gray-700 dark:text-gray-300">"${escapeHtml(enquiryMessage.value.trim())}"</span></p>
            </div>
          `;
        }
        demoNotice.classList.add('active');

        // Smooth scroll to the notice for client visibility
        const navHeight = getNavHeight();
        const noticeTop = demoNotice.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
        window.scrollTo({
          top: noticeTop,
          behavior: 'smooth'
        });
      }
    });

    // Clear Form Button
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        form.reset();
        clearErrors();
        if (demoNotice) demoNotice.classList.remove('active');
        document.querySelectorAll('.enquiry-panel-item').forEach(p => p.classList.remove('active'));
      });
    }

    // Clear errors on input
    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => {
        field.classList.remove('is-invalid');
        const errEl = document.getElementById(field.id + 'Error');
        if (errEl) errEl.classList.remove('visible');
      });
    });
  }

  function showError(field, errorElementId, message) {
    if (field) field.classList.add('is-invalid');
    const errEl = document.getElementById(errorElementId);
    if (errEl) {
      errEl.textContent = message;
      errEl.classList.add('visible');
    }
  }

  function clearErrors() {
    document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    document.querySelectorAll('.field-error-msg').forEach(el => {
      el.textContent = '';
      el.classList.remove('visible');
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --------------------------------------------------------------------------
  // 3. Contact FAQ Accordions
  // --------------------------------------------------------------------------
  function initContactFaq() {
    const faqItems = document.querySelectorAll('.contact-faq-item');

    faqItems.forEach(item => {
      const btn = item.querySelector('.contact-faq-btn');
      const panel = item.querySelector('.contact-faq-panel');
      if (!btn || !panel) return;

      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Optional: close other FAQ items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.contact-faq-btn');
            const otherPanel = otherItem.querySelector('.contact-faq-panel');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            if (otherPanel) otherPanel.style.maxHeight = null;
          }
        });

        if (!isOpen) {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        } else {
          item.classList.remove('active');
          btn.setAttribute('aria-expanded', 'false');
          panel.style.maxHeight = null;
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 4. Location & Map Section
  // --------------------------------------------------------------------------
  function initLocationMap() {
    const addressEl = document.getElementById('officeAddressText');
    const iframeEl = document.getElementById('mapLiveIframe');
    const placeholderEl = document.getElementById('mapPlaceholderView');
    const directionsLink = document.getElementById('openGoogleMapsLink');

    if (addressEl && NORTHBRIDGE_OFFICE_ADDRESS) {
      addressEl.textContent = NORTHBRIDGE_OFFICE_ADDRESS;
    }

    if (NORTHBRIDGE_MAP_EMBED_URL && iframeEl) {
      iframeEl.src = NORTHBRIDGE_MAP_EMBED_URL;
      iframeEl.classList.add('active');
      if (placeholderEl) placeholderEl.style.display = 'none';
    }

    if (directionsLink) {
      if (NORTHBRIDGE_GOOGLE_MAPS_URL) {
        directionsLink.href = NORTHBRIDGE_GOOGLE_MAPS_URL;
        directionsLink.style.display = 'inline-flex';
      } else {
        directionsLink.style.display = 'none';
      }
    }
  }

  // --------------------------------------------------------------------------
  // 5. URL Hash Handler (e.g. #consultation, #valuation, #ma, #enquiries)
  // --------------------------------------------------------------------------
  function handleUrlHash() {
    const rawHash = window.location.hash || '';
    if (!rawHash) return;
    const hash = rawHash.toLowerCase();

    // Map hash to enquiry type dropdown
    const selectEl = document.getElementById('enquiryType');
    if (selectEl) {
      if (hash.includes('valuation')) {
        selectEl.value = 'Business Valuation';
      } else if (hash.includes('ma') || hash.includes('acquisition') || hash.includes('mandate')) {
        selectEl.value = 'Mergers & Acquisitions';
      } else if (hash.includes('diligence')) {
        selectEl.value = 'Financial Due Diligence';
      } else if (hash.includes('model') || hash.includes('analysis')) {
        selectEl.value = 'Financial Analysis & Modelling';
      } else if (hash.includes('transaction') || hash.includes('support')) {
        selectEl.value = 'Transaction Support';
      } else if (hash.includes('enquir') || hash.includes('general')) {
        selectEl.value = 'General Advisory Enquiry';
      }

      // Update matching enquiry panel visual state if available
      const panels = document.querySelectorAll('.enquiry-panel-item');
      panels.forEach(p => {
        if (p.getAttribute('data-enquiry-val') === selectEl.value) {
          p.classList.add('active');
        } else {
          p.classList.remove('active');
        }
      });
    }

    // Determine target element to scroll to
    let target = null;
    try {
      target = document.querySelector(rawHash);
    } catch (e) {
      target = null;
    }

    if (!target) {
      target = document.getElementById('consultation') || document.getElementById('enquiryForm');
    }

    if (target) {
      setTimeout(() => {
        const navHeight = getNavHeight();
        const targetTop = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });

        // Auto-focus first input field for immediate engagement
        setTimeout(() => {
          const nameInput = document.getElementById('fullName');
          if (nameInput) nameInput.focus();
        }, 400);
      }, 250);
    }
  }

  window.addEventListener('hashchange', handleUrlHash);

  // Handle same-page click on consultation buttons
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    if (href.includes('contact.html#') || href.startsWith('#consultation') || href.startsWith('#enquiryForm')) {
      const hashPart = href.includes('#') ? '#' + href.split('#')[1] : '';
      if (hashPart) {
        e.preventDefault();
        window.location.hash = hashPart;
        handleUrlHash();
      }
    }
  });

  function getNavHeight() {
    const header = document.querySelector('.nb-header') || document.querySelector('header');
    return header ? header.offsetHeight : 88;
  }
})();
