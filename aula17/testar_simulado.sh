#!/bin/bash

# URL da rota pública de healthcheck (porta 3000 configurada em server.js)
URL="http://localhost:3030/api/v1/health"

# Realiza a requisição GET e grava apenas o HTTP Status Code em health_check.log
curl -s -o /dev/null -w "%{http_code}\n" "$URL" > health_check.log