import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const tw=path.resolve(import.meta.dirname,'..');
let passed=0;const failures=[];
const check=(ok,msg)=>ok?passed++:failures.push(msg);
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
const read=url=>fs.readFileSync(path.join(tw,url.replace(/^\/tw\//,''),url.endsWith('/')?'index.html':''),'utf8');
const assets={Binance:'platform-binance.png',OKX:'platform-okx.png',Gate:'platform-gate.webp'};
const referrals={Binance:'https://www.bsmkweb.cc/join?ref=TW1866',OKX:'https://www.mitxcqvwnhj.com/join/TW1866',Gate:'https://www.gatesites.cc/share/VOYUTWFF'};

execFileSync(process.execPath,[path.join(tw,'tools','qa-v3-batch2-3.mjs')],{stdio:'inherit'});

for(const asset of Object.values(assets))check(fs.existsSync(path.join(tw,'assets',asset)),`missing official asset ${asset}`);
check(!fs.existsSync(path.join(tw,'assets','platform-okx.svg')),'obsolete hand-built OKX SVG still exists');
const okxGeometry=execFileSync('convert',[path.join(tw,'assets','platform-okx.png'),'-alpha','on','-trim','-format','%wx%h+%X+%Y','info:'],{encoding:'utf8'}).trim();
check(okxGeometry==='192x192++32++32',`OKX shared canvas mismatch: ${okxGeometry}`);

const critical=['/tw/','/tw/exchanges/','/tw/exchanges/comparison/','/tw/exchanges/binance/','/tw/exchanges/okx/','/tw/exchanges/gate/','/tw/compare/','/tw/compare/binance-vs-okx/','/tw/compare/binance-vs-gate/'];
for(const url of critical){const html=read(url);for(const [name,asset] of Object.entries(assets))check(html.includes(asset),`${url} missing ${name} official logo`);check(!html.includes('platform-okx.svg'),`${url} references obsolete OKX SVG`);}

const allHtml=walk(tw).filter(f=>f.endsWith('.html'));
for(const file of allHtml){
  const html=fs.readFileSync(file,'utf8');
  for(const match of html.matchAll(/<div class="platform-name">([\s\S]*?)<\/div>/g))for(const [name,asset] of Object.entries(assets))if(match[1].includes(name))check(match[1].includes(asset),`${path.relative(tw,file)} has text-only ${name} platform-name`);
  for(const match of html.matchAll(/<a class="footer-platform-link"[^>]*>([\s\S]*?)<\/a>/g))for(const [name,asset] of Object.entries(assets))if(match[1].includes(name))check(match[1].includes(asset),`${path.relative(tw,file)} footer ${name} logo mismatch`);
  for(const [name,url] of Object.entries(referrals))if(html.includes(url))check(html.includes(assets[name]),`${path.relative(tw,file)} ${name} CTA lacks matching logo`);
}
const rendered=allHtml.map(f=>fs.readFileSync(f,'utf8')).join('\n');
for(const url of Object.values(referrals))check(rendered.includes(url),`Taiwan referral missing: ${url}`);
for(const old of ['DS1886','DS1888','VFZMV11YUW'])check(!rendered.includes(old),`old referral found: ${old}`);
check(!rendered.includes('platform-okx.svg'),'rendered HTML still references obsolete OKX SVG');

const css=fs.readFileSync(path.join(tw,'assets','site.css'),'utf8');
for(const token of ['.platform-logo{display:block;width:46px;height:46px','box-sizing:border-box;object-fit:contain','border:1px solid #e2e8f0','.platform-name{display:flex;align-items:center;gap:12px','.footer-platform-logo{display:block;width:22px;height:22px','@media(max-width:560px)'])check(css.includes(token),`shared logo CSS missing ${token}`);
const source=JSON.parse(fs.readFileSync(path.join(tw,'assets','platform-logos-sources.json'),'utf8'));check(source.okx.source==='https://www.okx.com/favicon.ico','OKX official source metadata mismatch');
const manifest=JSON.parse(fs.readFileSync(path.join(tw,'v3-batch2-4.json'),'utf8'));check(manifest.version==='CoinVoyu Taiwan V3 Batch 2.4','V3 Batch 2.4 manifest mismatch');check(manifest.contentChanged===false&&manifest.urlsChanged===false&&manifest.seoChanged===false&&manifest.referralsChanged===false,'brand-only scope manifest mismatch');

if(failures.length){console.error(`V3 Batch 2.4 QA failed: ${failures.length}`);for(const f of failures)console.error('- '+f);process.exit(1);}console.log(`V3 Batch 2.4 QA: ${passed} checks passed, 0 failed`);
