import { PageIntro } from "@/components/PageIntro";
import { phones } from "@/content/contacts";
import {
  bankDetails,
  lkSteps,
  lkUrl,
  personalAccountExamples,
  sberSteps,
} from "@/content/payments";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Оплата",
  description: "Два способа оплаты интернета Топком: личный кабинет и СберБанк Онлайн по реквизитам.",
  path: "/pay/",
});

export default function PayPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro title="Оплата">
        <p>
          Два равноправных способа. Переход только по вашей кнопке. Логин, карту, номер договора и
          сумму сайт не спрашивает и об успехе платежа не сообщает.
        </p>
      </PageIntro>
      <div className="grid gap-4 lg:grid-cols-2">
        <article className="flex flex-col rounded-2xl border border-[#39E6D0]/30 bg-[#111D2F] p-5">
          <h2 className="text-2xl">Личный кабинет «Топком»</h2>
          <ol className="mt-4 grid flex-1 list-decimal gap-2 pl-5 text-[#B7C3D4]">
            {lkSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="mt-4 text-[#B7C3D4]">
            Если кабинет недоступен, оплатите через Сбер или позвоните {phones.support.display}.
          </p>
          <a
            href={lkUrl}
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl border border-[#39E6D0] bg-[#0E3B36] px-4 py-3 text-center font-bold text-[#F4F7FB]"
          >
            Открыть личный кабинет
          </a>
        </article>
        <article className="flex flex-col rounded-2xl border border-[#39E6D0]/30 bg-[#111D2F] p-5">
          <h2 className="text-2xl">СберБанк Онлайн</h2>
          <ol className="mt-4 grid list-decimal gap-2 pl-5 text-[#B7C3D4]">
            {sberSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <dl className="mt-4 grid gap-2">
            <div>
              <dt className="text-[#B7C3D4]">Получатель</dt>
              <dd>{bankDetails.recipient}</dd>
            </div>
            <div>
              <dt className="text-[#B7C3D4]">ИНН</dt>
              <dd>{bankDetails.inn}</dd>
            </div>
            <div>
              <dt className="text-[#B7C3D4]">БИК</dt>
              <dd>{bankDetails.bik}</dd>
            </div>
            <div>
              <dt className="text-[#B7C3D4]">Расчётный счёт</dt>
              <dd className="break-all">{bankDetails.account}</dd>
            </div>
          </dl>
          <h3 className="mt-4 text-lg">Примеры лицевого счёта</h3>
          <ul className="mt-2 text-[#B7C3D4]">
            {personalAccountExamples.map((example) => (
              <li key={example.contract}>
                Договор {example.contract} → {example.account}
              </li>
            ))}
          </ul>
        </article>
      </div>
      <p className="mt-6">
        Техподдержка: <a href={phones.support.href}>{phones.support.display}</a>
      </p>
    </div>
  );
}
