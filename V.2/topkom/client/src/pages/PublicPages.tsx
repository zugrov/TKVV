import { useEffect } from "react";
import { ArrowRight, Check, Clipboard, ExternalLink, FileText, Gauge, Globe2, Headphones, MapPin, Network, Phone, ShieldCheck, WalletCards, Wifi, Wrench } from "lucide-react";
import { Link, useLocation } from "wouter";
import SiteLayout, { Accordion, ButtonLink, ContactMeta, ContactStrip, FiberLines, PageFrame, SectionHeading } from "@/components/SiteLayout";
import LeadForm from "@/components/LeadForm";
import { addOnServices, bankDetails, connectionPrices, connectionSteps, consentSections, consentVersion, faqs, licenseSource, licenses, paymentMethods, privacySections, siteConfig, tariffTerritories } from "@/data/site";

const formatPrice = (value: number) => new Intl.NumberFormat("ru-RU").format(value);

export function Home() {
  return <SiteLayout notice><PageFrame className="home-page">
    <section className="hero container"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot" />интернет-провайдер · вышний волочёк</div><h1>Связь,<br /><span>которая</span><br />держит.</h1><p className="hero-lead">Подключаем интернет в городе и округе. Проверим адрес, согласуем условия и оставим вам понятный следующий шаг.</p><div className="hero-actions"><ButtonLink href="/connect">Проверить возможность подключения <ArrowRight size={17} /></ButtonLink><ButtonLink href="/pay" variant="outline">Оплатить</ButtonLink></div><div className="hero-meta"><span><i className="meta-line" />локальная сеть</span><span><i className="meta-line" />безлимитный трафик</span></div></div><div className="hero-visual"><FiberLines /><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><div className="hero-core"><div className="core-ring"><span>TK</span></div><small>сигнал<br />стабилен</small></div><div className="hero-coordinates">56°51′N<br />35°55′E</div><div className="hero-label label-top">IN / 01</div><div className="hero-label label-bottom">FIBER LINK</div></div></section>
    <section className="marquee-band"><div className="marquee-track"><span>Подключение по адресу</span><b>·</b><span>Тарифы без лишнего</span><b>·</b><span>Поддержка рядом</span><b>·</b><span>Подключение по адресу</span><b>·</b><span>Тарифы без лишнего</span></div></section>
    <section className="home-section container"><SectionHeading eyebrow="01 · тарифы" title="Выберите скорость." text="Посуточное списание при положительном балансе. Трафик безлимитный." /><div className="territory-grid">{tariffTerritories.map((territory) => <div className="territory-card" key={territory.id}><div className="territory-head"><div><span className="card-kicker">{territory.note}</span><h3>{territory.name}</h3></div><span className="territory-index">0{tariffTerritories.indexOf(territory) + 1}</span></div><div className="mini-tariffs">{territory.tariffs.map((tariff) => <Link className="mini-tariff" href={`/connect?tariff=${tariff.id}`} key={tariff.id}><span className="mini-speed">{tariff.name}</span><span className="mini-price">{tariff.daily} <small>₽/сут</small></span><ArrowRight size={16} /></Link>)}</div><Link href="/tariffs" className="text-link">Все тарифы <ArrowRight size={15} /></Link></div>)}</div></section>
    <section className="dark-section home-section"><div className="container steps-layout"><SectionHeading eyebrow="02 · подключение" title={<>От заявки до<br /><span>первого сигнала.</span></>} text="Сотрудник подтвердит возможность, итоговую смету и срок. Заявка на сайте не является договором." /><div className="steps-list">{connectionSteps.map((step) => <div className="step-row" key={step.number}><span className="step-number">{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div><ArrowRight size={18} /></div>)}</div></div></section>
    <section className="home-section container payment-preview"><div className="payment-preview-copy"><SectionHeading eyebrow="03 · оплата" title={<>Оплата —<br /><span>два понятных шага.</span></>} text="Выберите способ, который вам удобнее. Мы не запрашиваем данные карты и не сообщаем об успешной оплате." /><ButtonLink href="/pay" variant="outline">Все способы оплаты <ArrowRight size={16} /></ButtonLink></div><div className="payment-preview-cards">{paymentMethods.map((method) => <a className="payment-preview-card" href={method.href} target="_blank" rel="noreferrer" key={method.id}><span className="card-kicker">{method.eyebrow}</span><h3>{method.title}</h3><p>{method.description}</p><span className="text-link">Открыть <ExternalLink size={14} /></span></a>)}</div></section>
    <section className="faq-section"><div className="container faq-layout"><SectionHeading eyebrow="04 · поддержка" title="Ответы рядом." text="Коротко о том, что чаще всего спрашивают абоненты." /><div><Accordion items={faqs.slice(0, 4)} /><Link href="/support" className="text-link faq-more">Все вопросы <ArrowRight size={15} /></Link></div></div></section>
    <ContactStrip />
  </PageFrame></SiteLayout>;
}

export function Tariffs() {
  return <SiteLayout><PageFrame><PageIntro eyebrow="01 · тарифы" title={<>Скорость,<br /><span>без сюрпризов.</span></>} text="Выберите тариф по территории. Цена указана за сутки, расчёт за 30 дней — ориентир из 30 суточных списаний." meta="Трафик безлимитный · списание при положительном балансе" /><section className="container tariff-sections">{tariffTerritories.map((territory) => <div className="tariff-section" key={territory.id}><div className="tariff-section-heading"><div><span className="card-kicker">{territory.note}</span><h2>{territory.name}</h2></div><span className="section-code">NET / 0{tariffTerritories.indexOf(territory) + 1}</span></div><div className="tariff-table">{territory.tariffs.map((tariff, index) => <div className={`tariff-row ${index === territory.tariffs.length - 1 ? "tariff-row-last" : ""}`} key={tariff.id}><div className="tariff-main"><span className="tariff-name">{tariff.name}</span><span className="tariff-speed">до {tariff.speed} Мбит/с</span></div><div className="tariff-value"><strong>{tariff.daily} ₽</strong><small>в сутки</small></div><div className="tariff-value tariff-period"><strong>{formatPrice(tariff.period)} ₽</strong><small>за 30 дней*</small></div><Link className="tariff-action" href={`/connect?tariff=${tariff.id}`} aria-label={`Выбрать тариф ${tariff.name}`}><ArrowRight size={18} /></Link></div>)}</div></div>)}<p className="table-note">* Расчёт за 30 дней из суточной стоимости, не фиксированная месячная плата. Дата действия тарифов требует подтверждения.</p><div className="addons-block"><SectionHeading eyebrow="дополнительные услуги" title="Настройки линии." /><div className="addons-grid">{addOnServices.map((service) => <div className="addon-card" key={service.label}><span>{service.label}</span><strong>{service.price}</strong><small>{service.note}</small></div>)}</div></div><div className="territory-note"><MapPin size={20} /><div><strong>Не нашли свой населённый пункт?</strong><p>Для других адресов, включая Хотилово-2, тарифную сетку не публикуем до подтверждения. Оставьте заявку — проверим адрес индивидуально.</p></div><ButtonLink href="/connect" variant="outline">Проверить адрес <ArrowRight size={15} /></ButtonLink></div></section></PageFrame></SiteLayout>;
}

export function Connect() {
  const search = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const tariffId = search?.get("tariff") ?? "";
  const tariff = tariffTerritories.flatMap((t) => t.tariffs.map((item) => ({ ...item, territory: t.name }))).find((item) => item.id === tariffId);
  return <SiteLayout><PageFrame><PageIntro eyebrow="02 · подключение" title={<>Подключение<br /><span>интернета по адресу.</span></>} text="Оставьте заявку — сотрудник проверит возможность, уточнит смету и срок. Срок не отсчитывается от веб-заявки." meta="Без паспортных данных · без вложений · без договора онлайн" /><section className="container connect-layout"><div><div className="price-list">{connectionPrices.map((item) => <div className="price-row" key={item.territory}><span>{item.territory}<small>{item.detail}</small></span><strong>{item.price}</strong></div>)}</div><div className="small-callout"><Wrench size={18} /><p>Аванс включает стоимость подключения и аванс абонентской платы. Итоговую смету и срок подтвердит сотрудник.</p></div><div className="connect-steps">{connectionSteps.map((step) => <div className="connect-step" key={step.number}><span>{step.number}</span><div><strong>{step.title}</strong><p>{step.text}</p></div></div>)}</div></div><div className="form-panel">{tariff && <div className="selected-tariff"><Check size={16} /> Выбран тариф: <strong>{tariff.territory}, {tariff.name}</strong></div>}<LeadForm selectedTerritory={tariff?.territory} selectedTariff={tariff?.id} /></div></section></PageFrame></SiteLayout>;
}

export function Pay() {
  return <SiteLayout><PageFrame><PageIntro eyebrow="03 · оплата" title={<>Как оплатить<br /><span>интернет.</span></>} text="Ровно два способа. Вы переходите во внешний сервис сами — мы не запрашиваем банковские данные на сайте." meta="Не вводите логин, данные карты, номер договора или сумму на этой странице" /><section className="container payment-page-grid">{paymentMethods.map((method) => <article className="payment-method-card" key={method.id}><div className="payment-method-top"><span className="card-kicker">{method.eyebrow}</span><span className="payment-icon">{method.id === "lk" ? <WalletCards size={24} /> : <Globe2 size={24} />}</span></div><h2>{method.title}</h2><p>{method.description}</p><div className="payment-tips">{method.tips.map((tip) => <div key={tip}><Check size={15} />{tip}</div>)}</div><a className="button button-primary" href={method.href} target="_blank" rel="noreferrer">{method.cta}<ExternalLink size={16} /></a><span className="external-note">Внешний сайт · переход по вашему нажатию</span></article>)}</section><section className="container payment-help"><div><SectionHeading eyebrow="если не получается" title="Нужна помощь с оплатой?" text="Если ЛК недоступен или платёж не зачислился, позвоните в поддержку. Подтверждение платежа лучше сохранить." /><a href={`tel:${siteConfig.supportPhone.replaceAll(" ", "")}`} className="contact-direct"><Phone size={18} /> {siteConfig.supportPhone}</a></div><div className="bank-details"><div className="card-kicker">РЕКВИЗИТЫ ДЛЯ СВЕРКИ</div>{bankDetails.map(([label, value]) => <div className="bank-line" key={label}><span>{label}</span><strong>{value}</strong><button aria-label={`Скопировать ${label}`} onClick={() => navigator.clipboard?.writeText(value)}><Clipboard size={15} /></button></div>)}<p>БИК, счёт, комиссия и срок зачисления требуют подтверждения бухгалтерии до публикации.</p></div></section></PageFrame></SiteLayout>;
}

export function Support() { return <SiteLayout><PageFrame><PageIntro eyebrow="04 · поддержка" title={<>Помощь без<br /><span>автоответчика.</span></>} text="Сначала попробуйте быстрые шаги ниже. Если не помогло — мы на связи." meta="Техподдержка · +7 980 641-50-74" /><section className="container support-layout"><div className="support-hero-card"><Headphones size={28} /><span className="card-kicker">ТЕХПОДДЕРЖКА</span><h2>+7 980 641-50-74</h2><p>Позвоните, если интернет не работает, не открывается ЛК или платёж не зачислился.</p><a href="tel:+79806415074" className="button button-primary">Позвонить <Phone size={16} /></a></div><div><Accordion items={faqs} /></div></section><section className="container recalculation"><div><div className="eyebrow"><span className="eyebrow-dot" />перерасчёт</div><h2>Нужен перерасчёт?</h2></div><p>Опишите ситуацию по телефону поддержки. Сотрудник подскажет порядок обращения и необходимые данные. Автоматическая компенсация не обещается.</p><a href="tel:+79806415074" className="text-link">Позвонить в поддержку <ArrowRight size={15} /></a></section></PageFrame></SiteLayout>; }

export function Business() { return <SiteLayout><PageFrame><PageIntro eyebrow="05 · бизнесу" title={<>Интернет для<br /><span>рабочих задач.</span></>} text="Расскажите, где вы работаете и что нужно от связи. Сотрудник уточнит доступность и предложит условия после проверки — без вымышленных тарифов и SLA." meta="Название организации · адрес · телефон" /><section className="container business-layout"><div className="business-points"><div className="business-point"><Network size={22} /><h3>Проверим адрес</h3><p>Уточним техническую возможность подключения по вашему адресу.</p></div><div className="business-point"><Gauge size={22} /><h3>Разберём задачу</h3><p>Соберём вводные по компании без обещаний, которые нельзя подтвердить.</p></div><div className="business-point"><ShieldCheck size={22} /><h3>Согласуем условия</h3><p>Итоговые условия, срок и смета — после проверки сотрудником.</p></div></div><div className="form-panel"><LeadForm business /></div></section></PageFrame></SiteLayout>; }

export function Contacts() { return <SiteLayout><PageFrame><PageIntro eyebrow="06 · контакты" title={<>Мы рядом,<br /><span>в рабочие часы.</span></>} text="Офис и телефон для новых подключений, оплаты и вопросов по действующей линии." meta="Не обещаем поддержку 24/7 — график ниже" /><section className="container contacts-grid"><div className="contact-card contact-card-main"><MapPin size={25} /><span className="card-kicker">ОФИС</span><h2>{siteConfig.address}</h2><p>{siteConfig.officeHours}</p><a className="button button-outline" href={siteConfig.mapUrl} target="_blank" rel="noreferrer">{siteConfig.mapLabel} <ExternalLink size={15} /></a></div><div className="contact-card"><Phone size={23} /><span className="card-kicker">ОБЩИЕ ВОПРОСЫ</span><a href="tel:+79157066737" className="big-contact">{siteConfig.phone}</a><p>Подключение, документы и общие вопросы.</p></div><div className="contact-card"><Headphones size={23} /><span className="card-kicker">ТЕХПОДДЕРЖКА</span><a href="tel:+79806415074" className="big-contact">{siteConfig.supportPhone}</a><p>Если не работает интернет или не зачислился платёж.</p></div><div className="contact-card"><MailIcon /><span className="card-kicker">ПОЧТА ИЗ БЛАНКА</span><a href={`mailto:${siteConfig.email}`} className="big-contact big-contact-mail">{siteConfig.email}</a><p>Не обозначаем как техподдержку без отдельной проверки.</p></div></section><section className="container requisites"><SectionHeading eyebrow="реквизиты" title="ООО «Топком»" /><div className="requisites-grid">{siteConfig.requisites.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></section></PageFrame></SiteLayout>; }

export function Documents() {
  return <SiteLayout><PageFrame>
    <PageIntro
      eyebrow="07 · документы"
      title={<>Документы,<br /><span>которым можно верить.</span></>}
      text="Договор подписывается с сотрудником при подключении. Заявка на сайте договор не заменяет, файл договора здесь не публикуется."
      meta={`${licenseSource}. Срок действия до 11.04.2028.`}
    />
    <section className="container documents-list">
      {licenses.map((license) => (
        <div className="document-row" key={license.number}>
          <div className="document-icon"><FileText size={20} /></div>
          <div>
            <span className="card-kicker">Лицензия</span>
            <h3>{license.number}</h3>
            <p>до {license.validUntil}</p>
          </div>
        </div>
      ))}
      <Link className="document-row" href="/privacy">
        <div className="document-icon"><FileText size={20} /></div>
        <div>
          <span className="card-kicker">Правовая страница</span>
          <h3>Политика обработки персональных данных</h3>
        </div>
        <ArrowRight size={18} />
      </Link>
      <Link className="document-row" href="/consent">
        <div className="document-icon"><FileText size={20} /></div>
        <div>
          <span className="card-kicker">Правовая страница</span>
          <h3>Согласие на обработку персональных данных</h3>
        </div>
        <ArrowRight size={18} />
      </Link>
    </section>
  </PageFrame></SiteLayout>;
}

export function Privacy() {
  return <LegalPage title="Политика обработки персональных данных" eyebrow="правовая страница · политика" version={consentVersion}>
    {privacySections.map((section) => (
      <LegalBlock key={section.id} title={section.title}>
        {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </LegalBlock>
    ))}
  </LegalPage>;
}

export function Consent() {
  return <LegalPage title="Согласие на обработку персональных данных" eyebrow="правовая страница · согласие" version={consentVersion}>
    <p className="legal-lead">Версия {consentVersion}. Это не договор и не согласие на рекламу.</p>
    {consentSections.map((section) => (
      <LegalBlock key={section.id} title={section.title}>
        {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </LegalBlock>
    ))}
  </LegalPage>;
}

export function NotFound() {
  useEffect(() => {
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex";
    document.head.appendChild(robots);
    if (window.location.pathname.replace(/\/$/, "") !== "/404") window.location.replace("/404");
    return () => robots.remove();
  }, []);
  return <SiteLayout><PageFrame><section className="container not-found"><div className="eyebrow"><span className="eyebrow-dot" />ошибка 404</div><h1>Страница<br /><span>не найдена.</span></h1><p>Похоже, этот маршрут ещё не подключён к нашей сети. Вернитесь на главную или выберите нужный раздел.</p><div className="hero-actions"><ButtonLink href="/">На главную <ArrowRight size={16} /></ButtonLink><ButtonLink href="/tariffs" variant="outline">Тарифы</ButtonLink><ButtonLink href="/contacts" variant="ghost">Контакты</ButtonLink></div></section></PageFrame></SiteLayout>;
}

function PageIntro({ eyebrow, title, text, meta }: { eyebrow: string; title: React.ReactNode; text: string; meta: string }) { return <section className="page-intro container"><div className="intro-grid"><div><div className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</div><h1>{title}</h1></div><div className="intro-detail"><p>{text}</p><span><i className="meta-line" />{meta}</span></div></div><FiberLines compact /></section>; }
function LegalPage({ title, eyebrow, version, children }: { title: string; eyebrow: string; version: string; children: React.ReactNode }) { useEffect(() => { document.title = `${title} · Топком`; }, [title]); return <SiteLayout><PageFrame><section className="container legal-page"><div className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</div><h1>{title}</h1><div className="legal-version">Версия {version}</div><div className="legal-content">{children}</div></section></PageFrame></SiteLayout>; }
function LegalBlock({ title, children }: { title: string; children: React.ReactNode }) { return <section className="legal-block"><h2>{title}</h2>{children}</section>; }
function MailIcon() { return <span className="icon-mail"><MailIconGlyph /></span>; }
function MailIconGlyph() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4zM4 7l8 6 8-6" /></svg>; }
