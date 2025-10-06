/* ==============================
   IMPACT STUDIO 360 - JS
============================== */

// ----- MENÚ MÒBIL -----
const hamburger = document.querySelector('.hamburger');
const nav = document.getElementById('mainNav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    const open = nav.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => nav.classList.remove('active'))
  );
}

// ----- HEADER SCROLL (canvia mida logo) -----
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

// ----- REVEAL ON SCROLL (seqüencial a hero i general) -----
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.25 });

revealEls.forEach(el => revealObs.observe(el));

// ----- COUNT-UP (amb % en span separat) -----
(function initCounters() {
  const counters = document.querySelectorAll('.stats strong[data-target]');
  if (!counters.length) return;

  const inView = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = Number(el.getAttribute('data-target')) || 0;
      let start = 0;
      const duration = 1400;
      const startTime = performance.now();

      function animate(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(progress * target);
        el.textContent = value;
        if (progress < 1) requestAnimationFrame(animate);
        else el.textContent = target;
      }
      requestAnimationFrame(animate);

      inView.unobserve(el);
    });
  }, { threshold: 0.45 });

  counters.forEach(c => inView.observe(c));
})();

// ----- FORMULARI (feedback) -----
const form = document.getElementById('contact-form');
const result = document.getElementById('form-result');

if (form && result) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    result.textContent = 'Enviant missatge...';
    result.style.background = '#f0f0f0';

    try {
      const res = await fetch(form.action, { method: form.method, body: new FormData(form) });
      if (!res.ok) throw new Error('Error');

      result.textContent = '✅ Gràcies! Hem rebut el teu missatge.';
      result.style.background = '#e8f9e8';
      result.style.color = '#2b7a0b';
      form.reset();
    } catch {
      result.textContent = '❌ Hi ha hagut un error. Torna-ho a intentar.';
      result.style.background = '#ffeaea';
      result.style.color = '#a40000';
    }
  });
}
