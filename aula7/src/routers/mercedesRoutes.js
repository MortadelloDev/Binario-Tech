const express = require('express');
const router = express.Router();
const mercedesController = require('../controllers/mercedesController');
const validaVin = require('../middlewares/validaVin');

// Rotas da Mercedes usando o mercedesController
router.get('/', mercedesController.listarFrota);


router.post('/', validaVin, mercedesController.registrarCaminhao);

module.exports = router;