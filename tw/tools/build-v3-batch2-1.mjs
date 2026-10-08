import fs from 'node:fs';
import path from 'node:path';

const tw=path.resolve(import.meta.dirname,'..');
const origin='https://www.coinvoyu.com';
const date='2026年10月08日';
const iso='2026-10-08T00:00:00+08:00';
const logos={
  binance:{name:'Binance',src:'/tw/assets/platform-binance.png'},
  okx:{name:'OKX',src:'/tw/assets/platform-okx.png'},
  gate:{name:'Gate',src:'/tw/assets/platform-gate.webp'}
};

const logoImg=(key,cls='platform-logo')=>`<img class="${cls}" src="${logos[key].src}" alt="${logos[key].name} Logo" width="64" height="64" loading="lazy">`;
const platformName=key=>`<div class="platform-name">${logoImg(key)}<span>${logos[key].name}</span></div>`;

function header(active=''){
  return `<a class="skip" href="#main">跳至主要內容</a><header class="header"><div class="wrap navline"><a class="brand" href="/tw/" aria-label="CoinVoyu 台灣首頁"><span class="brandmark" aria-hidden="true">C</span><span class="brand-name">CoinVoyu</span><small>台灣 / Taiwan</small></a><button class="menu" type="button" aria-expanded="false" aria-controls="main-nav" aria-label="展開導覽選單">☰</button><nav class="navlinks" id="main-nav" aria-label="主要導覽"><a href="/tw/">首頁</a><a href="/tw/learn/"${active==='learn'?' aria-current="page"':''}>開始學習</a><a href="/tw/buy-crypto/"${active==='buy'?' aria-current="page"':''}>買幣教學</a><a href="/tw/exchanges/"${active==='exchanges'?' aria-current="page"':''}>交易所</a><a href="/tw/compare/">平台比較</a><a href="/tw/videos/"${active==='videos'?' aria-current="page"':''}>影片教學</a><a class="mobile-only" href="/tw/security/">安全指南</a><a class="mobile-only" href="/">簡體中文</a></nav><a class="locale" href="/">繁中 / 簡中</a></div></header>`;
}

function footer(){
  return `<footer class="footer"><div class="wrap"><div class="footer-grid"><div><a class="brand" href="/tw/" aria-label="CoinVoyu 台灣首頁"><span class="brandmark" aria-hidden="true">C</span><span class="brand-name">CoinVoyu</span><small>台灣 / Taiwan</small></a><p>從第一次了解，到真正看懂。<br>繁體中文教學，聚焦台灣使用情境。</p><a href="/tw/articles/">全部教學</a><a href="/tw/about/author/">作者與編輯團隊</a></div><div><h3>學習</h3><a href="/tw/learn/bitcoin/">Bitcoin學習中心</a><a href="/tw/learn/usdt/">USDT學習中心</a><a href="/tw/wallets/">錢包與保管</a><a href="/tw/security/">安全指南</a></div><div><h3>實用教學</h3><a href="/tw/buy/how-to-buy-bitcoin-taiwan.html">買 Bitcoin</a><a href="/tw/buy/how-to-buy-usdt-taiwan.html">買 USDT</a><a href="/tw/buy/usdt-to-twd.html">USDT換回台幣</a></div><div><h3>交易所</h3><a class="footer-platform-link" href="/tw/exchanges/binance/">${logoImg('binance','footer-platform-logo')}Binance</a><a class="footer-platform-link" href="/tw/exchanges/okx/">${logoImg('okx','footer-platform-logo')}OKX</a><a class="footer-platform-link" href="/tw/exchanges/gate/">${logoImg('gate','footer-platform-logo')}Gate</a><a href="/tw/exchanges/taiwan-exchange-guide.html">台灣平台比較</a></div><div><h3>關於</h3><a href="/tw/about/">關於我們</a><a href="/tw/about/editorial-policy/">編輯政策</a><a href="/tw/about/risk-disclosure/">風險揭露</a><a href="/tw/about/affiliate-disclosure/">利益揭露</a><a href="/tw/about/contact/">聯絡與更正</a></div></div><div class="footer-bottom">© 2026 CoinVoyu · 本站提供教育資訊，虛擬資產涉及價格、平台、技術與監管風險。</div></div></footer><script src="/tw/assets/site.js" defer></script>`;
}

const head=(title,description,canonical,type='CollectionPage')=>`<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}｜CoinVoyu 台灣</title><meta name="description" content="${description}"><link rel="canonical" href="${origin+canonical}"><meta name="robots" content="index,follow,max-image-preview:large"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:url" content="${origin+canonical}"><meta property="og:locale" content="zh_TW"><meta name="theme-color" content="#F8FAFC"><link rel="icon" href="/tw/assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/tw/assets/site.css"><script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':[{'@type':type,name:title,headline:title,description,url:origin+canonical,inLanguage:'zh-TW',dateModified:iso},{'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'CoinVoyu 台灣',item:origin+'/tw/'},{'@type':'ListItem',position:2,name:title,item:origin+canonical}]}]})}</script></head>`;

const videoItems=[
  ['新手教學','Bitcoin是什麼？3分鐘新手導讀','/tw/videos/bitcoin/','/tw/assets/video-covers/bitcoin-what-is.webp','影片'],
  ['新手教學','USDT是什麼？用途、網路與轉帳檢查','/tw/videos/usdt/','/tw/assets/covers/05.webp','影片'],
  ['買幣教學','台灣第一次買Bitcoin','/tw/videos/buy-bitcoin/','/tw/assets/covers/02.webp','影片'],
  ['買幣教學','台灣怎麼買USDT？','/tw/videos/buy-usdt/','/tw/assets/covers/03.webp','影片'],
  ['Binance','Binance註冊教學','/tw/videos/binance-register/','/tw/assets/video-covers/binance-register.webp','影片'],
  ['Binance','Binance KYC教學','/tw/videos/binance-kyc/','/tw/assets/video-covers/binance-register.webp','影片'],
  ['Binance','Binance買幣教學','/tw/videos/binance-buy/','/tw/assets/covers/16.webp','官方資源'],
  ['OKX','OKX註冊教學','/tw/videos/okx-register/','/tw/assets/video-covers/okx-account-registration.webp','影片'],
  ['OKX','OKX買幣教學','/tw/videos/okx-buy/','/tw/assets/video-covers/spot-trading.webp','影片'],
  ['Gate','Gate註冊教學','/tw/videos/gate-register/','/tw/assets/covers/08.webp','官方資源'],
  ['Gate','Gate買幣教學','/tw/videos/gate-buy/','/tw/assets/covers/16.webp','官方資源'],
  ['安全教學','2FA安全設定','/tw/videos/account-security/','/tw/assets/video-covers/authenticator-app.webp','影片'],
  ['安全教學','助記詞與私鑰安全','/tw/videos/seed-phrase-security/','/tw/assets/covers/20.webp','教學導讀']
];

const videoCard=([category,title,url,poster,kind])=>`<article class="card video-center-card"><a class="video-thumb" href="${url}"><img src="${poster}" alt="${title}封面" width="1200" height="675" loading="lazy"><span class="play-mark" aria-hidden="true">${kind==='影片'?'▶':'↗'}</span></a><div class="card-body"><span class="tag">${category}</span><h3><a href="${url}">${title}</a></h3><p>${kind==='影片'?'觀看操作或概念影片，並搭配完整繁體文字指南。':'先閱讀台灣情境重點，再前往已標示來源的官方或安全教學資源。'}</p><div class="card-meta"><span>${kind} · 來源已標示</span><span aria-hidden="true">↗</span></div></div></article>`;

const groups=[
  ['新手教學','先建立Bitcoin與USDT的基本概念。',['新手教學']],
  ['買幣教學','把台灣使用者的買幣流程連到完整文字指南。',['買幣教學']],
  ['平台教學','依平台查看註冊、KYC與現貨操作。',['Binance','OKX','Gate']],
  ['安全教學','先保護帳戶、助記詞與私鑰，再進行資產操作。',['安全教學']]
];
const videoSections=groups.map(([title,desc,cats])=>`<section class="video-cluster"><div class="section-title"><div><h2>${title}</h2><p>${desc}</p></div></div><div class="grid">${videoItems.filter(x=>cats.includes(x[0])).map(videoCard).join('')}</div></section>`).join('');
const videosDescription='CoinVoyu台灣影片教學中心，依新手、買幣、Binance、OKX、Gate與安全主題整理影片、官方教學資源和繁體文字指南。';
const videosHtml=`<!doctype html><html lang="zh-TW">${head('影片教學中心',videosDescription,'/tw/videos/')}<body id="top">${header('videos')}<main id="main"><div class="wrap"><nav class="crumb" aria-label="麵包屑"><a href="/tw/">首頁</a><span>›</span><span aria-current="page">影片教學</span></nav><header class="page-head"><p class="eyebrow">VIDEO LEARNING CENTER</p><h1>影片教學中心</h1><p class="lead">從基礎概念、台灣買幣流程、平台操作到帳戶安全；每個入口都標示真實來源並連結完整文字指南。</p><div class="byline"><a href="/tw/about/author/">整理：CoinVoyu編輯團隊</a><span>最後更新：${date}</span></div></header>${videoSections}<aside class="notice video-center-source"><strong>素材來源說明：</strong>外部、平台官方或Binance Launch Station素材均會逐頁標示，不宣稱為CoinVoyu原創；沒有可核驗影片的主題以官方教學或文字導讀呈現，不使用假播放按鈕。</aside></div></main>${footer()}</body></html>`;
fs.writeFileSync(path.join(tw,'videos','index.html'),videosHtml);

function videoPage({slug,title,description,poster,article,video,source,related,resource}){
  const url=`/tw/videos/${slug}/`; const type=video?'VideoObject':'LearningResource';
  const media=video?`<video controls preload="metadata" playsinline poster="${poster}" aria-label="${title}"><source src="${video}" type="video/mp4">您的瀏覽器不支援影片播放。</video>`:`<div class="official-video-entry"><img src="${poster}" alt="${title}封面" width="1200" height="675"><div><h2>先看安全重點</h2><p>本頁是教學導讀，不放置無法核驗來源的假影片。請先閱讀完整文章，再依頁面列出的可信來源繼續學習。</p><a class="btn primary" href="${resource}" rel="noopener noreferrer">閱讀完整安全指南</a></div></div>`;
  const schema={'@context':'https://schema.org','@graph':[{'@type':type,name:title,headline:title,description,url:origin+url,thumbnailUrl:origin+poster,inLanguage:'zh-TW',dateModified:iso},{'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'CoinVoyu台灣',item:origin+'/tw/'},{'@type':'ListItem',position:2,name:'影片教學',item:origin+'/tw/videos/'},{'@type':'ListItem',position:3,name:title,item:origin+url}]}]};
  const html=`<!doctype html><html lang="zh-TW"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}｜CoinVoyu台灣</title><meta name="description" content="${description}"><link rel="canonical" href="${origin+url}"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="icon" href="/tw/assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/tw/assets/site.css"><script type="application/ld+json">${JSON.stringify(schema)}</script></head><body id="top">${header('videos')}<main id="main"><div class="wrap"><nav class="crumb" aria-label="麵包屑"><a href="/tw/">首頁</a><span>›</span><a href="/tw/videos/">影片教學</a><span>›</span><span>${title}</span></nav><header class="page-head"><p class="tag">影片教學</p><h1>${title}</h1><p class="lead">${description}</p><div class="byline"><a href="/tw/about/author/">導讀：CoinVoyu編輯團隊</a><span>最後更新：${date}</span></div></header><article class="article-body video-page"><section class="video-module">${media}<div class="video-copy"><h2>觀看與操作前先核對</h2><p>平台介面、費用、網路與地區資格可能調整；教學只用來理解流程，不代表本人帳戶一定具有相同功能。</p><p class="media-source">${source}</p></div></section><section class="intent-path"><p class="tag">搭配閱讀</p><h2>完整文字教學</h2><div class="intent-links"><a href="${article}">閱讀完整文字指南 →</a></div></section><section><h2>相關教學</h2><div class="continue-grid">${related.map(([t,u])=>`<a class="continue-card" href="${u}"><strong>${t}</strong><span>繼續學習</span></a>`).join('')}</div></section><aside class="notice"><strong>風險提示：</strong>內容僅供教育，不構成投資建議；轉帳前請核對資產、網路、地址、Memo與最終到帳數量。</aside></article></div></main>${footer()}</body></html>`;
  const file=path.join(tw,'videos',slug,'index.html'); fs.mkdirSync(path.dirname(file),{recursive:true}); fs.writeFileSync(file,html);
}

videoPage({slug:'buy-usdt',title:'台灣怎麼買USDT？影片與操作導讀',description:'用鏈上充值與提幣示範理解USDT的網路、地址與Memo，再搭配台灣買USDT完整文字指南。',poster:'/tw/assets/video-covers/onchain-deposit-withdrawal.webp',article:'/tw/buy/how-to-buy-usdt-taiwan.html',video:'/tw/assets/videos/如何进行链上充值提币.mp4',source:'影片來源：OKX官方教學素材；CoinVoyu提供台灣繁體導讀，不宣稱為原創。',related:[['USDT是什麼？','/tw/learn/usdt/what-is-usdt.html'],['TRC20與ERC20','/tw/learn/usdt/trc20-vs-erc20.html'],['USDT換回台幣','/tw/buy/usdt-to-twd.html']]});
videoPage({slug:'seed-phrase-security',title:'助記詞與私鑰安全教學導讀',description:'分清助記詞、私鑰與App密碼，理解為什麼任何客服都不應索取助記詞，以及洩漏後的處理順序。',poster:'/tw/assets/covers/20.webp',article:'/tw/security/seed-phrase-security.html',resource:'/tw/security/seed-phrase-security.html',source:'本頁使用CoinVoyu Taiwan既有安全主題插圖與文字導讀；未使用或冒充外部原創影片。',related:[['錢包是什麼？','/tw/security/crypto-wallet-guide.html'],['冷錢包與熱錢包','/tw/security/hot-wallet-vs-cold-wallet.html'],['詐騙防範','/tw/security/crypto-scam-guide.html']]});

const hubCard=(tag,title,url,desc,cover)=>`<article class="card"><a href="${url}"><img src="${cover}" alt="${title}主題插圖" loading="lazy" width="1200" height="675"></a><div class="card-body"><span class="tag">${tag}</span><h3><a href="${url}">${title}</a></h3><p>${desc}</p></div></article>`;
function topicHub({slug,title,description,active='learn',cards,summary,faq,links}){
  const url=`/tw/${slug}/`; const faqSchema={'@type':'FAQPage',mainEntity:faq.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))};
  const baseHead=head(title,description,url).replace('</script></head>',`</script><script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org',...faqSchema})}</script></head>`);
  const html=`<!doctype html><html lang="zh-TW">${baseHead}<body id="top">${header(active)}<main id="main"><div class="wrap"><nav class="crumb" aria-label="麵包屑"><a href="/tw/">首頁</a><span>›</span><span>${title}</span></nav><header class="page-head"><p class="eyebrow">TOPIC CLUSTER</p><h1>${title}</h1><p class="lead">${description}</p><div class="byline"><a href="/tw/about/author/">整理：CoinVoyu編輯團隊</a><span>最後更新：${date}</span></div></header><aside class="points"><h2>這個主題包含</h2><ul>${summary.map(x=>`<li>${x}</li>`).join('')}</ul></aside><section class="section hub-cluster-section"><div class="section-title"><div><h2>依學習順序閱讀</h2><p>從概念、操作到安全逐步建立完整路徑。</p></div></div><div class="grid">${cards.map(x=>hubCard(...x)).join('')}</div></section><section class="hub-foundation"><h2>核心基礎整理</h2>${links.map(([h,p,u])=>`<article><h3>${h}</h3><p>${p} <a href="${u}">繼續閱讀 →</a></p></article>`).join('')}</section><section id="faq"><h2>常見問題</h2><div class="faq-grid">${faq.map(([q,a])=>`<details class="faq-item"><summary>${q}</summary><p>${a}</p></details>`).join('')}</div></section><section class="sources" id="sources"><h2>資料來源與核對範圍</h2><p>本Hub整理站內已完成文章與官方來源導讀；價格、平台介面、網路費用與規則會變動，請以各文章列出的最新官方資料為準。</p></section></div></main>${footer()}</body></html>`;
  const file=path.join(tw,slug,'index.html'); fs.mkdirSync(path.dirname(file),{recursive:true}); fs.writeFileSync(file,html);
}

topicHub({slug:'learn/bitcoin',title:'Bitcoin學習中心',description:'從Bitcoin是什麼、台灣購買路徑、價格與市場基礎，到保管與常見問題的完整學習Hub。',cards:[['基礎概念','Bitcoin是什麼？','/tw/learn/bitcoin/what-is-bitcoin.html','理解稀缺性、區塊鏈、轉帳與持有風險。','/tw/assets/covers/15.webp'],['台灣買幣','台灣怎麼買Bitcoin？','/tw/buy/how-to-buy-bitcoin-taiwan.html','整理NT$準備、平台選擇、下單與保管。','/tw/assets/covers/02.webp'],['銀行路徑','台灣銀行可以直接買Bitcoin嗎？','/tw/buy/bank-buy-bitcoin-taiwan.html','分清銀行資金、交易平台與BTC買入流程。','/tw/assets/covers/11.webp'],['合法與風險','台灣可以買虛擬貨幣嗎？','/tw/buy/can-taiwan-buy-crypto.html','了解法規環境、平台選擇與使用者責任。','/tw/assets/covers/03.webp']],summary:['Bitcoin基本原理與用途','台灣使用者的NT$購買路徑','價格、供需、波動與市場週期的基礎解釋','保管風險與常見FAQ'],links:[['Bitcoin市場基礎','Bitcoin價格由全球市場供需形成，不存在單一官方價格；交易所流動性、宏觀環境、ETF資金、槓桿清算與市場情緒都可能影響短期波動。','/tw/learn/bitcoin/what-is-bitcoin.html'],['購買後怎麼保管','小額與交易用途可依需求使用平台錢包；長期保管前應先理解私鑰、助記詞與自託管責任。','/tw/wallets/'],['下一步','先理解資產，再比較平台與台灣資金路徑，不必一次開設所有帳戶。','/tw/exchanges/']],faq:[['Bitcoin一定要買一整顆嗎？','不需要。Bitcoin可以分割持有，最低下單金額由平台決定。'],['Bitcoin價格為什麼不同？','不同平台的流動性、交易對與供需略有差異，因此報價可能不同。'],['台灣買Bitcoin違法嗎？','台灣並非全面禁止個人持有或交易，但平台、商品、稅務與資金行為仍受規範。']]});

topicHub({slug:'learn/usdt',title:'USDT學習中心',description:'從USDT是什麼、台灣購買方式、TRC20與ERC20，到換回台幣與安全核對的完整學習Hub。',cards:[['基礎概念','USDT是什麼？','/tw/learn/usdt/what-is-usdt.html','理解穩定幣用途、發行與脫鉤風險。','/tw/assets/covers/05.webp'],['台灣買幣','台灣怎麼買USDT？','/tw/buy/how-to-buy-usdt-taiwan.html','整理台幣路徑、交易對、費用與安全。','/tw/assets/covers/03.webp'],['轉帳網路','TRC20和ERC20有什麼差別？','/tw/learn/usdt/trc20-vs-erc20.html','核對鏈、地址、Gas、Memo與入帳門檻。','/tw/assets/covers/18.webp'],['台幣出金','USDT怎麼換回台幣？','/tw/buy/usdt-to-twd.html','理解轉入本地平台、賣出與銀行提領。','/tw/assets/covers/12.webp'],['延伸概念','穩定幣是什麼？','/tw/learn/what-is-stablecoin/','比較USDT、USDC與穩定機制。','/tw/assets/covers/05.webp']],summary:['USDT與美元、銀行存款的差異','台灣使用者買入與換回台幣的路徑','TRC20、ERC20與網路選擇','脫鉤、平台、詐騙與轉錯鏈風險'],links:[['USDT安全重點','USDT不是銀行美元存款。除了價格脫鉤與發行方風險，使用者還要注意平台保管、釣魚地址、假客服與轉錯網路。','/tw/security/crypto-scam-guide.html'],['轉帳前核對','發送端與接收端必須使用相同網路；需要Memo或Tag的資產也要完整填寫。','/tw/learn/usdt/trc20-vs-erc20.html'],['換回台幣','鏈上USDT不能直接匯入一般銀行帳戶，通常要先在支援TWD的平台賣出。','/tw/buy/usdt-to-twd.html']],faq:[['USDT等於美元嗎？','不等於。USDT是以美元為目標價值的穩定幣，不是銀行美元存款。'],['TRC20和ERC20地址可以互轉嗎？','不能只看地址外觀；發送端與接收端必須明確支援同一網路。'],['USDT會不會不安全？','存在脫鉤、發行方、平台、轉帳與詐騙風險，不能視為無風險現金。']]});

topicHub({slug:'wallets',title:'錢包與保管安全中心',description:'從錢包原理、冷熱錢包、助記詞與私鑰，到交易所帳戶安全的完整保管Hub。',active:'security',cards:[['錢包基礎','加密貨幣錢包是什麼？','/tw/security/crypto-wallet-guide.html','理解地址、私鑰、簽署與自託管責任。','/tw/assets/covers/17.webp'],['保管方式','熱錢包和冷錢包差在哪？','/tw/security/hot-wallet-vs-cold-wallet.html','比較聯網便利性、離線保管與操作風險。','/tw/assets/covers/17.webp'],['備份基礎','助記詞是什麼？','/tw/security/seed-phrase-guide.html','理解錢包恢復、備份與不可逆風險。','/tw/assets/covers/20.webp'],['私鑰安全','為什麼不能洩漏助記詞？','/tw/security/seed-phrase-security.html','分清助記詞、私鑰與App密碼。','/tw/assets/covers/20.webp'],['帳戶安全','交易所帳號如何保護？','/tw/security/account-security.html','設定獨立密碼、2FA、白名單與登入保護。','/tw/assets/covers/19.webp']],summary:['錢包不是存放代幣檔案，而是管理金鑰與簽署','熱錢包與冷錢包有不同便利性與風險','助記詞與私鑰都不能提供給客服','交易所帳戶也要保護信箱、2FA與提幣地址'],links:[['私鑰代表什麼','私鑰控制對應地址的簽署權；取得私鑰的人可能轉走資產，正常客服不需要私鑰。','/tw/security/seed-phrase-security.html'],['自託管責任','自行控制金鑰也代表自行承擔備份、簽署、網路與轉帳錯誤。','/tw/security/crypto-wallet-guide.html'],['遭遇可疑要求','任何要求共享助記詞、驗證碼或遠端控制裝置的客服都應立即停止接觸。','/tw/security/crypto-scam-guide.html']],faq:[['錢包裡真的存著加密貨幣嗎？','錢包主要管理金鑰與簽署，資產狀態記錄在對應區塊鏈上。'],['冷錢包一定安全嗎？','不一定。仍要防止助記詞洩漏、供應鏈風險、錯誤簽署與備份失效。'],['客服可以幫我保管助記詞嗎？','不可以。任何客服、平台或陌生人都不應索取完整助記詞或私鑰。']]});

// Complete platform conversion paths without adding new registration CTAs.
const platformClusters={
  binance:[['註冊','/tw/exchanges/binance/register.html'],['邀請碼','/tw/exchanges/binance/referral-code.html'],['KYC','/tw/exchanges/binance/kyc.html'],['安全','/tw/exchanges/binance/security.html'],['充值','/tw/exchanges/binance/deposit.html'],['提幣','/tw/exchanges/binance/withdraw.html'],['現貨交易','/tw/exchanges/binance/spot-trading.html']],
  okx:[['註冊','/tw/exchanges/okx/register.html'],['邀請碼','/tw/exchanges/okx/referral-code.html'],['安全','/tw/exchanges/okx/security.html'],['充值','/tw/exchanges/okx/deposit.html'],['提幣','/tw/exchanges/okx/withdraw.html']],
  gate:[['註冊','/tw/exchanges/gate/register.html'],['邀請碼','/tw/exchanges/gate/referral-code.html'],['安全','/tw/exchanges/gate/security.html'],['充值','/tw/exchanges/gate/deposit.html'],['提幣','/tw/exchanges/gate/withdraw.html']]
};
for(const [key,items] of Object.entries(platformClusters)){
  const file=path.join(tw,'exchanges',key,'index.html'); let html=fs.readFileSync(file,'utf8');
  html=html.replace(/<section class="intent-path" data-v3-batch2="[^"]+">[\s\S]*?<\/section>/,'');
  html=html.replace(/<section class="conversion-cluster-map" data-v3-batch2-1="[^"]+">[\s\S]*?<\/section>/,'');
  const block=`<section class="conversion-cluster-map" data-v3-batch2-1="${key}"><div class="page-platform-mark"><span>${logoImg(key)}<strong>${logos[key].name}</strong></span></div><p class="tag">完整教學路徑</p><h2>${logos[key].name}台灣使用教學</h2><div class="conversion-cluster-links">${items.map(([n,u])=>`<a href="${u}"><strong>${n}</strong><span>查看教學 →</span></a>`).join('')}</div></section>`;
  html=html.replace('<section id="faq">',block+'<section id="faq">'); fs.writeFileSync(file,html);
}

// Replace every legacy text/hand-drawn platform identity component with official image assets.
for(const file of walk(tw).filter(x=>x.endsWith('.html'))){
  let html=fs.readFileSync(file,'utf8');
  html=html.replace(/<div class="platform-name"><svg[\s\S]*?<\/svg>\s*Binance<\/div>/g,platformName('binance'));
  html=html.replace(/<div class="platform-name">\s*(?:<span[^>]*>)?Binance(?:<\/span>)?\s*<\/div>/g,platformName('binance'));
  html=html.replace(/<div class="platform-name">\s*(?:<span[^>]*>)?OKX(?:<\/span>)?\s*<\/div>/g,platformName('okx'));
  html=html.replace(/<div class="platform-name">\s*(?:<span[^>]*>)?Gate(?:<\/span>)?\s*<\/div>/g,platformName('gate'));
  const footerStart=html.indexOf('<footer class="footer">');
  if(footerStart>=0){
    const before=html.slice(0,footerStart); let foot=html.slice(footerStart);
    foot=foot.replace(/<a(?: class="footer-platform-link")? href="\/tw\/exchanges\/binance\/">(?:<img[^>]+>)?Binance<\/a>/g,`<a class="footer-platform-link" href="/tw/exchanges/binance/">${logoImg('binance','footer-platform-logo')}Binance</a>`)
      .replace(/<a(?: class="footer-platform-link")? href="\/tw\/exchanges\/okx\/">(?:<img[^>]+>)?OKX<\/a>/g,`<a class="footer-platform-link" href="/tw/exchanges/okx/">${logoImg('okx','footer-platform-logo')}OKX</a>`)
      .replace(/<a(?: class="footer-platform-link")? href="\/tw\/exchanges\/gate\/">(?:<img[^>]+>)?Gate<\/a>/g,`<a class="footer-platform-link" href="/tw/exchanges/gate/">${logoImg('gate','footer-platform-logo')}Gate</a>`);
    html=before+foot;
  }
  fs.writeFileSync(file,html);
}

// Normalize visible Taiwan copy while preserving URLs and asset paths.
const twChars={'这':'這','边':'邊','还':'還','仅':'僅','从':'從','为':'為','个':'個','两':'兩','与':'與','发':'發','网':'網','络':'絡','账':'帳','户':'戶','册':'冊','虚':'虛','资':'資','产':'產','状':'狀','态':'態','询':'詢','标':'標','础':'礎','综':'綜','级':'級','决':'決','预':'預','长':'長','绝':'絕','页':'頁','来':'來','创':'創','风':'風','险':'險','设':'設','说':'說','进':'進','择':'擇','链':'鏈','帮':'幫','续':'續','议':'議','确':'確','认':'認','骤':'驟','费':'費','调':'調','实':'實','际':'際','请':'請','码':'碼','结':'結','论':'論','适':'適','叠':'疊','钮':'鈕','视':'視','频':'頻','学':'學','习':'習','则':'則','够':'夠','该':'該','拥':'擁','挤':'擠','满':'滿','过':'過','错':'錯','简':'簡','体':'體','开':'開','关':'關','门':'門','读':'讀','写':'寫','报':'報','损':'損','额':'額','达':'達','记':'記','录':'錄','图':'圖','么':'麼','担':'擔','见':'見','钓':'釣','顺':'順','经':'經','国':'國','买':'買','卖':'賣','币':'幣','护':'護','类':'類','场':'場','线':'線','终':'終','让':'讓','术':'術','觉':'覺','启':'啟','储':'儲','签':'簽','书':'書','据':'據','强':'強','机':'機','余':'餘','并':'並','后':'後','于':'於','尽':'盡','冻':'凍','补':'補','缴':'繳','会':'會','应':'應','区':'區','块':'塊','软':'軟','证':'證','号':'號','条':'條','务':'務','获':'獲','严':'嚴','题':'題','显':'顯','误':'誤','项':'項','汇':'匯','贷':'貸','档':'檔','称':'稱','种':'種','断':'斷','协':'協','诺':'諾','对':'對','单':'單','画':'畫','时':'時','间':'間'};
function taiwanize(input){
  const keep=[]; let s=input.replace(/https?:\/\/[^"'\s<>]+|\/tw\/[^"'\s<>]+/g,m=>`__KEEP_${keep.push(m)-1}__`);
  for(const [a,b] of [['注册','註冊'],['注意','注意'],['重复','重複'],['复制','複製'],['恢复','恢復'],['复杂','複雜'],['为什么','為什麼'],['怎么样','怎麼樣'],['怎么','怎麼'],['什么','什麼'],['没有','沒有'],['必须','必須'],['信息','資訊'],['联系','聯繫'],['软件','軟體'],['硬件','硬體'],['后台','後台'],['里面','裡面'],['网络','網路'],['链接','連結'],['泄露','洩漏'],['助记词','助記詞'],['私钥','私鑰'],['钓鱼','釣魚'],['手续费','手續費'],['邀请码','邀請碼'],['视频','影片'],['图片','圖片'],['用户','使用者']])s=s.replaceAll(a,b);
  s=[...s].map(c=>twChars[c]??c).join('').replaceAll('註意','注意').replaceAll('支援者','支持者');
  return s.replace(/__KEEP_(\d+)__/g,(_,i)=>keep[Number(i)]);
}
for(const file of walk(tw).filter(x=>x.endsWith('.html'))){const html=fs.readFileSync(file,'utf8');fs.writeFileSync(file,taiwanize(html));}

const status={version:'CoinVoyu Taiwan V3 Batch 2.1',updated:'2026-10-08',scope:'Taiwan-only',topicClusters:{bitcoin:{articles:4,covered:['Bitcoin是什麼','台灣怎麼買Bitcoin','銀行買Bitcoin','台灣買幣法規','市場基礎與FAQ'],missing:['獨立的Bitcoin市場基礎文章']},usdt:{articles:5,covered:['USDT是什麼','台灣怎麼買USDT','TRC20/ERC20','USDT換台幣','穩定幣','USDT安全與FAQ'],missing:['獨立的USDT安全文章']},wallet:{articles:5,covered:['錢包原理','冷熱錢包','助記詞','私鑰安全','帳戶安全'],missing:[]}},conversionClusters:Object.fromEntries(Object.entries(platformClusters).map(([k,v])=>[k,{pages:v.length,covered:v.map(x=>x[0]),missing:[]}])) ,videoCenter:{requiredEntries:13,added:['/tw/videos/buy-usdt/','/tw/videos/seed-phrase-security/']},referrals:{binance:'https://www.bsmkweb.cc/join?ref=TW1866',okx:'https://www.mitxcqvwnhj.com/join/TW1866',gate:'https://www.gatesites.cc/share/VOYUTWFF'}};
fs.writeFileSync(path.join(tw,'v3-batch2-1.json'),JSON.stringify(status,null,2)+'\n');

const urls=walk(tw).filter(x=>x.endsWith('.html')).filter(file=>!fs.readFileSync(file,'utf8').includes('noindex')).map(file=>{const rel=path.relative(tw,file).split(path.sep).join('/');return rel.endsWith('/index.html')?'/tw/'+rel.slice(0,-10):'/tw/'+rel;}).sort();
fs.writeFileSync(path.join(tw,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u=>`  <url><loc>${origin}${u}</loc><lastmod>2026-10-08</lastmod></url>`).join('\n')}\n</urlset>\n`);
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
console.log(`Built V3 Batch 2.1: ${videoItems.length} video entries, 3 topic hubs, ${urls.length} indexable URLs.`);
