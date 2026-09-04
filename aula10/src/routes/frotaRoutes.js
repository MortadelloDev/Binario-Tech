//const express = require('express');
//const router = express.Router();;
//const frotaController = require('../controllers/frotaController');

//router.get('/', frotaController.listarTufo);
//router.post('/veiculo', frotaController.cadastrarVeiculo);

//module.exports = router;

const express = require('express');
const router = express.Router();
const frotaController = require('../controllers/frotaController');

// ⚠️ Use 'listarTudo' e 'cadastarVeiculo' (exatamente como nomeado no objeto do controller)
router.get('/', frotaController.listarTudo);
router.post('/veiculo', frotaController.cadastarVeiculo);

module.exports = router;