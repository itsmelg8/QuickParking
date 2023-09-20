const express = require('express');

const rotas = require('./rotas');

const app = express();

app.use(express.static('public'));

app.use(express.json());

app.use(rotas);

app.listen(3000);
