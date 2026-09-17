const verificarContentType = (req, res, next) => {
    // Verifica se a requisição é POST e se o Content-Type não é application/json
    if (req.method === 'POST' && !req.is('json')) {
        return res.status(400).json({
            status: "ERRO_CABECALHO",
            mensagem: "O cabeçalho 'Content-Type: application/json' é obrigatório para requisições POST."
        });
    }
    next();
};

module.exports = verificarContentType;