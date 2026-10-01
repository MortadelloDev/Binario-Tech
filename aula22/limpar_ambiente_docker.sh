#!/bin/bash

echo "=========================================="
echo "  LIMPEZA DO AMBIENTE DOCKER"
echo "=========================================="

# 1. Identificar e remover containers inativos usando filtros
INACTIVE_CONTAINERS=$(docker ps -a -q -f "status=exited" -f "status=created")

if [ -n "$INACTIVE_CONTAINERS" ]; then
    echo "A remover containers inativos..."
    docker rm $INACTIVE_CONTAINERS
else
    echo "Nenhum container inativo encontrado."
fi

# 2. Identificar e remover imagens pendentes (dangling) usando filtros
DANGLING_IMAGES=$(docker images -q -f "dangling=true")

if [ -n "$DANGLING_IMAGES" ]; then
    echo "A remover imagens pendentes (dangling)..."
    docker rmi $DANGLING_IMAGES
else
    echo "Nenhuma imagem pendente encontrada."
fi

echo "=========================================="
echo "Limpeza concluída com sucesso!"
