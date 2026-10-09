import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');

const platform = {
  binance: {name: 'Binance', src: '/tw/assets/platform-binance.svg'},
  okx: {name: 'OKX', src: '/tw/assets/platform-okx.svg'},
  gate: {name: 'Gate', src: '/tw/assets/platform-gate.svg'}
};

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const file = path.join(dir, entry.name);
    entry.isDirectory() ? walk(file, out) : entry.name.endsWith('.html') && out.push(file);
  }
  return out;
}

function logo(key, className = 'platform-logo') {
  const item = platform[key];
  return `<img class="${className}" src="${item.src}" alt="${item.name} Logo" width="64" height="64" loading="lazy">`;
}

function brandRow(keys, className = 'comparison-brand-row') {
  return `<div class="${className}" aria-label="相關平台">${keys.map(key => `<span>${logo(key, 'platform-logo')}<strong>${platform[key].name}</strong></span>`).join('')}</div>`;
}

const introBlock = `<div class="intro-grid"><a class="intro-card" href="/tw/learn/what-is-bitcoin/"><img src="/tw/assets/covers/15.webp" alt="Bitcoin 是什麼主題插圖" width="1200" height="675" loading="lazy"><span><strong>Bitcoin 是什麼？</strong><small>了解 Bitcoin 的基本原理與用途</small></span></a><a class="intro-card" href="/tw/learn/what-is-usdt/"><img src="/tw/assets/covers/05.webp" alt="USDT 是什麼主題插圖" width="1200" height="675" loading="lazy"><span><strong>USDT 是什麼？</strong><small>看懂穩定幣與美元之間的關係</small></span></a><a class="intro-card" href="/tw/buy-crypto/twd-buy-crypto/"><img src="/tw/assets/covers/11.webp" alt="新台幣買加密貨幣主題插圖" width="1200" height="675" loading="lazy"><span><strong>怎麼買加密貨幣？</strong><small>了解從新台幣到加密資產的基本流程</small></span></a><a class="intro-card" href="/tw/exchanges/"><img src="/tw/assets/covers/04.webp" alt="加密貨幣交易所主題插圖" width="1200" height="675" loading="lazy"><span><strong>交易所是什麼？</strong><small>看懂交易平台在買賣流程中的角色</small></span></a><a class="intro-card" href="/tw/wallets/hot-vs-cold-wallet/"><img src="/tw/assets/covers/17.webp" alt="加密貨幣錢包主題插圖" width="1200" height="675" loading="lazy"><span><strong>錢包是什麼？</strong><small>了解資產保管與私鑰的基本概念</small></span></a><a class="intro-card" href="/tw/learn/spot-vs-futures/"><img src="/tw/assets/covers/16.webp" alt="現貨與合約差異主題插圖" width="1200" height="675" loading="lazy"><span><strong>現貨與合約差在哪？</strong><small>先理解兩種交易方式與風險差異</small></span></a></div>`;

for (const file of walk(root)) {
  let html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(root, file).replaceAll(path.sep, '/');

  if (rel === 'index.html') {
    html = html.replace(/<div class="intro-grid">[\s\S]*?<\/div><\/div><\/section><section class="section alt">/, `${introBlock}</div></section><section class="section alt">`);
    html = html.replace(/<div class="platform-name"><svg[\s\S]*?<\/svg>Binance<\/div>/, `<div class="platform-name">${logo('binance')}<span>Binance</span></div>`);
    html = html.replace('<div class="platform-name">OKX</div>', `<div class="platform-name">${logo('okx')}<span>OKX</span></div>`);
    html = html.replace('<div class="platform-name"><span class=gate-word>Gate</span></div>', `<div class="platform-name">${logo('gate')}<span>Gate</span></div>`);
  }

  let pageKeys = [];
  if (/^exchanges\/binance\//.test(rel) || rel === 'exchanges/binance/index.html') pageKeys = ['binance'];
  if (/^exchanges\/okx\//.test(rel) || rel === 'exchanges/okx/index.html') pageKeys = ['okx'];
  if (/^exchanges\/gate\//.test(rel) || rel === 'exchanges/gate/index.html') pageKeys = ['gate'];
  if (rel === 'exchanges/index.html' || rel === 'compare/index.html') pageKeys = ['binance', 'okx', 'gate'];
  if (rel === 'compare/binance-vs-okx/index.html') pageKeys = ['binance', 'okx'];
  if (rel === 'compare/binance-vs-gate/index.html') pageKeys = ['binance', 'gate'];
  if (rel === 'compare/binance-vs-max/index.html') pageKeys = ['binance'];
  if (pageKeys.length && !html.includes('class="comparison-brand-row"') && !html.includes('class="page-platform-mark"')) {
    const row = pageKeys.length === 1 ? brandRow(pageKeys, 'page-platform-mark') : brandRow(pageKeys);
    html = html.replace(/(<header class="page-head">[\s\S]*?)(<h1>)/, `$1${row}$2`);
  }

  html = html.replace(/<aside class="platform-cta([^>]*)>([\s\S]*?)<\/aside>/g, (whole, attrs, inner) => {
    if (inner.includes('class="cta-platform-logos"')) return whole;
    const keys = [];
    if (inner.includes('bsmkweb.cc/join?ref=TW1866')) keys.push('binance');
    if (inner.includes('mitxcqvwnhj.com/join/TW1866')) keys.push('okx');
    if (inner.includes('gatesites.cc/share/VOYUTWFF')) keys.push('gate');
    if (!keys.length) return whole;
    return `<aside class="platform-cta${attrs}">${brandRow(keys, 'cta-platform-logos')}${inner}</aside>`;
  });

  fs.writeFileSync(file, html);
}

const cssFile = path.join(root, 'assets/site.css');
let css = fs.readFileSync(cssFile, 'utf8');
if (!css.includes('/* Batch 5 platform identity */')) {
  css += `\n/* Batch 5 platform identity */\n.platform-logo{width:46px;height:46px;flex:0 0 46px;object-fit:contain;border-radius:12px}.platform-name{min-height:48px}.platform-name>span{line-height:1.2}.intro-card{padding:0;overflow:hidden;align-items:stretch}.intro-card>img{width:112px;min-height:96px;aspect-ratio:7/6;object-fit:cover;flex:0 0 112px}.intro-card>span{display:flex;flex-direction:column;justify-content:center;padding:16px 18px 16px 0;min-width:0}.comparison-brand-row,.page-platform-mark,.cta-platform-logos{display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin:0 0 16px}.comparison-brand-row>span,.page-platform-mark>span,.cta-platform-logos>span{display:inline-flex;align-items:center;gap:9px;padding:7px 12px 7px 7px;border:1px solid #dbe5f1;border-radius:13px;background:#fff;color:#14233c;box-shadow:0 8px 24px rgba(30,58,95,.07)}.comparison-brand-row .platform-logo,.page-platform-mark .platform-logo,.cta-platform-logos .platform-logo{width:36px;height:36px;flex-basis:36px;border-radius:9px}.page-platform-mark>span{padding-right:15px}.page-platform-mark strong{font-size:17px}.cta-platform-logos{margin-bottom:13px}.cta-platform-logos>span{background:#f8fbff}.cta-platform-logos strong{font-size:14px}@media(max-width:850px){.intro-card>img{width:104px;flex-basis:104px}}@media(max-width:560px){.intro-card>img{width:108px;flex-basis:108px;min-height:92px}.intro-card>span{padding:14px 14px 14px 0}.comparison-brand-row,.page-platform-mark{gap:8px}.comparison-brand-row>span,.page-platform-mark>span{padding:6px 10px 6px 6px}.comparison-brand-row .platform-logo,.page-platform-mark .platform-logo{width:32px;height:32px;flex-basis:32px}}\n`;
  fs.writeFileSync(cssFile, css);
}
