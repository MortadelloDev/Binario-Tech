#!/bin/bash

# Limpa/Cria o arquivo de log no início do teste
> audit_seguranca.log

echo "=== INICIANDO TESTE DE SEGURANÇA ===" >> audit_seguranca.log
echo "Data do teste: $(date)" >> audit_seguranca.log
echo "-----------------------------------" >> audit_seguranca.log

# 3 tentativas de acesso SEM chave de API (esperado HTTP 401)
for i in {1..3}
do
   echo "Tentativa $i (Sem chave):" >> audit_seguranca.log
   curl -s -i http://localhost:3000/api/v1/motoristas >> audit_seguranca.log
   echo -e "\n-----------------------------------" >> audit_seguranca.log
done

# 1 tentativa de acesso COM chave VÁLIDA (esperado HTTP 200)
echo "Tentativa 4 (Com chave válida):" >> audit_seguranca.log
curl -s -i -H "X-API-KEY: binario-tech-secret-2026" http://localhost:3000/api/v1/motoristas >> audit_seguranca.log
echo -e "\n-----------------------------------" >> audit_seguranca.log

echo "=== TESTE FINALIZADO ===" >> audit_seguranca.log