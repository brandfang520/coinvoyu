import fs from 'node:fs';
import path from 'node:path';

const tw=path.resolve(import.meta.dirname,'..');
const origin='https://www.coinvoyu.com';
const read=rel=>fs.readFileSync(path.join(tw,rel),'utf8');
const write=(rel,data)=>fs.writeFileSync(path.join(tw,rel),data);
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>{
  const file=path.join(dir,entry.name);
  return entry.isDirectory()?walk(file):[file];
});

const replacements=new Map([
  ['/tw/videos/bitcoin/','/tw/learn/bitcoin/what-is-bitcoin.html'],
  ['/tw/videos/binance-register/','/tw/exchanges/binance/register.html'],
  ['/tw/videos/binance-kyc/','/tw/exchanges/binance/kyc.html']
]);
for(const file of walk(tw).filter(file=>file.endsWith('.html'))){
  let html=fs.readFileSync(file,'utf8');
  for(const [from,to] of replacements)html=html.replaceAll(`href="${from}"`,`href="${to}"`);
  html=html
    .replaceAll('Bitcoin影片導讀','Bitcoin完整圖文教學')
    .replaceAll('先看影片建立畫面與流程概念，再回到本文核對台灣情境、風險與完整步驟。','直接閱讀完整圖文教學，理解Bitcoin原理、用途、限制與風險。')
    .replaceAll('前往影片教學 →','閱讀完整教學 →')
    .replaceAll('Binance註冊影片導讀','Binance註冊完整教學')
    .replaceAll('Binance註冊、KYC與安全影片','Binance註冊、KYC與安全文字教學');
  fs.writeFileSync(file,html);
}

function compatibilityPage(title,target,label){
  return `<!doctype html><html lang="zh-TW"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}｜CoinVoyu 台灣</title><meta name="robots" content="noindex,follow"><link rel="canonical" href="${origin}${target}"><meta http-equiv="refresh" content="0;url=${target}"></head><body><main><p>原影片未達目前教學品質標準，已撤下。請前往 <a href="${target}">${label}</a>。</p></main></body></html>`;
}
write('videos/bitcoin/index.html',compatibilityPage('Bitcoin影片入口已更新','/tw/learn/bitcoin/what-is-bitcoin.html','Bitcoin完整圖文教學'));
write('videos/binance-register/index.html',compatibilityPage('Binance影片入口已更新','/tw/exchanges/binance/register.html','Binance註冊完整教學'));
write('videos/binance-kyc/index.html',compatibilityPage('Binance KYC影片入口已更新','/tw/exchanges/binance/kyc.html','Binance身分驗證完整教學'));

let hub=read('videos/index.html');
for(const removed of ['/tw/learn/bitcoin/what-is-bitcoin.html','/tw/exchanges/binance/register.html']){
  const sections=[...hub.matchAll(/<section class="video-cluster">[\s\S]*?<\/section>/g)];
  const section=sections.map(match=>match[0]).find(block=>block.includes(`href="${removed}"`));
  if(!section)throw new Error(`Video Hub section not found for ${removed}`);
  hub=hub.replace(section,'');
}
hub=hub
  .replaceAll('Bitcoin、Binance、OKX與安全教學','OKX操作與安全教學')
  .replace('<span>14個獨立影片檔案</span>','<span>12個獨立影片檔案</span>');
write('videos/index.html',hub);

let home=read('index.html');
for(const href of ['/tw/learn/bitcoin/what-is-bitcoin.html','/tw/exchanges/binance/register.html']){
  const pattern=new RegExp(`<article class="card"><a class="video-thumb" href="${href.replaceAll('/','\\/')}"[\\s\\S]*?<\\/article>`);
  if(!pattern.test(home))throw new Error(`Homepage video card not found for ${href}`);
  home=home.replace(pattern,'');
}
const okxCards=`<article class="card"><a class="video-thumb" href="/tw/videos/okx-register/"><img src="/tw/assets/video-covers/okx-account-registration.webp" alt="OKX帳戶建立教學封面" width="1280" height="720" loading="lazy"><span class="play-mark" aria-hidden="true">▶</span><span class="duration">00:19</span></a><div class="card-body"><span class="tag">平台操作</span><h3><a href="/tw/videos/okx-register/">OKX帳戶建立教學</a></h3><p class="desc">以實際畫面了解帳戶建立入口，再回到文字指南核對台灣地區資格與安全設定。</p><div class="card-meta"><span>來源已標示</span><span aria-hidden="true">↗</span></div></div></article><article class="card"><a class="video-thumb" href="/tw/videos/spot/"><img src="/tw/assets/video-covers/spot-trading.webp" alt="OKX現貨下單操作封面" width="1280" height="720" loading="lazy"><span class="play-mark" aria-hidden="true">▶</span><span class="duration">00:31</span></a><div class="card-body"><span class="tag">現貨操作</span><h3><a href="/tw/videos/spot/">OKX現貨下單操作</a></h3><p class="desc">看懂交易對、買賣方向與現貨訂單區，再搭配完整文章核對訂單與風險。</p><div class="card-meta"><span>來源已標示</span><span aria-hidden="true">↗</span></div></div></article>`;
const insertion='<article class="card"><a class="video-thumb" href="/tw/videos/account-security/">';
if(!home.includes(insertion))throw new Error('Homepage retained safety card not found');
home=home.replace(insertion,okxCards+insertion)
  .replace('從基礎概念、平台操作到帳戶安全；每支影片都連結完整文字指南並標示來源。','只展示內容清楚、可實際操作的平台與安全影片；每支影片都連結完整文字指南並標示來源。');
write('index.html',home);

const registry=JSON.parse(read('assets/video-sources-v3.json'));
registry.items=registry.items.filter(item=>!['bitcoin-what-is.mp4','binance-register.mp4'].includes(item.file));
registry.independentVideoFiles=registry.items.length;
registry.verified='2026-10-08';
write('assets/video-sources-v3.json',JSON.stringify(registry,null,2)+'\n');

let llms=read('llms.txt');
for(const pathName of replacements.keys())llms=llms.split('\n').filter(line=>!line.includes(origin+pathName)).join('\n');
write('llms.txt',llms.trimEnd()+'\n');

const urls=[];
for(const file of walk(tw).filter(file=>file.endsWith('.html'))){
  const html=fs.readFileSync(file,'utf8');
  if(/name="robots"[^>]+noindex/i.test(html)||/http-equiv="refresh"/i.test(html))continue;
  const canonical=(html.match(/rel="canonical" href="([^"]+)"/i)||[])[1];
  if(canonical?.startsWith(origin+'/tw/'))urls.push(canonical);
}
const unique=[...new Set(urls)].sort((a,b)=>a===origin+'/tw/'?-1:b===origin+'/tw/'?1:a.localeCompare(b));
write('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${unique.map(url=>`  <url><loc>${url.replaceAll('&','&amp;')}</loc><lastmod>2026-10-08</lastmod></url>`).join('\n')}\n</urlset>\n`);

const rc=JSON.parse(read('v4-rc.json'));
rc.independentVideoFiles=12;
rc.videoQualityFix={
  date:'2026-10-08',
  removed:['bitcoin-what-is.mp4','binance-register.mp4'],
  reason:'Bitcoin影片缺少教學內容；Binance影片原始語音節奏與編碼品質不適合保留為正式教學。',
  playablePages:15,
  compatibilityVideoPages:11,
  previewSeekFallback:'當媒體伺服器不提供HTTP Byte Range時，以同源完整檔案Blob載入，完成後提供可拖動進度。'
};
write('v4-rc.json',JSON.stringify(rc,null,2)+'\n');

console.log(`Video quality migration complete: ${unique.length} sitemap URLs, ${registry.items.length} independent videos.`);
