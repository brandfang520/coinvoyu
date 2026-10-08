import fs from 'node:fs';
import path from 'node:path';

const tw=path.resolve(import.meta.dirname,'..');
const repo=path.resolve(tw,'..');
const failures=[];let passed=0;
const check=(condition,message)=>{if(condition)passed++;else failures.push(message)};
const read=rel=>fs.readFileSync(path.join(tw,rel),'utf8');
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{const p=path.join(dir,e.name);return e.isDirectory()?walk(p):[p]});
const htmlFiles=walk(tw).filter(f=>f.endsWith('.html'));
const leafVideoPages=htmlFiles.filter(f=>f.includes(`${path.sep}videos${path.sep}`)&&!f.endsWith(`${path.sep}videos${path.sep}index.html`));
const playable=leafVideoPages.filter(f=>/<video\b/i.test(fs.readFileSync(f,'utf8')));
const videoFiles=walk(path.join(tw,'assets','videos')).filter(f=>f.endsWith('.mp4'));
const legacy=['binance-buy','binance-withdraw','gate-buy','gate-register','seed-phrase-security','buy-bitcoin','buy-usdt','usdt'];
const oldCodes=['DS1886','DS1888','VFZMV11YUW'];
const referrals=['https://www.bsmkweb.cc/join?ref=TW1866','https://www.mitxcqvwnhj.com/join/TW1866','https://www.gatesites.cc/share/VOYUTWFF'];

check(videoFiles.length===12,`expected 12 independent MP4 files, found ${videoFiles.length}`);
check(playable.length===16,`expected 16 playable video pages, found ${playable.length}`);
for(const file of playable){
  const html=fs.readFileSync(file,'utf8');
  const rel=path.relative(tw,file);
  check((html.match(/<video\b/gi)||[]).length===1,`${rel}: expected one video player`);
  check((html.match(/"@type"\s*:\s*"VideoObject"/g)||[]).length===1,`${rel}: expected one VideoObject`);
  const src=(html.match(/<source\s+src="([^"]+)"/i)||[])[1];
  check(Boolean(src),`${rel}: missing video source`);
  if(src?.startsWith('/tw/'))check(fs.existsSync(path.join(repo,decodeURIComponent(src.slice(1)))),`${rel}: missing media ${src}`);
  check(/controls/.test(html)&&/playsinline/.test(html),`${rel}: missing mobile playback attributes`);
}
for(const slug of legacy){
  const html=read(`videos/${slug}/index.html`);
  check(!/<video\b/i.test(html),`${slug}: legacy page still has player`);
  check(!/VideoObject/.test(html),`${slug}: legacy page has false VideoObject`);
  check(/noindex,follow/.test(html)&&/http-equiv="refresh"/.test(html),`${slug}: missing compatibility redirect metadata`);
}

const hub=read('videos/index.html');
check((hub.match(/class="card video-center-card"/g)||[]).length===12,'video hub must show 12 unique playable cards');
const hubMain=(hub.match(/<main[\s\S]*?<\/main>/)||[''])[0];
check(!/href="\/tw\/videos\/gate-/.test(hubMain)&&!/<h2>Gate/.test(hubMain),'video hub exposes a Gate video category or card');
check(!/(敬請期待|影片製作中|暫無影片|空播放器|占位卡)/.test(hub),'video hub contains placeholder language');
check(!/VideoObject/.test(hub),'collection hub must not contain VideoObject');
for(const slug of ['okx-c2c-buy','okx-anti-phishing']){
  check(hub.includes(`/tw/videos/${slug}/`),`hub missing ${slug}`);
  check(read(`videos/${slug}/index.html`).includes('影片來源：OKX官方教學素材'),`${slug}: missing source disclosure`);
}

const allHtml=htmlFiles.map(f=>fs.readFileSync(f,'utf8')).join('\n');
check(!/Batch 4 新增/.test(allHtml),'visible Batch 4 marker remains');
for(const code of oldCodes)check(!new RegExp(code).test(allHtml),`old referral ${code} remains in HTML`);
for(const url of referrals)check(allHtml.includes(url),`Taiwan referral missing: ${url}`);
check(read('security/index.html').includes('<small>平台安全</small>'),'security Hub reader label missing');

const sitemap=read('sitemap.xml');
const locs=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
check(locs.length===new Set(locs).size,'sitemap contains duplicates');
check(locs.includes('https://www.coinvoyu.com/tw/'),'sitemap missing canonical home');
check(!locs.includes('https://www.coinvoyu.com/tw/index.html'),'sitemap includes duplicate home URL');
for(const slug of legacy)check(!locs.includes(`https://www.coinvoyu.com/tw/videos/${slug}/`),`sitemap includes legacy ${slug}`);
for(const slug of ['okx-c2c-buy','okx-anti-phishing'])check(locs.includes(`https://www.coinvoyu.com/tw/videos/${slug}/`),`sitemap missing ${slug}`);

for(const file of htmlFiles){
  const html=fs.readFileSync(file,'utf8');
  for(const href of [...html.matchAll(/href="(\/tw\/[^"?#]*)/g)].map(m=>m[1])){
    if(href.startsWith('/tw/assets/'))continue;
    const raw=href.replace(/^\/tw\/?/,'');
    const candidates=raw.endsWith('/')?[path.join(tw,raw,'index.html')]:raw.endsWith('.html')?[path.join(tw,raw)]:[path.join(tw,raw),path.join(tw,raw,'index.html'),path.join(tw,raw+'.html')];
    check(candidates.some(fs.existsSync),`${path.relative(tw,file)}: broken internal link ${href}`);
  }
}

check(read('assets/site.css').includes('.video-module video{aspect-ratio:16/9;object-fit:contain}'),'video aspect-ratio safeguard missing');
check(read('config/robots.preview.txt')==='User-agent: *\nDisallow: /\n','preview robots changed');
check(/must be merged|shared root/i.test(read('config/robots.production.txt')),'production robots shared-root warning missing');
const outputRoots=fs.existsSync(path.join(repo,'out'))?fs.readdirSync(path.join(repo,'out')).sort():[];
check(JSON.stringify(outputRoots)===JSON.stringify(['_redirects','index.html','robots.txt','tw']),'preview output boundary is not isolated');
check(read('index.html').includes('faq-static')&&(read('index.html').match(/class="faq-item faq-static"/g)||[]).length===6,'homepage static FAQ regressed');
check(!/<details/.test(read('index.html')),'homepage FAQ is collapsible again');

if(failures.length){
  console.error(`V3 Batch 3.3 QA failed: ${failures.length}`);
  for(const f of failures)console.error('- '+f);
  process.exit(1);
}
console.log(`V3 Batch 3.3 QA: ${passed} checks passed, 0 failed; ${videoFiles.length} files, ${playable.length} playable pages, ${locs.length} sitemap URLs.`);
