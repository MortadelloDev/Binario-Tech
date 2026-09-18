echo "========= [${date}] Testando /status ======="
curl -s http://localhost:3030/status | jq .
echo -s "\n"

echo "====== Testando /scania/info ====="
curl -s http://localhost:3000/scania/info | jq .
echo -s "\n"

echo "===== testando uhh ======"
curl -s http://localhost:3030/vm/info | jq .
echo -s "\n"

