#!/bin/bash

echo "=========================================="
echo " RESETANDO AMBIENTE DE TESTES - BINARIO TECH"
echo "=========================================="

# 1. Encerrar processos Node.js
echo -e "\n[1] Encerrando processos do Node.js..."
if pkill -f node > /dev/null 2>&1; then
    echo "✅ Processo(s) Node.js encerrado(s) com sucesso."
else
    echo "ℹ️ Nenhum processo Node.js em execução."
fi

# 2. Excluir o arquivo de dados ocorrencias.json
echo -e "\n[2] Removendo arquivo de persistência (ocorrencias.json)..."
if [ -f "ocorrencias.json" ]; then
    rm -f ocorrencias.json
    echo "✅ Arquivo 'ocorrencias.json' removido com sucesso."
else
    echo "ℹ️ O arquivo 'ocorrencias.json' não existia no diretório."
fi

echo -e "\n=========================================="
echo "✨ Ambiente resetado com sucesso!"
echo "=========================================="