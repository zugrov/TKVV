import type { Metadata } from "next";

import { defaultDescription, isIndexable, siteName, siteUrl } from "@/content/site";

type PageMetaInput = {
  title: string;
  description?: string;
  path: string;
};

export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  const fullTitle = title === siteName ? title : `${title} — ${siteName}`;
  const canonical = siteUrl ? `${siteUrl}${path}` : undefined;

  return {
    title: { absolute: fullTitle },
    description: description ?? defaultDescription,
    alternates: canonical ? { canonical } : undefined,
    robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      title: fullTitle,
      description: description ?? defaultDescription,
      locale: "ru_RU",
      type: "website",
      url: canonical,
      siteName,
    },
  };
}
