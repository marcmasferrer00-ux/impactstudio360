// script.js
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');

  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', (e) => {
    e.preventDefault();
    nav.classList.toggle('active');
    const expanded = nav.classList.contains('active');
    hamburger.setAttribute('aria-expanded', expanded);
  });

  // Tanquem el menú al clicar un enllaç
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
});
