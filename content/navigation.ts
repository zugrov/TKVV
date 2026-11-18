import { lkUrl } from "./payments";

export type NavItem = {
  href: string;
  label: string;
};

export const navItems: NavItem[] = [
  { href: "/tariffs/", label: "Тарифы" },
  { href: "/connect/", label: "Подключение" },
  { href: "/business/", label: "Бизнесу" },
  { href: "/support/", label: "Поддержка" },
  { href: "/contacts/", label: "Контакты" },
];

export const cabinetLink = {
  href: lkUrl,
  label: "Личный кабинет",
};

export const payLink = {
  href: "/pay/",
  label: "Оплатить",
};

export const footerDocumentLinks: NavItem[] = [
  { href: "/documents/", label: "Документы" },
  { href: "/privacy/", label: "Политика" },
  { href: "/consent/", label: "Согласие" },
];
