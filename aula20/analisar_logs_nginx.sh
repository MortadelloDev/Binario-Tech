#!/bin/bash

LOG_FILE="/var/log/nginx/access.log"

echo "=== Últimas requisições com Status 200 OK ==="

if [ -f "$LOG_FILE" ]; then
    # Lê as últimas 15 linhas e filtra apenas as requisições com status 200
    sudo tail -n 15 "$LOG_FILE" | grep " 200 "
else
    echo "Arquivo de log não encontrado em $LOG_FILE"
fi
