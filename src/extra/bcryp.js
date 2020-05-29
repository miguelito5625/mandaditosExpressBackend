const bcrypt = require('bcryptjs');

const encriptado = {};

encriptado.encriptarContrasenia = async(contrasenia) => {

    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(contrasenia, salt);
    return hash;
}

encriptado.comparar = async(contrasenia, hash) => {

    const correcto = await bcrypt.compare(contrasenia, hash);
    return correcto;    
}

module.exports = encriptado;