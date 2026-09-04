const express = require('express');
const router = express.Router();

// Array em memória para armazenar os orçamentos de manutenção
let manutencoes = [
  { id: 1, veiculo: "Caminhão FH 540", descricao: "Troca de óleo e filtros", valor: 1500.00 },
  { id: 2, veiculo: "Caminhão Scania R450", descricao: "Substituição de pastilhas de freio", valor: 2800.00 }
];

// Rota GET: Listar todas as manutenções
router.get('/', (req, res) => {
  res.status(200).json(manutencoes);
});

// Rota POST: Cadastrar nova manutenção
router.post('/', (req, res) => {
  const { veiculo, descricao, valor } = req.body;

  // Validação simples dos campos
  if (!veiculo || !descricao || !valor) {
    return res.status(400).json({ 
      erro: "Campos 'veiculo', 'descricao' e 'valor' sao obrigatorios." 
    });
  }

  const novaManutencao = {
    id: manutencoes.length + 1,
    veiculo,
    descricao,
    valor
  };

  manutencoes.push(novaManutencao);
  res.status(201).json(novaManutencao);
});

module.exports = router;
