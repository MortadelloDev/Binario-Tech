const db = require('../database/connection');

const telemetriaController = {
    // Cadastrar nova leitura de telemetria associada a um veiculo
    registrarLeitura: async (req, res) => {
        try {
            const { veiculo_id, velocidade, temperatura_motor } = req.body;

            if (!veiculo_id || velocidade === undefined || temperatura_motor === undefined) {
                return res.status(400).json({ erro: "Campos 'veiculo_id', 'velocidade' e 'temperatura_motor' são obrigatórios." });
            }

            const veiculoExiste = await db('veiculos').where({ id: veiculo_id }).first();
            if (!veiculoExiste) {
                return res.status(404).json({ erro: "Veiculo informado não existe no banco de dados." });
            }

            const [id] = await db('telemetria').insert({
                veiculo_id,
                velocidade,
                temperatura: temperatura_motor
            });

            res.status(201).json({ id, veiculo_id, velocidade, temperatura_motor, mensagem: "Leitura registrada com sucesso!" });
        } catch (erro) {
            res.status(500).json({ erro: "Erro ao registrar telemetria no banco de dados." });
        }
    },

    // EXERCÍCIO 1: Listar Leituras filtradas por ID do veiculo
    buscarPorVeiculo: async (req, res) => {
        try {
            const { id } = req.params;

            const leituras = await db('telemetria').where({ veiculo_id: id });

            if (leituras.length === 0) {
                return res.status(404).json({ mensagem: "Nenhuma leitura encontrada para este veículo." });
            }

            res.status(200).json(leituras);
        } catch (erro) {
            res.status(500).json({ erro: "Erro ao buscar telemetria do veículo." });
        }
    },

    // EXERCÍCIO 3: Listar todas as leituras com filtro opcional por alerta (> 95 graus)
    listarRelatorioCompleto: async (req, res) => {
        try {
            const { alerta } = req.query;

            let query = db('telemetria')
                .join('veiculos', 'veiculos.id', '=', 'telemetria.veiculo_id')
                .select(
                    'telemetria.id as telemetria_id',
                    'veiculos.placa',
                    'veiculos.montadora',
                    'veiculos.modelo',
                    'telemetria.temperatura as temperatura_motor',
                    'telemetria.capturado_em'
                );

            // Se o query param ?alerta=true for enviado, filtra apenas motores acima de 95°C
            if (alerta === 'true') {
                query = query.where('telemetria.temperatura', '>', 95);
            }

            const relatorio = await query;

            res.status(200).json(relatorio);
        } catch (erro) {
            res.status(500).json({ erro: "Erro ao gerar relatorio com Inner Join." });
        }
    }
};

module.exports = telemetriaController;