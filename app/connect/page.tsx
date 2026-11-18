import { PageIntro } from "@/components/PageIntro";
import { SelectedTariff } from "@/components/SelectedTariff";
import { company, connectionPrices, connectionSteps, phones } from "@/content/contacts";
import { formatRub } from "@/content/money";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Подключение",
  description: "Ориентир стоимости оптики и телефон для проверки адреса в сети Топком.",
  path: "/connect/",
});

export default function ConnectPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro title="Проверить возможность подключения">
        <p>
          Сотрудник подтверждает возможность, итоговую смету и срок. Срок не отсчитывается от
          визита на сайт.
        </p>
      </PageIntro>
      <div className="mb-8">
        <SelectedTariff />
      </div>
      <section aria-labelledby="prices">
        <h2 id="prices" className="text-3xl">Ориентир по оптике в частном секторе</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-3">
          {connectionPrices.map((item) => (
            <li key={item.place} className="rounded-2xl border border-[#39E6D0]/25 bg-[#111D2F] p-4">
              <p>{item.place}</p>
              <p className="mt-2 text-2xl text-[#39E6D0]">{formatRub(item.priceRub)}</p>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[#B7C3D4]">
          Аванс включает стоимость подключения и аванс абонентской платы. Итог называет сотрудник.
        </p>
      </section>
      <section className="mt-10" aria-labelledby="steps">
        <h2 id="steps" className="text-3xl">Этапы</h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-5">
          {connectionSteps.map((step, index) => (
            <li key={step} className="rounded-2xl border border-[#39E6D0]/25 bg-[#111D2F] p-4">
              <span className="text-[#39E6D0]">{index + 1}</span>
              <p className="mt-2">{step}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="mt-10" aria-labelledby="call">
        <h2 id="call" className="text-3xl">Позвонить</h2>
        <p className="mt-3 max-w-2xl text-[#B7C3D4]">
          Адрес и тариф сотрудник проверит по телефону. Формы заявки на сайте нет.
        </p>
        <a
          href={phones.general.href}
          className="mt-4 inline-flex min-h-11 items-center rounded-xl border border-[#39E6D0] bg-[#0E3B36] px-4 py-3 font-bold text-[#F4F7FB]"
        >
          Позвонить {phones.general.display}
        </a>
        <p className="mt-3 text-sm text-[#B7C3D4]">
          Офис: {company.officeHours}, {company.officeBreak}.
        </p>
      </section>
    </div>
  );
}
