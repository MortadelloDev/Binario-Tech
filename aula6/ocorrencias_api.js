const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3030;
const ARQUIVOS_DADOS = path.join(__dirname, 'ocorrencias.json');

app.use(cors());
app.use(express.json());

// Função Auxiliar: Ler Arquivo JSON
async function lerOcorrencias() {
    try {
        const dados = await fs.readFile(ARQUIVOS_DADOS, 'utf-8');
        return JSON.parse(dados);
    } catch (erro) {
        // Se o arquivo não existir, retorna array vazio e cria arquivo
        await fs.writeFile(ARQUIVOS_DADOS, '[]', 'utf-8');
        return [];
    }
}

// Função Auxiliar: Salvar no Arquivo JSON
async function salvarOcorrencias(ocorrencias) {
    await fs.writeFile(ARQUIVOS_DADOS, JSON.stringify(ocorrencias, null, 2), 'utf-8');
}

// ROTA 1: Listar todas as ocorrencias
app.get('/api/v1/ocorrencias', async (req, res) => {
    try {
        const ocorrencias = await lerOcorrencias();
        res.status(200).json(ocorrencias);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao ler base de dados em disco." });
    }
});

// ROTA 2: Cadastrar nova ocorrencia na frota
app.post('/api/v1/ocorrencias', async (req, res) => {
    try {
        const { montadora, placa, descricao, gravidade } = req.body;

        if (!montadora || !placa || !descricao) {
            return res.status(400).json({ erro: "Montadora, placa e descrição são obrigatórios." });
        }

        const ocorrencias = await lerOcorrencias();
        const novaOcorrencia = {
            id: Date.now(),
            montadora,
            placa,  
            descricao,
            gravidade: gravidade || "MEDIA",
            data_registro: new Date().toISOString()
        };

        ocorrencias.push(novaOcorrencia);
        await salvarOcorrencias(ocorrencias);

        res.status(201).json(novaOcorrencia);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao salvar ocorrência em disco." });
    }
});

// ROTA 3: Filtrar ocorrências por montadora
app.get('/api/v1/ocorrencias/montadora/:nome', async (req, res) => {
    try {
        const { nome } = req.params;
        const ocorrencias = await lerOcorrencias();

        // Filtra comparando em letras minúsculas (case-insensitive)
        const ocorrenciasFiltradas = ocorrencias.filter(
            (item) => item.montadora && item.montadora.toLowerCase() === nome.toLowerCase()
        );

        res.status(200).json(ocorrenciasFiltradas);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao buscar ocorrências por montadora." });
    }
});

// ROTA 4: Remover ocorrência por ID
app.delete('/api/v1/ocorrencias/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const ocorrencias = await lerOcorrencias();

        // Localiza o índice do registro pelo ID
        const index = ocorrencias.findIndex((item) => item.id === id);

        // Se o ID não for encontrado no arquivo, retorna status 404
        if (index === -1) {
            return res.status(404).json({ erro: "Ocorrência não encontrada." });
        }

        // Remove o item do array e guarda a ocorrência removida
        const [ocorrenciaRemovida] = ocorrencias.splice(index, 1);

        // Salva o arquivo JSON atualizado
        await salvarOcorrencias(ocorrencias);

        res.status(200).json({
            mensagem: "Ocorrência removida com sucesso.",
            removida: ocorrenciaRemovida
        });
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao remover ocorrência do disco." });
    }
});

app.listen(PORT, () => {
    console.log(`[Binario Tech] API de Ocorrências ativa na porta ${PORT}`);
});

