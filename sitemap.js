export default function sitemap() {
  const base = "https://coinvoyu.com";
  return [
    { url: base, lastModified: new Date() },
    ...["beginner","bitcoin","ethereum","security","exchange","web3"].map(slug => ({url:`${base}/category/${slug}`,lastModified:new Date()})),
    ...["1","2","3","4"].map(id => ({url:`${base}/article/${id}`,lastModified:new Date()}))
  ];
}