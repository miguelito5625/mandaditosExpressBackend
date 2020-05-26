const pedidosRoutes = require('express').Router();
const { pedidosController } = require('../controllers/index');

pedidosRoutes.post('/cliente/pedido', pedidosController.guardarPedido);
pedidosRoutes.get('/cliente/pedidos', pedidosController.listarPedidos);
pedidosRoutes.get('/cliente/:id_cliente/pedidos/:estado_pedido', pedidosController.listarPedidosPorClienteYEstado);

pedidosRoutes.post('/cliente/pedido/cambiar-estado', pedidosController.cambiarEstadoDelPedidoDelCliente);

module.exports = pedidosRoutes;