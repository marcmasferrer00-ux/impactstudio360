// script.js
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      mainNav.classList.toggle("active");

      // Actualitza aria-expanded per accessibilitat
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", !expanded);
    });

    // Tanquem el menú en clicar un enllaç
    const links = mainNav.querySelectorAll("a");
    links.forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }
});
