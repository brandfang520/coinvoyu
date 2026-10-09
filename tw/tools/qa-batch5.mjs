import fs from 'node:fs';
import path from 'node:path';

const repo = path.resolve(import.meta.dirname, '../..');
const root = path.join(repo, 'tw');
const issues = [];
const htmlFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.name.endsWith('.html')) htmlFiles.push(file);
  }
}
function check(ok, file, message) {
  if (!ok) issues.push(`${path.relative(root, file)}: ${message}`);
}
function attrs(html, tag, attr) {
  const results = [];
  for (const match of html.matchAll(new RegExp(`<${tag}\\b[^>]*\\b${attr}=["']([^"']+)["'][^>]*>`, 'gi'))) results.push(match[1]);
  return results;
}
function localTarget(url) {
  if (!url.startsWith('/tw/')) return null;
  const pathname = decodeURIComponent(url.split(/[?#]/)[0]);
  const relative = pathname.slice('/tw/'.length);
  if (!relative) return path.join(root, 'index.html');
  const direct = path.join(root, relative);
  if (path.extname(direct)) return direct;
  return path.join(direct, 'index.html');
}

walk(root);
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(root, file);
  const is404 = rel === '404.html';
  check((html.match(/<h1\b/gi) || []).length === 1, file, 'must contain exactly one H1');
  check(/<title>[^<]+<\/title>/i.test(html), file, 'missing title');
  check(/<meta name="description" content="[^"]+"/i.test(html), file, 'missing meta description');
  check(/<link rel="canonical" href="https:\/\/www\.coinvoyu\.com\/tw\//i.test(html), file, 'missing Taiwan canonical');
  check(/<script type="application\/ld\+json">/i.test(html), file, 'missing JSON-LD');
  if (!is404) check(/"@type"\s*:\s*"BreadcrumbList"/.test(html), file, 'missing breadcrumb schema');
  check(!/DS1886|DS1888|VFZMV11YUW/.test(html), file, 'contains old referral code');
  check(!/(?:href|src|poster)=["']\/assets\//i.test(html), file, 'depends on root /assets');
  check(!/\/tw(?:\/tw)+\/assets\//.test(html), file, 'contains duplicated /tw asset path');
  check(!/href=["']\/(?:crypto-etp|fed-stablecoin|nasdaq-kraken)/.test(html), file, 'links to main-site editorial page');
  for (const tag of ['a', 'img', 'script', 'link', 'source', 'video']) {
    for (const attr of tag === 'a' ? ['href'] : tag === 'link' ? ['href'] : tag === 'video' ? ['poster'] : ['src']) {
      for (const url of attrs(html, tag, attr)) {
        const target = localTarget(url);
        if (target) check(fs.existsSync(target), file, `missing local target ${url}`);
      }
    }
  }
  for (const script of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(script[1]); } catch (error) { issues.push(`${rel}: invalid JSON-LD (${error.message})`); }
  }
  const videos = (html.match(/<video\b/gi) || []).length;
  const sourceNotes = (html.match(/<p class="media-source">影片來源：/g) || []).length;
  check(videos === sourceNotes, file, `video/source-note mismatch ${videos}/${sourceNotes}`);
  if (html.includes('class="article-body"')) {
    check(/作者／編輯：/.test(html), file, 'missing author');
    check(/最後更新：2026年10月07日/.test(html), file, 'stale last-updated date');
    check(/id="faq"/.test(html), file, 'missing FAQ');
    check(/class="sources"/.test(html), file, 'missing sources');
    check(/<strong>風險提示：<\/strong>/.test(html), file, 'missing risk label');
    check((html.match(/class="continue-card"/g) || []).length >= 3, file, 'fewer than three continue-learning links');
  }
}

const allHtml = htmlFiles.map(file => fs.readFileSync(file, 'utf8')).join('\n');
const homeHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
check((homeHtml.match(/class="intro-card"/g) || []).length === 6, path.join(root, 'index.html'), 'home intro must contain six cards');
check((homeHtml.match(/class="intro-card"[^>]*><img/g) || []).length === 6, path.join(root, 'index.html'), 'home intro cards must all use images');
check(!homeHtml.includes('class="symbol"'), path.join(root, 'index.html'), 'home intro still contains text symbols');
check((homeHtml.match(/class="platform-name"><img class="platform-logo"/g) || []).length === 3, path.join(root, 'index.html'), 'home platform cards must all use logos');
for (const asset of ['platform-binance.svg', 'platform-okx.svg', 'platform-gate.svg']) {
  check(fs.existsSync(path.join(root, 'assets', asset)), path.join(root, 'index.html'), `missing ${asset}`);
}
for (const file of htmlFiles.filter(file => fs.readFileSync(file, 'utf8').includes('class="platform-cta conversion-cta"'))) {
  check(fs.readFileSync(file, 'utf8').includes('class="cta-platform-logos"'), file, 'conversion CTA is missing platform logo');
}
const refs = {
  Binance: 'https://www.bsmkweb.cc/join?ref=TW1866',
  OKX: 'https://www.mitxcqvwnhj.com/join/TW1866',
  Gate: 'https://www.gatesites.cc/share/VOYUTWFF'
};
for (const [platform, url] of Object.entries(refs)) {
  const count = allHtml.split(url).length - 1;
  check(count > 0, path.join(root, 'index.html'), `${platform} referral URL not found`);
}
for (const match of allHtml.matchAll(/href="(https?:\/\/(?:www\.)?(?:bsmkweb\.cc|mitxcqvwnhj\.com|gatesites\.cc)[^"]*)"/g)) {
  check(Object.values(refs).includes(match[1]), path.join(root, 'index.html'), `unexpected Taiwan referral URL ${match[1]}`);
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
check(sitemapUrls.length === htmlFiles.length - 1, path.join(root, 'sitemap.xml'), `sitemap has ${sitemapUrls.length} URLs for ${htmlFiles.length - 1} non-404 HTML pages`);
check((sitemap.match(/<lastmod>2026-10-07<\/lastmod>/g) || []).length === sitemapUrls.length, path.join(root, 'sitemap.xml'), 'sitemap dates are not current');

console.log(JSON.stringify({html: htmlFiles.length, articles: htmlFiles.filter(file => fs.readFileSync(file, 'utf8').includes('class="article-body"')).length, sitemapUrls: sitemapUrls.length, issues}, null, 2));
process.exitCode = issues.length ? 1 : 0;
