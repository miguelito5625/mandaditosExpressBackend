const usuariosController = {};
const pool = require('../mysql/mysql');
const bcryp = require('../extra/bcryp');

// verificar si existe el usuario antes de crearlo
usuariosController.crearUsuario = async (req, res) => {
    const correo = req.body.correo;

    try {
        const query = await pool.query('SELECT COUNT(correo) as existe from usuario WHERE correo = ?', [correo]);

        const existe = query[0][0].existe;

        if (existe) { //No crea el usuario porque ya existe
            console.log('existe');
            res.json({
                message: "El usuario con este correo ya existe",
                status: "error"
            });

        } else { //crea el usuario porque no existe en la BD

            const hash = await bcryp.encriptarContrasenia(req.body.contrasenia);
            req.body.contrasenia = hash;

            const query = await pool.query('INSERT INTO usuario SET ?', req.body);
            console.log('Usuario creado exitosamente');
            console.log('id insertado: ', query[0].insertId);
            res.json({
                message: 'Usuario creado exitosamente',
                status: 'ok',
                dbServer: query[0]
            });
        }


    } catch (error) {
        console.log(error);
        res.json({
            message: "Error al intentar crear el usuario",
            status: "error",
            error
        });
    }


    // try {
    //     const query = await pool.query('INSERT INTO usuario SET ?', req.body);
    //     console.log('Usuario creado exitosamente');
    //     console.log('id insertado: ', query[0].insertId);
    //     res.json({
    //         message: 'Usuario creado exitosamente',
    //         status: 'ok',
    //         dbServer: query[0]
    //     });
    //     } catch (error) {
    //     console.log(error);

    //     res.json({
    //         message: "error al intentar crear el usuario",
    //         status: "error",
    //         error
    //     });
    // }


};

usuariosController.listarClientes = async (req, res) => {

    try {
        const query = await pool.query('SELECT * from usuario');
        console.log('lista de usuarios clientes listados');

        res.json(query[0]);

    } catch (error) {
        console.log(error);

        res.json({
            message: "error al listar los clientes",
            status: "error",
            error
        });
    }

};

usuariosController.detalleCliente = async (req, res) => {
    const idCliente = req.params.id;
    console.log('inicia');

    try {
        const [rows, fields] = await pool.execute('SELECT * from usuario WHERE id = ?', [idCliente]);
        console.log('mostrando usuario');
        console.log(rows[0]);
        // console.log(rows.length); para comprobar si existe
        res.json(rows);
    } catch (error) {
        console.log(error);

        res.json({
            message: "error al obtener detalles del cliente",
            status: "error",
            error
        });
    }


}

usuariosController.inicioSesionCliente = async (req, res) => {

    const usuarioLogin = {
        correo: req.body.userEmail,
        contrasenia: req.body.userPassword
    }

    try {
        const [rows, fields] = await pool.execute('SELECT * from usuario WHERE correo = ?', [usuarioLogin.correo]);

        if (rows.length > 0) {

            const hash = rows[0].contrasenia;

            const correcto = await bcryp.comparar(usuarioLogin.contrasenia, hash);
            if (correcto) {
                console.log('ha iniciado sesion el usuario:', usuarioLogin.correo);

                res.json({
                    message: "Inicion de sesion correcto",
                    status: "ok",
                    usuario: rows[0]
                });
            } else {
                console.log('contraseña incorrecta del usuario:', usuarioLogin.correo);

                res.json({
                    message: "Inision de sesion incorrecto",
                    status: "error"
                });
            }


        } else {
            console.log('inicio de sesion, correo no existe:', req.body.userEmail);

            res.json({
                message: "correo no existe",
                status: 'error'
            });
        }

    } catch (error) {
        console.log(error);

        res.json({
            message: "error al intentar iniciar sesion",
            status: "error",
            error
        });
    }

}

module.exports = usuariosController;