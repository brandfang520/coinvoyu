import fs from 'node:fs';
import path from 'node:path';

const tw=path.resolve(import.meta.dirname,'..');
let passed=0;const failures=[];
const check=(ok,msg)=>ok?passed++:failures.push(msg);
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
const read=url=>fs.readFileSync(path.join(tw,url.replace(/^\/tw\//,''),url.endsWith('/')?'index.html':''),'utf8');

const home=read('/tw/');
check((home.match(/class="home-intent-grid"/g)||[]).length===1,'homepage intent grid missing or duplicated');
for(const [href,label] of [['/tw/learn/','我想了解加密貨幣'],['/tw/buy/','我準備購買第一筆加密貨幣'],['/tw/exchanges/','我正在選擇交易平台']]){check(home.includes(`href="${href}"`)&&home.includes(label),`homepage intent missing ${label}`);}
for(const [name,asset,url] of [['Binance','platform-binance.png','https://www.bsmkweb.cc/join?ref=TW1866'],['OKX','platform-okx.png','https://www.mitxcqvwnhj.com/join/TW1866'],['Gate','platform-gate.webp','https://www.gatesites.cc/share/VOYUTWFF']]){check(home.includes(asset),`homepage ${name} logo missing`);check(home.includes(`查看${name}教學`),`homepage ${name} learning entry missing`);check(home.includes(url),`homepage ${name} referral missing`);}
check((home.match(/class="platform-fit"/g)||[]).length===3,'homepage platform suitable-user text must appear three times');

const learn=read('/tw/learn/');check(learn.includes('TOPIC LEARNING HUB'),'learn hub is not identified as Topic Hub');check((learn.match(/class="learning-track"/g)||[]).length===5,'learn hub must contain five learning tracks');for(const token of ['加密貨幣基礎','Bitcoin','USDT','錢包安全','交易基礎'])check(learn.includes(token),`learn hub missing ${token}`);
const buy=read('/tw/buy/');check(buy.includes('FIRST PURCHASE JOURNEY'),'buy hub is not a purchase journey');check((buy.match(/<li><div class="journey-number">/g)||[]).length===5,'buy hub must contain five purchase steps');for(const token of ['準備資金','選擇資產','選擇平台','完成購買','管理與退出'])check(buy.includes(token),`buy hub missing ${token}`);
const exchanges=read('/tw/exchanges/');check(exchanges.includes('CONVERSION DECISION HUB'),'exchange hub is not identified as Conversion Hub');check((exchanges.match(/class="decision-platform-card"/g)||[]).length===3,'exchange hub must contain three platform decision cards');check((exchanges.match(/<a href="\/tw\/exchanges\/binance\//g)||[]).length>=8,'Binance flow is incomplete');check((exchanges.match(/<a href="\/tw\/exchanges\/okx\//g)||[]).length>=6,'OKX flow is incomplete');check((exchanges.match(/<a href="\/tw\/exchanges\/gate\//g)||[]).length>=6,'Gate flow is incomplete');const route=(exchanges.match(/<div class="route-flow">([\s\S]*?)<\/div>/)||[])[1]||'';check((route.match(/<a /g)||[]).length===7,'common operation route is incomplete');
const comparison=read('/tw/exchanges/comparison/');check(comparison.includes('PLATFORM DECISION HUB'),'comparison hub is not identified as Decision Hub');for(const token of ['手續費','功能','安全','適合使用者','學習資源','/tw/compare/binance-vs-okx/','/tw/compare/binance-vs-gate/','/tw/compare/binance-vs-max/','/tw/exchanges/comparison.html','/tw/exchanges/taiwan-exchange-guide.html'])check(comparison.includes(token),`comparison hub missing ${token}`);

for(const [url,html] of [['/tw/learn/',learn],['/tw/buy/',buy],['/tw/exchanges/',exchanges],['/tw/exchanges/comparison/',comparison]])for(const token of ['<title>','meta name="description"','<h1','rel="canonical"','BreadcrumbList','麵包屑','最後更新'])check(html.includes(token),`${url} missing ${token}`);
for(const html of [home,exchanges,comparison])for(const asset of ['platform-binance.png','platform-okx.png','platform-gate.webp'])check(html.includes(asset),`platform identity missing ${asset}`);

const allHtml=walk(tw).filter(x=>x.endsWith('.html'));const rendered=allHtml.map(x=>fs.readFileSync(x,'utf8')).join('\n');
for(const good of ['https://www.bsmkweb.cc/join?ref=TW1866','https://www.mitxcqvwnhj.com/join/TW1866','https://www.gatesites.cc/share/VOYUTWFF'])check(rendered.includes(good),`missing Taiwan referral ${good}`);
for(const bad of ['DS1886','DS1888','VFZMV11YUW'])check(!rendered.includes(bad),`old referral in rendered HTML: ${bad}`);
let articlePages=0;for(const file of allHtml){const html=fs.readFileSync(file,'utf8');if(!html.includes('"@type":"Article"'))continue;articlePages++;const links=new Set([...html.matchAll(/href="(\/tw\/[^"#?]+)/g)].map(m=>m[1]));check(links.size>=3,`${path.relative(tw,file)} has fewer than 3 Taiwan internal links`);}check(articlePages===48,`Article schema page count changed: ${articlePages}`);
for(const file of allHtml){const html=fs.readFileSync(file,'utf8');for(const match of html.matchAll(/(?:href|src)="(\/tw\/[^"?#]*)/g)){let url=match[1];try{url=decodeURIComponent(url)}catch{}let target=path.join(tw,url.slice(4));if(url.endsWith('/'))target=path.join(target,'index.html');check(fs.existsSync(target),`${path.relative(tw,file)} has missing local target ${url}`);}}

const css=fs.readFileSync(path.join(tw,'assets','site.css'),'utf8');for(const token of ['.home-intent-grid','.learning-track-list','.purchase-journey','.decision-platform-grid','.route-flow','.platform-paths','.decision-guide','@media(max-width:560px)'])check(css.includes(token),`CSS missing ${token}`);
const manifest=JSON.parse(fs.readFileSync(path.join(tw,'v3-batch2-3.json'),'utf8'));check(manifest.version==='CoinVoyu Taiwan V3 Batch 2.3','V3 Batch 2.3 manifest version mismatch');check(manifest.articleAssets===46,'unique article asset count changed');
const visible=[home,learn,buy,exchanges,comparison].join('\n');for(const bad of ['页面','进入','链接','教学','注册','比较','选择','维度','台湾本地与'])check(!visible.includes(bad),`simplified copy remains: ${bad}`);

if(failures.length){console.error(`V3 Batch 2.3 QA failed: ${failures.length}`);for(const f of failures)console.error('- '+f);process.exit(1);}console.log(`V3 Batch 2.3 QA: ${passed} checks passed, 0 failed`);
