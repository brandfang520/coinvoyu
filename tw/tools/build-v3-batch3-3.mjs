import fs from 'node:fs';
import path from 'node:path';

const tw=path.resolve(import.meta.dirname,'..');
const origin='https://www.coinvoyu.com';
const date='2026年10月08日';
const iso='2026-10-08T00:00:00+08:00';
const read=rel=>fs.readFileSync(path.join(tw,rel),'utf8');
const write=(rel,data)=>{const file=path.join(tw,rel);fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,data)};
const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');

const shell=read('videos/okx-buy/index.html');
const header=(shell.match(/<header class="header">[\s\S]*?<\/header>/)||[])[0];
const footer=(shell.match(/<footer class="footer">[\s\S]*?<\/body>/)||[])[0];
if(!header||!footer)throw new Error('Unable to resolve current Taiwan video shell');

const videos=[
  {
    slug:'okx-c2c-buy',title:'OKX C2C買幣教學：付款與訂單核對',category:'OKX買幣',duration:'PT37S',durationLabel:'00:37',
    description:'示範OKX付款方式設定、C2C選單與訂單確認；台灣使用者仍須以本人帳戶實際顯示的付款方式、商家資格與地區規則為準。',
    video:'okx-c2c-buy.mp4',poster:'okx-c2c-buy.webp',article:'/tw/exchanges/okx/buy-crypto.html',articleTitle:'OKX怎麼買幣？完整操作教學',
    source:'影片來源：OKX官方教學素材。CoinVoyu Taiwan提供繁體導讀，不宣稱為原創。',
    version:'畫面為素材發布時的OKX App介面，已於2026年10月08日核對主要操作邏輯；入口名稱、付款方式與地區可用性仍可能調整。',
    checks:['只從本人OKX帳戶可見的C2C入口操作','核對商家完成率、訂單條款與付款帳戶姓名','付款前再次確認幣種、數量、價格與法幣','不要在平台訂單之外私下轉帳或接受代操作'],
    related:[['帳戶準備','OKX註冊教學','/tw/exchanges/okx/register.html'],['現貨操作','OKX現貨怎麼下單？','/tw/exchanges/okx/spot-trading.html'],['帳戶安全','OKX安全嗎？','/tw/exchanges/okx/security.html']]
  },
  {
    slug:'okx-anti-phishing',title:'OKX防釣魚碼怎麼設定？辨識官方郵件教學',category:'OKX安全',duration:'PT32S',durationLabel:'00:32',
    description:'示範在OKX設定防釣魚碼，協助辨識官方郵件；防釣魚碼不是唯一判斷依據，仍須核對寄件地址、網域與登入入口。',
    video:'okx-anti-phishing-code.mp4',poster:'okx-anti-phishing-code.webp',article:'/tw/exchanges/okx/security.html',articleTitle:'OKX帳戶安全設定',
    source:'影片來源：OKX官方教學素材。CoinVoyu Taiwan提供繁體導讀，不宣稱為原創。',
    version:'畫面為素材發布時的OKX App介面，已於2026年10月08日核對主要設定邏輯；安全選單名稱與位置可能更新。',
    checks:['使用自己能辨認、但不包含密碼的防釣魚碼','收到郵件時核對防釣魚碼、寄件網域與內容','不要從郵件或私訊中的陌生連結登入帳戶','即使防釣魚碼正確，也不要提供密碼、驗證碼或遠端控制權'],
    related:[['多因素驗證','OKX綁定身分驗證器','/tw/videos/auth/'],['官方查證','核對OKX官方管道','/tw/videos/official/'],['通用安全','交易所帳號如何保護？','/tw/security/account-security.html']]
  }
];

function renderVideo(v){
  const url=`/tw/videos/${v.slug}/`,canonical=origin+url;
  const graph=[
    {'@type':'VideoObject',name:v.title,description:v.description,thumbnailUrl:[`${origin}/tw/assets/video-covers/${v.poster}`],uploadDate:iso,duration:v.duration,contentUrl:`${origin}/tw/assets/videos/${v.video}`,embedUrl:canonical,inLanguage:'zh-TW',publisher:{'@type':'Organization','name':'OKX'}},
    {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'CoinVoyu 台灣',item:origin+'/tw/'},{'@type':'ListItem',position:2,name:'影片教學',item:origin+'/tw/videos/'},{'@type':'ListItem',position:3,name:v.title,item:canonical}]}
  ];
  const checks=v.checks.map(x=>`<li>${x}</li>`).join('');
  const related=v.related.map(([s,t,u])=>`<a class="continue-card" href="${u}"><small>${s}</small><strong>${t}</strong><span>繼續學習</span></a>`).join('');
  return `<!doctype html><html lang="zh-TW"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(v.title)}｜CoinVoyu 台灣</title><meta name="description" content="${esc(v.description)}"><link rel="canonical" href="${canonical}"><meta name="robots" content="index,follow,max-image-preview:large"><meta property="og:type" content="video.other"><meta property="og:locale" content="zh_TW"><meta property="og:title" content="${esc(v.title)}"><meta property="og:description" content="${esc(v.description)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${origin}/tw/assets/video-covers/${v.poster}"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="/tw/assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/tw/assets/site.css"><script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':graph})}</script></head><body id="top">${header}<main id="main" class="wrap policy"><div class="page-head"><nav class="crumb" aria-label="麵包屑"><a href="/tw/">首頁</a><span>›</span><a href="/tw/videos/">影片教學</a><span>›</span><span aria-current="page">${v.title}</span></nav><p class="tag">${v.category}</p><h1>${v.title}</h1><p class="lead">${v.description}</p><div class="byline"><a href="/tw/about/author/">導讀：CoinVoyu編輯團隊</a><span>最後更新：${date}</span><span>${v.durationLabel}</span></div></div><section class="video-module"><video controls playsinline preload="metadata" poster="/tw/assets/video-covers/${v.poster}" aria-label="${v.title}"><source src="/tw/assets/videos/${v.video}" type="video/mp4">您的瀏覽器不支援影片播放。</video><div class="video-copy"><p class="tag">${v.category} · ${v.durationLabel}</p><h2>${v.title}</h2><p>${v.description}</p><p class="media-source">${v.source}</p><p class="micro">${v.version}</p></div></section><section><h2>觀看與操作前先核對</h2><ul>${checks}</ul><a class="btn primary" href="${v.article}">閱讀完整文字教學：${v.articleTitle}</a></section><section><h2>相關教學</h2><div class="continue-grid">${related}</div></section><aside class="notice"><strong>風險提示：</strong>影片僅供教育與介面理解，不構成投資建議、地區資格證明或固定費率承諾。涉及付款或資產時，請以本人帳戶與平台最新頁面為準。</aside></main>${footer}</html>`;
}
for(const v of videos)write(`videos/${v.slug}/index.html`,renderVideo(v));

const card=(slug,poster,tag,title,description)=>`<article class="card video-center-card"><a class="video-thumb" href="/tw/videos/${slug}/"><img src="/tw/assets/video-covers/${poster}" alt="${title}封面" width="1200" height="675" loading="lazy"><span class="play-mark" aria-hidden="true">▶</span></a><div class="card-body"><span class="tag">${tag}</span><h3><a href="/tw/videos/${slug}/">${title}</a></h3><p>${description}</p><div class="card-meta"><span>可播放影片 · 來源已標示</span><span aria-hidden="true">↗</span></div></div></article>`;
const group=(title,description,cards)=>`<section class="video-cluster"><div class="section-title"><div><h2>${title}</h2><p>${description}</p></div></div><div class="grid">${cards.join('')}</div></section>`;
const hubDescription='CoinVoyu台灣影片教學中心，只展示具有真實播放器與可存取媒體的Bitcoin、Binance、OKX與安全教學；每支影片均標示來源並連結完整文字指南。';
const hubGroups=[
  group('新手入門','先用一支基礎影片建立Bitcoin概念，再進入完整文字指南。',[
    card('bitcoin','bitcoin-what-is.webp','新手入門','Bitcoin是什麼？3分鐘新手導讀','用三分鐘建立Bitcoin、區塊鏈與稀缺性的第一層概念。')
  ]),
  group('Binance教學','用完整流程影片理解帳戶建立、身分驗證與安全設定順序，再搭配文字教學核對最新介面。',[
    card('binance-register','binance-register.webp','Binance','Binance註冊、KYC與安全順序','同一支完整流程影片涵蓋註冊、身分驗證與基礎安全設定。')
  ]),
  group('OKX操作教學','依實際操作順序查看帳戶、身分驗證、買幣、現貨、資金劃轉及鏈上充提。',[
    card('okx-register','okx-account-registration.webp','OKX帳戶','OKX帳戶建立教學','示範建立OKX帳戶，註冊規則與地區資格以本人頁面為準。'),
    card('kyc','identity-verification.webp','OKX身分驗證','OKX身分驗證操作','了解KYC入口與資料提交順序。'),
    card('okx-c2c-buy','okx-c2c-buy.webp','OKX買幣','OKX C2C買幣：付款與訂單核對','示範付款方式、C2C訂單及商家資訊核對。'),
    card('spot','spot-trading.webp','OKX現貨','OKX現貨下單操作','看懂交易對、買賣方向與現貨訂單區。'),
    card('fund','fund-transfer.webp','OKX資金','OKX資金與交易帳戶劃轉','示範不同帳戶區域之間的資金劃轉。'),
    card('onchain','onchain-deposit-withdrawal.webp','OKX充提','OKX鏈上入金與提幣','示範鏈上充值、提幣與網路核對。')
  ]),
  group('安全教學','使用驗證器、通行密鑰、防釣魚碼與官方管道核對，降低帳戶遭接管和釣魚風險。',[
    card('auth','authenticator-app.webp','OKX 2FA','OKX綁定身分驗證器','示範驗證器綁定流程及復原資料注意事項。'),
    card('passkey','passkey.webp','OKX通行密鑰','OKX通行密鑰設定','了解通行密鑰入口與裝置安全。'),
    card('official','official-channel-verification.webp','OKX官方查證','OKX官方管道查證','核對網站、社群或客服是否屬於官方管道。'),
    card('okx-anti-phishing','okx-anti-phishing-code.webp','OKX防釣魚','OKX防釣魚碼設定','用專屬防釣魚碼輔助辨識可疑郵件，並同時核對寄件網域。')
  ])
];
const hubGraph={'@context':'https://schema.org','@graph':[{'@type':'CollectionPage',name:'影片教學中心',headline:'影片教學中心',description:hubDescription,url:origin+'/tw/videos/',inLanguage:'zh-TW',dateModified:iso},{'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'CoinVoyu 台灣',item:origin+'/tw/'},{'@type':'ListItem',position:2,name:'影片教學中心',item:origin+'/tw/videos/'}]}]};
write('videos/index.html',`<!doctype html><html lang="zh-TW"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>影片教學中心｜CoinVoyu 台灣</title><meta name="description" content="${hubDescription}"><link rel="canonical" href="${origin}/tw/videos/"><meta name="robots" content="index,follow,max-image-preview:large"><meta property="og:title" content="影片教學中心"><meta property="og:description" content="${hubDescription}"><meta property="og:url" content="${origin}/tw/videos/"><meta property="og:locale" content="zh_TW"><meta name="theme-color" content="#F8FAFC"><link rel="icon" href="/tw/assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/tw/assets/site.css"><script type="application/ld+json">${JSON.stringify(hubGraph)}</script></head><body id="top">${header}<main id="main"><div class="wrap"><nav class="crumb" aria-label="麵包屑"><a href="/tw/">首頁</a><span>›</span><span aria-current="page">影片教學</span></nav><header class="page-head"><p class="eyebrow">VIDEO LEARNING CENTER</p><h1>影片教學中心</h1><p class="lead">只展示真實可播放的影片；每支影片都標示來源、適用平台和對應文字指南。</p><div class="byline"><a href="/tw/about/author/">整理：CoinVoyu編輯團隊</a><span>最後更新：${date}</span><span>12個獨立影片檔案</span></div></header>${hubGroups.join('')}<aside class="notice video-center-source"><strong>素材來源說明：</strong>外部或平台官方素材均逐頁標示，CoinVoyu Taiwan提供繁體導讀，不宣稱為原創。完整圖文教學仍可由各平台專題查閱。</aside></div></main>${footer}</html>`);

const redirects={
  '/tw/videos/binance-buy/':'/tw/exchanges/binance/spot-trading.html',
  '/tw/videos/binance-withdraw/':'/tw/exchanges/binance/withdraw.html',
  '/tw/videos/gate-buy/':'/tw/exchanges/gate/spot-trading.html',
  '/tw/videos/gate-register/':'/tw/exchanges/gate/register.html',
  '/tw/videos/seed-phrase-security/':'/tw/security/seed-phrase-security.html',
  '/tw/videos/buy-bitcoin/':'/tw/videos/spot/',
  '/tw/videos/buy-usdt/':'/tw/buy/how-to-buy-usdt-taiwan.html',
  '/tw/videos/usdt/':'/tw/learn/usdt/what-is-usdt.html'
};
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>{const p=path.join(dir,entry.name);return entry.isDirectory()?walk(p):[p]});
for(const file of walk(tw).filter(f=>f.endsWith('.html'))){
  let html=fs.readFileSync(file,'utf8');
  for(const [from,to] of Object.entries(redirects))html=html.replaceAll(`href="${from}"`,`href="${to}"`);
  fs.writeFileSync(file,html);
}
// Retire misleading “video” promos when the old wrapper did not contain a
// real player. Keep the complete text articles and genuine embedded videos.
for(const rel of [
  'buy/how-to-buy-bitcoin-taiwan.html',
  'exchanges/binance/withdraw.html',
  'exchanges/gate/deposit.html',
  'exchanges/gate/register.html',
  'learn/usdt/what-is-usdt.html'
]){
  write(rel,read(rel).replace(/<aside class="intent-path article-video-link">[\s\S]*?<\/aside>/,''));
}
write('buy/index.html',read('buy/index.html')
  .replace('<a href="/tw/videos/spot/">第一次買Bitcoin流程是什麼？<span>閱讀</span></a>','<a href="/tw/buy/how-to-buy-bitcoin-taiwan.html">台灣怎麼買Bitcoin？<span>閱讀</span></a>')
  .replace('<a href="/tw/buy/how-to-buy-usdt-taiwan.html">第一次買USDT要注意什麼？<span>閱讀</span></a>','<a href="/tw/buy/how-to-buy-usdt-taiwan.html">台灣怎麼買USDT？<span>閱讀</span></a>'));
write('exchanges/binance/spot-trading.html',read('exchanges/binance/spot-trading.html')
  .replace('<a class="continue-card" href="/tw/exchanges/binance/spot-trading.html"><small>影片教學</small><strong>Binance買幣教學入口</strong>','<a class="continue-card" href="/tw/videos/binance-register/"><small>影片教學</small><strong>Binance註冊、KYC與安全影片</strong>'));
for(const [from,to] of Object.entries(redirects)){
  const rel=from.replace(/^\/tw\//,'')+'index.html';
  write(rel,`<!doctype html><html lang="zh-TW"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>教學入口已整合｜CoinVoyu 台灣</title><meta name="robots" content="noindex,follow"><link rel="canonical" href="${origin}${to}"><meta http-equiv="refresh" content="0;url=${to}"></head><body><main><p>此入口已整合至 <a href="${to}">目前完整教學</a>。</p></main></body></html>`);
}

write('security/index.html',read('security/index.html').replace('<small>Batch 4 新增</small>','<small>平台安全</small>'));

function insertBefore(rel,marker,block,id){
  let html=read(rel);if(html.includes(id))return;
  if(!html.includes(marker))throw new Error(`Missing marker in ${rel}`);
  write(rel,html.replace(marker,block+marker));
}
insertBefore('exchanges/okx/buy-crypto.html','<aside class="platform-cta',`<section class="official-video-entry" data-v3-batch3-3="okx-c2c"><img src="/tw/assets/video-covers/okx-c2c-buy.webp" alt="OKX C2C買幣教學封面" width="1200" height="675" loading="lazy"><div><p class="tag">影片輔助說明</p><h2>OKX C2C付款與訂單怎麼核對？</h2><p>先看官方操作素材理解付款方式、商家與訂單頁，再回到本文核對台灣帳戶實際可用方式及風險。</p><a class="btn" href="/tw/videos/okx-c2c-buy/">觀看OKX C2C買幣影片</a></div></section>`,'data-v3-batch3-3="okx-c2c"');
insertBefore('exchanges/okx/security.html','<aside class="platform-cta',`<section class="official-video-entry" data-v3-batch3-3="okx-anti-phishing"><img src="/tw/assets/video-covers/okx-anti-phishing-code.webp" alt="OKX防釣魚碼設定影片封面" width="1200" height="675" loading="lazy"><div><p class="tag">影片輔助說明</p><h2>用防釣魚碼輔助辨識官方郵件</h2><p>防釣魚碼只能作為其中一項核對訊號，仍要檢查寄件網域、登入入口與訊息內容。</p><a class="btn" href="/tw/videos/okx-anti-phishing/">觀看OKX防釣魚碼影片</a></div></section>`,'data-v3-batch3-3="okx-anti-phishing"');
for(const rel of ['exchanges/okx/buy-crypto.html','exchanges/okx/spot-trading.html'])write(rel,read(rel).replaceAll('href="/tw/videos/okx-buy/"','href="/tw/videos/spot/"'));

const sourceRegistry={verified:'2026-10-08',scope:'CoinVoyu Taiwan only',independentVideoFiles:12,items:[
  ['bitcoin-what-is.mp4','CoinVoyu既有教育素材',['/tw/videos/bitcoin/']],
  ['binance-register.mp4','CoinVoyu既有Binance教學素材',['/tw/videos/binance-register/','/tw/videos/binance-kyc/']],
  ['如何拥有自己的OKX账户.mp4','OKX官方教學素材',['/tw/videos/account/','/tw/videos/okx-register/']],
  ['如何绑定⾝份验证应⽤.mp4','OKX官方教學素材',['/tw/videos/auth/','/tw/videos/account-security/']],
  ['如何设置通⾏密钥.mp4','OKX官方教學素材',['/tw/videos/passkey/']],
  ['如何进⾏OKX官⽅渠道验证.mp4','OKX官方教學素材',['/tw/videos/official/']],
  ['如何进行现货交易.mp4','OKX官方教學素材',['/tw/videos/spot/','/tw/videos/okx-buy/']],
  ['如何进行账户资金划转.mp4','OKX官方教學素材',['/tw/videos/fund/']],
  ['如何进行身份认证.mp4','OKX官方教學素材',['/tw/videos/kyc/']],
  ['如何进行链上充值提币.mp4','OKX官方教學素材',['/tw/videos/onchain/']],
  ['okx-c2c-buy.mp4','OKX官方教學素材；由主站媒體庫只讀複製',['/tw/videos/okx-c2c-buy/']],
  ['okx-anti-phishing-code.mp4','OKX官方教學素材；由主站媒體庫只讀複製',['/tw/videos/okx-anti-phishing/']]
].map(([file,source,pages])=>({file,source,pages}))};
write('assets/video-sources-v3.json',JSON.stringify(sourceRegistry,null,2)+'\n');

const sitemapUrls=[];
for(const file of walk(tw).filter(f=>f.endsWith('.html'))){
  const html=fs.readFileSync(file,'utf8');
  if(/name="robots"[^>]+noindex/i.test(html)||/http-equiv="refresh"/i.test(html))continue;
  const canonical=(html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)||[])[1];
  if(canonical?.startsWith(origin+'/tw/'))sitemapUrls.push(canonical);
}
const unique=[...new Set(sitemapUrls)].sort();
if(unique.length!==sitemapUrls.length)throw new Error('Duplicate canonical detected');
write('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${unique.map(url=>`  <url><loc>${url}</loc><lastmod>2026-10-08</lastmod></url>`).join('\n')}\n</urlset>\n`);

write('v3-batch3-3.json',JSON.stringify({version:'CoinVoyu Taiwan V3 Batch 3.3',date:'2026-10-08',baseline:'20464ec7d63acfe36205dee324608a36edcc8948',independentVideoFiles:12,playableVideoPages:16,reusedVideoPages:4,pureTextVideoPages:0,legacyCompatibilityPages:Object.keys(redirects),newVideos:videos.map(v=>({title:v.title,url:`/tw/videos/${v.slug}/`,file:`/tw/assets/videos/${v.video}`,source:'OKX官方教學素材；主站只讀複製'})),notes:['Gate沒有真實影片，不顯示Gate影片分類或占位卡','Binance啟航站買幣或提幣檔案在目前工作區不可存取，未虛構接入','Preview靜態託管是否回傳HTTP 301需以部署後真實狀態碼為準']},null,2)+'\n');
console.log(`Built Taiwan V3 Batch 3.3: ${unique.length} sitemap URLs, 12 independent videos.`);
