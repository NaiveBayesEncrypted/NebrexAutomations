(() => {
  const solutions = [
    { slug: "sales", title: "Sales", desc: "Auto-prospect, instant follow-ups, cleaner CRM", icon: "\u25CE" },
    { slug: "marketing", title: "Marketing", desc: "Monitor trends, enrich and personalize at scale", icon: "\u2197" },
    { slug: "operations", title: "Operations", desc: "Sync, clean, and route data in real time", icon: "\u2699" },
    { slug: "support", title: "Support", desc: "Triage, summarize and resolve requests", icon: "\u2318" },
    { slug: "engineering", title: "Engineering", desc: "Ship reliable AI automations without the headache", icon: "<>" },
    { slug: "other", title: "Other", desc: "Passionate about AI and automation", icon: "\u25CC" }
  ];

  function normalizeBase(pathname) {
    return pathname.includes("/solutions/") ? "../../" : "";
  }

  function renderSolutionsMenu(menuEl, base) {
    menuEl.innerHTML = "";
    solutions.forEach((item) => {
      const link = document.createElement("a");
      link.href = `${base}solutions/${item.slug}/index.html`;
      link.className = "solution-item";
      link.setAttribute("role", "menuitem");
      link.innerHTML = `
        <span class="solution-icon" aria-hidden="true">${item.icon}</span>
        <span class="solution-copy">
          <strong>${item.title}</strong>
          <small>${item.desc}</small>
        </span>
      `;
      menuEl.appendChild(link);
    });
  }

  function initDropdown(dropdown) {
    const toggle = dropdown.querySelector(".nav-dropdown-toggle");
    const menu = dropdown.querySelector(".nav-solutions-menu");
    if (!toggle || !menu) return;

    const base = normalizeBase(window.location.pathname);
    renderSolutionsMenu(menu, base);

    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      const isOpen = dropdown.classList.contains("open");
      dropdown.classList.toggle("open", !isOpen);
      toggle.setAttribute("aria-expanded", String(!isOpen));
    });

    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    menu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        dropdown.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".nav-dropdown").forEach(initDropdown);
  });
})();
