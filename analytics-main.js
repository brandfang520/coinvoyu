(function () {
  'use strict';

  var MEASUREMENT_ID = 'G-5J0SV9JB26';
  var CONSENT_KEY = 'coinvoyu_main_analytics_consent_v1';

  if (window.location.pathname === '/tw' || window.location.pathname.indexOf('/tw/') === 0) return;
  if (window.__coinvoyuMainAnalyticsLoaded) return;
  window.__coinvoyuMainAnalyticsLoaded = true;

  function loadAnalytics() {
    if (document.querySelector('script[data-ga4-measurement="' + MEASUREMENT_ID + '"]')) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', MEASUREMENT_ID);

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(MEASUREMENT_ID);
    script.dataset.ga4Measurement = MEASUREMENT_ID;
    document.head.appendChild(script);
    window.cvAnalyticsConsent = true;
  }

  function saveConsent(value) {
    try { window.localStorage.setItem(CONSENT_KEY, value); } catch (error) { /* session-only choice */ }
  }

  function readConsent() {
    try { return window.localStorage.getItem(CONSENT_KEY); } catch (error) { return null; }
  }

  function showConsent() {
    if (document.getElementById('cv-main-analytics-consent')) return;
    var panel = document.createElement('section');
    panel.id = 'cv-main-analytics-consent';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', '分析 Cookie 选择');
    panel.style.cssText = 'position:fixed;z-index:2147483647;left:16px;right:16px;bottom:16px;max-width:720px;margin:auto;padding:16px 18px;border:1px solid #d8dee9;border-radius:14px;background:#fff;color:#172033;box-shadow:0 18px 50px rgba(20,30,50,.18);font:14px/1.55 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif';
    panel.innerHTML = '<strong style="display:block;margin-bottom:5px">帮助改进 CoinVoyu</strong><span>经你同意后，我们使用 Google Analytics 4 统计匿名访问和页面浏览；拒绝不影响阅读。</span><div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:12px"><button type="button" data-consent="deny" style="padding:8px 13px;border:1px solid #c9d1dd;border-radius:8px;background:#fff;color:#172033;cursor:pointer">拒绝</button><button type="button" data-consent="allow" style="padding:8px 13px;border:1px solid #173f8a;border-radius:8px;background:#173f8a;color:#fff;cursor:pointer">允许匿名分析</button></div>';
    panel.addEventListener('click', function (event) {
      var button = event.target.closest('button[data-consent]');
      if (!button) return;
      var allowed = button.dataset.consent === 'allow';
      saveConsent(allowed ? 'granted' : 'denied');
      panel.remove();
      if (allowed) loadAnalytics();
    });
    document.body.appendChild(panel);
  }

  var consent = readConsent();
  if (consent === 'granted') loadAnalytics();
  else if (consent !== 'denied') showConsent();
})();