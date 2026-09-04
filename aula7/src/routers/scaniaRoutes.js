const express = require('express');
const router = express.Router();
const scaniaController = require('../controllers/scaniaController');
const validaVin = require('../middlewares/validaVin'); // 1. Importou o middleware

router.get('/', scaniaController.listarTelemetria);

// 2. Colocou o validaVin AQUI antes do controller:
router.post('/', validaVin, scaniaController.registrarTelemetria); 

module.exports = router;