import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const tw=path.resolve(import.meta.dirname,'..');
const repo=path.resolve(tw,'..');
let passed=0;const failures=[];const check=(ok,msg)=>ok?passed++:failures.push(msg);
const read=rel=>fs.readFileSync(path.join(tw,rel),'utf8');
const newPages=['exchanges/okx/buy-crypto.html','exchanges/okx/spot-trading.html','exchanges/gate/buy-crypto.html','exchanges/gate/spot-trading.html'];
const faqPages=['buy-crypto/twd-buy-crypto/index.html','buy-crypto/withdraw-to-bank/index.html','learn/crypto-beginner-guide/index.html','learn/spot-vs-futures/index.html','compare/binance-vs-gate/index.html','compare/binance-vs-okx/index.html','compare/binance-vs-max/index.html'];

// Batch 3.1 intentionally adds article assets and replaces two legacy Hubs,
// so historical fixed-count assertions are not reused here. The current
// regression checks below validate the preserved Hubs, links and referrals.
for(const rel of ['index.html','learn/index.html','buy/index.html','exchanges/index.html','exchanges/comparison/index.html']){
  const html=read(rel);
  for(const token of ['<title>','meta name="description"','<h1','rel="canonical"'])check(html.includes(token),`${rel}: Hub SEO shell changed`);
}
for(const token of ['CONVERSION DECISION HUB','decision-platform-card','route-flow','platform-paths'])check(read('exchanges/index.html').includes(token),`exchange Hub structure missing ${token}`);

for(const rel of newPages){
  const html=read(rel);const scripts=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  check(scripts.length===1,`${rel}: expected one JSON-LD block`);
  let data;try{data=JSON.parse(scripts[0]?.[1]||'')}catch{data=null}
  const graph=data?.['@graph']||[];
  for(const type of ['Article','FAQPage','BreadcrumbList'])check(graph.some(x=>x['@type']===type),`${rel}: missing ${type}`);
  check(/<title>[^<]+<\/title>/.test(html),`${rel}: title missing`);
  check(/name="description"/.test(html),`${rel}: meta missing`);
  check(/<h1>[^<]+<\/h1>/.test(html),`${rel}: H1 missing`);
  const title=(html.match(/<title>([^<]+)<\/title>/)||[])[1]?.replace(/｜CoinVoyu 台灣$/,'');
  const h1=(html.match(/<h1>([^<]+)<\/h1>/)||[])[1];
  check(title===h1,`${rel}: title/H1 mismatch`);
  check(html.includes(`rel="canonical" href="https://www.coinvoyu.com/tw/${rel}"`),`${rel}: canonical mismatch`);
  check(/最後更新：2026年10月08日/.test(html),`${rel}: update date missing`);
  check(/資料來源與核對範圍/.test(html),`${rel}: sources missing`);
  check(/風險提示/.test(html),`${rel}: risk notice missing`);
  check((html.match(/platform-cta conversion-cta/g)||[]).length===1,`${rel}: CTA count must be one`);
  const expectedReferral=rel.includes('/okx/')?'https://www.mitxcqvwnhj.com/join/TW1866':'https://www.gatesites.cc/share/VOYUTWFF';
  check((html.match(new RegExp(expectedReferral.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'g'))||[]).length===1,`${rel}: Taiwan referral mismatch`);
  check(!/DS1886|DS1888|VFZMV11YUW/.test(html),`${rel}: old referral present`);
  const visible=html.replace(/<script[\s\S]*?<\/script>/gi,'').replace(/(?:href|src)="[^"]+"/g,'').replace(/<[^>]+>/g,' ');
  check(!/(说明|现货|交易对|订单|市场|数量|网络|审核|删除|浏览器|点击|订阅|钱包|助记词|为准|支持|依赖|联系|计划|错误|复制|设置|账户|身份认证|简体|原创|预计|购买|转换|资料|页面|进入|选择|风险|费用|价格|用户|服务|地区|台湾|继续|实际)/.test(visible),`${rel}: obvious Simplified Chinese remains`);
  check(!/(控製|限製|繫統|路径|取决|条件|报价|远端|验证码|站内|網絡|界面)/.test(visible),`${rel}: incorrect Traditional Chinese remains`);
  check(!/(沒有合適的台灣站既有操作影片|不使用其他平台畫面冒充|素材尚未|模板生成|施工說明|待確認|占位)/.test(visible),`${rel}: internal implementation note remains`);
  check(rel.includes('buy-crypto')?/如何取得資產|買幣管道|買幣路徑/.test(visible):/交易對|市價單|限價單|訂單簿/.test(visible),`${rel}: search intent is not explicit`);
}

for(const rel of faqPages){
  const html=read(rel);const script=(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)||[])[1];let data;try{data=JSON.parse(script)}catch{data=null}
  const nodes=(data?.['@graph']||[]).filter(x=>x['@type']==='FAQPage');
  const visible=[...html.matchAll(/<details class="faq-item"><summary>([\s\S]*?)<\/summary><p>([\s\S]*?)<\/p><\/details>/g)];
  check(nodes.length===1,`${rel}: FAQPage count ${nodes.length}`);
  check(nodes[0]?.mainEntity?.length===visible.length,`${rel}: FAQ schema/visible count mismatch`);
  const visibleFaq=visible.map(m=>({q:m[1].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim(),a:m[2].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim()}));
  const schemaFaq=(nodes[0]?.mainEntity||[]).map(x=>({q:x.name,a:x.acceptedAnswer?.text}));
  check(JSON.stringify(schemaFaq)===JSON.stringify(visibleFaq),`${rel}: FAQ schema text differs from visible FAQ`);
}

const sitemap=read('sitemap.xml');
const urls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
check(urls.includes('https://www.coinvoyu.com/tw/'),'sitemap missing /tw/');
check(!urls.includes('https://www.coinvoyu.com/tw/index.html'),'sitemap includes /tw/index.html');
check(urls.length===new Set(urls).size,'sitemap contains duplicates');
for(const rel of newPages)check(urls.includes('https://www.coinvoyu.com/tw/'+rel),'sitemap missing '+rel);
for(const alias of ['/tw/buy-crypto/','/tw/compare/'])check(!urls.includes('https://www.coinvoyu.com'+alias),'sitemap includes legacy Hub '+alias);

const llms=read('llms.txt');
const aliases=['/tw/buy-crypto/buy-bitcoin-taiwan/','/tw/buy-crypto/buy-usdt-taiwan/','/tw/learn/what-is-usdt/','/tw/buy-crypto/usdt-to-twd/','/tw/learn/what-is-bitcoin/','/tw/wallets/hot-vs-cold-wallet/','/tw/learn/trc20-vs-erc20/','/tw/security/crypto-scams/','/tw/security/account-security/','/tw/exchanges/binance/register/','/tw/exchanges/binance/referral-code/','/tw/exchanges/binance/fees/','/tw/exchanges/binance/safety/','/tw/exchanges/binance/kyc/','/tw/exchanges/okx/register/','/tw/exchanges/okx/referral-code/','/tw/exchanges/okx/fees/','/tw/exchanges/gate/register/','/tw/exchanges/gate/referral-code/'];
for(const alias of aliases)check(!llms.includes('https://www.coinvoyu.com'+alias),`llms legacy alias remains ${alias}`);
for(const m of llms.matchAll(/https:\/\/www\.coinvoyu\.com(\/tw\/[^)\s]+)/g)){
  const url=m[1];const local=path.join(repo,url.slice(1));const exists=url.endsWith('/')?fs.existsSync(path.join(local,'index.html')):fs.existsSync(local)||fs.existsSync(path.join(local,'index.html'));
  check(exists,`llms canonical target missing ${url}`);
}

for(const [rel,target] of [['buy-crypto/index.html','/tw/buy/'],['compare/index.html','/tw/exchanges/comparison/']]){const html=read(rel);check(/noindex/.test(html),`${rel}: noindex missing`);check(html.includes(`http-equiv="refresh" content="0;url=${target}"`),`${rel}: fallback redirect missing`);check(html.includes(`href="https://www.coinvoyu.com${target}"`),`${rel}: canonical target missing`)}
for(const rel of ['videos/auth/index.html','videos/official/index.html','videos/passkey/index.html']){const url='/tw/'+rel.replace(/index\.html$/,'');check(read('videos/index.html').includes(`href="${url}"`),`${url}: not linked from video Hub`);check(read('exchanges/okx/security.html').includes(`href="${url}"`),`${url}: not linked from OKX security`)}

const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?walk(path.join(dir,entry.name)):[path.join(dir,entry.name)]);
const rendered=walk(tw).filter(file=>file.endsWith('.html')).map(file=>fs.readFileSync(file,'utf8')).join('\n');
for(const referral of ['https://www.bsmkweb.cc/join?ref=TW1866','https://www.mitxcqvwnhj.com/join/TW1866','https://www.gatesites.cc/share/VOYUTWFF'])check(rendered.includes(referral),`referral missing ${referral}`);
for(const old of ['DS1886','DS1888','VFZMV11YUW'])check(!rendered.includes(old),`old code in rendered HTML: ${old}`);

execFileSync(process.execPath,[path.join(tw,'tools','build-taiwan-preview.mjs')],{stdio:'inherit'});
const out=path.join(repo,'out');
check(read('config/robots.preview.txt')===fs.readFileSync(path.join(out,'robots.txt'),'utf8'),'preview robots mismatch');
check(fs.readFileSync(path.join(out,'robots.txt'),'utf8').includes('Disallow: /'),'preview must be noindex via robots');
check(read('config/robots.production.txt').includes('Allow: /tw/'),'production Taiwan robots fragment missing');
check(JSON.stringify(fs.readdirSync(out).sort())===JSON.stringify(['_redirects','index.html','robots.txt','tw']),'preview root contains non-Taiwan artifacts');
check(!fs.existsSync(path.join(out,'sitemap.xml')),'main-site sitemap leaked into preview root');
check(!fs.existsSync(path.join(out,'crypto-etp-explained.html')),'main-site page leaked into preview root');

// Internal links and local media resolve after URL decoding.
const htmlFiles=walk(tw).filter(file=>file.endsWith('.html')).sort();
for(const file of htmlFiles){const html=fs.readFileSync(file,'utf8');for(const m of html.matchAll(/(?:href|src)="(\/tw\/[^"#?]*)/g)){let url=m[1];try{url=decodeURIComponent(url)}catch{}const local=path.join(repo,url.slice(1));const exists=url.endsWith('/')?fs.existsSync(path.join(local,'index.html')):fs.existsSync(local)||fs.existsSync(path.join(local,'index.html'));check(exists,`${path.relative(repo,file)}: broken local asset ${url}`)}}

execFileSync('git',['diff','--check'],{cwd:repo,stdio:'inherit'});
if(failures.length){console.error(`V3 Batch 3.1 QA failed: ${failures.length}`);for(const failure of failures)console.error('- '+failure);process.exit(1)}
console.log(`V3 Batch 3.1 QA: ${passed} checks passed, 0 failed`);
