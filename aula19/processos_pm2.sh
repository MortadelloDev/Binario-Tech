echo "================================="
echo "       LISTA DE PROCESSOS "
echo "================================="

echo "Listando todos os processo do pm2..."

pm2 save && pm2 status >> /home/natan.carmo/Binario-Tech/aula19/processos_pm2.log

sleep 2

echo "resultado:"

cat /home/natan.carmo/Binario-Tech/aula19/processos_pm2.log
