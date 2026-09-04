const validaVin = (req, res, next) => {
    const { vin } = req.body;

    // Verifica se o VIN existe e se possui exatamente 12 caracteres
    if (!vin || typeof vin !== 'string' || vin.length !== 12) {
        return res.status(400).json({
            erro: "Validação recusada: O código VIN/Chassis é obrigatório e deve ter exatamente 12 caracteres."
        });
    }

    // Se estiver tudo correto, passa a requisição para o controller
    next();
};

module.exports = validaVin;