import { FaqList } from "@/components/FaqList";
import { PageIntro } from "@/components/PageIntro";
import { company, phones } from "@/content/contacts";
import { faqItems } from "@/content/faq";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Поддержка",
  description: "Телефон техподдержки Топком, частые вопросы и порядок заявления о перерасчёте.",
  path: "/support/",
});

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro title="Поддержка">
        <p>Техподдержка отвечает в часы офиса.</p>
      </PageIntro>
      <p className="text-3xl">
        <a href={phones.support.href}>{phones.support.display}</a>
      </p>
      <p className="mt-2 text-[#B7C3D4]">
        Общий телефон: <a href={phones.general.href}>{phones.general.display}</a>
      </p>
      <p className="mt-2 text-[#B7C3D4]">
        {company.officeHours}, {company.officeBreak}
      </p>
      <section className="mt-10" aria-labelledby="faq">
        <h2 id="faq" className="text-3xl">Вопросы</h2>
        <div className="mt-4 max-w-3xl">
          <FaqList items={faqItems} />
        </div>
      </section>
    </div>
  );
}
