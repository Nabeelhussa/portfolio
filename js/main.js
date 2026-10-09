(function () {
  'use strict';

  var validPages = ['home', 'about', 'projects', 'resume', 'contact'];
  var navLinks = document.querySelectorAll('nav a');

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

  // Contact Form Mailto Handler
  var sendBtn = document.getElementById('send');
  if (sendBtn) {
    sendBtn.addEventListener('click', function () {
      var nameInput = document.getElementById('cn');
      var emailInput = document.getElementById('ce');
      var msgInput = document.getElementById('cm');

      var name = nameInput ? nameInput.value.trim() : '';
      var email = emailInput ? emailInput.value.trim() : '';
      var message = msgInput ? msgInput.value.trim() : '';

      if (!name || !message) {
        alert('Please enter your name and message before sending.');
        return;
      }

      var body = 'Hi Nabeel,\n\n' + message + '\n\nBest regards,\n' + name + (email ? ' (' + email + ')' : '');
      var mailtoUrl = 'mailto:nabeelhussain.se@gmail.com?subject=' +
        encodeURIComponent('Portfolio Contact from ' + name) +
        '&body=' + encodeURIComponent(body);

      window.location.href = mailtoUrl;
    });
  }
})();
