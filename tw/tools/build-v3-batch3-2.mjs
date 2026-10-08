import fs from 'node:fs';
import path from 'node:path';

const tw=path.resolve(import.meta.dirname,'..');
const origin='https://www.coinvoyu.com';
const date='2026年10月08日';
const iso='2026-10-08T00:00:00+08:00';
const read=rel=>fs.readFileSync(path.join(tw,rel),'utf8');
const write=(rel,data)=>{const target=path.join(tw,rel);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,data)};
const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const p=(...items)=>items.map(x=>`<p>${x}</p>`).join('');
const ul=items=>`<ul>${items.map(x=>`<li>${x}</li>`).join('')}</ul>`;
const ol=items=>`<ol>${items.map(x=>`<li>${x}</li>`).join('')}</ol>`;
const table=(heads,rows,label)=>`<div class="table-scroll" role="region" aria-label="${label}" tabindex="0"><table><thead><tr>${heads.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const steps=items=>`<div class="article-steps">${items.map((x,i)=>`<div class="article-step"><strong>${i+1}</strong><div><h3>${x[0]}</h3><p>${x[1]}</p></div></div>`).join('')}</div>`;

const shell=read('learn/bitcoin/what-is-bitcoin.html');
const siteHeader=(shell.match(/<header class="header">[\s\S]*?<\/header>/)||[])[0];
const siteTail=(shell.match(/<footer class="footer">[\s\S]*?<\/body>/)||[])[0];
if(!siteHeader||!siteTail)throw new Error('Unable to resolve Taiwan article shell');

function renderArticle(a){
  const canonical=origin+a.url;
  const graph=[
    {'@type':'Article',headline:a.title,description:a.description,url:canonical,image:origin+a.cover,inLanguage:'zh-TW',datePublished:iso,dateModified:iso,author:{'@type':'Organization',name:'CoinVoyu 編輯團隊',url:origin+'/tw/about/author/'},publisher:{'@type':'Organization',name:'CoinVoyu',url:origin+'/tw/'}},
    {'@type':'FAQPage',mainEntity:a.faq.map(([q,answer])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:answer}}))},
    {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'CoinVoyu 台灣',item:origin+'/tw/'},{'@type':'ListItem',position:2,name:a.hubName,item:origin+a.hub},{'@type':'ListItem',position:3,name:a.title,item:canonical}]}
  ];
  const toc=a.sections.map((section,i)=>`<li><a href="#section-${i+1}">${section[0]}</a></li>`).join('');
  const html=`<!doctype html><html lang="zh-TW"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(a.title)}｜CoinVoyu 台灣</title><meta name="description" content="${esc(a.description)}"><link rel="canonical" href="${canonical}"><meta name="robots" content="index,follow,max-image-preview:large"><meta property="og:type" content="article"><meta property="og:locale" content="zh_TW"><meta property="og:title" content="${esc(a.title)}"><meta property="og:description" content="${esc(a.description)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${origin+a.cover}"><meta name="twitter:card" content="summary_large_image"><meta name="theme-color" content="#F8FAFC"><link rel="icon" href="/tw/assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/tw/assets/site.css"><script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':graph})}</script></head><body id="top" data-article-type="A" data-cluster="${a.cluster}">${siteHeader}<main id="main"><div class="wrap"><nav class="crumb" aria-label="麵包屑"><a href="/tw/">首頁</a><span>›</span><a href="${a.hub}">${a.hubName}</a><span>›</span><span aria-current="page">${a.title}</span></nav><header class="page-head"><p class="tag">${a.category}</p><h1>${a.title}</h1><p class="lead">${a.description}</p><div class="byline"><a href="/tw/about/author/">作者／編輯：CoinVoyu 編輯團隊</a><span>首次發布：${date}</span><span>最後更新：${date}</span></div></header><nav class="cluster-route" data-cluster="${a.cluster}" aria-label="主題學習路徑"><strong>主題路徑</strong>${a.route.map(([label,url])=>`<a href="${url}"${url===a.url?' aria-current="page"':''}>${label}</a>`).join('<span aria-hidden="true">›</span>')}</nav><div class="article-grid"><article class="article-body"><img class="cover-main" src="${a.cover}" alt="${a.title}主題插圖" width="1200" height="675" fetchpriority="high"><aside class="points article-summary"><h2>先看重點</h2>${ul(a.points)}</aside><nav class="cluster-path" aria-label="相關學習路徑"><strong>${a.pathTitle}</strong><div class="cluster-links">${a.relatedTop.map(([label,url])=>`<a class="cluster-link" href="${url}"${url===a.url?' aria-current="page"':''}>${label}</a>`).join('')}</div></nav><details class="mobile-toc"><summary>展開目錄</summary><ol>${toc}<li><a href="#faq">常見問題</a></li><li><a href="#sources">資料來源</a></li></ol></details>${a.sections.map((section,i)=>`<h2 id="section-${i+1}">${section[0]}</h2>${section[1]}`).join('')}<section id="faq"><h2>常見問題</h2><div class="faq-grid">${a.faq.map(([q,answer])=>`<details class="faq-item"><summary>${q}</summary><p>${answer}</p></details>`).join('')}</div></section><section class="sources" id="sources"><h2>資料來源與核對範圍</h2><p>本頁於 ${date} 核對。引用官方或投資人教育資料時，會區分原始聲明、產品規則與編輯整理；法規、產品資格、費用與市場資料可能變動，請以發布機關及本人服務提供者的最新資訊為準。</p><ol>${a.sources.map(([name,url,note])=>`<li><a href="${url}" target="_blank" rel="noopener noreferrer">${name}</a>${note?`<br><span>${note}</span>`:''}</li>`).join('')}</ol></section><aside class="notice"><strong>風險提示：</strong>${a.risk}</aside><section><h2>接下來可以看</h2><div class="continue-grid">${a.next.map(([small,title,url])=>`<a class="continue-card" href="${url}"><small>${small}</small><strong>${title}</strong><span>依學習路徑接著閱讀</span></a>`).join('')}</div></section></article><aside class="toc"><details open><summary>文章目錄</summary><ol>${toc}<li><a href="#faq">常見問題</a></li><li><a href="#sources">資料來源</a></li></ol><div class="meta">${a.category}<br>最後更新：${date}</div></details></aside></div></div></main>${siteTail}</html>`;
  write(a.url.replace('/tw/',''),html);
}

const articles=[
  {
    url:'/tw/learn/bitcoin/why-bitcoin-price-moves.html',title:'Bitcoin價格為什麼會漲跌？影響比特幣價格的關鍵因素',description:'Bitcoin價格由全球市場買賣供需形成；宏觀流動性、ETF資金、減半、槓桿清算與市場情緒會在不同時間尺度影響波動，但沒有單一因素能保證漲跌。',category:'Bitcoin 市場基礎',cluster:'bitcoin',hub:'/tw/learn/bitcoin/',hubName:'Bitcoin學習中心',cover:'/tw/assets/covers/21.webp',
    points:['Bitcoin沒有單一官方價格；不同交易場所的買賣委託、流動性與套利共同形成接近但不完全相同的市場價格。','利率、美元流動性、ETF資金流、減半與監管消息可能同時作用，相關性不等於單一事件必然造成上漲或下跌。','短期劇烈波動常被槓桿、清算、深度不足與情緒放大；成交量要搭配價格區間與市場結構解讀。'],
    route:[['Bitcoin是什麼','/tw/learn/bitcoin/what-is-bitcoin.html'],['價格漲跌', '/tw/learn/bitcoin/why-bitcoin-price-moves.html'],['Bitcoin ETF','/tw/learn/bitcoin/bitcoin-etf-guide.html'],['台灣怎麼買Bitcoin','/tw/buy/how-to-buy-bitcoin-taiwan.html']],pathTitle:'Bitcoin市場理解路徑',relatedTop:[['Bitcoin是什麼','/tw/learn/bitcoin/what-is-bitcoin.html'],['價格影響因素','/tw/learn/bitcoin/why-bitcoin-price-moves.html'],['Bitcoin ETF','/tw/learn/bitcoin/bitcoin-etf-guide.html'],['台灣購買路徑','/tw/buy/how-to-buy-bitcoin-taiwan.html']],
    sections:[
      ['直接回答：Bitcoin價格為什麼會漲跌？',p('<strong>因為願意買入與願意賣出的資金持續改變。</strong>Bitcoin交易全天進行，價格是市場參與者在不同平台對下一筆成交價的共同結果。當買盤願意提高價格、可售供給不足時容易上漲；賣壓增加或買盤撤退時容易下跌。','價格變化通常不是「某一則新聞造成」的單線因果。更實用的做法，是分開觀察長期供給結構、中期資金環境，以及短期槓桿與情緒。')],
      ['Bitcoin價格如何形成？',p('交易所的訂單簿會排列買價與賣價，市價單與限價單成交後形成最新價格。不同平台的使用者、交易深度與報價幣別不同，所以同一時間可能出現小幅價差；套利交易通常會縮小差距。','「市值增加多少」不等於有同等金額的新資金流入。市值是最新價格乘以流通量，價格在深度較薄時也可能被相對較小的訂單推動。')+table(['觀察項目','能回答什麼','不能單獨證明什麼'],[['價格','最近一筆交易的成交水準','下一步必然上漲或下跌'],['成交量','特定期間內的交易活躍度','所有成交都是新資金買入'],['訂單簿深度','不同價位可見委託量','隱藏訂單與未來委託'],['波動率','價格變動幅度','漲跌方向']],'Bitcoin市場數據解讀')],
      ['宏觀經濟、利率與流動性',p('利率、美元走勢、通膨預期與市場風險偏好會影響資金願意承擔風險的程度。資金成本提高時，高波動資產可能承受壓力；流動性改善時，風險性資產也可能受益。','但Bitcoin與股票、美元或黃金的關係會隨時期改變。看到兩項資產同漲同跌，只能視為需要繼續查證的相關性，不能直接當作固定因果。')],
      ['ETF資金流應該怎麼看？',p('美國現貨Bitcoin ETP的申購與贖回會影響產品需要持有或交付的Bitcoin曝險，因此每日資金流常被市場關注。淨流入代表該類產品當日整體新增需求高於流出，但不等於所有買盤，也不保證隔日上漲。','還要同時看市場深度、其他地區交易、衍生品部位與資金流是否持續。想理解產品結構，可閱讀<a href="/tw/learn/bitcoin/bitcoin-etf-guide.html">Bitcoin ETF完整說明</a>。')],
      ['減半為什麼重要，又有哪些局限？',p('Bitcoin每210,000個區塊調降區塊補貼，讓新增供給按既定規則放慢。減半直接改變的是礦工取得的新幣數量，不是自動替市場設定價格。','市場可能提前反映預期；礦工成本、既有流通量、需求與整體資金環境也會同時作用。因此「減半後一定上漲」是把供給規則誤寫成價格保證。')],
      ['槓桿、清算與短期連鎖波動',p('槓桿交易用較少保證金承擔較大的部位。價格快速逆向時，平台可能依規則減倉或清算；大量部位在相近價位被迫平倉，可能短時間放大漲跌。','未平倉量、資金費率與清算資料可以協助理解市場擁擠程度，但不同資料商口徑不一，也不能用來精準預測轉折。新手不應把清算熱圖視為保證會到達的價格目標。')],
      ['交易情緒、消息與常見誤判',ul(['把單一新聞標題當成唯一原因，忽略價格可能已提前反映預期','只看成交量增加，沒有分辨上漲放量、下跌放量或區間換手','看到ETF淨流入就推論價格必然上漲，忽略其他市場的賣壓','把減半歷史走勢當作未來必然重演的週期','用短期價格變動證明某個長期敘事一定正確','在劇烈波動時使用過高槓桿，低估滑價與清算風險'])],
      ['新手如何建立不預測漲跌的觀察框架？',steps([['先確認時間尺度','把數小時的波動、數週的資金變化與數年的供給機制分開。'],['交叉檢查資料','價格搭配成交量、深度與波動；ETF流量搭配產品公告與更長期間趨勢。'],['辨識已知與推論','官方公告是已知資訊，「一定利多」則是市場推論。'],['先定義風險','在交易前決定可承受損失、部位大小與退出条件，不因单一指標改成無上限加碼。']])]
    ],
    faq:[['Bitcoin減半後一定會漲嗎？','不一定。減半降低新增供給速度，但需求、流動性、礦工行為與市場預期都會影響價格。'],['ETF淨流入等於Bitcoin一定上漲嗎？','不等於。淨流入是重要需求訊號之一，但市場還有其他現貨、衍生品與賣方資金。'],['成交量越大越看多嗎？','不是。成交量只表示交易活躍度，需要搭配價格方向、區間位置與市場深度判讀。'],['Bitcoin價格可以被精準預測嗎？','沒有人能保證精準預測。較可靠的做法是辨識情境、資料限制與可承受風險。']],
    sources:[['CFTC：虛擬貨幣交易風險','https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/understand_risks_of_virtual_currency.html','供需、波動、槓桿與現貨市場風險'],['Bitcoin.org：Bitcoin減半','https://bitcoin.org/en/halving','區塊補貼與供給時程'],['SEC Investor.gov：Bitcoin與Ether ETP投資人公告','https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/ETPBulletinSeptember2024','產品曝險、費用、追蹤與波動風險']],risk:'本文用於理解價格形成，不提供買賣方向或保證預測。Bitcoin價格可能在短時間大幅波動，槓桿會放大損失與清算風險。',
    next:[['基礎概念','Bitcoin是什麼？','/tw/learn/bitcoin/what-is-bitcoin.html'],['產品理解','Bitcoin ETF是什麼？','/tw/learn/bitcoin/bitcoin-etf-guide.html'],['台灣路徑','台灣怎麼買Bitcoin？','/tw/buy/how-to-buy-bitcoin-taiwan.html']]
  },
  {
    url:'/tw/learn/bitcoin/bitcoin-etf-guide.html',title:'Bitcoin ETF是什麼？現貨與期貨產品差在哪？',description:'Bitcoin ETF通常指在證券市場交易、提供Bitcoin價格曝險的產品；美國現貨Bitcoin產品多為商品信託型ETP，與期貨ETF及直接持幣在法律結構、費用、托管與交易方式上不同。',category:'Bitcoin ETF完整說明',cluster:'bitcoin',hub:'/tw/learn/bitcoin/',hubName:'Bitcoin學習中心',cover:'/tw/assets/covers/22.webp',
    points:['ETF是交易所交易基金；ETP是更廣泛的交易所交易產品。美國現貨Bitcoin產品多為持有Bitcoin的商品信託型ETP，不是依1940年投資公司法註冊的傳統基金。','SEC允許特定產品上市交易，不等於認可Bitcoin本身，也不代表替投資人保證報酬或托管安排。','台灣投資人能否買到特定境外產品，取決於券商、客戶分類、商品限制與當時規則，不能把美國上市直接等同台灣人人可買。'],
    route:[['Bitcoin是什麼','/tw/learn/bitcoin/what-is-bitcoin.html'],['價格漲跌','/tw/learn/bitcoin/why-bitcoin-price-moves.html'],['Bitcoin ETF','/tw/learn/bitcoin/bitcoin-etf-guide.html'],['台灣怎麼買Bitcoin','/tw/buy/how-to-buy-bitcoin-taiwan.html']],pathTitle:'Bitcoin產品理解路徑',relatedTop:[['Bitcoin基礎','/tw/learn/bitcoin/what-is-bitcoin.html'],['市場價格','/tw/learn/bitcoin/why-bitcoin-price-moves.html'],['ETF與ETP','/tw/learn/bitcoin/bitcoin-etf-guide.html'],['直接買幣','/tw/buy/how-to-buy-bitcoin-taiwan.html']],
    sections:[
      ['直接回答：Bitcoin ETF是什麼？',p('<strong>它是在證券交易所買賣、讓投資人取得Bitcoin價格曝險的金融產品。</strong>媒體常把各類產品統稱「Bitcoin ETF」，但法律形式可能是ETF、商品信託型ETP或持有期貨合約的基金，必須看公開說明書。','投資人持有的是產品股份，不是可自行轉到鏈上錢包的Bitcoin。產品價格目標是反映標的曝險，仍可能受到費用、追蹤差異、交易時段與市場供需影響。')],
      ['ETF、ETP與美國現貨產品的法律結構',p('ETP是交易所交易產品的總稱，ETF只是其中一類。SEC投資人公告指出，美國現貨Bitcoin與Ether產品通常以交易所交易商品信託架構持有標的資產，並非依《1940年投資公司法》註冊的投資公司。','這個差異會影響產品適用的制度、估值與托管規範。閱讀產品時應核對註冊聲明、公開說明書、持有方式、保管機構與風險揭露，而不是只看名稱是否含有ETF。')],
      ['現貨Bitcoin ETP與期貨ETF差在哪？',table(['項目','現貨Bitcoin ETP','Bitcoin期貨ETF'],[['主要持有','Bitcoin或相關現貨曝險','受監管市場的Bitcoin期貨合約'],['價格來源','現貨參考價格與產品供需','期貨合約價格與轉倉'],['常見成本','贊助人／管理費、交易價差、追蹤差異','管理費、交易成本、期貨轉倉損益'],['特殊風險','托管、現貨市場、產品折溢價','期限結構、轉倉成本、期貨基差'],['是否能提幣','一般投資人不能把產品股份提到鏈上','不能']],'Bitcoin現貨與期貨產品比較')],
      ['ETF與直接持有Bitcoin怎麼比較？',table(['考量','交易所交易產品','直接持有Bitcoin'],[['交易管道','證券帳戶與市場交易時段','加密資產平台或錢包，市場通常全天運作'],['持有內容','產品股份與價格曝險','鏈上資產或平台帳戶中的資產請求權'],['私鑰責任','一般由產品與托管架構處理','自托管時由本人負責；平台托管時由平台控制'],['費用','產品費用、券商費用、買賣價差','交易費、平台價差、提領與網路費'],['用途','通常不能鏈上轉帳或支付','可在支援條件下轉帳與自托管'],['主要風險','產品、發行人、托管、追蹤與市場風險','價格、平台、金鑰、轉帳與網路風險']],'Bitcoin ETP與直接持幣比較')],
      ['管理費、追蹤誤差與交易成本',p('產品揭露的贊助人費或管理費會持續降低每股代表的淨資產；即使費率看似不高，持有時間越長影響越需要計算。買賣時還可能有券商費用、匯兌成本與買賣價差。','追蹤差異可能來自費用、現金部位、估值時間、股份供需與市場中斷。比較產品時應查看最新公開說明書，而不是沿用促銷期費率或新聞中的舊數字。')],
      ['資產托管與產品風險',p('現貨產品把私鑰管理交由產品指定的托管架構，不代表風險消失。投資人仍需理解托管集中、網路事件、價格來源、發行人營運、股份折溢價與底層現貨市場風險。','SEC核准上市規則並不是對Bitcoin、產品報酬或托管安排的背書。產品註冊與資訊揭露提供的是審閱資料，不是損失保證。')],
      ['ETF資金流入流出如何解讀？',p('單日淨流入表示該組產品申購需求高於贖回，可能形成現貨需求，但不等於市場只有買方。不同資料商可能採用不同估算時間與分類。','應觀察多日趨勢、總資產、成交量、價差與Bitcoin整體市場深度。資金流資料適合解釋已發生的產品活動，不應被寫成明日價格預測。')],
      ['台灣投資人購買前要核對什麼？',ol(['詢問本人券商是否提供該境外商品，以及適用的客戶资格與風險屬性要求。','核對產品代號、上市交易所、法律結構與最新公開說明書。','計算新台幣換匯、券商費用、產品費用、價差與稅務影響。','確認交易時段、價格波動、下單方式與海外市場休市差異。','不要把「美國可上市」理解為台灣非專業投資人一定可買。'])]
    ],
    faq:[['Bitcoin ETF會真的持有Bitcoin嗎？','要看產品結構。現貨Bitcoin ETP通常持有Bitcoin或相应现货曝險，期貨ETF則主要持有期貨合約。'],['買Bitcoin ETF等於擁有鏈上Bitcoin嗎？','不等於。一般投資人持有產品股份，不能直接取得或轉出對應私鑰。'],['SEC核准代表SEC認可Bitcoin嗎？','不是。SEC已明確表示核准特定產品上市交易不等於核准或背書Bitcoin本身。'],['台灣投資人一定能買美國Bitcoin ETF嗎？','不一定。要依本人券商、客戶分類、商品限制與當時法規確認。']],
    sources:[['SEC Investor.gov：Bitcoin與Ether ETP投資人公告','https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/ETPBulletinSeptember2024','現貨ETP結構、費用、追蹤與風險'],['SEC：現貨Bitcoin ETP核准聲明','https://www.sec.gov/newsroom/speeches-statements/gensler-statement-spot-bitcoin-011023','核准不等於背書Bitcoin'],['金融監督管理委員會：境外ETF受託買賣規範','https://law.fsc.gov.tw/LawContent.aspx?id=GL003962','台灣券商與非專業投資人限制須依現行規則核對']],risk:'境外商品、匯率、費用、稅務與投資資格因人而異。本文不提供證券推薦或法律、稅務建議，也不保證任何產品可供台灣所有投資人購買。',
    next:[['基礎概念','Bitcoin是什麼？','/tw/learn/bitcoin/what-is-bitcoin.html'],['市場理解','Bitcoin價格為什麼會漲跌？','/tw/learn/bitcoin/why-bitcoin-price-moves.html'],['直接持有','台灣怎麼買Bitcoin？','/tw/buy/how-to-buy-bitcoin-taiwan.html']]
  },
  {
    url:'/tw/learn/usdt/is-usdt-safe.html',title:'USDT安全嗎？脫鉤、儲備與凍結風險完整解析',description:'USDT以接近1美元為目標，但不是銀行美元存款，也不保證永遠維持1美元；持有者仍面對儲備、脫鉤、發行方凍結、平台托管、假代幣與轉錯網路等風險。',category:'USDT安全指南',cluster:'usdt',hub:'/tw/learn/usdt/',hubName:'USDT學習中心',cover:'/tw/assets/covers/05.webp',
    points:['USDT是由Tether發行、以美元為目标价值的代幣，不是銀行存款，也沒有「價格永遠固定」的保證。','儲備報告提供特定日期的資產分類與查核資訊，但不等同即時資料，也不應把證明性報告當成完整財務報表審計。','風險不只來自脫鉤：發行方可依條款凍結地址，平台可能出問題，使用者也可能收到假USDT、選錯網路或遇到釣魚。'],
    route:[['USDT是什麼','/tw/learn/usdt/what-is-usdt.html'],['USDT安全','/tw/learn/usdt/is-usdt-safe.html'],['台灣怎麼買USDT','/tw/buy/how-to-buy-usdt-taiwan.html'],['TRC20與ERC20','/tw/learn/usdt/trc20-vs-erc20.html']],pathTitle:'USDT安全學習路徑',relatedTop:[['USDT基礎','/tw/learn/usdt/what-is-usdt.html'],['安全風險','/tw/learn/usdt/is-usdt-safe.html'],['轉帳網路','/tw/learn/usdt/trc20-vs-erc20.html'],['詐騙防範','/tw/security/crypto-scam-guide.html']],
    sections:[
      ['直接回答：USDT安全嗎？',p('<strong>USDT可以降低相對於Bitcoin等資產的價格波動，但不能被視為零風險美元。</strong>它是鏈上代幣，由發行方管理發行與贖回，市場價格、儲備品質、平台托管、地址凍結與使用者操作都可能造成損失。','安全評估應拆成三層：發行方與儲備、持有或交易的平台，以及本人錢包和轉帳操作。只看到價格接近1美元，並不能證明其他風險不存在。')],
      ['USDT和美元是什麼關係？',p('Tether條款把USD₮描述為與美元掛鉤、由儲備支持的Tether Token。代幣本身不是法定貨幣，也不是銀行帳戶中的美元存款。','市場通常围绕1美元交易，但實際成交價由供需與流動性形成，可能短暫高於或低於1美元。一般交易所使用者也不等於符合Tether直接贖回的身分與最低額度要求。')],
      ['USDT如何維持相對穩定？',p('穩定機制仰賴發行、贖回安排，發行方持有的儲備，以及市場參與者在不同平台間的套利。當符合資格的參與者能以接近目標價值申購或贖回時，價差可能被縮小。','這套機制仍依賴發行方、銀行與交易對手、儲備資產流動性、合規限制及市場信心，因此不能把「設計為1美元」寫成「保證1美元」。')],
      ['儲備報告怎麼核驗？有哪些局限？',steps([['先到官方Reports與Reserves頁','確認報告發布者、涵蓋實體、基準日期與會計師事務所。'],['查看資產分類','不要只看總額，留意現金、短期證券、擔保貸款及其他資產的分類。'],['確認報告性質','查核意見或確信報告不一定等同完整年度財務報表審計。'],['留意時間差','報告反映特定日期，不能代表你閱讀當下的即時組成。'],['交叉核對條款','贖回資格、最低金額、費用與禁止使用情形以最新服務條款為準。']])+p('SEC投資人教育資料提醒，所謂「儲備證明」或第三方驗證不應被等同於依完整財報審計標準執行的審計。閱讀時要同時看範圍、方法、限制與基準日期。')],
      ['脫鉤風險是什麼？',p('脫鉤是市場價格偏離目標價值。可能原因包括大量贖回、流動性下降、儲備疑慮、銀行或交易對手事件、平台價格異常與整體市場恐慌。','要分清單一交易所的短暫報價與多個主要市場的廣泛偏離。價差很大時不要因為「一定回到1美元」而忽略交易深度、提領狀態與對手風險。')],
      ['USDT會被凍結嗎？',p('可能。Tether最新服務條款保留在適用法律、違反條款或其認為必要的情況下凍結代幣、封鎖地址、暫停服務或採取其他措施的權利。','這是中心化發行穩定幣與完全去中心化資產的重要差異。若資金來源涉及詐騙、制裁、司法要求或高風險對手方，可能產生額外合規風險。')],
      ['平台托管、假USDT與轉帳風險',table(['風險','可能後果','核對方式'],[['平台托管','暫停提領、營運或資安事件造成無法取回','查平台背景、資產政策、2FA與提領紀錄'],['假USDT','收到名稱相同但合約不同的代幣','從官方來源核對網路與合約地址'],['錯誤網路','資產未入帳或需付費處理，甚至無法找回','兩端選同一網路，先小額測試'],['釣魚授權','惡意網站取得代幣使用權限','只從可信入口連線並核對授權內容'],['地址凍結','特定地址的代幣无法转移','理解發行方條款及資金來源風險']],'USDT常見風險')],
      ['USDT和銀行美元存款差在哪？',table(['項目','USDT','銀行美元存款'],[['法律與發行','私人公司發行的鏈上代幣','銀行帳戶存款'],['價格','以1美元為目標，市場可偏離','帳戶面額以美元記錄'],['保障','不應假定有銀行存款保險','是否受保障依銀行、帳戶與司法管轄區制度'],['移轉','依區塊鏈網路與地址','依銀行支付系統與帳戶規則'],['主要風險','發行方、儲備、脫鉤、凍結、鏈上與平台風險','銀行、匯率、帳戶限制與跨境支付風險']],'USDT與銀行美元存款比較')],
      ['新手安全檢查清單',ul(['只從平台或發行方官方入口核對代幣與網路','不把價格接近1美元當成沒有信用與流動性風險','轉帳前核對幣種、網路、地址、Memo／Tag與最低額度','第一次使用新地址先做小額測試並等待入帳','不要向任何人提供助記詞、私鑰、驗證碼或遠端控制權','定期檢查平台提領狀態、儲備報告日期與服務條款變更','遇到折價、凍結或延遲時先停止追加資金並保存紀錄'])]
    ],
    faq:[['USDT一定等於1美元嗎？','不一定。USDT以1美元為目標價值，但市場價格可能因流動性、信心與平台狀況而偏離。'],['USDT是銀行美元存款嗎？','不是。USDT是私人發行方管理的鏈上代幣，不應假設享有銀行存款保障。'],['Tether可以凍結USDT嗎？','可以在其條款、適用法律或合規處理範圍內凍結代幣或封鎖地址。'],['儲備報告等於完整財務審計嗎？','不一定。要查看報告採用的準則、範圍與基準日期，不能只看「100%支持」的摘要文字。'],['怎麼避免收到假USDT？','從官方來源核對網路與合約地址，不只看名稱或圖示；首次轉帳先小額測試。']],
    sources:[['Tether：Token服務條款','https://tether.to/en/legal/','發行、儲備、贖回限制與凍結權利'],['Tether：Reports and Reserves常見問題','https://tether.to/en/faqs/?only-questions=true&search=How-often-does-Tether-provide-its-transparency-information','儲備資訊頻率與局限'],['SEC Investor.gov：儲備證明與財報審計差異','https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/investors','第三方驗證不等同完整財報審計'],['FTC：加密貨幣與詐騙','https://consumer.ftc.gov/articles/what-know-about-cryptocurrency-scams','假平台、不可逆轉帳與釣魚風險']],risk:'USDT不是無風險現金替代品。本文不判斷發行方未來償付能力，也不保證任何平台、網路或贖回管道持續可用。',
    next:[['基礎概念','USDT是什麼？','/tw/learn/usdt/what-is-usdt.html'],['轉帳安全','TRC20與ERC20有什麼區別？','/tw/learn/usdt/trc20-vs-erc20.html'],['詐騙防範','如何避免加密貨幣詐騙？','/tw/security/crypto-scam-guide.html']]
  },
  {
    url:'/tw/learn/crypto-exchange-guide.html',title:'加密貨幣交易所是什麼？CEX與DEX新手完整指南',description:'加密貨幣交易所提供買賣、交換與部分托管服務；中心化交易所由平台管理帳戶與訂單，去中心化交易所透過錢包和智能合約交換資產，兩者風險與責任不同。',category:'交易所基礎',cluster:'exchange-foundation',hub:'/tw/learn/',hubName:'開始學習',cover:'/tw/assets/covers/23.webp',
    points:['中心化交易所（CEX）通常提供帳戶、KYC、訂單簿、客服與托管；去中心化交易所（DEX）通常由錢包連接智能合約完成鏈上交換。','交易手續費與區塊鏈網路費是不同成本；充值、買幣、交易與提領也不是同一個操作。','本篇說明交易所角色，不替任何平台排名；台灣使用者應核對監管狀態、資產保管、可用功能與資金進出路徑。'],
    route:[['交易所是什麼','/tw/learn/crypto-exchange-guide.html'],['現貨與合約','/tw/learn/spot-vs-futures/'],['平台安全','/tw/security/exchange-safety/'],['平台比較','/tw/exchanges/comparison/']],pathTitle:'交易所基礎學習路徑',relatedTop:[['交易所基礎','/tw/learn/crypto-exchange-guide.html'],['現貨與合約','/tw/learn/spot-vs-futures/'],['安全檢查','/tw/security/exchange-safety/'],['選擇平台','/tw/exchanges/comparison/']],
    sections:[
      ['直接回答：加密貨幣交易所是什麼？',p('<strong>它是讓使用者買賣、交換或移轉加密資產的服務。</strong>平台可能提供法幣入金、現貨訂單、衍生品、錢包、托管與提領，但不同服務的法律角色、地區資格和風險並不相同。','「交易所」是業界通稱，不代表每個平台都具有與證券交易所、銀行或台灣持牌金融機構相同的監管與保障。使用前應核對經營實體、適用條款與所在地規則。')],
      ['中心化交易所（CEX）如何運作？',p('CEX由公司管理帳戶、身分驗證、撮合系統與多數私鑰。使用者登入平台後，可在訂單簿下單，並依平台帳本看到資產餘額。','優點是介面、客服與法幣管道通常較完整；代價是必須承擔平台資安、營運、提款限制、資產使用方式與對手方風險。帳戶顯示餘額不等於本人直接控制鏈上私鑰。')],
      ['去中心化交易所（DEX）如何運作？',p('DEX通常讓使用者連接自托管錢包，透過智能合約、流動性池或鏈上訂單機制交換代幣。平台不一定代管私鑰，但使用者要自行負責網路、Gas、代幣合約、簽署與錢包安全。','「不經中心化公司托管」不等於沒有風險。智能合約漏洞、假代幣、惡意授權、前置交易、滑價與流動性不足都可能造成損失。')+table(['項目','CEX','DEX'],[['帳戶','通常需要平台帳戶，常见KYC','通常連接自托管錢包'],['成交方式','平台訂單簿或報價系統','智能合約、流動性池或鏈上訂單'],['資產控制','平台或其托管方控制多數私鑰','使用者通常控制錢包私鑰'],['主要費用','交易費、價差、提領費','網路Gas、協議費、滑價'],['主要風險','平台、資安、營運與提款風險','智能合約、授權、假代幣與操作風險']],'CEX與DEX比較')],
      ['現貨與合約有什麼不同？',p('現貨交易是用一種資產交換另一種資產，成交後通常取得對應現貨餘額。合約是依標的價格結算的衍生品，可能使用槓桿、保證金與資金費率，且存在強制平倉風險。','新手應先理解現貨交易、訂單類型與保管，再評估是否具備使用衍生品的風險能力。更多差異可看<a href="/tw/learn/spot-vs-futures/">現貨與合約完整說明</a>。')],
      ['從註冊到提領的完整流程',steps([['確認平台與官方入口','核對公司、網址、地區資格、監管資訊與詐騙警示。'],['建立帳戶與身分驗證','使用本人資料，理解KYC用途與資料處理條款。'],['設定安全保護','啟用獨立密碼、多因素驗證、防釣魚碼與提領白名單。'],['充值或買幣','確認法幣管道、付款提供者，或核對鏈上充值網路與地址。'],['進行現貨交易','選擇交易對、市價單或限價單，檢查數量、價格、費用與成交。'],['提領與保管','核對幣種、網路、地址、Memo／Tag與網路費，第一次先小額測試。']])],
      ['交易手續費、價差與網路費',table(['成本','何時發生','核對位置'],[['交易手續費','現貨或合約成交時','平台費率頁與本人帳戶等級'],['買賣價差','立即按報價或市價成交時','訂單簿、報價與預估到帳'],['提領費','平台把資產轉出時','提領確認頁'],['網路費','鏈上交易由網路處理時','錢包或平台確認頁'],['匯兌／付款成本','使用新台幣、信用卡或第三方付款時','付款服務商與銀行']],'交易所使用成本')],
      ['台灣使用者選平台要檢查什麼？',ul(['經營實體、服務地區、本人資格與最新適用條款','台灣監管機關公開名單、登記或許可狀態，以及法律实际施行日期','新台幣入金與出金方式、银行限制和资金记录','客戶資產保管、分離、提領政策及平台發生問題時的處理','2FA、反釣魚碼、提領白名單、裝置與登入管理','現貨深度、支援資產、費率與實際總成本','客服官方入口、申訴與詐騙通報方式'])],
      ['常見交易所詐騙怎麼辨識？',p('假交易所常用保證獲利、私人老師帶單、LINE群組、假客服、遠端控制或「繳稅才能提領」引導匯款。真正的平台安全功能不會要求你把助記詞、私鑰或一次性驗證碼交給客服。','開戶、付款與下載App都應從自己核對的官方入口開始。看到異常網址、額外解凍費、指定私人錢包或催促借款時，應停止操作並保存證據。')]
    ],
    faq:[['CEX和DEX哪一種一定更安全？','沒有一定答案。CEX有平台托管與營運風險，DEX則把私鑰、簽署、智能合約與操作責任交給使用者。'],['使用交易所一定要KYC嗎？','中心化平台常依服務、地區與法規要求身分驗證；DEX通常不建立傳統帳戶，但仍可能受介面、錢包與所在地規則影響。'],['交易手續費等於網路費嗎？','不等於。交易費通常由平台或協議收取，網路費則支付給處理鏈上交易的網路。'],['平台有登記就代表沒有風險嗎？','不是。登記或許可不會消除價格、資安、營運、托管與使用者操作風險。']],
    sources:[['金融監督管理委員會：虛擬資產服務法','https://law.fsc.gov.tw/LawContent.aspx?id=GL004301','法規內容及尚未全部施行的提示'],['FINRA：Cryptocurrency Trading Platforms—Do Your Homework','https://syndication.finra.org/content/cryptocurrency-trading-platforms-do-your-homework','中心化平台與托管風險'],['Ethereum.org：去中心化交易所與錢包交換','https://ethereum.org/guides/how-to-swap-tokens/','DEX、錢包與鏈上交換概念'],['SEC Investor.gov：加密資產平台風險警示','https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-alerts/crypto-asset-securities','平台功能混合、托管與投資人保護風險']],risk:'本篇不推薦特定平台，也不表示任何境外服務必然適用台灣使用者。監管制度與施行日期可能調整，請以金管會及服務提供者最新公告為準。',
    next:[['安全理解','加密貨幣交易所安全嗎？','/tw/security/exchange-safety/'],['產品差異','現貨與合約有什麼不同？','/tw/learn/spot-vs-futures/'],['決策中心','如何選擇加密貨幣交易平台？','/tw/exchanges/comparison/']]
  },
  {
    url:'/tw/security/after-buying-crypto-storage.html',title:'買幣後怎麼保管？交易所、熱錢包與冷錢包比較',description:'買幣後可以留在交易所托管，也可以轉入熱錢包或冷錢包自行保管；沒有單一方式適合所有人，應依操作能力、使用頻率、資產規模與可承受風險選擇。',category:'買幣後資產保管',cluster:'wallet',hub:'/tw/security/',hubName:'安全指南',cover:'/tw/assets/covers/17.webp',
    points:['資產紀錄在區塊鏈或平台內部帳本；錢包主要管理存取與簽署所需的金鑰。','自行保管不一定對所有新手更安全：控制私鑰同時代表遺失、誤簽與備份失敗通常沒有人能替你恢復。','轉出資產前必須核對幣種、網路、地址與Memo／Tag，第一次使用新路徑先小額測試。'],
    route:[['錢包是什麼','/tw/security/crypto-wallet-guide.html'],['買幣後保管','/tw/security/after-buying-crypto-storage.html'],['冷熱錢包','/tw/security/hot-wallet-vs-cold-wallet.html'],['助記詞安全','/tw/security/seed-phrase-guide.html']],pathTitle:'資產保管決策路徑',relatedTop:[['錢包基礎','/tw/security/crypto-wallet-guide.html'],['保管決策','/tw/security/after-buying-crypto-storage.html'],['冷熱錢包','/tw/security/hot-wallet-vs-cold-wallet.html'],['助記詞','/tw/security/seed-phrase-guide.html']],
    sections:[
      ['直接回答：買幣後應該放在哪裡？',p('<strong>可以留在交易所，也可以轉到自己控制的熱錢包或冷錢包；選擇取決於你是否能安全管理帳戶、裝置、私鑰與備份。</strong>交易所托管比較容易操作與找回登入，但要承擔平台風險；自行保管減少對平台的依賴，卻把轉帳與金鑰責任完全交給自己。','新手不需要因為一句「不是你的私鑰，就不是你的幣」立刻轉走全部資產。更安全的方式，是先理解金額、使用頻率與失誤後果，再用小額練習。')],
      ['買幣後資產實際在哪裡？',p('鏈上資產是區塊鏈上的紀錄，錢包保存或控制用來簽署交易的私鑰。若資產留在中心化交易所，平台通常控制鏈上錢包與私鑰，你看到的是平台內部帳戶餘額與對平台的權利關係。','若提領到自托管錢包，私鑰或助記詞控制權轉到本人。這不會讓資產離開區塊鏈，而是改變誰能授權下一筆交易。')],
      ['交易所、熱錢包與冷錢包怎麼選？',table(['方式','主要優點','主要風險','較適合的情境'],[['交易所托管','交易與帳戶恢復較方便','平台被駭、停提、倒閉、帳戶遭接管','需要頻繁交易且能做好帳戶安全'],['自托管熱錢包','連接App與鏈上服務方便','裝置中毒、釣魚、惡意授權、備份外洩','小額操作與日常鏈上使用'],['自托管冷錢包','私鑰可維持離線，降低部分網路攻擊','裝置遺失損壞、假設備、備份失敗、錯誤簽署','較少移動且能建立成熟備份流程的資產']],'加密資產保管方式比較')],
      ['自行保管不是對所有新手都更安全',p('SEC投資人教育資料指出，自行保管需要自行維護私鑰與助記詞；遺失、被盜、裝置損壞或設定錯誤都可能造成永久失去資產。第三方托管則把這些工作交給平台，但平台被駭、停止營運或破產也可能造成損失。','因此不應只按「小額或大額」做機械判斷。還要考慮本人技術能力、資產使用頻率、備份環境、家人或繼承安排、平台風險及一次失誤的可承受程度。')],
      ['小額與較大額資產如何思考？',ul(['日常交易資金：重視操作便利與帳戶2FA，但不要把長期不使用的資產全部留在同一平台','鏈上使用資金：熱錢包只放預計使用的金額，與长期保管钱包分开','較长期持有：若选择冷钱包，先確認本人能完成初始化、备份、恢复演练與安全签署','不要把所有資產、所有備份與所有裝置集中在單一故障點','定期重新評估：資產金額、使用需求與個人能力改變時，保管方式也可調整'])],
      ['提幣網路與小額測試',steps([['確認接收資產','接收端是否支援同一幣種，以及是否需要Memo／Tag。'],['確認區塊鏈網路','發送端與接收端必须選擇完全相同的網路，名稱相似也不能直接猜。'],['從可信畫面複製地址','不要從聊天訊息、搜尋廣告或陌生QR Code取得地址。'],['先做小額測試','用可承受損失的金額测试，等待鏈上與接收端確認。'],['再轉剩餘金額','重新核對地址前後字元、網路、費用與到帳紀錄。']])],
      ['備份、恢復與助記詞',p('助記詞通常能恢復錢包控制權，取得助記詞的人也可能移走全部資產。不要截圖、上傳雲端、寄給自己、輸入陌生網站，或提供給任何自稱客服的人。','建立錢包後應依錢包官方文件完成離線備份，確認字序與拼字，並在不暴露真實助記詞的前提下理解恢復流程。若助記詞與私鑰遺失，去中心化網路通常沒有中央客服能重設。')],
      ['防範釣魚、假錢包與惡意授權',p('只從錢包官方網站或可信應用程式商店確認下載入口，核對開發者、網址與裝置權限。搜尋廣告、空投連結、假客服與「錢包需要驗證」是常見陷阱。','連接DApp前查看網域與簽署內容。登入簽名、代幣授權和轉帳不是同一件事；看不懂的簽署要求應拒絕。定期檢查不再使用的代幣授權，但不要依靠陌生「授權檢查網站」。')],
      ['建立自己的保管方案',ol(['列出資產用途：交易、日常鏈上使用或长期持有。','為每個用途設定可承受損失與操作頻率。','選擇平台托管、熱錢包、冷錢包或分層組合。','先用小額完成收款、發送與查看區塊鏈紀錄。','建立不依賴單一裝置或單一地點的安全備份。','每三至六個月檢查裝置、帳戶、備份與家人应急安排。'])]
    ],
    faq:[['買完Bitcoin一定要轉到冷錢包嗎？','不一定。冷錢包降低部分線上風險，但操作錯誤、裝置與備份管理也有風險，應依個人能力與需求決定。'],['資產留在交易所就是我的嗎？','你通常持有平台帳戶中的資產權益，但平台控制私鑰與提領流程，仍有平台、營運及法律風險。'],['熱錢包適合放多少錢？','沒有通用金額。可用「只放近期操作所需、即使損失也不影響生活的金額」作為風險原則。'],['助記詞不見了可以找客服恢復嗎？','自托管錢包通常無法由客服重設助記詞。任何要求你交出助記詞的人都應視為高風險。'],['提幣前為什麼要先小額測試？','它可以先驗證地址、網路與接收端是否正確，降低一次轉錯全部資產的風險。']],
    sources:[['SEC Investor.gov：Crypto Asset Custody Basics','https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/crypto-asset-custody-basics-retail-investors-investor-bulletin-0','自托管、第三方托管、冷熱錢包與助記詞'],['Ethereum.org：錢包與安全','https://ethereum.org/wallets','私鑰、熱錢包、硬體錢包與備份責任'],['Bitcoin.org：保護你的錢包','https://bitcoin.org/en/secure-your-wallet','小額分層、備份與第三方托管注意事項'],['FTC：加密貨幣與詐騙','https://consumer.ftc.gov/articles/what-know-about-cryptocurrency-scams','假平台、不可逆轉帳與釣魚風險']],risk:'任何保管方式都可能發生損失。CoinVoyu不會要求你的助記詞、私鑰、驗證碼或遠端控制權；本文不替你保管資產或提供個別化財務建議。',
    next:[['錢包基礎','加密貨幣錢包是什麼？','/tw/security/crypto-wallet-guide.html'],['方式比較','冷錢包與熱錢包差在哪？','/tw/security/hot-wallet-vs-cold-wallet.html'],['恢復資料','助記詞是什麼？','/tw/security/seed-phrase-guide.html']]
  }
];

// Guard against accidental Simplified Chinese remnants introduced while drafting.
const copyFixes=new Map([
  ['目标价值','目標價值'],['围绕','圍繞'],['无法转移','無法轉移'],['相应现货','相應現貨'],['常见KYC','常見KYC'],['实际施行','實際施行'],['资格與','資格與'],['长期','長期'],['分开','分開'],['测试','測試'],['必须','必須'],['备份','備份'],['恢复','恢復'],['签署','簽署'],['应急','應急'],['条件','條件'],['单一','單一'],['钱包','錢包'],['选择','選擇'],['演练','演練'],['智能合約','智慧合約']
]);
for(const a of articles){
  let json=JSON.stringify(a);
  for(const [from,to] of copyFixes)json=json.replaceAll(from,to);
  renderArticle(JSON.parse(json));
}

function insertBefore(rel,needle,block,marker){let html=read(rel);if(html.includes(marker))return;if(!html.includes(needle))throw new Error(`${rel}: insertion point missing`);write(rel,html.replace(needle,block+needle))}
function replaceOnce(rel,from,to){let html=read(rel);if(html.includes(to))return;const count=html.split(from).length-1;if(count!==1)throw new Error(`${rel}: expected one replacement, found ${count}`);write(rel,html.replace(from,to))}

insertBefore('learn/index.html','</div></section><section class="learning-track"><div class="track-index">03</div>','<a data-v3-batch3-2="bitcoin-market" href="/tw/learn/bitcoin/why-bitcoin-price-moves.html">Bitcoin價格為什麼會漲跌？<span>閱讀</span></a><a data-v3-batch3-2="bitcoin-etf" href="/tw/learn/bitcoin/bitcoin-etf-guide.html">Bitcoin ETF是什麼？<span>閱讀</span></a>','data-v3-batch3-2="bitcoin-market"');
insertBefore('learn/index.html','</div></section><section class="learning-track"><div class="track-index">04</div>','<a data-v3-batch3-2="usdt-safety" href="/tw/learn/usdt/is-usdt-safe.html">USDT安全嗎？<span>閱讀</span></a>','data-v3-batch3-2="usdt-safety"');
insertBefore('learn/index.html','<a href="/tw/learn/spot-vs-futures/">','<a data-v3-batch3-2="exchange-guide" href="/tw/learn/crypto-exchange-guide.html">加密貨幣交易所是什麼？<span>閱讀</span></a>','data-v3-batch3-2="exchange-guide"');
insertBefore('learn/bitcoin/index.html','</div></section><section class="hub-foundation">','<article class="card" data-v3-batch3-2="bitcoin-market"><a href="/tw/learn/bitcoin/why-bitcoin-price-moves.html"><img src="/tw/assets/covers/14.webp" alt="Bitcoin價格為什麼會漲跌？主題插圖" loading="lazy" width="1200" height="675"></a><div class="card-body"><span class="tag">市場基礎</span><h3><a href="/tw/learn/bitcoin/why-bitcoin-price-moves.html">Bitcoin價格為什麼會漲跌？</a></h3><p>分清供需、宏觀流動性、ETF資金、減半與槓桿清算。</p></div></article><article class="card" data-v3-batch3-2="bitcoin-etf"><a href="/tw/learn/bitcoin/bitcoin-etf-guide.html"><img src="/tw/assets/covers/13.webp" alt="Bitcoin ETF是什麼？主題插圖" loading="lazy" width="1200" height="675"></a><div class="card-body"><span class="tag">ETF / ETP</span><h3><a href="/tw/learn/bitcoin/bitcoin-etf-guide.html">Bitcoin ETF是什麼？</a></h3><p>比較現貨ETP、期貨ETF與直接持有Bitcoin的差異。</p></div></article>','data-v3-batch3-2="bitcoin-market"');
insertBefore('learn/usdt/index.html','</div></section><section class="hub-foundation">','<article class="card" data-v3-batch3-2="usdt-safety"><a href="/tw/learn/usdt/is-usdt-safe.html"><img src="/tw/assets/covers/05.webp" alt="USDT安全嗎？主題插圖" loading="lazy" width="1200" height="675"></a><div class="card-body"><span class="tag">安全風險</span><h3><a href="/tw/learn/usdt/is-usdt-safe.html">USDT安全嗎？</a></h3><p>理解儲備報告、脫鉤、地址凍結、平台與轉帳風險。</p></div></article>','data-v3-batch3-2="usdt-safety"');
replaceOnce('learn/bitcoin/index.html','<a href="/tw/learn/bitcoin/what-is-bitcoin.html">繼續閱讀 →</a>','<a href="/tw/learn/bitcoin/why-bitcoin-price-moves.html">繼續閱讀 →</a>');
replaceOnce('learn/usdt/index.html','<a href="/tw/security/crypto-scam-guide.html">繼續閱讀 →</a>','<a href="/tw/learn/usdt/is-usdt-safe.html">繼續閱讀 →</a>');
insertBefore('buy/index.html','<a href="/tw/wallets/">','<a data-v3-batch3-2="storage" href="/tw/security/after-buying-crypto-storage.html">買幣後怎麼保管？<span>閱讀</span></a>','data-v3-batch3-2="storage"');
insertBefore('security/index.html','<a class="continue-card" href="/tw/security/exchange-safety/">','<a class="continue-card" data-v3-batch3-2="storage" href="/tw/security/after-buying-crypto-storage.html"><small>資產保管</small><strong>買幣後怎麼保管？</strong><span>交易所、熱錢包與冷錢包比較</span></a>','data-v3-batch3-2="storage"');
insertBefore('exchanges/index.html','<section>','<aside class="intent-path" data-v3-batch3-2="exchange-foundation"><p class="tag">先建立基礎概念</p><h2>交易所提供什麼服務？</h2><p>先分清中心化交易所、去中心化交易所、現貨、合約、托管與網路費，再進入平台選擇。</p><div class="intent-links"><a href="/tw/learn/crypto-exchange-guide.html">閱讀加密貨幣交易所新手指南 →</a></div></aside>','data-v3-batch3-2="exchange-foundation"');

const backlinks=[
  ['learn/bitcoin/what-is-bitcoin.html','bitcoin','<a href="/tw/learn/bitcoin/why-bitcoin-price-moves.html">價格為什麼漲跌 →</a><a href="/tw/learn/bitcoin/bitcoin-etf-guide.html">Bitcoin ETF是什麼 →</a>'],
  ['buy/how-to-buy-bitcoin-taiwan.html','bitcoin-buy','<a href="/tw/learn/bitcoin/why-bitcoin-price-moves.html">先理解Bitcoin價格波動 →</a><a href="/tw/security/after-buying-crypto-storage.html">買完Bitcoin如何保管 →</a>'],
  ['learn/usdt/what-is-usdt.html','usdt','<a href="/tw/learn/usdt/is-usdt-safe.html">USDT安全風險完整解析 →</a>'],
  ['learn/usdt/trc20-vs-erc20.html','usdt-network','<a href="/tw/learn/usdt/is-usdt-safe.html">轉帳前先理解USDT風險 →</a>'],
  ['buy/how-to-buy-usdt-taiwan.html','usdt-buy','<a href="/tw/learn/usdt/is-usdt-safe.html">買入前先看USDT安全檢查 →</a>'],
  ['learn/spot-vs-futures/index.html','exchange-basics','<a href="/tw/learn/crypto-exchange-guide.html">先理解加密貨幣交易所 →</a>'],
  ['security/crypto-wallet-guide.html','wallet-storage','<a href="/tw/security/after-buying-crypto-storage.html">買幣後怎麼選擇保管方式 →</a>'],
  ['security/hot-wallet-vs-cold-wallet.html','hot-cold-storage','<a href="/tw/security/after-buying-crypto-storage.html">交易所、熱錢包與冷錢包怎麼選 →</a>'],
  ['security/seed-phrase-guide.html','seed-storage','<a href="/tw/security/after-buying-crypto-storage.html">建立完整資產保管方案 →</a>']
];
for(const [rel,key,links] of backlinks)insertBefore(rel,'<section id="faq">',`<aside class="intent-path" data-v3-batch3-2-backlink="${key}"><p class="tag">延伸閱讀</p><h3>把基礎概念連到下一步</h3><div class="intent-links">${links}</div></aside>`,`data-v3-batch3-2-backlink="${key}"`);

insertBefore('llms.txt','## Transparency','- [Bitcoin價格為什麼會漲跌？](https://www.coinvoyu.com/tw/learn/bitcoin/why-bitcoin-price-moves.html): 從供需、宏觀流動性、ETF資金、減半、槓桿與情緒理解價格形成，不提供保證預測。\n- [Bitcoin ETF是什麼？](https://www.coinvoyu.com/tw/learn/bitcoin/bitcoin-etf-guide.html): 區分美國現貨Bitcoin ETP、期貨ETF與直接持有，整理費用、追蹤、托管與台灣資格核對。\n- [USDT安全嗎？](https://www.coinvoyu.com/tw/learn/usdt/is-usdt-safe.html): 說明儲備報告、脫鉤、凍結、平台托管、假代幣與轉錯網路風險。\n- [加密貨幣交易所是什麼？](https://www.coinvoyu.com/tw/learn/crypto-exchange-guide.html): 比較CEX與DEX，連起註冊、買幣、交易、提領、費用與平台安全。\n- [買幣後怎麼保管？](https://www.coinvoyu.com/tw/security/after-buying-crypto-storage.html): 比較交易所、熱錢包與冷錢包，整理小額測試、備份與助記詞安全。\n\n','https://www.coinvoyu.com/tw/learn/bitcoin/why-bitcoin-price-moves.html');

// Replace the homepage accordion with six always-visible answers and add matching FAQ schema.
{
  let html=read('index.html');
  const faq=[
    ['台灣可以買 Bitcoin 嗎？','可以透過符合本人資格的平台取得Bitcoin，但要先核對平台規則、身分驗證、銀行與資金來源要求。台灣監管制度與境外平台服務範圍可能調整，可先閱讀<a href="/tw/buy/can-taiwan-buy-crypto.html">台灣買幣完整說明</a>。'],
    ['買 Bitcoin 一定要很多錢嗎？','不需要。Bitcoin可以分割購買，實際最低下單金額、價差與費用由平台及訂單方式決定。'],
    ['USDT 是美元嗎？','不是。USDT是以美元為目標價值的鏈上代幣，不是銀行美元存款，也不能保證永遠維持1美元；可進一步查看<a href="/tw/learn/usdt/is-usdt-safe.html">USDT安全風險</a>。'],
    ['加密貨幣交易所有哪些？','常見類型包括由公司營運的中心化交易所，以及透過錢包與智能合約使用的去中心化交易所。不同平台的法幣管道、資產、費用、安全工具與地區資格不同。'],
    ['台灣可以使用海外交易所嗎？','不能只以網站能否開啟判斷。使用前應核對本人居住地、KYC、平台條款、產品限制與台灣最新監管資訊，不把境外服務視為取得台灣本地許可。'],
    ['買幣之後一定要放在交易所嗎？','不一定，可以留在交易所托管，也可以轉入熱錢包或冷錢包自行保管。自行保管不一定對所有新手更安全，應依操作能力、使用需求與風險承受能力選擇。']
  ];
  const block=`<div class="faq-grid faq-static-grid" data-v3-batch3-2="home-faq">${faq.map(([q,a])=>`<article class="faq-item faq-static"><h3>${q}</h3><p>${a}</p></article>`).join('')}</div>`;
  const faqRe=/<div class="faq-grid"><details class="faq-item">[\s\S]*?<\/details><\/div>/;
  if(!html.includes('data-v3-batch3-2="home-faq"')){
    if(!faqRe.test(html))throw new Error('Homepage FAQ accordion not found');
    html=html.replace(faqRe,block);
    const scriptRe=/<script type="application\/ld\+json">([\s\S]*?)<\/script>/;
    const match=html.match(scriptRe);if(!match)throw new Error('Homepage schema missing');
    const data=JSON.parse(match[1]);const graph=data['@graph']||[];
    graph.push({'@type':'FAQPage',mainEntity:faq.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a.replace(/<[^>]+>/g,'')}}))});
    html=html.replace(scriptRe,`<script type="application/ld+json">${JSON.stringify({...data,'@graph':graph})}</script>`);
    write('index.html',html);
  }
}

// Small scoped style addition; preserves the existing homepage and responsive system.
{
  let css=read('assets/site.css');
  if(!css.includes('.faq-static h3'))css+='\n.faq-static h3{font-size:16px;line-height:1.55;margin:0;color:#10213f}.faq-static p{margin:10px 0 0}.faq-static a{color:#2563eb;text-decoration:underline;text-underline-offset:3px}\n';
  write('assets/site.css',css);
}

function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?walk(path.join(dir,entry.name)):[path.join(dir,entry.name)])}
const sitemapUrls=[];
for(const file of walk(tw).filter(file=>file.endsWith('.html'))){const html=fs.readFileSync(file,'utf8');if(/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html)||/<meta[^>]+http-equiv="refresh"/i.test(html))continue;const canonical=(html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)||[])[1];if(canonical?.startsWith(origin+'/tw/'))sitemapUrls.push(canonical)}
const unique=[...new Set(sitemapUrls)].sort();if(unique.length!==sitemapUrls.length)throw new Error('Duplicate canonical detected');
write('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${unique.map(url=>`  <url><loc>${url}</loc><lastmod>2026-10-08</lastmod></url>`).join('\n')}\n</urlset>\n`);
write('v3-batch3-2.json',JSON.stringify({version:'CoinVoyu Taiwan V3 Batch 3.2',scope:'Taiwan-only topic cluster and homepage FAQ',updated:'2026-10-08',baseline:'51051e0cad5ba47ae5153e389a7387ad878659b2',newArticles:articles.map(a=>a.url),homepageFAQ:'always-visible',referrals:'unchanged'},null,2)+'\n');
console.log(`Built Taiwan V3 Batch 3.2: ${articles.length} articles, ${unique.length} sitemap URLs.`);
