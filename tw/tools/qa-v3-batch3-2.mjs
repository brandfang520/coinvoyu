import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const tw=path.resolve(import.meta.dirname,'..');
const repo=path.resolve(tw,'..');
let passed=0;const failures=[];const check=(ok,msg)=>ok?passed++:failures.push(msg);
const read=rel=>fs.readFileSync(path.join(tw,rel),'utf8');
const strip=s=>s.replace(/<script[\s\S]*?<\/script>/gi,'').replace(/<style[\s\S]*?<\/style>/gi,'').replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
const inlineText=s=>s.replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
const pages=[
  ['learn/bitcoin/why-bitcoin-price-moves.html','Bitcoin價格為什麼會漲跌？影響比特幣價格的關鍵因素',['供需','宏觀經濟','ETF資金流','減半','槓桿','清算','成交量']],
  ['learn/bitcoin/bitcoin-etf-guide.html','Bitcoin ETF是什麼？現貨與期貨產品差在哪？',['商品信託型ETP','期貨ETF','管理費','追蹤差異','托管','台灣投資人']],
  ['learn/usdt/is-usdt-safe.html','USDT安全嗎？脫鉤、儲備與凍結風險完整解析',['不是銀行美元存款','儲備報告','脫鉤','凍結','假USDT','錯誤網路']],
  ['learn/crypto-exchange-guide.html','加密貨幣交易所是什麼？CEX與DEX新手完整指南',['中心化交易所','去中心化交易所','現貨','合約','身分驗證','網路費','詐騙']],
  ['security/after-buying-crypto-storage.html','買幣後怎麼保管？交易所、熱錢包與冷錢包比較',['交易所托管','自行保管','熱錢包','冷錢包','私鑰','助記詞','小額測試']]
];

function jsonLd(html){return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]))}
function nodes(html){return jsonLd(html).flatMap(x=>x['@graph']||[x])}

for(const [rel,title,tokens] of pages){
  const html=read(rel);const visible=strip(html);const graph=nodes(html);
  check((html.match(/<h1>/g)||[]).length===1,`${rel}: H1 must be unique`);
  check(html.includes(`<h1>${title}</h1>`),`${rel}: H1 mismatch`);
  check(html.includes(`<title>${title}｜CoinVoyu 台灣</title>`),`${rel}: title mismatch`);
  check(html.includes(`rel="canonical" href="https://www.coinvoyu.com/tw/${rel}"`),`${rel}: canonical mismatch`);
  for(const type of ['Article','FAQPage','BreadcrumbList'])check(graph.filter(x=>x['@type']===type).length===1,`${rel}: ${type} missing or duplicate`);
  const faqNode=graph.find(x=>x['@type']==='FAQPage');
  const visibleFaq=[...html.matchAll(/<details class="faq-item"><summary>([\s\S]*?)<\/summary><p>([\s\S]*?)<\/p><\/details>/g)].map(m=>({q:strip(m[1]),a:strip(m[2])}));
  const schemaFaq=(faqNode?.mainEntity||[]).map(x=>({q:x.name,a:x.acceptedAnswer?.text}));
  check(visibleFaq.length>=4,`${rel}: insufficient visible FAQ`);
  check(JSON.stringify(visibleFaq)===JSON.stringify(schemaFaq),`${rel}: visible FAQ and schema differ`);
  for(const token of tokens)check(visible.includes(token),`${rel}: missing topic coverage ${token}`);
  for(const token of ['作者／編輯','最後更新','資料來源與核對範圍','風險提示','接下來可以看'])check(visible.includes(token),`${rel}: missing template item ${token}`);
  check((html.match(/class="continue-card"/g)||[]).length>=3,`${rel}: fewer than three next-step links`);
  check(!/platform-cta|前往註冊|data-link-type="referral"/.test(html),`${rel}: information article contains registration CTA`);
  check(!/DS1886|DS1888|VFZMV11YUW/.test(html),`${rel}: old referral present`);
  check(!/(控製|限製|繫統|路径|取决|条件|报价|网络|界面|钱包|选择|目标|无法|围绕|测试|备份|恢复|签署|用户|页面|风险|价格|数据|交易对)/.test(visible),`${rel}: Simplified or incorrect Traditional Chinese remains`);
  check(!/(施工說明|模板生成|素材尚未|待確認|占位|不使用其他平台畫面冒充)/.test(visible),`${rel}: internal implementation note remains`);
  check((html.match(/<table>/g)||[]).length>=1,`${rel}: comparison/data table missing`);
  check((html.match(/target="_blank" rel="noopener noreferrer"/g)||[]).length>=3,`${rel}: official sources missing`);
}

const home=read('index.html');const homeNodes=nodes(home);const homeFaq=home.match(/<div class="faq-grid faq-static-grid"[\s\S]*?<\/div>/)?.[0]||'';
check(home.includes('data-v3-batch3-2="home-faq"'),'homepage static FAQ marker missing');
check((homeFaq.match(/<article class="faq-item faq-static">/g)||[]).length===6,'homepage must show six FAQ cards');
check(!/<details|<summary/.test(homeFaq),'homepage FAQ still uses accordion');
const expectedQuestions=['台灣可以買 Bitcoin 嗎？','買 Bitcoin 一定要很多錢嗎？','USDT 是美元嗎？','加密貨幣交易所有哪些？','台灣可以使用海外交易所嗎？','買幣之後一定要放在交易所嗎？'];
for(const q of expectedQuestions)check(homeFaq.includes(`<h3>${q}</h3>`),`homepage FAQ missing ${q}`);
const homeFaqNodes=homeNodes.filter(x=>x['@type']==='FAQPage');check(homeFaqNodes.length===1,'homepage FAQPage missing or duplicate');
const homeVisible=[...homeFaq.matchAll(/<article class="faq-item faq-static"><h3>([\s\S]*?)<\/h3><p>([\s\S]*?)<\/p><\/article>/g)].map(m=>({q:inlineText(m[1]),a:inlineText(m[2])}));
const homeSchema=(homeFaqNodes[0]?.mainEntity||[]).map(x=>({q:x.name,a:x.acceptedAnswer?.text}));
check(JSON.stringify(homeVisible)===JSON.stringify(homeSchema),'homepage visible FAQ and schema differ');
for(const token of ['從第一次了解','一條看得懂、走得完的學習路線','第一次接觸，可以從這裡開始','常見加密貨幣交易平台','影片教學','熱點解讀','safety-center','最新教學'])check(home.includes(token),`homepage section changed or missing ${token}`);

const hubLinks={
  'learn/index.html':['/tw/learn/bitcoin/why-bitcoin-price-moves.html','/tw/learn/bitcoin/bitcoin-etf-guide.html','/tw/learn/usdt/is-usdt-safe.html','/tw/learn/crypto-exchange-guide.html'],
  'learn/bitcoin/index.html':['/tw/learn/bitcoin/why-bitcoin-price-moves.html','/tw/learn/bitcoin/bitcoin-etf-guide.html'],
  'learn/usdt/index.html':['/tw/learn/usdt/is-usdt-safe.html'],
  'buy/index.html':['/tw/security/after-buying-crypto-storage.html'],
  'security/index.html':['/tw/security/after-buying-crypto-storage.html'],
  'exchanges/index.html':['/tw/learn/crypto-exchange-guide.html']
};
for(const [rel,links] of Object.entries(hubLinks)){const html=read(rel);for(const link of links)check(html.includes(`href="${link}"`),`${rel}: missing Hub link ${link}`)}
const backlinks={
  'learn/bitcoin/what-is-bitcoin.html':['/tw/learn/bitcoin/why-bitcoin-price-moves.html','/tw/learn/bitcoin/bitcoin-etf-guide.html'],
  'buy/how-to-buy-bitcoin-taiwan.html':['/tw/learn/bitcoin/why-bitcoin-price-moves.html','/tw/security/after-buying-crypto-storage.html'],
  'learn/usdt/what-is-usdt.html':['/tw/learn/usdt/is-usdt-safe.html'],
  'learn/usdt/trc20-vs-erc20.html':['/tw/learn/usdt/is-usdt-safe.html'],
  'buy/how-to-buy-usdt-taiwan.html':['/tw/learn/usdt/is-usdt-safe.html'],
  'learn/spot-vs-futures/index.html':['/tw/learn/crypto-exchange-guide.html'],
  'security/crypto-wallet-guide.html':['/tw/security/after-buying-crypto-storage.html'],
  'security/hot-wallet-vs-cold-wallet.html':['/tw/security/after-buying-crypto-storage.html'],
  'security/seed-phrase-guide.html':['/tw/security/after-buying-crypto-storage.html']
};
for(const [rel,links] of Object.entries(backlinks)){const html=read(rel);for(const link of links)check(html.includes(`href="${link}"`),`${rel}: missing backlink ${link}`)}

const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?walk(path.join(dir,entry.name)):[path.join(dir,entry.name)]);
const htmlFiles=walk(tw).filter(file=>file.endsWith('.html')).sort();
const indexable=[];
for(const file of htmlFiles){
  const html=fs.readFileSync(file,'utf8');
  for(const m of html.matchAll(/(?:href|src)="(\/tw\/[^"#?]*)/g)){let url=m[1];try{url=decodeURIComponent(url)}catch{}const local=path.join(repo,url.slice(1));const exists=url.endsWith('/')?fs.existsSync(path.join(local,'index.html')):fs.existsSync(local)||fs.existsSync(path.join(local,'index.html'));check(exists,`${path.relative(repo,file)}: broken local target ${url}`)}
  if(/name="robots"[^>]+noindex/i.test(html)||/http-equiv="refresh"/i.test(html))continue;
  const canonical=(html.match(/rel="canonical" href="([^"]+)"/i)||[])[1];if(canonical?.startsWith('https://www.coinvoyu.com/tw/'))indexable.push(canonical);
}
check(indexable.length===new Set(indexable).size,'duplicate indexable canonical found');
const sitemap=read('sitemap.xml');const sitemapUrls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
// V4.1 adds the Insights Hub and five canonical event explainers to the
// 93-URL Batch 3.3 baseline.
check(sitemapUrls.length===99,`sitemap expected 99 URLs after V4.1 insights expansion, found ${sitemapUrls.length}`);
check(sitemapUrls.length===new Set(sitemapUrls).size,'sitemap duplicate URL found');
check(sitemapUrls.includes('https://www.coinvoyu.com/tw/'),'sitemap homepage canonical missing');
check(!sitemapUrls.includes('https://www.coinvoyu.com/tw/index.html'),'sitemap duplicate homepage alias present');
for(const [rel] of pages)check(sitemapUrls.includes(`https://www.coinvoyu.com/tw/${rel}`),`sitemap missing ${rel}`);
const llms=read('llms.txt');
for(const [rel] of pages)check(llms.includes(`https://www.coinvoyu.com/tw/${rel}`),`llms.txt missing ${rel}`);

const rendered=htmlFiles.map(file=>fs.readFileSync(file,'utf8')).join('\n');
for(const referral of ['https://www.bsmkweb.cc/join?ref=TW1866','https://www.mitxcqvwnhj.com/join/TW1866','https://www.gatesites.cc/share/VOYUTWFF'])check(rendered.includes(referral),`Taiwan referral missing ${referral}`);
for(const old of ['DS1886','DS1888','VFZMV11YUW'])check(!rendered.includes(old),`old main-site referral present ${old}`);

execFileSync(process.execPath,[path.join(tw,'tools','build-taiwan-preview.mjs')],{stdio:'inherit'});
const out=path.join(repo,'out');
check(JSON.stringify(fs.readdirSync(out).sort())===JSON.stringify(['_redirects','index.html','robots.txt','tw']),'preview root contains non-Taiwan artifacts');
check(fs.readFileSync(path.join(out,'robots.txt'),'utf8')===read('config/robots.preview.txt'),'preview robots mismatch');
check(!fs.existsSync(path.join(out,'sitemap.xml')),'main-site sitemap leaked into preview root');
const changed=execFileSync('git',['status','--short'],{cwd:repo,encoding:'utf8'}).trimEnd().split('\n').filter(Boolean);
for(const line of changed){const rel=line.slice(3);check(rel.startsWith('tw/'),'non-Taiwan file modified: '+rel)}
execFileSync('git',['diff','--check'],{cwd:repo,stdio:'inherit'});

if(failures.length){console.error(`V3 Batch 3.2 QA failed: ${failures.length}`);for(const failure of failures)console.error('- '+failure);process.exit(1)}
console.log(`V3 Batch 3.2 QA: ${passed} checks passed, 0 failed`);
