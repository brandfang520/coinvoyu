import fs from 'node:fs';
import path from 'node:path';

const tw=path.resolve(import.meta.dirname,'..');
const origin='https://www.coinvoyu.com';
const date='2026年10月08日';
const iso='2026-10-08T00:00:00+08:00';
const logos={binance:['Binance','/tw/assets/platform-binance.png'],okx:['OKX','/tw/assets/platform-okx.png'],gate:['Gate','/tw/assets/platform-gate.webp']};

const logo=(key,cls='platform-logo')=>`<img class="${cls}" src="${logos[key][1]}" alt="${logos[key][0]} Logo" width="64" height="64" loading="lazy">`;
const navLinks=[['首頁','/tw/','home'],['開始學習','/tw/learn/','learn'],['買幣教學','/tw/buy/','buy'],['交易所','/tw/exchanges/','exchanges'],['平台比較','/tw/exchanges/comparison/','compare'],['影片教學','/tw/videos/','videos']];

function header(active=''){
  return `<a class="skip" href="#main">跳至主要內容</a><header class="header"><div class="wrap navline"><a class="brand" href="/tw/" aria-label="CoinVoyu 台灣首頁"><span class="brandmark" aria-hidden="true">C</span><span class="brand-name">CoinVoyu</span><small>台灣 / Taiwan</small></a><button class="menu" type="button" aria-expanded="false" aria-controls="main-nav" aria-label="展開導覽選單">☰</button><nav class="navlinks" id="main-nav" aria-label="主要導覽">${navLinks.map(([n,u,k])=>`<a href="${u}"${active===k?' aria-current="page"':''}>${n}</a>`).join('')}<a class="mobile-only" href="/tw/security/">安全指南</a><a class="mobile-only" href="/">簡體中文</a></nav><a class="locale" href="/">繁中 / 簡中</a></div></header>`;
}

function footer(){
  return `<footer class="footer"><div class="wrap"><div class="footer-grid"><div><a class="brand" href="/tw/" aria-label="CoinVoyu 台灣首頁"><span class="brandmark" aria-hidden="true">C</span><span class="brand-name">CoinVoyu</span><small>台灣 / Taiwan</small></a><p>從第一次了解，到真正看懂。<br>繁體中文教學，聚焦台灣使用情境。</p><a href="/tw/articles/">全部教學</a><a href="/tw/about/author/">作者與編輯團隊</a></div><div><h3>學習</h3><a href="/tw/learn/bitcoin/">Bitcoin學習中心</a><a href="/tw/learn/usdt/">USDT學習中心</a><a href="/tw/wallets/">錢包與保管</a><a href="/tw/security/">安全指南</a></div><div><h3>實用教學</h3><a href="/tw/buy/">買幣教學中心</a><a href="/tw/buy/how-to-buy-bitcoin-taiwan.html">買 Bitcoin</a><a href="/tw/buy/how-to-buy-usdt-taiwan.html">買 USDT</a><a href="/tw/buy/usdt-to-twd.html">USDT換回台幣</a></div><div><h3>交易所</h3>${['binance','okx','gate'].map(k=>`<a class="footer-platform-link" href="/tw/exchanges/${k}/">${logo(k,'footer-platform-logo')}${logos[k][0]}</a>`).join('')}<a href="/tw/exchanges/comparison/">平台比較</a></div><div><h3>關於</h3><a href="/tw/about/">關於我們</a><a href="/tw/about/editorial-policy/">編輯政策</a><a href="/tw/about/risk-disclosure/">風險揭露</a><a href="/tw/about/affiliate-disclosure/">利益揭露</a><a href="/tw/about/contact/">聯絡與更正</a></div></div><div class="footer-bottom">© 2026 CoinVoyu · 本站提供教育資訊，虛擬資產涉及價格、平台、技術與監管風險。</div></div></footer><script src="/tw/assets/site.js" defer></script>`;
}

function head({title,description,url,items=[]}){
  const graph=[{'@type':'CollectionPage',name:title,headline:title,description,url:origin+url,inLanguage:'zh-TW',dateModified:iso},{'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'CoinVoyu台灣',item:origin+'/tw/'},{'@type':'ListItem',position:2,name:title,item:origin+url}]}];
  if(items.length)graph.push({'@type':'ItemList',name:title,itemListElement:items.map((x,i)=>({'@type':'ListItem',position:i+1,name:x[0],url:origin+x[1]}))});
  return `<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}｜CoinVoyu台灣</title><meta name="description" content="${description}"><link rel="canonical" href="${origin+url}"><meta name="robots" content="index,follow,max-image-preview:large"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:url" content="${origin+url}"><meta property="og:locale" content="zh_TW"><meta name="theme-color" content="#F8FAFC"><link rel="icon" href="/tw/assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/tw/assets/site.css"><script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':graph})}</script></head>`;
}

const covers=['/tw/assets/covers/15.webp','/tw/assets/covers/05.webp','/tw/assets/covers/17.webp','/tw/assets/covers/19.webp','/tw/assets/covers/02.webp','/tw/assets/covers/03.webp'];
const card=(item,i=0)=>`<article class="card hub-asset-card"><a href="${item[1]}"><img src="${item[3]||covers[i%covers.length]}" alt="${item[0]}主題圖片" width="1200" height="675" loading="lazy"></a><div class="card-body"><span class="tag">${item[2]}</span><h3><a href="${item[1]}">${item[0]}</a></h3>${item[4]?`<p>${item[4]}</p>`:''}<div class="card-meta"><span>繁體教學</span><span aria-hidden="true">→</span></div></div></article>`;
const section=(title,desc,items)=>`<section class="hub-category"><div class="section-title"><div><h2>${title}</h2><p>${desc}</p></div><span class="hub-count">${items.length}個入口</span></div><div class="grid">${items.map(card).join('')}</div></section>`;

function collectionPage({url,title,description,eyebrow,active,sections,brandStrip=false}){
  const items=sections.flatMap(x=>x[2]).map(x=>[x[0],x[1]]);
  const body=sections.map(x=>section(...x)).join('');
  const brands=brandStrip?`<div class="comparison-brand-row" aria-label="比較平台">${['binance','okx','gate'].map(k=>`<span>${logo(k)}<strong>${logos[k][0]}</strong></span>`).join('')}</div>`:'';
  const html=`<!doctype html><html lang="zh-TW">${head({title,description,url,items})}<body id="top">${header(active)}<main id="main"><div class="wrap"><nav class="crumb" aria-label="麵包屑"><a href="/tw/">首頁</a><span>›</span><span aria-current="page">${title}</span></nav><header class="page-head"><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="lead">${description}</p><div class="byline"><a href="/tw/about/author/">整理：CoinVoyu編輯團隊</a><span>最後更新：${date}</span></div></header>${brands}<nav class="hub-jump" aria-label="本頁分類">${sections.map(([n],i)=>`<a href="#hub-${i+1}">${n}</a>`).join('')}</nav>${body.replaceAll('<section class="hub-category">',(_,i)=>_)}<section class="sources"><h2>資料來源與更新原則</h2><p>本頁整理CoinVoyu Taiwan既有繁體文章與教學入口；平台介面、費用、法規和網路規則可能變動，請以文章內列出的官方來源及平台最新公告為準。</p></section></div></main>${footer()}</body></html>`;
  const withIds=html.replace(/<section class="hub-category">/g,(()=>{let i=0;return()=>`<section class="hub-category" id="hub-${++i}">`;})());
  const file=path.join(tw,url.replace(/^\/tw\//,'').replace(/\/$/,''),'index.html');fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,withIds);
}

const learnSections=[
  ['加密貨幣基礎','先理解資產、穩定幣、法規與交易所風險。',[
    ['加密貨幣入門完整指南','/tw/learn/crypto-beginner-guide/','基礎'],['穩定幣是什麼？','/tw/learn/what-is-stablecoin/','基礎'],['台灣加密貨幣合法嗎？','/tw/learn/taiwan-crypto-regulation.html','台灣法規'],['交易所安全嗎？','/tw/security/exchange-safety/','風險']]],
  ['Bitcoin','從概念進入台灣購買、比較與保管路徑。',[
    ['Bitcoin學習中心','/tw/learn/bitcoin/','主題Hub'],['Bitcoin是什麼？','/tw/learn/bitcoin/what-is-bitcoin.html','基礎概念'],['台灣怎麼買Bitcoin？','/tw/buy/how-to-buy-bitcoin-taiwan.html','購買教學'],['台灣交易所比較','/tw/exchanges/comparison.html','平台比較']]],
  ['USDT','理解用途、購買、轉帳網路與換回台幣。',[
    ['USDT學習中心','/tw/learn/usdt/','主題Hub'],['USDT是什麼？','/tw/learn/usdt/what-is-usdt.html','基礎概念'],['台灣怎麼買USDT？','/tw/buy/how-to-buy-usdt-taiwan.html','購買教學'],['TRC20與ERC20差異','/tw/learn/usdt/trc20-vs-erc20.html','轉帳網路'],['USDT換回台幣','/tw/buy/usdt-to-twd.html','出金']]],
  ['錢包安全','從錢包原理延伸到冷熱錢包、助記詞與帳戶保護。',[
    ['錢包與保管安全中心','/tw/wallets/','主題Hub'],['加密貨幣錢包是什麼？','/tw/security/crypto-wallet-guide.html','錢包'],['冷錢包與熱錢包','/tw/security/hot-wallet-vs-cold-wallet.html','保管'],['助記詞是什麼？','/tw/security/seed-phrase-guide.html','備份'],['交易所帳戶保護','/tw/security/account-security.html','帳戶安全']]],
  ['交易基礎','先理解交易方式，再進入平台比較與操作教學。',[
    ['現貨與合約差在哪？','/tw/learn/spot-vs-futures/','交易概念'],['台灣交易所怎麼選？','/tw/exchanges/','平台Hub'],['平台比較中心','/tw/exchanges/comparison/','比較Hub'],['影片教學中心','/tw/videos/','影音學習']]]
];

const buySections=[
  ['Bitcoin購買','從資金準備、平台選擇到完成第一筆Bitcoin現貨買入。',[
    ['台灣怎麼買Bitcoin？','/tw/buy/how-to-buy-bitcoin-taiwan.html','Bitcoin'],['台灣銀行可以直接買Bitcoin嗎？','/tw/buy/bank-buy-bitcoin-taiwan.html','台幣路徑'],['台灣可以買虛擬貨幣嗎？','/tw/buy/can-taiwan-buy-crypto.html','台灣情境']]],
  ['USDT購買','理解台幣買入USDT及轉帳網路選擇。',[
    ['台灣怎麼買USDT？','/tw/buy/how-to-buy-usdt-taiwan.html','USDT'],['TRC20與ERC20差異','/tw/learn/usdt/trc20-vs-erc20.html','轉帳網路']]],
  ['台幣入金','先把銀行資金轉入合適平台，再完成買入。',[
    ['新台幣怎麼買加密貨幣？','/tw/buy-crypto/twd-buy-crypto/','台幣入金'],['台灣銀行買Bitcoin流程','/tw/buy/bank-buy-bitcoin-taiwan.html','銀行資金'],['台灣買幣平台比較','/tw/exchanges/taiwan-exchange-guide.html','平台選擇']]],
  ['出金','把加密資產換回新台幣前，先核對平台、網路與銀行資料。',[
    ['USDT怎麼換回台幣？','/tw/buy/usdt-to-twd.html','USDT出金'],['加密貨幣怎麼出金到銀行？','/tw/buy-crypto/withdraw-to-bank/','銀行出金']]],
  ['平台購買教學','了解平台後，再依實際需求查看註冊與現貨操作。',[
    ['Binance現貨交易教學','/tw/exchanges/binance/spot-trading.html','Binance'],['OKX台灣註冊與使用','/tw/exchanges/okx/register.html','OKX'],['Gate台灣註冊與使用','/tw/exchanges/gate/register.html','Gate']]]
];

const platformPaths={
  binance:[['Binance註冊教學','register.html','註冊'],['Binance邀請碼','referral-code.html','邀請碼'],['Binance KYC','kyc.html','KYC'],['Binance安全指南','security.html','安全'],['Binance手續費','fees.html','手續費'],['Binance充值','deposit.html','充值'],['Binance現貨交易','spot-trading.html','交易'],['Binance提幣','withdraw.html','提幣']],
  okx:[['OKX註冊教學','register.html','註冊'],['OKX邀請碼','referral-code.html','邀請碼'],['OKX安全指南','security.html','安全'],['OKX手續費','fees.html','手續費'],['OKX充值','deposit.html','充值'],['OKX提幣','withdraw.html','提幣']],
  gate:[['Gate註冊教學','register.html','註冊'],['Gate邀請碼','referral-code.html','邀請碼'],['Gate安全指南','security.html','安全'],['Gate手續費','fees/','手續費'],['Gate充值','deposit.html','充值'],['Gate提幣','withdraw.html','提幣']]
};

function exchangePage(){
  const url='/tw/exchanges/';const title='台灣加密貨幣交易所教學中心';const description='依Binance、OKX與Gate分類整理註冊、邀請碼、KYC、安全、充值、交易與提幣教學，並連接台灣平台比較。';
  const items=Object.entries(platformPaths).flatMap(([k,v])=>v.map(x=>[x[0],`/tw/exchanges/${k}/${x[1]}`]));
  const sections=Object.entries(platformPaths).map(([key,links])=>`<section class="exchange-platform-section" id="${key}"><div class="exchange-platform-head"><div class="platform-name">${logo(key)}<span>${logos[key][0]}</span></div><a class="btn secondary" href="/tw/exchanges/${key}/">了解${logos[key][0]}專題</a></div><div class="conversion-cluster-links">${links.map(([n,p,t])=>`<a href="/tw/exchanges/${key}/${p}"><strong>${n}</strong><span>${t}</span></a>`).join('')}</div></section>`).join('');
  const html=`<!doctype html><html lang="zh-TW">${head({title,description,url,items})}<body id="top">${header('exchanges')}<main id="main"><div class="wrap"><nav class="crumb" aria-label="麵包屑"><a href="/tw/">首頁</a><span>›</span><span aria-current="page">交易所</span></nav><header class="page-head"><p class="eyebrow">EXCHANGE LEARNING HUB</p><h1>${title}</h1><p class="lead">${description}</p><div class="byline"><a href="/tw/about/author/">整理：CoinVoyu編輯團隊</a><span>最後更新：${date}</span></div></header><nav class="hub-jump" aria-label="平台分類"><a href="#binance">Binance</a><a href="#okx">OKX</a><a href="#gate">Gate</a><a href="/tw/exchanges/comparison/">平台比較</a></nav>${sections}<section class="intent-path"><p class="tag">比較後再決定</p><h2>還不知道該選哪個平台？</h2><p>先比較功能、費用、安全工具與台灣資金路徑，再進入對應平台教學。</p><div class="intent-links"><a href="/tw/exchanges/comparison/">前往平台比較中心 →</a><a href="/tw/exchanges/taiwan-exchange-guide.html">台灣本地與海外平台差異 →</a></div></section><section class="sources"><h2>利益揭露與資料來源</h2><p>平台教學以官方說明與台灣使用情境整理；部分平台頁面含推薦連結，是否註冊由讀者自行決定，內容不承諾優惠或收益。</p></section></div></main>${footer()}</body></html>`;
  fs.writeFileSync(path.join(tw,'exchanges','index.html'),html);
}

const compareSections=[
  ['Binance比較','從功能、費用、安全與使用體驗比較Binance和其他平台。',[
    ['Binance vs OKX','/tw/compare/binance-vs-okx/','Binance比較'],['Binance vs Gate','/tw/compare/binance-vs-gate/','Binance比較'],['Binance vs MAX','/tw/compare/binance-vs-max/','台灣比較']]],
  ['OKX比較','查看OKX與Binance的功能、Web3工具與新手體驗差異。',[
    ['Binance vs OKX','/tw/compare/binance-vs-okx/','OKX比較'],['三平台完整比較','/tw/exchanges/comparison.html','三平台比較']]],
  ['Gate比較','了解Gate與Binance在資產、操作與安全工具上的差異。',[
    ['Binance vs Gate','/tw/compare/binance-vs-gate/','Gate比較'],['三平台完整比較','/tw/exchanges/comparison.html','三平台比較']]],
  ['台灣平台比較','比較本地出入金路徑與海外平台功能，不做單一排名。',[
    ['台灣本地與海外交易所差異','/tw/exchanges/taiwan-exchange-guide.html','台灣平台'],['Binance vs MAX','/tw/compare/binance-vs-max/','本地與海外'],['台灣交易所完整比較','/tw/exchanges/comparison.html','完整比較']]]
];

collectionPage({url:'/tw/learn/',title:'開始學習',description:'依加密貨幣基礎、Bitcoin、USDT、錢包安全與交易基礎分類，完整整理CoinVoyu Taiwan現有學習文章。',eyebrow:'LEARNING HUB',active:'learn',sections:learnSections});
collectionPage({url:'/tw/buy/',title:'買幣教學中心',description:'從理解資產、準備新台幣、選擇平台，到買Bitcoin、買USDT與換回台幣的台灣操作路徑。',eyebrow:'BUY CRYPTO HUB',active:'buy',sections:buySections});
exchangePage();
collectionPage({url:'/tw/exchanges/comparison/',title:'平台比較中心',description:'依Binance、OKX、Gate與台灣平台情境整理比較文章，從功能、費用、安全與出入金路徑做選擇。',eyebrow:'EXCHANGE COMPARISON HUB',active:'compare',sections:compareSections,brandStrip:true});

const topicRoutes={
  bitcoin:{files:['learn/bitcoin/what-is-bitcoin.html','buy/how-to-buy-bitcoin-taiwan.html','buy/bank-buy-bitcoin-taiwan.html','buy/can-taiwan-buy-crypto.html'],links:[['Bitcoin Hub','/tw/learn/bitcoin/'],['Bitcoin是什麼','/tw/learn/bitcoin/what-is-bitcoin.html'],['台灣買Bitcoin','/tw/buy/how-to-buy-bitcoin-taiwan.html'],['交易所比較','/tw/exchanges/comparison/'],['Binance教學','/tw/exchanges/binance/']]},
  usdt:{files:['learn/usdt/what-is-usdt.html','buy/how-to-buy-usdt-taiwan.html','learn/usdt/trc20-vs-erc20.html','buy/usdt-to-twd.html'],links:[['USDT Hub','/tw/learn/usdt/'],['USDT是什麼','/tw/learn/usdt/what-is-usdt.html'],['台灣買USDT','/tw/buy/how-to-buy-usdt-taiwan.html'],['TRC20/ERC20','/tw/learn/usdt/trc20-vs-erc20.html'],['交易所教學','/tw/exchanges/']]},
  wallet:{files:['security/crypto-wallet-guide.html','security/hot-wallet-vs-cold-wallet.html','security/seed-phrase-guide.html','security/seed-phrase-security.html','security/account-security.html'],links:[['錢包安全Hub','/tw/wallets/'],['錢包是什麼','/tw/security/crypto-wallet-guide.html'],['冷熱錢包','/tw/security/hot-wallet-vs-cold-wallet.html'],['助記詞','/tw/security/seed-phrase-guide.html'],['帳戶安全','/tw/security/account-security.html']]}
};
for(const [key,route] of Object.entries(topicRoutes))for(const rel of route.files)injectRoute(path.join(tw,rel),key,route.links);
for(const [key,links] of Object.entries(platformPaths)){
  const ordered=[['平台專題',`/tw/exchanges/${key}/`],...links.map(([n,p])=>[n,`/tw/exchanges/${key}/${p}`])];
  for(const [,p] of links)injectRoute(path.join(tw,'exchanges',key,p.endsWith('/')?path.join(p,'index.html'):p),`conversion-${key}`,ordered);
}

// Point site-wide navigation at the complete V3 Batch 2.2 hubs without deleting legacy URLs.
for(const file of walk(tw).filter(x=>x.endsWith('.html'))){
  let html=fs.readFileSync(file,'utf8');
  html=html.replaceAll('href="/tw/buy-crypto/"','href="/tw/buy/"').replaceAll('href="/tw/compare/"','href="/tw/exchanges/comparison/"');
  // Every visible platform identity uses the maintained official asset.
  html=html.replace(/<div class="platform-name">\s*(?:<span[^>]*>)?OKX(?:<\/span>)?\s*<\/div>/g,`<div class="platform-name">${logo('okx')}<span>OKX</span></div>`);
  fs.writeFileSync(file,html);
}

const contentRoots=['learn','buy','buy-crypto','security','exchanges','compare'];
const hubFiles=new Set(['learn/index.html','learn/bitcoin/index.html','learn/usdt/index.html','buy/index.html','buy-crypto/index.html','security/index.html','exchanges/index.html','exchanges/binance/index.html','exchanges/okx/index.html','exchanges/gate/index.html','exchanges/comparison/index.html','compare/index.html']);
const activeArticles=contentRoots.flatMap(root=>walk(path.join(tw,root)).filter(x=>x.endsWith('.html'))).filter(file=>{
  const rel=path.relative(tw,file).split(path.sep).join('/');const html=fs.readFileSync(file,'utf8');
  if(hubFiles.has(rel)||html.includes('noindex'))return false;
  if(/\/(fees|kyc|referral-code|register)\/index\.html$/.test(rel)&&fs.existsSync(file.replace('/index.html','.html')))return false;
  return true;
});
const inventory={
  version:'CoinVoyu Taiwan V3 Batch 2.2',scope:'Taiwan-only',updated:'2026-10-08',htmlFiles:walk(tw).filter(x=>x.endsWith('.html')).length,indexableUrls:0,uniqueArticleAssets:activeArticles.length,
  learning:{bitcoin:['Bitcoin是什麼','台灣怎麼買Bitcoin','台灣銀行買Bitcoin','台灣可以買虛擬貨幣'],usdt:['USDT是什麼','台灣怎麼買USDT','TRC20/ERC20','穩定幣','USDT換回台幣'],walletSafety:['錢包是什麼','冷熱錢包','助記詞','私鑰安全','帳戶安全','交易所安全','詐騙防範'],tradingBasics:['加密貨幣入門','現貨與合約','台灣法規']},
  buying:{bitcoin:['台灣怎麼買Bitcoin','銀行買Bitcoin'],usdt:['台灣怎麼買USDT','USDT換回台幣'],twd:['新台幣買加密貨幣','銀行資金買Bitcoin','台灣買幣平台'],withdrawal:['USDT換回台幣','出金到銀行']},
  exchanges:Object.fromEntries(Object.entries(platformPaths).map(([k,v])=>[k,v.map(x=>x[2])])),comparisons:['Binance vs OKX','Binance vs Gate','Binance vs MAX','三平台比較','台灣本地與海外平台'],videos:{physicalPages:23,curatedEntries:13,categories:['新手教學','買幣教學','平台教學','安全教學']},
  referrals:{binance:'https://www.bsmkweb.cc/join?ref=TW1866',okx:'https://www.mitxcqvwnhj.com/join/TW1866',gate:'https://www.gatesites.cc/share/VOYUTWFF'}
};

const indexable=walk(tw).filter(x=>x.endsWith('.html')).filter(f=>!fs.readFileSync(f,'utf8').includes('noindex'));
inventory.htmlFiles=walk(tw).filter(x=>x.endsWith('.html')).length;inventory.indexableUrls=indexable.length;
fs.writeFileSync(path.join(tw,'v3-batch2-2.json'),JSON.stringify(inventory,null,2)+'\n');
const urls=indexable.map(file=>{const rel=path.relative(tw,file).split(path.sep).join('/');return rel.endsWith('/index.html')?'/tw/'+rel.slice(0,-10):'/tw/'+rel;}).sort();
fs.writeFileSync(path.join(tw,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u=>`  <url><loc>${origin}${u}</loc><lastmod>2026-10-08</lastmod></url>`).join('\n')}\n</urlset>\n`);

function injectRoute(file,key,links){
  if(!fs.existsSync(file))return;let html=fs.readFileSync(file,'utf8');
  html=html.replace(new RegExp(`<nav class="cluster-route" data-cluster="${key}"[\\s\\S]*?<\\/nav>`),'');
  const block=`<nav class="cluster-route" data-cluster="${key}" aria-label="主題學習路徑"><strong>主題路徑</strong>${links.map(([n,u])=>`<a href="${u}">${n}</a>`).join('<span aria-hidden="true">›</span>')}</nav>`;
  html=html.replace(/(<header class="page-head">[\s\S]*?<\/header>)/,`$1${block}`);fs.writeFileSync(file,html);
}
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
console.log(`Built V3 Batch 2.2: ${inventory.uniqueArticleAssets} article assets, ${inventory.indexableUrls} indexable URLs, 4 repaired hubs.`);
