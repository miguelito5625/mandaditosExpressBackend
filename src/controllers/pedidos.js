const pedidosController = {};
const pool = require('../mysql/mysql');


pedidosController.guardarPedido = async (req, res) => {
    // console.log(req.body);

    try {
        const query = await pool.query('INSERT INTO pedido SET ?', req.body);
        console.log('Pedido creado exitosamente');
        console.log('id insertado: ', query[0].insertId);
        res.json({
            message: 'Pedido creado exitosamente',
            status: 'ok',
            dbServer: query[0]
        });
    } catch (error) {
        console.log(error);

        res.json({
            message: "error al intentar crear el pedido",
            status: "error",
            error
        });


    };

};

pedidosController.listarPedidos = async (req, res) => {

    try {
        const query = await pool.query('SELECT * from pedido');
        console.log('lista de pedidos listados');

        res.json(query[0]);

    } catch (error) {
        console.log(error);

        res.json({
            message: "error al listar los pedidos",
            status: "error",
            error
        });
    }

};

pedidosController.listarPedidosPorClienteYEstado = async (req, res) => {

    const idCliente = req.params.id_cliente;
    const estadoPedido = req.params.estado_pedido;

    try {
        const query = await pool.query(
            {
                sql: 'SET @row_number = 0; ' +
                    'SELECT (@row_number:=@row_number + 1) AS fila_numero, id_cliente, nombre_cliente, ' +
                    'telefono_cliente, direccion_cliente, id_pedido, pedido, precio, estado_pedido, onCreated, onUpdated ' +
                    'FROM vista_pedidos where id_cliente = ? AND estado_pedido = ?;',
                values: [idCliente, estadoPedido]
            }
        );
        console.log('lista de pedidos listados');

        res.json(query[0][1]);

    } catch (error) {
        console.log(error);

        res.json({
            message: "error al listar los pedidos",
            status: "error",
            error
        });
    }
};

pedidosController.listarPedidosPorRepartidorYEstado = async (req, res) => {

    const idRepartidor = req.params.id_repartidor;
    const estadoPedido = req.params.estado_pedido;

    try {
        const query = await pool.query(
            {
                sql: 'SET @row_number = 0; ' +
                    'SELECT (@row_number:=@row_number + 1) AS fila_numero, id_repartidor, id_cliente, nombre_cliente, ' +
                    'telefono_cliente, direccion_cliente, id_pedido, pedido, precio, estado_pedido, onCreated, onUpdated ' +
                    'FROM vista_pedidos where id_repartidor = ? AND estado_pedido = ?;',
                values: [idRepartidor, estadoPedido]
            }
        );
        console.log('lista de pedidos listados');

        res.json(query[0][1]);

    } catch (error) {
        console.log(error);

        res.json({
            message: "error al listar los pedidos",
            status: "error",
            error
        });
    }
};

pedidosController.listarPedidosPorEstado = async (req, res) => {

    // const idCliente = req.params.id_cliente;
    const estadoPedido = req.params.estado_pedido;

    try {
        const query = await pool.query(
            {
                sql: 'SET @row_number = 0; ' +
                    'SELECT (@row_number:=@row_number + 1) AS fila_numero, id_cliente, nombre_cliente, ' +
                    'telefono_cliente, direccion_cliente, id_pedido, pedido, precio, estado_pedido, onCreated, onUpdated ' +
                    'FROM vista_pedidos where estado_pedido = ?;',
                values: [estadoPedido]
            }
        );
        console.log('lista de pedidos listados');

        res.json(query[0][1]);

    } catch (error) {
        console.log(error);

        res.json({
            message: "error al listar los pedidos",
            status: "error",
            error
        });
    }
};

pedidosController.cambiarEstadoDelPedidoDelCliente = async (req, res) => {

    console.log(req.body);


    const estadoPedido = req.body.estado_pedido;
    const idPedido = req.body.id_pedido;
    // const idCliente = req.body.id_cliente;

    // res.json({
    //     message: "Pedido actualizado",
    //     status: "ok",
    //     dbServer: 'mensaje pendiente'
    // });

    try {
        const query = await pool.query(
            {
                sql: 'UPDATE pedido ' +
                    'SET estado = ? ' +
                    'WHERE id = ?; ',
                values: [estadoPedido, idPedido]
            }
        );
        console.log('Un pedido ha sido actualizado');
        console.log(query[0]);

        // res.json(query[0][1]);
        res.json({
            message: "Pedido actualizado",
            status: "ok",
            dbServer: query[0]
        });

    } catch (error) {
        console.log(error);

        res.json({
            message: "error cambiar el estado del pedido",
            status: "error",
            error
        });
    }

};

pedidosController.rechazarPedido = async (req, res) => {

    console.log(req.body);

    const idPedido = req.body.id_pedido;
    const estadoPedido = req.body.estado_pedido;
    const descripcionRechazo = req.body.descripcion_rechazo;

    try {
        const query = await pool.query(
            {
                sql: 'UPDATE pedido ' +
                'SET estado = ?, ' +
                'descripcion_rechazo = ? ' +
                'WHERE id = ?; ',
                values: [estadoPedido, descripcionRechazo, idPedido]
            }
        );
        console.log('Un pedido ha sido rechazado por un administrador');
        console.log(query[0]);

        // res.json(query[0][1]);
        res.json({
            message: "Pedido rechazado",
            status: "ok",
            dbServer: query[0]
        });

    } catch (error) {
        console.log(error);

        res.json({
            message: "error al rechazar el pedido",
            status: "error",
            error
        });
    }

};

pedidosController.revisarPedido = async (req, res) => {

    // console.log(req.body);
    const id_pedido = req.body.id_pedido;
    const direccion = req.body.direccion;
    const pedido = req.body.pedido;
    const precio = req.body.precio;
    const id_repartidor = req.body.id_repartidor;
    const estado = req.body.estado;

    try {
        const query = await pool.query(
            {
                sql: 'UPDATE pedido ' +
                'SET direccion = ?, ' +
                'pedido = ?, ' +
                'precio = ?, ' +
                'id_repartidor = ?, ' +
                'estado = ? ' +
                'WHERE id = ?;',
                values: [direccion, pedido, precio, id_repartidor, estado, id_pedido]
            }
        );
        console.log('Se ha revisado el pedido correctamente');
        console.log(query[0]);

        // res.json(query[0][1]);
        res.json({
            message: "Se ha revisado el pedido correctamente",
            status: "ok",
            dbServer: query[0]
        });

    } catch (error) {
        console.log(error);

        res.json({
            message: "Error al revisar el pedido",
            status: "error",
            error
        });
    }

};

module.exports = pedidosController;