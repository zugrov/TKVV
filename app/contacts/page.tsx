import { PageIntro } from "@/components/PageIntro";
import { company, mapUrl, phones } from "@/content/contacts";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Контакты",
  description: "Адрес, телефоны, почта и реквизиты ООО «Топком» в Вышнем Волочке.",
  path: "/contacts/",
});

export default function ContactsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro title="Контакты">
        <p>{company.legalName}</p>
      </PageIntro>
      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-2xl border border-[#39E6D0]/25 bg-[#111D2F] p-5">
          <h2 className="text-2xl">Офис</h2>
          <p className="mt-3">{company.postalAddress}</p>
          <p className="mt-2">
            {company.officeHours}, {company.officeBreak}
          </p>
          <p className="mt-2">
            Телефон: <a href={phones.general.href}>{phones.general.display}</a>
          </p>
          <p>
            Техподдержка: <a href={phones.support.href}>{phones.support.display}</a>
          </p>
          <p>
            {company.emailLabel}: <a href={`mailto:${company.email}`}>{company.email}</a>
          </p>
          <a href={mapUrl} rel="noopener noreferrer" className="mt-4 inline-block text-[#39E6D0]">
            Открыть карту
          </a>
        </section>
        <section className="rounded-2xl border border-[#39E6D0]/25 bg-[#111D2F] p-5">
          <h2 className="text-2xl">Реквизиты</h2>
          <p className="mt-3">ИНН {company.inn}</p>
          <p>КПП {company.kpp}</p>
          <p>ОГРН {company.ogrn}</p>
        </section>
      </div>
    </div>
  );
}
