import type { MetadataRoute } from "next";
import { localizedPath, localizedRoutes } from "@/lib/i18n";
import { site } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return localizedRoutes.flatMap((route) => {
    const changeFrequency = route === "/" || route === "/daily-crypto-brief" ? "daily" : "weekly";
    const priority = route === "/" ? 1 : 0.8;
    const zhUrl = `${site.url}${localizedPath(route, "zh")}`;
    const enUrl = `${site.url}${localizedPath(route, "en")}`;

    return [
      {
        url: zhUrl,
        lastModified,
        changeFrequency,
        priority,
        alternates: {
          languages: {
            "zh-Hant": zhUrl,
            en: enUrl,
            "x-default": zhUrl
          }
        }
      },
      {
        url: enUrl,
        lastModified,
        changeFrequency,
        priority: Math.max(priority - 0.05, 0.6),
        alternates: {
          languages: {
            "zh-Hant": zhUrl,
            en: enUrl,
            "x-default": zhUrl
          }
        }
      }
    ];
  });
}
