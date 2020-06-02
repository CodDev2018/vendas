const mongoose = require('mongoose')

const Produtos = mongoose.model('Produtos', {
    nome: String,
    vlUnit: Number,
    codigoBarras: String
});

module.exports = Produtos