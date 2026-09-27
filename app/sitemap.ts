import type { MetadataRoute } from "next";
import { places, servicePlaceHref } from "@/lib/areas";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...services.map((service) => ({
      url: `${site.url}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...services.flatMap((service) =>
      places.map((place) => ({
        url: `${site.url}${servicePlaceHref(service.slug, place.slug)}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.5,
      })),
    ),
    { url: `${site.url}/privacy`, lastModified: now, priority: 0.2 },
    { url: `${site.url}/terms`, lastModified: now, priority: 0.2 },
  ];
}
