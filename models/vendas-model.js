const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Vendas = mongoose.model('Vendas', {
    data: Date,
    total: Number,
    itens: [{
        produto: {
            type: Schema.Types.ObjectId,
            ref: 'Produtos'
        },
        vlUnit: Number,
        qtde: Number,
        total: Number
    }]
})

module.exports = Vendas