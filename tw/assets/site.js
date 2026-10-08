(()=>{
  'use strict';
  const menu=document.querySelector('.menu'),nav=document.querySelector('.navlinks');
  if(menu&&nav){
    function close(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','展開導覽選單')}
    menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'關閉導覽選單':'展開導覽選單')});
    document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){close();menu.focus()}});
    document.addEventListener('click',event=>{if(!nav.contains(event.target)&&!menu.contains(event.target))close()});
    nav.addEventListener('click',event=>{if(event.target.closest('a'))close()});
    matchMedia('(min-width:851px)').addEventListener('change',event=>{if(event.matches)close()});
  }
  function track(name,params){
    const data={page:location.pathname,...params};
    if(typeof window.gtag==='function'&&window.cvAnalyticsConsent===true)window.gtag('event',name,data);
    window.dispatchEvent(new CustomEvent('coinvoyu:analytics',{detail:{event:name,...data}}));
  }
  document.addEventListener('click',event=>{const anchor=event.target.closest('[data-event]');if(anchor)track(anchor.dataset.event,{platform:anchor.dataset.platform||'',position:anchor.dataset.position||'',destination:anchor.getAttribute('href')||''})});
  const platform=document.body.dataset.platform;
  if(platform)track('platform_view',{platform,position:'page'});

  async function prepareSeekableVideo(video){
    const source=video.querySelector('source'),mediaUrl=source?.src||video.currentSrc;
    if(!mediaUrl)return;
    const status=document.createElement('p');
    status.className='media-load-status';
    status.setAttribute('role','status');
    status.setAttribute('aria-live','polite');
    status.textContent='正在確認影片拖動功能…';
    video.insertAdjacentElement('afterend',status);
    try{
      const head=await fetch(mediaUrl,{method:'HEAD',cache:'no-store'});
      if(/\bbytes\b/i.test(head.headers.get('accept-ranges')||'')){
        status.textContent='影片可從進度條跳到指定位置。';
        video.dataset.seekMode='range';
        return;
      }
      status.textContent='正在載入完整影片，完成後可自由拖動進度條…';
      const response=await fetch(mediaUrl,{cache:'force-cache'});
      if(!response.ok)throw new Error(`HTTP ${response.status}`);
      const objectUrl=URL.createObjectURL(await response.blob());
      video.dataset.originalSrc=mediaUrl;
      video.dataset.seekMode='buffered-file';
      source?.remove();
      video.src=objectUrl;
      video.load();
      await new Promise((resolve,reject)=>{video.addEventListener('loadedmetadata',resolve,{once:true});video.addEventListener('error',reject,{once:true})});
      status.textContent='影片已載入，可自由拖動進度條。';
      window.addEventListener('pagehide',()=>URL.revokeObjectURL(objectUrl),{once:true});
    }catch{
      status.textContent='影片可從頭播放；若無法拖動，請改用文字教學並稍後重試。';
      video.dataset.seekMode='native-fallback';
    }
  }
  document.querySelectorAll('video').forEach(video=>{prepareSeekableVideo(video);video.addEventListener('play',()=>track('video_play',{video:video.dataset.video,position:'embedded'}))});
  document.querySelectorAll('[data-seek]').forEach(button=>button.addEventListener('click',()=>{const video=button.closest('.video-module').querySelector('video');video.currentTime=Number(button.dataset.seek);video.play().catch(()=>{})}));

  const filterButtons=[...document.querySelectorAll('[data-filter]')],items=[...document.querySelectorAll('[data-category]')],search=document.getElementById('article-search');
  let category='all';
  function apply(){const query=(search?.value||'').trim().toLowerCase();let count=0;items.forEach(item=>{const shown=(category==='all'||item.dataset.category===category)&&(!query||item.textContent.toLowerCase().includes(query));item.hidden=!shown;if(shown)count++});const resultCount=document.getElementById('result-count');if(resultCount)resultCount.textContent=`顯示 ${count} 項內容`;const empty=document.getElementById('no-results');if(empty)empty.hidden=count>0}
  filterButtons.forEach(button=>button.addEventListener('click',()=>{category=button.dataset.filter;filterButtons.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));apply()}));
  search?.addEventListener('input',apply);
  const anchors=[...document.querySelectorAll('.toc a')];
  if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)anchors.forEach(anchor=>anchor.classList.toggle('active',anchor.hash==='#'+entry.target.id))})},{rootMargin:'-100px 0px -65% 0px'});document.querySelectorAll('.article-body h2[id]').forEach(heading=>observer.observe(heading))}
  document.getElementById('download-feedback')?.addEventListener('click',()=>{const text=`CoinVoyu 內容回報草稿\n頁面網址：${document.getElementById('feedback-page').value}\n問題與資料來源：${document.getElementById('feedback-text').value}\n此檔案尚未送出；請依聯絡頁已公布的正式渠道提交。`;const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const anchor=document.createElement('a');anchor.href=url;anchor.download='CoinVoyu-feedback.txt';anchor.click();setTimeout(()=>URL.revokeObjectURL(url),1000)});
})();
