import Link from "next/link";

import { FaqList } from "@/components/FaqList";
import { TariffCard } from "@/components/TariffCard";
import { company, connectionSteps, phones } from "@/content/contacts";
import { faqItems } from "@/content/faq";
import { homeTariffs } from "@/content/tariffs";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Интернет в Вышнем Волочке и районе",
  description:
    "Тарифы ООО «Топком» за сутки, проверка подключения по телефону и два способа оплаты.",
  path: "/",
});

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <section className="relative overflow-hidden py-14 md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, transparent 42%, rgba(57,230,208,.4) 43%, transparent 44%), linear-gradient(160deg, transparent 68%, rgba(57,230,208,.22) 69%, transparent 70%)",
          }}
        />
        <div className="relative max-w-3xl">
          <h1 className="text-5xl leading-none md:text-7xl">
            Интернет
            <br />
            в Вышнем
            <br />
            Волочке
            <br />
            и районе
          </h1>
          <p className="mt-4 max-w-md text-[#B7C3D4]">
            Посмотрите скорость и цену за сутки. Подключение проверяем по телефону.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/connect/"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#39E6D0] px-4 py-3 font-bold"
            >
              Проверить возможность подключения
            </Link>
            <Link
              href="/pay/"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#39E6D0] bg-[#0E3B36] px-4 py-3 font-bold text-[#F4F7FB]"
            >
              Оплатить
            </Link>
          </div>
        </div>
      </section>

      <section className="py-8" aria-labelledby="home-tariffs">
        <h2 id="home-tariffs" className="text-3xl">Тарифы в городе</h2>
        <p className="mt-2 max-w-2xl text-[#B7C3D4]">
          Сумма за 30 дней посчитана из суточной цены. Это не фиксированная месячная плата.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {homeTariffs().map((tariff) => (
            <TariffCard key={tariff.id} tariff={tariff} />
          ))}
        </div>
        <Link href="/tariffs/" className="mt-4 inline-block text-[#39E6D0]">
          Все территории
        </Link>
      </section>

      <section className="py-8" aria-labelledby="home-steps">
        <h2 id="home-steps" className="text-3xl">Как подключаем</h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-5">
          {connectionSteps.map((step, index) => (
            <li key={step} className="rounded-2xl border border-[#39E6D0]/25 bg-[#111D2F] p-4">
              <span className="text-[#39E6D0]">{index + 1}</span>
              <p className="mt-2">{step}</p>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-[#B7C3D4]">Срок считает сотрудник после проверки адреса, не от визита на сайт.</p>
      </section>

      <section className="py-8" aria-labelledby="home-pay">
        <h2 id="home-pay" className="text-3xl">Два способа оплаты</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <article className="rounded-2xl border border-[#39E6D0]/25 bg-[#111D2F] p-4">
            <h3 className="text-xl">Личный кабинет «Топком»</h3>
            <p className="mt-2 text-[#B7C3D4]">С домашнего Wi-Fi, раздел «Оплата банковской картой».</p>
          </article>
          <article className="rounded-2xl border border-[#39E6D0]/25 bg-[#111D2F] p-4">
            <h3 className="text-xl">СберБанк Онлайн</h3>
            <p className="mt-2 text-[#B7C3D4]">Оплата по реквизитам. Ссылку на банк сайт не подставляет.</p>
          </article>
        </div>
        <Link href="/pay/" className="mt-4 inline-block text-[#39E6D0]">
          Инструкция по оплате
        </Link>
      </section>

      <section className="py-8" aria-labelledby="home-faq">
        <h2 id="home-faq" className="text-3xl">Вопросы</h2>
        <div className="mt-4">
          <FaqList items={faqItems} />
        </div>
      </section>

      <section className="py-8" aria-labelledby="home-contacts">
        <h2 id="home-contacts" className="text-3xl">Контакты</h2>
        <p className="mt-3">{company.postalAddress}</p>
        <p>
          <a href={phones.general.href}>{phones.general.display}</a>
        </p>
        <p className="text-[#B7C3D4]">
          {company.officeHours}, {company.officeBreak}
        </p>
        <Link href="/contacts/" className="mt-3 inline-block text-[#39E6D0]">
          Реквизиты и карта
        </Link>
      </section>
    </div>
  );
}
