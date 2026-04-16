const STORAGE_KEY = "theme";
const body = document.body;
const toggleBtn = document.getElementById("trocar-modo");

body.classList.add("theme-base");

function applyTheme(theme) {
  body.classList.remove("theme-light", "theme-dark");
  body.classList.add(theme === "dark" ? "theme-dark" : "theme-light");

  if (toggleBtn) {
    toggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";
  }
}

const savedTheme = localStorage.getItem(STORAGE_KEY) || "light";
applyTheme(savedTheme);

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const isDark = body.classList.contains("theme-dark");
    const nextTheme = isDark ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  });
}