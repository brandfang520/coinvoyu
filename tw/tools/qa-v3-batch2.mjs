import fs from 'node:fs';
import path from 'node:path';

const tw=path.resolve(import.meta.dirname,'..');
const origin='https://www.coinvoyu.com';
const manifest=JSON.parse(fs.readFileSync(path.join(tw,'v3-batch2.json'),'utf8'));
let passed=0;const failures=[];
function check(ok,label){if(ok)passed++;else failures.push(label)}
function fileFor(url){return path.join(tw,url.replace(/^\/tw\//,'')+(url.endsWith('/')?'index.html':''))}
function text(file){return fs.readFileSync(file,'utf8')}
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}

check(manifest.version==='CoinVoyu Taiwan V3 Batch 2','manifest version');
check(manifest.baseline==='CoinVoyu Taiwan V3 Batch 1','manifest baseline');
check(manifest.pages.length===18,'18 requested article URLs');
check(manifest.videoPages.length===8,'8 platform video directions');

const platformByUrl=url=>url.includes('/binance/')?'binance':url.includes('/okx/')?'okx':url.includes('/gate/')?'gate':null;
const expected={binance:'https://www.bsmkweb.cc/join?ref=TW1866',okx:'https://www.mitxcqvwnhj.com/join/TW1866',gate:'https://www.gatesites.cc/share/VOYUTWFF'};
for(const url of manifest.pages){
  const file=fileFor(url);check(fs.existsSync(file),`${url} exists`);if(!fs.existsSync(file))continue;const html=text(file);
  for(const [needle,name] of [['<title>','title'],['name="description"','meta description'],['<h1>','H1'],['rel="canonical"','canonical'],['BreadcrumbList','breadcrumb schema'],['FAQPage','FAQ schema'],['資料來源','sources'],['風險提示','risk'],['接下來可以看','continue learning']])check(html.includes(needle),`${url} ${name}`);
  check(html.includes(`href="${origin+url}"`)||html.includes(`url":"${origin+url}"`),`${url} exact canonical`);
  check((html.match(/href="\/tw\//g)||[]).length>=3,`${url} >=3 Taiwan internal links`);
  check(!/DS1886|DS1888|VFZMV11YUW/.test(html),`${url} no main-site referral code`);
  const platform=platformByUrl(url);
  if(platform && !url.endsWith('/security.html')){
    check(html.includes(expected[platform]),`${url} correct ${platform} CTA`);
    for(const [other,link] of Object.entries(expected))if(other!==platform)check(!html.includes(link),`${url} no wrong ${other} CTA`);
  }
  if(url.includes('/security/')||url.includes('regulation')||url.includes('can-taiwan'))check(!Object.values(expected).some(x=>html.includes(x)),`${url} information/safety page has no referral CTA`);
}

for(const url of manifest.videoPages){
  const file=fileFor(url);check(fs.existsSync(file),`${url} video page exists`);if(!fs.existsSync(file))continue;const html=text(file);
  for(const [needle,name] of [['<title>','title'],['<h1>','H1'],['來源','source'],['相關教學','related learning'],['rel="canonical"','canonical'],['BreadcrumbList','breadcrumb schema']])check(html.includes(needle),`${url} ${name}`);
  check(/poster="\/tw\/assets\//.test(html)||/<img[^>]+src="\/tw\/assets\//.test(html),`${url} cover`);
  check(html.includes('<video')||html.includes('前往官方教學資源'),`${url} playback or verified official resource`);
}

const home=text(path.join(tw,'index.html'));
for(const logo of ['/tw/assets/platform-binance.png','/tw/assets/platform-okx.png','/tw/assets/platform-gate.webp'])check(home.includes(logo),`home official logo ${logo}`);
for(const cover of ['15.webp','05.webp','11.webp','04.webp','17.webp','16.webp'])check(home.includes(`/tw/assets/covers/${cover}`),`home learning image ${cover}`);
check((home.match(/class="platform-card"/g)||[]).length===3,'home has three platform cards');
check((home.match(/class="platform-logo"/g)||[]).length===3,'home has three platform logos');

for(const [key,links] of Object.entries({binance:['security.html','deposit.html','withdraw.html','spot-trading.html'],okx:['security.html','deposit.html','withdraw.html'],gate:['security.html','deposit.html','withdraw.html']})){
  const html=text(path.join(tw,'exchanges',key,'index.html'));
  for(const link of links)check(html.includes(`/tw/exchanges/${key}/${link}`),`${key} hub links ${link}`);
}

for(const [old,newUrl] of [['security/crypto-scams/index.html','/tw/security/crypto-scam-guide.html'],['security/account-security/index.html','/tw/security/account-security.html'],['exchanges/binance/safety/index.html','/tw/exchanges/binance/security.html']]){
  const html=text(path.join(tw,old));check(html.includes('noindex,follow'),`${old} noindex`);check(html.includes(newUrl),`${old} redirect target`);
}

const allHtml=walk(tw).filter(x=>x.endsWith('.html'));
for(const file of allHtml){const html=text(file);check(!/DS1886|DS1888|VFZMV11YUW/.test(html),`${path.relative(tw,file)} no forbidden code`);check(!/platform-(binance|okx|gate)\.svg/.test(html),`${path.relative(tw,file)} no obsolete SVG logo`);}

const sitemap=text(path.join(tw,'sitemap.xml'));
for(const url of [...manifest.pages,...manifest.videoPages])check(sitemap.includes(`<loc>${origin}${url}</loc>`),`sitemap ${url}`);

const css=text(path.join(tw,'assets','site.css'));
check(/@media\s*\(max-width:\s*(?:850|560)px\)/.test(css),'mobile breakpoints');
check(css.includes('overflow-x:auto'),'responsive tables scroll');
check(css.includes('max-width:100%'),'responsive media sizing');

// Resolve all local links and media references. Query strings/fragments are ignored.
for(const file of allHtml){const html=text(file);for(const m of html.matchAll(/(?:href|src)="(\/tw\/[^"#?]*)/g)){const url=m[1];if(!url||url==='/tw/')continue;let decoded=url;try{decoded=decodeURIComponent(url)}catch{}let target=path.join(tw,decoded.slice(4));if(decoded.endsWith('/'))target=path.join(target,'index.html');check(fs.existsSync(target),`${path.relative(tw,file)} local target ${url}`);}}

console.log(`V3 Batch 2 QA: ${passed} checks passed, ${failures.length} failed`);
if(failures.length){for(const x of failures.slice(0,120))console.error(`FAIL ${x}`);process.exit(1)}
