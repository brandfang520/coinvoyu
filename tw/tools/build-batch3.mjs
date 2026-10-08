import fs from 'node:fs';
import path from 'node:path';

const twRoot = path.resolve(import.meta.dirname, '..');
const updated = '2026年10月07日';
const updatedIso = '2026-10-07T00:00:00+08:00';
const disclosure = '利益揭露：本頁部分平台連結可能包含推薦連結。若你透過相關連結完成符合條件的操作，CoinVoyu 可能獲得推薦獎勵。';

// Keep generated Taiwan pages in Traditional Chinese even when source notes contain
// Simplified Chinese terminology copied from an official interface.
const pairs = {'湾':'灣','户':'戶','号':'號','复':'複','输':'輸','验':'驗','显':'顯','务':'務','实':'實','际':'際','审':'審','层':'層','类':'類','额':'額','间':'間','页':'頁','应':'應','证':'證','资':'資','传':'傳','开':'開','注':'註','决':'決','币':'幣','银':'銀','链':'鏈','转':'轉','较':'較','费':'費','网':'網','发':'發','录':'錄','图':'圖','视':'視','频':'頻','题':'題','经':'經','还':'還','补':'補','设':'設','换':'換','条':'條','终':'終','绑':'綁','为':'為','议':'議','销':'銷','于':'於','识':'識','个':'個','时':'時','优':'優','佣':'傭','奖':'獎','权':'權','现':'現','单':'單','买':'買','卖':'賣','两':'兩','别':'別','础':'礎','级':'級','对':'對','须':'須','订':'訂','进':'進','场':'場','动':'動','价':'價','称':'稱','骤':'驟','确':'確','数':'數','选':'選','择':'擇','余':'餘','关':'關','当':'當','后':'後','产':'產','态':'態','汇':'匯','点':'點','并':'併','联':'聯','阶':'階','领':'領','预':'預','计':'計','来':'來','电':'電','邮':'郵','码':'碼','国':'國','护':'護','驾':'駕','无':'無','败':'敗','这':'這','处':'處','错':'錯','误':'誤','继':'繼','续':'續','种':'種','观':'觀','测':'測','过':'過','将':'將','带':'帶','导':'導','内':'內','简':'簡','体':'體'};
Object.assign(pairs,{'么':'麼','准':'準','备':'備','说':'說','变':'變','与':'與','从':'從','写':'寫','划':'劃','则':'則','属':'屬','帐':'帳','径':'徑','据':'據','标':'標','满':'滿','线':'線','给':'給','规':'規','远':'遠','里':'裡','问':'問'});
function toTraditional(value){return [...value].map(ch=>pairs[ch]??ch).join('').replaceAll('視頻','影片')}

const platformData = {
  binance: {
    name: 'Binance', code: 'TW1866', referral: 'https://www.bsmkweb.cc/join?ref=TW1866', cover: '06.webp',
    hub: '/tw/exchanges/binance/', register: '/tw/exchanges/binance/register/', referralPage: '/tw/exchanges/binance/referral-code/', fees: '/tw/exchanges/binance/fees/'
  },
  okx: {
    name: 'OKX', code: 'TW1866', referral: 'https://www.mitxcqvwnhj.com/join/TW1866', cover: '07.webp',
    hub: '/tw/exchanges/okx/', register: '/tw/exchanges/okx/register/', fees: '/tw/exchanges/okx/fees/'
  },
  gate: {
    name: 'Gate', code: 'VOYUTWFF', referral: 'https://www.gatesites.cc/share/VOYUTWFF', cover: '08.webp',
    hub: '/tw/exchanges/gate/', register: '/tw/exchanges/gate/register/', fees: '/tw/exchanges/gate/fees/'
  }
};

const pages = [
  {
    file: 'exchanges/binance/register/index.html', platform: 'binance', type: 'B', category: 'Binance 教學',
    title: 'Binance台灣註冊教學：KYC、安全設定與開始使用',
    description: 'Binance台灣註冊完整教學，說明TW1866專屬入口、帳號建立、KYC身分驗證、2FA安全設定與開始使用前的資金路徑。',
    points: ['台灣讀者註冊前應先確認所在地區資格與當前可用產品。','本站專屬連結已包含 TW1866 推薦關係，不需要再重複輸入邀請碼。','完成 KYC 後先設定 2FA、防釣魚碼與提款安全，再移入資產。'],
    sections: [
      ['註冊前先確認三件事', `<p>台灣使用者可以先從本人所在地區、可用證件與預計使用的功能開始核對。能開啟網站不等於所有產品都對本人開放；法幣支付、P2P、合約與活動資格可能依地區、帳戶與官方規則不同。</p><p>準備本人常用電子郵件或手機、有效身分證件，以及只有自己能控制的驗證器。不要透過 LINE 群組、私訊客服或遠端控制軟體完成註冊。</p>`],
      ['Binance台灣註冊步驟', `<div class="article-steps"><div class="article-step"><strong>1</strong><div><h3>開啟專屬註冊入口</h3><p>確認網址與裝置安全後開啟本站提供的台灣專屬連結。連結已包含 TW1866，不需要再手動重複填寫。</p></div></div><div class="article-step"><strong>2</strong><div><h3>建立帳號</h3><p>使用自己長期控制的電子郵件或手機，設定獨立密碼並完成一次性驗證。</p></div></div><div class="article-step"><strong>3</strong><div><h3>完成 KYC</h3><p>從帳戶的身分驗證入口提交本人資料、有效證件與人臉辨識；姓名與證件內容要一致。</p></div></div><div class="article-step"><strong>4</strong><div><h3>先完成安全設定</h3><p>啟用驗證器、反釣魚碼與提款白名單；資產操作前先用小額測試。</p></div></div></div>`],
      ['KYC要准备什么？', `<p>官方说明指出，新用户需要完成 Verified 身分验证才能使用包括加密资产存入与交易在内的服务。实际审核层级、文件类型、限额与时间以本人帐户的 Identification 页面为准。</p><p>证件照片应完整清楚，避免反光、裁切与遮挡。若资料退回，先查看平台显示的原因，不要把证件上传给自称客服的第三方。</p>`],
      ['台灣用户的入金与开始使用路径', `<p>注册与 KYC 只是建立帐户，不代表已经解决新台币入金。台湾用户应另行确认银行、台湾本地平台、链上转帐或平台当前支持的付款路径，再比较费用与风险。</p><p>如果从其他平台转入 USDT，必须先确认接收端支持的网络，再回到发送端选择完全相同的网络。第一次建议小额测试，并保留交易记录。</p>`],
      ['图片与视频说明', `<p class="media-source">本页沿用 CoinVoyu Taiwan 既有 Binance 平台主题封面；本批未取得可核实的 Binance Launch Station 图片或视频文件，因此未加入外部操作截图，也未标示为 Launch Station 素材。</p>`]
    ],
    faq: [['Binance台灣註冊要填哪個邀請碼？','本站台灣專屬邀請碼是 TW1866。使用本頁專屬連結時，推薦關係已由連結承擔，不需要再重複輸入。'],['完成註冊後一定能使用所有功能嗎？','不一定。產品、支付方式與限額會依所在地區、KYC狀態和平台規則而異，請以本人帳戶實際顯示為準。'],['KYC資料可以交給客服代辦嗎？','不可以。只在確認為官方的網站或App內提交本人資料，不向私訊客服提供證件、驗證碼或遠端控制權。']],
    sources: [['Binance：個人帳戶身分驗證說明','https://www.binance.com/en/support/faq/detail/360027287111'],['Binance：現貨交易費率','https://www.binance.com/en/fee/trading']],
    related: [['邀請碼說明','Binance邀請碼怎麼填？','/tw/exchanges/binance/referral-code/'],['費用核對','Binance手續費怎麼算？','/tw/exchanges/binance/fees/'],['買幣路徑','台灣怎麼買 Bitcoin？','/tw/buy-crypto/buy-bitcoin-taiwan/']]
  },
  {
    file: 'exchanges/binance/referral-code/index.html', platform: 'binance', type: 'C', category: 'Binance 邀請碼',
    title: 'Binance邀請碼怎麼填？TW1866註冊說明',
    description: 'Binance邀請碼TW1866怎麼填？說明專屬連結、註冊頁確認方式、已註冊帳戶注意事項與推薦權益核對原則。',
    points: ['CoinVoyu Taiwan 的 Binance 邀請碼是 TW1866。','使用專屬連結時推薦關係已包含在連結內，不需要重複輸入。','推薦關係與活動權益要以註冊頁及本人帳戶實際顯示為準。'],
    sections: [
      ['Binance邀請碼是多少？', `<p><strong>CoinVoyu Taiwan 的 Binance 邀請碼是 TW1866。</strong>最簡單的方式是直接使用本站專屬註冊連結；連結已帶入推薦參數，因此不需要先複製代碼、再手動重複填寫。</p><p>送出註冊前，請在官方流程中核對頁面是否顯示推薦資訊。若頁面沒有提供欄位或未顯示，不要自行拼接網址參數。</p>`],
      ['邀请代码怎么填写？', `<div class="article-steps"><div class="article-step"><strong>1</strong><div><h3>从专属链接进入</h3><p>开启链接后确认是 Binance 注册流程，并检查浏览器地址和装置安全。</p></div></div><div class="article-step"><strong>2</strong><div><h3>查看推荐栏位</h3><p>若页面已经带入推荐关系，直接继续；不要重复复制或覆盖。</p></div></div><div class="article-step"><strong>3</strong><div><h3>送出前最后确认</h3><p>确认电子邮件、所在地区与推荐资讯无误，再完成注册与验证。</p></div></div></div>`],
      ['已经注册还能补填吗？', `<p>不要假设已建立的帐号一定可以事后新增或更换推荐关系。帐号是否符合补填条件、入口是否出现以及最终绑定结果，都应以 Binance 当前帐户页面与官方客服答复为准。</p><p>为避免重复帐号或资格问题，不建议为了邀请码自行注销、重开或使用他人身分资料。</p>`],
      ['邀请码等于固定优惠吗？', `<p>不等于。邀请码用于识别推荐关系，不代表每个地区、帐户或时期都有相同优惠。本页不承诺固定返佣、手续费折扣或注册奖励；任何权益只以注册页、活动条款与本人帐户实际显示为准。</p>`],
      ['图片与视频说明', `<p class="media-source">本页使用 CoinVoyu Taiwan 既有 Binance 平台主题封面，没有使用第三方操作截图或视频。</p>`]
    ],
    faq: [['Binance邀請碼是什麼？','CoinVoyu Taiwan 的 Binance 邀請碼是 TW1866。'],['使用連結後還要手動填 TW1866 嗎？','不用。專屬連結已包含推薦關係，除非官方頁面明確要求且欄位為空，否則不要重複操作。'],['邀請碼保證有手續費優惠嗎？','不保證。實際推薦關係與活動權益以註冊頁、活動條款及本人帳戶顯示為準。']],
    sources: [['Binance：個人帳戶身分驗證說明','https://www.binance.com/en/support/faq/detail/360027287111'],['Binance：現貨交易費率','https://www.binance.com/en/fee/trading']],
    related: [['完整流程','Binance台灣註冊教學','/tw/exchanges/binance/register/'],['費用核對','Binance手續費怎麼算？','/tw/exchanges/binance/fees/'],['平台比較','Binance vs OKX完整比較','/tw/compare/binance-vs-okx/']]
  },
  {
    file: 'exchanges/binance/fees/index.html', platform: 'binance', type: 'C', category: 'Binance 手續費',
    title: 'Binance手續費怎麼算？現貨Maker、Taker與提幣費用',
    description: '說明Binance現貨Maker與Taker手續費算法、VIP費率、BNB支付、提幣費用與台灣用戶核對成本的方法。',
    points: ['交易手續費＝成交金額 × 本人帳戶適用費率。','Maker或Taker取決於訂單實際如何成交，不只看限價單或市價單名稱。','提幣費、買幣價差與鏈上成本要另外計算。'],
    sections: [
      ['Binance手續費怎麼算？', `<p>现货交易费用的基本公式是：<strong>成交金额 × 实际费率</strong>。例如成交金额为 10,000 USDT，若帐号页面显示费率为 0.10%，单边交易费用就是 10 USDT。买入和卖出是两次成交，应分别计算。</p><p>Binance 官方费率页在本次核对时显示，一般用户现货 Maker / Taker 基础费率为 0.100% / 0.100%；VIP等级、活动、交易对与BNB支付设定可能改变最终费率，必须以本人帐户为准。</p>`],
      ['Maker与Taker差在哪里？', `<p>Maker 是订单先进入订单簿、为市场增加流动性后成交；Taker 是订单立即与既有订单撮合、取走流动性。限价单若立即成交，也可能被视为 Taker；不要只用订单名称判断。</p>`],
      ['核对费用的四个步骤', `<div class="article-steps"><div class="article-step"><strong>1</strong><div><h3>查看本人等级</h3><p>在费率页面确认现货等级与当前 Maker / Taker 费率。</p></div></div><div class="article-step"><strong>2</strong><div><h3>确认交易对与活动</h3><p>部分交易对可能有独立费率或限时活动，不套用同一个数字。</p></div></div><div class="article-step"><strong>3</strong><div><h3>检查BNB支付设定</h3><p>若选择以BNB支付费用，确认余额、开关与当下官方折扣。</p></div></div><div class="article-step"><strong>4</strong><div><h3>用成交记录复核</h3><p>交易完成后查看实际扣费资产与金额，不只看下单前估算。</p></div></div></div>`],
      ['提幣與買幣成本不要混在一起', `<p>链上提币通常按资产与网络显示固定或动态费用，它不是现货交易费。使用新台币取得资产时，还可能出现入金手续费、汇差、点差或其他平台的转帐成本。</p><p>比较平台时，应把「入金 → 交易 → 转帐 → 卖出」整个路径合并计算，而不是只比较一个现货费率。</p>`],
      ['图片与视频说明', `<p class="media-source">本页使用 CoinVoyu Taiwan 既有 Binance 平台主题封面；费率会变化，因此不使用可能快速过时的界面截图。</p>`]
    ],
    faq: [['Binance限價單一定是Maker嗎？','不一定。若限價單送出後立即與既有訂單成交，仍可能按Taker計費。'],['Binance買入和賣出都收費嗎？','通常每次成交都依當次費率計算，買入與賣出應分開估算；以成交紀錄為準。'],['推薦碼會固定降低多少手續費？','本頁不承諾固定比例。推薦權益、活動與本人費率以註冊頁及帳戶顯示為準。']],
    sources: [['Binance：現貨交易費率','https://www.binance.com/en/fee/trading'],['Binance：個人帳戶身分驗證說明','https://www.binance.com/en/support/faq/detail/360027287111']],
    related: [['建立帳戶','Binance台灣註冊教學','/tw/exchanges/binance/register/'],['推薦關係','Binance邀請碼怎麼填？','/tw/exchanges/binance/referral-code/'],['跨平台比較','Binance vs Gate完整比較','/tw/compare/binance-vs-gate/']]
  },
  {
    file: 'exchanges/okx/register/index.html', platform: 'okx', type: 'B', category: 'OKX 教學',
    title: 'OKX台灣註冊教學：KYC、安全設定與入金路徑',
    description: 'OKX台灣註冊完整教學，說明TW1866專屬入口、帳戶建立、KYC、2FA安全設定，以及台灣TWD C2C限制與入金路徑。',
    points: ['本站 OKX 台灣專屬連結已包含 TW1866 推薦關係。','交易所帳戶與 OKX Web3 錢包是不同的安全範圍。','台灣 TWD C2C 已有明確限制，註冊前要先規劃實際資金路徑。'],
    sections: [
      ['OKX台灣註冊前先知道什麼？', `<p>注册前先确认本人地区、证件与预定使用的产品。OKX 的交易所帐户用于身分验证与中心化交易；Web3 钱包由私钥或助记词控制，两者不能混为一谈。</p><p>台湾 TWD C2C 已下线，建立帐号不等于可以直接用新台币完成 C2C 买币。应先比较台湾本地平台入金、链上转入与当前官方提供的其他路径。</p>`],
      ['OKX注册与KYC步骤', `<div class="article-steps"><div class="article-step"><strong>1</strong><div><h3>开启台湾专属入口</h3><p>连结已包含 TW1866，不需要再次要求使用者复制或填写邀请码。</p></div></div><div class="article-step"><strong>2</strong><div><h3>建立个人帐户</h3><p>使用本人长期控制的联络方式，并设定未在其他网站使用过的密码。</p></div></div><div class="article-step"><strong>3</strong><div><h3>完成身分验证</h3><p>从个人资料的 Verification 入口提交本人资料、证件与人脸辨识。</p></div></div><div class="article-step"><strong>4</strong><div><h3>完成安全设定</h3><p>启用验证器、反钓鱼设定与提款保护后，再规划资金转入。</p></div></div></div>`],
      ['KYC与资料安全', `<p>OKX 官方说明，个人帐号需完成进阶身分验证，以满足 KYC 要求；完成后才可进行交易、存入与提领。适用条件可能依客户地区不同，必须登入本人帐号核对。</p><p>只在确认的官方 App 或网站提交资料。任何人要求助记词、私钥、一次性验证码或远端控制，都不属于正常 KYC 流程。</p>`],
      ['注册后如何规划入金？', `<p>若从台湾本地平台转入 USDT，应先确认 OKX 的充值页面支持哪一条网络，再回到发送端选择完全相同的网络。帐户内部的资金划转不是链上转帐，也不会改变新台币入金限制。</p>`],
      ['图片与视频说明', `<p class="media-source">本页沿用 CoinVoyu Taiwan 既有 OKX 平台主题封面。现有 OKX 官方介面影片可在<a href="/tw/videos/">影片教学中心</a>查看，并已在对应页面标示来源；本页未新增第三方素材。</p>`]
    ],
    faq: [['OKX台灣邀請碼是什麼？','CoinVoyu Taiwan 的 OKX 邀請碼是 TW1866；專屬連結已包含推薦關係。'],['OKX註冊後可以直接用台幣C2C嗎？','台灣TWD C2C已有下線限制，請先核對當前官方規則並規劃本地平台或鏈上轉入等路徑。'],['交易所帳戶和Web3錢包相同嗎？','不同。交易所帳戶由平台帳戶與KYC管理；Web3錢包的控制核心是私鑰或助記詞。']],
    sources: [['OKX：個人帳戶身分驗證','https://www.okx.com/en-us/help/how-do-i-verify-an-individual-account'],['OKX：交易手續費規則','https://www.okx.com/en-gb/help/trading-fee-rules-faq'],['OKX：台灣 TWD C2C 下線公告','https://www.okx.com/zh-hant/help/twd-c2c-removal']],
    related: [['費用核對','OKX手續費怎麼算？','/tw/exchanges/okx/fees/'],['平台全覽','OKX台灣使用教學','/tw/exchanges/okx/'],['平台比較','Binance vs OKX完整比較','/tw/compare/binance-vs-okx/']]
  },
  {
    file: 'exchanges/okx/fees/index.html', platform: 'okx', type: 'C', category: 'OKX 手續費',
    title: 'OKX手續費怎麼算？Maker、Taker與帳戶費率',
    description: '說明OKX現貨Maker與Taker手續費算法、帳戶等級、成交紀錄、提幣費與台灣使用者核對總成本的方法。',
    points: ['手续费取决于订单实际作为 Maker 或 Taker 成交。','市价单通常是 Taker；限价单也可能立即成交而成为 Taker。','本人费率、交易对与地区规则要在登入后核对。'],
    sections: [
      ['OKX手续费怎么计算？', `<p>基本公式同样是：<strong>成交金额 × 本人帐户适用费率</strong>。手续费通常按成交结果计算，不是只看你选择「市价」还是「限价」。</p><p>OKX 官方说明，订单立即与订单簿既有订单成交时属于 Taker；订单先留在订单簿并在之后成交时属于 Maker。Maker 通常较低，但最终仍以实际成交纪录为准。</p>`],
      ['四步核对本人费用', `<div class="article-steps"><div class="article-step"><strong>1</strong><div><h3>查看当前费率等级</h3><p>登入后检查个人费率页面、30日交易量与资产条件。</p></div></div><div class="article-step"><strong>2</strong><div><h3>确认订单成交角色</h3><p>查看成交纪录是 Maker 还是 Taker，不只根据订单类型猜测。</p></div></div><div class="article-step"><strong>3</strong><div><h3>分开计算每次成交</h3><p>部分成交、买入与卖出都要分别核对费用。</p></div></div><div class="article-step"><strong>4</strong><div><h3>加入提币与资金路径</h3><p>将链上提领、价差与台湾入金路径一并计入总成本。</p></div></div></div>`],
      ['为什么限价单也可能收Taker费？', `<p>限价单如果设定的价格可以立即与订单簿成交，就会取走现有流动性，因此按 Taker 处理。只有订单先挂在订单簿、之后才被其他订单成交，才通常属于 Maker。</p>`],
      ['台湾用户还要注意哪些成本？', `<p>台湾 TWD C2C 已下线，因此从新台币到 OKX 的路线可能经过本地平台、其他资产或链上转帐。除了现货手续费，还应计算本地入金、买入价差、提币费与网络成本。</p>`],
      ['图片与视频说明', `<p class="media-source">本页使用 CoinVoyu Taiwan 既有 OKX 平台主题封面；为避免费率截图过期，数字以官方费率页与本人帐户即时显示为准。</p>`]
    ],
    faq: [['OKX市價單一定是Taker嗎？','市價單通常會立即成交，因此通常按Taker計費；最終以實際成交紀錄為準。'],['OKX限價單一定是Maker嗎？','不一定。限價單若立即成交，仍可能是Taker。'],['OKX費率為什麼和別人的不同？','帳戶等級、30日交易量、資產、產品、交易對和地區可能影響費率，請登入本人帳戶核對。']],
    sources: [['OKX：交易手續費規則','https://www.okx.com/en-gb/help/trading-fee-rules-faq'],['OKX：個人帳戶身分驗證','https://www.okx.com/en-us/help/how-do-i-verify-an-individual-account']],
    related: [['建立帳戶','OKX台灣註冊教學','/tw/exchanges/okx/register/'],['平台全覽','OKX台灣使用教學','/tw/exchanges/okx/'],['平台比較','Binance vs OKX完整比較','/tw/compare/binance-vs-okx/']]
  },
  {
    file: 'exchanges/gate/register/index.html', platform: 'gate', type: 'B', category: 'Gate 教學',
    title: 'Gate台灣註冊教學：KYC、安全設定與開始使用',
    description: 'Gate台灣註冊完整教學，說明VOYUTWFF專屬入口、帳戶建立、KYC、安全設定、入金與提幣前的檢查。',
    points: ['本站 Gate 台灣專屬連結已包含 VOYUTWFF 推薦關係。','註冊前先確認所在地區、可用產品與本人證件。','KYC完成後先設定2FA與提款保護，再小額測試入金。'],
    sections: [
      ['Gate台湾注册前先确认什么？', `<p>Gate 支持的市场与工具较多，但可用产品会受地区、帐户状态与平台规则影响。注册前先确认本人资格、预计使用的资产，以及未来如何从台湾资金路径转入和转出。</p>`],
      ['Gate注册与KYC步骤', `<div class="article-steps"><div class="article-step"><strong>1</strong><div><h3>开启台湾专属入口</h3><p>链接已包含 VOYUTWFF，不需要重复复制或输入邀请码。</p></div></div><div class="article-step"><strong>2</strong><div><h3>建立个人帐户</h3><p>使用本人控制的电子邮件或手机，并设定独立密码。</p></div></div><div class="article-step"><strong>3</strong><div><h3>提交身分验证</h3><p>准备本人有效证件，确保姓名、证件号码与国籍资料一致。</p></div></div><div class="article-step"><strong>4</strong><div><h3>完成安全设定</h3><p>启用2FA、反钓鱼码与提款白名单，再进行小额测试。</p></div></div></div>`],
      ['Gate KYC要准备什么？', `<p>Gate 官方网页教学要求使用本人有效证件，可包括护照、身分证或驾照；上传照片要清楚、完整、无遮挡与反光。实际可用证件、地址验证和审核时间依地区与页面显示为准。</p><p>若审核失败，先查看官方页面的退回原因并重新提交，不要把资料交给社群中的代办人员。</p>`],
      ['入金与提币怎么降低错误风险？', `<p>先在 Gate 充值页面确认资产与网络，再到发送平台选择完全相同的网络。第一次只转小额，等实际入帐后再继续。提币时同样从接收端开始核对地址、Memo/Tag与网络。</p>`],
      ['图片与视频说明', `<p class="media-source">本页沿用 CoinVoyu Taiwan 既有 Gate 平台主题封面；没有将其他平台界面或未验证素材当作 Gate 操作截图。</p>`]
    ],
    faq: [['Gate台灣邀請碼是什麼？','CoinVoyu Taiwan 的 Gate 邀請碼是 VOYUTWFF；專屬連結已包含推薦關係。'],['Gate KYC可以用別人的證件嗎？','不可以。應使用本人有效證件，資料必須與帳戶填寫內容一致。'],['註冊後應該立刻轉入大額資產嗎？','不建議。先完成安全設定並用小額測試網路、地址與入帳流程。']],
    sources: [['Gate：網頁版身分驗證教學','https://miniapp.gate.com/help/guide/security-settings/17293/how-to-perform-identification-verification-web-version/how-to-perform-identification-verification-web-version'],['Gate：現貨手續費計算','https://www.gate.com/tr/help/trade/spot/41629/how-to-calculate-the-spot-trading-fee']],
    related: [['費用核對','Gate手續費怎麼算？','/tw/exchanges/gate/fees/'],['平台全覽','Gate台灣使用教學','/tw/exchanges/gate/'],['平台比較','Binance vs Gate完整比較','/tw/compare/binance-vs-gate/']]
  },
  {
    file: 'exchanges/gate/fees/index.html', platform: 'gate', type: 'C', category: 'Gate 手續費',
    title: 'Gate手續費怎麼算？現貨費率、VIP與提幣成本',
    description: '說明Gate現貨Maker與Taker手續費算法、VIP等級、GT支付、提幣費與台灣使用者比較總成本的方法。',
    points: ['现货手续费＝成交金额 × 实际 Maker 或 Taker 费率。','VIP等级、GT支付与活动可能改变费率，不要只看单一数字。','提币费与链上网络成本要和交易费分开核对。'],
    sections: [
      ['Gate手续费怎么计算？', `<p>基本公式是：<strong>成交金额 × 本人帐户实际费率</strong>。Gate 采用 VIP 分层费率，Maker 与 Taker 费率会随等级、资产条件、交易量与支付方式变化。</p><p>官方费率页在本次核对时显示，VIP 0 的一般 Maker / Taker 费率为 0.1% / 0.1%，以 GT 支付的页面费率为 0.09% / 0.09%；实际适用值仍要以本人帐户和当下页面为准。</p>`],
      ['如何确认Maker和Taker？', `<p>订单进入订单簿并增加流动性后再成交，通常属于 Maker；订单立即与既有订单撮合，通常属于 Taker。限价单也可能因为立即成交而成为 Taker。</p>`],
      ['费用核对步骤', `<div class="article-steps"><div class="article-step"><strong>1</strong><div><h3>确认VIP等级</h3><p>查看30日交易量、资产与本人当前等级。</p></div></div><div class="article-step"><strong>2</strong><div><h3>确认支付方式</h3><p>若选择GT支付，确认开关、余额与当前官方规则。</p></div></div><div class="article-step"><strong>3</strong><div><h3>查看实际成交</h3><p>用成交纪录核对Maker/Taker、扣费资产与金额。</p></div></div><div class="article-step"><strong>4</strong><div><h3>加上提币成本</h3><p>按资产与网络查看提币页显示的即时费用。</p></div></div></div>`],
      ['台湾资金路径的总成本', `<p>台湾使用者可能先在本地平台取得资产，再转入 Gate。完整成本包括本地入金或交易费、买入价差、链上提币费、Gate现货费，以及未来转回本地平台的成本。</p><p>支持币种多不代表每个市场都有相同深度；大额下单还应观察买卖价差和预估滑价。</p>`],
      ['图片与视频说明', `<p class="media-source">本页使用 CoinVoyu Taiwan 既有 Gate 平台主题封面；不使用可能快速过期的费率截图，数字以官方费率页与本人帐户为准。</p>`]
    ],
    faq: [['Gate VIP 0現貨費率是多少？','本次核對的官方頁面顯示一般Maker/Taker為0.1%/0.1%；費率可能更新，請以本人帳戶為準。'],['用GT支付一定比較便宜嗎？','是否適用及折抵後費率取決於帳戶設定、餘額與當前規則，應在下單與成交紀錄中核對。'],['Gate提幣費包含在交易費裡嗎？','不包含。提幣費通常依資產和網路另行顯示。']],
    sources: [['Gate：費率與VIP等級','https://www.gate.com/fee'],['Gate：現貨手續費計算','https://www.gate.com/tr/help/trade/spot/41629/how-to-calculate-the-spot-trading-fee']],
    related: [['建立帳戶','Gate台灣註冊教學','/tw/exchanges/gate/register/'],['平台全覽','Gate台灣使用教學','/tw/exchanges/gate/'],['平台比較','Binance vs Gate完整比較','/tw/compare/binance-vs-gate/']]
  }
];

function header() {
  return `<a class="skip" href="#main">跳至主要內容</a><header class="header"><div class="wrap navline"><a class="brand" href="/tw/" aria-label="CoinVoyu 台灣首頁"><span class="brandmark" aria-hidden="true">C</span><span class="brand-name">CoinVoyu</span><small>台灣 / Taiwan</small></a><button class="menu" type="button" aria-expanded="false" aria-controls="main-nav" aria-label="展開導覽選單">☰</button><nav class="navlinks" id="main-nav" aria-label="主要導覽"><a href="/tw/">首頁</a><a href="/tw/learn/">開始學習</a><a href="/tw/buy-crypto/">買幣教學</a><a href="/tw/exchanges/" aria-current="page">交易所</a><a href="/tw/compare/">平台比較</a><a href="/tw/videos/">影片教學</a><a class="mobile-only" href="/tw/security/">安全指南</a><a class="mobile-only" href="/">简体中文</a></nav><a class="locale" href="/">繁中 / 简中</a></div></header>`;
}

function footer() {
  return `<footer class="footer"><div class="wrap"><div class="footer-grid"><div><a class="brand" href="/tw/" aria-label="CoinVoyu 台灣首頁"><span class="brandmark" aria-hidden="true">C</span><span class="brand-name">CoinVoyu</span><small>台灣 / Taiwan</small></a><p>從第一次了解，到真正看懂。<br>繁體中文教學，聚焦台灣使用情境。</p><a href="/tw/articles/">全部教學</a><a href="/tw/about/author/">作者與編輯團隊</a></div><div><h3>學習</h3><a href="/tw/learn/what-is-bitcoin/">Bitcoin是什麼？</a><a href="/tw/learn/what-is-usdt/">USDT是什麼？</a><a href="/tw/wallets/hot-vs-cold-wallet/">冷錢包與熱錢包</a></div><div><h3>實用教學</h3><a href="/tw/buy-crypto/buy-bitcoin-taiwan/">買 Bitcoin</a><a href="/tw/buy-crypto/buy-usdt-taiwan/">買 USDT</a><a href="/tw/buy-crypto/withdraw-to-bank/">銀行出金</a></div><div><h3>交易所</h3><a href="/tw/exchanges/binance/">Binance</a><a href="/tw/exchanges/okx/">OKX</a><a href="/tw/exchanges/gate/">Gate</a><a href="/tw/exchanges/">完整比較</a></div><div><h3>關於</h3><a href="/tw/about/">關於我們</a><a href="/tw/about/editorial-policy/">編輯政策</a><a href="/tw/about/risk-disclosure/">風險揭露</a><a href="/tw/about/affiliate-disclosure/">利益揭露</a><a href="/tw/about/privacy/">隱私權政策</a><a href="/tw/about/contact/">聯絡與更正</a></div></div><div class="footer-bottom">© 2026 CoinVoyu · 本站提供教育資訊，虛擬資產涉及價格、平台、技術與監管風險。<br>本站部分連結可能包含推薦連結；使用平台前請核對本人資格與最新規則。</div></div></footer><a class="backtop" href="#top" aria-label="回到頁面頂部">↑ 回頂部</a><script src="/tw/assets/site.js" defer></script>`;
}

function cluster(p) {
  const d = platformData[p.platform];
  const links = p.platform === 'binance'
    ? [[d.hub,'Binance完整教學'],[d.register,'台灣註冊'],[d.referralPage,'邀請碼 TW1866'],[d.fees,'手續費']]
    : [[d.hub,`${d.name}完整教學`],[d.register,'台灣註冊'],[d.fees,'手續費'],[p.platform === 'okx' ? '/tw/compare/binance-vs-okx/' : '/tw/compare/binance-vs-gate/','平台比較']];
  const current = '/tw/' + p.file.replace(/index\.html$/, '');
  return `<nav class="cluster-path" aria-label="${d.name}轉化學習路徑"><strong>${d.name} 註冊與費用路徑</strong><div class="cluster-links">${links.map(([href,label])=>`<a class="cluster-link" href="${href}"${href===current?' aria-current="page"':''}>${label}</a>`).join('')}</div></nav>`;
}

function renderPage(p) {
  const d = platformData[p.platform];
  const urlPath = '/tw/' + p.file.replace(/index\.html$/, '');
  const canonical = 'https://www.coinvoyu.com' + urlPath;
  const sectionLinks = p.sections.map((s,i)=>`<li><a href="#section-${i+1}">${s[0]}</a></li>`).join('');
  const faqSchema = p.faq.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}));
  const schema = {'@context':'https://schema.org','@graph':[{'@type':'Article',headline:p.title,description:p.description,url:canonical,image:`https://www.coinvoyu.com/tw/assets/covers/${d.cover}`,inLanguage:'zh-TW',datePublished:updatedIso,dateModified:updatedIso,author:{'@type':'Organization',name:'CoinVoyu 編輯團隊',url:'https://www.coinvoyu.com/tw/about/author/'},publisher:{'@type':'Organization',name:'CoinVoyu',url:'https://www.coinvoyu.com/'}},{'@type':'FAQPage',mainEntity:faqSchema},{'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'CoinVoyu 台灣',item:'https://www.coinvoyu.com/tw/'},{'@type':'ListItem',position:2,name:d.name,item:`https://www.coinvoyu.com${d.hub}`},{'@type':'ListItem',position:3,name:p.title,item:canonical}]}]};
  const cta = `<aside class="platform-cta conversion-cta"><p class="tag">${d.name} 台灣專屬入口</p><h3>${p.title.includes('手續費') ? '先核對費率，再決定是否建立帳戶' : `使用已包含 ${d.code} 的專屬連結`}</h3><p>請先確認本人所在地區、適用條款與頁面顯示的推薦關係；不承諾固定優惠比例。</p><div class="conversion-actions"><a class="btn primary" href="${d.referral}" target="_blank" rel="sponsored noopener noreferrer" data-event="platform_cta_click" data-platform="${p.platform}" data-link-type="referral" data-position="batch3-article">前往 ${d.name} 註冊頁</a><a class="btn" href="${d.hub}">先看完整平台教學</a></div><p class="affiliate-note">${disclosure}</p></aside>`;
  return `<!doctype html><html lang="zh-TW"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${p.title}｜CoinVoyu 台灣</title><meta name="description" content="${p.description}"><link rel="canonical" href="${canonical}"><meta name="robots" content="index,follow"><meta property="og:title" content="${p.title}"><meta property="og:description" content="${p.description}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="https://www.coinvoyu.com/tw/assets/covers/${d.cover}"><meta property="og:locale" content="zh_TW"><meta name="twitter:card" content="summary_large_image"><meta name="theme-color" content="#F8FAFC"><link rel="icon" href="/tw/assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/tw/assets/site.css"><script type="application/ld+json">${JSON.stringify(schema)}</script></head><body id="top" data-article-type="${p.type}" data-platform="${p.platform}">${header()}<main id="main"><div class="wrap"><nav class="crumb" aria-label="麵包屑"><a href="/tw/">首頁</a><span>›</span><a href="${d.hub}">${d.name}</a><span>›</span><span aria-current="page">${p.title}</span></nav><header class="page-head"><p class="tag">${p.category}</p><h1>${p.title}</h1><p class="lead">${p.description}</p><div class="byline"><a href="/tw/about/author/">作者／編輯：CoinVoyu 編輯團隊</a><span>首次發布：${updated}</span><span>最後更新：${updated}</span></div></header><div class="article-grid"><article class="article-body"><img class="cover-main" src="/tw/assets/covers/${d.cover}" alt="${p.title}主題插圖" width="1200" height="675" fetchpriority="high"><aside class="points article-summary"><h2>先看重點</h2><ul>${p.points.map(x=>`<li>${x}</li>`).join('')}</ul></aside>${cluster(p)}<details class="mobile-toc"><summary>展開目錄</summary><ol>${sectionLinks}<li><a href="#faq">常見問題</a></li><li><a href="#sources">資料來源</a></li></ol></details>${p.sections.map((s,i)=>`<h2 id="section-${i+1}">${s[0]}</h2>${s[1]}`).join('')}${cta}<section id="faq"><h2>常見問題</h2><div class="faq-grid">${p.faq.map(([q,a])=>`<details class="faq-item"><summary>${q}</summary><p>${a}</p></details>`).join('')}</div></section><section class="sources" id="sources"><h2>資料來源與核對範圍</h2><p>本頁於 ${updated} 核對。平台介面、費率、地區資格與規則可能調整，請以本人帳戶及官方最新頁面為準。</p><ol>${p.sources.map(([name,url])=>`<li><a href="${url}" target="_blank" rel="noopener noreferrer">${name}</a></li>`).join('')}</ol></section><aside class="notice">風險提示：虛擬資產涉及價格、平台、保管、轉帳與監管風險。本頁是教育資訊，不構成投資、法律或稅務建議；操作前請核對地址、網路、費用與本人資格。</aside><section><h2>接下來可以看</h2><div class="continue-grid">${p.related.map(([small,title,href])=>`<a class="continue-card" href="${href}" data-event="continue_learning_click" data-position="article-tail"><small>${small}</small><strong>${title}</strong><span>依學習路徑接著閱讀</span></a>`).join('')}</div></section></article><aside class="toc"><details open><summary>文章目錄</summary><ol>${sectionLinks}<li><a href="#faq">常見問題</a></li><li><a href="#sources">資料來源</a></li></ol><div class="meta">${p.category}<br>最後更新：${updated}</div></details></aside></div></div></main>${footer()}</body></html>`;
}

for (const p of pages) {
  const target = path.join(twRoot, p.file);
  fs.mkdirSync(path.dirname(target), {recursive:true});
  fs.writeFileSync(target, toTraditional(renderPage(p)));
}

// Add conversion-cluster entry points to existing platform guides.
for (const key of ['binance','okx','gate']) {
  const d = platformData[key];
  const file = path.join(twRoot, `exchanges/${key}/index.html`);
  let html = fs.readFileSync(file,'utf8');
  if (!html.includes(`${d.name} 註冊與費用指南`)) {
    const extra = `<section><h2>${d.name} 註冊與費用指南</h2><div class="continue-grid"><a class="continue-card" href="${d.register}"><small>註冊教學</small><strong>${d.name}台灣註冊與KYC</strong><span>查看完整步驟</span></a>${key==='binance'?`<a class="continue-card" href="${d.referralPage}"><small>邀請碼</small><strong>${d.name}邀請碼 ${d.code}</strong><span>了解填寫與核對</span></a>`:''}<a class="continue-card" href="${d.fees}"><small>費用說明</small><strong>${d.name}手續費怎麼算？</strong><span>核對Maker、Taker與總成本</span></a></div></section>`;
    html = html.replace('<section class="sources"', `${extra}<section class="sources"`);
    fs.writeFileSync(file,html);
  }
}

// Strengthen the three requested topic paths without changing their URLs or article bodies.
for (const rel of ['learn/what-is-bitcoin/index.html','buy-crypto/buy-bitcoin-taiwan/index.html']) {
  const f=path.join(twRoot,rel); let h=fs.readFileSync(f,'utf8');
  h=h.replace('href="/tw/exchanges/binance/">Binance 教學','href="/tw/exchanges/binance/register/">Binance 註冊教學');
  fs.writeFileSync(f,h);
}
for (const rel of ['learn/what-is-usdt/index.html','buy-crypto/buy-usdt-taiwan/index.html','learn/trc20-vs-erc20/index.html']) {
  const f=path.join(twRoot,rel); let h=fs.readFileSync(f,'utf8');
  if(!h.includes('交易所教學與比較</a>')) h=h.replace('</div></nav><details class="mobile-toc">','<a class="cluster-link" href="/tw/exchanges/">交易所教學與比較</a></div></nav><details class="mobile-toc">');
  fs.writeFileSync(f,h);
}

// Make the USDT core page answer the Taiwan intent directly while preserving its URL and body structure.
{
  const f=path.join(twRoot,'learn/what-is-usdt/index.html'); let h=fs.readFileSync(f,'utf8');
  h=h.replace('<title>USDT是什麼？｜CoinVoyu 台灣</title>','<title>USDT是什麼？泰達幣與台灣使用完整說明｜CoinVoyu 台灣</title>');
  h=h.replace('<meta property="og:title" content="USDT是什麼？">','<meta property="og:title" content="USDT是什麼？泰達幣與台灣使用完整說明">');
  h=h.replace('<h1>USDT是什麼？</h1>','<h1>USDT是什麼？泰達幣與台灣使用完整說明</h1>');
  h=h.replace('"headline": "USDT是什麼？"','"headline": "USDT是什麼？泰達幣與台灣使用完整說明"');
  fs.writeFileSync(f,h);
}

// Extend the article directory from 20 to 27 items.
{
  const f=path.join(twRoot,'articles/index.html'); let h=fs.readFileSync(f,'utf8');
  h=h.replaceAll('首發 20 篇台灣繁體加密貨幣指南','27 篇台灣繁體加密貨幣指南');
  h=h.replace('顯示 20 項內容','顯示 27 項內容');
  if(!h.includes('data-filter="費用說明"')) h=h.replace('<button data-filter="安全指南" aria-pressed="false">安全指南</button></div>','<button data-filter="安全指南" aria-pressed="false">安全指南</button><button data-filter="邀請碼" aria-pressed="false">邀請碼</button><button data-filter="費用說明" aria-pressed="false">費用說明</button></div>');
  if(!h.includes('/tw/exchanges/binance/register/')) {
    const cards=toTraditional(pages.map(p=>{const d=platformData[p.platform];return `<article class="card" data-category="${p.category.includes('手續費')?'費用說明':p.category.includes('邀請碼')?'邀請碼':'平台教學'}"><a href="/tw/${p.file.replace(/index\.html$/,'')}"><img src="/tw/assets/covers/${d.cover}" alt="${p.title}主題插圖" loading="lazy" width="1200" height="675"></a><div class="card-body"><span class="tag">${p.category}</span><h3><a href="/tw/${p.file.replace(/index\.html$/,'')}">${p.title}</a></h3><p class="desc">${p.description}</p><div class="card-meta"><span>更新：${updated}</span><span aria-hidden="true">↗</span></div></div></article>`;}).join(''));
    h=h.replace('</div><p id="no-results"',`${cards}</div><p id="no-results"`);
  }
  fs.writeFileSync(f,toTraditional(h));
}

// Add the seven URLs to the Taiwan-only sitemap.
{
  const f=path.join(twRoot,'sitemap.xml'); let h=fs.readFileSync(f,'utf8');
  for(const p of pages){const loc=`https://www.coinvoyu.com/tw/${p.file.replace(/index\.html$/,'')}`;if(!h.includes(`<loc>${loc}</loc>`))h=h.replace('</urlset>',`<url><loc>${loc}</loc><lastmod>2026-10-07</lastmod></url></urlset>`)}
  h=h.replace('<loc>https://www.coinvoyu.com/tw/articles/</loc><lastmod>2026-10-01</lastmod>','<loc>https://www.coinvoyu.com/tw/articles/</loc><lastmod>2026-10-07</lastmod>');
  fs.writeFileSync(f,h);
}
