#!/usr/bin/env bash
# Сборка статики и выкладка в корень nginx. Конфиг Maxima не трогает.
set -euo pipefail

SRC="/opt/topkom/TKVV"
DST="/var/www/topkom/static"

cd "$SRC"
git pull origin main
npm ci
npm test
npm run build

mkdir -p "$DST"
rsync -a --delete "$SRC/out/" "$DST/"
echo "Статика выложена в $DST"
