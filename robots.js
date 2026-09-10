export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://coinvoyu.com/sitemap.xml",
  };
}