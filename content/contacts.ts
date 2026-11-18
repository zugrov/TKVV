export const company = {
  shortName: "Топком",
  legalName: "ООО «ТОПКОМ»",
  inn: "6908012185",
  kpp: "690801001",
  ogrn: "1106908000440",
  postalAddress: "171163, Тверская область, г. Вышний Волочёк, пр-кт Казанский, д. 5/5",
  city: "Вышний Волочёк",
  officeHours: "пн–пт 09:00–17:00",
  officeBreak: "перерыв 13:00–14:00",
  email: "buh@tkvvnet.ru",
  emailLabel: "Почта",
} as const;

export const phones = {
  general: { display: "+7 915 706-67-37", href: "tel:+79157066737" },
  support: { display: "+7 980 641-50-74", href: "tel:+79806415074" },
} as const;

export const mapUrl =
  "https://yandex.ru/maps/?text=" +
  encodeURIComponent("Вышний Волочёк проспект Казанский 5/5");

export const connectionPrices = [
  { place: "Вышний Волочёк, частный сектор", priceRub: 7000 },
  { place: "Вышневолоцкий городской округ", priceRub: 8000 },
  { place: "п. Хотилово-2", priceRub: 1500 },
] as const;

export const connectionSteps = [
  "Звонок",
  "Проверка адреса",
  "Смета и срок",
  "Договор",
  "Монтаж",
] as const;
