import tls from "node:tls";

const LEAD_EMAIL_TO = "buh@tkvvnet.ru";
const SMTP_TIMEOUT_MS = 15_000;

const TARIFF_LABELS: Record<string, string> = {
  "vv-10": "10М, Вышний Волочёк",
  "vv-20": "20М, Вышний Волочёк",
  "vv-50": "50М, Вышний Волочёк",
  "vv-100": "100М, Вышний Волочёк",
  "ss-3": "3М, Серебряники и Садовый",
  "ss-6": "6М, Серебряники и Садовый",
  "ss-12": "12М, Серебряники и Садовый",
  "ss-24": "24М, Серебряники и Садовый",
};

export type LeadEmailInput = {
  requestNumber: string;
  formId: "connect-lead" | "business-lead";
  settlement: string;
  address: string;
  phone: string;
  name?: string;
  tariffId?: string;
  organization?: string;
  consentVersion: string;
};

function smtpUser(): string {
  return (process.env.SMTP_USER || LEAD_EMAIL_TO).trim();
}

function smtpPass(): string {
  return process.env.SMTP_PASS || "";
}

export function buildLeadEmailText(input: LeadEmailInput): string {
  const formLabel = input.formId === "business-lead" ? "Бизнес" : "Подключение";
  const lines = [
    `Номер: ${input.requestNumber}`,
    `Тип: ${formLabel}`,
    `Населённый пункт: ${input.settlement}`,
    `Адрес: ${input.address}`,
    `Телефон: ${input.phone}`,
  ];
  if (input.name) lines.push(`Имя: ${input.name}`);
  if (input.tariffId) lines.push(`Тариф: ${TARIFF_LABELS[input.tariffId] ?? input.tariffId}`);
  if (input.organization) lines.push(`Организация: ${input.organization}`);
  lines.push(`Версия согласия: ${input.consentVersion}`);
  return lines.join("\n");
}

function encodeSubject(value: string): string {
  if (/^[\x20-\x7E]*$/.test(value)) return value;
  return `=?UTF-8?B?${Buffer.from(value, "utf8").toString("base64")}?=`;
}

function takeSmtpResponse(buffer: string): { code: number; text: string; rest: string } | null {
  const lines = buffer.split("\r\n");
  const complete: string[] = [];
  for (let index = 0; index < lines.length - 1; index += 1) {
    const line = lines[index];
    complete.push(line);
    if (line.length >= 4 && line[3] === " ") {
      return {
        code: Number(line.slice(0, 3)),
        text: complete.map((item) => item.slice(4)).join("\n"),
        rest: lines.slice(index + 1).join("\r\n"),
      };
    }
  }
  return null;
}

function buildSmtpData(from: string, to: string, subject: string, text: string): string {
  const body = text.replace(/\r?\n/g, "\r\n").split("\r\n").map((line) => (
    line.startsWith(".") ? `.${line}` : line
  )).join("\r\n");
  return [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${encodeSubject(subject)}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: 8bit",
    "",
    body,
    ".",
    "",
  ].join("\r\n");
}

function sendViaSmtp(subject: string, text: string): Promise<void> {
  const host = (process.env.SMTP_HOST || "mail.tkvvnet.ru").trim();
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = smtpUser();
  const pass = smtpPass();
  const from = user;

  return new Promise((resolve, reject) => {
    const socket = tls.connect({
      host,
      port,
      servername: host,
      rejectUnauthorized: process.env.SMTP_TLS_INSECURE !== "1",
    });

    let buffer = "";
    let stage = "greeting";
    let settled = false;

    const finish = (error?: Error) => {
      if (settled) return;
      settled = true;
      socket.end();
      if (error) reject(error);
      else resolve();
    };

    const writeLine = (line: string) => {
      socket.write(`${line}\r\n`);
    };

    const onResponse = (code: number, message: string) => {
      if (code >= 400) {
        finish(new Error(`SMTP ${code}: ${message || "ошибка"}`));
        return;
      }
      if (stage === "greeting") {
        stage = "ehlo";
        writeLine("EHLO tkvvnet.ru");
        return;
      }
      if (stage === "ehlo") {
        stage = "auth";
        writeLine("AUTH LOGIN");
        return;
      }
      if (stage === "auth") {
        stage = "user";
        writeLine(Buffer.from(user, "utf8").toString("base64"));
        return;
      }
      if (stage === "user") {
        stage = "pass";
        writeLine(Buffer.from(pass, "utf8").toString("base64"));
        return;
      }
      if (stage === "pass") {
        stage = "mail";
        writeLine(`MAIL FROM:<${from}>`);
        return;
      }
      if (stage === "mail") {
        stage = "rcpt";
        writeLine(`RCPT TO:<${LEAD_EMAIL_TO}>`);
        return;
      }
      if (stage === "rcpt") {
        stage = "data";
        writeLine("DATA");
        return;
      }
      if (stage === "data") {
        stage = "body";
        socket.write(buildSmtpData(from, LEAD_EMAIL_TO, subject, text));
        return;
      }
      if (stage === "body") {
        stage = "quit";
        writeLine("QUIT");
        finish();
      }
    };

    const consume = () => {
      let parsed = takeSmtpResponse(buffer);
      while (parsed) {
        buffer = parsed.rest;
        onResponse(parsed.code, parsed.text);
        if (settled) return;
        parsed = takeSmtpResponse(buffer);
      }
    };

    socket.setTimeout(SMTP_TIMEOUT_MS);
    socket.on("timeout", () => finish(new Error("SMTP timeout")));
    socket.on("error", (error) => finish(error));
    socket.on("end", () => {
      if (!settled) finish(new Error("SMTP connection closed"));
    });
    socket.on("data", (chunk) => {
      buffer += chunk.toString("utf8");
      consume();
    });
  });
}

export async function sendLeadEmail(input: LeadEmailInput): Promise<void> {
  if (!smtpPass()) {
    throw new Error("SMTP не настроен");
  }
  const subject = `Заявка Топком ${input.requestNumber}`;
  await sendViaSmtp(subject, buildLeadEmailText(input));
}
