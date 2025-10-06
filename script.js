// ------------------------------
// MENÚ MÒBIL
// ------------------------------
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

// ------------------------------
// ANIMACIÓ COUNT-UP STATS
// ------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const stats = document.querySelectorAll('.stats .grid div strong');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const endValue = parseInt(el.textContent);
        let start = 0;
        const duration = 1800;
        const step = Math.ceil(endValue / (duration / 16));

        const counter = setInterval(() => {
          start += step;
          if (start >= endValue) {
            el.textContent = endValue + '%';
            clearInterval(counter);
          } else {
            el.textContent = start + '%';
          }
        }, 16);

        el.parentElement.classList.add('visible');
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(el => observer.observe(el));
});

// ------------------------------
// ANIMACIÓ FADE-IN EN SCROLL
// ------------------------------
const fadeItems = document.querySelectorAll('.fade-item');

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

fadeItems.forEach(item => fadeObserver.observe(item));
