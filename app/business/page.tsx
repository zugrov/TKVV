import { PageIntro } from "@/components/PageIntro";
import { phones } from "@/content/contacts";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Бизнесу",
  description: "Подключение организаций к сети Топком. Условия называет сотрудник по телефону.",
  path: "/business/",
});

export default function BusinessPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro title="Бизнесу">
        <p>
          Подключаем организации в Вышнем Волочке и городском округе. Тарифы и сроки для юрлиц на
          сайте не публикуются: их называет сотрудник после звонка.
        </p>
      </PageIntro>
      <p className="max-w-2xl text-[#B7C3D4]">
        Позвоните и назовите организацию и адрес. Формы заявки нет.
      </p>
      <a
        href={phones.general.href}
        className="mt-6 inline-flex min-h-11 items-center rounded-xl border border-[#39E6D0] bg-[#0E3B36] px-4 py-3 font-bold text-[#F4F7FB]"
      >
        Позвонить {phones.general.display}
      </a>
    </div>
  );
}
