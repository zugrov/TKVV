import type { MetadataRoute } from "next";

import { siteUrl } from "@/content/site";

const paths = [
  "/",
  "/tariffs/",
  "/connect/",
  "/pay/",
  "/support/",
  "/business/",
  "/contacts/",
  "/documents/",
  "/privacy/",
  "/consent/",
];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteUrl ?? "http://localhost";
  return paths.map((path) => ({
    url: `${origin}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.6,
  }));
}
