import fs from 'node:fs';
import path from 'node:path';

const tw=path.resolve(import.meta.dirname,'..');
const origin='https://www.coinvoyu.com';
const published='2026年10月08日';
const iso='2026-10-08T00:00:00+08:00';
const read=rel=>fs.readFileSync(path.join(tw,rel),'utf8');
const write=(rel,data)=>{const target=path.join(tw,rel);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,data)};
const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const p=(...items)=>items.map(x=>`<p>${x}</p>`).join('');
const ul=items=>`<ul>${items.map(x=>`<li>${x}</li>`).join('')}</ul>`;
const table=(heads,rows,label)=>`<div class="table-scroll" role="region" aria-label="${label}" tabindex="0"><table><thead><tr>${heads.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

const shell=read('learn/bitcoin/what-is-bitcoin.html');
const siteHeader=(shell.match(/<header class="header">[\s\S]*?<\/header>/)||[])[0];
const siteTail=(shell.match(/<footer class="footer">[\s\S]*?<\/body>/)||[])[0];
if(!siteHeader||!siteTail)throw new Error('Unable to resolve Taiwan shell');

const articles=[
  {
    slug:'taiwan-virtual-asset-services-act-2026', category:'台灣政策與監管',
    title:'台灣《虛擬資產服務法》已公布：何時施行、使用者要注意什麼？',
    description:'台灣《虛擬資產服務法》已於2026年7月22日公布，但施行日期仍由行政院另定。本文整理許可制、客戶資產隔離、提領規則與過渡期。',
    eventDate:'2026年7月22日', cover:'/tw/assets/insights/taiwan-virtual-asset-services-act-2026.webp',
    points:['法律已公布不等於已全面施行；官方法規頁目前標示尚未施行，施行日由行政院另定。','法律建立虛擬資產服務商許可、客戶資產隔離與保管等制度，既有業者另有過渡期。','台灣使用者現階段仍應核對平台身分、資產保管與提領規則，不應把未來許可視為零風險保證。'],
    timeline:[['2026年4月','行政院通過草案並送立法院審議','當時仍屬草案階段'],['2026年7月22日','總統公布《虛擬資產服務法》','法律已公布'],['施行日','由行政院另定','截至2026年10月8日，官方法規頁標示尚未施行'],['施行後12個月內','既有業者應申請許可','依法律過渡條款'],['施行後21個月內','既有業者原則上應取得許可','主管機關得延長一次、最長3個月']],
    sections:[
      ['事件是什麼？目前法律狀態如何？',p('<strong>《虛擬資產服務法》已在2026年7月22日公布，但不能寫成所有條文已經開始適用。</strong>金融監督管理委員會法規頁標示本法尚未施行；依第56條，施行日期由行政院另定。','因此，最準確的描述是「法律已公布、施行準備中」。行政院在同年4月通過草案並送立法院，是較早的程序節點，不能再把現在的狀態稱為單純草案。')],
      ['事件時間線',table(['時間','官方進展','閱讀重點'],[['2026年4月','行政院通過草案並送立法院','不是最終生效狀態'],['2026年7月22日','法律公布','已成為法律，但施行日另定'],['2026年10月8日核實','官方頁標示尚未施行','等待行政院指定施行日期'],['施行後12個月','既有業者申請許可期限','屬過渡安排'],['施行後21個月','原則上取得許可','得依法延長一次']],'台灣虛擬資產服務法時間線')],
      ['官方已確認哪些制度？',p('法律以金融監督管理委員會為主管機關，核心制度包括虛擬資產服務商許可、客戶身分與風險管理、客戶資產隔離、保管作業、廣告招攬與消費者保護。未經許可而經營法律所列業務，將受到限制。','第18條要求客戶資產與服務商自有資產分離；符合規定的客戶資產不因服務商破產而直接成為破產財產。第20條原則上不得拒絕客戶提領，但法律、洗錢防制或異常交易等情況仍可能構成例外。')],
      ['對台灣使用者有什麼實際影響？',table(['情境','可能影響','現在應做什麼'],[['選擇平台','未來會進入許可與持續監理框架','先查平台在台提供何種服務及目前法遵身分'],['平台保管資產','法律要求隔離與對帳等制度','仍應理解集中保管、資安與營運風險'],['申請提領','原則與例外將更明確','保留交易紀錄並完成平台要求的身分與安全核驗'],['海外平台使用','是否直接適用取決於在台提供服務的方式與施行細則','不要把海外牌照等同台灣許可']],'台灣使用者影響')],
      ['哪些事情仍未確定？',ul(['實際施行日期仍待行政院公告。','子法、許可審查與部分技術標準仍需依後續正式規範確認。','個別境外平台是否、何時取得台灣許可，不能在官方名單公布前推定。','法律制度降低部分營運與保管風險，不代表虛擬資產價格、詐騙或操作風險消失。'])],
      ['台灣使用者現在的檢查清單',ul(['從金管會與法務部等官方網站確認最新法規狀態，不以社群貼文代替正式公告。','查看平台是否清楚揭露營運主體、客戶資產保管方式、提領限制與申訴管道。','啟用2FA、防釣魚碼與提領白名單，並以小額測試重要轉帳。','不要因「即將納管」就把任何平台視為政府背書。','涉及個人法律、稅務或大型資產安排時，向具資格專業人士諮詢。'])]
    ],
    faq:[['這部法律已經生效了嗎？','法律已公布，但官方法規頁目前標示尚未施行；正式施行日期由行政院另定。'],['海外交易所一定要取得台灣許可嗎？','是否受許可要求約束，要看其向台灣提供的具體服務與後續施行規範，不能只看公司所在地。'],['有許可的平台就一定安全嗎？','不是。許可與監理可提高制度要求，但價格、資安、操作、詐騙與市場風險仍然存在。'],['使用者需要立刻搬走資產嗎？','法律公布本身不代表所有人必須立即移轉資產。應依平台狀態、本人保管能力與後續官方規則評估。']],
    sources:[['金融監督管理委員會法規系統：《虛擬資產服務法》','https://law.fsc.gov.tw/LawContent.aspx?id=GL004301','條文、公布日期、施行狀態與過渡期'],['行政院：通過《虛擬資產服務法》草案','https://www.ey.gov.tw/Page/9277F759E41CCD91/bfd446a7-ce23-4308-9347-9ce6e6c44196','2026年4月2日草案階段的官方背景']],
    next:[['長期知識','台灣加密貨幣合法嗎？','/tw/learn/taiwan-crypto-regulation.html'],['平台選擇','台灣交易所與海外交易所怎麼比較？','/tw/exchanges/taiwan-exchange-guide.html'],['安全基礎','加密貨幣交易所安全嗎？','/tw/security/exchange-safety/']]
  },
  {
    slug:'us-genius-act-stablecoin-rules-2026', category:'USDT與資產安全',
    title:'美國 GENIUS Act 進入執行規則階段：穩定幣使用者要看懂什麼？',
    description:'美國財政部於2026年8月17日提出GENIUS Act執行規則草案。本文區分已通過法律、仍在提案的細則，以及對台灣穩定幣使用者的間接影響。',
    eventDate:'2026年8月17日', cover:'/tw/assets/insights/us-genius-act-stablecoin-rules-2026.webp',
    points:['GENIUS Act已於2025年7月18日簽署成法，但2026年8月17日財政部發布的是執行規則提案，不是最終規則。','提案涉及發行人許可、儲備、揭露與依法凍結能力；外國發行穩定幣在美國市場的可用性也有過渡安排。','美國規則不會自動成為台灣法律，但可能間接影響平台上架、發行人合規與使用者可取得的服務。'],
    sections:[
      ['事件是什麼？',p('<strong>美國財政部在2026年8月17日發布GENIUS Act的擬議執行規則，進入公開規則制定階段。</strong>法律本身已在2025年7月18日簽署，但這份Notice of Proposed Rulemaking仍是提案，內容可能在意見徵詢後調整。','官方說明預期法制主要條款於2027年1月18日生效；部分涉及未取得許可發行人之穩定幣可用性限制，時間點延後至2028年7月18日。具體適用仍須看最終規則。')],
      ['已確認、提案中與尚待確定',table(['層級','目前狀態','不要誤讀'],[['GENIUS Act','已簽署成法','不等於所有細節已開始執行'],['財政部2026年規則','擬議規則','不是最終版本'],['預期主要生效日','2027年1月18日','仍要核對最終規則與個別條款'],['部分市場可用性限制','規劃於2028年7月18日起適用','不是對全球所有錢包的直接禁令']],'GENIUS Act法規狀態')],
      ['規則關注哪些穩定幣風險？',p('官方框架聚焦支付型穩定幣發行人、儲備資產、贖回、公開揭露、風險管理與依法執行命令的技術能力。這些要求反映穩定幣同時具有支付工具、發行人負債與鏈上代幣的多重特性。','儲備充足不等於使用者零風險。市場價格仍可能短暫偏離1美元，平台托管、鏈上地址、網路選擇與發行人凍結能力也屬不同風險層。')],
      ['對USDT與其他穩定幣意味著什麼？',p('對單一穩定幣的最終影響，要看發行人取得何種監管地位、其儲備與贖回安排，以及服務是否面向美國市場。不能只因法律提到外國發行人，就斷言某代幣將全球下架或停止運作。','台灣使用者較可能感受到的間接影響包括：平台調整上架政策、發行人增加揭露、跨境服務資格改變，以及合規凍結機制受到更多關注。')],
      ['對台灣使用者的實際影響',table(['問題','較可靠的判斷','仍需核對'],[['台灣持有人是否直接受美國法管轄','不一定，取決於服務、發行人與交易地點','平台條款及最終規則'],['代幣是否會維持1美元','法律無法保證市場價格','儲備、贖回與市場流動性'],['地址能否被凍結','部分發行人技術上具備控制能力','發行人政策、法律命令與個案事實'],['平台是否繼續提供','可能依地區與合規政策調整','平台正式公告']],'台灣穩定幣使用者影響')],
      ['使用者應該關注什麼？',ul(['只看財政部、監管機關與發行人正式公告，不把規則提案當成最終命令。','核對持有穩定幣的發行人、儲備揭露、贖回條件與地址控制機制。','把發行人風險、交易所托管風險、網路操作風險分開評估。','避免長期把所有流動資金集中於單一代幣、單一平台或單一網路。','遇到「法規上路、立即換幣」的訊息，先檢查事件日期與適用地區。'])]
    ],
    faq:[['GENIUS Act已經全面生效嗎？','法律已簽署，但2026年8月財政部文件仍是擬議執行規則；主要生效時間與細節須依最終規則核對。'],['台灣使用USDT會因此違法嗎？','不能這樣推論。美國法規不會自動成為台灣法律，還要看台灣規範、使用方式與服務提供者。'],['法規能保證穩定幣永遠等於1美元嗎？','不能。法規可提高儲備與揭露要求，但市場流動性、贖回及發行人風險仍存在。'],['所有穩定幣地址都能被凍結嗎？','不同代幣的智慧合約與治理權限不同；應查看發行人與合約機制，不能一概而論。']],
    sources:[['美國財政部：GENIUS Act擬議執行規則','https://home.treasury.gov/news/press-releases/sb0605','2026年8月17日規則提案與時程'],['白宮：GENIUS Act簽署說明','https://www.whitehouse.gov/fact-sheets/2025/07/fact-sheet-president-donald-j-trump-signs-genius-act-into-law/','2025年7月18日簽署背景']],
    next:[['穩定幣基礎','穩定幣是什麼？','/tw/learn/what-is-stablecoin/'],['風險解析','USDT安全嗎？','/tw/learn/usdt/is-usdt-safe.html'],['網路操作','TRC20和ERC20有什麼不同？','/tw/learn/usdt/trc20-vs-erc20.html']]
  },
  {
    slug:'fed-rate-hike-september-2026-crypto', category:'全球宏觀與市場事件',
    title:'聯準會2026年9月升息：加密貨幣市場該怎麼解讀？',
    description:'聯準會於2026年9月16日把聯邦基金利率目標區間調高至3.75%–4.00%。本文說明已確認決策、流動性傳導與不能直接推論的價格結論。',
    eventDate:'2026年9月16日', cover:'/tw/assets/insights/fed-rate-hike-september-2026-crypto.webp',
    points:['聯邦公開市場委員會於2026年9月16日一致決議升息1碼，目標區間為3.75%–4.00%。','利率影響資金成本、美元與風險偏好，但不會機械地決定Bitcoin或其他加密資產的單日方向。','應同時觀察決策聲明、後續數據、債券殖利率、美元與加密市場自身槓桿，而不是只讀「升息利空」標題。'],
    sections:[
      ['發生了什麼？',p('<strong>美國聯準會在2026年9月16日將聯邦基金利率目標區間提高0.25個百分點至3.75%–4.00%，表決結果為12比0。</strong>官方聲明表示經濟活動維持穩健、通膨仍偏高，委員會會依後續資料、展望與風險平衡調整政策。','這是可確認的政策事實；「因此Bitcoin一定漲或跌」不是官方結論，而是需要更多證據支撐的市場分析。')],
      ['政策決策與市場推論要分開',table(['層級','內容','可信邊界'],[['官方事實','升息1碼，目標3.75%–4.00%','聯準會聲明直接確認'],['資料觀察','債券殖利率、美元、股市與加密市場反應','描述特定時間窗口'],['合理分析','較高資金成本可能壓抑風險偏好','不是固定因果'],['不可靠斷言','升息後Bitcoin必跌或必漲','忽略預期與其他資金因素']],'聯準會事件解讀層級')],
      ['利率如何影響加密市場？',p('政策利率會透過銀行融資、債券殖利率與美元資產報酬，改變投資人持有高波動資產的機會成本。較高利率通常使現金與短期債券更有吸引力，也可能降低槓桿資金意願。','但市場價格常在會議前就反映預期。若實際決策比預期更溫和，即使升息，風險資產仍可能上漲；反之亦然。傳導方向取決於「決策相對預期」與後續政策路徑。')],
      ['台灣使用者應觀察哪些指標？',ul(['聯準會聲明與會後說明：政策理由與未來條件比單一利率數字更重要。','美國公債殖利率與美元指數：觀察資金成本與美元強弱，但不要當作固定預測公式。','加密市場深度與槓桿：清算可能把原本有限的價格反應放大。','ETF資金流與穩定幣流動性：用多日趨勢理解資金，不以單日數據下結論。','台幣匯率：台灣投資人以新台幣衡量報酬時，還會受到美元匯率影響。'])],
      ['不同情境可能怎麼發展？',table(['情境','可能市場解讀','限制'],[['通膨降溫且政策轉鬆','風險偏好可能改善','經濟成長與金融壓力仍可能抵銷'],['利率維持高檔更久','資金成本壓力可能延續','市場可能已提前定價'],['經濟快速轉弱','降息預期可能升高','衰退本身也可能壓抑風險資產'],['加密市場槓桿過高','政策消息可能觸發連鎖清算','方向取決於部位分布']],'利率與加密市場情境')],
      ['新手常見錯誤',ul(['只看升息或降息，不看市場原先預期。','用單日價格反應證明長期因果。','忽略台幣兌美元變動對本地報酬的影響。','在重大會議前後提高槓桿，低估滑價與清算。','把宏觀分析當成進出場保證。'])]
    ],
    faq:[['聯準會升息，Bitcoin一定會跌嗎？','不一定。價格取決於決策相對市場預期、流動性、槓桿與加密市場自身供需。'],['為什麼升息後市場有時反而上漲？','若實際決策比市場擔心的更溫和，或未來指引偏向寬鬆，價格可能上漲；這是預期差異，不是升息本身固定利多。'],['台灣投資人只要看美元利率嗎？','不夠。還要考慮台幣匯率、交易平台成本、持有資產與本人風險承受能力。'],['可以用聯準會會議預測短線嗎？','不能保證。重大事件常提高波動與滑價，槓桿部位的風險尤其高。']],
    sources:[['美國聯準會：2026年9月16日FOMC聲明','https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a.htm','利率決策、票數與官方經濟描述']],
    next:[['市場基礎','Bitcoin價格為什麼會漲跌？','/tw/learn/bitcoin/why-bitcoin-price-moves.html'],['產品觀察','Bitcoin ETF是什麼？','/tw/learn/bitcoin/bitcoin-etf-guide.html'],['風險認知','現貨與合約有什麼不同？','/tw/learn/spot-vs-futures/']]
  },
  {
    slug:'crypto-etp-in-kind-redemption', category:'Bitcoin與ETF',
    title:'美國允許加密ETP實物申贖：對Bitcoin ETF市場有什麼影響？',
    description:'SEC於2025年7月29日允許特定加密資產ETP採實物申購與贖回。本文解釋授權參與者、現金與實物申贖差異，以及對一般投資人的有限影響。',
    eventDate:'2025年7月29日', cover:'/tw/assets/insights/crypto-etp-in-kind-redemption.webp',
    points:['SEC在2025年7月29日允許特定Bitcoin與Ether ETP使用實物申購與贖回，改變的是基金股份的一級市場運作。','一般投資人仍在證券市場買賣產品股份，不會因規則改變就能直接把ETF股份兌換成Bitcoin。','實物申贖可能改善營運效率與稅務處理，但不保證費用下降、追蹤完全或價格上漲。'],
    sections:[
      ['事件是什麼？',p('<strong>美國證券交易委員會在2025年7月29日核准規則變更，讓特定加密資產交易所交易產品可由授權參與者使用實物方式建立或贖回股份。</strong>產品最初多採現金申贖；新機制讓符合資格的市場參與者可以交付或收回底層加密資產。','事件影響的是產品的一級市場與做市流程，不是讓一般券商客戶取得鏈上提幣功能，也不代表SEC對Bitcoin價值做出背書。')],
      ['現金申贖與實物申贖差在哪？',table(['項目','現金申贖','實物申贖'],[['授權參與者交付','現金','指定底層資產或資產籃子'],['產品端動作','可能需要買賣現貨','可接收或交付資產'],['一般投資人','仍在交易所買賣股份','仍在交易所買賣股份'],['可能優點','流程較容易與傳統現金系統銜接','可能降低部分市場衝擊與交易摩擦'],['不能保證','零成本或完美追蹤','費用必然下降或價格上漲']],'加密ETP申贖方式比較')],
      ['誰是授權參與者？',p('授權參與者通常是與產品簽約、具備大型股份籃子申購與贖回能力的金融機構。這個機制有助於產品市價與資產淨值之間的套利與流動性管理。','一般散戶並不是授權參與者。投資人買賣的仍是證券帳戶中的產品股份，持有權利、交易時間與費用依產品文件及券商規則。')],
      ['可能的市場影響與限制',p('實物申贖可能讓授權參與者直接調度底層資產，減少產品為申贖而反覆買賣現貨的需求，對價差、追蹤與營運效率可能有幫助。實際效果仍取決於產品規模、做市競爭、托管安排與費用政策。','這項制度變更不等於新增無限買盤，也不能由此推論Bitcoin必然上漲。申購與贖回都可能發生，資金方向仍由投資人需求決定。')],
      ['對台灣投資人有什麼影響？',ul(['若本人券商可交易相關境外產品，市場流動性與追蹤效率可能間接受益。','能否購買仍取決於台灣券商、客戶資格與商品限制，不能因美國規則變更就推定人人可買。','一般投資人不能把產品股份直接提領成Bitcoin；想要鏈上資產仍是另一種持有路徑。','應核對最新公開說明書、費用、交易價差、匯兌與稅務，而不是只看「實物」兩字。'])],
      ['如何正確閱讀ETF資金流？',p('申購代表產品股份需求增加，贖回代表股份被撤回；資料通常以每日淨額呈現。單日淨流入可能帶來底層需求，但不能涵蓋全球現貨與衍生品市場。','閱讀時應標示資料日期、涵蓋產品與資料商口徑。資金流是回顧市場活動的工具，不是保證未來報酬的指標。')]
    ],
    faq:[['實物申贖代表散戶可以用ETF換Bitcoin嗎？','不是。實物申贖主要由授權參與者在一級市場進行，一般投資人仍買賣產品股份。'],['這項規則會讓Bitcoin一定上漲嗎？','不會。申購與贖回都有可能，價格仍受全球市場供需與風險偏好影響。'],['實物申贖一定會降低管理費嗎？','不一定。營運效率可能改善，但產品費用由發行人政策與市場競爭決定。'],['台灣投資人一定能買美國Bitcoin ETP嗎？','不一定，需依券商、商品限制、客戶資格及當時法規核對。']],
    sources:[['美國證券交易委員會：允許加密ETP實物申贖','https://www.sec.gov/newsroom/press-releases/2025-101-sec-permits-kind-creations-redemptions-crypto-etps','2025年7月29日規則變更'],['SEC Investor.gov：現貨Bitcoin與Ether ETP投資人公告','https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/ETPBulletinSeptember2024','產品結構、費用與風險']],
    next:[['產品基礎','Bitcoin ETF是什麼？','/tw/learn/bitcoin/bitcoin-etf-guide.html'],['市場理解','Bitcoin價格為什麼會漲跌？','/tw/learn/bitcoin/why-bitcoin-price-moves.html'],['持有方式','Bitcoin買完放哪裡？','/tw/security/after-buying-crypto-storage.html']]
  },
  {
    slug:'tether-q4-2025-reserves-attestation', category:'USDT與資產安全',
    title:'Tether 2025年Q4儲備鑑證怎麼看？數字、限制與USDT風險',
    description:'Tether於2026年1月30日發布截至2025年12月31日的儲備鑑證資訊。本文整理官方數字，也說明鑑證快照不等於完整財務報表審計或存款保險。',
    eventDate:'2026年1月30日', cover:'/tw/assets/insights/tether-q4-2025-reserves-attestation.webp',
    points:['Tether公布的2025年Q4鑑證以2025年12月31日為衡量日，屬特定時點的儲備快照。','公司公布資產約1,928.8億美元、負債約1,865.4億美元；這些是發行人公布並由BDO出具鑑證意見的資料。','鑑證不是政府保證、銀行存款保險，也不等同涵蓋全年內控與所有交易的完整財務報表審計。'],
    sections:[
      ['發生了什麼？',p('<strong>Tether在2026年1月30日發布2025年第四季儲備資訊，衡量日為2025年12月31日，並表示相關鑑證由BDO出具。</strong>公司公布總資產約1,928.8億美元、總負債約1,865.4億美元，其中數位代幣相關負債約1,864.5億美元。','這些數字有助於理解特定時點的資產與負債，但來源主要是發行人公告及其委託鑑證報告，讀者仍要理解查核範圍與證據限制。')],
      ['官方公布的主要數字',table(['項目','截至2025年12月31日','閱讀限制'],[['總資產','192,877,729,144美元','特定時點快照'],['總負債','186,539,895,593美元','需搭配分類與鑑證範圍'],['數位代幣相關負債','186,450,610,920美元','不等於所有持有人隨時可無條件直接贖回'],['直接持有美國國庫券','超過1,220億美元','公司公告口徑'],['直接與間接美國國債曝險','超過1,410億美元','包含間接曝險，不能與直接持有混為一談']],'Tether 2025年Q4官方公布數字')],
      ['儲備鑑證是什麼？',p('鑑證報告通常由獨立會計師依約定準則，對管理階層在特定日期提出的儲備資訊提供意見。它比單純公司自述多一層外部程序，但範圍由報告與準則界定。','完整財務報表審計通常涵蓋更廣的財務報表、期間交易與內控證據。不能把單一時點鑑證寫成「全年所有資產與交易都完成全面審計」。')],
      ['這些數字能證明USDT完全安全嗎？',p('不能。資產高於負債可提供緩衝資訊，但USDT持有人仍面對發行人、銀行與保管機構、資產流動性、贖回資格、法律命令、平台托管及市場脫鉤等風險。','USDT也不是銀行美元存款，不享有台灣存款保險。一般使用者是否可直接向發行人贖回，還受資格、最低門檻與條款限制，不能只用總資產數字推定。')],
      ['台灣使用者應如何核對？',ul(['確認閱讀的是Tether官方頁與完整鑑證文件，注意衡量日而非只看發布日。','分辨直接國庫券與間接國債曝險，不把兩個數字相加。','查看資產分類、到期結構、負債與超額儲備，而不是只讀新聞標題。','把發行人風險與交易所托管、假代幣、錯誤網路和釣魚風險分開。','大額持有前理解本人需要的流動性與分散原則，不把穩定幣視為無風險現金。'])],
      ['哪些事情仍不確定？',p('一份季末鑑證不能直接說明發布日當天的所有持倉，也不能預測市場壓力下的贖回速度、交易平台流動性或價格偏離幅度。後續儲備結構與監管要求也可能改變。','因此，較準確的結論是：報告增加了特定時點的資訊透明度，但不是對價格、贖回或使用者損失的保證。')]
    ],
    faq:[['儲備鑑證等於完整審計嗎？','不等於。鑑證針對特定聲明與時點提供意見，完整財務報表審計的範圍通常更廣。'],['資產大於負債就代表USDT不會脫鉤嗎？','不能保證。市場流動性、贖回預期、平台風險與信心都可能讓價格短暫偏離1美元。'],['USDT有銀行存款保險嗎？','沒有。USDT不是台灣銀行美元存款，也不適用台灣存款保險。'],['一般使用者都能直接向Tether贖回嗎？','不一定。直接贖回受帳戶資格、地區、門檻與條款限制，應查看發行人最新規則。']],
    sources:[['Tether：2025年Q4儲備鑑證與公司數據','https://tether.io/news/tether-delivers-10b-profits-in-2025-6-3b-in-excess-reserves-and-record-141-billion-exposure-in-u-s-treasury-holdings/','2026年1月30日發布；衡量日為2025年12月31日']],
    next:[['風險基礎','USDT安全嗎？','/tw/learn/usdt/is-usdt-safe.html'],['穩定幣概念','穩定幣是什麼？','/tw/learn/what-is-stablecoin/'],['防詐安全','如何避免加密貨幣詐騙？','/tw/security/crypto-scam-guide.html']]
  }
];

function jsonLd(a,url){return {'@context':'https://schema.org','@graph':[
  {'@type':'NewsArticle',headline:a.title,description:a.description,url,image:origin+a.cover,inLanguage:'zh-TW',datePublished:iso,dateModified:iso,author:{'@type':'Organization',name:'CoinVoyu 編輯團隊',url:origin+'/tw/about/author/'},publisher:{'@type':'Organization',name:'CoinVoyu',url:origin+'/tw/'}},
  {'@type':'FAQPage',mainEntity:a.faq.map(([q,answer])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:answer}}))},
  {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'CoinVoyu 台灣',item:origin+'/tw/'},{'@type':'ListItem',position:2,name:'熱點解讀',item:origin+'/tw/insights/'},{'@type':'ListItem',position:3,name:a.title,item:url}]}
]};}

function renderArticle(a){
  const pageUrl=`/tw/insights/${a.slug}/`; const canonical=origin+pageUrl;
  const toc=a.sections.map((s,i)=>`<li><a href="#section-${i+1}">${s[0]}</a></li>`).join('');
  const html=`<!doctype html><html lang="zh-TW"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(a.title)}｜CoinVoyu 台灣</title><meta name="description" content="${esc(a.description)}"><link rel="canonical" href="${canonical}"><meta name="robots" content="index,follow,max-image-preview:large"><meta property="og:type" content="article"><meta property="og:locale" content="zh_TW"><meta property="og:title" content="${esc(a.title)}"><meta property="og:description" content="${esc(a.description)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${origin+a.cover}"><meta name="twitter:card" content="summary_large_image"><meta name="theme-color" content="#F8FAFC"><link rel="icon" href="/tw/assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/tw/assets/site.css"><script type="application/ld+json">${JSON.stringify(jsonLd(a,canonical))}</script></head><body id="top" data-article-type="insight">${siteHeader}<main id="main"><div class="wrap"><nav class="crumb" aria-label="麵包屑"><a href="/tw/">首頁</a><span>›</span><a href="/tw/insights/">熱點解讀</a><span>›</span><span aria-current="page">${a.title}</span></nav><header class="page-head insight-head"><p class="tag">${a.category}</p><h1>${a.title}</h1><p class="lead">${a.description}</p><div class="byline"><a href="/tw/about/author/">作者／編輯：CoinVoyu 編輯團隊</a><span>事件日期：${a.eventDate}</span><span>發布／核實：${published}</span></div></header><div class="article-grid"><article class="article-body"><img class="cover-main insight-cover" src="${a.cover}" alt="${a.title}主題示意圖" width="1200" height="675" fetchpriority="high"><p class="media-source">原創概念封面：CoinVoyu Taiwan；為主題示意，非官方文件或新聞照片。</p><aside class="points article-summary"><h2>先看重點</h2>${ul(a.points)}</aside><aside class="fact-status" aria-label="查證狀態"><strong>查證狀態</strong><span><b>已確認：</b>事件、日期與官方文件</span><span><b>分析：</b>對市場與台灣使用者的可能影響</span><span><b>尚待確認：</b>後續規則、個別平台執行或市場結果</span></aside><details class="mobile-toc"><summary>展開目錄</summary><ol>${toc}<li><a href="#faq">常見問題</a></li><li><a href="#sources">官方來源</a></li></ol></details>${a.sections.map((s,i)=>`<h2 id="section-${i+1}">${s[0]}</h2>${s[1]}`).join('')}<section id="faq"><h2>常見問題</h2><div class="faq-grid faq-static">${a.faq.map(([q,answer])=>`<article class="faq-item"><h3>${q}</h3><p>${answer}</p></article>`).join('')}</div></section><section class="sources" id="sources"><h2>官方來源與核實資訊</h2><p>資料核實日期：${published}。本文優先引用原始機關或發行人資料；發行人公告代表其公開陳述，證據範圍仍受文件性質限制。</p><ol>${a.sources.map(([name,url,note])=>`<li><a href="${url}" target="_blank" rel="noopener noreferrer">${name}</a><br><span>${note}</span></li>`).join('')}</ol></section><aside class="notice"><strong>風險與限制：</strong>本文為事件背景與教育資訊，不構成投資、法律或稅務建議。法規、產品資格與市場狀態可能改變；價格與交易結果沒有保證。</aside><section><h2>接下來可以看</h2><div class="continue-grid">${a.next.map(([small,title,url])=>`<a class="continue-card" href="${url}"><small>${small}</small><strong>${title}</strong><span>閱讀完整教學</span></a>`).join('')}</div></section></article><aside class="toc"><details open><summary>文章目錄</summary><ol>${toc}<li><a href="#faq">常見問題</a></li><li><a href="#sources">官方來源</a></li></ol><div class="meta">${a.category}<br>事件：${a.eventDate}<br>核實：${published}</div></details></aside></div></div></main>${siteTail}</html>`;
  write(`insights/${a.slug}/index.html`,html);
}
articles.forEach(renderArticle);

function card(a,featured=false){return `<article class="card insight-card${featured?' featured':''}"><a class="cover-link" href="/tw/insights/${a.slug}/"><img src="${a.cover}" alt="${a.title}主題示意圖" width="1200" height="675" loading="lazy"></a><div class="card-body"><p class="tag">${a.category}</p><h2><a href="/tw/insights/${a.slug}/">${a.title}</a></h2><p>${a.description}</p><p class="insight-date"><time datetime="2026-10-08">發布：2026年10月8日</time><span>事件：${a.eventDate}</span></p><a class="text-link" href="/tw/insights/${a.slug}/">閱讀完整解讀 →</a></div></article>`}

const hubSchema={'@context':'https://schema.org','@graph':[
  {'@type':'CollectionPage',name:'加密貨幣熱點解讀',description:'追蹤重要市場事件、台灣監管政策與平台動態，用清楚易懂的分析理解事件背後的影響。',url:origin+'/tw/insights/',inLanguage:'zh-TW',dateModified:iso},
  {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'CoinVoyu 台灣',item:origin+'/tw/'},{'@type':'ListItem',position:2,name:'熱點解讀',item:origin+'/tw/insights/'}]},
  {'@type':'ItemList',itemListElement:articles.map((a,i)=>({'@type':'ListItem',position:i+1,url:origin+`/tw/insights/${a.slug}/`,name:a.title}))}
]};
const categories=[...new Set(articles.map(a=>a.category))];
const hub=`<!doctype html><html lang="zh-TW"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>加密貨幣熱點解讀｜CoinVoyu 台灣</title><meta name="description" content="追蹤重要市場事件、台灣監管政策與平台動態，用清楚易懂的分析理解事件背後的影響。"><link rel="canonical" href="${origin}/tw/insights/"><meta name="robots" content="index,follow,max-image-preview:large"><meta property="og:type" content="website"><meta property="og:locale" content="zh_TW"><meta property="og:title" content="加密貨幣熱點解讀"><meta property="og:description" content="以官方來源核實事件，解釋對台灣使用者的實際影響。"><meta property="og:url" content="${origin}/tw/insights/"><meta property="og:image" content="${origin}${articles[0].cover}"><meta name="twitter:card" content="summary_large_image"><meta name="theme-color" content="#F8FAFC"><link rel="icon" href="/tw/assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/tw/assets/site.css"><script type="application/ld+json">${JSON.stringify(hubSchema)}</script></head><body id="top" data-page="insights">${siteHeader}<main id="main"><section class="insight-hero"><div class="wrap"><nav class="crumb" aria-label="麵包屑"><a href="/tw/">首頁</a><span>›</span><span aria-current="page">熱點解讀</span></nav><p class="eyebrow">MARKET & POLICY EXPLAINED</p><h1>加密貨幣熱點解讀</h1><p class="lead">追蹤重要市場事件、台灣監管政策與平台動態，用清楚易懂的分析理解事件背後的影響。</p><p class="insight-method">每篇文章標示事件日期、核實日期與官方來源，並區分已確認事實、合理分析及尚待確認事項。</p></div></section><section class="section"><div class="wrap"><div class="section-title"><div><p class="eyebrow">FEATURED</p><h2>精選解讀</h2></div></div><div class="insight-featured-grid">${articles.slice(0,2).map((a,i)=>card(a,i===0)).join('')}</div></div></section><section class="section alt"><div class="wrap"><div class="section-title"><div><p class="eyebrow">TOPICS</p><h2>依主題閱讀</h2></div><p>只顯示目前已有完整文章的分類。</p></div><nav class="insight-categories" aria-label="熱點分類">${categories.map(c=>`<a href="#${c.replaceAll('與','-').replaceAll('、','-')}">${c}</a>`).join('')}</nav>${categories.map(c=>`<section class="insight-category" id="${c.replaceAll('與','-').replaceAll('、','-')}"><div class="section-title"><h2>${c}</h2><span>${articles.filter(a=>a.category===c).length} 篇</span></div><div class="grid cards-3">${articles.filter(a=>a.category===c).map(a=>card(a)).join('')}</div></section>`).join('')}</div></section></main>${siteTail}</html>`;
write('insights/index.html',hub);

// Replace only the existing homepage hotspot block; preserve the surrounding V3 layout.
let home=read('index.html');
const hotspot=`<section class="section alt"><div class="wrap"><div class="section-title"><div><p class="eyebrow">MARKET & POLICY EXPLAINED</p><h2>熱點解讀</h2></div><p>核實事件時間與官方來源，分清已確認事實、分析與尚待確定事項。</p></div><div class="grid cards-3 home-insight-grid">${articles.slice(0,3).map(a=>card(a)).join('')}</div><div class="center-action"><a class="btn" href="/tw/insights/">查看更多熱點解讀</a></div></div></section>`;
const hotspotRe=/<section class="section alt"><div class="wrap"><div class="section-title"><div><p class="eyebrow">MARKET EXPLAINED<\/p>[\s\S]*?<\/section>(?=<section class="section safety-center">)/;
if(hotspotRe.test(home))home=home.replace(hotspotRe,hotspot);
else if(home.includes('class="grid cards-3 home-insight-grid"'))home=home.replace(/<section class="section alt"><div class="wrap"><div class="section-title"><div><p class="eyebrow">MARKET & POLICY EXPLAINED<\/p>[\s\S]*?<\/section>(?=<section class="section safety-center">)/,hotspot);
else throw new Error('Homepage hotspot block not found');
write('index.html',home);

// Add concise, contextual backlinks to durable topic pages without changing their core intent.
const backlinks=[
  ['learn/taiwan-crypto-regulation.html','taiwan-law-insight','<aside class="related-insight" data-v4-insight="taiwan-law-insight"><p class="tag">最新法規進展</p><h2>《虛擬資產服務法》已公布，施行日仍待指定</h2><p>查看2026年7月公布內容、過渡期與台灣使用者影響。</p><a class="text-link" href="/tw/insights/taiwan-virtual-asset-services-act-2026/">閱讀事件解讀 →</a></aside>'],
  ['learn/bitcoin/bitcoin-etf-guide.html','etp-insight','<aside class="related-insight" data-v4-insight="etp-insight"><p class="tag">市場制度更新</p><h2>美國加密ETP實物申贖是什麼？</h2><p>理解授權參與者、現金與實物申贖差異，以及一般投資人的權利邊界。</p><a class="text-link" href="/tw/insights/crypto-etp-in-kind-redemption/">閱讀事件解讀 →</a></aside>'],
  ['learn/bitcoin/why-bitcoin-price-moves.html','fed-insight','<aside class="related-insight" data-v4-insight="fed-insight"><p class="tag">宏觀事件</p><h2>2026年9月聯準會升息怎麼解讀？</h2><p>把政策事實、流動性分析與不能保證的價格推論分開。</p><a class="text-link" href="/tw/insights/fed-rate-hike-september-2026-crypto/">閱讀事件解讀 →</a></aside>'],
  ['learn/usdt/is-usdt-safe.html','tether-insight','<aside class="related-insight" data-v4-insight="tether-insight"><p class="tag">儲備資訊</p><h2>Tether 2025年Q4儲備鑑證怎麼看？</h2><p>看懂官方數字，也理解時點鑑證不等於存款保險或完整年度審計。</p><a class="text-link" href="/tw/insights/tether-q4-2025-reserves-attestation/">閱讀事件解讀 →</a></aside>'],
  ['learn/what-is-stablecoin/index.html','genius-insight','<aside class="related-insight" data-v4-insight="genius-insight"><p class="tag">穩定幣監管</p><h2>GENIUS Act進入執行規則階段</h2><p>區分已簽署法律、仍在提案的細則與對台灣使用者的間接影響。</p><a class="text-link" href="/tw/insights/us-genius-act-stablecoin-rules-2026/">閱讀事件解讀 →</a></aside>']
];
for(const [file,id,block] of backlinks){let html=read(file);if(html.includes(`data-v4-insight="${id}"`))continue;const marker='<section class="sources"';const pos=html.indexOf(marker);if(pos<0)throw new Error(`Source marker not found in ${file}`);html=html.slice(0,pos)+block+html.slice(pos);write(file,html)}

// Add hub to the general article index and llms discovery file.
let all=read('articles/index.html');
if(!all.includes('href="/tw/insights/"')){const marker='<main';const start=all.indexOf('>',all.indexOf(marker))+1;all=all.slice(0,start)+'<section class="section"><div class="wrap"><aside class="related-insight"><p class="tag">事件與政策</p><h2>加密貨幣熱點解讀</h2><p>以官方來源核實重要市場、監管與資產安全事件。</p><a class="btn" href="/tw/insights/">前往熱點解讀</a></aside></div></section>'+all.slice(start);write('articles/index.html',all)}
let llms=read('llms.txt').trimEnd();
if(!llms.includes('/tw/insights/')){llms+='\n\n## 熱點解讀\n\n- https://www.coinvoyu.com/tw/insights/\n'+articles.map(a=>`- https://www.coinvoyu.com/tw/insights/${a.slug}/`).join('\n')+'\n';write('llms.txt',llms)}

// Sitemap is derived from current, indexable Taiwan canonicals only.
const htmlFiles=[];function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const full=path.join(dir,entry.name);if(entry.isDirectory())walk(full);else if(entry.name.endsWith('.html'))htmlFiles.push(full)}}walk(tw);
const urls=[];for(const file of htmlFiles){const html=fs.readFileSync(file,'utf8');if(/name="robots"[^>]+noindex/i.test(html)||/http-equiv="refresh"/i.test(html))continue;const canonical=(html.match(/rel="canonical" href="([^"]+)"/i)||[])[1];if(canonical?.startsWith(origin+'/tw/'))urls.push(canonical)}
const unique=[...new Set(urls)].sort((a,b)=>a===origin+'/tw/'?-1:b===origin+'/tw/'?1:a.localeCompare(b));
write('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${unique.map(url=>`  <url><loc>${url.replaceAll('&','&amp;')}</loc><lastmod>2026-10-08</lastmod></url>`).join('\n')}\n</urlset>\n`);

console.log(`V4.1 built ${articles.length} insight articles, hub and homepage module; sitemap ${unique.length} URLs.`);
