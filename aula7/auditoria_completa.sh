#!/bin/bash

LOG_FILE="auditoria.log"

echo "Iniciando auditoria de rotas..."

# Cria/Sobrescreve o arquivo de log com cabeçalho e data
echo "==================================================" > $LOG_FILE
echo "  AUDITORIA COMPLETA DE ROTAS - $(date)"           >> $LOG_FILE
echo "==================================================" >> $LOG_FILE

# [1] Rota GET - Scania
echo -e "\n[1] GET /api/v1/telemetria/scania" >> $LOG_FILE
curl -s http://localhost:3000/api/v1/telemetria/scania | jq . >> $LOG_FILE

# [2] Rota POST - Scania
echo -e "\n[2] POST /api/v1/telemetria/scania" >> $LOG_FILE
curl -s -X POST http://localhost:3000/api/v1/telemetria/scania \
  -H "Content-Type: application/json" \
  -d '{"modelo": "R540", "vin": "9BS555444333", "temperatura_motor": 88}' | jq . >> $LOG_FILE

# [3] Rota GET - Mercedes
echo -e "\n[3] GET /api/v1/telemetria/mercedes" >> $LOG_FILE
curl -s http://localhost:3000/api/v1/telemetria/mercedes | jq . >> $LOG_FILE

# [4] Rota POST - Mercedes
echo -e "\n[4] POST /api/v1/telemetria/mercedes" >> $LOG_FILE
curl -s -X POST http://localhost:3000/api/v1/telemetria/mercedes \
  -H "Content-Type: application/json" \
  -d '{"modelo": "Actros 2651", "vin": "9BM123456789", "temperatura_motor": 90}' | jq . >> $LOG_FILE

echo "Auditoria finalizada! Resultados gravados em '$LOG_FILE'."