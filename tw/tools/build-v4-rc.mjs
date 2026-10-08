import fs from 'node:fs';
import path from 'node:path';

const tw=path.resolve(import.meta.dirname,'..');
const repo=path.resolve(tw,'..');
const origin='https://www.coinvoyu.com';
const date='2026年10月08日';
const iso='2026-10-08T00:00:00+08:00';
const read=rel=>fs.readFileSync(path.join(tw,rel),'utf8');
const write=(rel,data)=>{const file=path.join(tw,rel);fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,data)};
const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{const p=path.join(dir,e.name);return e.isDirectory()?walk(p):[p]});

write('articles/index.html',read('articles/index.html').replace('>V3 BATCH 2<','>TAIWAN TOPICS<'));

// Add the V4.1 Insights Hub to the existing desktop and mobile navigation.
// This is intentionally a Taiwan-only static-shell update.
for(const file of walk(tw).filter(f=>f.endsWith('.html'))){
  let html=fs.readFileSync(file,'utf8');
  const nav=(html.match(/<nav class="navlinks"[\s\S]*?<\/nav>/)||[])[0];
  if(nav&&!nav.includes('href="/tw/insights/"')){
    const active=file.includes(`${path.sep}insights${path.sep}`)?' aria-current="page"':'';
    const updated=nav.replace(/(<a href="\/tw\/videos\/"[^>]*>影片教學<\/a>)/,`$1<a href="/tw/insights/"${active}>熱點解讀</a>`);
    if(updated===nav)throw new Error(`Unable to add Insights navigation to ${path.relative(tw,file)}`);
    html=html.replace(nav,updated);
    fs.writeFileSync(file,html);
  }
}

const shell=read('videos/okx-c2c-buy/index.html');
const header=(shell.match(/<header class="header">[\s\S]*?<\/header>/)||[])[0];
const footer=(shell.match(/<footer class="footer">[\s\S]*?<\/body>/)||[])[0];
if(!header||!footer)throw new Error('Unable to resolve current Taiwan video shell');

const newVideos=[
  {
    slug:'okx-internal-transfer', title:'OKX內部轉帳怎麼操作？收款資料核對教學', category:'OKX資金操作', duration:'PT45S', durationLabel:'00:45',
    description:'示範在OKX使用手機號碼、電子郵件、UID或子帳戶進行站內轉帳；操作前必須再次核對收款對象與本人頁面顯示的功能。',
    video:'okx-internal-transfer.mp4', poster:'okx-internal-transfer.webp', article:'/tw/exchanges/okx/withdraw.html', articleTitle:'OKX提幣與轉出教學',
    source:'影片來源：OKX官方教學素材；由CoinVoyu主站媒體庫唯讀複製至台灣站獨立資源。CoinVoyu Taiwan提供繁體導讀，不宣稱為原創。',
    version:'畫面為素材發布時的OKX App介面，已於2026年10月08日核對主要操作邏輯。站內轉帳入口、收款識別方式與費用顯示可能調整，請以本人帳戶最新頁面為準。',
    checks:['先確認這是OKX帳戶之間的站內轉帳，不要與鏈上提幣混為一談','逐字核對收款人的手機號碼、電子郵件、UID或子帳戶','確認幣種、數量與收款人後再完成安全驗證','不要因影片畫面顯示零手續費，就推定所有時間與所有情境都固定免費'],
    related:[['鏈上操作','OKX鏈上入金與提幣','/tw/videos/onchain/'],['帳戶劃轉','OKX資金與交易帳戶劃轉','/tw/videos/fund/'],['帳戶安全','OKX帳戶安全設定','/tw/exchanges/okx/security.html']]
  },
  {
    slug:'okx-official-support', title:'OKX官方客服怎麼聯絡？App內查找教學', category:'OKX安全', duration:'PT21S', durationLabel:'00:21',
    description:'示範從OKX App的「獲取幫助」入口尋找官方客服，並提醒使用者不要相信私訊中的假客服、代操作或索取驗證碼要求。',
    video:'okx-official-support.mp4', poster:'okx-official-support.webp', article:'/tw/exchanges/okx/security.html', articleTitle:'OKX帳戶安全設定',
    source:'影片來源：OKX官方教學素材；由CoinVoyu主站媒體庫唯讀複製至台灣站獨立資源。CoinVoyu Taiwan提供繁體導讀，不宣稱為原創。',
    version:'畫面為素材發布時的OKX App介面，已於2026年10月08日核對主要查找邏輯。選單名稱與客服入口可能更新，請從本人已驗證的OKX App或官方網站進入。',
    checks:['優先從本人已驗證的OKX App或官方網站進入客服','不要從搜尋廣告、社群私訊或陌生群組開啟客服連結','官方客服不應要求你提供密碼、驗證碼、助記詞或遠端控制權','遇到資產或登入問題時保留訂單、TxID與畫面紀錄，但遮蔽敏感資訊'],
    related:[['官方查證','OKX官方管道查證','/tw/videos/official/'],['防釣魚','OKX防釣魚碼設定','/tw/videos/okx-anti-phishing/'],['通用防詐','如何避免加密貨幣詐騙？','/tw/security/crypto-scam-guide.html']]
  }
];

function renderVideo(v){
  const url=`/tw/videos/${v.slug}/`,canonical=origin+url;
  const graph=[
    {'@type':'VideoObject',name:v.title,description:v.description,thumbnailUrl:[`${origin}/tw/assets/video-covers/${v.poster}`],uploadDate:iso,duration:v.duration,contentUrl:`${origin}/tw/assets/videos/${v.video}`,embedUrl:canonical,inLanguage:'zh-TW',publisher:{'@type':'Organization',name:'OKX'}},
    {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'CoinVoyu 台灣',item:origin+'/tw/'},{'@type':'ListItem',position:2,name:'影片教學',item:origin+'/tw/videos/'},{'@type':'ListItem',position:3,name:v.title,item:canonical}]}
  ];
  const checks=v.checks.map(x=>`<li>${x}</li>`).join('');
  const related=v.related.map(([s,t,u])=>`<a class="continue-card" href="${u}"><small>${s}</small><strong>${t}</strong><span>繼續學習</span></a>`).join('');
  return `<!doctype html><html lang="zh-TW"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(v.title)}｜CoinVoyu 台灣</title><meta name="description" content="${esc(v.description)}"><link rel="canonical" href="${canonical}"><meta name="robots" content="index,follow,max-image-preview:large"><meta property="og:type" content="video.other"><meta property="og:locale" content="zh_TW"><meta property="og:title" content="${esc(v.title)}"><meta property="og:description" content="${esc(v.description)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${origin}/tw/assets/video-covers/${v.poster}"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="/tw/assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/tw/assets/site.css"><script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':graph})}</script></head><body id="top">${header}<main id="main" class="wrap policy"><div class="page-head"><nav class="crumb" aria-label="麵包屑"><a href="/tw/">首頁</a><span>›</span><a href="/tw/videos/">影片教學</a><span>›</span><span aria-current="page">${v.title}</span></nav><p class="tag">${v.category}</p><h1>${v.title}</h1><p class="lead">${v.description}</p><div class="byline"><a href="/tw/about/author/">導讀：CoinVoyu編輯團隊</a><span>最後更新：${date}</span><span>${v.durationLabel}</span></div></div><section class="video-module"><video controls playsinline preload="metadata" poster="/tw/assets/video-covers/${v.poster}" aria-label="${v.title}" data-video="${v.slug}"><source src="/tw/assets/videos/${v.video}" type="video/mp4">您的瀏覽器不支援影片播放。</video><div class="video-copy"><p class="tag">${v.category} · ${v.durationLabel}</p><h2>${v.title}</h2><p>${v.description}</p><p class="media-source">${v.source}</p><p class="micro">${v.version}</p></div></section><section><h2>觀看與操作前先核對</h2><ul>${checks}</ul><a class="btn primary" href="${v.article}">閱讀完整文字教學：${v.articleTitle}</a></section><section><h2>相關教學</h2><div class="continue-grid">${related}</div></section><aside class="notice"><strong>風險提示：</strong>影片僅供教育與介面理解，不構成投資建議、地區資格證明或固定費率承諾。涉及付款或資產時，請以本人帳戶與平台最新頁面為準。</aside></main>${footer}</html>`;
}
for(const v of newVideos)write(`videos/${v.slug}/index.html`,renderVideo(v));

const card=(v)=>`<article class="card video-center-card"><a class="video-thumb" href="/tw/videos/${v.slug}/"><img src="/tw/assets/video-covers/${v.poster}" alt="${v.title}封面" width="1200" height="675" loading="lazy"><span class="play-mark" aria-hidden="true">▶</span></a><div class="card-body"><span class="tag">${v.category}</span><h3><a href="/tw/videos/${v.slug}/">${v.title}</a></h3><p>${v.description}</p><div class="card-meta"><span>可播放影片 · 來源已標示</span><span aria-hidden="true">↗</span></div></div></article>`;
let hub=read('videos/index.html');
if(!hub.includes('/tw/videos/okx-internal-transfer/'))hub=hub.replace(/(<a class="video-thumb" href="\/tw\/videos\/onchain\/[\s\S]*?<\/article>)/,`$1${card(newVideos[0])}`);
if(!hub.includes('/tw/videos/okx-official-support/'))hub=hub.replace(/(<a class="video-thumb" href="\/tw\/videos\/okx-anti-phishing\/[\s\S]*?<\/article>)/,`$1${card(newVideos[1])}`);
const currentVideoCount=walk(path.join(tw,'assets','videos')).filter(file=>/\.mp4$/i.test(file)).length;
hub=hub.replace(/<span>\d+個獨立影片檔案<\/span>/,`<span>${currentVideoCount}個獨立影片檔案</span>`);
write('videos/index.html',hub);

// Natural article-to-video links for the two newly surfaced workflows.
let withdraw=read('exchanges/okx/withdraw.html');
if(!withdraw.includes('data-v4-rc-video="internal-transfer"'))withdraw=withdraw.replace('<aside class="platform-cta',`<section class="official-video-entry" data-v4-rc-video="internal-transfer"><img src="/tw/assets/video-covers/okx-internal-transfer.webp" alt="OKX內部轉帳操作影片封面" width="1200" height="675" loading="lazy"><div><p class="tag">影片輔助說明</p><h2>站內轉帳與鏈上提幣要分清楚</h2><p>影片示範OKX帳戶之間的內部轉帳；如果要把資產轉到外部錢包，仍須依本文核對鏈別、地址與提幣規則。</p><a class="btn" href="/tw/videos/okx-internal-transfer/">觀看OKX內部轉帳影片</a></div></section><aside class="platform-cta`);
write('exchanges/okx/withdraw.html',withdraw);
let security=read('exchanges/okx/security.html');
if(!security.includes('data-v4-rc-video="official-support"'))security=security.replace('<aside class="platform-cta',`<aside class="intent-path" data-v4-rc-video="official-support"><strong>遇到帳戶問題？</strong><p>請從本人已驗證的App或官方網站進入客服，不要相信社群私訊中的「客服」。</p><a class="text-link" href="/tw/videos/okx-official-support/">觀看App內官方客服入口教學 →</a></aside><aside class="platform-cta`);
write('exchanges/okx/security.html',security);

// The Q4 attestation remained an attestation. Record the later, separate 2025
// financial-statement audit so the article is accurate as of the RC review.
let tether=read('insights/tether-q4-2025-reserves-attestation/index.html');
tether=tether.replace('完整財務報表審計通常涵蓋更廣的財務報表、期間交易與內控證據。不能把單一時點鑑證寫成「全年所有資產與交易都完成全面審計」。','完整財務報表審計通常涵蓋更廣的財務報表、期間交易與內控證據。不能把這份2025年Q4單一時點鑑證寫成「全年所有資產與交易都完成全面審計」。Tether其後於2026年8月13日另行公告，KPMG已對其截至2025年12月31日止年度財務報表出具無保留意見；那是後續、不同範圍的財務報表審計，不會把1月發布的Q4鑑證文件本身變成審計報告。');
if(!tether.includes('tether-completes-the-largest-inaugural-financial-audit-in-history'))tether=tether.replace('</ol></section><aside class="notice">','<li><a href="https://tether.io/news/tether-completes-the-largest-inaugural-financial-audit-in-history/" target="_blank" rel="noopener noreferrer">Tether：2025年度財務報表審計公告</a><br><span>2026年8月13日發布；與Q4儲備鑑證屬不同文件與查核範圍</span></li></ol></section><aside class="notice">');
write('insights/tether-q4-2025-reserves-attestation/index.html',tether);

// Extend the verified media registry without duplicating shared files.
const registry=JSON.parse(read('assets/video-sources-v3.json'));
for(const v of newVideos){
  if(!registry.items.some(x=>x.file===v.video))registry.items.push({file:v.video,source:'OKX官方教學素材；由主站媒體庫唯讀複製',pages:[`/tw/videos/${v.slug}/`]});
}
registry.independentVideoFiles=registry.items.length;
registry.verified='2026-10-08';
write('assets/video-sources-v3.json',JSON.stringify(registry,null,2)+'\n');

// Add only indexable canonical pages to sitemap and llms discovery.
const urls=[];
for(const file of walk(tw).filter(f=>f.endsWith('.html'))){
  const html=fs.readFileSync(file,'utf8');
  if(/name="robots"[^>]+noindex/i.test(html)||/http-equiv="refresh"/i.test(html))continue;
  const canonical=(html.match(/rel="canonical" href="([^"]+)"/i)||[])[1];
  if(canonical?.startsWith(origin+'/tw/'))urls.push(canonical);
}
const unique=[...new Set(urls)].sort((a,b)=>a===origin+'/tw/'?-1:b===origin+'/tw/'?1:a.localeCompare(b));
write('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${unique.map(url=>`  <url><loc>${url.replaceAll('&','&amp;')}</loc><lastmod>2026-10-08</lastmod></url>`).join('\n')}\n</urlset>\n`);
let llms=read('llms.txt').trimEnd();
for(const v of newVideos){const url=`${origin}/tw/videos/${v.slug}/`;if(!llms.includes(url))llms+=`\n- ${url}`}
write('llms.txt',llms+'\n');

write('v4-rc.json',JSON.stringify({version:'CoinVoyu Taiwan V4 Release Candidate',date:'2026-10-08',baseline:'2adeddaebd7f58007525b61e38bfb5ba8f56499e',independentVideoFiles:registry.independentVideoFiles,newVideoFiles:newVideos.map(v=>({title:v.title,file:`/tw/assets/videos/${v.video}`,url:`/tw/videos/${v.slug}/`,source:'OKX官方教學素材；主站媒體庫唯讀複製'})),videoCandidatesReviewed:32,mainSiteCandidatesNotPreviouslyIntegrated:20,selectedCandidates:2,gateVideoCategory:false,launchStationFilesAccessible:false,notes:['未接入OKX iOS下載影片：要求海外Apple ID，地區適用性與流程穩定性不足','未接入新手合集：內容與已接入的註冊、KYC、C2C、劃轉及現貨影片重複','未接入合約、策略與理財影片：超出台灣站新手教育優先範圍且風險較高','未找到可核驗的Binance Launch Station買幣或提幣檔案','未找到真實可用Gate影片，因此不展示Gate影片分類或占位']},null,2)+'\n');

console.log(`V4 RC built: ${unique.length} sitemap URLs, ${registry.independentVideoFiles} independent videos.`);
