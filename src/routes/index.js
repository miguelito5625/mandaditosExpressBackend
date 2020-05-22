const routes = require('express').Router();
const usuarioRoutes = require('./usuarios');
const {indexController} = require('../controllers/index');

routes.get('/', indexController.rootApi);
routes.use(usuarioRoutes);

module.exports = routes;