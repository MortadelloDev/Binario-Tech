const veiculoController = {
    cadastrar: (req, res, next) => {
        try {
            // Adicionado anoFabricacao no destructuring
            const { placa, chassi, capacidadeCargaKg, anoFabricacao } = req.body;

            if (chassi === "ERRO_SIMULADO_500") {
                throw new Error("Falha crítica no processamento interno do servidor!");
            }

            res.status(201).json({
                mensagem: "Veículo cadastrado com sucesso e dados validados!",
                veiculo: { 
                    placa, 
                    chassi, 
                    capacidadeCargaKg, 
                    anoFabricacao, // Retorna o ano caso tenha sido enviado
                    registradoEm: new Date() 
                }
            });
        } catch (erro) {
            next(erro);
        }
    }
};

module.exports = veiculoController;