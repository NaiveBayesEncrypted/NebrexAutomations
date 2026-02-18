(() => {
  const solutions = [
    { slug: "sales", title: "Lead Capture", desc: "Speed-to-lead, instant follow-ups, and CRM sync", icon: "\u25CE" },
    { slug: "marketing", title: "Reviews & Reputation", desc: "Automate review requests and boost local visibility", icon: "\u2197" },
    { slug: "operations", title: "Scheduling & Dispatch", desc: "AI booking, reminders, and no-show reduction", icon: "\u2699" },
    { slug: "support", title: "Call Recovery", desc: "Missed call text-back and 24/7 AI receptionist", icon: "\u2318" },
    { slug: "engineering", title: "Quote Follow-Up", desc: "Automated sequences that close more estimates", icon: "<>" },
    { slug: "other", title: "Custom Solutions", desc: "Tailored automation for your specific workflow", icon: "\u25CC" }
  ];

  function getBasePath() {
    var pathname = window.location.pathname;
    if (pathname.includes("/solutions/")) {
      return "../../";
    }
    return "";
  }

  function renderSolutionsMenu(menuEl, base) {
    menuEl.innerHTML = "";
    solutions.forEach(function(item) {
      var link = document.createElement("a");
      link.href = base + "solutions/" + item.slug + "/index.html";
      link.className = "solution-item";
      link.setAttribute("role", "menuitem");
      link.innerHTML =
        '<span class="solution-icon" aria-hidden="true">' + item.icon + '</span>' +
        '<span class="solution-copy">' +
          '<strong>' + item.title + '</strong>' +
          '<small>' + item.desc + '</small>' +
        '</span>';
      menuEl.appendChild(link);
    });
  }

  function initDropdown(dropdown) {
    var toggle = dropdown.querySelector(".nav-dropdown-toggle");
    var menu = dropdown.querySelector(".nav-solutions-menu");
    if (!toggle || !menu) return;

    try {
      var base = getBasePath();
      renderSolutionsMenu(menu, base);
    } catch (err) {
      return;
    }

    toggle.addEventListener("click", function(e) {
      e.preventDefault();
      var isOpen = dropdown.classList.contains("open");
      dropdown.classList.toggle("open", !isOpen);
      toggle.setAttribute("aria-expanded", String(!isOpen));
    });

    document.addEventListener("click", function(e) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape" && dropdown.classList.contains("open")) {
        dropdown.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });

    menu.addEventListener("keydown", function(e) {
      var items = menu.querySelectorAll("a");
      if (!items.length) return;
      var current = document.activeElement;
      var idx = Array.prototype.indexOf.call(items, current);

      if (e.key === "ArrowDown") {
        e.preventDefault();
        var next = idx < items.length - 1 ? idx + 1 : 0;
        items[next].focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        var prev = idx > 0 ? idx - 1 : items.length - 1;
        items[prev].focus();
      }
    });

    menu.querySelectorAll("a").forEach(function(a) {
      a.addEventListener("click", function() {
        dropdown.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".nav-dropdown").forEach(initDropdown);
  });
})();
