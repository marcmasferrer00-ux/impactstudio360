// script.js
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');

  if (!hamburger || !nav) return;

  // Toggle menú mòbil
  hamburger.addEventListener('click', (e) => {
    e.preventDefault();
    const isOpen = nav.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Tancar menú quan cliquem un enllaç
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
});
