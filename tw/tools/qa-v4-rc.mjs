import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';

const tw=path.resolve(import.meta.dirname,'..');
const repo=path.resolve(tw,'..');
const origin='https://www.coinvoyu.com';
const failures=[];let passed=0;
const check=(condition,message)=>condition?passed++:failures.push(message);
const read=rel=>fs.readFileSync(path.join(tw,rel),'utf8');
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{const p=path.join(dir,e.name);return e.isDirectory()?walk(p):[p]});
const htmlFiles=walk(tw).filter(f=>f.endsWith('.html'));
const parseJsonLd=(html,rel)=>[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m,i)=>{try{return JSON.parse(m[1])}catch(e){failures.push(`${rel}: invalid JSON-LD ${i+1}: ${e.message}`);return null}}).filter(Boolean);
const graphTypes=docs=>docs.flatMap(x=>x['@graph']||[x]).map(x=>x['@type']).flat();
const resolveTw=url=>{let decoded=url;try{decoded=decodeURIComponent(url)}catch{}const rel=decoded.replace(/^\/tw\/?/,'');const base=path.join(tw,rel);return decoded.endsWith('/')?path.join(base,'index.html'):fs.existsSync(base)?base:fs.existsSync(path.join(base,'index.html'))?path.join(base,'index.html'):base};

const indexable=[];const canonicals=[];const articlePages=[];const mediaRefs=new Set();let visibleFaqPages=0;let faqSchemaPages=0;
for(const file of htmlFiles){
  const rel=path.relative(tw,file),html=fs.readFileSync(file,'utf8');
  const noindex=/name="robots"[^>]+noindex/i.test(html)||/http-equiv="refresh"/i.test(html);
  if(!noindex){
    indexable.push(file);
    check(/<html lang="zh-TW"/i.test(html),`${rel}: missing zh-TW language`);
    check((html.match(/<title>/gi)||[]).length===1,`${rel}: title missing or duplicated`);
    check(/<meta name="description" content="[^"]+"/i.test(html),`${rel}: meta description missing`);
    check((html.match(/<h1[ >]/gi)||[]).length===1,`${rel}: H1 missing or duplicated`);
    const canonical=(html.match(/<link rel="canonical" href="([^"]+)"/i)||[])[1];
    check(Boolean(canonical),`${rel}: canonical missing`);
    if(canonical){canonicals.push(canonical);check(canonical.startsWith(origin+'/tw/'),`${rel}: canonical outside Taiwan`)}
    const docs=parseJsonLd(html,rel),types=graphTypes(docs);
    check(types.includes('BreadcrumbList')||rel==='index.html',`${rel}: BreadcrumbList missing`);
    if(types.includes('Article')||types.includes('NewsArticle'))articlePages.push(file);
    if(/class="faq-(?:grid|item)|<section[^>]+id="faq"/i.test(html))visibleFaqPages++;
    if(types.includes('FAQPage'))faqSchemaPages++;
    check(!/(控製|限製|繫統|路徑徑)/.test(html),`${rel}: suspicious Traditional Chinese typo`);
    const visible=html.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ');
    check(!/(Batch\s*[0-9]|V[0-9]+\s*Batch|施工中|待補|占位)/i.test(visible),`${rel}: internal development marker visible`);
  }
  for(const m of html.matchAll(/(?:href|src)="(\/tw\/[^"#?]*)/g)){
    const url=m[1];
    if(url.startsWith('/tw/assets/')){
      const target=resolveTw(url);check(fs.existsSync(target),`${rel}: missing asset ${url}`);mediaRefs.add(url);
    } else check(fs.existsSync(resolveTw(url)),`${rel}: broken internal link ${url}`);
  }
  const nav=(html.match(/<nav class="navlinks"[\s\S]*?<\/nav>/)||[])[0];
  if(nav)check(nav.includes('href="/tw/insights/"'),`${rel}: top navigation missing Insights`);
  if(rel.startsWith(`insights${path.sep}`)&&nav)check(nav.includes('href="/tw/insights/" aria-current="page"'),`${rel}: Insights nav state missing`);
}
check(canonicals.length===new Set(canonicals).size,'duplicate indexable canonical');

const sitemap=read('sitemap.xml');
const sitemapUrls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1].replaceAll('&amp;','&'));
check(sitemapUrls.length===98,`expected 98 sitemap URLs, found ${sitemapUrls.length}`);
check(sitemapUrls.length===new Set(sitemapUrls).size,'duplicate sitemap URL');
check(sitemapUrls.includes(origin+'/tw/'),'sitemap missing canonical home');
check(!sitemapUrls.includes(origin+'/tw/index.html'),'sitemap includes duplicate home');
check(canonicals.length===sitemapUrls.length,`canonical/sitemap count differs: ${canonicals.length}/${sitemapUrls.length}`);
for(const url of canonicals)check(sitemapUrls.includes(url),`canonical absent from sitemap: ${url}`);

const videoFiles=walk(path.join(tw,'assets','videos')).filter(f=>/\.(mp4|webm)$/i.test(f));
const videoPages=htmlFiles.filter(f=>f.includes(`${path.sep}videos${path.sep}`)&&/<video\b/i.test(fs.readFileSync(f,'utf8')));
const compatibilityPages=htmlFiles.filter(f=>/noindex,follow/i.test(fs.readFileSync(f,'utf8'))&&/http-equiv="refresh"/i.test(fs.readFileSync(f,'utf8')));
check(videoFiles.length===12,`expected 12 independent video files, found ${videoFiles.length}`);
check(videoPages.length===15,`expected 15 playable video pages, found ${videoPages.length}`);
const hashes=new Map();
for(const file of videoFiles){
  const hash=crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
  check(!hashes.has(hash),`duplicate video file: ${path.basename(file)} = ${path.basename(hashes.get(hash)||'')}`);hashes.set(hash,file);
  const bytes=fs.readFileSync(file);check(bytes.indexOf(Buffer.from('moov'))<bytes.indexOf(Buffer.from('mdat')),`${path.basename(file)}: moov atom is not faststart`);
}
for(const file of videoPages){
  const rel=path.relative(tw,file),html=fs.readFileSync(file,'utf8');
  const source=(html.match(/<source src="([^"]+)" type="video\/mp4"/i)||[])[1];
  check(Boolean(source),`${rel}: missing MP4 source`);if(source)check(fs.existsSync(resolveTw(source)),`${rel}: video source missing ${source}`);
  check(/controls/.test(html)&&/playsinline/.test(html)&&/preload="(?:metadata|none)"/.test(html),`${rel}: playback/mobile loading attributes missing`);
  const docs=parseJsonLd(html,rel),types=graphTypes(docs);check(types.includes('VideoObject'),`${rel}: VideoObject missing`);
  check(/影片來源：/.test(html),`${rel}: source disclosure missing`);
}
const videoHub=read('videos/index.html');
check((videoHub.match(/class="card video-center-card"/g)||[]).length===12,'video Hub card count mismatch');
check(!/href="\/tw\/videos\/gate-/.test(videoHub)&&!/<h2>Gate/.test(videoHub),'Gate video placeholder/category present');
for(const slug of ['okx-internal-transfer','okx-official-support'])check(videoHub.includes(`/tw/videos/${slug}/`),`video Hub missing ${slug}`);
for(const slug of ['bitcoin','binance-register','binance-kyc']){
  const html=read(`videos/${slug}/index.html`);check(/noindex,follow/.test(html)&&/http-equiv="refresh"/.test(html),`${slug}: withdrawn video compatibility page invalid`);
  check(!videoHub.includes(`/tw/videos/${slug}/`),`video Hub still recommends withdrawn ${slug} video`);
}
const playerJs=read('assets/site.js');
check(playerJs.includes("video.dataset.seekMode='buffered-file'"),'Preview byte-range fallback missing');
check(playerJs.includes("video.dataset.seekMode='range'"),'Native byte-range mode missing');

const allHtml=htmlFiles.map(f=>fs.readFileSync(f,'utf8')).join('\n');
for(const old of ['DS1886','DS1888','VFZMV11YUW'])check(!allHtml.includes(old),`old referral remains: ${old}`);
for(const link of ['https://www.bsmkweb.cc/join?ref=TW1866','https://www.mitxcqvwnhj.com/join/TW1866','https://www.gatesites.cc/share/VOYUTWFF'])check(allHtml.includes(link),`Taiwan referral missing: ${link}`);
check(!/返佣\s*\d|手續費優惠\s*\d|註冊立減/.test(allHtml),'unverified promotional claim detected');

for(const logo of ['assets/platform-binance.png','assets/platform-okx.png','assets/platform-gate.webp','assets/coinvoyu-logo.svg','assets/favicon.svg'])check(fs.existsSync(path.join(tw,logo)),`brand asset missing: ${logo}`);
const homepage=read('index.html');
for(const asset of ['platform-binance.png','platform-okx.png','platform-gate.webp'])check(homepage.includes(asset),`homepage platform logo missing ${asset}`);
check((homepage.match(/class="faq-item faq-static"/g)||[]).length===6,'homepage FAQ count changed');
check(!/<details[^>]*>[\s\S]*台灣可以買 Bitcoin 嗎/.test(homepage),'homepage FAQ became collapsible');

for(const page of ['insights/taiwan-virtual-asset-services-act-2026/index.html','insights/us-genius-act-stablecoin-rules-2026/index.html','insights/fed-rate-hike-september-2026-crypto/index.html','insights/crypto-etp-in-kind-redemption/index.html','insights/tether-q4-2025-reserves-attestation/index.html']){
  const html=read(page);check(html.includes('資料核實日期：2026年10月08日'),`${page}: verification date missing`);check(html.includes('已確認：')&&html.includes('分析：')&&html.includes('尚待確認：'),`${page}: fact/analysis boundary missing`);
}
check(read('insights/taiwan-virtual-asset-services-act-2026/index.html').includes('尚未施行；正式施行日期由行政院另定'),'Taiwan law status inaccurate');
check(read('insights/us-genius-act-stablecoin-rules-2026/index.html').includes('不是最終規則'),'GENIUS Act proposal status unclear');
check(read('insights/fed-rate-hike-september-2026-crypto/index.html').includes('3.75%–4.00%'),'FOMC target range missing');
check(read('insights/crypto-etp-in-kind-redemption/index.html').includes('一般投資人仍在證券市場買賣產品股份'),'ETP retail redemption boundary missing');
check(read('insights/tether-q4-2025-reserves-attestation/index.html').includes('與Q4儲備鑑證屬不同文件與查核範圍'),'Tether later-audit distinction missing');

check(read('config/robots.preview.txt')==='User-agent: *\nDisallow: /\n','preview robots changed');
check(/shared\s+root|must be merged/i.test(read('config/robots.production.txt')),'production robots shared-root warning missing');
const llms=read('llms.txt');for(const slug of ['okx-internal-transfer','okx-official-support'])check(llms.includes(`${origin}/tw/videos/${slug}/`),`llms missing ${slug}`);

execFileSync(process.execPath,[path.join(tw,'tools','build-taiwan-preview.mjs')],{stdio:'inherit'});
const outputRoots=fs.readdirSync(path.join(repo,'out')).sort();
check(JSON.stringify(outputRoots)===JSON.stringify(['_redirects','index.html','robots.txt','tw']),'preview output boundary is not isolated');
check(fs.readFileSync(path.join(repo,'out','robots.txt'),'utf8')===read('config/robots.preview.txt'),'rendered preview robots mismatch');
check(!fs.existsSync(path.join(repo,'out','sitemap.xml')),'root sitemap leaked into Taiwan preview');
for(const rel of ['tw/videos/okx-internal-transfer/index.html','tw/videos/okx-official-support/index.html'])check(fs.existsSync(path.join(repo,'out',rel)),`preview output missing ${rel}`);

const inventory={
  generatedAt:'2026-10-08',htmlFiles:htmlFiles.length,indexablePages:indexable.length,articleSchemaPages:articlePages.length,
  sitemapUrls:sitemapUrls.length,videoFiles:videoFiles.length,playableVideoPages:videoPages.length,
  reusedVideoPages:videoPages.length-videoFiles.length,compatibilityPages:compatibilityPages.length,
  pureTextVideoPages:htmlFiles.filter(f=>f.includes(`${path.sep}videos${path.sep}`)&&!f.endsWith(`${path.sep}videos${path.sep}index.html`)&&!/<video\b/i.test(fs.readFileSync(f,'utf8'))&&!/http-equiv="refresh"/i.test(fs.readFileSync(f,'utf8'))).length,
  visibleFaqPages,faqSchemaPages,referencedLocalAssets:mediaRefs.size,
  videoBytes:videoFiles.reduce((n,f)=>n+fs.statSync(f).size,0),largestVideos:videoFiles.map(f=>({file:path.basename(f),bytes:fs.statSync(f).size})).sort((a,b)=>b.bytes-a.bytes).slice(0,5),
  hubs:['/tw/learn/','/tw/buy/','/tw/exchanges/','/tw/exchanges/comparison/','/tw/security/','/tw/articles/','/tw/videos/','/tw/insights/']
};
fs.writeFileSync(path.join(tw,'v4-rc-inventory.json'),JSON.stringify(inventory,null,2)+'\n');

execFileSync('git',['diff','--check'],{cwd:repo,stdio:'inherit'});
const status=execFileSync('git',['status','--porcelain=v1','-z'],{cwd:repo,encoding:'utf8'}).split('\0').filter(Boolean);
for(const entry of status){
  const file=entry.slice(3);
  const branch=execFileSync('git',['branch','--show-current'],{cwd:repo,encoding:'utf8'}).trim();
  const launchScope=branch==='release/coinvoyu-tw-launch-rc'&&(/^[^/]+\.html$/.test(file)||['robots.txt','vercel.json'].includes(file));
  check(file.startsWith('tw/')||launchScope,'file outside approved scope modified: '+entry);
}

if(failures.length){console.error(`V4 RC QA failed: ${failures.length}`);for(const f of failures)console.error('- '+f);console.error(`Passed before failure report: ${passed}`);process.exit(1)}
console.log(`V4 RC QA: ${passed} checks passed, 0 failed; ${indexable.length} indexable pages, ${articlePages.length} article-schema pages, ${videoFiles.length} video files, ${videoPages.length} playable pages.`);
