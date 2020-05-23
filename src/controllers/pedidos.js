const pedidosController = {};
const pool = require('../mysql/mysql');


pedidosController.guardarPedido = async(req, res) => {
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

pedidosController.listarPedidos = async(req, res) => {

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

pedidosController.listarPedidosPorClienteYEstado = async(req, res) => {

    const idCliente = req.params.id_cliente;
    const estadoPedido = req.params.estado_pedido;
    // console.log(idCliente);

    try {
        const query = await pool.query(
            {
                sql: 'SET @row_number = 0; ' +
                'SELECT (@row_number:=@row_number + 1) AS fila_numero, id_cliente, nombre_cliente, ' +
                'telefono_cliente, direccion_cliente, pedido, estado_pedido ' +
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

    

    // res.json({
    //     message: 'ok'
    // })

};

module.exports = pedidosController;