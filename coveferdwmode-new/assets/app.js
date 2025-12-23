(function () {
  // ----- Year
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  // ----- Mobile menu
  const burger = document.querySelector("[data-burger]");
  const menu = document.querySelector("[data-mobilemenu]");

  if (burger && menu) {
    burger.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(isOpen));
    });

    menu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        menu.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ----- Theme toggle (DEFAULT LIGHT)
  const root = document.documentElement; // <html>
  const toggleBtn = document.getElementById("themeToggle");
  const label = document.getElementById("themeLabel");

  function applyTheme(theme) {
    if (theme === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme"); // light default

    localStorage.setItem("theme", theme);

    if (toggleBtn) {
      const isDark = theme === "dark";
      toggleBtn.setAttribute("aria-checked", String(isDark));
      toggleBtn.setAttribute("aria-label", isDark ? "Passa a tema chiaro" : "Passa a tema scuro");
    }
    if (label) label.textContent = theme === "dark" ? "Dark" : "Light";
  }

  // init (default light)
  const saved = localStorage.getItem("theme");
  applyTheme(saved === "dark" ? "dark" : "light");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      applyTheme(current === "dark" ? "light" : "dark");
    });
  }
})();

// ----- Page fade in / out
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-ready");
});

document.addEventListener("click", (e) => {
  const link = e.target.closest("a");

  if (!link) return;

  // ignora link esterni, anchor, mailto, tel
  const href = link.getAttribute("href");
  if (
    !href ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    link.target === "_blank"
  ) {
    return;
  }

  e.preventDefault();
  document.body.classList.add("page-leave");

  setTimeout(() => {
    window.location.href = href;
  }, 200);
});
