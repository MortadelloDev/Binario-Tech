const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'O e-mail é obrigatório.'],
    unique: true,
    lowercase: true,
    trim: true
  },
  senha: {
    type: String,
    required: [true, 'A senha é obrigatória.']
  },
  perfil: {
    type: String,
    enum: ['ADMIN', 'OPERADOR'],
    default: 'OPERADOR'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Usuario', usuarioSchema);