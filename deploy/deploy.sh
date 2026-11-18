#!/usr/bin/env bash
# Сборка статики и выкладка в корень nginx. Конфиг Maxima не трогает.
set -euo pipefail

SRC="/opt/topkom/TKVV"
DST="/var/www/topkom/static"
NODE22="/usr/local/node-v22/bin"

if [[ ! -x "$NODE22/node" ]]; then
  echo "Нужен Node.js 22 в $NODE22" >&2
  exit 1
fi
export PATH="$NODE22:$PATH"

cd "$SRC"
git pull origin main
npm ci
npm test
npm run build

mkdir -p "$DST"
rsync -a --delete "$SRC/out/" "$DST/"
echo "Статика выложена в $DST"
