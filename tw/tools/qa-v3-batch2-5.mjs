import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const tw=path.resolve(import.meta.dirname,'..');
const repo=path.resolve(tw,'..');
const baseline='5c75659';
let passed=0;const failures=[];
const check=(ok,msg)=>ok?passed++:failures.push(msg);
const read=file=>fs.readFileSync(path.join(tw,file),'utf8');
const old=file=>execFileSync('git',['show',`${baseline}:tw/${file}`],{cwd:repo,encoding:'utf8'});
const head=html=>(html.match(/<head>[\s\S]*?<\/head>/)||[])[0]||'';
const hrefs=html=>[...html.matchAll(/href="([^"]+)"/g)].map(m=>m[1]);
const pages=['index.html','learn/index.html','buy/index.html','exchanges/index.html','exchanges/comparison/index.html'];

execFileSync(process.execPath,[path.join(tw,'tools','qa-v3-batch2-4.mjs')],{stdio:'inherit'});

for(const file of pages){
  const now=read(file),before=old(file);
  check(head(now)===head(before),`${file}: SEO head changed`);
  check(JSON.stringify(hrefs(now).sort())===JSON.stringify(hrefs(before).sort()),`${file}: URL set changed`);
}

const home=read('index.html');
for(const label of ['Bitcoin與USDT是什麼？','第一次如何買加密貨幣？','如何保護帳戶與資產？','接下來可以學什麼？'])check(home.includes(label),`homepage missing ${label}`);

const learn=read('learn/index.html');
for(const label of ['第一次學加密貨幣要先懂什麼？','Bitcoin是什麼？','USDT是什麼？','加密貨幣錢包與帳戶怎麼保護？','現貨交易和合約交易有什麼區別？','加密貨幣錢包是什麼？','如何保護加密貨幣帳戶？'])check(learn.includes(label),`learn Hub missing ${label}`);

const buy=read('buy/index.html');
for(const label of ['新台幣怎麼買加密貨幣？','台灣怎麼買Bitcoin？','台灣怎麼買USDT？','如何選擇加密貨幣交易平台？','第一次買USDT要注意什麼？','USDT怎麼換回台幣？'])check(buy.includes(label),`buy Hub missing ${label}`);

const exchange=read('exchanges/index.html');
const flows={
  Binance:['Binance註冊教學','Binance邀請碼怎麼填？','Binance實名認證（KYC）教學','Binance帳戶安全設定','Binance充值教學','Binance買幣與交易教學','Binance手續費說明','Binance提幣教學'],
  OKX:['OKX註冊教學','OKX邀請碼怎麼填？','OKX帳戶安全設定','OKX充值教學','OKX買幣教學','OKX手續費說明','OKX提幣教學'],
  Gate:['Gate註冊教學','Gate邀請碼怎麼填？','Gate帳戶安全設定','Gate充值教學','Gate買幣教學','Gate手續費說明','Gate提幣教學']
};
for(const [platform,labels] of Object.entries(flows)){
  const positions=labels.map(label=>exchange.indexOf(label));
  check(positions.every(x=>x>=0),`${platform} Hub label missing`);
  check(positions.every((x,i)=>i===0||x>positions[i-1]),`${platform} Hub flow order incorrect`);
}
for(const label of ['如何註冊交易所帳戶？','為什麼要完成實名認證（KYC）？','如何設定2FA與登入保護？','如何把資金充入交易所？','第一次怎麼買加密貨幣？','如何完成現貨交易？','如何安全提幣？'])check(exchange.includes(label),`common operation route missing ${label}`);
for(const short of ['<b>1</b>註冊</a>','<b>2</b>邀請碼</a>','<b>3</b>KYC</a>','<b>3</b>安全</a>','<b>4</b>手續費</a>'])check(!exchange.includes(short),`internal platform label remains: ${short}`);

const comparison=read('exchanges/comparison/index.html');
for(const label of ['Binance和OKX有什麼區別？','Binance和Gate怎麼選擇？','Binance與MAX適合哪些台灣使用者？','Binance、OKX和Gate如何比較？','台灣本地與海外交易所有什麼區別？'])check(comparison.includes(label),`comparison Hub missing ${label}`);

const rendered=pages.map(read).join('\n');
for(const referral of ['https://www.bsmkweb.cc/join?ref=TW1866','https://www.mitxcqvwnhj.com/join/TW1866','https://www.gatesites.cc/share/VOYUTWFF'])check(rendered.includes(referral),`Taiwan referral missing ${referral}`);
for(const oldCode of ['DS1886','DS1888','VFZMV11YUW'])check(!rendered.includes(oldCode),`old referral found ${oldCode}`);
const css=read('assets/site.css');check(css.includes('.learning-step h3,.hub-reading-links a,.route-flow a,.platform-paths li a{min-width:0;overflow-wrap:anywhere}'),'long-label wrapping protection missing');
const manifest=JSON.parse(read('v3-batch2-5.json'));check(manifest.version==='CoinVoyu Taiwan V3 Batch 2.5','V3 Batch 2.5 manifest mismatch');

if(failures.length){console.error(`V3 Batch 2.5 QA failed: ${failures.length}`);for(const f of failures)console.error('- '+f);process.exit(1);}console.log(`V3 Batch 2.5 QA: ${passed} checks passed, 0 failed`);
