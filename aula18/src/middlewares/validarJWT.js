const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Token omitido -> HTTP 401
  if (!token) {
    return res.status(401).json({ mensagem: "Acesso negado. Token não informado." });
  }

  try {
    const usuario = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    req.usuario = usuario;
    next();
  } catch (err) {
    // Token inválido ou expirado -> HTTP 403
    return res.status(403).json({ mensagem: "Token inválido ou expirado." });
  }
};