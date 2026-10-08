const autorizarPerfil = (perfisPermitidos) => {
  return (req, res, next) => {
    // 1. Verifica se os dados do usuário foram anexados ao req (feito pelo autenticarToken)
    if (!req.usuario || !req.usuario.perfil) {
      return res.status(401).json({ mensagem: "Acesso não autorizado: usuário não identificado." });
    }

    // 2. Verifica se o perfil do usuário logado está na lista de perfis permitidos
    if (!perfisPermitidos.includes(req.usuario.perfil)) {
      return res.status(403).json({ 
        mensagem: "Acesso negado: você não tem permissão para acessar este recurso." 
      });
    }

    // 3. Permite a passagem para o próximo handler/controller
    next();
  };
};

module.exports = autorizarPerfil;