require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importa a conexão com o banco de src/config/database.js
const conectarBanco = require('./src/config/database');

// Importa as rotas de src/routes/manutencaoRoutes.js
const manutencaoRoutes = require('./src/routes/manutencaoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/v1/manutencoes', manutencaoRoutes);

conectarBanco()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[Binario Tech] Servidor NoSQL Aula 12 ativo na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Falha ao conectar no banco de dados:', err);
  });