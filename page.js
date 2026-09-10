import Link from "next/link";

const data = {
  beginner: ["新手入门","从基础概念开始，逐步认识数字资产、账户、交易和安全。"],
  bitcoin: ["比特币","了解 BTC 的基本原理、交易和使用常识。"],
  ethereum: ["以太坊","了解 ETH、智能合约和以太坊生态基础。"],
  security: ["钱包安全","重点学习账号、钱包、助记词和反诈骗知识。"],
  exchange: ["交易平台","认识现货、订单、资金账户等常见功能。"],
  web3: ["Web3基础","从钱包、DApp 和链上交互开始认识 Web3。"]
};

const posts = [
  ["第一次接触数字资产，应该先了解哪些基本概念？","从交易平台、钱包、链上资产等概念开始。"],
  ["如何判断一个数字资产 App 是否安全？","学习下载来源、开发者信息和账号保护方法。"],
  ["比特币 BTC 是什么？新手入门指南","理解 BTC、区块链和转账确认。"],
  ["交易平台里的现货、限价单和市价单是什么意思？","认识常见订单类型和使用注意事项。"]
];

export default function Category({params}){
  const [title,desc] = data[params.slug] || ["文章分类","CoinVoyu 学习内容"];
  return <>
    <nav className="nav"><div className="container navin"><Link className="logo" href="/">Coin<span>Voyu</span></Link><div className="menu"><Link href="/category/beginner">新手入门</Link><Link href="/category/bitcoin">比特币</Link><Link href="/category/security">安全</Link><Link href="/category/exchange">交易平台</Link></div></div></nav>
    <main className="container">
      <div className="categoryHero"><Link className="back" href="/">← 返回首页</Link><h1>{title}</h1><p>{desc}</p></div>
      <div className="article-list">{posts.map((p,i)=><Link className="article" href={`/article/${i+1}`} key={p[0]}><div><h3>{p[0]}</h3><p>{p[1]}</p></div><span className="date">2026-09-{10-i}</span></Link>)}</div>
    </main>
    <footer className="footer"><div className="container"><strong>CoinVoyu</strong><p>内容仅供教育与信息参考。</p></div></footer>
  </>
}