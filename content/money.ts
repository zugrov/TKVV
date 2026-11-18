const rubFormatter = new Intl.NumberFormat("ru-RU");

export const DAYS_IN_BILLING_PERIOD = 30;

export function priceForPeriod(pricePerDayRub: number): number {
  return pricePerDayRub * DAYS_IN_BILLING_PERIOD;
}

export function formatRub(amount: number): string {
  return `${rubFormatter.format(amount)} ₽`;
}

export function formatDailyPrice(pricePerDayRub: number): string {
  return `${formatRub(pricePerDayRub)}/сутки`;
}

export function formatPeriodPrice(pricePerDayRub: number): string {
  return `${formatRub(priceForPeriod(pricePerDayRub))} за 30 дней`;
}
