import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const tw=path.resolve(import.meta.dirname,'..');let passed=0;const failures=[];
const check=(ok,msg)=>ok?passed++:failures.push(msg);
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
const read=url=>fs.readFileSync(path.join(tw,url.replace(/^\/tw\//,''),url.endsWith('/')?'index.html':''),'utf8');

execFileSync(process.execPath,[path.join(tw,'tools','qa-v3-batch2-1.mjs')],{stdio:'inherit'});

const hubs={
  '/tw/learn/':['加密貨幣基礎','Bitcoin','USDT','錢包安全','交易基礎','/tw/learn/bitcoin/','/tw/learn/usdt/','/tw/wallets/'],
  '/tw/buy/':['Bitcoin購買','USDT購買','台幣入金','出金','平台購買教學','/tw/buy/how-to-buy-bitcoin-taiwan.html','/tw/buy/how-to-buy-usdt-taiwan.html'],
  '/tw/exchanges/':['Binance','OKX','Gate','register.html','referral-code.html','security.html','deposit.html','withdraw.html'],
  '/tw/exchanges/comparison/':['Binance比較','OKX比較','Gate比較','台灣平台比較','/tw/compare/binance-vs-okx/','/tw/compare/binance-vs-gate/']
};
for(const [url,tokens] of Object.entries(hubs)){
  const html=read(url);for(const token of ['<title>','meta name="description"','<h1','rel="canonical"','BreadcrumbList','ItemList','麵包屑',...tokens])check(html.includes(token),`${url}: missing ${token}`);
}

const expected={binance:['register.html','referral-code.html','kyc.html','security.html','fees.html','deposit.html','spot-trading.html','withdraw.html'],okx:['register.html','referral-code.html','security.html','fees.html','deposit.html','withdraw.html'],gate:['register.html','referral-code.html','security.html','fees/','deposit.html','withdraw.html']};
for(const [key,pages] of Object.entries(expected)){
  const hub=read('/tw/exchanges/');for(const page of pages)check(hub.includes(`/tw/exchanges/${key}/${page}`),`exchange hub missing ${key}/${page}`);
  for(const page of pages){const html=read(`/tw/exchanges/${key}/${page}`);check(html.includes(`data-cluster="conversion-${key}"`),`${key}/${page} missing conversion route`);check(html.includes(`/tw/exchanges/${key}/`),`${key}/${page} missing platform hub link`);}
}

const topicRoutes={bitcoin:['learn/bitcoin/what-is-bitcoin.html','buy/how-to-buy-bitcoin-taiwan.html'],usdt:['learn/usdt/what-is-usdt.html','buy/how-to-buy-usdt-taiwan.html','learn/usdt/trc20-vs-erc20.html'],wallet:['security/crypto-wallet-guide.html','security/hot-wallet-vs-cold-wallet.html','security/seed-phrase-guide.html']};
for(const [key,files] of Object.entries(topicRoutes))for(const file of files)check(fs.readFileSync(path.join(tw,file),'utf8').includes(`data-cluster="${key}"`),`${file}: missing ${key} route`);

const allHtml=walk(tw).filter(x=>x.endsWith('.html'));const rendered=allHtml.map(x=>fs.readFileSync(x,'utf8')).join('\n');
for(const good of ['https://www.bsmkweb.cc/join?ref=TW1866','https://www.mitxcqvwnhj.com/join/TW1866','https://www.gatesites.cc/share/VOYUTWFF'])check(rendered.includes(good),`missing Taiwan referral ${good}`);
for(const bad of ['DS1886','DS1888','VFZMV11YUW'])check(!rendered.includes(bad),`old referral in rendered HTML: ${bad}`);

const logoPages=['/tw/','/tw/exchanges/','/tw/exchanges/comparison/','/tw/exchanges/okx/','/tw/compare/binance-vs-okx/'];
for(const url of logoPages){const html=read(url);check(html.includes('platform-okx.png'),`${url}: OKX logo missing`);}
for(const asset of ['platform-binance.png','platform-okx.png','platform-gate.webp'])check(read('/tw/exchanges/comparison/').includes(asset),`comparison hub missing ${asset}`);
for(const file of allHtml){const html=fs.readFileSync(file,'utf8');if(html.includes('https://www.mitxcqvwnhj.com/join/TW1866'))check(html.includes('platform-okx.png'),`${path.relative(tw,file)}: OKX CTA page missing official logo`);}

let articlePages=0;for(const file of allHtml){const html=fs.readFileSync(file,'utf8');if(!html.includes('"@type":"Article"'))continue;articlePages++;const links=new Set([...html.matchAll(/href="(\/tw\/[^"#?]+)/g)].map(m=>m[1]));check(links.size>=3,`${path.relative(tw,file)}: fewer than 3 internal links`);for(const token of ['<title>','meta name="description"','<h1','rel="canonical"','最後更新','來源'])check(html.includes(token),`${path.relative(tw,file)}: missing ${token}`);}
check(articlePages===48,`Article schema page count changed: ${articlePages}`);
const inventory=JSON.parse(fs.readFileSync(path.join(tw,'v3-batch2-2.json'),'utf8'));check(inventory.uniqueArticleAssets===46,`active unique article count changed: ${inventory.uniqueArticleAssets}`);

const videoHub=read('/tw/videos/');for(const slug of ['bitcoin','usdt','buy-bitcoin','buy-usdt','binance-register','binance-kyc','binance-buy','okx-register','okx-buy','gate-register','gate-buy','account-security','seed-phrase-security'])check(videoHub.includes(`/tw/videos/${slug}/`),`video hub missing ${slug}`);
for(const category of ['新手教學','買幣教學','平台教學','安全教學'])check(videoHub.includes(category),`video category missing ${category}`);

const navSample=read('/tw/');check(navSample.includes('href="/tw/buy/"'),'navigation missing /tw/buy/');check(navSample.includes('href="/tw/exchanges/comparison/"'),'navigation missing comparison hub');
const css=fs.readFileSync(path.join(tw,'assets','site.css'),'utf8');for(const token of ['.hub-jump','.exchange-platform-section','.cluster-route','@media(max-width:560px)'])check(css.includes(token),`CSS missing ${token}`);
check(fs.existsSync(path.join(tw,'v3-batch2-2.json')),'missing V3 Batch 2.2 inventory');

if(failures.length){console.error(`V3 Batch 2.2 QA failed: ${failures.length}`);for(const f of failures)console.error('- '+f);process.exit(1);}console.log(`V3 Batch 2.2 QA: ${passed} checks passed, 0 failed`);
