const indexController = {};
const usuariosController = require('./usuarios');

indexController.rootApi = (req, res) =>{
    res.json({
        message: "hello from root api"
    })
}


module.exports = {
    indexController,
    usuariosController
}