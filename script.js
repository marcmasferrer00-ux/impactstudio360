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

// ----- HEADER SCROLL (reducció logo al fer scroll) -----
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

// ----- COUNT-UP (percentatges que ja NO es queden a 0) -----
(function initCounters() {
  const counters = document.querySelectorAll('.stats strong[data-target]');
  if (!counters.length) return;

  const inView = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = Number(el.getAttribute('data-target')) || 0;
      let current = 0;
      const duration = 1600;
      const startTime = performance.now();

      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        current = Math.floor(progress * target);
        el.textContent = current;
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target; // valor final exacte
      }
      requestAnimationFrame(tick);

      inView.unobserve(el);
    });
  }, { threshold: 0.45 });

  counters.forEach(c => inView.observe(c));
})();

// Afegim el símbol % als elements que tenen <span class="unit">%
(function attachPercent() {
  // ja es mostra el % amb span a l'HTML; només assegurem que es mostri si JS no carrega
  document.querySelectorAll('.stat').forEach(stat => {
    const unit = stat.querySelector('.unit');
    if (unit) unit.style.display = 'inline-block';
  });
})();

// ----- (Opcional) Fade-in suau de targetes (sense amagar contingut si no hi ha JS) -----
(function revealCards() {
  const cards = document.querySelectorAll('.card');
  if (!cards.length) return;

  // No amaguem res per defecte al CSS (ja es veu); només fem animació suau
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(c => obs.observe(c));
})();

// ----- FORMULARI (feedback simple) -----
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
