import Link from "next/link";

import { PageIntro } from "@/components/PageIntro";
import { licenseSource, licenses } from "@/content/documents";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Документы",
  description: "Лицензии связи ООО «Топком», политика обработки данных и текст согласия.",
  path: "/documents/",
});

export default function DocumentsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro title="Документы">
        <p>
          Договор подписывается с сотрудником при подключении. Заявка на сайте договор не заменяет,
          файл договора здесь не публикуется.
        </p>
      </PageIntro>
      <section aria-labelledby="licenses">
        <h2 id="licenses" className="text-3xl">Лицензии</h2>
        <p className="mt-2 text-[#B7C3D4]">{licenseSource}. Срок действия до 11.04.2028.</p>
        <ul className="mt-4 grid gap-3">
          {licenses.map((license) => (
            <li key={license.id} className="rounded-2xl border border-[#39E6D0]/25 bg-[#111D2F] p-4">
              {license.number}
            </li>
          ))}
        </ul>
      </section>
      <nav className="mt-8 flex flex-col gap-2" aria-label="Правовые страницы">
        <Link href="/privacy/" className="text-[#39E6D0]">Политика обработки персональных данных</Link>
        <Link href="/consent/" className="text-[#39E6D0]">Согласие на обработку персональных данных</Link>
      </nav>
    </div>
  );
}
