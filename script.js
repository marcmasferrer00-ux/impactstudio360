// script.js

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger"); // botó ☰
  const nav = document.querySelector("header nav"); // menú dins del header

  if (hamburger && nav) {
    // Obrir/tancar menú quan es clica el botó hamburguesa
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("active");
    });

    // Tancar menú quan es clica un enllaç
    const links = nav.querySelectorAll("a");
    links.forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
      });
    });
  }
});
