require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conectarBanco = require('./src/config/database');
const autenticar = require('./src/middlewares/autenticar');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());

// Rota Pública de Healthcheck
app.get('/api/v1/health', (req, res) => {
  res.json({ status: "PRONTO_PARA_EXAME", timestamp: new Date() });
});

// Rota Protegida do Simulado
app.get('/api/v1/simulado/status', autenticar, (req, res) => {
  res.json({ mensagem: "Acesso autorizado no Servidor Local!", usuario: req.usuario });
});

// Rota para geração de Token JWT de Teste (Válido por 5 minutos)
app.post('/api/v1/auth/token-teste', (req, res) => {
  const payload = {
    id: '123456',
    nome: 'Usuario Teste',
    role: 'tester'
  };

  const secret = process.env.JWT_SECRET || 'secreto';

  const token = jwt.sign(payload, secret, { expiresIn: '5m' });

  return res.status(200).json({ token });
});

conectarBanco().then(() => {
  app.listen(PORT, () => {
    console.log(`[Binário Tech] Servidor da Aula 17 ativo na porta ${PORT}`);
  });
});