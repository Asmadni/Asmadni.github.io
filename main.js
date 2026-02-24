/* ============================================
   LEVEL UP — Main JavaScript
   Accessible, lightweight, no dependencies
   ============================================ */

(function () {
  'use strict';

  /* ── Mobile Nav Toggle ── */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navLinks.setAttribute('aria-hidden', String(!isOpen));
      navToggle.innerHTML = isOpen ? '✕' : '&#9776;';
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.setAttribute('aria-hidden', 'true');
        navToggle.innerHTML = '&#9776;';
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.setAttribute('aria-hidden', 'true');
        navToggle.innerHTML = '&#9776;';
        navToggle.focus();
      }
    });
  }

  /* ── Smooth Scroll for Nav Links ── */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.focus({ preventScroll: true });
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile nav if open
        if (navLinks) {
          navLinks.classList.remove('open');
          navToggle && navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  /* ── Active Nav Link on Scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchs = document.querySelectorAll('.nav-links a');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navAnchs.forEach((a) => a.removeAttribute('aria-current'));
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (active) active.setAttribute('aria-current', 'page');
        }
      });
    },
    { threshold: 0.45 }
  );
  sections.forEach((s) => observer.observe(s));

  /* ── Scroll-reveal Animations ── */
  const revealElements = document.querySelectorAll('[data-reveal]');
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealElements.forEach((el) => revealObs.observe(el));

  /* ── Counter Animation ── */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      el.textContent = (Number.isInteger(target) ? Math.round(current) : current.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const counters = document.querySelectorAll('[data-target]');
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach((c) => counterObs.observe(c));

  /* ── Contact Form ── */
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Basic client-side validation
      let valid = true;
      form.querySelectorAll('[required]').forEach((field) => {
        if (!field.value.trim()) {
          valid = false;
          field.classList.add('field-error');
          field.setAttribute('aria-invalid', 'true');
          let errId = field.id + '-err';
          let existing = document.getElementById(errId);
          if (!existing) {
            const err = document.createElement('span');
            err.id = errId;
            err.className = 'field-error-msg';
            err.setAttribute('role', 'alert');
            err.style.cssText = 'color:#c00;font-size:.82rem;margin-top:.2rem;display:block;';
            err.textContent = 'This field is required.';
            field.parentNode.appendChild(err);
          }
        } else {
          field.classList.remove('field-error');
          field.removeAttribute('aria-invalid');
          const err = document.getElementById(field.id + '-err');
          if (err) err.remove();
        }
      });

      if (!valid) {
        const firstError = form.querySelector('.field-error');
        if (firstError) firstError.focus();
        return;
      }

      const submitBtn = form.querySelector('[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      // Simulate sending (replace with real endpoint)
      await new Promise((r) => setTimeout(r, 1200));

      form.style.display = 'none';
      if (success) {
        success.style.display = 'block';
        success.setAttribute('tabindex', '-1');
        success.focus();
        // Announce to screen readers
        success.setAttribute('role', 'status');
        success.setAttribute('aria-live', 'polite');
      }
    });

    // Real-time validation clear
    form.querySelectorAll('input, textarea, select').forEach((field) => {
      field.addEventListener('input', () => {
        if (field.value.trim()) {
          field.classList.remove('field-error');
          field.removeAttribute('aria-invalid');
          const err = document.getElementById(field.id + '-err');
          if (err) err.remove();
        }
      });
    });
  }

  /* ── Keyboard-accessible cards ── */
  document.querySelectorAll('.service-card, .portfolio-card').forEach((card) => {
    if (!card.querySelector('a, button')) {
      card.setAttribute('tabindex', '0');
    }
  });

})();
