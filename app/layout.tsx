import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Announcement } from "@/components/Announcement";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { defaultDescription, siteName, siteUrl } from "@/content/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: { default: siteName, template: `%s — ${siteName}` },
  description: defaultDescription,
  openGraph: { locale: "ru_RU", siteName, type: "website" },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru">
      <body>
        <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10 focus:bg-[#39E6D0] focus:px-3 focus:py-2 focus:text-[#08111F]">
          К содержанию
        </a>
        <Header />
        <Announcement />
        <main id="content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
