import { FormEvent, useState } from "react";
import { AlertCircle, Check, Loader2, Send } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { consentVersion, tariffTerritories } from "@/data/site";

type LeadFormProps = { selectedTerritory?: string; selectedTariff?: string; business?: boolean };
type FormState = { settlement: string; address: string; phone: string; name: string; tariffId: string; organization: string; consent: boolean };
type AllowedTariffId = "vv-10" | "vv-20" | "vv-50" | "vv-100" | "ss-3" | "ss-6" | "ss-12" | "ss-24";
const initialState: FormState = { settlement: "", address: "", phone: "", name: "", tariffId: "", organization: "", consent: false };

export default function LeadForm({ selectedTerritory = "", selectedTariff = "", business = false }: LeadFormProps) {
  const [form, setForm] = useState<FormState>({ ...initialState, settlement: selectedTerritory, tariffId: selectedTariff });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<"idle" | "loading" | "success" | "error">("idle");
  const submitLead = trpc.leads.submit.useMutation({
    onSuccess: () => { setResult("success"); setErrors({}); },
    onError: (error) => { setResult("error"); setErrors({ form: error.message || "Не удалось сохранить заявку." }); },
  });

  const update = (key: keyof FormState, value: string | boolean) => { setForm((current) => ({ ...current, [key]: value })); setErrors((current) => ({ ...current, [key]: "", form: "" })); if (result !== "idle") setResult("idle"); };
  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.settlement) next.settlement = "Укажите населённый пункт";
    if (!form.address.trim()) next.address = "Укажите улицу и дом";
    if (!/^\+?[0-9 ()-]{10,20}$/.test(form.phone.trim())) next.phone = "Введите телефон в формате +7 900 000-00-00";
    if (business && !form.organization.trim()) next.organization = "Укажите название организации";
    if (!form.consent) next.consent = "Нужно согласие на обработку персональных данных";
    setErrors(next); return Object.keys(next).length === 0;
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    setResult("loading");
    submitLead.mutate({ settlement: form.settlement, address: form.address.trim(), phone: form.phone.trim(), name: form.name.trim() || undefined, tariffId: form.tariffId ? form.tariffId as AllowedTariffId : undefined, organization: business ? form.organization.trim() : undefined, consent: true, formId: business ? "business-lead" : "connect-lead", consentVersion });
  };
  const chosenTariff = tariffTerritories.flatMap((territory) => territory.tariffs.map((tariff) => ({ ...tariff, territory: territory.name }))).find((tariff) => tariff.id === form.tariffId);

  if (result === "success") return <div className="form-success"><div className="success-icon"><Check size={24} /></div><div><div className="eyebrow"><span className="eyebrow-dot" />заявка записана</div><h3>Спасибо, заявка принята.</h3><p>Сотрудник проверит адрес и свяжется с вами по указанному телефону. Это не является заключением договора.</p><button className="button button-outline" onClick={() => { setForm(initialState); setResult("idle"); }}>Отправить ещё одну</button></div></div>;

  return <form className="lead-form" onSubmit={submit} noValidate>
    <div className="form-heading"><div><div className="eyebrow"><span className="eyebrow-dot" />{business ? "заявка для бизнеса" : "проверка адреса"}</div><h3>{business ? "Обсудим задачу вашей компании" : "Проверим возможность подключения"}</h3></div><span className="form-counter">01 / 04</span></div>
    <div className="form-grid">
      {business && <Field label="Название организации" error={errors.organization} required><input value={form.organization} onChange={(e) => update("organization", e.target.value)} placeholder="ООО «Компания»" /></Field>}
      <Field label="Населённый пункт" error={errors.settlement} required><select value={form.settlement} onChange={(e) => update("settlement", e.target.value)}><option value="">Выберите из списка</option><option>Вышний Волочёк</option><option>Вышневолоцкий городской округ</option><option>п. Хотилово-2</option><option>Серебряники</option><option>Садовый</option></select></Field>
      <Field label="Улица и дом" error={errors.address} required><input value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="ул. Казанская, д. 5" /></Field>
      <Field label="Телефон" error={errors.phone} required><input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+7 900 000-00-00" /></Field>
      {!business && <Field label="Имя" hint="необязательно"><input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Как к вам обращаться" /></Field>}
      {!business && <Field label="Тариф" hint="необязательно"><select value={form.tariffId} onChange={(e) => update("tariffId", e.target.value)}><option value="">Подберём после проверки</option>{tariffTerritories.map((territory) => <optgroup label={territory.name} key={territory.id}>{territory.tariffs.map((tariff) => <option key={tariff.id} value={tariff.id}>{tariff.name} · {tariff.daily} ₽/сутки</option>)}</optgroup>)}</select>{chosenTariff && <span className="field-note">Выбрано: {chosenTariff.territory}, {chosenTariff.name}</span>}</Field>}
    </div>
    <label className={`consent-row ${errors.consent ? "field-invalid" : ""}`}><input type="checkbox" checked={form.consent} onChange={(e) => update("consent", e.target.checked)} /><span>Даю <Link href="/consent">согласие на обработку персональных данных</Link> для рассмотрения заявки. <Link href="/privacy">Политика ПДн</Link>.</span></label>
    {errors.consent && <div className="field-error"><AlertCircle size={14} />{errors.consent}</div>}
    {errors.form && <div className="form-error"><AlertCircle size={16} />{errors.form} <a href="tel:+79806415074">Позвонить в поддержку</a></div>}
    <div className="form-actions"><button type="submit" className="button button-primary" disabled={result === "loading"}>{result === "loading" ? <><Loader2 size={17} className="spin" /> Сохраняем…</> : <><Send size={16} /> Отправить заявку</>}</button><span className="form-footnote">Без паспортных данных, вложений и свободного комментария.</span></div>
  </form>;
}

function Field({ label, hint, error, required, children }: { label: string; hint?: string; error?: string; required?: boolean; children: React.ReactNode }) { return <label className={`form-field ${error ? "field-invalid" : ""}`}><span className="field-label">{label} {required && <b>*</b>} {hint && <em>{hint}</em>}</span>{children}{error && <span className="field-error"><AlertCircle size={14} />{error}</span>}</label>; }
