(()=>{
  'use strict';
  const MEASUREMENT_ID='G-RL3SF5JXKM';
  const CONSENT_KEY='coinvoyu_taiwan_analytics_consent_v1';
  if(!(location.pathname==='/tw'||location.pathname.startsWith('/tw/')))return;
  if(window.__coinvoyuTaiwanAnalyticsLoaded)return;
  window.__coinvoyuTaiwanAnalyticsLoaded=true;

  function loadAnalytics(){
    if(document.querySelector(`script[data-ga4-measurement="${MEASUREMENT_ID}"]`))return;
    window.dataLayer=window.dataLayer||[];
    window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};
    window.gtag('js',new Date());
    window.gtag('config',MEASUREMENT_ID);
    const script=document.createElement('script');
    script.async=true;
    script.src=`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(MEASUREMENT_ID)}`;
    script.dataset.ga4Measurement=MEASUREMENT_ID;
    document.head.appendChild(script);
    window.cvAnalyticsConsent=true;
  }
  function saveConsent(value){try{localStorage.setItem(CONSENT_KEY,value)}catch{}}
  function readConsent(){try{return localStorage.getItem(CONSENT_KEY)}catch{return null}}
  function showConsent(){
    if(document.getElementById('cv-taiwan-analytics-consent'))return;
    const panel=document.createElement('section');
    panel.id='cv-taiwan-analytics-consent';
    panel.setAttribute('role','dialog');
    panel.setAttribute('aria-label','分析 Cookie 選擇');
    panel.style.cssText='position:fixed;z-index:2147483647;left:16px;right:16px;bottom:16px;max-width:720px;margin:auto;padding:16px 18px;border:1px solid #d8dee9;border-radius:14px;background:#fff;color:#172033;box-shadow:0 18px 50px rgba(20,30,50,.18);font:14px/1.55 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif';
    panel.innerHTML='<strong style="display:block;margin-bottom:5px">協助改善 CoinVoyu 台灣</strong><span>經你同意後，我們使用 Google Analytics 4 統計匿名造訪和頁面瀏覽；拒絕不影響閱讀。</span><div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:12px"><button type="button" data-consent="deny" style="padding:8px 13px;border:1px solid #c9d1dd;border-radius:8px;background:#fff;color:#172033;cursor:pointer">拒絕</button><button type="button" data-consent="allow" style="padding:8px 13px;border:1px solid #173f8a;border-radius:8px;background:#173f8a;color:#fff;cursor:pointer">允許匿名分析</button></div>';
    panel.addEventListener('click',event=>{
      const button=event.target.closest('button[data-consent]');
      if(!button)return;
      const allowed=button.dataset.consent==='allow';
      saveConsent(allowed?'granted':'denied');
      panel.remove();
      if(allowed)loadAnalytics();
    });
    document.body.appendChild(panel);
  }
  const consent=readConsent();
  if(consent==='granted')loadAnalytics();
  else if(consent!=='denied')showConsent();
})();