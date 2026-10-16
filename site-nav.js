(function () {
  'use strict';

  var nav = document.querySelector('nav[aria-label="主导航"]');
  if (!nav) return;

  var navLinks = Array.prototype.slice.call(nav.querySelectorAll('a[href]'));
  var existingActive = nav.querySelector('a.active');
  var fallbackHref = existingActive ? existingActive.getAttribute('href') : '';

  function fileName(value) {
    if (!value || value === '/') return 'index.html';
    try {
      var url = new URL(value, window.location.href);
      var path = url.pathname.replace(/\/+$/, '');
      return path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    } catch (error) {
      return value;
    }
  }

  var page = fileName(window.location.pathname);
  var exactSections = {
    'index.html': '/',
    'beginner.html': 'beginner.html',
    'bitcoin.html': 'beginner.html',
    'bitcoin-guide.html': 'beginner.html',
    'btc-usdt-difference.html': 'beginner.html',
    'exchange.html': 'exchange.html',
    'security.html': 'security.html',
    'wallet.html': 'security.html',
    'wallet-guide.html': 'security.html',
    'web3.html': 'web3.html',
    'ethereum-guide.html': 'web3.html',
    'articles.html': 'articles.html',
    'categories.html': 'articles.html',
    'hotspots.html': 'articles.html',
    'videos.html': 'videos.html',
    'tools.html': 'tools.html',
    'about.html': 'about.html',
    'author.html': 'about.html',
    'contact.html': 'about.html',
    'editorial-policy.html': 'about.html'
  };
  var parentSections = {
    'beginner.html': 'beginner.html',
    'bitcoin-guide.html': 'beginner.html',
    'exchange.html': 'exchange.html',
    'binance-guide.html': 'exchange.html',
    'okx-guide.html': 'exchange.html',
    'security.html': 'security.html',
    'wallet-guide.html': 'security.html',
    'web3.html': 'web3.html',
    'ethereum-guide.html': 'web3.html',
    'articles.html': 'articles.html',
    'hotspots.html': 'articles.html'
  };

  var parentLink = document.querySelector('.v60-cluster-parent a[href]');
  var parentPage = parentLink ? fileName(parentLink.getAttribute('href')) : '';
  var targetHref = exactSections[page] || parentSections[parentPage] || fallbackHref;

  navLinks.forEach(function (link) {
    link.classList.remove('active');
    link.removeAttribute('aria-current');
  });

  if (targetHref) {
    var targetPage = fileName(targetHref);
    var activeLink = navLinks.find(function (link) {
      return fileName(link.getAttribute('href')) === targetPage;
    });
    if (activeLink) {
      activeLink.classList.add('active');
      activeLink.setAttribute('aria-current', 'page');
    }
  }

  var header = nav.closest('header');
  var shell = header && header.classList.contains('nav') ? header : nav.parentElement;
  var toggle = header ? header.querySelector('.nav-toggle') : null;
  if (!header || !shell || !toggle) return;

  shell.classList.add('nav-enhanced');

  function closeMenu(returnFocus) {
    shell.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', '打开主导航');
    if (returnFocus) toggle.focus();
  }

  function openMenu() {
    shell.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', '关闭主导航');
  }

  toggle.addEventListener('click', function () {
    if (shell.classList.contains('is-open')) closeMenu(false);
    else openMenu();
  });

  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) closeMenu(false);
  });

  document.addEventListener('click', function (event) {
    if (shell.classList.contains('is-open') && !header.contains(event.target)) {
      closeMenu(false);
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && shell.classList.contains('is-open')) {
      closeMenu(true);
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 760 && shell.classList.contains('is-open')) {
      closeMenu(false);
    }
  });
})();

(function () {
  'use strict';

  if (window.location.pathname === '/tw' || window.location.pathname.indexOf('/tw/') === 0) return;
  if (document.querySelector('script[data-cv-analytics="main"]')) return;

  var script = document.createElement('script');
  script.src = '/analytics-main.js';
  script.defer = true;
  script.dataset.cvAnalytics = 'main';
  document.head.appendChild(script);
})();