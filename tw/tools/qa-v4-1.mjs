import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const tw=path.resolve(import.meta.dirname,'..');
const repo=path.resolve(tw,'..');
const read=rel=>fs.readFileSync(path.join(tw,rel),'utf8');
const pages=[
  ['taiwan-virtual-asset-services-act-2026','台灣《虛擬資產服務法》已公布','2026年7月22日','https://law.fsc.gov.tw/LawContent.aspx?id=GL004301'],
  ['us-genius-act-stablecoin-rules-2026','美國 GENIUS Act','2026年8月17日','https://home.treasury.gov/news/press-releases/sb0605'],
  ['fed-rate-hike-september-2026-crypto','聯準會2026年9月升息','2026年9月16日','https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a.htm'],
  ['crypto-etp-in-kind-redemption','美國允許加密ETP實物申贖','2025年7月29日','https://www.sec.gov/newsroom/press-releases/2025-101-sec-permits-kind-creations-redemptions-crypto-etps'],
  ['tether-q4-2025-reserves-attestation','Tether 2025年Q4儲備鑑證','2026年1月30日','https://tether.io/news/tether-delivers-10b-profits-in-2025-6-3b-in-excess-reserves-and-record-141-billion-exposure-in-u-s-treasury-holdings/']
];
let passed=0;const failures=[];const check=(condition,message)=>condition?passed++:failures.push(message);

const parseGraph=html=>{const scripts=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];const values=scripts.map(m=>JSON.parse(m[1]));return values.flatMap(v=>v['@graph']||[v])};
for(const [slug,title,eventDate,source] of pages){
  const rel=`insights/${slug}/index.html`;check(fs.existsSync(path.join(tw,rel)),`${rel} missing`);if(!fs.existsSync(path.join(tw,rel)))continue;
  const html=read(rel);const canonical=`https://www.coinvoyu.com/tw/insights/${slug}/`;
  check(html.includes(`<title>${title}`),`${slug}: title mismatch`);
  check(html.includes(`<h1>${title}`),`${slug}: H1 mismatch`);
  check((html.match(/<h1/g)||[]).length===1,`${slug}: H1 not unique`);
  check(html.includes(`rel="canonical" href="${canonical}"`),`${slug}: canonical mismatch`);
  check(html.includes(`事件日期：${eventDate}`),`${slug}: event date missing`);
  check(html.includes('發布／核實：2026年10月08日'),`${slug}: verification date missing`);
  check(html.includes(`href="${source}"`),`${slug}: primary official source missing`);
  check(html.includes('已確認：')&&html.includes('分析：')&&html.includes('尚待確認：'),`${slug}: evidence status missing`);
  check(html.includes('風險與限制：'),`${slug}: risk limitations missing`);
  check(!html.includes('前往註冊'),`${slug}: information article has registration CTA`);
  check((html.match(/class="continue-card"/g)||[]).length===3,`${slug}: expected 3 next-step links`);
  const graph=parseGraph(html);const news=graph.find(x=>x['@type']==='NewsArticle');const faq=graph.find(x=>x['@type']==='FAQPage');const crumbs=graph.find(x=>x['@type']==='BreadcrumbList');
  check(Boolean(news),`${slug}: NewsArticle missing`);check(news?.url===canonical,`${slug}: NewsArticle URL mismatch`);check(news?.image?.endsWith(`${slug}.webp`),`${slug}: schema image mismatch`);
  check(Boolean(crumbs),`${slug}: BreadcrumbList missing`);check(Boolean(faq),`${slug}: FAQPage missing`);
  for(const q of faq?.mainEntity||[]){check(html.includes(`<h3>${q.name}</h3>`),`${slug}: schema FAQ not visible: ${q.name}`);check(html.includes(`<p>${q.acceptedAnswer.text}</p>`),`${slug}: schema FAQ answer mismatch: ${q.name}`)}
  const cover=path.join(tw,'assets','insights',`${slug}.webp`);check(fs.existsSync(cover),`${slug}: cover missing`);
  if(fs.existsSync(cover)){const dims=execFileSync('identify',['-format','%wx%h',cover],{encoding:'utf8'});check(dims==='1200x675',`${slug}: cover dimensions ${dims}`);check(fs.statSync(cover).size<160000,`${slug}: cover exceeds 160KB`)}
  check(!/[控限][製]/.test(html),`${slug}: incorrect Traditional Chinese variant`);
  for(const internal of ['Batch','施工','占位','待補','DS1886','DS1888','VFZMV11YUW'])check(!html.includes(internal),`${slug}: internal/prohibited term ${internal}`);
}

const hub=read('insights/index.html');check(hub.includes('<h1>加密貨幣熱點解讀</h1>'),'hub H1 missing');check((hub.match(/class="card insight-card/g)||[]).length===7,'hub should render 2 featured + 5 categorized cards');check(!/敬請期待|暫無|製作中/.test(hub),'hub contains empty-state placeholder');
for(const [slug] of pages)check(hub.includes(`/tw/insights/${slug}/`),`hub missing ${slug}`);
const home=read('index.html');check(home.includes('href="/tw/insights/"'),'homepage insights hub link missing');check((home.match(/class="card insight-card/g)||[]).length===3,'homepage should show exactly 3 insights');check(!home.includes('近期討論 Bitcoin ETF'),'homepage old evergreen hotspot placeholder remains');check(home.indexOf('熱點解讀')<home.indexOf('class="section safety-center"'),'homepage hotspot order changed');

for(const [file,id] of [['learn/taiwan-crypto-regulation.html','taiwan-law-insight'],['learn/bitcoin/bitcoin-etf-guide.html','etp-insight'],['learn/bitcoin/why-bitcoin-price-moves.html','fed-insight'],['learn/usdt/is-usdt-safe.html','tether-insight'],['learn/what-is-stablecoin/index.html','genius-insight']])check(read(file).includes(`data-v4-insight="${id}"`),`${file}: contextual backlink missing`);

const sitemap=read('sitemap.xml');const urls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);check(urls.length===99,`sitemap expected 99 URLs, found ${urls.length}`);check(urls.length===new Set(urls).size,'sitemap duplicate URL');check(urls.includes('https://www.coinvoyu.com/tw/insights/'),'sitemap hub missing');for(const [slug] of pages)check(urls.includes(`https://www.coinvoyu.com/tw/insights/${slug}/`),`sitemap missing ${slug}`);
const llms=read('llms.txt');for(const [slug] of pages)check(llms.includes(`https://www.coinvoyu.com/tw/insights/${slug}/`),`llms missing ${slug}`);

// Resolve every local Taiwan href/src in all HTML and assert unique indexable canonicals.
const htmlFiles=[];function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const f=path.join(dir,e.name);if(e.isDirectory())walk(f);else if(e.name.endsWith('.html'))htmlFiles.push(f)}}walk(tw);
const canonicals=[];for(const file of htmlFiles){const html=fs.readFileSync(file,'utf8');for(const m of html.matchAll(/(?:href|src)="(\/tw\/[^"#?]*)/g)){let url=m[1];try{url=decodeURIComponent(url)}catch{}const target=path.join(repo,url.slice(1));const exists=url.endsWith('/')?fs.existsSync(path.join(target,'index.html')):fs.existsSync(target)||fs.existsSync(path.join(target,'index.html'));check(exists,`${path.relative(repo,file)} broken local target ${url}`)}if(!/name="robots"[^>]+noindex/i.test(html)&&!/http-equiv="refresh"/i.test(html)){const c=(html.match(/rel="canonical" href="([^"]+)"/i)||[])[1];if(c?.startsWith('https://www.coinvoyu.com/tw/'))canonicals.push(c)}}
check(canonicals.length===new Set(canonicals).size,'duplicate indexable canonical');

const rendered=htmlFiles.map(f=>fs.readFileSync(f,'utf8')).join('\n');for(const link of ['https://www.bsmkweb.cc/join?ref=TW1866','https://www.mitxcqvwnhj.com/join/TW1866','https://www.gatesites.cc/share/VOYUTWFF'])check(rendered.includes(link),`Taiwan referral missing ${link}`);for(const old of ['DS1886','DS1888','VFZMV11YUW'])check(!rendered.includes(old),`old referral present ${old}`);

execFileSync(process.execPath,[path.join(tw,'tools','build-taiwan-preview.mjs')],{stdio:'inherit'});const out=path.join(repo,'out');check(JSON.stringify(fs.readdirSync(out).sort())===JSON.stringify(['_redirects','index.html','robots.txt','tw']),'preview root boundary changed');check(fs.readFileSync(path.join(out,'robots.txt'),'utf8')===read('config/robots.preview.txt'),'preview robots mismatch');check(!fs.existsSync(path.join(out,'sitemap.xml')),'root sitemap leaked into preview');check(fs.existsSync(path.join(out,'tw','insights','index.html')),'preview insight hub missing');
const status=execFileSync('git',['status','--short'],{cwd:repo,encoding:'utf8'}).trimEnd().split('\n').filter(Boolean);for(const line of status)check(line.slice(3).startsWith('tw/'),'non-Taiwan file modified: '+line);
execFileSync('git',['diff','--check'],{cwd:repo,stdio:'inherit'});
if(failures.length){console.error(`V4.1 QA failed: ${failures.length}`);for(const f of failures)console.error('- '+f);process.exit(1)}
console.log(`V4.1 QA: ${passed} checks passed, 0 failed`);
