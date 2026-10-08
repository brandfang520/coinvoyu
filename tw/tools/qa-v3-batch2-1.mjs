import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const tw=path.resolve(import.meta.dirname,'..');
let passed=0; const failures=[];
const check=(ok,msg)=>ok?passed++:failures.push(msg);
const read=url=>fs.readFileSync(path.join(tw,url.replace(/^\/tw\//,''),url.endsWith('/')?'index.html':''),'utf8');

execFileSync(process.execPath,[path.join(tw,'tools','qa-v3-batch2.mjs')],{stdio:'inherit'});

const logoPages=['/tw/','/tw/exchanges/','/tw/compare/','/tw/exchanges/binance/','/tw/exchanges/okx/','/tw/exchanges/gate/','/tw/compare/binance-vs-okx/','/tw/compare/binance-vs-gate/'];
for(const url of logoPages){const html=read(url);for(const [name,asset] of [['Binance','platform-binance.png'],['OKX','platform-okx.png'],['Gate','platform-gate.webp']])check(html.includes(asset)||(!url.includes('compare')&&!url.includes('exchanges/')&&url!=='/tw/'),`${url}: missing ${name} official logo`);}

for(const file of walk(tw).filter(x=>x.endsWith('.html'))){
  const html=fs.readFileSync(file,'utf8');
  for(const match of html.matchAll(/<div class="platform-name">([\s\S]*?)<\/div>/g)){
    const block=match[1]; const key=/Binance/.test(block)?'platform-binance.png':/OKX/.test(block)?'platform-okx.png':/Gate/.test(block)?'platform-gate.webp':'';
    check(!key||block.includes(key),`${path.relative(tw,file)}: legacy platform-name without official logo`);
  }
  if(html.includes('<footer class="footer">')){
    const footer=html.slice(html.indexOf('<footer class="footer">'));
    if(footer.includes('/tw/exchanges/binance/')||footer.includes('/tw/exchanges/okx/')||footer.includes('/tw/exchanges/gate/'))for(const asset of ['platform-binance.png','platform-okx.png','platform-gate.webp'])check(footer.includes(asset),`${path.relative(tw,file)}: footer missing ${asset}`);
  }
}

const videos=['bitcoin','usdt','buy-bitcoin','buy-usdt','binance-register','binance-kyc','binance-buy','okx-register','okx-buy','gate-register','gate-buy','account-security','seed-phrase-security'];
const hub=read('/tw/videos/');
for(const slug of videos){const url=`/tw/videos/${slug}/`;const html=read(url);check(hub.includes(url),`video hub missing ${url}`);for(const token of ['<title>','<h1','rel="canonical"','application/ld+json','來源','相關教學'])check(html.includes(token),`${url}: missing ${token}`);check(!/本影片為CoinVoyu原創|CoinVoyu原創影片/.test(html),`${url}: claims CoinVoyu original`);}

const topics={
  '/tw/learn/bitcoin/':['/tw/learn/bitcoin/what-is-bitcoin.html','/tw/buy/how-to-buy-bitcoin-taiwan.html','Bitcoin市場基礎','id="faq"'],
  '/tw/learn/usdt/':['/tw/learn/usdt/what-is-usdt.html','/tw/buy/how-to-buy-usdt-taiwan.html','/tw/learn/usdt/trc20-vs-erc20.html','USDT安全重點','id="faq"'],
  '/tw/wallets/':['/tw/security/crypto-wallet-guide.html','/tw/security/hot-wallet-vs-cold-wallet.html','/tw/security/seed-phrase-guide.html','/tw/security/seed-phrase-security.html','私鑰','id="faq"']
};
for(const [url,tokens] of Object.entries(topics)){const html=read(url);for(const token of ['<title>','meta name="description"','<h1','rel="canonical"','application/ld+json','麵包屑','資料來源',...tokens])check(html.includes(token),`${url}: missing ${token}`);}

const conversion={binance:['register.html','referral-code.html','kyc.html','security.html','deposit.html','withdraw.html','spot-trading.html'],okx:['register.html','referral-code.html','security.html','deposit.html','withdraw.html'],gate:['register.html','referral-code.html','security.html','deposit.html','withdraw.html']};
for(const [key,pages] of Object.entries(conversion)){const html=read(`/tw/exchanges/${key}/`);for(const page of pages)check(html.includes(`/tw/exchanges/${key}/${page}`),`${key} hub missing ${page}`);}

const rendered=walk(tw).filter(x=>x.endsWith('.html')).map(x=>fs.readFileSync(x,'utf8')).join('\n');
for(const bad of ['DS1886','DS1888','VFZMV11YUW'])check(!rendered.includes(bad),`old referral found: ${bad}`);
for(const good of ['https://www.bsmkweb.cc/join?ref=TW1866','https://www.mitxcqvwnhj.com/join/TW1866','https://www.gatesites.cc/share/VOYUTWFF'])check(rendered.includes(good),`Taiwan referral missing: ${good}`);

const css=fs.readFileSync(path.join(tw,'assets','site.css'),'utf8');
for(const token of ['@media(max-width:850px)','@media(max-width:560px)','.platform-logo','.footer-platform-logo','.conversion-cluster-links'])check(css.includes(token),`responsive CSS missing ${token}`);
check(fs.existsSync(path.join(tw,'v3-batch2-1.json')),'missing V3 Batch 2.1 manifest');

if(failures.length){console.error(`V3 Batch 2.1 QA failed: ${failures.length}`);for(const f of failures)console.error('- '+f);process.exit(1);}console.log(`V3 Batch 2.1 QA: ${passed} checks passed, 0 failed`);
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
