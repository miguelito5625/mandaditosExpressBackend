use mandaditos;

DROP TABLE mandado;
DROP TABLE usuario;

CREATE TABLE usuario(
 id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
 nombres VARCHAR(100),
 apellidos VARCHAR(100),
 direccion VARCHAR(150),
 telefono VARCHAR(15),
 correo VARCHAR(100),
 contrasenia VARCHAR(250),
 tipoUsuario VARCHAR(15),
 estado VARCHAR(10),
 onCreated timestamp DEFAULT NOW(),
 onUpdated timestamp DEFAULT NOW() ON UPDATE NOW()
);

CREATE TABLE mandado(
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
cliente INT NOT NULL,
telefono VARCHAR(15),
direccion VARCHAR(200),
mandado TEXT(1000),
repartidor int not null,
estado VARCHAR(15),
CONSTRAINT FK_ClienteMandado FOREIGN KEY (cliente) REFERENCES usuario(id),
CONSTRAINT FK_RepartidorMandado FOREIGN KEY (repartidor) REFERENCES usuario(id)
);
