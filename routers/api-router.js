const express = require('express')
const Produtos = require('../models/produtos-model')
const Vendas = require('../models/vendas-model')
const router = express.Router()

router.get('/produtos', (req, res) => {
    let query = {}
    if (req.query.key) {
        let key = new RegExp(req.query.key, 'i')
        query.$or = [{
                nome: key
            },
            {
                codigoBarras: req.query.key
            }
        ]
    }
    Produtos.find(query, null, {
        limit: 10
    }, (err, produtos) => {
        if (err) {
            console.error(err)
            return res.status(500).send("Erro ao consultar produtos.")
        }
        return res.status(200).json(produtos)
    })
})

router.post('/vendas/:id/addItem', (req, res) => {
    Vendas.findById(req.params.id, (err, venda) => {
        if (err) {
            console.error(err)
            return res.status(500).send("Erro ao buscar venda.")
        }
        Produtos.findById(req.body.produtoId, (err, produto) => {
            if (err) {
                console.error(err)
                return res.status(500).send("Erro ao buscar produto.")
            }
            let item = {
                produto: produto._id,
                qtde: req.body.qtde,
                vlUnit: produto.vlUnit
            }
            let total = venda.total + (item.qtde * produto.vlUnit)
            Vendas.findByIdAndUpdate(venda._id, {
                $set: {
                    total: total
                },
                $push: {
                    itens: item
                }
            }, (err, venda) => {
                if (err) {
                    console.error(err)
                    return res.status(500).send("Erro ao incluir item na venda.")
                }

                return res.status(200).json(venda)
            })
        })
    })
})

router.delete('/vendas/:vendaId/itens/:itemId', (req, res) => {
    Vendas.findById(req.params.vendaId, (err, venda) => {
        if (err) {
            console.error(err)
            return res.status(500).send("Erro ao buscar venda.")
        }
        let item = venda.itens.find(item => item._id == req.params.itemId)
        let total = venda.total - (item.qtde * item.vlUnit)
        Vendas.findByIdAndUpdate(venda._id, {
            $set: {
                total: total
            },
            $pull: {
                itens: {
                    _id: req.params.itemId
                }
            }
        }, (err, venda) => {
            if (err) {
                console.error(err)
                return res.status(500).send("Erro ao deletar item na venda.")
            }

            return res.status(200).json(venda)
        })
    })
})

module.exports = router