(function () {
  const root = document.documentElement;
  let saved = null;
  try { saved = localStorage.getItem("degree-plan-theme"); } catch (_) {}
  root.dataset.theme = saved === "light" ? "light" : "dark";

  function addCrossLink() {
    const bar = document.querySelector(".top-app-bar");
    const toggle = document.querySelector("[data-theme-toggle]");
    if (!bar || document.querySelector(".site-link")) return;

    const link = document.createElement("a");
    link.className = "site-link";
    link.href = "https://devin-thomas.github.io/college-courses/";
    link.setAttribute("aria-label", "Open selected college courses");
    link.innerHTML = '<span>Selected Courses</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.2 5.2 19 11H4v2h15l-5.8 5.8 1.4 1.4L22.8 12l-8.2-8.2-1.4 1.4Z"/></svg>';

    if (toggle) bar.insertBefore(link, toggle);
    else bar.appendChild(link);

    const style = document.createElement("style");
    style.textContent = `
      .top-app-bar { gap: 10px; }
      .site-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        min-height: 42px;
        margin-left: auto;
        padding: 0 14px;
        border-radius: 999px;
        color: var(--md-on-primary-container);
        background: var(--md-primary-container);
        font-size: .86rem;
        font-weight: 740;
        line-height: 1;
        text-decoration: none;
        white-space: nowrap;
        transition: filter .16s ease, transform .16s ease;
      }
      .site-link:hover { filter: brightness(1.12); }
      .site-link:active { transform: scale(.98); }
      .site-link:focus-visible {
        outline: 3px solid color-mix(in srgb, var(--md-primary) 55%, transparent);
        outline-offset: 3px;
      }
      .site-link svg { width: 18px; height: 18px; fill: currentColor; }
      .theme-toggle { flex: 0 0 auto; }
      @media (max-width: 560px) {
        .site-link { min-height: 40px; padding: 0 10px; font-size: .78rem; }
        .site-link svg { width: 16px; height: 16px; }
      }
    `;
    document.head.appendChild(style);
  }

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
    addCrossLink();
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