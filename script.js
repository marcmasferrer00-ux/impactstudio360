// script.js
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("header nav"); // 🔑 només el nav del header

  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  // Tanquem menú quan fem clic a un enllaç
  const links = nav.querySelectorAll("ul li a");
  links.forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  });
});
