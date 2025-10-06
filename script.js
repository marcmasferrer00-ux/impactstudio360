/* ==============================
   IMPACT STUDIO 360 - JS ROBUST
============================== */

// Helper segur per capturar errors d'inicialització
const safe = (fn) => { try { fn(); } catch(e) { console.error(e); } };

// ----- MENÚ MÒBIL -----
safe(() => {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.getElementById('mainNav');
  if (!hamburger || !nav) return;
  hamburger.addEventListener('click', () => {
    const open = nav.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => nav.classList.remove('active'))
  );
});

// ----- HEADER SCROLL -----
safe(() => {
  const header = document.querySelector('header');
  if (!header) return;
  const onScroll = () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll);
});

// ----- REVEAL ON SCROLL (fallback inclòs) -----
safe(() => {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const reveal = (el) => el.classList.add('visible');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.25 });
    els.forEach(el => io.observe(el));
  } else {
    // Fallback navegadors antics
    els.forEach(reveal);
  }
});

// ----- COUNT-UP (amb fallback si no hi ha IO) -----
safe(() => {
  const counters = document.querySelectorAll('.stats strong[data-target]');
  if (!counters.length) return;

  const run = (el) => {
    const target = Number(el.getAttribute('data-target')) || 0;
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(p * target);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target; // clava valor final
    };
    requestAnimationFrame(step);
  };

  const startAll = () => counters.forEach(run);

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { run(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.45 });
    counters.forEach(c => io.observe(c));
  } else {
    startAll();
  }
});

// ----- FORMULARI (feedback) -----
safe(() => {
  const form = document.getElementById('contact-form');
  const result = document.getElementById('form-result');
  if (!form || !result) return;

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
});
