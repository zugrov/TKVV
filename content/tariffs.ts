import { priceForPeriod } from "./money";

export type Territory = {
  id: string;
  name: string;
  isShownOnHome: boolean;
};

export type Tariff = {
  id: string;
  territoryId: string;
  name: string;
  speedMbps: number;
  pricePerDayRub: number;
};

export const territories: Territory[] = [
  { id: "vyshny-volochek", name: "Вышний Волочёк", isShownOnHome: true },
  { id: "serebryaniki-sadovy", name: "Серебряники, Садовый", isShownOnHome: false },
];

export const tariffs: Tariff[] = [
  { id: "vv-10", territoryId: "vyshny-volochek", name: "10М", speedMbps: 10, pricePerDayRub: 20 },
  { id: "vv-20", territoryId: "vyshny-volochek", name: "20М", speedMbps: 20, pricePerDayRub: 25 },
  { id: "vv-50", territoryId: "vyshny-volochek", name: "50М", speedMbps: 50, pricePerDayRub: 39 },
  { id: "vv-100", territoryId: "vyshny-volochek", name: "100М", speedMbps: 100, pricePerDayRub: 52 },
  { id: "ss-3", territoryId: "serebryaniki-sadovy", name: "3М", speedMbps: 3, pricePerDayRub: 15 },
  { id: "ss-6", territoryId: "serebryaniki-sadovy", name: "6М", speedMbps: 6, pricePerDayRub: 23 },
  { id: "ss-12", territoryId: "serebryaniki-sadovy", name: "12М", speedMbps: 12, pricePerDayRub: 31 },
  { id: "ss-24", territoryId: "serebryaniki-sadovy", name: "24М", speedMbps: 24, pricePerDayRub: 45 },
];

export const extraServices = [
  { id: "line-reserve", name: "Бессрочный резерв линии", price: "2 ₽/сутки" },
  { id: "external-ip", name: "Внешний IP-адрес", price: "8 ₽/сутки" },
  { id: "freeze", name: "Заморозка", price: "разово три суточные платы" },
  { id: "unfreeze", name: "Разморозка", price: "бесплатно" },
  { id: "tariff-change", name: "Смена тарифа в личном кабинете", price: "50 ₽" },
] as const;

export const tariffRules = [
  "Трафик безлимитный.",
  "Списание идёт посуточно при положительном балансе, даже если интернет не пользовались.",
  "Сумма за 30 дней считается из суточной цены и не является фиксированной месячной платой.",
];

export function findTerritory(territoryId: string): Territory | null {
  return territories.find((territory) => territory.id === territoryId) ?? null;
}

export function findTariff(tariffId: string | null | undefined): Tariff | null {
  if (!tariffId) {
    return null;
  }
  return tariffs.find((tariff) => tariff.id === tariffId) ?? null;
}

export function tariffsByTerritory(territoryId: string): Tariff[] {
  return tariffs.filter((tariff) => tariff.territoryId === territoryId);
}

export function homeTariffs(): Tariff[] {
  const homeTerritoryIds = new Set(
    territories.filter((territory) => territory.isShownOnHome).map((territory) => territory.id),
  );
  return tariffs.filter((tariff) => homeTerritoryIds.has(tariff.territoryId));
}

export function connectHref(tariffId: string): string {
  return `/connect/?tariff=${tariffId}`;
}

export function periodPriceRub(tariff: Tariff): number {
  return priceForPeriod(tariff.pricePerDayRub);
}
