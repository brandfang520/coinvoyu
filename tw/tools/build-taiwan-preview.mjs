import fs from 'node:fs';
import path from 'node:path';

const repo=path.resolve(import.meta.dirname,'../..');
const source=path.join(repo,'tw');
const output=path.join(repo,'out');
if(path.basename(output)!=='out'||path.dirname(output)!==repo)throw new Error('Unsafe preview output path');
fs.rmSync(output,{recursive:true,force:true});
fs.mkdirSync(output,{recursive:true});
fs.cpSync(source,path.join(output,'tw'),{recursive:true});
fs.copyFileSync(path.join(source,'config','robots.preview.txt'),path.join(output,'robots.txt'));
const redirects=[
  '/tw/buy-crypto/ /tw/buy/ 301',
  '/tw/compare/ /tw/exchanges/comparison/ 301',
  '/tw/videos/binance-buy/ /tw/exchanges/binance/spot-trading.html 301',
  '/tw/videos/binance-withdraw/ /tw/exchanges/binance/withdraw.html 301',
  '/tw/videos/gate-buy/ /tw/exchanges/gate/spot-trading.html 301',
  '/tw/videos/gate-register/ /tw/exchanges/gate/register.html 301',
  '/tw/videos/seed-phrase-security/ /tw/security/seed-phrase-security.html 301',
  '/tw/videos/buy-bitcoin/ /tw/videos/spot/ 301',
  '/tw/videos/buy-usdt/ /tw/buy/how-to-buy-usdt-taiwan.html 301',
  '/tw/videos/usdt/ /tw/learn/usdt/what-is-usdt.html 301',
  '/tw/videos/bitcoin/ /tw/learn/bitcoin/what-is-bitcoin.html 301',
  '/tw/videos/binance-register/ /tw/exchanges/binance/register.html 301',
  '/tw/videos/binance-kyc/ /tw/exchanges/binance/kyc.html 301'
];
fs.writeFileSync(path.join(output,'_redirects'),redirects.join('\n')+'\n');
fs.writeFileSync(path.join(output,'index.html'),'<!doctype html><html lang="zh-TW"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><meta http-equiv="refresh" content="0;url=/tw/"><title>CoinVoyu Taiwan Preview</title></head><body><p><a href="/tw/">前往 CoinVoyu Taiwan 預覽</a></p></body></html>');
const roots=fs.readdirSync(output).sort();
const allowed=['_redirects','index.html','robots.txt','tw'];
if(JSON.stringify(roots)!==JSON.stringify(allowed))throw new Error(`Preview boundary violation: ${roots.join(', ')}`);
console.log(`Built isolated Taiwan preview in ${output}; root entries: ${roots.join(', ')}`);
