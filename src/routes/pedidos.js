const pedidosRoutes = require('express').Router();
const { pedidosController } = require('../controllers/index');

pedidosRoutes.post('/pedido', pedidosController.guardarPedido);
pedidosRoutes.put('/pedido/cambiar-estado', pedidosController.cambiarEstadoDelPedidoDelCliente);
pedidosRoutes.put('/pedido/rechazar', pedidosController.rechazarPedido);
pedidosRoutes.put('/pedido/revisar', pedidosController.revisarPedido);
pedidosRoutes.get('/pedidos/:estado_pedido', pedidosController.listarPedidosPorEstado);
pedidosRoutes.get('/cliente/:id_cliente/pedidos/:estado_pedido', pedidosController.listarPedidosPorClienteYEstado);

//prae = pendientes, revisados, aceptados, encamino
pedidosRoutes.get('/cliente/pedidos/prae/:id_cliente', pedidosController.listarPedidosPRAEPorCliente);
pedidosRoutes.get('/repartidor/:id_repartidor/pedidos/:estado_pedido', pedidosController.listarPedidosPorRepartidorYEstado);

pedidosRoutes.get('/pedidos/entregado/:id_repartidor/fechaDesde/:fechaDesde/fechaHasta/:fechaHasta', pedidosController.filtrarPedidosEntregadosPorRepartidorYFechas);


// pedidosRoutes.get('/cliente/pedidos', pedidosController.listarPedidos);




module.exports = pedidosRoutes;