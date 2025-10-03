// script.js

// Esperem que el DOM estigui carregat
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger"); // botó ☰
  const nav = document.querySelector("nav"); // menú de navegació

  // Quan cliquem el botó hamburguesa
  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active"); // afegim/treiem classe "active"
  });

  // Quan fem clic a un enllaç del menú (en mòbil), tanquem el menú
  const links = document.querySelectorAll("nav ul li a");
  links.forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  });

  // Opcional: tanquem el menú si es fa "resize" a desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      nav.classList.remove("active");
    }
  });
});
