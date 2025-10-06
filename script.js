// Menú mòbil
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');

  if (burger && nav) {
    burger.addEventListener('click', (e) => {
      e.preventDefault();
      nav.classList.toggle('active');
      burger.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', nav.classList.contains('active') ? 'true' : 'false');
    });

    // Tancar en clicar un enllaç
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll suau
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
      }
    });
  });
});
