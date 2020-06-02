const express = require('express')
const Produtos = require('../models/produtos-model')
const router = express.Router()

router.get('/', (req, res) => {
    Produtos.find({}, (err, produtos) => {
        if (err) {
            console.error(err)
            return res.status(500).send("Erro ao consultar produtos.")
        }

        return res.render('produtos', {
            produtos: produtos
        })
    })
})

router.post('/', (req, res) => {
    let dados = req.body
    let produto = new Produtos()
    produto.nome = dados.nome
    produto.vlUnit = dados.vlUnit
    produto.codigoBarras = dados.codigoBarras
    produto.save(err => {
        if (err) {
            return res.status(500).send("Erro ao salvar o produto.")
        }
        return res.redirect('/produtos')
    })
})

router.get('/:id', (req, res) => {
    Produtos.findById(req.params.id, (err, produto) => {
        if (err) {
            console.error(err)
            return res.status(500).send("Erro ao consulta o produto.")
        }

        Produtos.find({}, (err, produtos) => {
            if (err) {
                console.error(err)
                return res.status(500).send("Erro ao consultar produtos.")
            }

            return res.render('produtos', {
                produtos: produtos,
                produto: produto
            })
        })
    })
})

router.post('/:id', (req, res) => {
    Produtos.findById(req.params.id, (err, produto) => {
        if (err) {
            console.error(err)
            return res.status(500).send("Erro ao consulta o produto.")
        }
        let dados = req.body

        produto.nome = dados.nome
        produto.vlUnit = dados.vlUnit
        produto.codigoBarras = dados.codigoBarras
        produto.save(err => {
            if (err) {
                return res.status(500).send("Erro ao salvar o produto.")
            }
            return res.redirect('/produtos')
        })
    })
})

router.delete('/:id', (req, res) => {
    Produtos.deleteOne({
        _id: req.params.id
    }, (err, produto) => {
        if (err) {
            console.error(err)
            return res.status(500).send("Erro ao consulta o produto.")
        }
        return res.send('OK')
    })
})

module.exports = router