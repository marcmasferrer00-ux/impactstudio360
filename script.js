// Menú mòbil
const hamburger = document.querySelector('.hamburger');
const nav = document.getElementById('mainNav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    const open = nav.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Tanca el menú en clicar un enllaç
  nav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => nav.classList.remove('active'))
  );
}

// Enviament formulari (Web3Forms) — missatge d’èxit/error sense redirecció
const form = document.getElementById('contactForm');
if (form) {
  const ok = document.getElementById('formSuccess');
  const ko = document.getElementById('formError');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    ok.hidden = true; ko.hidden = true;

    const data = new FormData(form);
    try {
      const res = await fetch(form.action, { method: 'POST', body: data });
      if (res.ok) {
        ok.hidden = false;
        form.reset();
      } else {
        ko.hidden = false;
      }
    } catch {
      ko.hidden = false;
    }
  });
}
