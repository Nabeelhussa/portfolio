(function () {
  'use strict';

  var validPages = ['home', 'about', 'projects', 'resume', 'contact'];
  var navLinks = document.querySelectorAll('header nav a');

  function renderPage() {
    var rawHash = location.hash.replace('#', '');
    var currentPage = validPages.indexOf(rawHash) >= 0 ? rawHash : 'home';

    validPages.forEach(function (pageId) {
      var el = document.getElementById(pageId);
      if (el) {
        var isActive = pageId === currentPage;
        el.classList.toggle('on', isActive);
      }
    });

    navLinks.forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === '#' + currentPage) {
        a.setAttribute('aria-current', 'page');
      } else {
        a.removeAttribute('aria-current');
      }
    });

    var activeEl = document.getElementById(currentPage);
    if (activeEl && activeEl.dataset && activeEl.dataset.title) {
      document.title = activeEl.dataset.title + ' – Nabeel Hussain';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.addEventListener('hashchange', renderPage);
  renderPage();

  // Clipboard Copy Utility
  function copyToClipboard(text, btnEl, successLabel) {
    var label = successLabel || 'Copied!';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        triggerSuccess(btnEl, label);
      }).catch(function () {
        fallbackCopy(text, btnEl, label);
      });
    } else {
      fallbackCopy(text, btnEl, label);
    }
  }

  function fallbackCopy(text, btnEl, label) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      triggerSuccess(btnEl, label);
    } catch (err) {
      console.warn('Clipboard copy failed', err);
    }
    document.body.removeChild(textarea);
  }

  function triggerSuccess(btnEl, label) {
    if (!btnEl) return;
    var originalHTML = btnEl.getAttribute('data-original-html') || btnEl.innerHTML;
    if (!btnEl.getAttribute('data-original-html')) {
      btnEl.setAttribute('data-original-html', originalHTML);
    }
    btnEl.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> ' + label;
    btnEl.classList.add('copied');
    setTimeout(function () {
      btnEl.innerHTML = originalHTML;
      btnEl.classList.remove('copied');
    }, 2200);
  }

  // Bind Quick Copy Buttons
  var copyButtons = document.querySelectorAll('.btn-copy');
  copyButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        copyToClipboard(textToCopy, btn, 'Copied!');
      }
    });
  });

  // Contact Form Handlers
  var sendBtn = document.getElementById('send');
  var copyDraftBtn = document.getElementById('copy-draft');
  var feedbackEl = document.getElementById('form-feedback');

  function showFeedback(msg, isError) {
    if (!feedbackEl) return;
    feedbackEl.textContent = msg;
    feedbackEl.className = 'form-feedback ' + (isError ? 'error' : 'success');
  }

  function getFormData() {
    var nameInput = document.getElementById('cn');
    var emailInput = document.getElementById('ce');
    var msgInput = document.getElementById('cm');

    var name = nameInput ? nameInput.value.trim() : '';
    var email = emailInput ? emailInput.value.trim() : '';
    var message = msgInput ? msgInput.value.trim() : '';

    return { name: name, email: email, message: message };
  }

  if (sendBtn) {
    sendBtn.addEventListener('click', function () {
      var data = getFormData();
      if (!data.name || !data.message) {
        showFeedback('Please enter both your name and message before continuing.', true);
        return;
      }

      showFeedback('Opening default mail client with prefilled draft...', false);
      var body = 'Hi Nabeel,\n\n' + data.message + '\n\nBest regards,\n' + data.name + (data.email ? ' (' + data.email + ')' : '');
      var mailtoUrl = 'mailto:nabeelhussain.se@gmail.com?subject=' +
        encodeURIComponent('Portfolio Contact from ' + data.name) +
        '&body=' + encodeURIComponent(body);

      window.location.href = mailtoUrl;
    });
  }

  if (copyDraftBtn) {
    copyDraftBtn.addEventListener('click', function () {
      var data = getFormData();
      if (!data.name || !data.message) {
        showFeedback('Please enter your name and message first to format the draft.', true);
        return;
      }

      var formatted = 'To: nabeelhussain.se@gmail.com\nSubject: Portfolio Contact from ' + data.name + '\n\nHi Nabeel,\n\n' + data.message + '\n\nBest regards,\n' + data.name + (data.email ? ' (' + data.email + ')' : '');
      copyToClipboard(formatted, copyDraftBtn, 'Draft Copied!');
      showFeedback('Message draft copied to clipboard! You can paste directly into Gmail or your favorite webmail.', false);
    });
  }

  // =============================================================
  // Theme Switcher (Dark / Light Mode)
  // =============================================================
  var themeToggle = document.getElementById('theme-toggle');

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  function initTheme() {
    var savedTheme = null;
    try {
      savedTheme = localStorage.getItem('theme');
    } catch (e) {
      // LocalStorage access might be restricted in some iframe contexts
    }

    if (savedTheme === 'dark') {
      applyTheme('dark');
    } else if (savedTheme === 'light') {
      applyTheme('light');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      applyTheme('dark');
    } else {
      applyTheme('light');
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      var newTheme = isDark ? 'light' : 'dark';
      applyTheme(newTheme);
      try {
        localStorage.setItem('theme', newTheme);
      } catch (e) {}
    });
  }

  initTheme();

  // =============================================================
  // Interactive Hardware Simulation Modal (Wokwi)
  // =============================================================
  var simModal = document.getElementById('sim-modal');
  var simTitleEl = document.getElementById('sim-modal-title');
  var simFrameContainer = document.getElementById('sim-frame-container');
  var simExternalLink = document.getElementById('sim-external-link');
  var simCloseBtn = document.getElementById('sim-close-btn');

  function openSimModal(simId, title) {
    if (!simModal || !simFrameContainer) return;

    if (simTitleEl) {
      simTitleEl.textContent = title || 'Circuit Simulation';
    }

    if (simExternalLink) {
      simExternalLink.href = 'https://wokwi.com/projects/' + encodeURIComponent(simId);
    }

    // Dynamic iframe injection: only loads when requested to conserve CPU & memory
    simFrameContainer.innerHTML = '';
    var iframe = document.createElement('iframe');
    iframe.src = 'https://wokwi.com/projects/' + encodeURIComponent(simId) + '?embed=1';
    iframe.title = title || 'Circuit Simulation';
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('allow', 'fullscreen; accelerometer; autoplay; camera; gyroscope; magnetometer; microphone');
    simFrameContainer.appendChild(iframe);

    simModal.classList.add('is-open');
    simModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeSimModal() {
    if (!simModal) return;
    simModal.classList.remove('is-open');
    simModal.setAttribute('aria-hidden', 'true');
    // Clear iframe on close so simulation background audio and loops cease immediately
    if (simFrameContainer) {
      simFrameContainer.innerHTML = '';
    }
    document.body.style.overflow = '';
  }

  var runSimButtons = document.querySelectorAll('.btn-run-sim');
  runSimButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var simId = btn.getAttribute('data-sim-id');
      var simTitle = btn.getAttribute('data-sim-title');
      if (simId) {
        openSimModal(simId, simTitle);
      }
    });
  });

  if (simCloseBtn) {
    simCloseBtn.addEventListener('click', closeSimModal);
  }

  if (simModal) {
    simModal.addEventListener('click', function (e) {
      if (e.target === simModal) {
        closeSimModal();
      }
    });
  }

  // =============================================================
  // Architecture Case Study Modal (Deepfake Shield)
  // =============================================================
  var caseModal = document.getElementById('case-modal');
  var caseCloseBtn = document.getElementById('case-close-btn');
  var openCaseButtons = document.querySelectorAll('.btn-open-case');

  function openCaseModal() {
    if (!caseModal) return;
    caseModal.classList.add('is-open');
    caseModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCaseModal() {
    if (!caseModal) return;
    caseModal.classList.remove('is-open');
    caseModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openCaseButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openCaseModal();
    });
  });

  if (caseCloseBtn) {
    caseCloseBtn.addEventListener('click', closeCaseModal);
  }

  if (caseModal) {
    caseModal.addEventListener('click', function (e) {
      if (e.target === caseModal) {
        closeCaseModal();
      }
    });
  }

  // =============================================================
  // Keyboard Accessibility: Escape key closes active modals
  // =============================================================
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.keyCode === 27) {
      if (simModal && simModal.classList.contains('is-open')) {
        closeSimModal();
      }
      if (caseModal && caseModal.classList.contains('is-open')) {
        closeCaseModal();
      }
    }
  });
})();

