import { siteConfig } from "@/lib/seo-config";

export const dynamic = 'force-static';

export default function manifest() {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f172a",
    categories: ["productivity", "business", "utilities"],
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "New Resume",
        url: "/",
        icons: [{ src: "/icon.png", sizes: "192x192" }]
      },
      {
        name: "About Us",
        url: "/aboutus",
        icons: [{ src: "/icon.png", sizes: "192x192" }]
      }
    ],
    screenshots: [
      {
        src: "/pwa/desktop-wide.png",
        sizes: "2560x1334",
        type: "image/png",
        form_factor: "wide",
        label: "QPkendra Desktop Editor"
      },
      {
        src: "/pwa/mobile-narrow.png",
        sizes: "390x844",
        type: "image/png",
        form_factor: "narrow",
        label: "QPkendra Mobile Editor"
      }
    ],
  };
}
