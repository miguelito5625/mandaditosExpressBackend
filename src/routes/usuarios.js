const usuariosRoutes = require('express').Router();
const { usuariosController } = require('../controllers/index');

usuariosRoutes.post('/registrar', usuariosController.crearCliente)
usuariosRoutes.post('/login', usuariosController.inicioSesionCliente)

usuariosRoutes.get('/clientes', usuariosController.listarClientes)
usuariosRoutes.get('/clientes/:id', usuariosController.detalleCliente)



module.exports = usuariosRoutes;