import siteMetadata from "@/data/siteMetadata";

export default function sitemap() {
  return [
    {
      url: siteMetadata.siteUrl,
      lastModified: new Date().toISOString().split("T")[0],
    },
  ];
}
