const usuariosRoutes = require('express').Router();
const { usuariosController } = require('../controllers/index');

usuariosRoutes.post('/registrar', usuariosController.crearUsuario)
usuariosRoutes.post('/login', usuariosController.inicioSesionUsuario)

usuariosRoutes.get('/clientes', usuariosController.listarClientes)
usuariosRoutes.get('/clientes/:id', usuariosController.detalleCliente)
usuariosRoutes.get('/repartidores', usuariosController.listarRepartidores)



module.exports = usuariosRoutes;