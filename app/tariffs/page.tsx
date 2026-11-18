import { PageIntro } from "@/components/PageIntro";
import { TariffCard } from "@/components/TariffCard";
import { extraServices, tariffRules, tariffsByTerritory, territories } from "@/content/tariffs";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Тарифы",
  description: "Суточные тарифы ООО «Топком» для Вышнего Волочка, Серебряников и Садового.",
  path: "/tariffs/",
});

export default function TariffsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro title="Тарифы">
        <p>
          Цена указана за сутки. Сумма за 30 дней получается умножением и не является
          фиксированной месячной платой.
        </p>
      </PageIntro>
      <ul className="mb-8 grid gap-2 text-[#B7C3D4]">
        {tariffRules.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ul>
      {territories.map((territory) => (
        <section key={territory.id} className="mb-10" aria-labelledby={territory.id}>
          <h2 id={territory.id} className="text-3xl">{territory.name}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {tariffsByTerritory(territory.id).map((tariff) => (
              <TariffCard key={tariff.id} tariff={tariff} />
            ))}
          </div>
        </section>
      ))}
      <section aria-labelledby="extra-services">
        <h2 id="extra-services" className="text-3xl">Дополнительные услуги</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {extraServices.map((service) => (
            <li key={service.id} className="rounded-2xl border border-[#39E6D0]/25 bg-[#111D2F] p-4">
              <p>{service.name}</p>
              <p className="text-[#39E6D0]">{service.price}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[#B7C3D4]">
          Для других населённых пунктов сетка тарифов на сайте не публикуется. Позвоните, сотрудник
          проверит адрес.
        </p>
      </section>
    </div>
  );
}
