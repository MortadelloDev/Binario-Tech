#!/bin/bash
echo "=================================================="
echo " TESTE DE EXPIRAÇÃO DO TOKEN JWT (15 Segundos)"
echo "=================================================="

# 1. Realizar Login e extrair o Token
LOGIN_RESP=$(curl -s -X POST http://localhost:3030/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{ "email": "operador@binariotech.com.br", "senha": "SenhaSegura123!" }')

TOKEN=$(echo $LOGIN_RESP | jq -r '.token')

# 2. Teste Imediato (Token Válido)
echo -e "\n[1] Tentando aceder IMEDIATAMENTE à rota protegida..."
curl -s http://localhost:3030/api/v1/auth/perfil \
  -H "Authorization: Bearer $TOKEN" | jq .

# 3. Aguardar 16 segundos
echo -e "\n[2] Aguardando 16 segundos para o token expirar..."
sleep 16

# 4. Teste Após Expiração (Token Expirado)
echo -e "\n[3] Tentando aceder APÓS 16s (Esperado HTTP 401 - Token Expirado)..."
curl -s http://localhost:3030/api/v1/auth/perfil \
	  -H "Authorization: Bearer $TOKEN" | jq .
