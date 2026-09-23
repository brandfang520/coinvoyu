# CoinVoyu V60 SEO + GEO 巡检与修复报告

## 审计范围

- 正式域名（按 canonical、sitemap 与 robots 定义）：`https://www.coinvoyu.com/`
- 站点根目录：本压缩包的 `coinvoyu-main/`
- HTML 源文件：73 个
- 修复后应收录的逻辑页面：72 个（首页根路径 + 71 个 `.html` 页面）
- 永久跳转别名：`/index.html` → `/`；`/btc-usdt-difference.html` → `/bitcoin-usdt.html`
- 资源：`style.css`、2 张 Hero 图、32 张视频封面、32 个本地视频

## SEO 审计结果

| 项目 | 修复前 | 修复后 | 证据 |
| --- | --- | --- | --- |
| 正文可在 HTML 源码直接读取 | 通过 | 通过 | `index.html:48`、`bitcoin-usdt.html:37` |
| 每页一个清晰主题 | 发现 1 组高度重叠 | 通过 | `vercel.json:8-11` 将旧 BTC/USDT 页面永久跳转到保留页 |
| 独立 title，40 字以内 | 3 页超长 | 通过，73/73 | `articles.html:9`、`categories.html:9`、`ethereum-guide.html:15` |
| 独立 meta description | 73 页均有，20 页过短 | 通过，73/73 且无重复 | 例如 `eth.html:3`、`stablecoin.html:3` |
| sitemap 覆盖应收录页面 | 73 条，含重复页 | 通过，72/72 | `sitemap.xml`；重复页已移除 |
| sitemap 自动随构建更新 | 不通过 | 待办 | 当前项目是无构建流程的静态站，未擅自改变部署架构 |
| robots 无误封并指向 sitemap | 通过 | 通过并明确开放搜索型 AI | `robots.txt:1-10` |
| 每页 canonical | 通过 | 通过，73/73 | 首页 `index.html:8`；文章示例 `eth.html:5` |
| Google Search Console 条件 | 已完成 DNS 验证 | 通过 | GSC 已验证；sitemap 状态成功 |
| Bing Webmaster 条件 | 已导入 | 通过 | Bing 已完成导入；IndexNow 尚未接入 |
| 当前基线已记录 | 有 | 通过 | 见报告第三部分 |

## GEO 审计结果

| 项目 | 修复前 | 修复后 | 证据 |
| --- | --- | --- | --- |
| 关键结论段落可独立理解 | 核心页基本通过 | 通过 | 主题页的定义、表格、检查清单和风险提示均保留在源码正文 |
| Article + dateModified | 25 页重复 Article | 通过，58 个内容文章页均为单一 Article 且有真实 dateModified | `eth.html:19`；全站 JSON-LD 复检 0 错误 |
| FAQPage 与可见问答一致 | 12 页已有 | 通过，12/12 | `eth.html:20` 与页面可见 FAQ 一致 |
| llms.txt | 缺失 | 通过 | `llms.txt:1-21` |
| llms-full.txt | 缺失 | 通过 | `llms-full.txt:1-105`，覆盖 sitemap 全部 72 个网址 |
| 搜索型 AI 爬虫开放 | 由通配规则开放 | 通过并显式声明 | `robots.txt:1-5` |
| 训练型爬虫策略 | 通配规则下保持开放 | 未改变 | GPTBot、CCBot 未单独配置，等待站长决定 |

# ① 已修复

1. **修复 `/index.html` 重复首页问题**  
   - 全站 204 个首页内部链接由 `index.html` 改为 `/`。  
   - `vercel.json:3-7` 增加永久跳转 `/index.html` → `/`。  
   - 首页 canonical 继续指向 `https://www.coinvoyu.com/`（`index.html:8`）。

2. **合并 BTC/USDT 重复主题**  
   - 保留已有点击和较多展示的 `bitcoin-usdt.html`。  
   - 全站 9 个旧链接改到保留页。  
   - `vercel.json:8-12` 将 `btc-usdt-difference.html` 永久跳转到保留页。  
   - sitemap 移除旧重复 URL，避免关键词自相残杀。

3. **清理结构化数据**  
   - 删除 25 个页面中重复且缺少修改日期的旧 Article 数据。  
   - 保留含真实 `dateModified`、作者和发布者的 Article。  
   - JSON-LD 全站解析结果：0 错误；FAQ 可见内容匹配结果：0 不一致。

4. **补齐页面分享与抓取元数据**  
   - 34 个缺失页面补充 `og:title`、`og:description`、`og:type`、`og:url`、`og:site_name` 与 `twitter:card`。  
   - 修复后 73/73 页面均具备以上字段。

5. **优化标题与摘要**  
   - 缩短 `articles.html`、`categories.html`、`ethereum-guide.html` 的超长标题。  
   - 扩写 20 个过短但重要的 description，并保持每页内容独立、不堆关键词。

6. **建立主题簇回链**  
   - 56 个内容页增加“所属主题”回链，分别归入新手、Bitcoin、交易所、钱包安全、Ethereum/Web3、热点六组。  
   - 示例：`bitcoin-usdt.html:39` → Bitcoin 学习中心；`eth.html:34` → Ethereum/Web3 学习中心；`wallet.html:53` → Bitcoin 学习中心。  
   - `bitcoin-guide.html:114-127` 与 `wallet-guide.html:119-132` 增加子主题入口。  
   - 原来 0 个正文内链入口的 `wallet.html` 现在有 2 个主题页入口。

7. **新增 GEO 文件并开放搜索型 AI**  
   - 新增 `llms.txt` 和 `llms-full.txt`。  
   - `robots.txt` 明确允许 OAI-SearchBot、PerplexityBot，并继续允许普通搜索引擎。  
   - 没有擅自修改 GPTBot、CCBot 的训练抓取策略。

8. **完整性校验**  
   - 72 个应收录逻辑页面与 sitemap 完全一致。  
   - title、description、canonical：73/73。  
   - H1：73/73 每页恰好 1 个。  
   - HTML 语言：73/73 为 `zh-CN`。  
   - 站内失效链接：0。  
   - 缺失本地图片、CSS、视频资源：0。  
   - 重复 title、description、canonical：均为 0。  
   - `vercel.json` 和 `sitemap.xml` 均通过语法解析。

# ② 待站长手动完成（按优先级）

1. **部署 V60 包**  
   将修复包内容上传到 GitHub 仓库根目录，等待 Vercel Production 变绿。不要只上传报告文件。

2. **部署后验证两个永久跳转**  
   浏览器分别访问：  
   - `https://www.coinvoyu.com/index.html`，应自动进入 `https://www.coinvoyu.com/`；  
   - `https://www.coinvoyu.com/btc-usdt-difference.html`，应自动进入 `https://www.coinvoyu.com/bitcoin-usdt.html`。

3. **Google Search Console 复核，不要批量重复提交**  
   - 部署后用“网址检查”检查上面两个旧 URL，确认 Google 看到永久跳转。  
   - sitemap 已有原地址，不需要删除后重新添加；等待 Google 下次自动读取。  
   - 可优先检查四个支柱页：`beginner.html`、`bitcoin-guide.html`、`wallet-guide.html`、`ethereum-guide.html`。

4. **决定训练型 AI 爬虫策略**  
   当前 GPTBot、CCBot 仍通过 `User-agent: *` 保持开放。本轮没有擅自更改。站长需要决定以后“继续开放”还是“禁止训练抓取”。

5. **IndexNow**  
   Bing 已导入，但当前静态站没有构建脚本和 IndexNow 密钥。以后建立固定发布脚本时，再加入“部署后推送本次变更 URL”，避免为了接入 IndexNow 改动现有部署架构。

6. **sitemap 自动化**  
   当前 sitemap 内容正确，但项目没有构建流程。以后若改为固定构建或发布脚本，再把 sitemap 生成加入流程；本轮遵守“架构级修改先确认”的要求，没有擅自改变 Vercel 部署方式。

# ③ 当前基线数字

## Google Search Console（截图基线）

| 指标 | 数值 | 数据日期说明 |
| --- | ---: | --- |
| 已收录 | 28 | 索引报告截至 2026-09-18 |
| 未收录 | 55 | 索引报告截至 2026-09-18 |
| 已发现但尚未编入索引 | 45 | 当时均未显示抓取日期 |
| 已抓取但尚未编入索引 | 1 | `crypto-volatility.html`，已单独请求收录 |
| 重定向网页 | 8 | GSC 分类数字 |
| 重复网页、未选择规范页 | 1 | `/index.html`，本轮已修复源码与跳转 |
| 过去 3 个月点击 | 1 | 数据从 2026-09-11 开始出现 |
| 过去 3 个月展示 | 43 | 同上 |
| CTR | 2.3% | 同上 |
| 平均排名 | 11 | 同上 |

## V60 源码基线

| 指标 | 数值 |
| --- | ---: |
| HTML 源文件 | 73 |
| 应收录逻辑页面 | 72 |
| sitemap 条目 | 72 |
| 有独立 title 的页面 | 73/73（100%） |
| 有独立 description 的页面 | 73/73（100%） |
| 有 canonical 的页面 | 73/73（100%） |
| 有 OG/Twitter 元数据的页面 | 73/73（100%） |
| Article 结构化数据页面 | 58 |
| FAQPage 页面 | 12 |
| 主题簇回链页面 | 56 |
| 失效站内链接 | 0 |

说明：GSC 索引报告截至 9 月 18 日，sitemap 最近读取为 9 月 23 日，两者不是同一数据时点，因此不直接用 28÷72 计算最终收录率。部署 V60 后应先等待 Google 重新抓取，再用同口径数据比较。
