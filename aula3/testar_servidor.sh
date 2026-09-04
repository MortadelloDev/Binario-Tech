#!/bin/bash

BASE_URL="http://localhost:3000"

echo "=========================================="
echo "    INICIANDO TESTES DO SERVIDOR"
echo "=========================================="
echo ""

# Teste 1: Rota /status
HORARIO=$(date +"%d/%m/%Y %H:%M:%S")
echo "[$HORARIO] Testando rota: /status"
curl -s "$BASE_URL/status"
echo -e "\n------------------------------------------\n"

# Teste 2: Rota /scania/info
HORARIO=$(date +"%d/%m/%Y %H:%M:%S")
echo "[$HORARIO] Testando rota: /scania/info"
curl -s "$BASE_URL/scania/info"
echo -e "\n------------------------------------------\n"

# Teste 3: Rota /vw/info
HORARIO=$(date +"%d/%m/%Y %H:%M:%S")
echo "[$HORARIO] Testando rota: /vw/info"
curl -s "$BASE_URL/vw/info"
echo -e "\n------------------------------------------\n"

echo "=========================================="
echo "          TESTES FINALIZADOS"
echo "=========================================="
