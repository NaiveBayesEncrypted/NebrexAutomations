(() => {
  const solutions = [
    { slug: "hvac", title: "HVAC", desc: "Lead response and booking workflows for HVAC teams", icon: "*" },
    { slug: "plumbing", title: "Plumbing", desc: "Missed-call recovery and quote follow-up for plumbers", icon: "+" },
    { slug: "roofing", title: "Roofing", desc: "Fast estimate follow-up and scheduling automation", icon: "#" },
    { slug: "electrical", title: "Electrical", desc: "Dispatch-ready intake and follow-up systems", icon: "=" }
  ];

  function getBasePath() {
    const pathname = window.location.pathname;
    if (pathname.includes('/solutions/')) return '../../';
    return '';
  }

  function renderSolutionsMenu(menuEl, base) {
    menuEl.innerHTML = '';
    solutions.forEach((item) => {
      const link = document.createElement('a');
      link.href = `${base}solutions/${item.slug}/index.html`;
      link.className = 'solution-item';
      link.setAttribute('role', 'menuitem');
      link.innerHTML =
        `<span class="solution-icon" aria-hidden="true">${item.icon}</span>` +
        '<span class="solution-copy">' +
          `<strong>${item.title}</strong>` +
          `<small>${item.desc}</small>` +
        '</span>';
      menuEl.appendChild(link);
    });
  }

  function initDropdown(dropdown) {
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');
    const menu = dropdown.querySelector('.nav-solutions-menu');
    if (!toggle || !menu) return;

    const base = getBasePath();
    renderSolutionsMenu(menu, base);

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = dropdown.classList.contains('open');
      dropdown.classList.toggle('open', !isOpen);
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dropdown.classList.contains('open')) {
        dropdown.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });

    menu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        dropdown.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-dropdown').forEach(initDropdown);
  });
})();
