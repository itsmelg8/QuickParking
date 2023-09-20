const express = require('express');

const usuarioCadastro = require('./controladores/usuarioCadastro');
const login = require('./controladores/usuariologin');
const veiculoCadastro = require('./controladores/veiculoCadastro');
const veiculoReserva = require('./controladores/veiculoReserva');
const checkout = require('./controladores/checkout');

const rotas = express();

rotas.post('/cadastro', usuarioCadastro);
rotas.post('/login', login);
rotas.post('/cadastroVeiculo', veiculoCadastro);
rotas.post('/reserva', veiculoReserva);

rotas.delete('/checkout', checkout);

module.exports = rotas;