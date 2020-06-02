const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express()
const port = 3000

//TEMPLATE
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

//BODY PARSER
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

//BANCO DE DADOS
mongoose.connect('mongodb+srv://coddev:zuD4psP4TjgtiAvx@cluster0-fyvcg.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

// ROTAS
const vendas = require('./routers/vendas-router')
const produtos = require('./routers/produtos-router')
const api = require('./routers/api-router')
app.use('/', vendas)
app.use('/produtos', produtos)
app.use('/api', api)

//LISTEN
app.listen(port, () => console.log(`Aplicação rodando na porta ${port}.`))