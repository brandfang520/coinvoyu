import fs from 'node:fs';
import path from 'node:path';

const tw=path.resolve(import.meta.dirname,'..');
const origin='https://www.coinvoyu.com';
const date='2026年10月08日';
const iso='2026-10-08T00:00:00+08:00';
const disclosure='利益揭露：本頁部分平台連結可能包含推薦連結。若你透過相關連結完成符合條件的操作，CoinVoyu 可能獲得推薦獎勵。';
const referrals={
  okx:{name:'OKX',code:'TW1866',url:'https://www.mitxcqvwnhj.com/join/TW1866',logo:'/tw/assets/platform-okx.png',hub:'/tw/exchanges/okx/'},
  gate:{name:'Gate',code:'VOYUTWFF',url:'https://www.gatesites.cc/share/VOYUTWFF',logo:'/tw/assets/platform-gate.webp',hub:'/tw/exchanges/gate/'}
};

const read=rel=>fs.readFileSync(path.join(tw,rel),'utf8');
const write=(rel,data)=>{const target=path.join(tw,rel);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,data)};
const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const strip=s=>s.replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
const charMap={'说':'說','现':'現','货':'貨','买':'買','卖':'賣','币':'幣','台':'台','湾':'灣','页':'頁','进':'進','入':'入','区':'區','域':'域','账':'帳','户':'戶','状':'狀','态':'態','支':'支','持':'持','为':'為','准':'準','资':'資','产':'產','订':'訂','单':'單','簿':'簿','对':'對','价':'價','限':'限','场':'場','据':'據','报':'報','转':'轉','变':'變','化':'化','帮':'幫','助':'助','银':'銀','卡':'卡','开':'開','头':'頭','没':'沒','有':'有','确':'確','认':'認','网':'網','络':'絡','后':'後','到':'到','误':'誤','实':'實','际':'際','资':'資','料':'料','规':'規','则':'則','产':'產','品':'品','过':'過','去':'去','线':'線','旧':'舊','视':'視','当':'當','前':'前','会':'會','个':'個','档':'檔','终':'終','画':'畫','面':'面','瞬':'瞬','续':'續','属':'屬','于':'於','等':'等','级':'級','费':'費','务':'務','时':'時','复':'複','审':'審','核':'核','数':'數','量':'量','钟':'鐘','依':'依','赖':'賴','删':'刪','除':'除','浏':'瀏','览':'覽','器':'器','点':'點','击':'擊','阅':'閱','读':'讀','钱':'錢','包':'包','记':'記','词':'詞','联':'聯','系':'系','计':'計','划':'劃','错':'錯','复':'複','制':'制','设':'設','简':'簡','体':'體','频':'頻','购':'購','择':'擇','风':'風','险':'險','题':'題','虑':'慮','别':'別','验':'驗','证':'證','显':'顯','护':'護','链':'鏈','担':'擔','拥':'擁','调':'調','续':'續','术':'術','间':'間','学':'學','习':'習','递':'遞','给':'給','关':'關','无':'無','应':'應','见':'見','问':'問','该':'該','图':'圖','边':'邊','达':'達','号':'號','选':'選','称':'稱','称':'稱','处':'處','备':'備','发':'發','来':'來','从':'從','与':'與','让':'讓','这':'這','么':'麼','华':'華','务':'務','终':'終','笔':'筆','将':'將','动':'動','预':'預','员':'員','异':'異','约':'約','储':'儲','类':'類','则':'則','栏':'欄','导':'導','标':'標','识':'識','变':'變','亲':'親','经':'經','测':'測','并':'並','论':'論'};
function traditional(input){
  const protectedValues=[];
  let text=input.replace(/https?:\/\/[^"'\s<>]+|\/tw\/[^"'\s<>]+/g,value=>`__PROTECTED_${protectedValues.push(value)-1}__`);
  text=[...text].map(char=>charMap[char]??char).join('');
  for(const [from,to] of [['進行','進行'],['身份','身分'],['支持','支援'],['用戶','使用者'],['信息','資訊'],['渠道','管道'],['視頻','影片'],['複制','複製'],['鏈接','連結'],['聯系','聯繫'],['連系','聯繫'],['係統','系統'],['應用','應用'],['保證','保證'],['不能保證','不能保證'],['怎麼','怎麼'],['什麼','什麼'],['裡面','裡面'],['依據','依據'],['幫助中心','說明中心'],['資料','資料'],['當前','目前'],['賬戶','帳戶'],['帳号','帳號'],['市價單會','市價單會'],['訂單簿','訂單簿'],['區域','區域'],['實際','實際'],['費率','費率'],['服務商','服務商'],['教學','教學'],['現貨','現貨']])text=text.replaceAll(from,to);
  return text.replace(/__PROTECTED_(\d+)__/g,(_,i)=>protectedValues[Number(i)]);
}
const p=(...items)=>items.map(x=>`<p>${x}</p>`).join('');
const ul=items=>`<ul>${items.map(x=>`<li>${x}</li>`).join('')}</ul>`;
const steps=items=>`<div class="article-steps">${items.map((x,i)=>`<div class="article-step"><strong>${i+1}</strong><div><h3>${x[0]}</h3><p>${x[1]}</p></div></div>`).join('')}</div>`;
const table=(heads,rows,label='比較表')=>`<div class="table-scroll" role="region" aria-label="${label}" tabindex="0"><table><thead><tr>${heads.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

const shell=read('exchanges/okx/register.html');
const siteHeader=(shell.match(/<header class="header">[\s\S]*?<\/header>/)||[])[0];
const siteTail=(shell.match(/<footer class="footer">[\s\S]*?<\/body>/)||[])[0];
if(!siteHeader||!siteTail)throw new Error('Unable to resolve current Taiwan article shell');

function platformCta(key){
  const d=referrals[key];
  return `<aside class="platform-cta conversion-cta"><div class="cta-platform-logos" aria-label="相關平台"><span><img class="platform-logo" src="${d.logo}" alt="${d.name} Logo" width="64" height="64" loading="lazy"><strong>${d.name}</strong></span></div><p class="tag">${d.name} 台灣專屬入口</p><h3>理解流程後，再決定是否建立帳戶</h3><p>專屬連結已包含 ${d.code} 推薦關係，不需要重複輸入邀請碼。請先核對本人所在地區、適用條款、付款方式與註冊頁實際顯示。</p><div class="conversion-actions"><a class="btn primary" href="${d.url}" target="_blank" rel="sponsored noopener noreferrer" data-event="platform_cta_click" data-platform="${key}" data-link-type="referral" data-position="v3-batch3-1-article">前往 ${d.name} 註冊頁</a><a class="btn" href="${d.hub}">先看完整平台教學</a></div><p class="affiliate-note">${disclosure}</p></aside>`;
}

function renderArticle(a){
  const canonical=origin+a.url;
  const graph=[
    {'@type':'Article',headline:a.title,description:a.description,url:canonical,image:origin+a.cover,inLanguage:'zh-TW',datePublished:iso,dateModified:iso,author:{'@type':'Organization',name:'CoinVoyu 編輯團隊',url:origin+'/tw/about/author/'},publisher:{'@type':'Organization',name:'CoinVoyu',url:origin+'/tw/'}},
    {'@type':'FAQPage',mainEntity:a.faq.map(([q,answer])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:answer}}))},
    {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'CoinVoyu 台灣',item:origin+'/tw/'},{'@type':'ListItem',position:2,name:a.platformName,item:origin+a.platformHub},{'@type':'ListItem',position:3,name:a.title,item:canonical}]}
  ];
  const toc=a.sections.map((section,i)=>`<li><a href="#section-${i+1}">${section[0]}</a></li>`).join('');
  const video=a.video?`<section class="video-module"><video controls preload="metadata" playsinline poster="${a.video.poster}" aria-label="${a.video.title}"><source src="${a.video.src}" type="video/mp4">您的瀏覽器不支援影片播放。</video><div class="video-copy"><p class="tag">官方操作素材</p><h3>${a.video.title}</h3><p>${a.video.description}</p><p class="media-source">${a.video.source}</p><p><a href="${a.video.page}">查看影片導讀與相關教學 →</a></p></div></section>`:'';
  const html=`<!doctype html><html lang="zh-TW"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(a.title)}｜CoinVoyu 台灣</title><meta name="description" content="${esc(a.description)}"><link rel="canonical" href="${canonical}"><meta name="robots" content="index,follow,max-image-preview:large"><meta property="og:type" content="article"><meta property="og:locale" content="zh_TW"><meta property="og:title" content="${esc(a.title)}"><meta property="og:description" content="${esc(a.description)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${origin+a.cover}"><meta name="twitter:card" content="summary_large_image"><meta name="theme-color" content="#F8FAFC"><link rel="icon" href="/tw/assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/tw/assets/site.css"><script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':graph})}</script></head><body id="top" data-article-type="B" data-platform="${a.platform}">${siteHeader}<main id="main"><div class="wrap"><nav class="crumb" aria-label="麵包屑"><a href="/tw/">首頁</a><span>›</span><a href="${a.platformHub}">${a.platformName}</a><span>›</span><span aria-current="page">${a.title}</span></nav><header class="page-head"><p class="tag">${a.category}</p><div class="page-platform-mark" aria-label="相關平台"><span><img class="platform-logo" src="${a.logo}" alt="${a.platformName} Logo" width="64" height="64" loading="lazy"><strong>${a.platformName}</strong></span></div><h1>${a.title}</h1><p class="lead">${a.description}</p><div class="byline"><a href="/tw/about/author/">作者／編輯：CoinVoyu 編輯團隊</a><span>首次發布：${date}</span><span>最後更新：${date}</span></div></header><nav class="cluster-route" data-cluster="conversion-${a.platform}" aria-label="主題學習路徑"><strong>主題路徑</strong>${a.route.map(([label,url])=>`<a href="${url}"${url===a.url?' aria-current="page"':''}>${label}</a>`).join('<span aria-hidden="true">›</span>')}</nav><div class="article-grid"><article class="article-body"><img class="cover-main" src="${a.cover}" alt="${a.title}主題插圖" width="1200" height="675" fetchpriority="high"><aside class="points article-summary"><h2>先看重點</h2>${ul(a.points)}</aside><nav class="cluster-path" aria-label="相關學習路徑"><strong>${a.pathTitle}</strong><div class="cluster-links">${a.cluster.map(([label,url])=>`<a class="cluster-link" href="${url}"${url===a.url?' aria-current="page"':''}>${label}</a>`).join('')}</div></nav><details class="mobile-toc"><summary>展開目錄</summary><ol>${toc}<li><a href="#faq">常見問題</a></li><li><a href="#sources">資料來源</a></li></ol></details>${a.sections.map((section,i)=>`<h2 id="section-${i+1}">${section[0]}</h2>${section[1]}`).join('')}${video}${platformCta(a.platform)}<section id="faq"><h2>常見問題</h2><div class="faq-grid">${a.faq.map(([q,answer])=>`<details class="faq-item"><summary>${q}</summary><p>${answer}</p></details>`).join('')}</div></section><section class="sources" id="sources"><h2>資料來源與核對範圍</h2><p>本頁於 ${date} 依平台公開官方資料核對，未宣稱使用本人帳戶完成實測。介面、地區資格、付款方式、費率及可用產品可能變動，操作前請回到本人帳戶與官方頁面確認。</p><ol>${a.sources.map(([name,url])=>`<li><a href="${url}" target="_blank" rel="noopener noreferrer">${name}</a></li>`).join('')}</ol></section><aside class="notice"><strong>風險提示：</strong>虛擬資產涉及價格、平台、付款、保管、轉帳與監管風險。本文僅供教育，不構成投資、法律或稅務建議；市價單可能滑價，限價單可能無法成交。</aside><section><h2>接下來可以看</h2><div class="continue-grid">${a.related.map(([small,title,url])=>`<a class="continue-card" href="${url}"><small>${small}</small><strong>${title}</strong><span>依學習路徑接著閱讀</span></a>`).join('')}</div></section></article><aside class="toc"><details open><summary>文章目錄</summary><ol>${toc}<li><a href="#faq">常見問題</a></li><li><a href="#sources">資料來源</a></li></ol><div class="meta">${a.category}<br>最後更新：${date}</div></details></aside></div></div></main>${siteTail}</html>`;
  write(a.url.replace('/tw/',''),traditional(html));
}

if(process.argv.includes('--normalize-only')){
  for(const rel of ['exchanges/okx/buy-crypto.html','exchanges/okx/spot-trading.html','exchanges/gate/buy-crypto.html','exchanges/gate/spot-trading.html'])write(rel,traditional(read(rel)));
  write('compare/binance-vs-okx/index.html',read('compare/binance-vs-okx/index.html').replaceAll('继续了解OKX实际操作','繼續了解OKX實際操作'));
  write('compare/binance-vs-gate/index.html',read('compare/binance-vs-gate/index.html').replaceAll('继续了解Gate实际操作','繼續了解Gate實際操作'));
  console.log('Normalized V3 Batch 3.1 article copy to Taiwan Traditional Chinese.');
  process.exit(0);
}

const articles=[
  {
    platform:'okx',platformName:'OKX',platformHub:'/tw/exchanges/okx/',logo:'/tw/assets/platform-okx.png',cover:'/tw/assets/covers/07.webp',url:'/tw/exchanges/okx/buy-crypto.html',category:'OKX 買幣教學',
    title:'OKX怎麼買幣？台灣新手完整操作教學',description:'OKX怎麼買幣？整理台灣使用者註冊驗證、第三方買幣、鏈上轉入與現貨購買路徑，說明費用、限制及常見錯誤。',
    points:['「買幣」是取得加密資產；「現貨交易」則是在訂單簿選擇交易對與訂單類型，兩者不是同一流程。','台灣使用者可見的付款方式與第三方服務資格以本人帳戶為準，不把其他地區功能直接套用。','若從台灣本地平台轉入USDT，必須在兩端選擇完全相同的幣種與網路。'],
    route:[['OKX專題','/tw/exchanges/okx/'],['註冊','/tw/exchanges/okx/register.html'],['充值','/tw/exchanges/okx/deposit.html'],['買幣', '/tw/exchanges/okx/buy-crypto.html'],['現貨交易','/tw/exchanges/okx/spot-trading.html'],['提幣','/tw/exchanges/okx/withdraw.html']],
    pathTitle:'OKX買幣路徑',cluster:[['註冊準備','/tw/exchanges/okx/register.html'],['資金轉入','/tw/exchanges/okx/deposit.html'],['取得資產','/tw/exchanges/okx/buy-crypto.html'],['現貨下單','/tw/exchanges/okx/spot-trading.html']],
    sections:[
      ['直接回答：OKX怎麼買幣？',p('<strong>先確認帳戶資格與資金來源，再選擇本人帳戶實際提供的買幣方式。</strong>常見路徑包括使用可用的第三方買幣管道、從其他平台鏈上轉入資產，或先取得USDT後進入現貨市場交換成目標資產。','本篇回答「如何取得資產」；若資金已在交易帳戶、準備使用BTC/USDT等交易對下單，請改看<a href="/tw/exchanges/okx/spot-trading.html">OKX現貨交易教學</a>。')],
      ['操作前要準備什麼？',ul(['使用本人可長期、安全存取的電子郵件或手機建立帳戶','依平台要求完成身分驗證與安全設定','確認本人所在地區可使用的付款方式與第三方服務','先了解總成本：付款管道費用、匯率價差、鏈上費用與交易手續費','若採鏈上轉入，先核對接收幣種、網路、地址及最低入帳額'])],
      ['三種買幣路徑怎麼選？',table(['路徑','適合情境','主要檢查'],[['第三方買幣','本人帳戶顯示可用管道，想直接以法幣取得資產','服務商、卡片或銀行資格、報價、費用、到帳資產'],['本地平台轉入','已能在台灣本地平台使用新台幣取得USDT等資產','兩端支援網路、提幣費、最低額度、地址'],['現貨交換','帳戶已有USDT等報價資產，準備用交易對買入','交易對、訂單類型、深度、滑價與手續費']],'OKX買幣路徑比較')],
      ['OKX買幣操作步驟',steps([['先選擇買幣入口','登入後查看「買幣」或「購買」入口，只使用本人帳戶實際顯示的方式。'],['選擇資產與金額','核對要支付的法幣、取得的資產、報價有效時間和預估到帳數量。'],['確認服務提供者','若由第三方處理付款，先閱讀其名稱、條款、KYC與退款規則。'],['核對最終訂單','確認總金額、費用、收款資產及入帳帳戶，再提交付款。'],['檢查資產紀錄','完成後查看訂單與資產頁；不要只依電子郵件、簡訊或第三方截圖判斷成功。']])],
      ['費用與風險怎麼看？',p('頁面顯示的報價不一定只包含單一「手續費」。第三方買幣可能包含服務費、匯率價差或發卡行費用；鏈上轉入則可能包含本地平台提幣費與網路費。','OKX官方資料說明，不同地區與帳戶可用的產品與規則可能不同。OKX已公告暫停台灣使用者以新台幣進行C2C交易，因此不能把舊版教學或其他地區的付款方式視為目前可用。')],
      ['最常見的操作錯誤',ul(['把「快捷買幣」與「現貨下單」當成同一功能','沒有確認第三方服務商與最終報價就付款','從其他平台轉入時選錯網路或漏填Memo／Tag','看到資產在資金帳戶後，誤以為已經建立現貨委託','相信私訊客服提供的付款地址、遠端協助或解凍費要求'])]
    ],
    video:{title:'OKX現貨操作畫面導讀',description:'影片用於理解資產進入現貨交易後的交易對與下單介面；第三方付款資格仍以本人帳戶為準。',poster:'/tw/assets/video-covers/spot-trading.webp',src:'/tw/assets/videos/如何进行现货交易.mp4',source:'影片來源：OKX官方教學素材；CoinVoyu提供繁體導讀，不宣稱為原創。',page:'/tw/videos/okx-buy/'},
    faq:[['台灣可以直接在OKX用新台幣買幣嗎？','是否可用取決於本人帳戶、所在地區和當下可用的第三方買幣管道；OKX已暫停台灣使用者以新台幣進行C2C交易，不應把舊版C2C流程視為現況。'],['快捷買幣和現貨交易有什麼不同？','快捷買幣通常依頁面報價與可用付款管道取得資產；現貨交易是在訂單簿選擇交易對、市價單或限價單。'],['從其他平台轉USDT到OKX要注意什麼？','兩端必須支援相同幣種與網路，並核對地址、Memo／Tag、最低額度和實際到帳數量。']],
    sources:[['OKX：如何在台灣透過第三方管道購買數位資產','https://www.okx.com/zh-hant/help/how-do-i-buy-crypto-with-a-third-party-channel-in-taiwan'],['OKX：如何買幣','https://www.okx.com/zh-hant/help/how-do-i-buy-crypto'],['OKX：交易手續費常見問題','https://www.okx.com/zh-hant/help/trading-fee-rules-faq'],['OKX：台灣TWD C2C下線公告','https://www.okx.com/zh-hant/help/twd-c2c-removal']],
    related:[['現貨教學','OKX現貨交易怎麼下單？','/tw/exchanges/okx/spot-trading.html'],['資金轉入','OKX充值教學','/tw/exchanges/okx/deposit.html'],['安全設定','OKX帳戶安全設定','/tw/exchanges/okx/security.html']]
  },
  {
    platform:'okx',platformName:'OKX',platformHub:'/tw/exchanges/okx/',logo:'/tw/assets/platform-okx.png',cover:'/tw/assets/covers/16.webp',url:'/tw/exchanges/okx/spot-trading.html',category:'OKX 現貨交易',
    title:'OKX現貨交易怎麼下單？市價單與限價單教學',description:'OKX現貨交易教學，說明交易對、市價單、限價單、下單撤單、成交紀錄與手續費，協助台灣新手理解訂單簿操作。',
    points:['現貨交易是在訂單簿用一種資產交換另一種資產，不等於信用卡或第三方買幣。','市價單重視立即成交但可能滑價；限價單控制價格但可能等待或不成交。','限價單也可能成為吃單，實際費率取決於訂單是否立即與既有委託成交。'],
    route:[['OKX專題','/tw/exchanges/okx/'],['充值','/tw/exchanges/okx/deposit.html'],['買幣','/tw/exchanges/okx/buy-crypto.html'],['現貨交易','/tw/exchanges/okx/spot-trading.html'],['手續費','/tw/exchanges/okx/fees.html'],['提幣','/tw/exchanges/okx/withdraw.html']],
    pathTitle:'OKX現貨操作路徑',cluster:[['準備資產','/tw/exchanges/okx/buy-crypto.html'],['現貨下單','/tw/exchanges/okx/spot-trading.html'],['核對費用','/tw/exchanges/okx/fees.html'],['資產提領','/tw/exchanges/okx/withdraw.html']],
    sections:[
      ['什麼是OKX現貨交易？',p('<strong>現貨交易是使用交易帳戶中的資產，透過交易對買入或賣出另一種資產。</strong>例如BTC/USDT代表以USDT計價BTC；買入方向通常是支付USDT取得BTC，賣出方向則相反。','現貨不等於合約。一般全額現貨沒有槓桿強制平倉機制，但資產價格仍可能大幅下跌。')],
      ['下單前先看懂交易對',table(['畫面資訊','代表什麼','新手要核對'],[['BTC/USDT','BTC是基礎資產，USDT是報價資產','買入或賣出方向是否正確'],['訂單簿','市場上等待成交的買單與賣單','價差、深度與大額滑價'],['可用餘額','目前可用於下單的資產','是否仍在其他帳戶或被掛單占用'],['未成交委託','尚未完全成交的訂單','剩餘數量、價格與撤單按鈕']],'OKX現貨介面說明')],
      ['市價單與限價單怎麼選？',table(['訂單','如何執行','主要風險'],[['市價單','按當時訂單簿可取得的價格盡快成交','成交價可能分布在多個檔位，產生滑價'],['限價單','設定最高買價或最低賣價，符合條件才成交','可能長時間等待、部分成交或完全不成交']],'OKX現貨訂單比較')],
      ['OKX現貨下單步驟',steps([['確認資金位置','依目前帳戶架構確認資產可用於交易；需要時先完成帳戶間劃轉。'],['搜尋交易對','選擇正確的基礎資產與報價資產，例如BTC/USDT。'],['選擇買入或賣出','重新核對方向，避免把預定買入操作成賣出。'],['設定訂單類型','市價單輸入金額或數量；限價單另設定願意接受的價格。'],['提交前再次核對','查看預估數量、可用餘額、訂單價格與可能費用。'],['查看成交或撤單','未成交限價單可在委託區查看；撤單只取消尚未成交部分。']])],
      ['成交與手續費如何確認？',p('手續費取決於實際成交方式，而不只取決於按下「市價」或「限價」。立即與訂單簿既有委託成交的部分通常屬於吃單；進入訂單簿等待後續撮合的部分通常屬於掛單。','費率會依帳戶等級、交易對與平台目前規則而異。下單前應查看本人帳戶顯示的費率，成交後再核對成交明細中的實際費用。')],
      ['常見錯誤與風險控制',ul(['沒有確認交易對，誤用不同的報價資產','市價單只看按鈕價格，忽略深度與滑價','限價單價格遠離市場後，以為系統故障','只看委託成功，沒有查看是否成交或部分成交','把現貨頁切換到合約或槓桿產品後仍沿用現貨理解','追隨私訊中的指定幣種、價格或保證獲利說法'])]
    ],
    video:{title:'OKX現貨下單操作',description:'使用OKX官方教學畫面理解交易對、買賣方向與訂單區；介面與可用功能以本人帳戶為準。',poster:'/tw/assets/video-covers/spot-trading.webp',src:'/tw/assets/videos/如何进行现货交易.mp4',source:'影片來源：OKX官方教學素材；CoinVoyu提供繁體導讀與風險核對，不宣稱為原創。',page:'/tw/videos/okx-buy/'},
    faq:[['OKX市價單一定會按畫面價格成交嗎？','不一定。市價單會依當時訂單簿深度成交，可能分成多個價格，快速波動或深度不足時會產生滑價。'],['限價單一定是Maker嗎？','不一定。如果限價單提交後立即與既有委託成交，仍可能被視為Taker；只有進入訂單簿等待撮合的部分才是Maker。'],['限價單撤銷後會收交易費嗎？','未成交部分一般沒有交易成交費；已成交部分仍按實際成交角色計費，應以帳戶成交明細為準。']],
    sources:[['OKX：如何進行現貨交易','https://www.okx.com/zh-hant/help/cryptocurrency-trading-app-web'],['OKX：什麼是限價單','https://www.okx.com/en-us/help/what-a-limit-order'],['OKX：交易手續費常見問題','https://www.okx.com/zh-hant/help/trading-fee-rules-faq']],
    related:[['取得資產','OKX怎麼買幣？','/tw/exchanges/okx/buy-crypto.html'],['費用核對','OKX手續費怎麼算？','/tw/exchanges/okx/fees.html'],['提幣教學','OKX如何安全提幣？','/tw/exchanges/okx/withdraw.html']]
  },
  {
    platform:'gate',platformName:'Gate',platformHub:'/tw/exchanges/gate/',logo:'/tw/assets/platform-gate.webp',cover:'/tw/assets/covers/08.webp',url:'/tw/exchanges/gate/buy-crypto.html',category:'Gate 買幣教學',
    title:'Gate怎麼買幣？台灣新手操作指南',description:'Gate怎麼買幣？整理台灣使用者帳戶驗證、第三方買幣、鏈上轉入與現貨購買路徑，說明費用、限制與常見錯誤。',
    points:['先確認本人帳戶實際提供的買幣管道，不把其他國家或舊版P2P流程直接套用到台灣。','直接買幣、鏈上轉入與現貨交易是不同路徑，費用與風險也不同。','本篇依Gate官方說明整理操作流程；介面、付款管道與可用功能仍以本人帳戶顯示為準。'],
    route:[['Gate專題','/tw/exchanges/gate/'],['註冊','/tw/exchanges/gate/register.html'],['充值','/tw/exchanges/gate/deposit.html'],['買幣','/tw/exchanges/gate/buy-crypto.html'],['現貨交易','/tw/exchanges/gate/spot-trading.html'],['提幣','/tw/exchanges/gate/withdraw.html']],
    pathTitle:'Gate買幣路徑',cluster:[['註冊準備','/tw/exchanges/gate/register.html'],['資金轉入','/tw/exchanges/gate/deposit.html'],['取得資產','/tw/exchanges/gate/buy-crypto.html'],['現貨下單','/tw/exchanges/gate/spot-trading.html']],
    sections:[
      ['直接回答：Gate怎麼買幣？',p('<strong>登入並完成平台要求的驗證後，先查看本人帳戶可用的買幣管道。</strong>可能的路徑包括Gate Connect等第三方管道、從台灣本地平台鏈上轉入資產，或先取得USDT後在Gate現貨市場交換成其他資產。','本篇處理「資產如何進入帳戶」；若帳戶已有USDT並準備選擇交易對下單，請看<a href="/tw/exchanges/gate/spot-trading.html">Gate現貨交易教學</a>。')],
      ['操作前先完成哪些準備？',ul(['核對Gate官方網站或App入口與本人地區資格','使用本人資料完成平台與付款服務商要求的身分驗證','確認付款頁面屬於Gate或清楚標示的第三方服務商','了解報價、服務費、匯率、發卡行費用與可能的鏈上費用','設定2FA、防釣魚與提幣保護，不接受私訊代操作'])],
      ['Gate常見買幣路徑',table(['路徑','操作重點','不應忽略'],[['第三方買幣','選擇法幣、資產、金額與本人帳戶顯示的管道','服務商資格、付款失敗、退款、總報價'],['鏈上轉入','先在Gate取得當次入金地址，再從發送端提幣','幣種、網路、Memo／Tag、最低額度'],['現貨交換','帳戶已有報價資產後選擇交易對下單','買賣方向、訂單類型、深度、滑價與費用']],'Gate買幣路徑比較')],
      ['Gate買幣操作步驟',steps([['進入買幣頁面','只從官方入口登入，查看本人帳戶當下可用選項。'],['選擇支付與取得資產','確認法幣、目標資產、金額和付款管道，不套用其他地區教學。'],['閱讀第三方條款','若由Gate Connect或其他合作方提供服務，先確認其KYC、費用與退款規則。'],['核對訂單資訊','檢查支付金額、預估到帳、報價有效時間與資產入帳位置。'],['查看正式紀錄','付款後回到訂單與資產頁確認狀態；不要按陌生客服要求再次付款。']])],
      ['費用與付款風險',p('第三方買幣可能同時涉及管道服務費、匯率價差、發卡行或銀行費用。從本地平台鏈上轉入則要計算提幣費、網路成本與最低入帳額。','不同帳戶看到的付款管道和報價可能不同，因此本頁不列固定費率、固定到帳時間，也不保證特定付款方式一定可用。')],
      ['最常見的操作錯誤',ul(['直接套用其他地區的P2P、銀行卡或第三方付款流程','把第三方付款頁面誤認為Gate站內訂單頁面','鏈上轉入時只看地址開頭，沒有確認完整網路','買入後資產尚未到帳就重複付款','誤把快捷買幣報價當成現貨訂單簿價格','相信假客服要求提供驗證碼、接受遠端控制或支付額外解凍費'])]
    ],
    faq:[['台灣使用者一定能使用Gate Connect買幣嗎？','不能保證。是否可用取決於本人所在地區、帳戶狀態、付款管道和合作服務商規則，應以帳戶實際頁面為準。'],['Gate買幣和Gate現貨交易相同嗎？','不同。買幣入口通常依據管道報價取得資產；現貨交易是在訂單簿使用交易對、市價單或限價單。'],['Gate買幣頁面和本文不一樣怎麼辦？','平台介面與可用管道可能更新，也可能因地區或帳戶狀態而不同。提交付款或轉帳前，應以本人帳戶畫面和Gate官方說明中心的最新資訊為準。']],
    sources:[['Gate：法幣買幣教學中心','https://www.gate.com/zh-tw/help/card'],['Gate：透過Gate Connect使用信用卡或簽帳卡買幣','https://www.gate.com/zh-tw/help/card/instruc/35242/buy-crypto-with-credit-debit-card-via-gate-connect-tutorial?category=card'],['Gate：現貨交易介紹','https://www.gate.com/zh-tw/help/trade/spot/17244']],
    related:[['現貨教學','Gate現貨交易怎麼下單？','/tw/exchanges/gate/spot-trading.html'],['資金轉入','Gate充值教學','/tw/exchanges/gate/deposit.html'],['安全設定','Gate帳戶安全設定','/tw/exchanges/gate/security.html']]
  },
  {
    platform:'gate',platformName:'Gate',platformHub:'/tw/exchanges/gate/',logo:'/tw/assets/platform-gate.webp',cover:'/tw/assets/covers/16.webp',url:'/tw/exchanges/gate/spot-trading.html',category:'Gate 現貨交易',
    title:'Gate現貨交易怎麼下單？市價單與限價單教學',description:'Gate現貨交易教學，說明交易對、訂單簿、市價單、限價單、下單撤單、成交與手續費，協助台灣新手理解Gate現貨操作。',
    points:['Gate現貨交易使用交易對與訂單簿，不等於第三方管道直接買幣。','市價單按目前可成交價格執行，深度不足時可能產生滑價；限價單則可能等待或不成交。','Gate另有BBO等訂單工具，本篇先聚焦新手最需要理解的市價單與一般限價單。'],
    route:[['Gate專題','/tw/exchanges/gate/'],['充值','/tw/exchanges/gate/deposit.html'],['買幣','/tw/exchanges/gate/buy-crypto.html'],['現貨交易','/tw/exchanges/gate/spot-trading.html'],['手續費','/tw/exchanges/gate/fees/'],['提幣','/tw/exchanges/gate/withdraw.html']],
    pathTitle:'Gate現貨操作路徑',cluster:[['準備資產','/tw/exchanges/gate/buy-crypto.html'],['現貨下單','/tw/exchanges/gate/spot-trading.html'],['核對費用','/tw/exchanges/gate/fees/'],['資產提領','/tw/exchanges/gate/withdraw.html']],
    sections:[
      ['什麼是Gate現貨交易？',p('<strong>Gate現貨交易是以一種加密資產作為報價，透過訂單簿買入或賣出另一種資產。</strong>例如BTC/USDT中，BTC是基礎資產，USDT是報價資產。','現貨交易會直接改變帳戶持有的資產；它不同於合約交易，不應把槓桿、保證金或強制平倉規則套入一般現貨流程。')],
      ['Gate交易頁有哪些重點？',table(['區域','作用','新手檢查'],[['交易對','決定買賣資產與報價資產','幣種名稱、報價資產、買賣方向'],['訂單簿','顯示等待成交的買單與賣單','價差、市場深度、可成交數量'],['下單區','選擇訂單類型並輸入價格或數量','市價／限價、價格、數量、可用餘額'],['目前委託','查看尚未完全成交的訂單','部分成交、剩餘數量、撤單操作']],'Gate現貨頁面說明')],
      ['市價單、限價單與BBO',table(['類型','執行方式','主要風險'],[['市價單','按當時訂單簿可成交的最佳價格執行','可能跨多個檔位成交並產生滑價'],['一般限價單','自行設定價格，達到條件才成交','可能等待、部分成交或不成交'],['BBO限價單','依選定的訂單簿檔位自動帶入委託價','仍是限價邏輯，不等於保證立即成交']],'Gate訂單類型比較')],
      ['Gate現貨下單步驟',steps([['進入現貨交易頁','登入後從「交易」進入現貨區域，不要誤入合約或槓桿頁面。'],['選擇正確交易對','搜尋目標資產，確認基礎資產與報價資產。'],['選擇買入或賣出','核對方向與可用餘額，再選市價或限價。'],['輸入價格與數量','限價單設定委託價和數量；市價單依頁面要求輸入金額或數量。'],['確認並提交訂單','提交前查看交易對、方向、估算數量和可能費用。'],['查看成交或撤單','未成交部分出現在目前委託；撤單不會逆轉已成交部分。']])],
      ['成交、手續費與資產紀錄',p('成交後應查看成交紀錄和帳單明細，而不只看下單成功提示。手續費只對實際成交部分收取，具體費率由帳戶等級、掛單方／吃單方身分與平台目前規則決定。','掛單方或吃單方身分取決於訂單如何成交。一筆限價單若立即與訂單簿既有委託成交，也可能按吃單方費率計費。')],
      ['常見錯誤與安全提醒',ul(['選錯交易對或報價資產','把賣出操作誤按成買入，或反向操作','市價單忽略深度，最終成交均價偏離預期','限價單未成交卻以為已持有目標資產','只取消剩餘委託，誤以為已成交部分也被撤回','從社群連結進入假交易頁或接受私訊代下單'])]
    ],
    faq:[['Gate市價單會按同一個價格全部成交嗎？','不一定。市價單會依訂單簿可用深度成交，可能跨多個檔位，最終平均價格可能和畫面上的即時價格不同。'],['Gate限價單沒有成交怎麼辦？','先查看目前委託、價格是否仍符合市場、可用餘額和訂單狀態；可以撤銷尚未成交部分後重新評估，不應反覆追價。'],['Gate撤單後手續費會退回嗎？','未成交部分通常不會產生交易手續費；已成交部分仍按實際成交方式與費率計費，應查看帳單明細。']],
    sources:[['Gate：現貨交易介紹','https://www.gate.com/zh-tw/help/trade/spot/17244'],['Gate：幣幣交易操作流程','https://www.gate.com/zh-tw/help/trade/spot/16443'],['Gate：現貨交易手續費計算','https://www.gate.com/zh-tw/help/trade/spot/41629']],
    related:[['取得資產','Gate怎麼買幣？','/tw/exchanges/gate/buy-crypto.html'],['費用核對','Gate手續費怎麼算？','/tw/exchanges/gate/fees/'],['提幣教學','Gate如何安全提幣？','/tw/exchanges/gate/withdraw.html']]
  }
];

for(const article of articles)renderArticle(article);
if(process.argv.includes('--articles-only')){
  console.log('Rendered the four V3 Batch 3.1 articles only.');
  process.exit(0);
}

// Add FAQPage only where visible FAQ exists and no equivalent node is present.
const faqTargets=['buy-crypto/twd-buy-crypto/index.html','buy-crypto/withdraw-to-bank/index.html','learn/crypto-beginner-guide/index.html','learn/spot-vs-futures/index.html','compare/binance-vs-gate/index.html','compare/binance-vs-okx/index.html','compare/binance-vs-max/index.html'];
for(const rel of faqTargets){
  let html=read(rel);
  const match=html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if(!match)throw new Error(`${rel}: JSON-LD missing`);
  const data=JSON.parse(match[1]);
  const graph=data['@graph']||[data];
  if(graph.some(node=>node['@type']==='FAQPage'))continue;
  const questions=[...html.matchAll(/<details class="faq-item"><summary>([\s\S]*?)<\/summary><p>([\s\S]*?)<\/p><\/details>/g)].map(m=>({'@type':'Question',name:strip(m[1]),acceptedAnswer:{'@type':'Answer',text:strip(m[2])}}));
  if(!questions.length)throw new Error(`${rel}: visible FAQ not found`);
  const breadcrumb=graph.findIndex(node=>node['@type']==='BreadcrumbList');
  graph.splice(breadcrumb>=0?breadcrumb:graph.length,0,{'@type':'FAQPage',mainEntity:questions});
  data['@graph']=graph;
  html=html.replace(match[1],JSON.stringify(data));
  write(rel,html);
}

// llms.txt must recommend final canonical URLs, not compatibility aliases.
const llmsMap={
  '/tw/buy-crypto/buy-bitcoin-taiwan/':'/tw/buy/how-to-buy-bitcoin-taiwan.html','/tw/buy-crypto/buy-usdt-taiwan/':'/tw/buy/how-to-buy-usdt-taiwan.html','/tw/learn/what-is-usdt/':'/tw/learn/usdt/what-is-usdt.html','/tw/buy-crypto/usdt-to-twd/':'/tw/buy/usdt-to-twd.html','/tw/learn/what-is-bitcoin/':'/tw/learn/bitcoin/what-is-bitcoin.html','/tw/wallets/hot-vs-cold-wallet/':'/tw/security/hot-wallet-vs-cold-wallet.html','/tw/learn/trc20-vs-erc20/':'/tw/learn/usdt/trc20-vs-erc20.html','/tw/security/crypto-scams/':'/tw/security/crypto-scam-guide.html','/tw/security/account-security/':'/tw/security/account-security.html','/tw/exchanges/binance/register/':'/tw/exchanges/binance/register.html','/tw/exchanges/binance/referral-code/':'/tw/exchanges/binance/referral-code.html','/tw/exchanges/binance/fees/':'/tw/exchanges/binance/fees.html','/tw/exchanges/binance/safety/':'/tw/exchanges/binance/security.html','/tw/exchanges/binance/kyc/':'/tw/exchanges/binance/kyc.html','/tw/exchanges/okx/register/':'/tw/exchanges/okx/register.html','/tw/exchanges/okx/referral-code/':'/tw/exchanges/okx/referral-code.html','/tw/exchanges/okx/fees/':'/tw/exchanges/okx/fees.html','/tw/exchanges/gate/register/':'/tw/exchanges/gate/register.html','/tw/exchanges/gate/referral-code/':'/tw/exchanges/gate/referral-code.html'
};
let llms=read('llms.txt');
for(const [from,to] of Object.entries(llmsMap))llms=llms.replaceAll(origin+from,origin+to);
write('llms.txt',llms);

function redirectPage(title,target){return `<!doctype html><html lang="zh-TW"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}｜CoinVoyu 台灣</title><meta name="robots" content="noindex,follow"><link rel="canonical" href="${origin+target}"><meta http-equiv="refresh" content="0;url=${target}"></head><body><main><p>此入口已整合至 <a href="${target}">${title}</a>。</p></main></body></html>`}
write('buy-crypto/index.html',redirectPage('買幣教學中心','/tw/buy/'));
write('compare/index.html',redirectPage('平台比較中心','/tw/exchanges/comparison/'));

function replaceOnce(rel,from,to){let html=read(rel);const count=html.split(from).length-1;if(count!==1)throw new Error(`${rel}: expected 1 occurrence, found ${count}`);write(rel,html.replace(from,to))}

// Conversion Hub: retain layout, replace the two video stand-ins with complete article paths.
replaceOnce('exchanges/index.html','<li><a href="/tw/exchanges/okx/register.html"><b>1</b>OKX註冊教學</a></li><li><a href="/tw/exchanges/okx/referral-code.html"><b>2</b>OKX邀請碼怎麼填？</a></li><li><a href="/tw/exchanges/okx/security.html"><b>3</b>OKX帳戶安全設定</a></li><li><a href="/tw/exchanges/okx/deposit.html"><b>4</b>OKX充值教學</a></li><li><a href="/tw/videos/okx-buy/"><b>5</b>OKX買幣教學</a></li><li><a href="/tw/exchanges/okx/fees.html"><b>6</b>OKX手續費說明</a></li><li><a href="/tw/exchanges/okx/withdraw.html"><b>7</b>OKX提幣教學</a></li>','<li><a href="/tw/exchanges/okx/register.html"><b>1</b>OKX註冊教學</a></li><li><a href="/tw/exchanges/okx/referral-code.html"><b>2</b>OKX邀請碼怎麼填？</a></li><li><a href="/tw/exchanges/okx/security.html"><b>3</b>OKX帳戶安全設定</a></li><li><a href="/tw/exchanges/okx/deposit.html"><b>4</b>OKX充值教學</a></li><li><a href="/tw/exchanges/okx/buy-crypto.html"><b>5</b>OKX怎麼買幣？完整操作教學</a></li><li><a href="/tw/exchanges/okx/spot-trading.html"><b>6</b>OKX現貨交易怎麼下單？</a></li><li><a href="/tw/exchanges/okx/fees.html"><b>7</b>OKX手續費說明</a></li><li><a href="/tw/exchanges/okx/withdraw.html"><b>8</b>OKX提幣教學</a></li>');
replaceOnce('exchanges/index.html','<li><a href="/tw/exchanges/gate/register.html"><b>1</b>Gate註冊教學</a></li><li><a href="/tw/exchanges/gate/referral-code.html"><b>2</b>Gate邀請碼怎麼填？</a></li><li><a href="/tw/exchanges/gate/security.html"><b>3</b>Gate帳戶安全設定</a></li><li><a href="/tw/exchanges/gate/deposit.html"><b>4</b>Gate充值教學</a></li><li><a href="/tw/videos/gate-buy/"><b>5</b>Gate買幣教學</a></li><li><a href="/tw/exchanges/gate/fees/"><b>6</b>Gate手續費說明</a></li><li><a href="/tw/exchanges/gate/withdraw.html"><b>7</b>Gate提幣教學</a></li>','<li><a href="/tw/exchanges/gate/register.html"><b>1</b>Gate註冊教學</a></li><li><a href="/tw/exchanges/gate/referral-code.html"><b>2</b>Gate邀請碼怎麼填？</a></li><li><a href="/tw/exchanges/gate/security.html"><b>3</b>Gate帳戶安全設定</a></li><li><a href="/tw/exchanges/gate/deposit.html"><b>4</b>Gate充值教學</a></li><li><a href="/tw/exchanges/gate/buy-crypto.html"><b>5</b>Gate怎麼買幣？新手操作指南</a></li><li><a href="/tw/exchanges/gate/spot-trading.html"><b>6</b>Gate現貨交易怎麼下單？</a></li><li><a href="/tw/exchanges/gate/fees/"><b>7</b>Gate手續費說明</a></li><li><a href="/tw/exchanges/gate/withdraw.html"><b>8</b>Gate提幣教學</a></li>');

function insertBefore(rel,needle,block,marker){let html=read(rel);if(html.includes(marker))return;if(!html.includes(needle))throw new Error(`${rel}: insertion point missing`);write(rel,html.replace(needle,block+needle))}
const okxBlock='<section class="intent-path" data-v3-batch3-1="okx"><p class="tag">下一步操作</p><h2>從資金進入到完成現貨交易</h2><div class="intent-links"><a href="/tw/exchanges/okx/buy-crypto.html">OKX怎麼買幣？完整操作教學 →</a><a href="/tw/exchanges/okx/spot-trading.html">OKX現貨交易怎麼下單？ →</a></div></section>';
const gateBlock='<section class="intent-path" data-v3-batch3-1="gate"><p class="tag">下一步操作</p><h2>從資金進入到完成現貨交易</h2><div class="intent-links"><a href="/tw/exchanges/gate/buy-crypto.html">Gate怎麼買幣？新手操作指南 →</a><a href="/tw/exchanges/gate/spot-trading.html">Gate現貨交易怎麼下單？ →</a></div></section>';
insertBefore('exchanges/okx/index.html','<section id="faq">',okxBlock,'data-v3-batch3-1="okx"');
insertBefore('exchanges/gate/index.html','<section id="faq">',gateBlock,'data-v3-batch3-1="gate"');

for(const rel of ['exchanges/okx/register.html','exchanges/okx/deposit.html','exchanges/okx/security.html','exchanges/okx/withdraw.html'])insertBefore(rel,'<section id="faq">','<aside class="intent-path" data-v3-batch3-1-link="okx"><p class="tag">OKX操作教學</p><h3>準備好資金後怎麼買幣？</h3><div class="intent-links"><a href="/tw/exchanges/okx/buy-crypto.html">查看OKX買幣教學 →</a><a href="/tw/exchanges/okx/spot-trading.html">查看OKX現貨下單教學 →</a></div></aside>','data-v3-batch3-1-link="okx"');
for(const rel of ['exchanges/gate/register.html','exchanges/gate/deposit.html','exchanges/gate/security.html','exchanges/gate/withdraw.html'])insertBefore(rel,'<section id="faq">','<aside class="intent-path" data-v3-batch3-1-link="gate"><p class="tag">Gate操作教學</p><h3>準備好資金後怎麼買幣？</h3><div class="intent-links"><a href="/tw/exchanges/gate/buy-crypto.html">查看Gate買幣教學 →</a><a href="/tw/exchanges/gate/spot-trading.html">查看Gate現貨下單教學 →</a></div></aside>','data-v3-batch3-1-link="gate"');

replaceOnce('videos/okx-buy/index.html','<a href="/tw/exchanges/okx/">閱讀完整文字教學 →</a>','<a href="/tw/exchanges/okx/spot-trading.html">閱讀OKX現貨交易完整教學 →</a>');
replaceOnce('videos/gate-buy/index.html','<a href="/tw/exchanges/gate/">閱讀完整文字教學 →</a>','<a href="/tw/exchanges/gate/spot-trading.html">閱讀Gate現貨交易完整教學 →</a>');

// Keep three valuable OKX resource pages indexable by adding comprehensible entries.
insertBefore('videos/index.html','<h2>安全教學</h2>','<section class="intent-path" data-v3-batch3-1="okx-security-videos"><p class="tag">OKX安全操作</p><h2>OKX帳戶與官方管道核對</h2><p>這三個既有官方素材頁補充驗證器、官方管道與通行密鑰操作，不新增註冊CTA。</p><div class="intent-links"><a href="/tw/videos/auth/">OKX如何綁定身分驗證器？ →</a><a href="/tw/videos/official/">如何核對OKX官方管道？ →</a><a href="/tw/videos/passkey/">OKX通行密鑰怎麼設定？ →</a></div></section>','data-v3-batch3-1="okx-security-videos"');
insertBefore('exchanges/okx/security.html','<section id="faq">','<aside class="intent-path" data-v3-batch3-1="okx-security-resources"><p class="tag">安全操作影片</p><h3>搭配官方操作素材核對設定</h3><div class="intent-links"><a href="/tw/videos/auth/">綁定身分驗證器 →</a><a href="/tw/videos/official/">核對官方管道 →</a><a href="/tw/videos/passkey/">設定通行密鑰 →</a></div></aside>','data-v3-batch3-1="okx-security-resources"');

// Add contextual comparison links without changing the comparison layout.
insertBefore('compare/binance-vs-okx/index.html','<section id="faq">','<aside class="intent-path" data-v3-batch3-1="okx-compare"><p class="tag">看完比較後</p><h3>繼續了解OKX實際操作</h3><div class="intent-links"><a href="/tw/exchanges/okx/buy-crypto.html">OKX怎麼買幣？ →</a><a href="/tw/exchanges/okx/spot-trading.html">OKX現貨交易怎麼下單？ →</a></div></aside>','data-v3-batch3-1="okx-compare"');
insertBefore('compare/binance-vs-gate/index.html','<section id="faq">','<aside class="intent-path" data-v3-batch3-1="gate-compare"><p class="tag">看完比較後</p><h3>繼續了解Gate實際操作</h3><div class="intent-links"><a href="/tw/exchanges/gate/buy-crypto.html">Gate怎麼買幣？ →</a><a href="/tw/exchanges/gate/spot-trading.html">Gate現貨交易怎麼下單？ →</a></div></aside>','data-v3-batch3-1="gate-compare"');

// Sitemap uses final canonicals only; no noindex or meta-refresh compatibility pages.
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?walk(path.join(dir,entry.name)):[path.join(dir,entry.name)])}
const sitemapUrls=[];
for(const file of walk(tw).filter(file=>file.endsWith('.html'))){
  const html=fs.readFileSync(file,'utf8');
  if(/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html)||/<meta[^>]+http-equiv="refresh"/i.test(html))continue;
  const canonical=(html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)||[])[1];
  if(canonical?.startsWith(origin+'/tw/'))sitemapUrls.push(canonical);
}
const unique=[...new Set(sitemapUrls)].sort();
if(unique.length!==sitemapUrls.length)throw new Error('Duplicate canonical detected while building Taiwan sitemap');
write('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${unique.map(url=>`  <url><loc>${url}</loc><lastmod>2026-10-08</lastmod></url>`).join('\n')}\n</urlset>\n`);

write('v3-batch3-1.json',JSON.stringify({version:'CoinVoyu Taiwan V3 Batch 3.1',scope:'Taiwan-only technical SEO and conversion cluster',updated:'2026-10-08',baseline:'55fbf4c',newArticles:articles.map(a=>a.url),faqSchema:faqTargets.map(x=>'/tw/'+x.replace(/index\.html$/,'')),redirects:{'/tw/buy-crypto/':'/tw/buy/','/tw/compare/':'/tw/exchanges/comparison/'},resourcePages:['/tw/videos/auth/','/tw/videos/official/','/tw/videos/passkey/'],referrals:Object.fromEntries(Object.entries(referrals).map(([k,v])=>[k,{code:v.code,url:v.url}]))},null,2)+'\n');
console.log(`Built Taiwan V3 Batch 3.1: ${articles.length} articles, ${unique.length} sitemap URLs.`);
