/* Calvert Specialty Contracting LLC - site script (loaded with defer) */
(function () {
  'use strict';

  /* ===========================================================
     GOOGLE ANALYTICS 4
     Replace G-XXXXXXXXXX with your real Measurement ID
     (GA4 > Admin > Data streams > your stream). While it says
     G-XXXXXXXXXX, analytics stays OFF and nothing is loaded.
     =========================================================== */
  var GA4_ID = 'G-XXXXXXXXXX';

  if (GA4_ID !== 'G-XXXXXXXXXX' && /^G-[A-Z0-9]+$/.test(GA4_ID)) {
    var ga = document.createElement('script');
    ga.async = true;
    ga.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
    document.head.appendChild(ga);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA4_ID);
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  function isOpen() { return toggle.getAttribute('aria-expanded') === 'true'; }
  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () { setOpen(!isOpen()); });

    // Close after tapping a link
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    // Escape closes and returns focus to the button
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    // Click outside the header closes it
    document.addEventListener('click', function (e) {
      if (isOpen() && !e.target.closest('.site-header')) setOpen(false);
    });

    // Reset when resizing up to desktop
    var desktop = window.matchMedia('(min-width: 900px)');
    var onChange = function (mq) { if (mq.matches) setOpen(false); };
    if (desktop.addEventListener) desktop.addEventListener('change', onChange);
    else if (desktop.addListener) desktop.addListener(onChange);
  }

  /* ---------- Bid invite form (Formspree) ---------- */
  var form = document.getElementById('bid-form');
  if (!form) return;

  form.noValidate = true; // we show our own messages; browser validation still works if JS is off
  var statusEl = document.getElementById('form-status');
  var submitBtn = form.querySelector('button[type="submit"]');
  var submitLabel = submitBtn.textContent;

  var rules = [
    { id: 'f-name', check: function (v) { return v ? '' : 'Please enter your name.'; } },
    { id: 'f-company', check: function (v) { return v ? '' : 'Please enter your company.'; } },
    {
      id: 'f-email', check: function (v) {
        if (!v) return 'Please enter your email.';
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Please enter a valid email address.';
      }
    },
    {
      id: 'f-phone', check: function (v) {
        if (!v) return '';
        return v.replace(/\D/g, '').length >= 10 ? '' : 'Please enter a full phone number, or leave it blank.';
      }
    },
    { id: 'f-project', check: function (v) { return v ? '' : 'Please enter the project name or location.'; } },
    {
      id: 'f-bid-date', check: function (v) {
        if (!v) return '';
        return isNaN(Date.parse(v)) ? 'Please enter a valid date, or leave it blank.' : '';
      }
    }
  ];

  function setFieldError(input, message) {
    var errEl = document.getElementById(input.id + '-err');
    if (message) {
      input.setAttribute('aria-invalid', 'true');
      if (errEl) { errEl.textContent = message; errEl.hidden = false; }
    } else {
      input.removeAttribute('aria-invalid');
      if (errEl) { errEl.textContent = ''; errEl.hidden = true; }
    }
  }

  function validate() {
    var firstBad = null;
    rules.forEach(function (rule) {
      var input = document.getElementById(rule.id);
      var msg = rule.check(input.value.trim());
      setFieldError(input, msg);
      if (msg && !firstBad) firstBad = input;
    });
    return firstBad;
  }

  // Clear a field's error as soon as the person fixes it
  rules.forEach(function (rule) {
    var input = document.getElementById(rule.id);
    input.addEventListener('input', function () {
      if (input.getAttribute('aria-invalid') === 'true' && !rule.check(input.value.trim())) {
        setFieldError(input, '');
      }
    });
  });

  function showStatus(type, message) {
    statusEl.className = 'form-status ' + (type === 'success' ? 'is-success' : 'is-error');
    statusEl.textContent = message;
    statusEl.focus();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    statusEl.className = 'form-status';
    statusEl.textContent = '';

    // Honeypot filled = bot. Pretend it worked and send nothing.
    if (form.elements['_gotcha'].value) {
      form.reset();
      showStatus('success', "Thank you. Your request has been sent, and we'll be in touch shortly.");
      return;
    }

    var firstBad = validate();
    if (firstBad) {
      firstBad.focus();
      return;
    }

    if (form.action.indexOf('YOUR_FORM_ID') !== -1) {
      showStatus('error', "This form isn't connected yet. Please reach us by phone or email for now.");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(function (res) {
        if (res.ok) {
          form.reset();
          showStatus('success', "Thank you. Your request has been sent, and we'll be in touch shortly.");
          return;
        }
        return res.json().catch(function () { return {}; }).then(function (data) {
          var detail = data && data.errors ? ' (' + data.errors.map(function (x) { return x.message; }).join(', ') + ')' : '';
          showStatus('error', "Sorry, that didn't send" + detail + '. Please try again, or reach us by phone or email.');
        });
      })
      .catch(function () {
        showStatus('error', "Sorry, that didn't send. Check your connection and try again, or reach us by phone or email.");
      })
      .then(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = submitLabel;
      });
  });
})();
