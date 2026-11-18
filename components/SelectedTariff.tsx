"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { findTariff, findTerritory } from "@/content/tariffs";
import { formatDailyPrice } from "@/content/money";

function SelectedTariffContent() {
  const tariff = findTariff(useSearchParams().get("tariff"));
  if (!tariff) {
    return null;
  }
  const territory = findTerritory(tariff.territoryId);

  return (
    <p className="rounded-2xl border border-[#39E6D0]/40 bg-[#111D2F] p-4" role="status">
      Вы смотрели тариф {tariff.name}, {territory?.name}, {formatDailyPrice(tariff.pricePerDayRub)}.
      Адрес сотрудник проверит по телефону.
    </p>
  );
}

export function SelectedTariff() {
  return (
    <Suspense fallback={null}>
      <SelectedTariffContent />
    </Suspense>
  );
}
