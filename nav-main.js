(() => {
  function initMainNav() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navRoot = document.querySelector('header nav');

    if (!mobileMenuBtn || !navLinks || !navRoot) return;

    function closeMobileMenu() {
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('nav-open');
      document.body.classList.remove('menu-open');
      navLinks.querySelectorAll('.nav-dropdown').forEach((dd) => dd.classList.remove('open'));
      navLinks.querySelectorAll('.nav-dropdown-toggle').forEach((btn) => btn.setAttribute('aria-expanded', 'false'));
    }

    mobileMenuBtn.addEventListener('click', function () {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!isExpanded));
      navLinks.classList.toggle('nav-open');
      document.body.classList.toggle('menu-open', !isExpanded);
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 980 && navLinks.classList.contains('nav-open') && !navRoot.contains(e.target)) {
        closeMobileMenu();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) {
        closeMobileMenu();
      }
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMainNav);
  } else {
    initMainNav();
  }
})();
