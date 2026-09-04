const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Rota de Status da Binario Tech
app.get('/status', (req, res) => {
  res.json({
    servidor: "Binario Tech Core",
    status: "OPERACIONAL",
    montadoras_atendidas: ["Scania", "Mercedes", "VW"],
    uptime_segundos: process.uptime()
  });
});

// Rota de Status da Scania:
app.get('/api/v1/scania', (req, res) => {
  res.json({
    modelo: "R 450",
    status: "OK",
    foco: "Caminhões Pesados e ônibus",
    sistema_telemetria: "Ativo",
    unidades_conectadas: 1420
  });
});

// Rota de Informações da Montadora Volkswagen
app.get('/vw/info', (req, res) => {
  res.json({
    montadora: "Volkswagen",
    status: "ALERTA",
    foco: "Caminhões Leves e Médios",
    sistema_telemetria: "RIO",
    unidades_conectadas: 850
  });
});

// Rota da Mercedes
app.get('/api/v1/mercedes', (req, res) => {
  res.json({
    montadora: "Mercedes-Benz",
    status: "OK",
    modelo: "Actros",
    foco: "Caminhões Pesados",
    sistema_telemetria: "Fleetboard",
    unidades_conectadas: 1100
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});