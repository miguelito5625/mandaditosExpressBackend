const indexController = {};
const usuariosController = require('./usuarios');
const pedidosController = require('./pedidos');

indexController.rootApi = (req, res) =>{
    res.json({
        message: "hello from root api"
    })
}


module.exports = {
    indexController,
    usuariosController,
    pedidosController
}