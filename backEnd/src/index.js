const express = require('express');

const rotas = require('./rotas');

const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'frontEnd')));

app.use(express.json());

app.use(rotas);

app.listen(5000);
