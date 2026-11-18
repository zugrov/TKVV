import Link from "next/link";

export default function NotFound() {
  const links = [
    { href: "/", label: "На главную" },
    { href: "/tariffs/", label: "Тарифы" },
    { href: "/pay/", label: "Оплата" },
    { href: "/contacts/", label: "Контакты" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-5xl">Страница не найдена</h1>
      <nav className="mt-6 flex flex-col gap-3" aria-label="Куда перейти">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="text-[#39E6D0]">
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
