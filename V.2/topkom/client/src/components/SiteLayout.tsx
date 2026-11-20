import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, ChevronDown, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { navItems, siteConfig, tariffNotice, worksNotice } from "@/data/site";

export function BrandMark() {
  return (
    <Link href="/" className="brand-mark" aria-label="Топком — на главную">
      <span className="brand-symbol" aria-hidden="true"><i /><i /></span>
      <span className="brand-word">ТОП<span>КОМ</span></span>
    </Link>
  );
}

export function ButtonLink({ href, children, variant = "primary", external = false, className = "" }: { href: string; children: ReactNode; variant?: "primary" | "outline" | "ghost"; external?: boolean; className?: string }) {
  const classes = `button button-${variant} ${className}`;
  if (external) return <a href={href} className={classes} target="_blank" rel="noreferrer">{children}<ArrowUpRight size={16} aria-hidden="true" /></a>;
  return <Link href={href} className={classes}>{children}</Link>;
}

export function SectionHeading({ eyebrow, title, text, align = "left" }: { eyebrow?: string; title: ReactNode; text?: string; align?: "left" | "center" }) {
  return <div className={`section-heading ${align === "center" ? "section-heading-center" : ""}`}>
    {eyebrow && <div className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</div>}
    <h2>{title}</h2>
    {text && <p>{text}</p>}
  </div>;
}

export function FiberLines({ compact = false }: { compact?: boolean }) {
  return <div className={`fiber-lines ${compact ? "fiber-lines-compact" : ""}`} aria-hidden="true">
    <span className="fiber-line line-a" /><span className="fiber-line line-b" /><span className="fiber-line line-c" />
    <span className="fiber-node node-a" /><span className="fiber-node node-b" /><span className="fiber-node node-c" />
  </div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  useEffect(() => setOpen(false), [location]);
  return <header className="site-header">
    <div className="container header-inner">
      <BrandMark />
      <nav className={`main-nav ${open ? "main-nav-open" : ""}`} aria-label="Основная навигация">
        {navItems.map((item) => <Link key={item.href} href={item.href} className={location === item.href ? "nav-active" : ""}>{item.label}</Link>)}
        <div className="nav-mobile-actions"><ButtonLink href="/pay">Оплатить</ButtonLink><ButtonLink href="/connect" variant="outline">Проверить адрес</ButtonLink></div>
      </nav>
      <div className="header-actions">
        <ButtonLink href="/pay" variant="outline" className="header-pay">Оплатить</ButtonLink>
        <ButtonLink href="https://тквв.рф" variant="ghost" external className="header-lk">Личный кабинет</ButtonLink>
        <button className="menu-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="site-menu" aria-label={open ? "Закрыть меню" : "Открыть меню"}>{open ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
    </div>
  </header>;
}

function Footer() {
  return <footer className="site-footer">
    <div className="container footer-grid">
      <div className="footer-brand"><BrandMark /><p>Интернет для Вышнего Волочка и городского округа. Подключаем прозрачно, поддерживаем по-человечески.</p><a className="footer-phone" href={`tel:${siteConfig.phone.replaceAll(" ", "")}`}><Phone size={15} /> {siteConfig.phone}</a></div>
      <div><div className="footer-label">Навигация</div><div className="footer-links"><Link href="/tariffs">Тарифы</Link><Link href="/connect">Подключение</Link><Link href="/pay">Оплата</Link><Link href="/support">Поддержка</Link><Link href="/business">Бизнесу</Link></div></div>
      <div><div className="footer-label">Документы</div><div className="footer-links"><Link href="/documents">Документы</Link><Link href="/privacy">Политика</Link><Link href="/consent">Согласие</Link></div></div>
      <div><div className="footer-label">Офис</div><div className="footer-office"><span>{siteConfig.address}</span><span>{siteConfig.officeHours}</span><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></div></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} ООО «Топком»</span><span className="footer-legal">ИНН {siteConfig.requisites[0][1]} · ОГРН {siteConfig.requisites[2][1]}</span><span className="footer-status"><i /> сайт без внешней аналитики</span></div>
  </footer>;
}

export function WorksNotice() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return <aside className="works-notice container" aria-label="Объявление о работах">
    <div className="notice-icon"><span /></div><div className="notice-copy"><div className="notice-top"><strong>{worksNotice.title}</strong><span>{worksNotice.territory}</span><span className="notice-updated">{worksNotice.updated}</span></div><p>{worksNotice.body}</p></div><button className="notice-close" onClick={() => setVisible(false)} aria-label="Скрыть объявление"><X size={17} /></button>
  </aside>;
}

export function TariffNotice() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return <aside className="works-notice works-notice-keep container" aria-label="Уведомление о тарифах">
    <div className="notice-icon"><span /></div>
    <div className="notice-copy">
      <div className="notice-top"><strong>{tariffNotice.title}</strong></div>
      <p>{tariffNotice.body}</p>
    </div>
    <button className="notice-close" onClick={() => setVisible(false)} aria-label="Скрыть уведомление о тарифах"><X size={17} /></button>
  </aside>;
}

export default function SiteLayout({ children, notice = false }: { children: ReactNode; notice?: boolean }) {
  const [location] = useLocation();
  useEffect(() => {
    const metadata: Record<string, { title: string; description: string }> = {
      "/": { title: "Топком — интернет-провайдер", description: "Интернет для Вышнего Волочка и Вышневолоцкого городского округа. Проверим адрес и согласуем подключение." },
      "/tariffs": { title: "Тарифы на интернет · Топком", description: "Тарифы Топком по территориям: скорость, суточная стоимость и условия списания." },
      "/connect": { title: "Подключение по адресу · Топком", description: "Проверим техническую возможность подключения интернета по вашему адресу." },
      "/pay": { title: "Оплата услуг · Топком", description: "Два способа оплаты услуг Топком: личный кабинет и СберБанк Онлайн." },
      "/support": { title: "Поддержка абонентов · Топком", description: "Телефон техподдержки Топком и ответы на частые вопросы абонентов." },
      "/business": { title: "Интернет для бизнеса · Топком", description: "Заявка на подключение интернета для бизнеса в Вышнем Волочке и округе." },
      "/contacts": { title: "Контакты и реквизиты · Топком", description: "Адрес офиса, телефоны, режим работы и реквизиты ООО «Топком»." },
      "/documents": { title: "Документы · Топком", description: "Лицензии связи ООО «Топком», политика обработки данных и текст согласия." },
      "/privacy": { title: "Политика · Топком", description: "Политика обработки персональных данных ООО «Топком» для публичного сайта." },
      "/consent": { title: "Согласие · Топком", description: "Отдельный текст согласия на обработку персональных данных для рассмотрения заявки." },
      "/404": { title: "Страница не найдена · Топком", description: "Запрошенная страница не найдена." },
    };
    const current = metadata[location] ?? metadata["/404"];
    document.documentElement.lang = "ru";
    document.title = current.title;
    let description = document.querySelector('meta[name="description"]');
    if (!description) { description = document.createElement("meta"); description.setAttribute("name", "description"); document.head.appendChild(description); }
    description.setAttribute("content", current.description);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.setAttribute("rel", "canonical"); document.head.appendChild(canonical); }
    const origin = "https://xn--j1aeebdq.site";
    canonical.setAttribute("href", `${origin}${location === "/" ? "/" : location}`);
  }, [location]);
  return <div className="site-shell"><Header />{notice && <><WorksNotice /><TariffNotice /></>}{children}<Footer /></div>;
}

export function ContactStrip() {
  return <section className="contact-strip"><div className="container contact-strip-inner"><div><div className="eyebrow"><span className="eyebrow-dot" />есть вопрос?</div><h2>Разберёмся вместе.</h2></div><div className="contact-strip-actions"><a href={`tel:${siteConfig.supportPhone.replaceAll(" ", "")}`} className="contact-direct"><Phone size={18} /> {siteConfig.supportPhone}</a><ButtonLink href="/contacts" variant="outline">Все контакты</ButtonLink></div></div></section>;
}

export function PageFrame({ children, className = "" }: { children: ReactNode; className?: string }) { return <main className={`page-frame ${className}`}>{children}</main>; }

export function Accordion({ items }: { items: readonly { question: string; answer: string }[] }) {
  const [active, setActive] = useState<number | null>(null);
  return <div className="accordion">{items.map((item, index) => <div className={`accordion-item ${active === index ? "accordion-open" : ""}`} key={item.question}><button className="accordion-trigger" onClick={() => setActive(active === index ? null : index)} aria-expanded={active === index}>{item.question}<ChevronDown size={18} /></button>{active === index && <div className="accordion-content"><p>{item.answer}</p></div>}</div>)}</div>;
}

export function ContactMeta({ compact = false }: { compact?: boolean }) {
  return <div className={`contact-meta ${compact ? "contact-meta-compact" : ""}`}><a href={`tel:${siteConfig.phone.replaceAll(" ", "")}`}><Phone size={16} />{siteConfig.phone}</a><a href={`mailto:${siteConfig.email}`}><Mail size={16} />{siteConfig.email}</a>{!compact && <span><MapPin size={16} />{siteConfig.address}</span>}</div>;
}
