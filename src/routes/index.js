const routes = require('express').Router();
const usuarioRoutes = require('./usuarios');
const pedidosRoutes = require('./pedidos');
const {indexController} = require('../controllers/index');

routes.get('/', indexController.rootApi);
routes.use(usuarioRoutes);
routes.use(pedidosRoutes);

module.exports = routes;