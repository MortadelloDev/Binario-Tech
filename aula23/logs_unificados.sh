#!/bin/bash
echo "=================================================="
echo "   MONITORAMENTO DE LOGS EM TEMPO REAL (API + REDIS)"
echo "=================================================="
echo ""

docker compose logs -f --tail=20