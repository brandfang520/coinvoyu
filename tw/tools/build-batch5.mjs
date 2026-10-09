import fs from 'node:fs';
import path from 'node:path';

const repo = path.resolve(import.meta.dirname, '../..');
const tw = path.join(repo, 'tw');

const videoFiles = [
  '如何拥有自己的OKX账户.mp4',
  '如何进行身份认证.mp4',
  '如何进行账户资金划转.mp4',
  '如何进行现货交易.mp4',
  '如何进行链上充值提币.mp4',
  '如何绑定⾝份验证应⽤.mp4',
  '如何设置通⾏密钥.mp4',
  '如何进⾏OKX官⽅渠道验证.mp4'
];
const coverFiles = [
  'okx-account-registration.webp',
  'identity-verification.webp',
  'fund-transfer.webp',
  'spot-trading.webp',
  'onchain-deposit-withdrawal.webp',
  'authenticator-app.webp',
  'passkey.webp',
  'official-channel-verification.webp'
];

for (const [sourceDir, targetDir, files] of [
  [path.join(repo, 'assets/videos'), path.join(tw, 'assets/videos'), videoFiles],
  [path.join(repo, 'assets/images/video-covers'), path.join(tw, 'assets/video-covers'), coverFiles]
]) {
  fs.mkdirSync(targetDir, {recursive: true});
  for (const name of files) fs.copyFileSync(path.join(sourceDir, name), path.join(targetDir, name));
}

const canonicalFooter = `<footer class="footer"><div class="wrap"><div class="footer-grid"><div><a class="brand" href="/tw/" aria-label="CoinVoyu 台灣首頁"><span class="brandmark" aria-hidden="true">C</span><span class="brand-name">CoinVoyu</span><small>台灣 / Taiwan</small></a><p>從第一次了解，到真正看懂。<br>繁體中文教學，聚焦台灣使用情境。</p><a href="/tw/articles/">全部教學</a><a href="/tw/about/author/">作者與編輯團隊</a></div><div><h3>學習</h3><a href="/tw/learn/what-is-bitcoin/">Bitcoin是什麼？</a><a href="/tw/learn/what-is-usdt/">USDT是什麼？</a><a href="/tw/learn/what-is-stablecoin/">穩定幣是什麼？</a><a href="/tw/wallets/hot-vs-cold-wallet/">冷錢包與熱錢包</a></div><div><h3>實用教學</h3><a href="/tw/buy-crypto/buy-bitcoin-taiwan/">買 Bitcoin</a><a href="/tw/buy-crypto/buy-usdt-taiwan/">買 USDT</a><a href="/tw/buy-crypto/twd-buy-crypto/">新台幣入金</a><a href="/tw/buy-crypto/withdraw-to-bank/">銀行出金</a></div><div><h3>交易所與安全</h3><a href="/tw/exchanges/binance/">Binance</a><a href="/tw/exchanges/okx/">OKX</a><a href="/tw/exchanges/gate/">Gate</a><a href="/tw/security/exchange-safety/">交易所安全</a></div><div><h3>關於</h3><a href="/tw/about/">關於我們</a><a href="/tw/about/editorial-policy/">編輯政策</a><a href="/tw/about/risk-disclosure/">風險揭露</a><a href="/tw/about/affiliate-disclosure/">利益揭露</a><a href="/tw/about/privacy/">隱私權政策</a><a href="/tw/about/contact/">聯絡與更正</a></div></div><div class="footer-bottom">© 2026 CoinVoyu · 本站提供教育資訊，虛擬資產涉及價格、平台、技術與監管風險。<br>本站部分連結可能包含推薦連結；使用平台前請核對本人資格與最新規則。</div></div></footer>`;

const hotspot = `<section class="section alt"><div class="wrap"><div class="section-title"><div><p class="eyebrow">MARKET EXPLAINED</p><h2>熱點解讀</h2><p>從台灣使用情境理解市場與監管變化；不喊單、不預測短線漲跌。</p></div></div><div class="grid"><article class="card insight-card"><a href="/tw/learn/what-is-bitcoin/"><img src="/tw/assets/covers/01.webp" alt="理解 Bitcoin ETF 前先認識 Bitcoin" loading="lazy" width="1200" height="675"></a><div class="card-body"><span class="tag">Bitcoin ETF / ETP</span><h3><a href="/tw/learn/what-is-bitcoin/">看懂 Bitcoin ETF 前，先理解 Bitcoin</a></h3><p>從資產本身、鏈上轉移與保管方式，理解ETF和直接持有的差異。</p></div></article><article class="card insight-card"><a href="/tw/learn/what-is-stablecoin/"><img src="/tw/assets/covers/05.webp" alt="穩定幣與監管重點教學" loading="lazy" width="1200" height="675"></a><div class="card-body"><span class="tag">穩定幣 / 監管</span><h3><a href="/tw/learn/what-is-stablecoin/">穩定幣是什麼？USDT、USDC與風險</a></h3><p>理解發行、儲備、轉帳網路與脫鉤風險，不把穩定幣當成銀行存款。</p></div></article><article class="card insight-card"><a href="/tw/security/exchange-safety/"><img src="/tw/assets/covers/17.webp" alt="台灣使用境外交易所風險檢查" loading="lazy" width="1200" height="675"></a><div class="card-body"><span class="tag">平台 / 監管</span><h3><a href="/tw/security/exchange-safety/">台灣使用境外交易所前，要看哪些風險？</a></h3><p>從營運主體、帳戶安全、保管、提領與跨境爭議路徑逐項檢查。</p></div></article></div><div class="actions"><a class="btn" href="/tw/articles/">查看全部教學</a></div></div></section>`;

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const file = path.join(dir, entry.name);
    entry.isDirectory() ? walk(file, out) : entry.name.endsWith('.html') && out.push(file);
  }
  return out;
}

for (const file of walk(tw)) {
  let html = fs.readFileSync(file, 'utf8');
  html = html
    .replaceAll('https://www.coinvoyu.com/assets/images/video-covers/', 'https://www.coinvoyu.com/tw/assets/video-covers/')
    .replaceAll('https://www.coinvoyu.com/assets/videos/', 'https://www.coinvoyu.com/tw/assets/videos/')
    .replaceAll('/assets/images/video-covers/', '/tw/assets/video-covers/')
    .replaceAll('/assets/videos/', '/tw/assets/videos/')
    .replace(/\/tw(?:\/tw)+\/assets\//g, '/tw/assets/');

  if (html.includes('<video')) {
    const sourceNote = '<p class="media-source">影片來源：OKX 官方教學素材。CoinVoyu 提供繁體導讀與風險核對，不宣稱為原創。</p>';
    html = html.replace(/(?:<p class="media-source">影片來源：OKX 官方教學素材。CoinVoyu 提供繁體導讀與風險核對，不宣稱為原創。<\/p>)+/g, sourceNote);
    html = html.replace(/<p class="micro">(本影片畫面[^<]+)<\/p>(?!<p class="media-source">影片來源：OKX 官方教學素材)/g, (all) => `${all}${sourceNote}`);
    html = html.replace('"publisher": {"@type": "Organization", "@id": "https://www.coinvoyu.com/#organization", "name": "CoinVoyu", "url": "https://www.coinvoyu.com/"}', '"publisher": {"@type": "Organization", "name": "OKX", "url": "https://www.okx.com/"}');
  }

  html = html.replace(/<aside class="notice">(?!<strong>風險提示：<\/strong>)/g, '<aside class="notice"><strong>風險提示：</strong>');
  html = html.replace('<strong>風險提示：</strong><strong>風險提醒：</strong>', '<strong>風險提示：</strong>');
  html = html.replaceAll('<strong>風險提示：</strong> \n', '<strong>風險提示：</strong>\n');
  html = html.replace(/<footer class="footer">[\s\S]*?<\/footer>/, canonicalFooter);

  if (file === path.join(tw, 'index.html')) {
    const marker = '<p class="eyebrow">MARKET EXPLAINED</p><h2>熱點解讀</h2>';
    const markerAt = html.indexOf(marker);
    if (markerAt >= 0) {
      const start = html.lastIndexOf('<section class="section alt">', markerAt);
      const end = html.indexOf('</section>', markerAt) + '</section>'.length;
      html = html.slice(0, start) + hotspot + html.slice(end);
    }
    html = html.replace('未來取得可用素材後，可納入 Binance Launch Station 官方教學資源。', 'Binance 註冊、KYC與安全教學可按文章場景納入 Binance Launch Station 官方教學資源，並在頁面標示來源。');

    const compareMarker = '<h2>平台比較，從需求出發</h2>';
    const platformMarker = '<h2>常見加密貨幣交易平台</h2>';
    const compareAt = html.indexOf(compareMarker);
    const platformAt = html.indexOf(platformMarker);
    if (compareAt >= 0 && platformAt > compareAt) {
      const compareStart = html.lastIndexOf('<section class="section', compareAt);
      const compareEnd = html.indexOf('</section>', compareAt) + '</section>'.length;
      const platformStart = html.lastIndexOf('<section class="section', platformAt);
      const platformEnd = html.indexOf('</section>', platformAt) + '</section>'.length;
      const compareBlock = html.slice(compareStart, compareEnd);
      const between = html.slice(compareEnd, platformStart);
      const platformBlock = html.slice(platformStart, platformEnd);
      html = html.slice(0, compareStart) + platformBlock + between + compareBlock + html.slice(platformEnd);
    }
  }

  html = html.replace('本頁未使用外部操作圖片或影片；沒有把未取得的 Binance Launch Station 素材標示為本站內容。', '本頁目前使用 CoinVoyu Taiwan 既有平台主題封面；後續如加入 Binance Launch Station 操作示意，將依實際步驟標示素材來源。');
  html = html.replace('本頁未取得可核實且可再發布的 Binance Launch Station KYC圖片或影片，因此僅提供文字步驟，不冒充官方素材。', '本頁目前以文字步驟為主；後續如加入 Binance Launch Station KYC 圖片或影片，將標示為官方教學素材，不宣稱為 CoinVoyu 原創。');
  if (html.includes('class="article-body"')) {
    html = html.replaceAll('最後更新：2026年10月01日', '最後更新：2026年10月07日');
    html = html.replaceAll('"dateModified": "2026-10-01T00:00:00+08:00"', '"dateModified": "2026-10-07T00:00:00+08:00"');
  }
  fs.writeFileSync(file, html);
}

const sitemapFile = path.join(tw, 'sitemap.xml');
fs.writeFileSync(sitemapFile, fs.readFileSync(sitemapFile, 'utf8').replace(/<lastmod>[^<]+<\/lastmod>/g, '<lastmod>2026-10-07</lastmod>'));

const llmsFile = path.join(tw, 'llms.txt');
let llms = fs.readFileSync(llmsFile, 'utf8');
if (!llms.includes('/tw/exchanges/binance/register/')) {
  const additions = `- [穩定幣是什麼？USDT、USDC差異與風險](https://www.coinvoyu.com/tw/learn/what-is-stablecoin/): 比較發行、儲備、用途、轉帳網路與脫鉤風險。\n- [加密貨幣交易所安全嗎？](https://www.coinvoyu.com/tw/security/exchange-safety/): 從監管、保管、帳戶控制與提領測試檢查平台風險。\n- [Binance台灣註冊教學](https://www.coinvoyu.com/tw/exchanges/binance/register/): 整理註冊、KYC、安全設定與台灣資金路徑。\n- [Binance邀請碼怎麼填？](https://www.coinvoyu.com/tw/exchanges/binance/referral-code/): 說明TW1866、推薦關係核對與常見問題。\n- [Binance手續費完整指南](https://www.coinvoyu.com/tw/exchanges/binance/fees/): 說明Maker、Taker、提幣費與總成本。\n- [Binance安全嗎？](https://www.coinvoyu.com/tw/exchanges/binance/safety/): 檢查2FA、防釣魚碼、白名單與使用者責任。\n- [Binance KYC認證教學](https://www.coinvoyu.com/tw/exchanges/binance/kyc/): 整理文件準備、驗證步驟與失敗處理。\n- [OKX台灣註冊教學](https://www.coinvoyu.com/tw/exchanges/okx/register/): 整理註冊、KYC、安全與入金路徑。\n- [OKX邀請碼怎麼填？](https://www.coinvoyu.com/tw/exchanges/okx/referral-code/): 說明TW1866專屬入口與綁定核對。\n- [OKX手續費說明](https://www.coinvoyu.com/tw/exchanges/okx/fees/): 整理Maker、Taker、帳戶等級與提幣成本。\n- [Gate台灣註冊教學](https://www.coinvoyu.com/tw/exchanges/gate/register/): 整理Gate註冊、KYC、安全與資金轉入。\n- [Gate邀請碼怎麼填？](https://www.coinvoyu.com/tw/exchanges/gate/referral-code/): 說明VOYUTWFF專屬入口與推薦關係。\n- [Gate手續費完整說明](https://www.coinvoyu.com/tw/exchanges/gate/fees/): 整理現貨費率、VIP條件、提幣費與總成本。\n\n`;
  llms = llms.replace('## Transparency', additions + '## Transparency');
  fs.writeFileSync(llmsFile, llms);
}
