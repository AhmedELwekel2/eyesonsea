#!/usr/bin/env bash
# Run ON THE VPS from /root/eyesonsea. Rebuilds the image and swaps the container.
# Touches only the "eyesonsea" compose project; no other container, network or nginx file.
set -euo pipefail
cd "$(dirname "$0")/.."
docker compose build --pull
docker compose up -d --remove-orphans
docker image prune -f --filter "label=com.docker.compose.project=eyesonsea" >/dev/null
echo "--- health"; sleep 2
curl -fsS -o /dev/null -w "local :3070 -> %{http_code}\n" http://127.0.0.1:3070/
