import { LegalArticle } from "@/components/LegalArticle";
import { PageIntro } from "@/components/PageIntro";
import { privacySections } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Политика",
  description: "Политика обработки персональных данных ООО «Топком» для публичного сайта.",
  path: "/privacy/",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro title="Политика обработки персональных данных" />
      <LegalArticle sections={privacySections} />
    </div>
  );
}
