# CoinVoyu Taiwan V4 RC 正式部署安全方案

日期：2026-10-08  
施工範圍：CoinVoyu Taiwan `/tw/`  
狀態：待站長批准；本文件不授權正式部署。

## 隔離原則

- 台灣站來源與構建只讀取 `tw/`，輸出必須只有 `tw/`、Preview 專用根 `robots.txt`、根入口提示及 `_redirects`。
- 不從台灣站流程覆蓋主站根目錄的 `index.html`、`robots.txt`、`sitemap.xml`、媒體或 Vercel 設定。
- 正式整合以已核准的 RC Commit 建立不可變構建產物；先在隔離環境驗證，再由主站擁有人把 `/tw/*` 路由接入正式網域。
- 任何共用根資源都由主站部署流程合併，不由台灣站 Preview 流程寫入。

## 建議正式路由邊界

1. 主站持續擁有 `/` 及既有所有非 `/tw/` URL。
2. 台灣站靜態產物只掛載到 `/tw/` 前綴，媒體維持 `/tw/assets/*`。
3. 正式環境不要部署 Preview 根入口檔案，也不要部署 Preview 的 `Disallow: /`。
4. 對 `/tw/*` 設定獨立快取規則；HTML 可短快取並支援重新驗證，帶內容雜湊或已版本化的媒體可長快取。

## 必要永久轉址

| 舊 URL | 最終 URL | 正式狀態 |
|---|---|---|
| `/tw/buy-crypto/` | `/tw/buy/` | 301 |
| `/tw/compare/` | `/tw/exchanges/comparison/` | 301 |
| `/tw/videos/binance-buy/` | `/tw/exchanges/binance/spot-trading.html` | 301 |
| `/tw/videos/binance-withdraw/` | `/tw/exchanges/binance/withdraw.html` | 301 |
| `/tw/videos/gate-buy/` | `/tw/exchanges/gate/spot-trading.html` | 301 |
| `/tw/videos/gate-register/` | `/tw/exchanges/gate/register.html` | 301 |
| `/tw/videos/seed-phrase-security/` | `/tw/security/seed-phrase-security.html` | 301 |
| `/tw/videos/buy-bitcoin/` | `/tw/videos/spot/` | 301 |
| `/tw/videos/buy-usdt/` | `/tw/buy/how-to-buy-usdt-taiwan.html` | 301 |
| `/tw/videos/usdt/` | `/tw/learn/usdt/what-is-usdt.html` | 301 |
| `/tw/videos/bitcoin/` | `/tw/learn/bitcoin/what-is-bitcoin.html` | 301 |
| `/tw/videos/binance-register/` | `/tw/exchanges/binance/register.html` | 301 |
| `/tw/videos/binance-kyc/` | `/tw/exchanges/binance/kyc.html` | 301 |

只轉址上述精確路徑，不使用會吞掉既有 `/tw/buy-crypto/*` 或 `/tw/compare/*` 正式文章的萬用規則。

## robots 與 Sitemap

- Preview：維持根 `robots.txt` 的 `Disallow: /`。
- Production：根 `robots.txt` 與主站共用，必須由主站擁有人合併 `Allow: /tw/` 與 `Sitemap: https://www.coinvoyu.com/tw/sitemap.xml`；禁止以台灣站檔案整份覆蓋。
- 台灣站 Sitemap 固定發布於 `/tw/sitemap.xml`，只收錄可索引且 self-canonical 的正式頁面，不收錄相容轉址頁。
- 主站可選擇在根 robots 同時列出主站及台灣站 Sitemap，或建立 Sitemap index；兩種方式都必須先以正式構建產物驗證。

## 上線前演練

1. 以核准 Commit 建立全新隔離產物，執行 RC 自動 QA。
2. 在不連到正式網域的 staging 驗證 `/tw/`、主要 Hub、文章、影片與 301。
3. 用 375、390、430、768、中等桌面與寬桌面真實瀏覽器視口完成互動驗收。
4. 驗證主站 `/`、主要既有 URL、根 robots 與主站 Sitemap 完全未改。
5. 驗證 `/tw/robots.txt` 不被錯誤視為根 robots；正式抓取規則只以域名根 robots 為準。
6. 驗證影片 Range Request、Content-Type、快取與行動裝置播放。
7. 抽查三個台灣專屬推薦連結，不改參數。

## 發布與回滾

- 發布前保存主站現行部署版本、台灣站 RC Commit、構建雜湊與路由設定快照。
- 採原子發布或可立即切回前一版本的路由切換；不要在正式目錄手動覆寫零散檔案。
- 發布後立即檢查主站首頁、`/tw/`、Sitemap、robots、兩個舊 Hub 301、三個平台 CTA 及至少一支影片。
- 如主站 URL、根 robots、Sitemap 或 `/tw/` 邊界出現異常，立即回滾路由／部署版本，不在正式站現場修補。

## 仍需站長批准與正式環境權限的事項

- 主站路由中掛載 `/tw/*`。
- 合併根 `robots.txt`。
- 把台灣站 Sitemap 加入正式搜尋發現流程。
- 套用正式伺服器端 301。
- 執行正式發布與回滾演練。

