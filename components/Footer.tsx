import Link from "next/link";

import { company, phones } from "@/content/contacts";
import { footerDocumentLinks } from "@/content/navigation";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[#39E6D0]/25">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 text-sm text-[#B7C3D4] md:grid-cols-3">
        <div>
          <p className="text-[#F4F7FB]">{company.legalName}</p>
          <p>{company.postalAddress}</p>
          <p>
            <a href={phones.general.href}>{phones.general.display}</a>
          </p>
          <p>
            {company.emailLabel}: <a href={`mailto:${company.email}`}>{company.email}</a>
          </p>
        </div>
        <div>
          <p>ИНН {company.inn}</p>
          <p>КПП {company.kpp}</p>
          <p>ОГРН {company.ogrn}</p>
          <p>
            {company.officeHours}, {company.officeBreak}
          </p>
        </div>
        <nav className="flex flex-col gap-2" aria-label="Документы">
          {footerDocumentLinks.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
