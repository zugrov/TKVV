const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() ?? "";

function readPublicSiteUrl(): string | null {
  if (!configuredSiteUrl) {
    return null;
  }
  try {
    const url = new URL(configuredSiteUrl);
    const host = url.hostname;
    const isLocal = host === "localhost" || host === "127.0.0.1" || host.endsWith(".local");
    if (isLocal || (url.protocol !== "https:" && url.protocol !== "http:")) {
      return null;
    }
    return url.origin;
  } catch {
    return null;
  }
}

export const siteUrl = readPublicSiteUrl();

export const isIndexable = siteUrl !== null;

export const siteName = "Топком";

export const defaultDescription =
  "Интернет ООО «Топком» в Вышнем Волочке и Вышневолоцком городском округе. " +
  "Тарифы за сутки и два способа оплаты.";
