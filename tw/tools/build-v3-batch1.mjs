import fs from 'node:fs';
import path from 'node:path';

const tw = path.resolve(import.meta.dirname, '..');
const origin = 'https://www.coinvoyu.com';
const date = '2026年10月07日';
const iso = '2026-10-07T00:00:00+08:00';
const disclosure = '利益揭露：本頁部分平台連結可能包含推薦連結。若你透過相關連結完成符合條件的操作，CoinVoyu 可能獲得推薦獎勵。';

const platforms = {
  binance:{name:'Binance',code:'TW1866',url:'https://www.bsmkweb.cc/join?ref=TW1866',hub:'/tw/exchanges/binance/',logo:'/tw/assets/platform-binance.png'},
  okx:{name:'OKX',code:'TW1866',url:'https://www.mitxcqvwnhj.com/join/TW1866',hub:'/tw/exchanges/okx/',logo:'/tw/assets/platform-okx.png'},
  gate:{name:'Gate',code:'VOYUTWFF',url:'https://www.gatesites.cc/share/VOYUTWFF',hub:'/tw/exchanges/gate/',logo:'/tw/assets/platform-gate.webp'}
};

const migrations = new Map([
  ['/tw/exchanges/binance/register/','/tw/exchanges/binance/register.html'],
  ['/tw/exchanges/binance/referral-code/','/tw/exchanges/binance/referral-code.html'],
  ['/tw/exchanges/binance/fees/','/tw/exchanges/binance/fees.html'],
  ['/tw/exchanges/binance/kyc/','/tw/exchanges/binance/kyc.html'],
  ['/tw/exchanges/okx/register/','/tw/exchanges/okx/register.html'],
  ['/tw/exchanges/okx/referral-code/','/tw/exchanges/okx/referral-code.html'],
  ['/tw/exchanges/okx/fees/','/tw/exchanges/okx/fees.html'],
  ['/tw/exchanges/gate/register/','/tw/exchanges/gate/register.html'],
  ['/tw/exchanges/gate/referral-code/','/tw/exchanges/gate/referral-code.html'],
  ['/tw/learn/what-is-bitcoin/','/tw/learn/bitcoin/what-is-bitcoin.html'],
  ['/tw/buy-crypto/buy-bitcoin-taiwan/','/tw/buy/how-to-buy-bitcoin-taiwan.html'],
  ['/tw/learn/what-is-usdt/','/tw/learn/usdt/what-is-usdt.html'],
  ['/tw/buy-crypto/buy-usdt-taiwan/','/tw/buy/how-to-buy-usdt-taiwan.html'],
  ['/tw/learn/trc20-vs-erc20/','/tw/learn/usdt/trc20-vs-erc20.html'],
  ['/tw/wallets/hot-vs-cold-wallet/','/tw/security/hot-wallet-vs-cold-wallet.html'],
  ['/tw/buy-crypto/usdt-to-twd/','/tw/buy/usdt-to-twd.html']
]);

const sourceFiles = new Map([
  ['/tw/exchanges/binance/register/','exchanges/binance/register/index.html'],
  ['/tw/exchanges/binance/referral-code/','exchanges/binance/referral-code/index.html'],
  ['/tw/exchanges/binance/fees/','exchanges/binance/fees/index.html'],
  ['/tw/exchanges/binance/kyc/','exchanges/binance/kyc/index.html'],
  ['/tw/exchanges/okx/register/','exchanges/okx/register/index.html'],
  ['/tw/exchanges/okx/referral-code/','exchanges/okx/referral-code/index.html'],
  ['/tw/exchanges/okx/fees/','exchanges/okx/fees/index.html'],
  ['/tw/exchanges/gate/register/','exchanges/gate/register/index.html'],
  ['/tw/exchanges/gate/referral-code/','exchanges/gate/referral-code/index.html'],
  ['/tw/learn/what-is-bitcoin/','learn/what-is-bitcoin/index.html'],
  ['/tw/buy-crypto/buy-bitcoin-taiwan/','buy-crypto/buy-bitcoin-taiwan/index.html'],
  ['/tw/learn/what-is-usdt/','learn/what-is-usdt/index.html'],
  ['/tw/buy-crypto/buy-usdt-taiwan/','buy-crypto/buy-usdt-taiwan/index.html'],
  ['/tw/learn/trc20-vs-erc20/','learn/trc20-vs-erc20/index.html'],
  ['/tw/wallets/hot-vs-cold-wallet/','wallets/hot-vs-cold-wallet/index.html'],
  ['/tw/buy-crypto/usdt-to-twd/','buy-crypto/usdt-to-twd/index.html']
]);

const chars = {'册':'冊','确':'確','认':'認','会':'會','区':'區','状':'狀','态':'態','响':'響','链':'鏈','属':'屬','启':'啟','码':'碼','复':'複','险':'險','挡':'擋','办':'辦','网':'網','络':'絡','测':'測','试':'試','费':'費','骤':'驟','币':'幣','么':'麼','页':'頁','户':'戶','号':'號','验':'驗','显':'顯','务':'務','实':'實','际':'際','审':'審','层':'層','类':'類','额':'額','间':'間','应':'應','证':'證','资':'資','传':'傳','开':'開','决':'決','银':'銀','转':'轉','较':'較','录':'錄','图':'圖','视':'視','频':'頻','题':'題','经':'經','还':'還','补':'補','设':'設','换':'換','条':'條','终':'終','绑':'綁','为':'為','议':'議','销':'銷','于':'於','识':'識','个':'個','时':'時','优':'優','奖':'獎','权':'權','现':'現','单':'單','买':'買','卖':'賣','两':'兩','别':'別','础':'礎','级':'級','对':'對','须':'須','订':'訂','进':'進','场':'場','动':'動','价':'價','称':'稱','数':'數','选':'選','择':'擇','余':'餘','关':'關','当':'當','后':'後','产':'產','汇':'匯','点':'點','并':'併','联':'聯','阶':'階','领':'領','预':'預','计':'計','来':'來','电':'電','邮':'郵','国':'國','护':'護','驾':'駕','无':'無','败':'敗','这':'這','处':'處','错':'錯','误':'誤','继':'繼','续':'續','种':'種','观':'觀','过':'過','将':'將','带':'帶','导':'導','内':'內','简':'簡','体':'體','准':'準','备':'備','说':'說','变':'變','与':'與','从':'從','写':'寫','划':'劃','则':'則','帐':'帳','径':'徑','据':'據','标':'標','满':'滿','线':'線','给':'給','规':'規','远':'遠','问':'問','风':'風','记':'記','货':'貨','钥':'鑰','库':'庫','职':'職','万':'萬','离':'離','恶':'惡','权':'權'};
function traditional(s){const keep=[];s=s.replace(/https?:\/\/[^"'\s<>]+|\/tw\/assets\/[^"'\s<>]+/g,m=>`__URL_${keep.push(m)-1}__`);s=[...s].map(c=>chars[c]??c).join('').replaceAll('視頻','影片');return s.replace(/__URL_(\d+)__/g,(_,i)=>keep[Number(i)])}
function restoreMediaUrls(s){return s
  .replaceAll('如何拥有自己的OKX账戶.mp4','如何拥有自己的OKX账户.mp4')
  .replaceAll('如何綁定⾝份驗證應⽤.mp4','如何绑定⾝份验证应⽤.mp4')
  .replaceAll('如何設置通⾏密钥.mp4','如何设置通⾏密钥.mp4')
  .replaceAll('如何進⾏OKX官⽅渠道驗證.mp4','如何进⾏OKX官⽅渠道验证.mp4')
  .replaceAll('如何進行現货交易.mp4','如何进行现货交易.mp4')
  .replaceAll('如何進行账戶資金劃轉.mp4','如何进行账户资金划转.mp4')
  .replaceAll('如何進行身份認證.mp4','如何进行身份认证.mp4')
  .replaceAll('如何進行鏈上充值提幣.mp4','如何进行链上充值提币.mp4')}
function ensureFaqSchema(html){if(/FAQPage/.test(html)||!html.includes('id="faq"'))return html;const faq=[...html.matchAll(/<details class="faq-item"><summary>([\s\S]*?)<\/summary><p>([\s\S]*?)<\/p><\/details>/g)].map(m=>({'@type':'Question',name:m[1].replace(/<[^>]+>/g,''),acceptedAnswer:{'@type':'Answer',text:m[2].replace(/<[^>]+>/g,'')}}));if(!faq.length)return html;return html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/,(all,json)=>{try{const data=JSON.parse(json);if(Array.isArray(data['@graph']))data['@graph'].push({'@type':'FAQPage',mainEntity:faq});else return all;return `<script type="application/ld+json">${JSON.stringify(data)}</script>`}catch{return all}})}
function esc(s){return s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;')}
function outFor(url){const rel=url.replace(/^\/tw\//,'').replace(/^\//,'');return path.join(tw,url.endsWith('/')?rel+'index.html':rel)}

function header(active){
  return `<a class="skip" href="#main">跳至主要內容</a><header class="header"><div class="wrap navline"><a class="brand" href="/tw/" aria-label="CoinVoyu 台灣首頁"><span class="brandmark" aria-hidden="true">C</span><span class="brand-name">CoinVoyu</span><small>台灣 / Taiwan</small></a><button class="menu" type="button" aria-expanded="false" aria-controls="main-nav" aria-label="展開導覽選單">☰</button><nav class="navlinks" id="main-nav" aria-label="主要導覽"><a href="/tw/">首頁</a><a href="/tw/learn/"${active==='learn'?' aria-current="page"':''}>開始學習</a><a href="/tw/buy-crypto/"${active==='buy'?' aria-current="page"':''}>買幣教學</a><a href="/tw/exchanges/"${active==='exchanges'?' aria-current="page"':''}>交易所</a><a href="/tw/compare/">平台比較</a><a href="/tw/videos/"${active==='videos'?' aria-current="page"':''}>影片教學</a><a class="mobile-only" href="/tw/security/"${active==='security'?' aria-current="page"':''}>安全指南</a><a class="mobile-only" href="/">簡體中文</a></nav><a class="locale" href="/">繁中 / 簡中</a></div></header>`;
}
function footer(){
  return `<footer class="footer"><div class="wrap"><div class="footer-grid"><div><a class="brand" href="/tw/"><span class="brandmark" aria-hidden="true">C</span><span class="brand-name">CoinVoyu</span><small>台灣 / Taiwan</small></a><p>從第一次了解，到真正看懂。<br>繁體中文教學，聚焦台灣使用情境。</p><a href="/tw/articles/">全部教學</a><a href="/tw/about/author/">作者與編輯團隊</a></div><div><h3>學習</h3><a href="/tw/learn/bitcoin/what-is-bitcoin.html">Bitcoin是什麼？</a><a href="/tw/learn/usdt/what-is-usdt.html">USDT是什麼？</a><a href="/tw/security/hot-wallet-vs-cold-wallet.html">冷錢包與熱錢包</a></div><div><h3>實用教學</h3><a href="/tw/buy/how-to-buy-bitcoin-taiwan.html">買 Bitcoin</a><a href="/tw/buy/how-to-buy-usdt-taiwan.html">買 USDT</a><a href="/tw/buy/usdt-to-twd.html">USDT換回台幣</a></div><div><h3>交易所</h3><a href="/tw/exchanges/binance/">Binance</a><a href="/tw/exchanges/okx/">OKX</a><a href="/tw/exchanges/gate/">Gate</a><a href="/tw/exchanges/comparison.html">完整比較</a></div><div><h3>關於</h3><a href="/tw/about/">關於我們</a><a href="/tw/about/editorial-policy/">編輯政策</a><a href="/tw/about/risk-disclosure/">風險揭露</a><a href="/tw/about/affiliate-disclosure/">利益揭露</a><a href="/tw/about/contact/">聯絡與更正</a></div></div><div class="footer-bottom">© 2026 CoinVoyu · 本站提供教育資訊，虛擬資產涉及價格、平台、技術與監管風險。</div></div></footer><a class="backtop" href="#top" aria-label="回到頁面頂部">↑ 回頂部</a><script src="/tw/assets/site.js" defer></script>`;
}

function renderArticle(p){
  const canonical=origin+p.url;
  const faq=p.faq.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}));
  const schema={'@context':'https://schema.org','@graph':[{'@type':'Article',headline:p.title,description:p.description,url:canonical,image:`${origin}/tw/assets/covers/${p.cover}`,inLanguage:'zh-TW',datePublished:iso,dateModified:iso,author:{'@type':'Organization',name:'CoinVoyu 編輯團隊',url:`${origin}/tw/about/author/`},publisher:{'@type':'Organization',name:'CoinVoyu',url:`${origin}/tw/`}},{'@type':'FAQPage',mainEntity:faq},{'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'CoinVoyu 台灣',item:`${origin}/tw/`},{'@type':'ListItem',position:2,name:p.parentName,item:origin+p.parentUrl},{'@type':'ListItem',position:3,name:p.title,item:canonical}]}]};
  const ids=p.sections.map((s,i)=>[`section-${i+1}`,s[0]]);
  const cta=p.platform?(()=>{const d=platforms[p.platform];return `<aside class="platform-cta conversion-cta"><div class="cta-platform-logos"><span><img class="platform-logo" src="${d.logo}" alt="${d.name} 官方 Logo" width="64" height="64"><strong>${d.name}</strong></span></div><p class="tag">${d.name} 台灣專屬入口</p><h3>完成理解後，再前往建立帳戶</h3><p>專屬連結已包含 ${d.code} 推薦關係，不需要重複輸入邀請碼；請先核對本人資格與註冊頁顯示。</p><div class="conversion-actions"><a class="btn primary" href="${d.url}" target="_blank" rel="sponsored noopener noreferrer">前往 ${d.name} 註冊頁</a><a class="btn" href="${d.hub}">先看平台完整教學</a></div><p class="affiliate-note">${disclosure}</p></aside>`})():'';
  return traditional(`<!doctype html><html lang="zh-TW"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(p.title)}｜CoinVoyu 台灣</title><meta name="description" content="${esc(p.description)}"><link rel="canonical" href="${canonical}"><meta name="robots" content="index,follow,max-image-preview:large"><meta property="og:type" content="article"><meta property="og:locale" content="zh_TW"><meta property="og:title" content="${esc(p.title)}"><meta property="og:description" content="${esc(p.description)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${origin}/tw/assets/covers/${p.cover}"><meta name="twitter:card" content="summary_large_image"><meta name="theme-color" content="#F8FAFC"><link rel="icon" href="/tw/assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/tw/assets/site.css"><script type="application/ld+json">${JSON.stringify(schema)}</script></head><body id="top" data-article-type="${p.type}">${header(p.active)}<main id="main"><div class="wrap"><nav class="crumb" aria-label="麵包屑"><a href="/tw/">首頁</a><span>›</span><a href="${p.parentUrl}">${p.parentName}</a><span>›</span><span aria-current="page">${p.title}</span></nav><header class="page-head"><p class="tag">${p.category}</p><h1>${p.title}</h1><p class="lead">${p.description}</p><div class="byline"><a href="/tw/about/author/">作者／編輯：CoinVoyu 編輯團隊</a><span>首次發布：${date}</span><span>最後更新：${date}</span></div></header><div class="article-grid"><article class="article-body"><img class="cover-main" src="/tw/assets/covers/${p.cover}" alt="${p.title}主題插圖" width="1200" height="675" fetchpriority="high"><aside class="points article-summary"><h2>先看重點</h2><ul>${p.points.map(x=>`<li>${x}</li>`).join('')}</ul></aside><nav class="cluster-path" aria-label="相關學習路徑"><strong>${p.clusterName}</strong><div class="cluster-links">${p.cluster.map(([label,url])=>`<a class="cluster-link" href="${url}"${url===p.url?' aria-current="page"':''}>${label}</a>`).join('')}</div></nav><details class="mobile-toc"><summary>展開目錄</summary><ol>${ids.map(([id,t])=>`<li><a href="#${id}">${t}</a></li>`).join('')}<li><a href="#faq">常見問題</a></li><li><a href="#sources">資料來源</a></li></ol></details>${p.sections.map((s,i)=>`<h2 id="section-${i+1}">${s[0]}</h2>${s[1]}`).join('')}${cta}<section id="faq"><h2>常見問題</h2><div class="faq-grid">${p.faq.map(([q,a])=>`<details class="faq-item"><summary>${q}</summary><p>${a}</p></details>`).join('')}</div></section><section class="sources" id="sources"><h2>資料來源與核對範圍</h2><p>本頁於 ${date} 核對。制度、平台與產品規則可能變動，請以官方最新資料及本人情況為準。</p><ol>${p.sources.map(([n,u])=>`<li><a href="${u}" target="_blank" rel="noopener noreferrer">${n}</a></li>`).join('')}</ol></section><aside class="notice"><strong>風險提示：</strong> ${p.risk}</aside><section><h2>接下來可以看</h2><div class="continue-grid">${p.related.map(([s,t,u])=>`<a class="continue-card" href="${u}"><small>${s}</small><strong>${t}</strong><span>依學習路徑接著閱讀</span></a>`).join('')}</div></section></article><aside class="toc"><details open><summary>文章目錄</summary><ol>${ids.map(([id,t])=>`<li><a href="#${id}">${t}</a></li>`).join('')}<li><a href="#faq">常見問題</a></li><li><a href="#sources">資料來源</a></li></ol><div class="meta">${p.category}<br>最後更新：${date}</div></details></aside></div></div></main>${footer()}</body></html>`);
}

const newArticles=[
  {url:'/tw/exchanges/comparison.html',title:'台灣加密貨幣交易所比較：Binance、OKX、Gate怎麼選？',description:'從新台幣路徑、資產選擇、費用、安全工具與操作需求，比較Binance、OKX與Gate；不做單一排名，協助台灣使用者建立選擇框架。',category:'交易所比較',type:'C',active:'exchanges',parentUrl:'/tw/exchanges/',parentName:'交易所',cover:'09.webp',points:['沒有一個平台能在所有面向都最適合每個人。','先確認台灣資金路徑與所在地區資格，再比較幣種、費用與功能。','海外平台不等於台灣核准設立機構，資產與帳戶安全仍由使用者共同承擔。'],clusterName:'交易所選擇與開始使用',cluster:[['完整比較','/tw/exchanges/comparison.html'],['Binance教學','/tw/exchanges/binance/'],['OKX教學','/tw/exchanges/okx/'],['Gate教學','/tw/exchanges/gate/']],sections:[['先說結論：從需求選，不做單一排名','<p><strong>台灣使用者選交易所，應先看資金如何進出、本人地區可用性與安全需求，再看資產數量和交易功能。</strong>只用「哪家最大」或「哪家幣最多」無法回答個人是否適合。</p>'],['三平台比較表','<div class="table-scroll"><table><thead><tr><th>比較面向</th><th>Binance</th><th>OKX</th><th>Gate</th></tr></thead><tbody><tr><td>常見定位</td><td>大型綜合交易與生態工具</td><td>交易、錢包與Web3工具整合</td><td>資產與市場選擇較廣</td></tr><tr><td>新手重點</td><td>先理解帳戶、現貨與安全設定</td><td>分辨交易所帳戶與Web3錢包</td><td>從較多資產中篩選流動性</td></tr><tr><td>費用</td><td colspan="3">都要以本人等級、成交角色、交易對與提幣網路即時顯示為準</td></tr><tr><td>安全</td><td colspan="3">都應啟用2FA、防釣魚與提幣保護；平台規模不能取代個人操作安全</td></tr></tbody></table></div>'],['台灣使用者先檢查資金路徑','<p>註冊前先畫出新台幣進場、資產轉入、交易與轉回銀行的完整路徑。境外平台的法幣功能、P2P或卡片支付資格可能隨地區與帳戶而異，不應把其他國家的流程直接套用到台灣。</p><p>若經由台灣本地平台取得USDT再轉入，還要計入本地交易費、價差、提幣費和網路選擇。</p>'],['費用與流動性要一起看','<p>名目手續費只是成本的一部分。小型市場的買賣價差、滑價、提幣費與轉回台幣成本，都可能高於表面費率差異。比較時使用同一交易對、相近金額和相同網路。</p>'],['下一步：先看教學再註冊','<p>依你真正要用的平台進入完整教學，確認註冊、KYC、安全、費用和資金路徑。本站不在此頁同時堆疊三個註冊按鈕，避免把比較頁做成廣告牆。</p>']],faq:[['Binance、OKX、Gate哪個最好？','沒有適用所有人的單一答案。請依所在地區資格、資金路徑、交易需求、安全工具與總成本選擇。'],['海外交易所可以直接用台幣入金嗎？','不一定。支付與P2P功能會依地區、帳戶及政策調整；應以本人帳戶實際顯示為準。'],['比較手續費只看百分比就夠嗎？','不夠。還要計入價差、滑價、提幣費、鏈上費與轉回台幣的成本。']],sources:[['金管會：境外虛擬資產平台風險提醒','https://www.cip.gov.tw/zh-tw/news/data-list/6EBE68EA8288674E/EDBA26F8192106816E2FD5FC7B2A212C-info.html'],['Binance官方費率','https://www.binance.com/en/fee'],['OKX官方費率','https://www.okx.com/zh-hant/fees'],['Gate官方費率','https://www.gate.com/fee']],risk:'境外平台並非因此成為金管會核准設立機構；虛擬資產價格、平台營運與跨境爭議都有風險。',related:[['平台教學','Binance台灣完整教學','/tw/exchanges/binance/'],['平台教學','OKX台灣完整教學','/tw/exchanges/okx/'],['平台教學','Gate台灣完整教學','/tw/exchanges/gate/']]},
  {url:'/tw/security/crypto-wallet-guide.html',title:'加密貨幣錢包是什麼？台灣新手安全使用指南',description:'說明加密貨幣錢包、地址、私鑰與助記詞的關係，比較交易所錢包與自托管，並整理台灣新手的安全操作步驟。',category:'錢包安全',type:'A',active:'security',parentUrl:'/tw/security/',parentName:'安全指南',cover:'15.webp',points:['錢包保存的是控制資產所需的金鑰，不是把代幣檔案裝進裝置。','交易所託管與自托管各有不同風險，沒有零風險選項。','任何人取得助記詞或私鑰，都可能控制對應資產。'],clusterName:'錢包與帳戶安全路徑',cluster:[['錢包是什麼','/tw/security/crypto-wallet-guide.html'],['冷熱錢包','/tw/security/hot-wallet-vs-cold-wallet.html'],['助記詞','/tw/security/seed-phrase-guide.html'],['2FA安全','/tw/security/account-security/']],sections:[['錢包是什麼？','<p><strong>加密貨幣錢包是管理區塊鏈帳戶、地址與密碼金鑰的軟體或裝置。</strong>資產紀錄存在區塊鏈上；錢包讓你查看餘額、建立交易並用私鑰簽署。</p>'],['地址、私鑰與助記詞','<div class="table-scroll"><table><thead><tr><th>項目</th><th>用途</th><th>能否公開</th></tr></thead><tbody><tr><td>地址</td><td>接收資產</td><td>可提供給付款人，但仍涉及隱私</td></tr><tr><td>私鑰</td><td>控制單一帳戶並簽署交易</td><td>絕對不可分享</td></tr><tr><td>助記詞</td><td>恢復一組錢包帳戶</td><td>絕對不可分享或上傳</td></tr></tbody></table></div>'],['交易所錢包與自托管','<p>交易所帳戶通常由平台管理金鑰，優點是介面與恢復流程較容易，但要承擔平台與帳戶風險。自托管讓使用者直接控制金鑰，能降低單一託管方風險，卻把備份、簽署與防詐責任交給本人。</p>'],['第一次建立錢包的步驟','<div class="article-steps"><div class="article-step"><strong>1</strong><div><h3>只從官方來源下載</h3><p>確認網域、開發者與App商店資訊，不點社群私訊連結。</p></div></div><div class="article-step"><strong>2</strong><div><h3>離線記錄助記詞</h3><p>按正確順序抄寫，不截圖、不寄信、不存雲端。</p></div></div><div class="article-step"><strong>3</strong><div><h3>先用小額測試</h3><p>確認資產、網路、地址與到帳，再考慮增加金額。</p></div></div></div>'],['如何選擇適合自己的錢包','<p>短期小額操作、長期保存、DeFi互動和跨鏈使用的需求不同。先列出支援網路、安全模型、備份方式、更新紀錄與客服來源，再決定是否使用熱錢包、硬體錢包或交易所託管。</p><p class="media-source">本頁使用CoinVoyu Taiwan既有錢包主題插圖，未使用外部操作截圖。</p>']],faq:[['錢包裡真的存著加密貨幣嗎？','資產紀錄在區塊鏈上；錢包主要管理地址與簽署交易所需的金鑰。'],['交易所錢包和自托管哪個一定更安全？','沒有絕對答案。前者有平台與帳戶風險，後者有助記詞遺失、釣魚與操作錯誤風險。'],['客服會需要我的助記詞嗎？','不會。任何要求助記詞或私鑰的人都應視為高風險。']],sources:[['金管會：虛擬資產服務法（錢包定義）','https://law.fsc.gov.tw/LawContent.aspx?id=GL004301'],['ethereum.org：建立帳戶與錢包','https://ethereum.org/guides/how-to-create-an-ethereum-account/'],['ethereum.org：錢包安全','https://ethereum.org/security/']],risk:'自托管交易通常不可逆；錯誤地址、錯誤網路、惡意授權或助記詞外洩都可能造成永久損失。',related:[['冷熱錢包','熱錢包和冷錢包差在哪？','/tw/security/hot-wallet-vs-cold-wallet.html'],['備份安全','助記詞是什麼？','/tw/security/seed-phrase-guide.html'],['帳戶安全','2FA與私鑰安全指南','/tw/security/account-security/']]},
  {url:'/tw/security/seed-phrase-guide.html',title:'助記詞是什麼？備份、恢復與防詐完整指南',description:'解釋助記詞與私鑰的關係、12或24個單字如何用於錢包恢復，以及離線備份、測試與防止釣魚外洩的安全原則。',category:'助記詞安全',type:'A',active:'security',parentUrl:'/tw/security/',parentName:'安全指南',cover:'18.webp',points:['助記詞通常能恢復整個錢包，保護等級應高於一般密碼。','不截圖、不上傳雲端、不輸入到陌生網站，也不交給客服。','備份要兼顧保密、可讀性與災害風險，並先用小額驗證流程。'],clusterName:'安全自托管路徑',cluster:[['錢包指南','/tw/security/crypto-wallet-guide.html'],['冷熱錢包','/tw/security/hot-wallet-vs-cold-wallet.html'],['助記詞','/tw/security/seed-phrase-guide.html'],['詐騙防範','/tw/security/crypto-scams/']],sections:[['助記詞是什麼？','<p><strong>助記詞是一組依順序排列的單字，常用來衍生並恢復錢包帳戶。</strong>取得它的人通常可以在另一個相容錢包中重建帳戶並控制資產，所以它不是普通登入密碼。</p>'],['助記詞和私鑰有什麼不同','<p>助記詞常能衍生多個帳戶的金鑰；私鑰通常對應特定帳戶或地址。兩者一旦外洩都可能導致資產被轉走，不能以「只給客服看一下」或「只截圖保存」降低警戒。</p>'],['安全備份四步驟','<div class="article-steps"><div class="article-step"><strong>1</strong><div><h3>在可信裝置產生</h3><p>使用官方錢包與乾淨環境，不接受他人代建錢包。</p></div></div><div class="article-step"><strong>2</strong><div><h3>離線依序抄寫</h3><p>確認拼字與順序；不截圖、不貼到記事本或雲端。</p></div></div><div class="article-step"><strong>3</strong><div><h3>分開保管</h3><p>評估火災、潮濕、失竊和家人誤丟風險，不公開存放位置。</p></div></div><div class="article-step"><strong>4</strong><div><h3>用小額測試恢復</h3><p>在安全情境確認備份可讀與流程正確，避免把主要資產當第一次測試。</p></div></div></div>'],['絕對不要做的事','<ul><li>把助記詞傳給客服、群組老師或遠端協助者。</li><li>輸入到空投、驗證錢包、升級錢包等陌生網站。</li><li>用手機截圖、電子郵件或雲端硬碟保存。</li><li>把所有備份放在同一個容易失竊或損壞的位置。</li></ul>'],['遺失或外洩時怎麼辦','<p>若只是裝置遺失但助記詞安全，可在確認的相容錢包恢復。若懷疑助記詞已被看見，應在可信裝置建立全新錢包並儘快轉移資產；不要繼續使用已暴露的備份。</p><p class="media-source">本頁未使用外部操作圖片或影片，避免以過期介面取代安全原則。</p>']],faq:[['忘記助記詞可以請平台找回嗎？','自托管錢包通常沒有中央單位能替你找回；是否仍可存取取決於裝置、錢包設計與既有備份。'],['可以把助記詞截圖存在手機嗎？','不建議。截圖可能被惡意程式讀取或同步到雲端。'],['客服要求助記詞來驗證身分是真的嗎？','不是。合法客服不需要你的助記詞或私鑰。']],sources:[['ethereum.org：建立帳戶與復原短語','https://ethereum.org/guides/how-to-create-an-ethereum-account/'],['ethereum.org：安全與詐騙防範','https://ethereum.org/security/']],risk:'助記詞一旦外洩，鏈上轉帳通常無法撤回；任何要求輸入助記詞以領獎、解鎖或驗證的頁面都應停止操作。',related:[['基礎觀念','加密貨幣錢包是什麼？','/tw/security/crypto-wallet-guide.html'],['保管方式','冷錢包與熱錢包差異','/tw/security/hot-wallet-vs-cold-wallet.html'],['防詐指南','常見加密貨幣詐騙','/tw/security/crypto-scams/']]},
  {url:'/tw/buy/can-taiwan-buy-crypto.html',title:'台灣可以買虛擬貨幣嗎？法規、平台與風險說明',description:'台灣可以買虛擬貨幣嗎？整理2026年台灣法規框架、平台選擇、新台幣資金路徑、KYC與境外平台風險，提供非法律建議的實用說明。',category:'台灣買幣入門',type:'A',active:'buy',parentUrl:'/tw/buy-crypto/',parentName:'買幣教學',cover:'03.webp',points:['台灣並非全面禁止個人持有或交易虛擬資產，但平台、服務與交易行為受法規及資格限制。','2026年公布的虛擬資產服務法部分條文尚待施行日期，應持續核對主管機關公告。','境外平台不等於金管會核准設立機構，發生爭議時保障可能有限。'],clusterName:'台灣買幣學習路徑',cluster:[['是否合法','/tw/buy/can-taiwan-buy-crypto.html'],['買Bitcoin','/tw/buy/how-to-buy-bitcoin-taiwan.html'],['買USDT','/tw/buy/how-to-buy-usdt-taiwan.html'],['交易所比較','/tw/exchanges/comparison.html']],sections:[['直接回答：台灣可以買虛擬貨幣嗎？','<p><strong>一般而言，台灣沒有全面禁止個人持有或交易虛擬資產；但平台經營、洗錢防制、詐騙防制、稅務與特定商品資格仍受法律和主管機關規範。</strong>「可以買」不等於任何平台、任何方式或任何商品都合法且受保障。</p>'],['2026年法規要看什麼','<p>虛擬資產服務法於2026年7月公布，法規頁同時標示全部或部分條文尚未施行，施行日期由行政院定之。使用者不應把公布等同所有新制度已全面上路；應持續核對金管會與法規系統最新狀態。</p>'],['台灣常見購買路徑','<div class="table-scroll"><table><thead><tr><th>路徑</th><th>優點</th><th>注意事項</th></tr></thead><tbody><tr><td>台灣平台＋銀行入金</td><td>新台幣路徑較直觀</td><td>核對平台登記／許可狀態、費用與提領規則</td></tr><tr><td>取得資產後轉往海外平台</td><td>市場與工具選擇可能較多</td><td>境外平台保障、網路與提幣費風險</td></tr><tr><td>自托管錢包</td><td>自行控制金鑰</td><td>助記詞、惡意授權與操作錯誤由本人承擔</td></tr></tbody></table></div>'],['第一次購買前的步驟','<div class="article-steps"><div class="article-step"><strong>1</strong><div><h3>確認平台主體與資格</h3><p>從主管機關與官方網站核對，不只看廣告或社群推薦。</p></div></div><div class="article-step"><strong>2</strong><div><h3>完成KYC與帳戶安全</h3><p>使用本人資料，啟用2FA與提幣保護。</p></div></div><div class="article-step"><strong>3</strong><div><h3>先做小額測試</h3><p>確認入金、成交、提幣網路與回到銀行的完整路徑。</p></div></div></div>'],['風險不只來自價格','<p>金管會提醒虛擬資產價格波動大、資訊可能不透明，也有假冒名人、假App和不明網站詐騙。使用境外平台時，還要考慮跨境爭議、平台營運和所在地區資格。</p><p class="media-source">本頁使用CoinVoyu Taiwan既有買幣主題插圖，未使用外部平台操作截圖。</p>']],faq:[['台灣買虛擬貨幣違法嗎？','不是全面違法，但平台經營、洗錢防制、詐騙防制、稅務與特定交易行為受規範；個案請諮詢合格專業人士。'],['境外交易所等於金管會核准嗎？','不等於。金管會已提醒境外平台並非因此成為經核准設立的機構。'],['2026虛擬資產服務法已全部施行嗎？','法規頁標示全部或部分條文尚未施行，施行日期由行政院定之；請查最新官方公告。']],sources:[['金管會主管法規：虛擬資產服務法','https://law.fsc.gov.tw/LawContent.aspx?id=GL004301'],['金管會：交易與境外平台風險提醒','https://www.cip.gov.tw/zh-tw/news/data-list/6EBE68EA8288674E/EDBA26F8192106816E2FD5FC7B2A212C-info.html'],['洗錢防制法相關規範','https://law.fsc.gov.tw/LawContent.aspx?id=FL006664']],risk:'本頁是一般教育資訊，不構成法律、稅務或投資意見；法規施行狀態與個人義務應以官方資料及專業意見為準。',related:[['買幣教學','台灣怎麼買Bitcoin？','/tw/buy/how-to-buy-bitcoin-taiwan.html'],['買幣教學','台灣怎麼買USDT？','/tw/buy/how-to-buy-usdt-taiwan.html'],['平台比較','台灣交易所怎麼選？','/tw/exchanges/comparison.html']]}
];

for(const [oldUrl,newUrl] of migrations){
  let html=fs.readFileSync(path.join(tw,sourceFiles.get(oldUrl)),'utf8');
  html=html.replaceAll(origin+oldUrl,origin+newUrl).replaceAll(`href="${oldUrl}"`,`href="${newUrl}"`);
  html=html.replace(/<meta name="robots"[^>]*>/,'<meta name="robots" content="index,follow,max-image-preview:large">');
  html=html.replace(/<meta http-equiv="refresh"[^>]*>/g,'');
  html=html.replace(/<link rel="canonical" href="[^"]+">/,`<link rel="canonical" href="${origin+newUrl}">`);
  html=html.replace(/<meta property="og:url" content="[^"]+">/,`<meta property="og:url" content="${origin+newUrl}">`);
  html=html.replaceAll('/tw/assets/platform-binance.svg',platforms.binance.logo).replaceAll('/tw/assets/platform-okx.svg',platforms.okx.logo).replaceAll('/tw/assets/platform-gate.svg',platforms.gate.logo);
  html=html.replace('本頁沿用 CoinVoyu Taiwan 既有 Binance 平台主題封面；本批未取得可核實的 Binance Launch Station 圖片或影片文件，因此未加入外部操作截圖，也未標示為 Launch Station 素材。','本頁沿用 CoinVoyu Taiwan 既有 Binance 平台主題封面，並連結本站既有 Binance 註冊影片導讀。Binance Launch Station 圖片與影片可依實際教學步驟長期使用；實際採用時會逐項標示官方教學素材來源。');
  html=ensureFaqSchema(restoreMediaUrls(traditional(html))).replaceAll('class="platform-cta conversion-cta""','class="platform-cta conversion-cta"');
  const target=outFor(newUrl); fs.mkdirSync(path.dirname(target),{recursive:true}); fs.writeFileSync(target,html);
}
for(const p of newArticles){const target=outFor(p.url);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,renderArticle(p))}

// Old routes remain usable but are explicitly consolidated to the new canonical URLs.
for(const [oldUrl,newUrl] of migrations){
  const file=path.join(tw,sourceFiles.get(oldUrl)); let html=fs.readFileSync(file,'utf8');
  html=html.replace(/<meta http-equiv="refresh"[^>]*>/g,'');
  html=html.replace(/<meta name="robots"[^>]*>/,'<meta name="robots" content="noindex,follow">');
  html=html.replace(/<link rel="canonical" href="[^"]+">/,`<link rel="canonical" href="${origin+newUrl}">`);
  html=html.replace('</head>',`<meta http-equiv="refresh" content="0;url=${newUrl}"></head>`);
  fs.writeFileSync(file,restoreMediaUrls(traditional(html)));
}

// Migrate Taiwan-internal links only; referral URLs and platform overview URLs are untouched.
for(const file of walk(tw).filter(f=>f.endsWith('.html'))){
  let html=fs.readFileSync(file,'utf8');
  for(const [oldUrl,newUrl] of migrations) html=html.replaceAll(`href="${oldUrl}"`,`href="${newUrl}"`);
  html=html.replaceAll('href="/tw/exchanges/">完整比較</a>','href="/tw/exchanges/comparison.html">完整比較</a>');
  html=html.replaceAll('/tw/assets/platform-binance.svg',platforms.binance.logo).replaceAll('/tw/assets/platform-okx.svg',platforms.okx.logo).replaceAll('/tw/assets/platform-gate.svg',platforms.gate.logo);
  html=html.replaceAll('class="platform-cta conversion-cta""','class="platform-cta conversion-cta"');
  html=html.replace('本頁沿用 CoinVoyu Taiwan 既有 Binance 平台主題封面；本批未取得可核實的 Binance Launch Station 圖片或影片文件，因此未加入外部操作截圖，也未標示為 Launch Station 素材。','本頁沿用 CoinVoyu Taiwan 既有 Binance 平台主題封面，並連結本站既有 Binance 註冊影片導讀。Binance Launch Station 圖片與影片可依實際教學步驟長期使用；實際採用時會逐項標示官方教學素材來源。');
  fs.writeFileSync(file,restoreMediaUrls(traditional(html)));
}

// Connect the five core videos to their matching long-form guides.
for(const [url,title,videoUrl] of [
  ['/tw/learn/bitcoin/what-is-bitcoin.html','Bitcoin影片導讀','/tw/videos/bitcoin/'],
  ['/tw/learn/usdt/what-is-usdt.html','USDT影片導讀','/tw/videos/usdt/'],
  ['/tw/exchanges/binance/register.html','Binance註冊影片導讀','/tw/videos/binance-register/'],
  ['/tw/buy/how-to-buy-bitcoin-taiwan.html','第一次買Bitcoin影片導讀','/tw/videos/buy-bitcoin/'],
  ['/tw/security/account-security/','帳戶安全影片導讀','/tw/videos/account-security/']
]){
  const file=outFor(url); let html=fs.readFileSync(file,'utf8');
  if(!html.includes(`href="${videoUrl}"`)) html=html.replace('<section id="faq">',`<aside class="intent-path article-video-link"><p class="tag">相關影片</p><h3>${title}</h3><p>先看影片建立畫面與流程概念，再回到本文核對台灣情境、風險與完整步驟。</p><div class="intent-links"><a href="${videoUrl}">前往影片教學 →</a></div></aside><section id="faq">`);
  fs.writeFileSync(file,html);
}

// Surface the four genuinely new V3 articles in the article directory.
{
  const file=path.join(tw,'articles','index.html'); let html=fs.readFileSync(file,'utf8');
  if(!html.includes('data-v3-core="comparison"')){
    const additions=newArticles.map((p,i)=>`<article class="card" data-category="${p.category.includes('比較')?'平台比較':p.category.includes('買幣')?'買幣教學':'安全指南'}" data-v3-core="${['comparison','wallet','seed','taiwan'][i]}"><a href="${p.url}"><img src="/tw/assets/covers/${p.cover}" alt="${p.title}主題插圖" loading="lazy" width="1200" height="675"></a><div class="card-body"><span class="tag">${p.category}</span><h3><a href="${p.url}">${p.title}</a></h3><p class="desc">${p.description}</p><div class="card-meta"><span>更新：${date}</span><span aria-hidden="true">↗</span></div></div></article>`).join('');
    html=html.replace('<p id="no-results"',`${additions}<p id="no-results"`);
  }
  html=html.replace(/顯示 \d+ 項內容/,'顯示 37 項內容'); fs.writeFileSync(file,html);
}

function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{const p=path.join(dir,e.name);return e.isDirectory()?walk(p):[p]})}

// Build sitemap from indexable Taiwan pages, excluding 404 and migrated legacy duplicates.
const urls=[];
for(const file of walk(tw).filter(f=>f.endsWith('.html')&&!f.endsWith('/404.html'))){
  const html=fs.readFileSync(file,'utf8'); if(/name="robots" content="noindex/i.test(html)) continue;
  const m=html.match(/<link rel="canonical" href="([^"]+)"/); if(m&&m[1].startsWith(origin+'/tw/')) urls.push(m[1]);
}
const unique=[...new Set(urls)].sort();
fs.writeFileSync(path.join(tw,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${unique.map(u=>`  <url><loc>${u}</loc><lastmod>2026-10-07</lastmod></url>`).join('\n')}\n</urlset>\n`);

// V3 metadata and cluster inventory.
const v3={version:'CoinVoyu Taiwan V3 Batch 1',updated:'2026-10-07',scope:'Taiwan-only',canonicalPages:[...migrations.values(),...newArticles.map(p=>p.url)],referrals:Object.fromEntries(Object.entries(platforms).map(([k,v])=>[k,{code:v.code,url:v.url}]))};
fs.writeFileSync(path.join(tw,'v3-batch1.json'),JSON.stringify(v3,null,2)+'\n');
