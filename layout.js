import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://coinvoyu.com"),
  title: {
    default: "CoinVoyu｜数字资产与区块链新手指南",
    template: "%s｜CoinVoyu"
  },
  description: "CoinVoyu 专注数字资产、区块链、钱包安全与交易平台使用知识，帮助新手建立清晰、安全的入门认知。",
  keywords: ["区块链", "数字资产", "比特币", "以太坊", "钱包安全", "新手教程", "Web3"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}