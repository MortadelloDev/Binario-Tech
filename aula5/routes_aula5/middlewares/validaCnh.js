function validaCnhMiddleware(req, res, next) {
  const { cnh } = req.body;

  // Regex que verifica se a CNH contém exatamente 11 dígitos numéricos
  const cnhValida = /^\d{11}$/.test(cnh);

  if (!cnh || !cnhValida) {
    return res.status(400).json({
      erro: "CNH invalida. A CNH deve conter exatamente 11 digitos numericos."
    });
  }

  next();
}

module.exports = validaCnhMiddleware;