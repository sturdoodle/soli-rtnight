import { siteConfig } from "@/lib/seo-config";

export default function sitemap() {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}

