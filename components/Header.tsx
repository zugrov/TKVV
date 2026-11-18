"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { cabinetLink, navItems, payLink } from "@/content/navigation";
import { siteName } from "@/content/site";

function isCurrent(pathname: string, href: string): boolean {
  return pathname === href || pathname === href.slice(0, -1);
}

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-[#39E6D0]/25">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4">
        <Link
          href="/"
          className="text-3xl font-bold tracking-[0.12em] text-[#149E8C]! uppercase"
        >
          {siteName}
        </Link>
        <nav className="hidden items-center gap-4 text-sm tracking-wide uppercase lg:flex" aria-label="Разделы">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
              className={isCurrent(pathname, item.href) ? "text-[#39E6D0]" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <a href={cabinetLink.href} rel="noopener noreferrer">
            {cabinetLink.label}
          </a>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link
            href={payLink.href}
            className="inline-flex min-h-11 items-center rounded-full border border-[#39E6D0] bg-[#0E3B36] px-4 py-2.5 text-sm font-bold text-[#F4F7FB]"
          >
            {payLink.label}
          </Link>
          <button
            type="button"
            className="rounded-md border border-[#39E6D0]/40 px-3 py-2 text-sm lg:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          >
            {isMenuOpen ? "Закрыть" : "Меню"}
          </button>
        </div>
      </div>
      {isMenuOpen ? (
        <nav id="mobile-menu" className="flex flex-col gap-3 px-4 pb-4 text-sm uppercase lg:hidden" aria-label="Разделы">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
          <a href={cabinetLink.href} rel="noopener noreferrer">
            {cabinetLink.label}
          </a>
        </nav>
      ) : null}
    </header>
  );
}
