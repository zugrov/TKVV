import Link from "next/link";

import { findTerritory, connectHref, type Tariff } from "@/content/tariffs";
import { formatDailyPrice, formatPeriodPrice } from "@/content/money";

type TariffCardProps = {
  tariff: Tariff;
};

export function TariffCard({ tariff }: TariffCardProps) {
  const territory = findTerritory(tariff.territoryId);

  return (
    <article className="rounded-2xl border border-[#39E6D0]/30 bg-[#111D2F] p-4">
      <p className="text-sm text-[#B7C3D4]">{territory?.name}</p>
      <h3 className="mt-1 text-3xl">{tariff.name}</h3>
      <p className="text-[#B7C3D4]">до {tariff.speedMbps} Мбит/с</p>
      <p className="mt-3 text-lg text-[#39E6D0]">{formatDailyPrice(tariff.pricePerDayRub)}</p>
      <p>{formatPeriodPrice(tariff.pricePerDayRub)}</p>
      <Link
        href={connectHref(tariff.id)}
        className="mt-4 inline-flex min-h-11 items-center rounded-xl border border-[#39E6D0] px-3 py-2"
      >
        Выбрать тариф
      </Link>
    </article>
  );
}
