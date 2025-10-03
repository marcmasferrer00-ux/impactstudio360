// script.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ script carregat correctament");

  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("nav");

  if (!hamburger) {
    console.error("❌ No s'ha trobat el botó hamburguesa");
    return;
  }

  if (!nav) {
    console.error("❌ No s'ha trobat el menú <nav>");
    return;
  }

  // Quan es clica el botó hamburguesa
  hamburger.addEventListener("click", () => {
    console.log("👉 Botó hamburguesa clicat");
    nav.classList.toggle("active");
    console.log("Classes actuals del <nav>:", nav.classList.value);
  });

  // Quan es clica un enllaç del menú (tanquem el menú)
  const links = document.querySelectorAll("nav ul li a");
  links.forEach(link => {
    link.addEventListener("click", () => {
      console.log("🔗 Enllaç clicat:", link.textContent);
      nav.classList.remove("active");
    });
  });
});
