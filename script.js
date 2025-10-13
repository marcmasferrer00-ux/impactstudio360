// //Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');
if (toggle) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Stats counter (animació suau quan apareixen)
const counters = document.querySelectorAll('.stat-number');
if (counters.length) {
  const animate = (el) => {
    const target = parseInt(el.dataset.target, 10);
    let current = 0;
    const step = Math.ceil(target / 50); // ~50 frames
    const tick = () => {
      current += step;
      if (current >= target) {
        el.textContent = target;
      } else {
        el.textContent = current;
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animate(e.target);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach((c) => io.observe(c));
}

// Close mobile nav when a link is clicked
const navLinks = document.querySelectorAll('.main-nav a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

