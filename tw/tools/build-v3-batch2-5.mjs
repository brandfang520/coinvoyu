import fs from 'node:fs';
import path from 'node:path';

const tw=path.resolve(import.meta.dirname,'..');
const update=(file,replacements)=>{
  const target=path.join(tw,file);
  let html=fs.readFileSync(target,'utf8');
  for(const [from,to,expected=1] of replacements){
    const count=html.split(from).length-1;
    if(count!==expected)throw new Error(`${file}: expected ${expected} occurrence(s) of ${from}, found ${count}`);
    html=html.replaceAll(from,to);
  }
  fs.writeFileSync(target,html);
};

update('index.html',[
  ['<h3>認識資產</h3>','<h3>Bitcoin與USDT是什麼？</h3>'],
  ['<h3>理解路徑</h3>','<h3>第一次如何買加密貨幣？</h3>'],
  ['<h3>安全操作</h3>','<h3>如何保護帳戶與資產？</h3>'],
  ['<h3>持續學習</h3>','<h3>接下來可以學什麼？</h3>']
]);

update('learn/index.html',[
  ['<h2>加密貨幣基礎</h2>','<h2>第一次學加密貨幣要先懂什麼？</h2>'],
  ['>Bitcoin是什麼<span>閱讀</span>','>Bitcoin是什麼？<span>閱讀</span>',2],
  ['>USDT是什麼<span>閱讀</span>','>USDT是什麼？<span>閱讀</span>',2],
  ['>台灣加密貨幣法規<span>閱讀</span>','>台灣買賣加密貨幣合法嗎？<span>閱讀</span>'],
  ['<h2>Bitcoin</h2>','<h2>Bitcoin是什麼？</h2>'],
  ['>台灣怎麼買Bitcoin<span>閱讀</span>','>台灣怎麼買Bitcoin？<span>閱讀</span>'],
  ['>銀行買Bitcoin流程<span>閱讀</span>','>台灣銀行可以直接買Bitcoin嗎？<span>閱讀</span>'],
  ['<h2>USDT</h2>','<h2>USDT是什麼？</h2>'],
  ['>台灣怎麼買USDT<span>閱讀</span>','>台灣怎麼買USDT？<span>閱讀</span>'],
  ['>TRC20與ERC20<span>閱讀</span>','>TRC20與ERC20有什麼區別？<span>閱讀</span>'],
  ['<h2>錢包安全</h2>','<h2>加密貨幣錢包與帳戶怎麼保護？</h2>'],
  ['>錢包是什麼<span>閱讀</span>','>加密貨幣錢包是什麼？<span>閱讀</span>'],
  ['>冷錢包與熱錢包<span>閱讀</span>','>冷錢包與熱錢包有什麼區別？<span>閱讀</span>'],
  ['>助記詞安全<span>閱讀</span>','>為什麼不能洩露助記詞？<span>閱讀</span>'],
  ['>帳戶安全<span>閱讀</span>','>如何保護加密貨幣帳戶？<span>閱讀</span>'],
  ['<h2>交易基礎</h2>','<h2>現貨交易和合約交易有什麼區別？</h2>'],
  ['>現貨與合約差異<span>閱讀</span>','>現貨交易和合約交易有什麼區別？<span>閱讀</span>'],
  ['>交易所安全<span>閱讀</span>','>加密貨幣交易所安全嗎？<span>閱讀</span>'],
  ['>平台手續費與比較<span>閱讀</span>','>如何比較交易所手續費？<span>閱讀</span>']
]);

update('buy/index.html',[
  ['>台幣買幣流程<span>閱讀</span>','>新台幣怎麼買加密貨幣？<span>閱讀</span>'],
  ['>銀行可以直接買Bitcoin嗎<span>閱讀</span>','>台灣銀行可以直接買Bitcoin嗎？<span>閱讀</span>'],
  ['>選擇Bitcoin<span>閱讀</span>','>台灣怎麼買Bitcoin？<span>閱讀</span>'],
  ['>選擇USDT<span>閱讀</span>','>台灣怎麼買USDT？<span>閱讀</span>'],
  ['>比較平台<span>閱讀</span>','>如何選擇加密貨幣交易平台？<span>閱讀</span>'],
  ['>Binance<span>閱讀</span>','>查看Binance平台教學<span>閱讀</span>'],
  ['>OKX<span>閱讀</span>','>查看OKX平台教學<span>閱讀</span>'],
  ['>Gate<span>閱讀</span>','>查看Gate平台教學<span>閱讀</span>'],
  ['>Binance現貨交易<span>閱讀</span>','>Binance怎麼買現貨？<span>閱讀</span>'],
  ['>第一次買Bitcoin影片<span>閱讀</span>','>第一次買Bitcoin流程是什麼？<span>閱讀</span>'],
  ['>買USDT影片導讀<span>閱讀</span>','>第一次買USDT要注意什麼？<span>閱讀</span>'],
  ['>錢包安全<span>閱讀</span>','>加密貨幣錢包怎麼選擇？<span>閱讀</span>'],
  ['>USDT換回台幣<span>閱讀</span>','>USDT怎麼換回台幣？<span>閱讀</span>'],
  ['>出金到銀行<span>閱讀</span>','>加密貨幣怎麼出金到銀行？<span>閱讀</span>']
]);

update('exchanges/index.html',[
  ['<span>註冊帳戶</span>','<span>如何註冊交易所帳戶？</span>'],
  ['<span>完成KYC</span>','<span>為什麼要完成實名認證（KYC）？</span>'],
  ['<span>設定安全</span>','<span>如何設定2FA與登入保護？</span>'],
  ['<span>充值</span>','<span>如何把資金充入交易所？</span>'],
  ['<span>買幣</span>','<span>第一次怎麼買加密貨幣？</span>'],
  ['<span>交易</span>','<span>如何完成現貨交易？</span>'],
  ['<span>提幣</span>','<span>如何安全提幣？</span>'],
  ['<li><a href="/tw/exchanges/binance/register.html"><b>1</b>註冊</a></li><li><a href="/tw/exchanges/binance/referral-code.html"><b>2</b>邀請碼</a></li><li><a href="/tw/exchanges/binance/kyc.html"><b>3</b>KYC</a></li><li><a href="/tw/exchanges/binance/security.html"><b>4</b>安全</a></li><li><a href="/tw/exchanges/binance/fees.html"><b>5</b>手續費</a></li><li><a href="/tw/exchanges/binance/deposit.html"><b>6</b>充值</a></li><li><a href="/tw/exchanges/binance/spot-trading.html"><b>7</b>買幣與交易</a></li><li><a href="/tw/exchanges/binance/withdraw.html"><b>8</b>提幣</a></li>',
   '<li><a href="/tw/exchanges/binance/register.html"><b>1</b>Binance註冊教學</a></li><li><a href="/tw/exchanges/binance/referral-code.html"><b>2</b>Binance邀請碼怎麼填？</a></li><li><a href="/tw/exchanges/binance/kyc.html"><b>3</b>Binance實名認證（KYC）教學</a></li><li><a href="/tw/exchanges/binance/security.html"><b>4</b>Binance帳戶安全設定</a></li><li><a href="/tw/exchanges/binance/deposit.html"><b>5</b>Binance充值教學</a></li><li><a href="/tw/exchanges/binance/spot-trading.html"><b>6</b>Binance買幣與交易教學</a></li><li><a href="/tw/exchanges/binance/fees.html"><b>7</b>Binance手續費說明</a></li><li><a href="/tw/exchanges/binance/withdraw.html"><b>8</b>Binance提幣教學</a></li>'],
  ['<li><a href="/tw/exchanges/okx/register.html"><b>1</b>註冊</a></li><li><a href="/tw/exchanges/okx/referral-code.html"><b>2</b>邀請碼</a></li><li><a href="/tw/exchanges/okx/security.html"><b>3</b>安全</a></li><li><a href="/tw/exchanges/okx/fees.html"><b>4</b>手續費</a></li><li><a href="/tw/exchanges/okx/deposit.html"><b>5</b>充值</a></li><li><a href="/tw/videos/okx-buy/"><b>6</b>買幣教學</a></li><li><a href="/tw/exchanges/okx/withdraw.html"><b>7</b>提幣</a></li>',
   '<li><a href="/tw/exchanges/okx/register.html"><b>1</b>OKX註冊教學</a></li><li><a href="/tw/exchanges/okx/referral-code.html"><b>2</b>OKX邀請碼怎麼填？</a></li><li><a href="/tw/exchanges/okx/security.html"><b>3</b>OKX帳戶安全設定</a></li><li><a href="/tw/exchanges/okx/deposit.html"><b>4</b>OKX充值教學</a></li><li><a href="/tw/videos/okx-buy/"><b>5</b>OKX買幣教學</a></li><li><a href="/tw/exchanges/okx/fees.html"><b>6</b>OKX手續費說明</a></li><li><a href="/tw/exchanges/okx/withdraw.html"><b>7</b>OKX提幣教學</a></li>'],
  ['<li><a href="/tw/exchanges/gate/register.html"><b>1</b>註冊</a></li><li><a href="/tw/exchanges/gate/referral-code.html"><b>2</b>邀請碼</a></li><li><a href="/tw/exchanges/gate/security.html"><b>3</b>安全</a></li><li><a href="/tw/exchanges/gate/fees/"><b>4</b>手續費</a></li><li><a href="/tw/exchanges/gate/deposit.html"><b>5</b>充值</a></li><li><a href="/tw/videos/gate-buy/"><b>6</b>買幣教學</a></li><li><a href="/tw/exchanges/gate/withdraw.html"><b>7</b>提幣</a></li>',
   '<li><a href="/tw/exchanges/gate/register.html"><b>1</b>Gate註冊教學</a></li><li><a href="/tw/exchanges/gate/referral-code.html"><b>2</b>Gate邀請碼怎麼填？</a></li><li><a href="/tw/exchanges/gate/security.html"><b>3</b>Gate帳戶安全設定</a></li><li><a href="/tw/exchanges/gate/deposit.html"><b>4</b>Gate充值教學</a></li><li><a href="/tw/videos/gate-buy/"><b>5</b>Gate買幣教學</a></li><li><a href="/tw/exchanges/gate/fees/"><b>6</b>Gate手續費說明</a></li><li><a href="/tw/exchanges/gate/withdraw.html"><b>7</b>Gate提幣教學</a></li>']
]);

update('exchanges/comparison/index.html',[
  ['>Binance vs OKX<span>閱讀</span>','>Binance和OKX有什麼區別？<span>閱讀</span>'],
  ['>Binance vs Gate<span>閱讀</span>','>Binance和Gate怎麼選擇？<span>閱讀</span>'],
  ['>Binance vs MAX<span>閱讀</span>','>Binance與MAX適合哪些台灣使用者？<span>閱讀</span>'],
  ['>三平台完整比較<span>閱讀</span>','>Binance、OKX和Gate如何比較？<span>閱讀</span>'],
  ['>台灣本地與海外平台<span>閱讀</span>','>台灣本地與海外交易所有什麼區別？<span>閱讀</span>']
]);

fs.writeFileSync(path.join(tw,'v3-batch2-5.json'),JSON.stringify({
  version:'CoinVoyu Taiwan V3 Batch 2.5',
  scope:'Taiwan-only display copy',
  updated:'2026-10-08',
  pages:['/tw/','/tw/learn/','/tw/buy/','/tw/exchanges/','/tw/exchanges/comparison/'],
  changed:['visible hub labels','visible entry labels','visible operation-route labels'],
  unchanged:['article body','URL','Title','Meta description','Canonical','referral links','Hub structure']
},null,2)+'\n');
console.log('Built Taiwan V3 Batch 2.5 user-facing Hub labels.');
