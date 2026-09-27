# CoinVoyu V61｜抓取与核心入口强化

更新日期：2026-09-28

## 本轮目标
在不重构 V60 技术 SEO 的前提下，加强 Google 与用户都能直接访问的重要入口。

## 已完成
- 全站 72 个 HTML 主导航增加“视频教程”入口，首页入口保留。
- `videos.html` 主导航增加当前页 active 状态。
- 桌面导航间距由 28px 调整为 22px；移动端继续使用现有自动换行布局。
- `articles.html` 专题入口增加“视频教程”。
- `exchange.html` 的 Binance / OKX 比较区直接链接 `binance-vs-okx.html`，替代泛化的“查看更多文章”。
- `beginner.html` 首屏增加“看视频教程”入口，并在交易所学习步骤强化 Binance / OKX 对比语义。
- 未修改 robots.txt、sitemap.xml、canonical 与既有 Bitcoin / Wallet 内链体系。

## 部署后建议
1. Vercel Production 变绿后检查首页、文章中心、交易所、新手页、视频教程页。
2. GSC 暂不批量请求 41 个 URL；优先观察已请求的 `bitcoin-guide.html`。
3. 待部署稳定后，可分别检查 `videos.html` 与 `binance-vs-okx.html` 的 URL Inspection 状态，再决定是否请求索引。
