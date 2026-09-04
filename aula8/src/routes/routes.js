const express = require('express');
const router = express.Router();
const veiculosController = require('./controllers/veiculosController');

// Rotas de veículos
router.get('/veiculos', veiculosController.listarTodos);
router.get('/veiculos/:id', veiculosController.buscarPorId); // <--- Adicione esta linha
router.post('/veiculos', veiculosController.criar);

module.exports = router;