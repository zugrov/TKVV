import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { DAYS_IN_BILLING_PERIOD, priceForPeriod } from "../content/money.ts";
import { lkUrl } from "../content/payments.ts";

const root = path.resolve(import.meta.dirname, "..");

const forbiddenSnippets = [
  "tkvv.net",
  "https://тквв",
  "до 300",
  "10 рабочих",
  "24/7",
  "круглосуточ",
  "блокировк",
];

const expectedTariffs: Array<[string, string, number]> = [
  ["vv-10", "vyshny-volochek", 20],
  ["vv-20", "vyshny-volochek", 25],
  ["vv-50", "vyshny-volochek", 39],
  ["vv-100", "vyshny-volochek", 52],
  ["ss-3", "serebryaniki-sadovy", 15],
  ["ss-6", "serebryaniki-sadovy", 23],
  ["ss-12", "serebryaniki-sadovy", 31],
  ["ss-24", "serebryaniki-sadovy", 45],
];

function readTariffs(source: string): Array<[string, string, number]> {
  const rows: Array<[string, string, number]> = [];
  const pattern =
    /id: "([^"]+)", territoryId: "([^"]+)".*pricePerDayRub: (\d+)/g;
  for (const match of source.matchAll(pattern)) {
    rows.push([match[1], match[2], Number(match[3])]);
  }
  return rows;
}

async function sourceFiles(): Promise<string[]> {
  const directories = ["content", "app", "components", "lib"];
  const files: string[] = [];
  for (const directory of directories) {
    const entries = await readdir(path.join(root, directory), { recursive: true });
    for (const entry of entries) {
      const name = String(entry);
      if (name.endsWith(".ts") || name.endsWith(".tsx")) {
        files.push(path.join(root, directory, name));
      }
    }
  }
  return files;
}

test("суточная цена за 30 дней считается умножением", () => {
  assert.equal(DAYS_IN_BILLING_PERIOD, 30);
  assert.equal(priceForPeriod(20), 600);
  assert.equal(priceForPeriod(25), 750);
  assert.equal(priceForPeriod(39), 1170);
  assert.equal(priceForPeriod(52), 1560);
  assert.equal(priceForPeriod(15), 450);
  assert.equal(priceForPeriod(23), 690);
  assert.equal(priceForPeriod(31), 930);
  assert.equal(priceForPeriod(45), 1350);
});

test("сетка тарифов совпадает с ТЗ и чужих территорий нет", async () => {
  const source = await readFile(path.join(root, "content/tariffs.ts"), "utf8");
  const rows = readTariffs(source);
  assert.deepEqual(rows.map(([id]) => id), expectedTariffs.map(([id]) => id));
  for (const [id, territoryId, speedOrPrice] of expectedTariffs) {
    const row = rows.find((item) => item[0] === id);
    assert.ok(row);
    assert.equal(row[1], territoryId);
    assert.equal(row[2], speedOrPrice);
  }
  assert.equal(source.includes("khotilovo"), false);
  assert.match(source, /findTariff[\s\S]*tariffs\.find/);
  assert.match(source, /connectHref\(tariffId: string\): string \{\s*return `\/connect\/\?tariff=\$\{tariffId\}`;/);
});

test("на главную попадают только тарифы Вышнего Волочка", async () => {
  const source = await readFile(path.join(root, "content/tariffs.ts"), "utf8");
  assert.match(source, /id: "vyshny-volochek", name: "Вышний Волочёк", isShownOnHome: true/);
  assert.match(
    source,
    /id: "serebryaniki-sadovy", name: "Серебряники, Садовый", isShownOnHome: false/,
  );
});

test("личный кабинет открывается только по http://тквв.рф", () => {
  assert.equal(lkUrl, "http://тквв.рф");
});

test("в текстах нет запрещённых обещаний и старого домена", async () => {
  const files = await sourceFiles();
  for (const file of files) {
    const source = await readFile(file, "utf8");
    for (const snippet of forbiddenSnippets) {
      assert.equal(source.includes(snippet), false, `${file} содержит «${snippet}»`);
    }
  }
});
