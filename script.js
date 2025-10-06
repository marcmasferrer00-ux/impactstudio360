/* ======================================================
   IMPACT STUDIO 360 - Script principal
   Autor: Marc Masferrer / 2025
====================================================== */

/* ------------------------------
   MENÚ MÒBIL
------------------------------ */
const hamburger = document.querySelector('.hamburger');
const nav = document.getElementById('mainNav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    const open = nav.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Tanca menú en clicar un enllaç
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('active'));
  });
}

/* ------------------------------
   EFECTE HEADER SCROLL
------------------------------ */
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

/* ------------------------------
   ANIMACIÓ DE SECCIONS (fade-up)
------------------------------ */
const fadeElements = document.querySelectorAll('.fade-item');
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

fadeElements.forEach(el => fadeObserver.observe(el));

/* ------------------------------
   COUNT-UP STATS
------------------------------ */
const counters = document.querySelectorAll('.stats .grid div strong');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = parseInt(counter.textContent);
      let count = 0;
      const step = Math.ceil(target / 60);

      const update = () => {
        count += step;
        if (count > target) count = target;
        counter.textContent = count;
        if (count < target) requestAnimationFrame(update);
      };
      requestAnimationFrame(update);

      counterObserver.unobserve(counter);
    }
  });
}, { threshold: 0.4 });

counters.forEach(c => counterObserver.observe(c));

/* ------------------------------
   TESTIMONIS SLIDER AUTOMÀTIC
------------------------------ */
const quotes = document.querySelectorAll('.testimonial-slider blockquote');
let currentQuote = 0;

if (quotes.length > 1) {
  quotes[currentQuote].style.display = 'block';

  setInterval(() => {
    quotes[currentQuote].style.display = 'none';
    currentQuote = (currentQuote + 1) % quotes.length;
    quotes[currentQuote].style.display = 'block';
  }, 6000);
}

/* ------------------------------
   FORMULARI DE CONTACTE (Web3Forms)
   + Confeti animat + feedback
------------------------------ */
const form = document.getElementById('contact-form');
const result = document.getElementById('form-result');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    result.textContent = "Enviant missatge...";
    result.className = "form-result show";
    result.style.background = "#f0f0f0";

    const formData = new FormData(form);
    try {
      const res = await fetch(form.action, {
        method: form.method,
        body: formData
      });

      if (res.ok) {
        result.textContent = "✅ Gràcies! Hem rebut el teu missatge.";
        result.style.background = "#e8f9e8";
        result.style.color = "#2b7a0b";
        form.reset();
        launchConfetti();
      } else {
        throw new Error();
      }
    } catch (error) {
      result.textContent = "❌ Hi ha hagut un error. Torna-ho a intentar.";
      result.style.background = "#ffeaea";
      result.style.color = "#a40000";
    }
  });
}

/* ------------------------------
   CONFETI ANIMAT (Canvas)
------------------------------ */
function launchConfetti() {
  const confettiCanvas = document.createElement('canvas');
  confettiCanvas.style.position = 'fixed';
  confettiCanvas.style.top = 0;
  confettiCanvas.style.left = 0;
  confettiCanvas.style.width = '100%';
  confettiCanvas.style.height = '100%';
  confettiCanvas.style.pointerEvents = 'none';
  confettiCanvas.style.zIndex = 9999;
  document.body.appendChild(confettiCanvas);

  const ctx = confettiCanvas.getContext('2d');
  const confettis = [];
  const colors = ['#e63946', '#ff7f50', '#ffd166', '#06d6a0', '#118ab2'];

  for (let i = 0; i < 150; i++) {
    confettis.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight - window.innerHeight,
      w: Math.random() * 6 + 2,
      h: Math.random() * 10 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 3 + 2,
      rotate: Math.random() * 2 * Math.PI
    });
  }

  const animate = () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    confettis.forEach(c => {
      c.y += c.speed;
      if (c.y > window.innerHeight) c.y = -10;
      ctx.fillStyle = c.color;
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(c.rotate);
      ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
      ctx.restore();
      c.rotate += 0.02;
    });
    requestAnimationFrame(animate);
  };

  animate();

  setTimeout(() => confettiCanvas.remove(), 5000);
}

/* ------------------------------
   FINS AQUÍ EL SCRIPT
------------------------------ */
