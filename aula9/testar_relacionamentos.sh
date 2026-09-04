echo "========================================================="
echo " AUDITORIA DE RELACIONAMENTOS (JOIN) - BINARIO TECH"
echo "========================================================="

echo -e "\n[1] Cadastrando Veiculo Scania..."
curl -X POST http://localhost:3000/api/v1/telemetria/veiculo-teste \
    -H "Content-Type: application/json" \
    -d '{"placa": "SCA-9900", "montadora": "Scania", "modelo": "R450"}'
echo ""