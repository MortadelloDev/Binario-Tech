#!/bin/bash

# Define a chave de API e a URL base
API_KEY="binario-tech-secret-2026"
BASE_URL="http://localhost:3030/api/v1"

echo "=== INICIANDO TESTE DE SEGURANÇA ==="
echo "Data do teste: $(date)"
echo "--------------------------------------------------"

# 1. Testar acesso não autorizado (sem header 'X-API-KEY') em /api/v1/motoristas (esperado HTTP 401)
echo "1. Testando acesso sem chave de API (Esperado: 401):"
curl -s -i "${BASE_URL}/motoristas"
echo -e "\n--------------------------------------------------"

# 2. Testar acesso com chave inválida ('X-API-KEY: chave-errada') (esperado HTTP 401)
echo "2. Testando acesso com chave inválida (Esperado: 401):"
curl -s -i -H "X-API-KEY: chave-errada" "${BASE_URL}/motoristas"
echo -e "\n--------------------------------------------------"

# 3. Testar tentativa de cadastro com CNH inválida usando chave válida (esperado HTTP 400)
echo "3. Testando cadastro com CNH inválida (Esperado: 400):"
curl -s -i -H "X-API-KEY: ${API_KEY}" \
     -H "Content-Type: application/json" \
     -X POST -d '{"nome": "Motorista Teste", "cnh": "123"}' \
     "${BASE_URL}/motoristas"
echo -e "\n--------------------------------------------------"

# 4. Testar acesso a uma rota inexistente como /api/v1/clientes (esperado HTTP 404)
echo "4. Testando acesso a rota inexistente (Esperado: 404):"
curl -s -i -H "X-API-KEY: ${API_KEY}" "${BASE_URL}/clientes"
echo -e "\n--------------------------------------------------"

# 5. Testar consulta e cadastro bem-sucedidos em /api/v1/motoristas e /api/v1/manutencoes
echo "5.1. Consulta de motoristas (Esperado: 200):"
curl -s -i -H "X-API-KEY: ${API_KEY}" "${BASE_URL}/motoristas"
echo -e "\n---"

echo "5.2. Cadastro de motorista bem-sucedido (Esperado: 201/200):"
curl -s -i -H "X-API-KEY: ${API_KEY}" \
     -H "Content-Type: application/json" \
     -X POST -d '{"nome": "Carlos Silva", "cnh": "12345678900"}' \
     "${BASE_URL}/motoristas"
echo -e "\n---"

echo "5.3. Consulta de manutenções (Esperado: 200):"
curl -s -i -H "X-API-KEY: ${API_KEY}" "${BASE_URL}/manutencoes"
echo -e "\n---"

echo "5.4. Cadastro de manutenção bem-sucedido (Esperado: 201/200):"
curl -s -i -H "X-API-KEY: ${API_KEY}" \
     -H "Content-Type: application/json" \
     -X POST -d '{"descricao": "Troca de óleo", "valor": 150.00}' \
     "${BASE_URL}/manutencoes"
echo -e "\n--------------------------------------------------"

echo "=== TESTE FINALIZADO ==="
