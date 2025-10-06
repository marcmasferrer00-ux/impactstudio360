// script.js
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');

  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', (e) => {
    e.preventDefault();
    const isOpen = nav.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Tancar menú en clicar un enllaç
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
});
