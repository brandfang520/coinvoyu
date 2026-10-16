# CoinVoyu Commercial Search Growth Roadmap V1

项目：CoinVoyu Main（`brandfang520/coinvoyu`）
正式网站：<https://www.coinvoyu.com/>
首次整理：2026-10-12
最近更新：2026-10-16
文件性质：长期项目总控文件；所有新增记录按日期追加，不覆盖历史基线。

---

# 一、长期目标与工作原则

CoinVoyu 的长期目标不是制造大量低价值页面，而是建立可持续的商业搜索增长体系：

搜索需求 → 合适的内容或 Hub → 平台操作路径 → 合理的商业入口 → 数据反馈 → 下一轮优化。

长期执行原则：

1. 以真实 GSC 数据、搜索意图和现有页面表现决定施工范围。
2. 先判断已有页面能否承接，再决定是否新增页面。
3. 同时维护 Topic Cluster、Conversion Cluster、用户体验和 E-E-A-T。
4. 不因出现“注册、下载、邀请码”等关键词就机械拆页。
5. 防止 Keyword Cannibalization，不让多个页面争夺同一核心意图。
6. 热点内容兼顾即时需求和 Evergreen 沉淀，不为日更而日更。
7. 官方视频与教育素材只在能明显提升页面价值时使用。
8. CoinVoyu Main、CoinVoyu Taiwan 与 Equitova 保持项目、数据和推广体系隔离。
9. 动态事实、平台规则和搜索数据必须标明日期；没有数据时写 `NOT AVAILABLE`。

---

# 二、历史基线（保留）

## V70+：品牌、导航、内容结构与商业集群基线

状态：**COMPLETE**

V70+ 阶段形成并保留的长期基础包括：

- CoinVoyu 蓝紫渐变品牌 Logo、图标及 favicon 体系。
- 主站一级导航聚焦首页、新手入门、交易所、钱包安全、Ethereum / Web3、文章、视频教程、工具和关于；Bitcoin Hub 与文章保留，但不长期占据一级导航。
- `exchange.html` 交易所 Hub 的统一内容宽度、比较模块和权威资料区域完成视觉修正。
- Binance / OKX Conversion Cluster 已按注册、KYC、买币、充值、交易、提现、邀请码及问题排查形成内容基础。
- 主站 Topic Cluster、新手教育路径、来源与风险说明、自然内链和推荐入口继续作为后续版本的保护基线。
- Binance 推荐码 `DS1886`、OKX 推荐码 `DS1888` 及台湾站独立推广体系不得互相覆盖。

历史记录说明：V70 相关正式 QA 文档为 `CoinVoyu-V70-QA-Report-2026-10-06.md`。原始总控记录中的完整版本提交信息当前为 **NOT AVAILABLE**，不补猜。

## V72：热点解读体系基线

状态：**COMPLETE**

已确认记录：

- PR：`#5`，已合并。
- Production：已上线。
- V73 启动前稳定 `main` 基线：`ef532d920420a6589a0df839908c7fce4307abf4`。
- 热点内容继续使用“新闻事实 + 常青解释 + 来源与日期 + 风险边界”的深度解读标准。
- 首页热点模块保持在原位置；热点中心、文章中心、文章详情和 sitemap 采用定点更新，不重建首页。
- 热点主题应优先沉淀为长期解释框架，例如宏观市场与 Bitcoin、ETF 产品结构、股票代币化权利结构等。

## V73：Header & Mobile UX 基线

状态：**COMPLETE**

- 正式 GitHub Commit：`d89fca5a8c16ac815d11d59390c966e3c1ee3271`
- Branch：`feature/v73-header-mobile-ux`
- Production：已上线。
- 修改范围：120 个主站 HTML 页面、`style.css`、`site-nav.js`。
- `/tw/`：无修改。
- 完成内容：Header 统一、Mobile Navigation、Active Navigation、`aria-current="page"`、桌面端与移动端响应式验证。
- Active 逻辑由 `site-nav.js` 判断当前页面并添加状态，HTML 原始导航继续保留。
- 桌面端导航、390px 移动端汉堡菜单、Sticky Header 和主要入口已完成验证。

观察说明：V73 刚上线，短期 GSC 数据不能用于判断 V73 的 SEO 成效。V73 影响保持 **MONITORING**。

---

# 三、既定商业搜索路线

## V74 — Commercial Search Foundation

状态：**PLANNED — NOT STARTED**

重点方向：Binance / OKX / Gate 商业搜索基础入口，尤其关注注册、下载、安装、邀请码、买币、充值、提现，以及第一批 Binance 官方教学素材。

V74 最终页面范围暂不锁死，必须共同参考：

1. GSC 真实商业搜索数据。
2. 现有页面表现。
3. 商业搜索意图。
4. 现有页面是否已经可以承接。
5. Keyword Cannibalization 风险。
6. Binance 官方视频素材。

不要因为关键词列表中出现“注册 / 下载 / 邀请码”就机械创建新页面。必须先判断已有页面能否通过定位、内容结构、Title / Meta 或内链优化承接。

## V75 — Commercial Decision Layer

状态：**PLANNED**

重点：

- Binance vs OKX。
- Binance vs Gate。
- 平台安全。
- 交易所选择。

## V76 — Beginner Conversion Funnel

状态：**PLANNED**

重点：

- 买 BTC。
- 买 USDT。
- 充值。
- 交易。
- 提现。
- 钱包。
- 安全。

目标是把新手教育与完整实际操作路径连接起来，而不是让用户停留在孤立文章。

---

# Current Baseline / Latest Audit — 2026-10-16

## 1. 当前代码与数据基线

- 审计时 GitHub `main`：`27d4a27e4053c438facab69c3be4557927dfca19`
- GSC Property：`sc-domain:coinvoyu.com`
- 台湾站 URL-prefix Property：`https://www.coinvoyu.com/tw/`
- 最新完整 GSC 数据截至：2026-10-13
- GSC API：可读取真实数据。
- SEO AI PostgreSQL 已保存指标：**NOT AVAILABLE**。本轮审计为只读，没有执行写入数据库的同步操作。

| 数据范围 | 日期 | Clicks | Impressions | CTR | Average Position |
|---|---:|---:|---:|---:|---:|
| Domain API，包含主站及 `/tw/` | 2026-09-16～2026-10-13 | 4 | 239 | 1.67% | 29.05 |
| 台湾 URL-prefix | 2026-09-16～2026-10-13 | 0 | 62 | 0% | 55.66 |
| GSC 页面过滤“URL 不含 `/tw/`” | 2026-09-16～2026-10-13 | 4 | 343 | 1.2% | 13.4 |

GSC 页面过滤结果与 Domain API 使用不同的聚合和匿名化方式，不能直接相减，也不能把 343 当成严格可复现的 Main API 总量。

- 可复现站点级基线：4 点击、239 展示。
- Main 页面机会分析：使用已排除 `/tw/` 的 Query / Page 明细。
- 严格可比的 Main-only 聚合基线：**NOT AVAILABLE**。
- 当前 GSC 数据量仍然较小，以下商业 Query 统一定义为 **EARLY COMMERCIAL SEARCH SIGNALS（早期商业搜索信号）**，不能当作成熟流量。

## 2. 已确认的早期商业搜索信号

| Query / Topic | 已出现的信号 | 当前承接或关联页面 | 当前判断 |
|---|---:|---|---|
| `OKX referral code` | Position 2.0，1 impression | `okx-referral-code.html` | 高意图，但样本极小；优先保护和观察 |
| `referral code 怎么填` | Position 6.0，1 impression | 邀请码相关页面 | 真实操作型意图；可加强现有页面承接 |
| `币安邀请码没输入` | Position 17.7，3 impressions | `binance-missed-referral-code.html` | 已有精准页面，优先优化现有页面 |
| `欧易邀请码` | Position 50.5，2 impressions，1 click | `okx-referral-code.html` | 已产生点击，属于当前最高价值商业机会之一 |
| `欧易注册下载` | Position 43.3，3 impressions | `okx-guide.html` | 先判断 Guide 是否足以承接，不机械新建页面 |
| `欧易使用教程` | Position 29.0，1 impression，1 click | `okx-guide.html` | Guide 已有真实承接信号 |
| `OKX 取引招待` | Position 23.5，2 impressions | `okx-referral-code.html` | 多语言长尾信号；暂不单独建页 |
| `币安身份认证失败` | Position 12.0，1 impression | `binance-kyc-failed.html` | 问题型商业长尾，优化现有页面 |
| `币安重置 KYC` | Position 18.0，1 impression | `binance-kyc-failed.html` | 与现有页面相关，避免重复页面 |
| `how to buy bitcoin on OKX` | Position 54.5，2 impressions | OKX 买币 / Guide 页面 | 信号太小，先监测 |
| `币安和欧易哪个好` | Position 68.0，1 impression | `binance-vs-okx.html` | 符合 V75 决策层方向，暂不因单次曝光大改 |
| `欧易` | Position 56.0，1 impression | OKX Hub / Guide | 泛品牌词样本不足 |

## 3. 当前已产生商业曝光的页面

| 页面 | Clicks | Impressions | Average Position | 当前动作方向 |
|---|---:|---:|---:|---|
| `okx-referral-code.html` | 1 | 11 | 16.8 | 优先优化现有页面，保护商业意图与推荐路径 |
| `exchange.html` | 1 | 5 | 9.4 | 已接近首页位置，保持 Hub 定位并加强自然内链 |
| `binance-referral-code.html` | 0 | 7 | 20.4 | 优化现有页面，不急于再建邀请码页 |
| `binance-missed-referral-code.html` | 0 | 5 | 34.0 | Query 级最高位置约 17.7，继续覆盖“没输入 / 补填”意图 |
| `okx-guide.html` | 0 | 4 | 31.0 | 已承接注册下载和使用教程信号，先优化再决定拆页 |
| `binance-kyc-failed.html` | 0 | 2 | 15.0 | 商业问题型长尾，内容与内链优化优先 |

## 4. 商业搜索审计结论

1. OKX 邀请码相关页面已出现最明确的商业点击与曝光，应优先优化现有页面。
2. “referral code 怎么填”“币安邀请码没输入”等 Query 证明问题型、操作型页面已经被 Google 测试。
3. Binance / OKX referral 相关 Query 是真实信号，但数据量不足，不能扩大解释为成熟获客渠道。
4. `exchange.html` 已接近首页位置，适合作为交易所商业集群的 Hub 继续传递主题关系。
5. Gate 当前没有足够 GSC 数据支持批量新增页面，保持 **MONITORING**。
6. V74 应先优化 `okx-referral-code.html`、`binance-referral-code.html`、`binance-missed-referral-code.html`、`okx-guide.html`、`binance-kyc-failed.html` 与相关 Hub 的承接和内链。
7. 注册、下载、安装、邀请码是否拆成独立 URL，必须逐平台判断搜索意图、现有页面重叠和 Cannibalization 风险。

---

# Binance Launch Station Video Asset Audit — 2026-10-16

指定素材源：<https://sly-hollyhock-403.notion.site/Binance-Launch-Station-2a3fa36c4bce80eaa32cf66bb88ded61>

状态：**AUDITED / V74 CANDIDATES PLANNED / NOT ADDED TO WEBSITE**

## 1. 素材池规模与口径

Binance Launch Station 是一个规模较大的 Binance 教学素材池，当前至少可见约 **132 个具名视频 / 课程记录**。

重要口径：132 不等于 132 个完全独立视频。素材池存在分类重复、同主题不同版本，以及课程页引用其他视频。因此后续整理必须先去重并重新核对来源，不得写成“132 个独立视频”。

## 2. Binance 商业路径覆盖

启航台已覆盖以下主要操作路径：

下载 → 注册 → KYC → C2C 买币 → 充值 → 网络选择 → 现货 → 提现 → 账户安全。

核心结论：CoinVoyu 当前缺少的不是泛加密视频，而是 **Binance 平台操作型视频**。

## 3. CoinVoyu 当前视频基础与缺口

CoinVoyu 当前已有 **32 个自托管实操视频**，已覆盖大量 OKX、通用交易、钱包、现货、合约、机器人和安全主题。因此后续不要重复建设通用视频。

当前主要 Binance 视频缺口：

1. Binance App 下载。
2. Binance 注册。
3. Binance KYC。
4. Binance C2C 买 USDT。
5. Binance 充值。
6. Binance 网络选择。
7. Binance 现货。
8. Binance 提现。
9. Binance 安全设置。
10. Binance 充值未到账 / 官方求助。

## 4. V74 第一批候选视频

状态：**PLANNED**。以下素材尚未加入网站。

1. 苹果—币安 APP 下载指南。
2. 如何注册币安账户。
3. 如何完成币安身份验证。
4. 如何通过币安 C2C 自选区买卖加密货币。
5. 一个视频搞懂区块链网络。
6. 如何正确选择网络，避免转账错误。
7. 如何在币安 APP 交易现货。
8. 如何在币安进行加密货币提现。

优先映射方向：Binance 下载 / 注册 / KYC / 买 USDT / 充值 / 现货 / 提现页面及视频中心；实际加入前重新核对页面是否已能承接，以及官方来源页是否仍可访问。

## 5. 视频技术与版权限制

Binance Launch Station 中多数视频媒体使用 Notion 临时签名地址，这些地址存在过期风险。

**DO NOT：**

- 复制临时 MP4 URL。
- 把临时 MP4 地址作为长期视频 URL。
- 下载 Binance 官方视频后重新托管。
- 在未验证稳定性和嵌入条件时强行使用 iframe。

当前推荐方案：使用 **官方来源页链接卡片**。

CoinVoyu 页面 → Binance Launch Station 官方视频介绍 / 卡片 → 用户打开官方来源页观看。

只有以后确认存在稳定官方播放器、长期可访问并且明确允许嵌入时，才考虑 iframe。

## 6. 邀请码视频缺口

Binance Launch Station 当前没有确认存在“新用户如何填写 Binance 邀请码”的独立视频。

不能把 Binance 注册视频冒充成 Binance 邀请码填写视频。

因此 `binance-referral-code.html` 当前继续使用：

- 文字说明。
- 页面截图 / 步骤。
- FAQ。
- 商业 CTA。

视频暂不强行添加。

---

# 四、下一步版本边界

## V74

- 依据早期商业搜索信号优化 Binance / OKX 现有承接页。
- 对 Gate 维持监测，除非出现足够数据或明确内容缺口。
- 逐项判断注册、下载、安装、邀请码是否需要独立页面。
- 第一批 Binance 官方教学素材优先采用官方来源页链接卡片。
- 不改动稳定 URL，不批量制造页面，不破坏现有 Conversion Cluster。

## V75

- 建立或优化商业决策层：Binance vs OKX、Binance vs Gate、平台安全与交易所选择。
- 由真实搜索数据决定页面优先级，不把比较页写成单纯推广页。

## V76

- 串联买 BTC、买 USDT、充值、交易、提现、钱包与安全。
- 将新手学习入口、平台操作教程和长期资产安全形成连续路径。

---

# Roadmap Maintenance Rule

以后每一次 CoinVoyu 版本、专项施工、数据审计或重大 SEO 决策完成后，必须同步更新 `CoinVoyu_Commercial_Search_Growth_Roadmap_V1.md`。

每次必须记录：

- 日期。
- 版本。
- Commit SHA。
- Branch。
- Production 状态。
- Preview 状态。
- 修改范围。
- QA 结果。
- GSC 最新数据（如果本次读取）。
- 新发现的商业搜索机会。
- 新增 / 优化页面。
- 视频 / 内容素材变化。
- 新发现的问题。
- 未完成事项。
- 下一步。
- 下一版本目标。

维护规则：

1. 不覆盖历史基线。
2. 不删除已经完成的历史记录。
3. 新版本使用新的日期和章节。
4. 已完成项目必须从待办状态更新。
5. 未完成项目不能写成完成。
6. 观察中的项目必须标记为 `MONITORING`。
7. 没有数据时必须写 `NOT AVAILABLE`。
8. 禁止猜测数据。
9. 每次 Work 结束必须执行 Roadmap Update。
10. 最终报告必须明确写出：`ROADMAP UPDATE: PASS`。

---

# 五、当前状态总表

| 项目 | 状态 | 备注 |
|---|---|---|
| V70+ 品牌、导航、Topic / Conversion Cluster 基线 | COMPLETE | 持续保护，不在后续小版本中无关重构 |
| V72 热点解读体系 | COMPLETE | Production 已上线，继续筛选可 Evergreen 化主题 |
| V73 Header & Mobile UX | COMPLETE | Production 已上线；SEO 影响 MONITORING |
| 2026-10-16 GSC / Commercial Search Audit | COMPLETE | 发现 EARLY COMMERCIAL SEARCH SIGNALS；数据量仍小 |
| Binance Launch Station Video Asset Audit | COMPLETE | 约 132 个具名记录；第一批 8 项为 PLANNED |
| V74 Commercial Search Foundation | PLANNED — NOT STARTED | 页面范围未锁死，以真实数据和现有承接能力决定 |
| V75 Commercial Decision Layer | PLANNED | 等 V74 基础入口与数据反馈 |
| V76 Beginner Conversion Funnel | PLANNED | 串联完整新手操作路径 |

当前下一步：在不扩大范围的前提下，根据 GSC 早期商业信号确定 V74 的最小施工清单和验收指标；V74 施工开始前重新核对最新 `main`、Production、GSC 窗口及官方视频来源页状态。

---

## 2026-10-16 — Hot Topics Content Update

**Status:** COMPLETE — PRODUCTION DEPLOYED

### Articles

1. 比特币短暂跌破8万美元、ETH清算更重：杠杆为何会放大跌势？
   - URL: `https://www.coinvoyu.com/crypto-liquidations-leverage-october-2026.html`
   - Topic: 市场结构、杠杆与强制清算
   - Sources: CoinDesk（2026-10-15）、Binance Futures Liquidation Protocols
2. Strategy会被MSCI指数剔除吗？比特币财库公司与被动资金风险
   - URL: `https://www.coinvoyu.com/strategy-msci-index-risk-october-2026.html`
   - Topic: MSCI非经营性公司规则、比特币财库公司与被动资金
   - Sources: MSCI（2026-10-15）、Reuters（2026-10-16）
3. 德意志银行准备上线加密托管：银行托管BTC和ETH意味着什么？
   - URL: `https://www.coinvoyu.com/deutsche-bank-crypto-custody-october-2026.html`
   - Topic: 机构级数字资产托管、私钥管理与监管边界
   - Sources: Deutsche Bank（2026-09-16）、Reuters（2026-10-16）

### Delivery

- Branch: `feature/hot-topics-20261016`
- Content Commit SHA: `c31db02d8c9d539c11707d8ba7ce842cfe855a65`
- Homepage Hotspots Fix Commit SHA: `c50ac0ee3942ae883fa1774dc9d96c8fccf3fbb6`
- Candidate Commit SHA: `92677c3f640bf9f0eedbb891a3452a44df73e5ce`
- Production Merge Commit SHA: `28625589b760e3faf4781fd1748afc7876649d34`
- Pull Request: `#13` — merged
- Production deployed: `2026-10-16 22:59 CST`（Vercel deployment status: success）
- Preview: `https://coinvoyu-git-feature-hot-topics-20261016-brandfang520.vercel.app/`
- Production: `https://www.coinvoyu.com/`
- Homepage hotspots: PASS — 在原有「热点解读」模块内部更新为本轮 3 篇文章；模块位置未改变，后续相邻模块仍为「最新文章」，首页其他结构未修改。
- Cover images: PASS — 3 original 1200 × 675 WebP assets; all three load at native dimensions in Preview.
- Sitemap: PASS — XML parses; 3 new canonical URLs are present once each; no duplicate URL.
- Desktop QA: PASS — Preview rendered at 1363 × 936; hotspots, articles and all three new pages have no horizontal overflow, broken new images or missing H1/Footer.
- Mobile Manual QA: PASS — 站长已完成移动端人工验收并明确授权 Production 发布。
- Scope isolation: PASS — only 3 articles, 3 covers, homepage existing hotspots module, hotspots/articles indexes, Sitemap and this Roadmap differ from the baseline.
- GSC data read in this task: NOT AVAILABLE — 本轮未读取新的GSC数据，沿用此前审计基线。
- Pre-existing issue recorded, not modified: `hotspots.html` currently references 12 older cover files that return broken images in Preview. None belongs to the three new articles, and the issue was not expanded into this task.

### Release State

- PRODUCTION: DEPLOYED
- USER ACCEPTANCE: PASS
- Merge / Production deploy: COMPLETE
- Production verification: PASS — 首页热点入口、热点中心、3 篇文章、3 张封面与 Sitemap 均已在线核对。

### Next Step

本轮 Hot Topics 已完成发布；保持范围冻结，后续按既定 V74 商业搜索基础规划推进。
