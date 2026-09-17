#!/bin/bash

BASE_URL="http://localhost:3030/api/v1/prova"

echo "=== 1. Cadastrando Usuário ==="
curl -s -X POST "$BASE_URL/register" \
  -H "Content-Type: application/json" \
  -d '{"email": "aluno_prova@teste.com", "senha": "123456"}' | jq .

echo -e "\n=== 2. Efetuando Login e Extraindo o Token ==="
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "aluno_prova@teste.com", "senha": "123456"}')

# Extrai a propriedade 'token' do JSON retornado via jq
TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.token')

echo "Token retornado: $TOKEN"

echo -e "\n=== 3. Acessando Rota Protegida com o Token ==="
curl -s -X GET "$BASE_URL/relatorio" \
  -H "Authorization: Bearer $TOKEN" | jq .
