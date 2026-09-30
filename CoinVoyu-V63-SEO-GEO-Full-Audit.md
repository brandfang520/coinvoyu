# CoinVoyu V63 SEO / GEO 全站巡检与修复报告

日期：2026-09-30  
正式域名：`https://www.coinvoyu.com/`  
代码根目录：CoinVoyu 静态站根目录  
页面规模：88 个 HTML 文件，其中 87 个应收录页面，1 个 301 兼容页面（`btc-usdt-difference.html`）

## 结论

CoinVoyu 的基础技术 SEO 并没有被 robots、JS 渲染或 canonical 阻断。收录偏慢更可能与站点仍较新、部分高价值页面缺少内链、平台教程主题簇不完整，以及入口页面链接语义不准确有关。

本轮已把截图中的交易所入口全部改为对应内容，并完成全站内链、导航、主题簇、站点地图、AI 内容索引和商业链接规范修复。最终自动巡检结果为：0 个站内断链、0 个失效锚点、0 个孤儿页、0 个缺失本地资源、0 个重复 title / description / canonical、0 个无效 JSON-LD。

## 一、已修复

### 1. 截图中的 Binance / OKX 链接

- Binance 注册与账户设置 → `binance-registration-guide-2026.html`
- Binance KYC → `binance-registration-guide-2026.html#binance-kyc`
- 第一次购买 BTC → `bitcoin-usdt.html`
- 充值、提现与手续费 → `withdrawal-network.html`
- OKX 注册 → `videos.html#video-account`
- OKX 实名认证 → `videos.html#video-identity`
- OKX 第一次买币 → `videos.html#video-c2c`
- OKX 充值提现 → `videos.html#video-onchain`

证据：`exchange.html:64-102`。

同时将 Binance 下载入口从第三方 APK 改为 Binance 官方下载页面，OKX 保持官方 `okx.com/download`；推广注册链接增加 `rel="nofollow sponsored"`，按钮改为“推荐注册”，避免把推广入口误称为官方入口。证据：`index.html:83-98,171-175`、`exchange.html:64-65,92-93`。

### 2. 修复交易所双栏布局不平衡

原先“内容说明 / 内容责任”被错误嵌在 Binance 卡片内部，导致左卡很长、右卡留白。现已移到 Binance 与 OKX 两张卡片之后，作为两个平台共用的全宽说明。证据：`exchange.html:61-106`。

### 3. 建立交易所主题簇

- 新增 `binance-guide.html`：注册、KYC、安全设置、买币、充值与提现的完整支柱页。
- 新增 `okx-guide.html`：注册、认证、C2C 买币、资金划转、现货与链上充提币的完整支柱页。
- 两篇支柱页均包含可见 FAQ、FAQPage JSON-LD、Article JSON-LD、权威来源、风险说明和继续学习内链。
- 两篇此前没有任何站内入口的 Binance 文章已接入 Binance 支柱页、交易所页、首页和文章中心，不再是孤儿页。

证据：`binance-guide.html:1-63`、`okx-guide.html:1-55`、`articles.html:113-120`。

### 4. 统一全站导航

- 88 个 HTML 页面的导航全部统一为：首页 / 新手入门 / Bitcoin / 交易所 / 钱包安全 / Ethereum / Web3 / 文章 / 视频教程 / 工具 / 关于。
- “视频教程”位于“文章”和“工具”之间。
- 移动端保留“首页”，小屏仅隐藏优先级较低的“工具”。

证据：代表页面 `exchange.html:25-28`；移动端规则 `style.css:443`。自动巡检确认导航变体由 2 种降为 1 种。

### 5. 首页和文章中心更新

- 首页平台入口、交易所教程区全部换成正确页面。
- “最新文章”改为 9 月 30 日新增的 Binance 与安全内容，不再展示旧的 9 月 16 日列表。
- 文章中心加入 Binance / OKX 支柱页和两篇 Binance 教程。
- 移除重复的 `bitcoin-usdt.html` 卡片，并修正一张标题与目标页面不一致的交易所卡片。
- 文章中心显示数量更新为 68，实际卡片数量也是 68，且无重复 URL。

证据：`index.html:164-175,208-219`、`articles.html:100-128,225-230`。

### 6. SEO 与 GEO 文件同步

- `sitemap.xml` 已覆盖全部 87 个应收录 URL；不包含 301 兼容页面。
- 首页、文章中心、交易所页和 2 个新支柱页使用真实的 2026-09-30 修改日期。
- `llms.txt` 加入 Binance、OKX 与视频入口。
- `llms-full.txt` 已覆盖 sitemap 中全部 87 个 URL，并按主题簇分组。
- 6 个超过 40 字的 title 已缩短；全站 title 均不超过 40 字。

证据：`sitemap.xml:1-91`、`llms.txt:5-24`、`llms-full.txt:44-114`。

### 7. 全站自动巡检结果

| 项目 | 结果 |
|---|---:|
| HTML 文件 | 88 |
| 应收录页面 | 87 |
| sitemap 条目 | 87 |
| 有 title | 88 / 88 |
| 有 meta description | 88 / 88 |
| 有 canonical | 88 / 88 |
| 恰好 1 个 H1 | 88 / 88 |
| 站内断链 | 0 |
| 错误锚点 | 0 |
| 孤儿页 | 0 |
| 缺失本地图片/视频 | 0 |
| 重复 title / description / canonical | 0 |
| JSON-LD 解析错误 | 0 |
| Article 结构化数据 | 77 页 |
| FAQPage 结构化数据 | 22 页 |

外部链接共检查 99 个唯一 URL：未发现明确的 404 / 410；88 个直接返回 200，Reuters、WSJ 等 8 个返回访问控制状态，3 个 Binance Academy 链接在自动检查时超时。这些属于来源站的机器人访问限制，不是确认失效链接。

## 二、对照 SEO / GEO 清单

| 检查项 | 状态 | 证据 / 说明 |
|---|---|---|
| 正文写在 HTML 源码 | 通过 | 88 个页面均为静态 HTML，正文不依赖 JS 渲染 |
| 每页主题清晰 | 通过 | 0 个重复 title；交易所内容拆成总入口、Binance、OKX 三层 |
| 独立 title | 通过 | 88 / 88；全部不超过 40 字 |
| meta description | 通过 | 88 / 88 |
| sitemap 自动覆盖 | 通过 | 87 个应收录页 = 87 个 sitemap 条目 |
| robots 无误封 | 通过 | `robots.txt:1-10`；OAI-SearchBot、PerplexityBot 与通用搜索爬虫开放 |
| canonical | 通过 | 88 / 88，统一 `https://www.coinvoyu.com` |
| GSC 提交条件 | 通过 / 需复查后台 | 网站、robots 与 sitemap 均可提交；代码中没有 HTML 验证文件，可能使用 DNS 验证 |
| Bing / IndexNow | 部分通过 | Bing 可提交 sitemap；IndexNow 仍需站点密钥和发版脚本 |
| 当前基线 | 已记录 | 见第三部分 |
| 自包含结论段落 | 通过（重点页） | 两个新支柱页的步骤、检查表与 FAQ 均可独立理解 |
| FAQPage / Article | 通过 | JSON-LD 与可见内容一致；无解析错误 |
| llms.txt / llms-full.txt | 通过 | 核心入口 + 全量 87 URL |
| AI 搜索爬虫 | 通过 | OAI-SearchBot、PerplexityBot 明确 Allow |
| 训练爬虫策略 | 保持现状 | 未在未获授权的情况下修改 GPTBot / CCBot 策略 |

## 三、从 CoinVado 学到并采用的优点

CoinVado 的优势不是单纯文章多，而是：首页有清晰学习路径和注册入口；Binance / OKX 各自拥有按“注册、入金、交易、提现”分组的支柱页；文章中心持续显示日期与具体摘要；每篇内容继续连向学习路径和平台专题。

CoinVoyu 本轮已采用这些结构优点：

1. 用 Binance / OKX 独立支柱页承接平台关键词。
2. 把教程按用户任务组织，而不是按零散文件组织。
3. 首页、交易所页、文章中心和视频中心互相连接。
4. 在不牺牲安全与用户体验的前提下保留推荐注册入口。
5. 没有照搬 CoinVado 的弹窗、社区联系方式、未经本站核实的统计数字或内容。

## 四、待手动完成（按优先级）

### P0：部署本次增量包

把 ZIP 内文件按原目录上传并覆盖。不要删除站内其他文件。

### P0：Google Search Console

入口：`https://search.google.com/search-console`

1. 在“站点地图”重新提交 `https://www.coinvoyu.com/sitemap.xml`。
2. 用“网址检查”优先检查并申请编入索引：
   - `https://www.coinvoyu.com/`
   - `https://www.coinvoyu.com/exchange.html`
   - `https://www.coinvoyu.com/binance-guide.html`
   - `https://www.coinvoyu.com/okx-guide.html`
   - `https://www.coinvoyu.com/binance-registration-guide-2026.html`
   - `https://www.coinvoyu.com/binance-missed-referral-code.html`
   - `https://www.coinvoyu.com/articles.html`
3. 7–14 天后查看“网页索引编制”，区分“已发现—尚未编入索引”和“已抓取—尚未编入索引”。

### P1：Bing Webmaster 与 IndexNow

入口：`https://www.bing.com/webmasters/`

1. 导入或验证网站并提交同一个 sitemap。
2. 创建 IndexNow 密钥后，将密钥文件放到站点根目录。
3. 再把发布脚本接入 IndexNow；没有真实密钥前不应伪造推送。

### P2：决定训练型爬虫策略

当前 `User-agent: *` 会保持通用开放。本轮只明确开放搜索型 OAI-SearchBot 与 PerplexityBot，没有单独修改 GPTBot / CCBot。后续请决定是否允许训练型爬虫，再单独调整。

## 五、当前基线数字

- 公开 `site:coinvoyu.com` 查询抽样可直接看到至少 10 个 CoinVoyu URL；该数字不是 Search Console 的完整收录总数。
- sitemap：87 条。
- HTML：88 个；应收录 87 个；301 兼容页 1 个。
- title：100%。
- meta description：100%。
- canonical：100%。
- H1：100%。
- 公开搜索已能检出首页、交易所、视频、Bitcoin、钱包、区块链、K 线、DeFi、新手中心和实操中心等页面。

## 六、部署后预期

本轮修复会让搜索引擎更容易从首页和交易所页发现高价值平台教程，并更清楚地理解 Binance / OKX 主题关系；它能提高抓取效率和主题信号，但不会让 Google 立即收录全部 87 页。新站收录速度还会受站点历史、外部提及、搜索需求、内容稳定性和 Google 抓取调度影响。
