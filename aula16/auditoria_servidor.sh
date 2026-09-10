#!/bin/bash

echo "======================================================="
echo "               AUDITORIA DE SERVIDOR                   "
echo "======================================================="


echo "Listando status de execucao dos processos Node.js"


ps aux | grep node >> ./processos.log

echo "Resultado da lista"
sleep 2
cat processos.log
