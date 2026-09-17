require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conectarBanco = require('./src/config/database');
const provaRoutes = require('./src/routes/provaRoutes');

const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());

// Registra as rotas da prova (/api/v1/prova/register, /api/v1/prova/login, etc.)
app.use('/api/v1/prova', provaRoutes);

// Rota Pública de Healthcheck
app.get('/api/v1/health', (req, res) => {
  res.json({ status: "PRONTO_PARA_EXAME", timestamp: new Date() });
});

conectarBanco().then(() => {
  app.listen(PORT, () => {
    console.log(`[Binário Tech] Servidor da Aula 18 ativo na porta ${PORT}`);
  });
});