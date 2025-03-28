const express = require('express');
const routes = express.Router();

const automovel = require('./controllers/automovel');
const estadia = require('./controllers/estadia');

routes.get('/', (req, res) => {
  return res.json({ titulo: 'Estacionamento ACME' });
});


routes.post('/automoveis', automovel.create);
routes.get('/automoveis', automovel.read);
routes.get('/automoveis/:placa', automovel.readOne);
routes.put('/automoveis/:placa', automovel.update);
routes.delete('/automoveis/:placa', automovel.remove);

routes.post('/estadias', estadia.create);
routes.get('/estadias', estadia.read);
routes.get('/estadias/:id', estadia.readOne);
routes.put('/estadias/:id', estadia.update);
routes.delete('/estadias/:id', estadia.remove);

module.exports = routes;