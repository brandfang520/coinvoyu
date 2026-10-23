# CoinVoyu Commercial Search Growth Roadmap V1

项目：CoinVoyu Main（`brandfang520/coinvoyu`）
正式网站：<https://www.coinvoyu.com/>
首次整理：2026-10-12
最近更新：2026-10-23
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

重点方向：Binance / OKX / Gate 商业搜索基础入口，尤其关注注册、下载、安装、邀请码、买币、充值、提现，以及官方教学素材。视频教程中心的扩充范围限定为 Binance 与 OKX；Gate 仍可按真实数据参与商业搜索分析，但不增加 Gate 视频教程。

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
- 第一批 Binance 官方教学素材优先采用官方来源页链接卡片，并审计 OKX 官方教学视频的可用性。
- 视频中心按 Binance / OKX 两个一级平台分类，再按用户任务与商业搜索意图设置二级分类。
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

当前下一步：在不扩大范围的前提下，根据 GSC 早期商业信号确定 V74 的最小施工清单和验收指标；将视频教程中心的 Binance / OKX 分类架构与商业搜索优先级纳入 V75 + V74 合并批次。施工开始前重新核对最新 `main`、Production、GSC 窗口及官方视频来源页状态。

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


---

## 2026-10-17 — Video Tutorial Center Commercial Search Expansion Decision

**Status:** PLANNED — TO BE AUDITED AND IMPLEMENTED WITH THE 2026-10-20 V75 + V74 WORK BATCH

### 1. Scope decision

CoinVoyu 视频教程中心后续只规划两个一级平台分类：

- **币安教程（Binance Tutorials）**
- **欧易教程（OKX Tutorials）**

**明确排除：不增加 Gate 视频教程。** 当前 CoinVoyu 没有 Gate 注册入口，因此 Gate 不属于本视频中心的教程与注册转化路径。该决定仅限定视频教程中心，不自动取消 V75 其他位置对 Binance vs Gate 等交易所比较主题的评估。

### 2. Proposed information architecture

每个平台依据实际可用素材与搜索需求，考虑以下二级分类；分类不应在没有合格内容时显示空栏目：

1. 下载、注册与身份认证（KYC）
2. 入金、购买 USDT 与充值
3. 现货交易与订单操作
4. 提现、转账与资金管理
5. 账户安全与常见问题排查
6. 进阶功能与交易工具（例如合约、理财、跟单；仅在确有合适素材和搜索需求时启用）

Binance 与 OKX 使用相近的分类框架，但内容必须对应各平台真实界面、功能与规则；不为追求对称而强行补齐视频数量。

### 3. Commercial-search selection priority

素材选择优先满足明确的操作型、商业型搜索意图：

- 平台下载、注册与 KYC
- 买 USDT、C2C / P2P、入金与充值网络选择
- 现货下单与订单管理
- 提现、转账及资金安全
- 账户保护与高频操作问题排查
- 进阶功能作为后续补充，而非第一批硬性目标

这是一份选题优先级，不代表相关视频已找到、已授权嵌入或已上线。正式选材前必须先盘点 CoinVoyu 当前视频，避免重复建设，并结合 GSC 真实数据、现有承接页和关键词重叠风险决定优先级。

### 4. Official source and playback constraints

- Binance Launch Station 继续作为 Binance 候选素材来源之一；同时审计 OKX 官方教学资源。
- 对每个候选项记录主题、语言、官方来源 URL、页面可访问性、播放器稳定性、嵌入许可及对应 CoinVoyu 承接页面。
- 不将 Notion 临时签名 MP4 URL 当作长期视频地址；不下载官方视频后重新托管；未确认稳定性和许可前不强行嵌入 iframe。
- 如果无法确认稳定、合规的嵌入方式，优先采用链接至官方来源页的卡片，并在 CoinVoyu 页面提供原创中文操作说明和相关内链。
- 不虚构素材、不设置假视频或空占位入口；无合适素材时，先保留图文教程。

### 5. SEO and conversion path

目标路径：

`Google Search → 对应平台/操作教程 → 视频或官方来源 → 相关图文指南 / FAQ → 对应 Binance 或 OKX 注册入口（仅在相关且合适时展示）`

每个视频条目应有独立、准确的中文标题和原创说明；分类页与教程页需要有清晰的标题、描述、内部链接和移动端体验。避免将视频中心做成单纯推广页，也不因分类调整而批量创建重复 URL。上线后的效果根据 GSC 展示、点击、查询词和页面表现继续观察，不预设排名或流量结果。

### 6. Required work on 2026-10-20

纳入既定合并批次：`V75 + V74 Commercial Search Architecture & Capture`，执行顺序仍为 `V75 → V74`。开始施工前重新检查最新仓库状态、Production、页面与视频中心现状。

必须完成：

1. 审计当前视频中心、已有视频、分类结构、播放方式和相关 URL。
2. 核实 Binance Launch Station 候选素材，并审计 OKX 官方教学素材。
3. 按商业搜索意图确定第一批候选；不强制新增固定数量。
4. 设计并实施 Binance / OKX 两个一级分类及适用的二级分类；仅展示有合格内容的分类。
5. 检查相关页面、内链、平台注册入口、桌面端和移动端体验、稳定播放与版权边界。
6. 执行回归 QA，确认不破坏现有视频、导航、稳定 URL、Conversion Cluster、台湾站 `/tw/` 或其他不在本次范围的页面。
7. 更新本 Roadmap，准确记录完成项、未完成项、QA 和最终发布状态；未完成事项不得写为完成。

### 7. Status

- Video tutorial platform scope: **BINANCE + OKX ONLY**
- Gate video tutorials: **OUT OF SCOPE — DO NOT ADD**
- Commercial-search-first video audit: **PLANNED**
- Binance official source review: **AUDITED PREVIOUSLY; REVALIDATE BEFORE IMPLEMENTATION**
- OKX official source review: **PENDING**
- Video center taxonomy redesign: **PLANNED — NOT IMPLEMENTED**
- Website/Production changes from this decision: **NONE**

---

## Roadmap Update — 2026-10-17

本次仅更新规划文档，未修改网站代码、未部署 Production、未读取新的 GSC 数据。现有代码与 GSC 基线仍以本文件此前记录为准，开始 V75 + V74 前必须重新核验。

**ROADMAP UPDATE: PASS**

---

## Current Handoff Snapshot — 2026-10-17

> This is a planning handoff snapshot, not a substitute for live repository verification. Re-check the remote repository and Production state before starting work on 2026-10-20.

### Current Branch
**NOT REVALIDATED** — verify the current remote branch and working tree before implementation. The latest documented release in this roadmap is the Hot Topics Production release.

### Latest Commit
**NOT REVALIDATED AGAINST CURRENT REMOTE `main`.**

Latest documented Production merge commit in the Hot Topics release record:
`28625589b760e3faf4781fd1748afc7876649d34`

Do not assume this is still the latest `main` commit; verify before creating or updating any work branch.

### Completed
- V72 Hot Topics system: documented as complete and in Production.
- V73 Header & Mobile UX: documented as complete and in Production.
- 2026-10-16 Commercial Search / GSC audit: complete; early signals only.
- Binance Launch Station asset audit: completed previously; candidates must be revalidated before implementation.
- 2026-10-16 Hot Topics batch: documented as merged, deployed, and production-verified.
- 2026-10-17 video tutorial strategy decision: documented in this roadmap only; no website changes made.

### Pending
- V75 Commercial Decision Layer and information architecture.
- V74 Commercial Search Capture / Foundation.
- Audit existing video center and avoid duplicate tutorials.
- Revalidate Binance Launch Station candidates and audit official OKX tutorial resources.
- Implement video center taxonomy for Binance and OKX only, with subcategories shown only when qualified content exists.
- Prioritize video topics by commercial search intent and actual GSC/page evidence.
- Full regression QA, manual acceptance, and one Production release after approval.
- Continue monitoring GSC and the SEO effects of V73.
- Update this roadmap after implementation and after Production release.

### Next Batch
**`V75 + V74 Commercial Search Architecture & Capture`**

Execution order: **`V75 → V74 → Full QA → User Manual Acceptance → One Production Release`**

Target window: **2026-10-20 to 2026-10-21 (planned; reconfirm on the day).**

### Known Issues
- GSC data volume is still small; commercial queries are early signals, not mature traffic evidence.
- V73 SEO impact remains `MONITORING`.
- Binance Launch Station media may use temporary signed URLs; do not use temporary MP4 URLs as permanent assets.
- OKX official tutorial/source audit is still `PENDING`.
- A dedicated Binance invitation-code video has not been confirmed; do not misrepresent a generic registration video as an invitation-code tutorial.
- Previously recorded older cover-image failures on `hotspots.html` remain a known issue and were not modified in the 2026-10-16 Hot Topics batch.
- Current remote branch, latest `main` commit, and live Production state must be rechecked before 2026-10-20 implementation.

### Video Tutorial Scope — Final Decision
- In scope: **Binance tutorials + OKX tutorials**.
- Out of scope: **Gate video tutorials**; CoinVoyu has no Gate registration entry.
- Proposed subcategories: download/registration/KYC; deposit and buying USDT; spot trading/orders; withdrawals/transfers/fund management; account security/troubleshooting; advanced features where supported by suitable material.
- Selection principle: commercial-search value first, verified official source and stable/legal playback second, avoid empty categories and quantity targets.

**Handoff status:** Roadmap updated for planning continuity. Website code and Production were not changed by this planning update.

---

# SEO Audit & Commercial Search Optimization — 2026-10-20

**Status:** DIAGNOSIS COMPLETE / ROADMAP UPDATED / IMPLEMENTATION NOT STARTED

本章节追加记录 2026-10-20 完成的 CoinVoyu SEO AI 只读诊断、Production/main 重定向核查、商业搜索优化优先级，以及 V75 + V74 与视频教程中心的待施工范围。所有数据与结论均来自本轮已保存的阶段 A/B1 证据；本章节没有重新执行 GSC 抽取，也没有修改网站业务代码、数据库、OAuth、Preview 或 Production。

## 1. Audit scope and verified technical baseline

- Audit date: `2026-10-20`（Asia/Shanghai）
- Latest complete GSC date used: `2026-10-17`
- GSC Property: `sc-domain:coinvoyu.com`
- Property scope: CoinVoyu Main + `/tw/`
- Main-only aggregate: **NOT AVAILABLE**。Domain 汇总不能直接视为主站独立数据；本轮主站 Query/Page 机会按页面 URL 排除 `/tw/` 后判断。
- CoinVoyu remote `main` latest verified during Stage A: `752a2ef195040290d5bb63f8d187437084f137da`
- CoinVoyu SEO AI remote `main` latest verified during Stage A: `6481cfe5ac3c65709dc7ee96cadfa98c2e254c55`
- SEO AI Production: connected to GSC in read-only mode; Production UI marker recorded as `V2 quality-20261009 · 基线 6d4ae604`。
- SEO AI V6 Preview live data: **NOT AVAILABLE**。访问遇到 Google 未验证应用 / OAuth 权限流程；本轮未授权、未修改 OAuth。
- Data state: GSC request uses `dataState=final`；本轮没有执行手动同步或数据库写入。

## 2. GSC period comparison

| Period | Clicks | Impressions | CTR | Average Position |
|---|---:|---:|---:|---:|
| 2026-10-11—2026-10-17 | 0 | 285 | 0.00% | 53.62 |
| 2026-10-04—2026-10-10 | 2 | 77 | 2.60% | 28.04 |
| 2026-09-20—2026-10-17 | 3 | 413 | 0.73% | 44.89 |
| 2026-08-23—2026-09-19 | 1 | 33 | 3.03% | 6.42 |

Interpretation:

1. 最近 7 天曝光比前 7 天增加 208（+270.13%），但点击从 2 降至 0，CTR 下降 2.60 个百分点。
2. 最近 28 天曝光比前 28 天增加 380，点击增加 2；平均排名变化受到新增 Query/Page 组合影响。
3. 当前证据显示 Google 正在扩大测试更多低排名查询与页面，并不支持“全站曝光周环比下降”的结论。
4. 平均排名不能脱离 Query/Page 构成直接解释为整站排名下降，也没有证据将变化归因于 V73 或 Google 算法惩罚。
5. 10 月 14 日单日曝光 78，至 10 月 17 日为 35；样本量和时间窗口不足以判断技术性故障。

## 3. Main-site Query/Page evidence

以下均为 28 天 final 数据中的早期信号，样本量小，不代表成熟流量。

| Query | Intended / observed page | Clicks | Impressions | CTR | Position |
|---|---|---:|---:|---:|---:|
| `referral code 怎么填` | `/binance-referral-code.html` | 0 | 4 | 0% | 7.00 |
| `btc usdt 意思` | historical `/btc-usdt-difference.html` attribution | 0 | 3 | 0% | 4.67 |
| `币安邀请码没输入` | `/binance-missed-referral-code.html` | 0 | 3 | 0% | 17.67 |
| `sec faq` | `/sec-crypto-faq-september-2026.html` | 0 | 3 | 0% | 11.00 |
| `欧易邀请码` | `/okx-referral-code.html` | 1 | 2 | 50% | 50.50 |
| `okx 取引招待` | `/okx-referral-code.html` | 0 | 2 | 0% | 23.50 |
| `欧易邀请码填不了` | `/okx-referral-code.html` | 0 | 2 | 0% | 53.50 |
| `欧易注册下载` | `/okx-guide.html` | 0 | 2 | 0% | 30.00 |
| `how to buy bitcoin on okx` | `/okx-buy-bitcoin.html` | 0 | 2 | 0% | 54.50 |
| `okx referral code` | `/okx-referral-code.html` | 0 | 1 | 0% | 2.00 |
| `币安身份认证失败` | `/binance-kyc-failed.html` | 0 | 1 | 0% | 12.00 |
| `币安重置kyc` | `/binance-kyc-failed.html` | 0 | 1 | 0% | 18.00 |
| `okx withdrawal pending` | `/okx-withdrawal-not-arrived.html` | 0 | 1 | 0% | 27.00 |
| `欧易注册邀请码` | `/okx-referral-code.html` | 0 | 1 | 0% | 36.00 |
| `币安和欧易` | `/exchange.html` | 0 | 1 | 0% | 37.00 |
| `欧易和币安` | `/binance-vs-okx.html` | 0 | 1 | 0% | 50.00 |
| `币安和欧易哪个好` | `/binance-vs-okx.html` | 0 | 1 | 0% | 68.00 |
| `币安怎么提币` | `/binance-withdraw-usdt.html` | 0 | 1 | 0% | 59.00 |

Page-level evidence:

| Page | Clicks | Impressions | CTR | Position | Decision |
|---|---:|---:|---:|---:|---|
| historical `/btc-usdt-difference.html` attribution | 0 | 19 | 0% | 6.21 | Highest-position zero-click signal; optimize the current target URL only after migration check |
| `/okx-referral-code.html` | 1 | 16 | 6.25% | 23.38 | Protect current positioning; conservative enhancement only |
| `/binance-referral-code.html` | 0 | 10 | 0% | 16.50 | Improve exact answer and task path; do not create a duplicate referral page |
| `/binance-missed-referral-code.html` | 0 | 5 | 0% | 34.00 | Focused decision-path refinement, not a rewrite |
| `/exchange.html` | 1 | 6 | 16.67% | 14.00 | Strengthen Hub-to-guide and comparison paths |
| `/okx-guide.html` | 0 | 4 | 0% | 31.00 | Existing registration/download page; do not create a duplicate URL |
| `/binance-kyc-failed.html` | 0 | 2 | 0% | 15.00 | Expand exact failure/reset scenarios on the existing page |
| `/binance-vs-okx.html` | 0 | 4 | 0% | 32.75 | V75 decision-layer candidate; data remains early |

Potential cannibalization remains **UNCONFIRMED**: `欧易注册下载` triggered `/articles.html` once around position 70 while `/okx-guide.html` ranked around position 30. Use internal linking and index-page snippet discipline first; do not create another registration/download URL.

## 4. Production/main redirect investigation

- Old URL: `/btc-usdt-difference.html`
- Current target URL: `/bitcoin-usdt.html`
- GitHub main `vercel.json`: permanent redirect from the old URL to the target URL.
- Production request to the old URL resolves to `/bitcoin-usdt.html`.
- Production final Title/H1: `BTC 和 USDT 有什么区别？新手一次看懂`.
- GitHub main target-page Title/H1: `BTC 和 USDT 有什么区别？新手一次看懂`.
- GitHub main target-page Meta Description: `BTC 和 USDT 有什么区别？从用途、价格特点、使用场景和风险几个方面，帮助数字资产新手建立基础认识。`

Conclusion: the previously reported Production/main drift was a **false drift signal caused by comparing the old source file with the redirected Production target page**. No confirmed single-page deployment anomaly was found.

Remaining verification: whether Google has fully migrated indexing and GSC attribution from the old URL to `/bitcoin-usdt.html` is **NOT YET CONFIRMED**.

Mandatory implementation rule: future SEO work must target `/bitcoin-usdt.html`; do not continue treating `/btc-usdt-difference.html` as the live SEO page.

Pre-release checks for the next implementation batch:

- Sitemap contains the appropriate current target URL and no unintended old canonical entry.
- Internal links point to `/bitcoin-usdt.html`.
- Canonical points to `/bitcoin-usdt.html`.
- Google index status and GSC attribution of both URLs are reviewed.

These are safety checks, not confirmed P0 failures, and were not changed during this audit.

## 5. P0 / P1 / P2 action matrix

### P0 — Confirmed critical issues

**NONE CONFIRMED.**

No evidence currently supports labeling an index, canonical, broken-page, deployment or site-wide technical fault as P0. New/old URL migration and URL consistency remain required pre-release verification items.

### P1 — Priority existing-page optimization

#### A. `/bitcoin-usdt.html`

- Evidence: historical old-URL page attribution 0 clicks / 19 impressions / position 6.21; query `btc usdt 意思` 0 / 3 / position 4.67.
- Confirmed opportunity: high-position, zero-click signal with small sample.
- Candidate Title: `BTC/USDT 是什么意思？BTC 与 USDT 的区别｜CoinVoyu`
- Candidate Meta direction: directly explain BTC, USDT, what the BTC/USDT trading pair means, price behavior and beginner risks.
- H1/intro: answer “BTC/USDT 是什么意思” in the first visible paragraph; keep the BTC-vs-USDT comparison and risk explanation.
- Preconditions: verify index/GSC migration and target the current URL only.
- Validation: compare complete 28-day windows for target Query, clicks, impressions, CTR, position and new/old URL attribution.
- Risk: the evidence is small; do not infer that a title change guarantees clicks.

#### B. `/binance-referral-code.html`

- Evidence: 0 clicks / 10 impressions / position 16.50; `referral code 怎么填` 0 / 4 / position 7.00.
- Current Title/H1 are already strongly matched; no broad rewrite recommended.
- Add a direct first-screen explanation that “Referral Code” means invitation/referral code.
- Present registration-time entry steps, binding-status checks, and a clear branch for users who forgot to enter it.
- Add visible FAQ and matching FAQ schema only for questions actually answered on-page.
- Preserve the existing referral configuration and relevant CTA.
- Validation: exact-query CTR and ranking, plus referral-path clicks after a complete 28-day window.

#### C. `/binance-missed-referral-code.html`

- Evidence: query `币安邀请码没输入` 0 / 3 / position 17.67; page aggregate 0 / 5 / position 34.00.
- Preserve current Title and Meta.
- Reorganize the first-screen answer into status branches: registration unfinished; registered but not funded; possible time-limit/eligibility condition.
- Any 90-day statement must retain a reliable source, eligibility boundary and non-guarantee wording.
- Connect naturally back to the standard Binance referral guide and official support route.
- Validation: query position, CTR, engagement with decision links and referral-path clicks.

#### D. `/okx-referral-code.html`

- Evidence: 1 click / 16 impressions / position 23.38; multiple referral-related variants; `okx referral code` briefly appeared at position 2.
- Protect current Title, Meta, H1, DS1888 information and conversion path.
- Do not perform a broad rewrite.
- Evaluate one visible FAQ/troubleshooting section for `欧易邀请码填不了`, with schema kept exactly consistent with visible content.
- Validation: preserve existing clicks while monitoring variant-query coverage and CTR.

#### E. `/binance-kyc-failed.html`

- Evidence: page 0 / 2 / position 15; `币安身份认证失败` position 12 and `币安重置kyc` position 18.
- Preserve the page’s failure-troubleshooting positioning.
- Add a focused section: `币安 KYC 可以重置吗？`
- Separate review pending, rejection, identity-data change, face-verification failure and official appeal/support paths.
- Use verifiable Binance official sources; do not promise that every account can reset KYC.
- Validation: exact-query impressions, position and clicks over a complete 28-day window.

#### F. `/exchange.html`

- Evidence: 1 click / 6 impressions / position 14.00.
- Keep the core Title and Hub identity.
- Strengthen the path: platform choice → registration/KYC → buy/deposit → trade → withdraw → security.
- Add natural descriptive links to Binance/OKX guides and the existing comparison page without turning the Hub into a referral landing page.
- Validation: GSC Hub queries, clicks to guides/comparison pages and preservation of existing conversion entry points.

#### G. `/okx-guide.html`

- Evidence: `欧易注册下载` 0 / 2 / position 30; current Title/Meta already directly target registration and download.
- Preserve Title, Meta and H1; do not create a duplicate registration/download URL.
- Improve descriptive internal links from the article center, exchange Hub and future video center.
- Validation: registration/download query coverage, target-page CTR and whether `/articles.html` overlap disappears or remains negligible.

### P2 — Monitoring and later opportunities

- `/binance-vs-okx.html`: include in V75 as the existing decision page; strengthen rather than create a synonymous comparison page.
- `/articles.html` overlap for `欧易注册下载`: monitor only; current evidence is insufficient to confirm cannibalization.
- Video commercial search demand: planning opportunity, not verified by new GSC evidence in this audit.
- Other-language OKX referral variants: monitor; do not build multilingual pages from isolated impressions.
- Gate commercial pages: continue monitoring. No new evidence in this audit supports bulk creation, and Gate remains out of scope for the video tutorial center.

## 6. V75 + V74 implementation scope

Execution order remains:

`V75 → V74 → Full QA → User Manual Acceptance → One Production Release`

### V75 — Commercial Decision Layer

Status: **PLANNED — NOT IMPLEMENTED**

Scope:

1. Strengthen the existing `binance-vs-okx.html` decision path; do not create a synonym page.
2. Review Binance vs Gate and platform-safety/selection opportunities against actual page coverage before deciding whether any new URL is justified.
3. Connect `exchange.html` to platform guides, problem-solving pages and comparison pages with descriptive, non-mechanical internal links.
4. Clarify Topic Cluster vs Conversion Cluster relationships so educational pages lead to the correct Hub or task page without every page becoming promotional.
5. Review navigation relationships among Hot Topics, article categories, video tutorials and commercial guides; preserve stable URLs and the V73 Header baseline.
6. Define one intended page for each commercial intent and document cannibalization protections before editing.

### V74 — Commercial Search Foundation / Capture

Status: **PLANNED — NOT IMPLEMENTED**

Evidence-led scope:

1. Optimize `/bitcoin-usdt.html` for “BTC/USDT 是什么意思” only after redirect/index checks.
2. Improve the first-screen answer, steps and FAQ on `/binance-referral-code.html` without duplicating the page.
3. Refine the decision path on `/binance-missed-referral-code.html`; preserve sourced eligibility conditions.
4. Conservatively expand `/okx-referral-code.html` for failed-entry troubleshooting while protecting current clicks and DS1888 path.
5. Expand `/binance-kyc-failed.html` with exact failure/reset scenarios and official-source boundaries.
6. Improve internal linking for `/exchange.html` and `/okx-guide.html`.
7. Use Title/Meta/H1 changes only where evidence shows intent mismatch; do not batch-rewrite stable pages.
8. Preserve existing URLs, CTA logic, referral values, V70–V73 UI, `/tw/` isolation and current Conversion Clusters.

New pages are not assumed. Any new URL requires a separate-intent justification, proof that existing pages cannot serve it, and a cannibalization review.

## 7. Video tutorial center plan

Status: **PLANNED — NOT IMPLEMENTED**

Final platform scope:

- Binance tutorials
- OKX tutorials
- Gate video tutorials: **OUT OF SCOPE — DO NOT ADD**

Candidate subcategories, displayed only when qualified material exists:

1. 下载、注册与 KYC。
2. 入金、购买 USDT 与充值。
3. 现货交易与订单操作。
4. 提现、转账与资金管理。
5. 账户安全与常见问题排查。
6. 进阶功能与交易工具（仅在有合格素材时启用）。

Implementation requirements:

- Inventory CoinVoyu’s existing videos first and avoid rebuilding covered topics.
- Revalidate Binance Launch Station candidates and audit official OKX tutorial materials.
- Prioritize explicit commercial/task intent: download, registration, KYC, C2C/P2P and buying USDT, deposit/network choice, spot orders, withdrawals and account security.
- Do not use temporary signed MP4 URLs as permanent assets.
- Do not download and re-host official videos without permission.
- If stable and compliant embedding cannot be confirmed, use an official-source link card plus original Chinese explanation and internal links.
- Do not show empty categories, fake videos or placeholder entries.
- A Binance invitation-code video remains unconfirmed; do not present a generic registration video as an invitation-code tutorial.

## 8. Validation metrics for the implementation batch

Use complete 28-day GSC windows after release. Record:

- Target Query clicks, impressions, CTR and average position.
- New vs old URL attribution for the BTC/USDT page.
- Whether priority commercial queries enter or hold the top 10/top 20.
- Whether zero-click pages begin receiving clicks without losing relevant impressions.
- Whether one intent continues to surface multiple unintended pages.
- Internal navigation clicks from Hub/video pages to the intended task and commercial pages.

Do not judge success from a single day or a partially processed GSC date.

## 9. Current handoff snapshot — 2026-10-20

### Current Branch

`NOT AVAILABLE` — no website work branch was created or revalidated in this diagnosis task.

### Latest Commit

- Latest verified CoinVoyu remote `main` during Stage A: `752a2ef195040290d5bb63f8d187437084f137da`
- Current Production deployment commit: `NOT REVALIDATED` in B2.
- Do not assume the verified Stage A SHA remains current when implementation starts; recheck before branch creation.

### Completed

- SEO AI Production read-only connectivity/property verification.
- Final 7-day and 28-day period comparisons through 2026-10-17.
- Main-site Query/Page evidence extraction with `/tw/` URL separation.
- Focused evidence review for eight priority pages.
- Stage A diagnosis and checkpoint.
- B1 Production/main redirect investigation.
- B1 P0/P1/P2 recommendation draft.
- B2 V75/V74/video-center integration into this Roadmap.
- Website business-code changes in this audit: **NONE**.
- Database/OAuth/deployment changes in this audit: **NONE**.

### Pending

- Create a new implementation branch from the then-current remote `main`.
- Verify Google index/GSC migration for `/btc-usdt-difference.html` → `/bitcoin-usdt.html`.
- Audit Sitemap, internal links and canonical consistency for those URLs before editing.
- Implement V75 decision-layer scope.
- Implement V74 evidence-led page optimizations.
- Inventory current videos, revalidate Binance candidates and complete the official OKX material audit.
- Implement the Binance/OKX-only video taxonomy where qualified materials exist.
- Full desktop/mobile/SEO/schema/link/referral regression QA.
- User manual acceptance.
- One Production release only after approval.
- Compare complete post-release 28-day data and append results to this Roadmap.

### Next Batch

**`V75 + V74 Commercial Search Architecture & Capture`**

Required order: **`V75 → V74 → Full QA → User Manual Acceptance → One Production Release`**

### Known Issues

- GSC Domain Property contains Main and `/tw/`; strict Main-only aggregate remains `NOT AVAILABLE`.
- GSC commercial samples remain small; they are early signals, not stable traffic proof.
- Google index/GSC migration from the old BTC/USDT URL is not yet confirmed.
- SEO AI V6 Preview remains blocked by the Google unverified-app/OAuth warning; no permission was granted or changed.
- Production Dashboard CSV export was not captured; Query/Page evidence came from the built-in final comparison output.
- GA4 visible schema did not expose source/medium in this audit, so GA4 cannot explain organic-search CTR.
- Bing and PageSpeed integrations were not configured in the observed SEO AI state.
- Binance Launch Station media may use expiring signed URLs.
- OKX official tutorial-source audit remains pending.
- Older broken-cover references previously recorded on `hotspots.html` remain outside this scope.

### Preview / Production / QA

- Preview created for this audit: **NO**
- Production changed by this audit: **NO**
- Website-code QA: **NOT RUN — NO WEBSITE CODE CHANGED**
- Data/diagnostic QA: **PASS**
- Roadmap append verification: performed after file write.

### Next minimum action

At the start of implementation, re-read current remote `main` and Production, verify the BTC/USDT redirect/index/canonical/Sitemap/internal-link state, then create one isolated V75 + V74 branch. Do not repeat the completed GSC extraction unless a new complete comparison window is intentionally requested.

---

## Roadmap Update — 2026-10-20

- Historical baseline preserved: **YES**
- Stage A/B1 findings appended: **YES**
- P0/P1/P2 matrix appended: **YES**
- V75/V74 implementation scope appended: **YES**
- Binance/OKX video-center plan appended: **YES**
- Website code changed: **NO**
- Production changed: **NO**

**ROADMAP UPDATE: PASS**

---

# V75 Commercial Decision Layer & Conversion Infrastructure — 2026-10-23

## 1. Status and safety baseline

- Status: **IMPLEMENTED ON ISOLATED BRANCH — PREVIEW AVAILABLE — WAITING FOR USER ACCEPTANCE**
- Baseline `main`: `752a2ef195040290d5bb63f8d187437084f137da`
- Current Branch: `feature/v75-v74-commercial-search`
- V75 code Commit: `cfd782f808716f31d7aec20370d87ba89fd2163a`
- Preview: <https://coinvoyu-git-feature-v75-v74-commercial-search-brandfang520.vercel.app/>
- Production changed: **NO**
- Main merged: **NO**
- GSC / SEO AI data extraction repeated in this batch: **NO**
- `/tw/`: **NO CHANGE**
- Equitova: **NO CHANGE**

This entry records the implemented V75 branch candidate. It does not represent a Production release or measured conversion uplift.

## 2. Main-site referral configuration audit

Approved Main configuration:

| Platform | Display code | Approved page URL |
|---|---|---|
| Binance | `DS1886` | `https://www.bsmkweb.cc/register?ref=DS1886` (existing approved channel retained) |
| OKX | `DS1888` | `https://www.mitxcqvwnhj.com/join/DS1888` |

Audited promotion surfaces:

| File / surface | Binance result | OKX result | Action |
|---|---|---|---|
| `index.html` | DS1886 + approved existing URL | DS1888 + approved URL | No change required |
| `exchange.html` | DS1886 + approved existing URL | DS1888 + approved URL | Verified after V75 edit |
| `binance-vs-okx.html` | DS1886 + approved existing URL | DS1888 + approved URL | Verified after V75 edit |
| `binance-guide.html` | DS1886 + approved existing URL | N/A | Verified after V75 edit |
| `binance-registration-guide-2026.html` | DS1886 + approved existing URL | N/A | No change required |
| `binance-referral-code.html` | DS1886 + approved existing URL | N/A | No change required |
| `binance-missed-referral-code.html` | DS1886 + approved existing URL | N/A | No change required |
| `okx-guide.html` | N/A | DS1888 + approved URL | Verified after V75 edit |
| `okx-referral-code.html` | N/A | DS1888 + approved URL | No change required |
| `videos.html` | DS1886 + approved existing URL | DS1888 + approved URL | Added and verified |

Audit conclusions:

- `topzhjdgxcb.com` residue: **NONE FOUND** in the completed Main-site scan.
- Binance/OKX code cross-over: **NONE FOUND**.
- Main codes in `/tw/`: **NO CHANGE / NOT INTRODUCED**.
- HTML display text and `href` configuration: **PASS**.
- External final redirect from the affiliate domains: **NOT VERIFIED**. The current cloud browser returned “Site Unavailable” for both affiliate domains, so this batch does not claim final redirect or commission attribution verification.
- Partner-backend commission ownership: **NOT AVAILABLE / NOT CLAIMED**.

## 3. Implemented V75 changes

### `exchange.html`

- Preserved the stable URL, Title, Meta Description and H1.
- Added an objective platform-selection decision layer.
- Added the full task path: selection → registration/KYC → buy/deposit → spot → withdrawal → security.
- Added descriptive links to `binance-vs-okx.html`, platform guides, task tutorials and platform-filtered video views.
- Preserved appropriate referral disclosure and existing visual language.
- Updated visible and structured modification date to 2026-10-23.

### `binance-vs-okx.html`

- Preserved the stable URL, core Title, Meta Description, H1 and neutral positioning.
- Added conditional recommendations for different user needs, without declaring an absolute winner.
- Added official-rule verification reminders for region availability, fees and product functions.
- Added post-comparison Binance and OKX guide paths and appropriately placed registration entries.
- Added FAQPage JSON-LD matching the four visible FAQs.
- Updated visible and structured modification date to 2026-10-23.

### Platform guides and natural internal links

- `binance-guide.html`: added natural links back to the Hub, comparison page and Binance-filtered video center.
- `okx-guide.html`: added natural links back to the Hub, comparison page and OKX-filtered video center.
- The implemented semantic path is:
  `Exchange Hub → Comparison → Platform Guide → Task Tutorial → Appropriate Registration Entry`.

## 4. Video tutorial center implementation

Platform scope:

- Binance tutorials: **IMPLEMENTED**
- OKX tutorials: **IMPLEMENTED**
- Gate tutorials: **NOT ADDED**

Changes to `videos.html`:

- Added platform filters for All / Binance / OKX.
- Added task filters for onboarding/KYC, funds, spot, security and advanced functions.
- Added URL filter support through `platform` and `task` query parameters.
- Retained all 32 existing self-hosted videos and categorized them under OKX/task paths.
- Added 9 Binance official-source link cards:
  1. iOS App download
  2. Account registration
  3. Identity verification
  4. C2C buying/selling
  5. Blockchain networks
  6. Correct network selection
  7. Spot trading
  8. Crypto withdrawal
  9. Two-factor authentication
- Each Binance card has original Chinese guidance and a related CoinVoyu article link.
- Binance materials use verified Binance Launch Station source pages. No temporary signed MP4 URL, iframe or downloaded/re-hosted official media was used.
- Existing OKX videos remain self-hosted materials. The page provides an OKX Help Center rules/source link and does not mislabel every legacy media file as a newly verified official OKX asset.
- Empty categories are not displayed.

Known video limitation:

- Binance Launch Station source-page availability can change.
- Stable, explicitly permitted video embedding was not confirmed, so official-source link cards are the safe implementation.
- No standalone Binance invitation-code video was represented or fabricated.

## 5. Homepage hotspot freshness

Current homepage hotspot module was rechecked on the V75 Preview. It displays the three 2026-10-16 articles:

1. BTC 短暂跌破 8 万美元：杠杆为何放大跌势？
2. Strategy 会被 MSCI 指数剔除吗？
3. 银行托管 BTC 和 ETH 意味着什么？

Conclusion: the previously suspected 9/17 stale block is not present in the current baseline. `index.html` was not modified by V75.

## 6. GA4 interaction measurement

`analytics-main.js` now adds consent-gated delegated events:

- `referral_click`
- `referral_code_copy`

Controls:

- Events run only after Main-site analytics consent and when `gtag` is available.
- Existing `/tw/` early return remains in place.
- Platform/code inference is limited to the approved Main referral domains/codes.
- No database schema, OAuth, paid service or GA4 property setting was changed.
- No conversion uplift is claimed; registration and commission outcomes remain unavailable.

## 7. QA and validation

### Static / structural QA

- Modified HTML pages have one H1 each: **PASS**
- HTML section/article/div balance checks: **PASS**
- JSON-LD parse checks: **PASS**
- Comparison FAQ schema matches visible FAQ content: **PASS**
- New internal target files exist: **PASS**
- Binance/OKX code/link cross-over check: **PASS**
- Old OKX domain residue check: **PASS**
- 9 Binance cards + 32 retained OKX cards: **PASS**
- Filter query-state behavior: **PASS** (Binance view showed 9 cards; OKX spot view showed the matching OKX card)
- Broken images on checked Preview pages: **NONE**
- Key desktop pages: no usable horizontal scrollbar; global overflow protection remains active.

### Preview pages checked in a real browser

- Home
- `exchange.html`
- `binance-vs-okx.html`
- `videos.html?platform=binance`
- `videos.html?platform=okx&task=spot`
- `binance-guide.html`
- `okx-guide.html`

Desktop browser width was approximately 1363px. H1, footer, referral configuration, JSON-LD parsing and image loading passed on checked pages.

### Mobile QA limitation

- Responsive CSS breakpoints and single-column rules were reviewed.
- Exact 390px browser-emulation execution: **NOT VERIFIED** because the available cloud-browser control could not change viewport size and the local Playwright runtime had no installed browser binary.
- Human 390px acceptance remains required before merge/Production.

### Scope isolation

Diff from baseline `main` contains:

- `CoinVoyu_Commercial_Search_Growth_Roadmap_V1.md`
- `analytics-main.js`
- `binance-guide.html`
- `binance-vs-okx.html`
- `exchange.html`
- `okx-guide.html`
- `videos.html`

No file under `/tw/` is in the Diff. No files were deleted or renamed.

## 8. Handoff snapshot

### Current Branch

`feature/v75-v74-commercial-search`

### Latest code Commit

`cfd782f808716f31d7aec20370d87ba89fd2163a`

### Completed

- Main-site referral configuration audit and consistency verification.
- Exchange Hub decision-path implementation.
- Binance-vs-OKX conditional decision implementation.
- Hub/comparison/platform-guide natural links.
- Binance/OKX video taxonomy and first Binance official-source card implementation.
- Homepage hotspot freshness verification.
- Consent-gated GA4 referral interaction events.
- Static, structural and desktop Preview QA.
- Scope-isolation review.
- Roadmap update.

### Pending

- Human exact-390px mobile acceptance.
- External affiliate-domain final redirect verification from a network where both domains are reachable.
- Partner-backend commission attribution verification, if separately available to the site owner.
- User acceptance of the V75 Preview.
- PR creation/merge and Production release: **NOT AUTHORIZED IN THIS BATCH**.
- V74 evidence-led page optimization after V75 acceptance.

### Next Batch

**V74 Commercial Search Foundation / Capture**, after V75 human acceptance.

Expected V74 scope remains evidence-led:

- `/bitcoin-usdt.html`
- `/binance-referral-code.html`
- `/binance-missed-referral-code.html`
- conservative `/okx-referral-code.html` enhancement
- `/binance-kyc-failed.html`
- supporting internal-link refinements

Do not create duplicate registration/download/referral URLs without separate-intent and cannibalization evidence.

### Known Issues

- Exact 390px automated browser QA is not available in this environment.
- Affiliate domains were not reachable in the cloud browser; final redirect and commission ownership are unverified.
- GSC samples remain small; no SEO or conversion gain is claimed.
- Google index/GSC migration for the old BTC/USDT URL remains pending verification.
- Binance Launch Station source-page stability may change over time.
- Older broken-cover references previously recorded on `hotspots.html` remain outside V75 scope.

### Preview / Production / QA

- Preview: **AVAILABLE**
- Desktop Preview QA: **PASS**
- Mobile exact 390px QA: **NOT VERIFIED**
- Production changed: **NO**
- Main merged: **NO**
- User acceptance: **PENDING**

**ROADMAP UPDATE: PASS**

---

# V75 Binance Video Direct Playback Correction — 2026-10-23

## Status

**BLOCKED BY SOURCE FORMAT — NO UNSAFE PLAYER CHANGE MADE**

- Repository: `brandfang520/coinvoyu`
- Branch: `feature/v75-v74-commercial-search`
- Starting branch Commit: `309e47965a901eeabaa1ec9df3192e0a6b8e5846`
- Business-code files changed in this correction: **NONE**
- Production changed: **NO**
- Main merged: **NO**
- V74 started: **NO**

## Targeted implementation audit

The current OKX implementation uses native HTML5 `<video controls>` elements with repository-hosted MP4 assets under `assets/videos/`. The current Binance cards use Binance Launch Station public Notion source pages.

The nine Binance cards currently present in `videos.html` were individually opened and tested:

| Binance card | Source result | Stable in-page playback decision |
|---|---|---|
| 苹果—币安 APP 下载指南 | `file.notion.so` signed MP4 with `signature` and `expirationTimestamp` | BLOCKED |
| 如何注册币安账户 | `file.notion.so` signed MP4 with `signature` and `expirationTimestamp` | BLOCKED |
| 如何完成币安身份验证 | `file.notion.so` signed MP4 with `signature` and `expirationTimestamp` | BLOCKED |
| 如何通过币安 C2C 自选区买卖加密货币 | `file.notion.so` signed MP4 with `signature` and `expirationTimestamp` | BLOCKED |
| 一个视频搞懂区块链网络 | `file.notion.so` signed MP4 with `signature` and `expirationTimestamp` | BLOCKED |
| 如何正确选择网络，避免转账错误 | Source page exposed no playable video element during verification | BLOCKED |
| 如何在币安 APP 交易现货 | `file.notion.so` signed MP4 with `signature` and `expirationTimestamp` | BLOCKED |
| 如何在币安进行加密货币提现 | `file.notion.so` signed MP4 with `signature` and `expirationTimestamp` | BLOCKED |
| 如何在币安 APP 启用双重身份验证 | `file.notion.so` signed MP4 with `signature` and `expirationTimestamp` | BLOCKED |

Eight extracted media URLs had the same signed expiration value, `1792742400000` (2026-10-23 08:00 UTC). No stable YouTube, Vimeo or Binance-hosted embed URL was exposed. The only iframe found on those pages was Notion's internal `aif.notion.so/aif-production.html`, not a reusable video player.

## Decision

The requested direct-play conversion was not implemented because every currently usable Binance media URL violates the fixed safety requirements:

- temporary signed MP4 URLs cannot be used as permanent sources;
- Binance media cannot be downloaded and re-hosted without confirmed permission;
- no playback URL may be invented;
- a false play button or external navigation labeled as direct playback is prohibited.

The existing official-source cards remain unchanged. This is safer than shipping players that expire on the same day.

## Regression verification

- Existing OKX native player source loaded from the V75 Preview: **PASS**
- Checked OKX video `readyState=4`, native controls enabled, repository-hosted MP4 resolved.
- OKX onboarding filter: **PASS** (4 visible cards).
- Current inventory: 32 OKX videos + 9 Binance source cards retained.
- Binance direct playback: **NOT IMPLEMENTED / BLOCKED**
- Binance play/pause/replay QA: **NOT AVAILABLE** because no compliant in-page source exists.
- Desktop/mobile layout changes from this correction: **NONE**
- `/tw/`: **NO CHANGE**
- Equitova: **NO CHANGE**

## Required unblocker

Provide at least one of the following for each Binance video:

1. a stable official YouTube/Vimeo/Binance embed URL with embedding permitted;
2. a stable Binance-hosted public media URL intended for third-party playback;
3. explicit permission plus approved permanent media files for repository hosting.

After one of these is available, the existing OKX `<video controls>` card structure can be reused without redesigning the video center.

## Handoff

- Correction status: **BLOCKED — WAITING FOR STABLE, PERMITTED BINANCE PLAYBACK SOURCES**
- Preview remains the existing V75 candidate.
- Production: **NO CHANGE**
- Main: **NOT MERGED**
- User acceptance: **PENDING**
- Next action: obtain stable permitted Binance playback sources; do not start V74 automatically.

**ROADMAP UPDATE: PASS**


---

# 2026-10-23 — V75 Binance Direct Playback Recovery (Equitova V43 Reference)

## Scope and safety

- Repository: `brandfang520/coinvoyu`
- Branch: `feature/v75-v74-commercial-search`
- Starting HEAD: `d7d68bb264e3126c4339b265fe18bf6cad8f4322`
- Implementation commit: `944dcf0dbc0f42ec9eab44352478b237473dda07`
- Reference repository (read only): `brandfang520/equitova`
- Accepted Equitova reference commit: `def075da390278a61886e1f8a4c9231db2cf999b`
- Original Equitova V43 video asset commit: `c99cbbf5acf9fc098900f74d4690acbbcabf3a1c`
- Preview: https://coinvoyu-git-feature-v75-v74-commercial-search-brandfang520.vercel.app/videos.html
- Production: **NO CHANGE**
- Main: **NOT MERGED**
- Equitova: **NO CHANGE**
- V74: **NOT STARTED**

This recovery supersedes the earlier same-day blocker for the seven videos listed below. The earlier check only evaluated expiring Notion media URLs. The additional Equitova V43 audit found already processed, user-controlled, previously accepted Binance Launch Station assets. The current task explicitly authorized reuse after source and content matching. No expired signed URL was reused.

## Verified Equitova implementation

The accepted V43 implementation uses a poster button first and creates the HTML5 player only after a user click. Its effective player configuration is:

- local MP4 asset;
- H.264 video + AAC LC audio;
- `controls`;
- `playsInline`;
- `preload="metadata"`;
- poster image;
- no `autoplay` attribute;
- click-to-load / click-to-play;
- category filtering without empty categories.

Media inspection of the reused assets confirmed 1280×720 for five files and 1276×222 for the original C2C and spot source renders. All seven use H.264/AAC. The MP4 `moov` atom precedes `mdat` in every inspected file, confirming fast-start layout. Durations match the V43 lesson map.

## Recovered CoinVoyu assets

| CoinVoyu lesson | Stable MP4 | Poster | Duration | Result |
|---|---|---|---:|---|
| 苹果—币安 APP 下载指南 | `assets/videos/binance/app-download.mp4` | `assets/images/video-covers/binance/app-download.webp` | 45.904s | DIRECT PLAY PASS |
| 如何注册币安账户 | `assets/videos/binance/register.mp4` | `assets/images/video-covers/binance/register.webp` | 29.348s | DIRECT PLAY PASS |
| 如何完成币安身份验证 | `assets/videos/binance/kyc.mp4` | `assets/images/video-covers/binance/kyc.webp` | 32.135s | DIRECT PLAY PASS |
| 如何通过币安 C2C 自选区买卖加密货币 | `assets/videos/binance/c2c.mp4` | `assets/images/video-covers/binance/c2c.webp` | 48.133s | DIRECT PLAY PASS |
| 如何正确选择网络，避免转账错误 | `assets/videos/binance/network-selection.mp4` | `assets/images/video-covers/binance/network-selection.webp` | 41.376s | DIRECT PLAY PASS |
| 如何在币安 APP 交易现货 | `assets/videos/binance/spot.mp4` | `assets/images/video-covers/binance/spot.webp` | 72.073s | DIRECT PLAY PASS |
| 如何在币安进行加密货币提现 | `assets/videos/binance/withdraw.mp4` | `assets/images/video-covers/binance/withdraw.webp` | 40.981s | DIRECT PLAY PASS |

Each direct-play card retains the Binance Launch Station / Binance official teaching attribution, original Chinese explanation, task category, official source link and related CoinVoyu article link.

## Two entries still limited by source matching

| CoinVoyu lesson | Status | Reason |
|---|---|---|
| 一个视频搞懂区块链网络 | OFFICIAL SOURCE LINK ONLY | No distinct, content-matched reusable local asset was found. The recovered network video specifically covers network selection and is used only for that matching lesson. |
| 如何在币安 APP 启用双重身份验证 | OFFICIAL SOURCE LINK ONLY | Equitova V43 contains anti-phishing and passkey lessons, but no matching 2FA video. Those assets were not mislabelled or substituted. |

The full inventory remains **9 Binance entries + 32 OKX videos**. Gate video content was not added.

## CoinVoyu implementation

- `videos.html` now uses a lightweight native HTML5 player for the seven verified Binance assets.
- Initial HTML contains poster buttons, not seven active video elements.
- On click, JavaScript creates one local `<video controls playsinline preload="metadata">`, loads the matching MP4 and starts playback from the user gesture.
- There is no autoplay attribute and no temporary Notion MP4 URL.
- The two unmatched entries remain clearly identifiable official-source cards.
- Binance/OKX platform filtering and existing task filtering are preserved.
- The 32 existing OKX videos and their source files are unchanged.

## Preview QA (2026-10-23 01:07 UTC)

- Vercel deployment status for implementation commit: **SUCCESS**
- Seven local MP4 URLs returned loadable media on Preview: **PASS**
- Seven players reached `readyState=4`, reported their expected duration, and had no media error: **PASS**
- Seven players advanced `currentTime` after the user clicked play: **PASS**
- Pause and replay interaction: **PASS**
- `controls`, `playsinline`, `preload="metadata"`: **PASS**
- Initial on-demand state: 7 poster buttons and 0 active Binance video elements before click: **PASS**
- Binance filter: 9 visible Binance entries / 0 OKX entries: **PASS**
- OKX filter: 32 visible OKX entries / 0 Binance entries: **PASS**
- All filter: 9 Binance + 32 OKX: **PASS**
- Existing OKX sample playback (`video-account`) reached `readyState=4` and advanced `currentTime`: **PASS**
- Page-origin console errors: **0**. Observed browser-extension metadata messages are external to CoinVoyu.
- Desktop visual inspection: cards, posters, controls and filters render correctly: **PASS**
- Body-level horizontal overflow on tested desktop viewport: **NONE**
- Exact 390px browser emulation: **NOT VERIFIED** in the available browser control; manual mobile acceptance remains required.
- `/tw/`: **NO CHANGE**
- Referral configuration: **NO CHANGE**

## Files changed in this recovery

- Modified: `videos.html`
- Added: 7 files under `assets/videos/binance/`
- Added: 7 files under `assets/images/video-covers/binance/`
- Updated: `CoinVoyu_Commercial_Search_Growth_Roadmap_V1.md`

No other site page, shared CSS, shared JavaScript, referral configuration, Taiwan file or Equitova file was changed.

## Handoff

### Completed

- Equitova V43 implementation and assets audited against real code and repository blobs.
- Seven content-matched assets recovered and implemented as true in-page playback.
- Preview media, playback controls, filters and an existing OKX player tested.
- Roadmap updated without deleting prior history.

### Pending

- User manual acceptance, especially 390px mobile visual inspection.
- Stable, content-matched assets or embeds for the general blockchain-network lesson and Binance 2FA lesson.
- Merge and Production deployment only after user approval.
- V74 remains paused.

### Next batch

User manual Preview acceptance. If accepted, review the exact branch diff before any merge. Do not start V74 automatically.

**ROADMAP UPDATE: PASS**


---

# 2026-10-23 — V75 Final Completion: 12-Video Integration & Release-Candidate QA

## Scope and repository state

- Repository: `brandfang520/coinvoyu`
- Branch: `feature/v75-v74-commercial-search`
- Starting HEAD: `27c3b981770772a662c60a5055e392c068ea6c55`
- Asset / video-center commit: `357f79b79a68facce9f74a16f5d1fdfd8c51718b`
- Visible-count correction commit: `a8b35a93676e52e224da7d3916b61293a6cad352`
- Preview: https://coinvoyu-git-feature-v75-v74-commercial-search-brandfang520.vercel.app/videos.html
- Preview deployment for `a8b35a9`: **SUCCESS**
- Production: **NO CHANGE**
- Main: **NOT MERGED**
- Equitova: **READ ONLY / NO CHANGE**
- Taiwan site `/tw/`: **NO CHANGE**
- V74: **NOT STARTED**
- Open PR for this branch at final QA time: **NONE FOUND**

This section supersedes the earlier seven-video handoff. The current branch now contains twelve real, local, direct-play Binance videos and no source-only placeholder cards.

## Five Equitova assets migrated

The five files below were copied as exact, already processed Equitova V43 assets after content and SHA checks. No transcoding or renewed download was needed. All use H.264 video, AAC LC audio and fast-start MP4 layout (`moov` before `mdat`).

| Lesson | Equitova source | CoinVoyu MP4 | Poster | Size | Duration | Resolution |
|---|---|---|---|---:|---:|---:|
| Binance 防钓鱼码怎么开启？ | `assets/videos/anti-phishing.mp4` | `assets/videos/binance/anti-phishing.mp4` | `assets/images/video-covers/binance/anti-phishing.webp` | 671,866 B | 40.308 s | 1276×222 |
| Binance 怎么设置 Passkey 通行密钥？ | `assets/videos/passkey.mp4` | `assets/videos/binance/passkey.mp4` | `assets/images/video-covers/binance/passkey.webp` | 656,615 B | 38.427 s | 1276×222 |
| Binance 怎么设置价格提醒？ | `assets/videos/price-alert.mp4` | `assets/videos/binance/price-alert.mp4` | `assets/images/video-covers/binance/price-alert.webp` | 707,096 B | 33.087 s | 1280×720 |
| Binance Web3 钱包如何创建和备份？ | `assets/videos/web3-wallet.mp4` | `assets/videos/binance/web3-wallet.mp4` | `assets/images/video-covers/binance/web3-wallet.webp` | 786,443 B | 37.034 s | 1280×720 |
| Binance bStocks 怎么查看行情与交易美股？ | `assets/videos/bstocks.mp4` | `assets/videos/binance/bstocks.mp4` | `assets/images/video-covers/binance/bstocks.webp` | 786,444 B | 57.305 s | 1280×720 |

Equitova source repository was not modified. The CoinVoyu copies do not use Equitova URLs, expiring Notion URLs or third-party runtime media paths.

## Final Binance catalog

1. 苹果—币安 APP 下载指南
2. 如何注册币安账户
3. 如何完成币安身份验证
4. 如何通过币安 C2C 自选区买卖加密货币
5. 如何正确选择网络，避免转账错误
6. 如何在币安 APP 交易现货
7. 如何在币安进行加密货币提现
8. Binance 防钓鱼码怎么开启？
9. Binance 怎么设置 Passkey 通行密钥？
10. Binance 怎么设置价格提醒？
11. Binance Web3 钱包如何创建和备份？
12. Binance bStocks 怎么查看行情与交易美股？

Final counts:

- Binance real direct-play videos: **12**
- Binance empty/source-only placeholder cards: **0**
- OKX videos: **32**
- Total video cards: **44**
- Gate videos: **0**

The two entries `一个视频搞懂区块链网络` and `如何在币安 APP 启用双重身份验证` were removed completely from visible cards, source-only markup, counters and schema. Obsolete source-card CSS was removed.

## Player, performance and metadata implementation

- Native HTML5 player created only after a poster-button click for all 12 Binance lessons.
- `controls`, `playsinline`, `preload="metadata"`, poster and no autoplay retained.
- All 12 Binance MP4 files are local H.264/AAC, fast-start assets.
- All 32 OKX players remain present; `playsinline` was added and their preload was reduced from `metadata` to `none` so the initial page does not request 32 media files.
- The visible hero, platform summary, learning-path count and library count now consistently state 12 Binance + 32 OKX.
- JSON-LD parses successfully and now contains separate 12-item Binance and 32-item OKX `ItemList` objects.
- New cards include accurate alt text, source attribution and real internal tutorial links.

## Real Preview media QA

### Binance

All twelve Binance cards were clicked in the current Preview. Each created a real `<video>`, reached `readyState = 4`, returned no `MediaError`, and advanced `currentTime`.

| Result | Count |
|---|---:|
| Metadata / media ready | 12 / 12 |
| Playback time advanced | 12 / 12 |
| Media errors | 0 |
| External-page-only playback | 0 |

Pause and resume were explicitly verified on the bStocks player: `paused` changed to true and then false, and `currentTime` continued advancing.

### OKX

All 32 existing OKX players were exercised in the Preview in two batches. Every video loaded and advanced playback time; no media error occurred.

- Tested: **32 / 32**
- Playback PASS: **32 / 32**
- Failed: **0**
- No OKX card was removed.

### Filters

- Binance platform filter: **12 visible**
- OKX platform filter: **32 visible**
- All platforms: **44 visible**
- Binance task counts: onboarding 3, funds 3, spot 2, security 3, advanced 1.
- Removed cards do not appear in the DOM.
- No duplicate Binance cards were found.

## V75 full-scope regression

### Commercial decision pages

The current Preview was opened and checked for `exchange.html`, `binance-vs-okx.html`, `binance-guide.html` and `okx-guide.html`.

- All pages loaded with their expected Title, H1 and canonical.
- All JSON-LD blocks parsed.
- Active navigation was `交易所`.
- No body-level horizontal overflow was observed at the available 1363 px desktop viewport.
- `exchange.html` and `binance-vs-okx.html` use Binance `DS1886` and OKX `DS1888` with the approved Main-site URLs.
- Binance guide contains no OKX referral; OKX guide contains no Binance referral.
- Internal links added by V75 point to real repository pages.

### Referral configuration

The earlier full Main-site V75 referral audit remains valid. This final batch changed only `videos.html` and local media assets before the roadmap update.

- Main Binance: `DS1886` + `https://www.bsmkweb.cc/register?ref=DS1886`
- Main OKX: `DS1888` + `https://www.mitxcqvwnhj.com/join/DS1888`
- `topzhjdgxcb.com`: no residue in the completed V75 scan.
- `/tw/`: no diff from main and no Main-site codes introduced.
- Affiliate-domain final redirect and partner-backend commission attribution remain **NOT VERIFIED / NOT CLAIMED**, because they are external-account facts.

### GA4

`analytics-main.js` still gates analytics behind the existing consent choice and defines single delegated handlers for `referral_click` and `referral_code_copy`. No second V75 tracking implementation was added in this batch. Registration or commission improvement is **NOT AVAILABLE / NOT CLAIMED**.

### Homepage hotspots

The Preview homepage currently shows the three 2026-10-16 entries:

- BTC 短暂跌破 8 万美元：杠杆为何放大跌势？
- Strategy 会被 MSCI 指数剔除吗？
- 银行托管 BTC 和 ETH 意味着什么？

No homepage code was changed in V75.

### Git scope

Relative to main `752a2ef195040290d5bb63f8d187437084f137da`, the V75 branch changes remain limited to:

- the complete roadmap;
- `analytics-main.js`;
- `exchange.html`;
- `binance-vs-okx.html`;
- `binance-guide.html`;
- `okx-guide.html`;
- `videos.html`;
- twelve Binance MP4 files;
- twelve Binance WebP posters.

No `/tw/` file, Equitova file, global navigation file, sitemap or unrelated article was modified.

## Desktop and mobile QA status

- Desktop Preview functional QA: **PASS**
- Desktop commercial-page regression: **PASS**
- Desktop body overflow check on the four commercial pages: **PASS**
- Video cards, posters, filtering and playback: **PASS**
- Responsive CSS static inspection: **PASS** (one-column video grid at max-width 620 px; platform gateway at max-width 680 px; mobile header rules at max-width 760 px)
- Exact 390 px rendered browser simulation: **NOT VERIFIED — ENVIRONMENT LIMITATION**

The available cloud browser viewport was fixed at 1363×936. The local Playwright package had no installed Chromium executable, and the browser security policy rejected a data-URL iframe test harness. No prohibited workaround or new browser installation was attempted. This limitation must not be described as a 390 px PASS. User-device manual 390 px acceptance remains the only release-candidate check not completed in this environment.

Cloud-browser console logs contained extension-only metadata errors from `chrome-extension://kcdongibgcplmaagnmgpjhpjgmmaaaaa/`; no site-script or media decoding error was observed.

## Completed

- Five remaining verified Equitova assets and posters copied to CoinVoyu.
- Twelve genuine direct-play Binance entries completed.
- Two empty/source-only entries fully removed.
- Thirty-two OKX videos retained and all 32 playback-tested.
- Filter counts, player controls, schema, internal links, metadata, desktop commercial pages, referral configuration and homepage hotspot state checked.
- Preview deployed successfully for the latest code commit.
- Full history preserved in this roadmap.

## Pending

- Manual 390 px visual acceptance on a real browser/device or a browser environment that supports viewport emulation.
- User acceptance of the release candidate.
- PR creation / merge and Production release only after explicit approval.
- V74 remains not started.

## Next batch

No further V75 coding batch is planned. The next action is human Preview acceptance, with particular attention to 390 px mobile layout. After acceptance, review the exact PR diff and proceed only under separate merge / Production authorization. V74 must not start automatically.

## Known issues / objective limitations

- Exact 390 px render was not available in this execution environment.
- Affiliate final redirect and commission attribution are not verified.
- GSC samples remain small; no SEO or conversion gain is claimed.
- Google index/GSC migration for the old BTC/USDT URL remains pending separate verification.
- Older broken hotspot-cover references already recorded outside V75 scope remain unchanged.

## Final V75 release-candidate status

- `BINANCE VIDEO COUNT: 12`
- `EMPTY PLACEHOLDER CARDS: 0`
- `OKX VIDEO COUNT: 32`
- `V75 FULL QA: PARTIAL — EXACT 390PX RENDER NOT VERIFIED`
- `ROADMAP UPDATE: PASS`
- `PREVIEW DEPLOYMENT: PASS`
- `PRODUCTION CHANGED: NO`
- `MAIN MERGED: NO`
- `EQUITOVA CHANGED: NO`
- `TAIWAN SITE CHANGED: NO`
- `V74 STARTED: NO`

**ROADMAP UPDATE: PASS**


---

# 2026-10-23 — V74 Commercial Search Foundation & SEO Growth

## Scope and evidence

Status: **IMPLEMENTED ON PREVIEW BRANCH — NOT MERGED / NOT IN PRODUCTION**

This V74 batch reused the verified GSC evidence already recorded in the 2026-10-20 audit. No new GSC extraction or SEO AI refresh was run.

- GSC property: `sc-domain:coinvoyu.com` (includes the main site and `/tw/`; aggregate metrics are not a main-site-only total).
- `/btc-usdt-difference.html`: 19 impressions, average position 6.21; query `btc usdt 意思`: 3 impressions, average position 4.67.
- `/binance-referral-code.html`: 10 impressions, average position 16.50; query `referral code 怎么填`: average position 7.00.
- `币安邀请码没输入`: confirmed early query signal for `/binance-missed-referral-code.html`.
- `/okx-referral-code.html`: existing commercial click must be protected.
- GSC sample sizes remain small. No traffic, CTR, ranking, registration or commission improvement is claimed.

## Actual implementation

### 1. `/bitcoin-usdt.html`

- Updated Title and H1 to: `BTC/USDT 是什么意思？BTC 与 USDT 的区别`.
- Updated Meta Description, Open Graph copy and Article headline/description to match the real page intent.
- Rewrote the opening paragraph to answer the query immediately.
- Added an early explanation of base asset, quote asset, how to read a BTC/USDT price, and the risks that remain with USDT.
- Added natural links to `spot-trading.html` and `exchange.html`.
- Updated the genuine page review/dateModified value to 2026-10-23.
- Preserved canonical: `https://www.coinvoyu.com/bitcoin-usdt.html`.

### 2. `/binance-referral-code.html`

- Kept the existing Title, Meta Description and H1.
- Changed the opening answer to state directly that “Referral Code” means 邀请码 / 推荐码.
- Preserved the approved main-site Binance code `DS1886` and existing approved link.
- Existing visible FAQ and FAQPage schema remain aligned.
- Updated the genuine page review/dateModified value to 2026-10-23.

### 3. `/binance-missed-referral-code.html`

- Kept the existing Title and Meta Description.
- Reframed the opening as a state-based path: registration not completed, registered account, and possible recall eligibility.
- Explicitly states that “90 days” is not a universal guarantee.
- Adjusted source-scope language so changing account eligibility and current Binance support results take precedence.
- Preserved `DS1886` and existing natural links.
- Updated the genuine page review/dateModified value to 2026-10-23.

### 4. `/okx-referral-code.html`

- Kept the existing Title, Meta Description, H1 and conversion path.
- Preserved main-site OKX code `DS1888` and approved link `https://www.mitxcqvwnhj.com/join/DS1888`.
- Added a visible FAQ: “欧易邀请码填不了怎么办？” with a matching FAQPage entity.
- The answer follows current OKX guidance: reopen the referral link or input field before registration is completed; a completed account generally cannot add or change the code.
- Updated source-review and dateModified values to 2026-10-23.

### 5. `/binance-kyc-failed.html`

- Kept the existing Title, Meta Description, H1 and troubleshooting structure.
- Added “Binance KYC 可以重置吗？” as a visible section and matching FAQPage entity.
- The answer distinguishes account-specific update/reset/appeal entry points from a universal reset promise.
- Added a direct Binance official-support path and retained the warning not to create duplicate accounts.
- Updated source-review and dateModified values to 2026-10-23.

### 6. `/videos.html`

- Changed all 12 Binance poster-button labels from “站内播放” to the concise visible label “播放”.
- Retained the play icon, descriptive `aria-label`, player behavior, assets and filters.
- Binance count remains 12; OKX count remains 32.

## Deliberately not modified

- `/okx-guide.html`: its current Title, Meta, H1 and links already support registration/download intent; no evidence justified another rewrite.
- `/exchange.html` and `/binance-vs-okx.html`: V75 content remained unchanged; only regression checks were performed.
- Homepage hot topics: the latest repository-backed, sitemap-listed set remains dated 2026-10-16. No newer verified content exists in the current branch, so `index.html` was not changed and no date/news was fabricated.
- `/tw/`: no files changed.
- No new URL was created; no broad article rewrite was performed.

## Technical SEO and conversion QA

- Old URL `/btc-usdt-difference.html` remains a permanent Vercel redirect to `/bitcoin-usdt.html`.
- Sitemap contains the formal target URL once and the old URL zero times.
- Target canonical points to `https://www.coinvoyu.com/bitcoin-usdt.html`.
- Modified-page JSON-LD parsed successfully.
- Visible FAQ and FAQPage entities match on the two pages where FAQ items were added.
- Internal-link and asset-path validation against the 678-entry branch tree found no missing target among modified pages; `/tw/` is a valid directory route.
- `robots.txt` remains open to OAI-SearchBot, PerplexityBot and general crawlers and points to both sitemaps.
- Existing GA4 logic was inspected and left unchanged: consent is required, duplicate initialization is guarded, referral clicks and referral-code copy actions are delegated once, and `/tw/` exits before main-site analytics loads.
- Google index migration from the old BTC/USDT URL remains **NOT VERIFIED**.
- Commission attribution and final affiliate-backend ownership remain **NOT AVAILABLE**.

## Preview browser QA

Preview checked at:

`https://coinvoyu-git-feature-v75-v74-commercial-search-brandfang520.vercel.app/`

Desktop browser checks completed for:

- `bitcoin-usdt.html`
- `binance-referral-code.html`
- `binance-missed-referral-code.html`
- `okx-referral-code.html`
- `binance-kyc-failed.html`
- `exchange.html`
- `binance-vs-okx.html`
- `okx-guide.html`
- `videos.html`

Results:

- Correct Title, H1 and canonical on inspected pages.
- No broken images on inspected pages.
- JSON-LD parsed on inspected pages.
- No page-content console errors were observed; cloud-browser extension metadata errors were external to the site.
- The legacy BTC/USDT URL navigated to the formal target URL in Preview.
- Video filter displayed exactly 12 Binance cards and 32 OKX cards.
- All 12 Binance buttons exposed visible wording “播放”.
- First Binance video loaded metadata, reached `readyState=4`, started playback and advanced `currentTime`; pause/replay logic is unchanged from V75.
- Desktop screenshot inspection showed normal card layout and play controls.

Exact 390 px viewport QA: **NOT VERIFIED**. The available cloud browser did not expose viewport resizing/emulation. This must remain a manual acceptance item and is not reported as a simulated or real-device pass.

## Git and deployment state

- Current branch: `feature/v75-v74-commercial-search`.
- V74 implementation commit: `cf513b2f66b9d73fab8e18d6a23ba27255225711`.
- Vercel status for the implementation commit: success.
- Production: unchanged.
- Main: not merged.
- This roadmap update is documentation only; its commit is reported in the delivery summary after Git assigns the SHA.

## Completed

- V74 commercial search changes for the five evidence-backed pages.
- Conservative FAQ/content additions for OKX referral and Binance KYC.
- BTC/USDT search-intent alignment on the formal target URL.
- Binance video button copy correction.
- Targeted canonical, redirect, sitemap, robots, Schema, internal-link and GA4 review.
- Desktop Preview regression of V74 pages and V75 core pages.
- Homepage hotspot freshness review with a no-change decision based on available content.
- `/tw/` isolation preserved.

## Pending

- Manual 390 px Preview acceptance.
- User review of this V75 + V74 release candidate.
- PR/merge and Production deployment only after explicit authorization.
- Post-release complete 28-day GSC comparison for the target queries and pages.
- Google old/new BTC/USDT URL index attribution verification.

## Next Batch

1. User manually checks the Preview at 390 px, focusing on the six changed pages and video filters.
2. Review the exact PR diff from main to this branch.
3. If accepted, merge V75 + V74 once and perform one Production release.
4. After a complete 28-day window, record clicks, impressions, CTR and position for the target queries; do not use daily fluctuations as the success criterion.

## Known Issues / Objective Limitations

- Exact 390 px render is not available in this execution environment.
- GSC evidence is early and low-volume.
- Google index migration for `/btc-usdt-difference.html` → `/bitcoin-usdt.html` is not confirmed.
- Current public Binance search results did not independently establish the “90-day” rule as a universal policy; the page therefore retains conditional wording and defers to account-specific official results.
- Affiliate commission attribution is not verifiable from page code.
- Homepage hot topics remain at 2026-10-16 because no newer verified article set exists in the current branch.

## V74 Candidate Status

- `V74 IMPLEMENTATION: COMPLETE ON BRANCH`
- `DESKTOP PREVIEW QA: PASS`
- `MOBILE 390PX QA: NOT VERIFIED`
- `SCHEMA / CANONICAL / REDIRECT / SITEMAP: PASS`
- `VIDEO LABEL / FILTER / DIRECT PLAY REGRESSION: PASS`
- `TAIWAN SITE CHANGED: NO`
- `PRODUCTION CHANGED: NO`
- `MAIN MERGED: NO`

**ROADMAP UPDATE: PASS**


---

# 2026-10-23 — V75 + V74 Final Merge, Production Release & Post-Deployment QA

## Release status

Status: **COMPLETE — MERGED AND DEPLOYED TO PRODUCTION**

- Functional branch: `feature/v75-v74-commercial-search`
- Final reviewed branch HEAD: `1ce21d36a2cb18b23e83be8ff7d5f9d9b71bdd75`
- Pull Request: [#14](https://github.com/brandfang520/coinvoyu/pull/14)
- PR changed files: 36
- PR commits: 12
- Main merge commit: `0fa076da76d6ce82ce87a7658eaad85aa22223ab`
- Production environment: Vercel Production
- Production deployment: **READY**
- Production deployment source: `main` at `0fa076da76d6ce82ce87a7658eaad85aa22223ab`
- Deployment ID: `DB5H9yXAAw8jm7k3KmxM6cowJdyC`
- Production URL: <https://www.coinvoyu.com/>
- Deployment completed: 2026-10-23 01:55 UTC
- User manual Preview/mobile acceptance: **PASS**
- New GSC extraction in this release task: **NOT AVAILABLE / NOT RUN**

## Final diff and isolation

The complete feature branch was reviewed relative to the previous main `752a2ef195040290d5bb63f8d187437084f137da`.

- Ahead: 12 commits
- Behind: 0 commits
- Changed files: 36
- Modified scope: roadmap, main-site analytics, V75/V74 commercial pages, 12 Binance MP4 files, 12 Binance WebP posters and `videos.html`.
- `/tw/` files changed: **NO**
- Equitova changed: **NO**
- Gate videos added: **NO**
- No new duplicate commercial URL was created.

## Production referral configuration

Production page configuration was verified on the homepage, exchange Hub, comparison page and affected guide/referral pages.

- Binance referral code: `DS1886`
- Binance registration URL: `https://www.bsmkweb.cc/register?ref=DS1886`
- OKX referral code: `DS1888`
- OKX registration URL: `https://www.mitxcqvwnhj.com/join/DS1888`
- Visible code and href alignment: **PASS**
- Binance/OKX cross-use in affected pages: **NOT FOUND**
- Old `topzhjdgxcb.com` residue in reviewed release diff: **NOT FOUND**
- Affiliate-domain final redirect and partner-backend commission attribution: **NOT VERIFIED / NOT CLAIMED**

## Production video QA

Production `videos.html` was opened after the main deployment and checked against the deployed release.

- Binance video count: **12**
- OKX video count: **32**
- Total video cards: **44**
- Empty/source-only placeholder cards: **0**
- `一个视频搞懂区块链网络`: **ABSENT**
- `如何在币安 APP 启用双重身份验证`: **ABSENT**
- Visible Binance play-button label: **播放**
- Broken video-cover images in the checked page: **0**
- Binance filter result: **12**
- OKX filter result: **32**
- First Binance local MP4: HTTP resource loaded, `readyState = 4`, duration 45.903991 seconds and `currentTime` advanced during playback.
- Pause/resume control state was exercised in Production; the player remained on the same CoinVoyu page.
- No external-page-only playback card remains.

The user's prior manual mobile Preview acceptance is retained. Production was additionally checked in the available cloud browser; an exact new 390 px viewport emulation was not available in this environment and is not claimed as a second device-level test.

## Production page and SEO QA

Production pages checked:

- `/`
- `/exchange.html`
- `/binance-vs-okx.html`
- `/bitcoin-usdt.html`
- `/binance-referral-code.html`
- `/binance-missed-referral-code.html`
- `/okx-referral-code.html`
- `/binance-kyc-failed.html`
- `/binance-guide.html`
- `/okx-guide.html`
- `/videos.html`

Results:

- Expected Title, H1 and canonical: **PASS**
- JSON-LD parsing on checked pages: **PASS**
- Visible FAQ and FAQPage exact consistency on the two final corrected pages: **PASS**
- Broken images on checked pages: **0**
- Approved referral links on applicable pages: **PASS**
- Old `/btc-usdt-difference.html` redirected to `/bitcoin-usdt.html`: **PASS**
- Formal `/bitcoin-usdt.html` canonical: **PASS**
- Sitemap contains `/bitcoin-usdt.html`: **PASS**
- Sitemap does not contain the retired `/btc-usdt-difference.html`: **PASS**
- Google index/GSC attribution migration for the old URL: **NOT VERIFIED**
- Registration, commission or SEO uplift: **NOT AVAILABLE / NOT CLAIMED**

## Final delivery state

### Completed

- V75 commercial decision layer merged.
- V74 commercial search foundation merged.
- Twelve Binance direct-play videos and thirty-two OKX videos deployed.
- Referral codes and approved main-site URLs deployed.
- BTC/USDT intent, referral-code and KYC page improvements deployed.
- GA4 consent guard, event deduplication and `/tw/` isolation preserved.
- Production deployment and post-deployment browser QA completed.
- Historical roadmap retained and this release record appended.

### Pending / monitoring

- Monitor a complete 28-day GSC window before judging CTR or ranking effects.
- Verify Google index/GSC signal migration from the old BTC/USDT URL when data becomes available.
- Affiliate commission attribution remains outside page-code verification.
- Existing older hotspot-cover issue remains outside this release scope.

### Next batch

Do not reopen V75/V74 unless Production evidence shows a regression. The next minimum action is monitoring: compare the target queries and pages after a complete 28-day GSC window, while protecting the stable URLs and deployed conversion paths.

### Current handoff

- Current functional branch: `feature/v75-v74-commercial-search`
- Functional release commit: `0fa076da76d6ce82ce87a7658eaad85aa22223ab`
- Current Production URL: <https://www.coinvoyu.com/>
- V75: **COMPLETE / PRODUCTION**
- V74: **COMPLETE / PRODUCTION**
- Preview QA: **PASS**
- User manual mobile Preview QA: **PASS**
- Production QA: **PASS**
- Production deployment: **PASS**
- Roadmap release record: **APPENDED**

`V75: MERGED`

`V74: MERGED`

`BINANCE VIDEO COUNT: 12`

`OKX VIDEO COUNT: 32`

`VIDEO PLAY BUTTON LABEL: 播放`

`BINANCE REFERRAL CODE: DS1886`

`OKX REFERRAL CODE: DS1888`

`TAIWAN SITE CHANGED: NO`

`EQUITOVA CHANGED: NO`

**ROADMAP UPDATE: PASS**
