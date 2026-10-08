const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const autenticarToken = require('../middlewares/autenticarToken');
const autorizarPerfil = require('../middlewares/autorizarPerfil');

// Rotas públicas
router.post('/register', authController.registrar);
router.post('/login', authController.login);

// Rota privada acessível por qualquer perfil autenticado
router.get('/perfil', autenticarToken, authController.perfil);

// Rota protegida EXCLUSIVA para ADMIN
router.get('/admin', autenticarToken, autorizarPerfil(['ADMIN']), (req, res) => {
  res.status(200).json({ mensagem: "Bem-vindo ao painel administrativo!" });
});

// Rota protegida acessível por ADMIN ou OPERADOR
router.get('/dashboard', autenticarToken, autorizarPerfil(['ADMIN', 'OPERADOR']), (req, res) => {
  res.status(200).json({ mensagem: "Acesso liberado ao dashboard." });
});

module.exports = router;