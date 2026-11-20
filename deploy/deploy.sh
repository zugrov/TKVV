#!/usr/bin/env bash
# Сборка второй версии и переключение nginx после проверки здоровья.
# Конфиг Maxima не трогает. Существующий .env на сервере не перезаписывает.
set -euo pipefail

SRC="/opt/topkom/TKVV"
APP="$SRC/V.2/topkom"
NODE22="/usr/local/node-v22/bin"
PORT="3100"

if [[ ! -x "$NODE22/node" ]]; then
  echo "Нужен Node.js 22 в $NODE22" >&2
  exit 1
fi
export PATH="$NODE22:$PATH"
export COREPACK_ENABLE_DOWNLOAD_PROMPT=0

cd "$SRC"
git pull origin main

cd "$APP"
corepack enable
corepack prepare pnpm@10.18.0 --activate
pnpm install --frozen-lockfile
NODE_OPTIONS="--max-old-space-size=1400" pnpm build

if [[ ! -f "$APP/.env" ]]; then
  cp "$APP/.env.example" "$APP/.env"
  chmod 600 "$APP/.env"
fi

install -m 644 "$SRC/deploy/topkom.service" /etc/systemd/system/topkom.service
systemctl daemon-reload
systemctl enable topkom
systemctl restart topkom

healthy=0
for _ in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15; do
  if curl -fsS "http://127.0.0.1:${PORT}/api/health" >/dev/null; then
    healthy=1
    break
  fi
  sleep 1
done
if [[ "$healthy" != "1" ]]; then
  echo "Приложение не ответило на /api/health, nginx не переключался" >&2
  systemctl status topkom --no-pager || true
  exit 1
fi

install -m 644 "$SRC/deploy/nginx/topkom.conf" /etc/nginx/sites-available/topkom.conf
nginx -t
systemctl reload nginx
echo "Вторая версия отвечает на порту ${PORT}"
