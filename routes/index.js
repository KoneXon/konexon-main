const express = require('express');
const home = require('../controllers/homeController');
const servicos = require('../controllers/servicosController');
const sobre = require('../controllers/sobreController');
const produtos = require('../controllers/produtosController');
const contacto = require('../controllers/contactoController');

module.exports = (contactLimit) => {
  const router = express.Router();

  router.get('/', home.index);
  router.get('/servicos', servicos.index);
  router.get('/sobre', sobre.index);
  router.get('/produtos', produtos.index);
  router.get('/contacto', contacto.index);
  router.post('/contacto', contactLimit, contacto.submit);

  return router;
};
