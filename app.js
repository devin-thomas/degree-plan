(function () {
const root = document.documentElement;
let saved = null;
try { saved = localStorage.getItem("degree-plan-theme"); } catch (_) {}
root.dataset.theme = saved === "light" ? "light" : "dark";
function syncToggle() {
const button = document.querySelector("[data-theme-toggle]");
if (!button) return;
const isLight = root.dataset.theme === "light";
button.setAttribute("aria-pressed", String(isLight));
button.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
const label = button.querySelector(".theme-label");
if (label) label.textContent = isLight ? "Dark theme" : "Light theme";
const icon = button.querySelector(".theme-thumb");
if (icon) {
icon.innerHTML = isLight
? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-16h1v3h-1V2Zm0 17h1v3h-1v-3ZM2 11h3v1H2v-1Zm17 0h3v1h-3v-1ZM4.2 4.9l.7-.7L7 6.3l-.7.7-2.1-2.1Zm12 12 .7-.7 2.1 2.1-.7.7-2.1-2.1Zm2.1-12.7.7.7L16.9 7l-.7-.7 2.1-2.1ZM6.3 16.2l.7.7L4.9 19l-.7-.7 2.1-2.1Z"/></svg>'
: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.3 15.2A8.5 8.5 0 0 1 8.8 3.7 8.5 8.5 0 1 0 20.3 15.2Z"/></svg>';
}
}
document.addEventListener("DOMContentLoaded", function () {
syncToggle();
const button = document.querySelector("[data-theme-toggle]");
if (!button) return;
button.addEventListener("click", function () {
root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
try { localStorage.setItem("degree-plan-theme", root.dataset.theme); } catch (_) {}
syncToggle();
});
});
})();
