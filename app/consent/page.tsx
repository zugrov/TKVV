import Link from "next/link";

import { LegalArticle } from "@/components/LegalArticle";
import { PageIntro } from "@/components/PageIntro";
import { consentSections, consentVersion } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Согласие",
  description: "Отдельный текст согласия на обработку персональных данных для рассмотрения заявки.",
  path: "/consent/",
});

export default function ConsentPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro title="Согласие на обработку персональных данных">
        <p>Версия {consentVersion}. Это не договор и не согласие на рекламу.</p>
      </PageIntro>
      <LegalArticle sections={consentSections} />
      <p className="mt-8">
        <Link href="/privacy/" className="text-[#39E6D0]">
          Политика обработки персональных данных
        </Link>
      </p>
    </div>
  );
}
