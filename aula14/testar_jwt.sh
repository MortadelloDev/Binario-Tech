#!/bin/bash
echo "=================================================="
echo " AUDITORIA DE AUTORIZAÇÃO POR PERFIL - AULA 14"
echo "=================================================="

# 1. Cadastrar Usuário OPERADOR
echo -e "\n[1] Registrando Usuário Operador..."
curl -s -X POST http://localhost:3030/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{ "email": "operador@binariotech.com.br", "senha": "SenhaSegura123!", "perfil": "OPERADOR" }' | jq .

# 2. Cadastrar Usuário ADMIN
echo -e "\n[2] Registrando Usuário Admin..."
curl -s -X POST http://localhost:3030/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{ "email": "admin@binariotech.com.br", "senha": "SenhaSegura123!", "perfil": "ADMIN" }' | jq .

# 3. Autenticar com o OPERADOR e salvar token
echo -e "\n[3] Realizando Login como OPERADOR..."
LOGIN_OPERADOR=$(curl -s -X POST http://localhost:3030/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{ "email": "operador@binariotech.com.br", "senha": "SenhaSegura123!" }')
TOKEN_OPERADOR=$(echo $LOGIN_OPERADOR | jq -r '.token')

# 4. Autenticar com o ADMIN e salvar token
echo -e "\n[4] Realizando Login como ADMIN..."
LOGIN_ADMIN=$(curl -s -X POST http://localhost:3030/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{ "email": "admin@binariotech.com.br", "senha": "SenhaSegura123!" }')
TOKEN_ADMIN=$(echo $LOGIN_ADMIN | jq -r '.token')

# 5. Teste Acesso Negado: OPERADOR tentando acessar Rota Apenas ADMIN
echo -e "\n[5] OPERADOR acessando Rota de ADMIN (Esperado HTTP 403 / Negado)..."
curl -s -X GET http://localhost:3030/api/v1/auth/admin \
  -H "Authorization: Bearer $TOKEN_OPERADOR" | jq .

# 6. Teste Acesso Permitido: ADMIN acessando Rota de ADMIN
echo -e "\n[6] ADMIN acessando Rota de ADMIN (Esperado HTTP 200 / Autorizado)..."
curl -s -X GET http://localhost:3030/api/v1/auth/admin \
  -H "Authorization: Bearer $TOKEN_ADMIN" | jq .