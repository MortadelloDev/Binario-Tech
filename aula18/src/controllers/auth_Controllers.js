const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const authController = {
  registrar: async (req, res) => {
    try {
      const { email, senha, perfil } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ mensagem: "Email e senha são obrigatórios." });
      }

      if (senha.length < 6) {
        return res.status(400).json({ mensagem: "A senha deve ter no mínimo 6 caracteres." });
      }

      const usuarioExiste = await Usuario.findOne({ email });
      if (usuarioExiste) {
        return res.status(400).json({ mensagem: "Usuário já cadastrado." });
      }

      const senhaHash = await bcrypt.hash(senha, 10);
      const novoUsuario = await Usuario.create({
        email,
        senha: senhaHash,
        perfil: perfil || 'OPERADOR'
      });

      return res.status(201).json({ 
        mensagem: "Usuário registrado com sucesso!", 
        usuarioId: novoUsuario._id 
      });
    } catch (erro) {
      return res.status(500).json({ erro: "Erro ao registrar usuário." });
    }
  },

  login: async (req, res) => {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ mensagem: "E-mail e senha são obrigatórios." });
      }

      const usuario = await Usuario.findOne({ email });
      if (!usuario) {
        return res.status(401).json({ mensagem: "Credenciais inválidas." });
      }

      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        return res.status(401).json({ mensagem: "Credenciais inválidas." });
      }

      const token = jwt.sign(
        { id: usuario._id, email: usuario.email },
        process.env.JWT_SECRET || 'secret_key',
        { expiresIn: '30m' }
      );

      return res.status(200).json({ status: "AUTENTICADO", token });
    } catch (erro) {
      return res.status(500).json({ erro: "Erro ao realizar login." });
    }
  },

  relatorio: async (req, res) => {
    return res.status(200).json({
      mensagem: "Relatório gerado com sucesso!",
      dadosUsuario: req.usuario
    });
  }
};

module.exports = authController;