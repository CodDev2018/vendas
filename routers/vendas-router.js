const express = require('express')
const Vendas = require('../models/vendas-model')
const router = express.Router()

router.get('/', (req, res) => {
    return res.render('vendas', {})
})

router.post('/', (req, res) => {
    let venda = new Vendas()
    venda.data = new Date()
    venda.total = 0.0
    venda.save((err, venda) => {
        if (err) {
            return res.status(500).send("Erro ao criar a venda.")
        }
        return res.redirect('/vendas/' + venda._id)
    })
})

router.get('/vendas/:id', (req, res) => {
    Vendas.findById(req.params.id)
        .populate({
            path: 'itens.produto',
            module: 'Produtos'
        })
        .exec((err, venda) => {
            if (err) {
                return res.status(500).send("Erro ao consulta a venda.")
            }
            return res.render('vendas', {
                venda: venda
            })
        })
})

module.exports = router