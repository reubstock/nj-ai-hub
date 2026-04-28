// Active nav highlight + mobile hamburger toggle + dropdown handling
(function () {
  const path = (window.location.pathname || '/').replace(/\/$/, '') || '/';

  // Highlight current page
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = (a.getAttribute('href') || '').split('#')[0].replace(/\/$/, '') || '/';
    if (href === path) a.classList.add('active');
  });

  // If a dropdown contains the active link, mark its trigger active too
  document.querySelectorAll('.nav-dropdown').forEach(dd => {
    if (dd.querySelector('.nav-dropdown-menu a.active')) {
      const trigger = dd.querySelector('.nav-dropdown-trigger');
      if (trigger) trigger.classList.add('active');
    }
  });

  // Hamburger toggle
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-links');
  if (toggle && menu) {
    toggle.addEventListener('click', () => menu.classList.toggle('open'));
  }

  // Dropdown click behaviour:
  //   Desktop: parent link is clickable to /about.html (default).
  //   Mobile: tapping the parent toggles the submenu instead of navigating.
  document.querySelectorAll('.nav-dropdown').forEach(dd => {
    const trigger = dd.querySelector('.nav-dropdown-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dd.classList.toggle('open');
      }
    });
  });
})();
