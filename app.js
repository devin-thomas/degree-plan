(function () {
  const root = document.documentElement;
  let saved = null;
  try { saved = localStorage.getItem("degree-plan-theme"); } catch (_) {}
  root.dataset.theme = saved === "light" ? "light" : "dark";

  function addMaterialDetails() {
    const symbols = { "+": "check_circle", "●": "event_available", "◆": "swap_horiz", "◷": "schedule", "○": "radio_button_unchecked" };
    document.querySelectorAll(".symbol").forEach(function (node) {
      const icon = symbols[node.textContent.trim()];
      if (icon) {
        node.innerHTML = '<span class="material-symbol" aria-hidden="true">' + icon + '</span>';
      }
    });
    document.querySelectorAll("h2").forEach(function (heading) {
      if (heading.querySelector(".material-symbol")) return;
      const icon = document.createElement("span");
      icon.className = "material-symbol";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = "calendar_month";
      heading.prepend(icon);
    });
    document.querySelectorAll(".badge, .status-pill").forEach(function (pill) {
      if (pill.querySelector(".material-symbol")) return;
      const icon = document.createElement("i");
      icon.className = "material-symbol";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = pill.classList.contains("pending") ? "schedule" : pill.classList.contains("substitution") ? "swap_horiz" : pill.classList.contains("neutral") ? "radio_button_unchecked" : "check_circle";
      pill.prepend(icon);
    });
  }

  function addGradeInputs() {
    document.querySelectorAll(".course.complete").forEach(function (course) {
      if (course.parentElement.classList.contains("choice") || course.querySelector(".grade-slot")) return;
      const code = course.querySelector(".code");
      const courseName = (code ? code.parentElement.textContent.replace(code.textContent, "") : course.textContent).trim();
      const key = "degree-plan-grade-" + (code ? code.textContent.trim() : courseName);
      const label = document.createElement("label");
      label.className = "grade-slot";
      label.innerHTML = '<span class="grade-label">Grade</span><input class="grade-input" type="text" maxlength="3" autocomplete="off" placeholder="—">';
      const input = label.querySelector("input");
      input.setAttribute("aria-label", "Grade for " + courseName);
      try { input.value = localStorage.getItem(key) || ""; } catch (_) {}
      input.addEventListener("input", function () {
        try { localStorage.setItem(key, input.value.trim().toUpperCase()); } catch (_) {}
      });
      course.appendChild(label);
    });
  }

  function addCrossLink() {
    const bar = document.querySelector(".top-app-bar");
    const toggle = document.querySelector("[data-theme-toggle]");
    if (!bar || document.querySelector(".site-link")) return;

    const link = document.createElement("a");
    link.className = "site-link";
    link.href = "https://devin-thomas.github.io/college-courses/";
    link.setAttribute("aria-label", "Open selected college courses");
    link.innerHTML = '<span>Selected Courses</span><i class="material-symbol" aria-hidden="true">arrow_forward</i>';

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
        color: var(--on-primary-container);
        background: var(--primary-container);
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
        outline: 3px solid color-mix(in srgb, var(--primary) 55%, transparent);
        outline-offset: 3px;
      }
      .site-link .material-symbol { font-size: 18px; }
      .theme-toggle { flex: 0 0 auto; }
      @media (max-width: 560px) {
        .site-link { min-height: 40px; padding: 0 10px; font-size: .78rem; }
        .site-link .material-symbol { font-size: 16px; }
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
    const icon = button.querySelector(".theme-thumb");
    if (icon) {
      icon.innerHTML = isLight
        ? '<span class="material-symbol" aria-hidden="true">light_mode</span>'
        : '<span class="material-symbol" aria-hidden="true">dark_mode</span>';
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    addMaterialDetails();
    addGradeInputs();
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
