use mandaditos;

DROP TABLE pedido;
CREATE TABLE pedido(
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
id_cliente INT NULL,
nombre_cliente VARCHAR(100),
telefono VARCHAR(15),
direccion VARCHAR(200),
pedido TEXT(1000),
precio DECIMAL(6,2) NULL,
id_repartidor int NULL,
estado VARCHAR(15),
descripcion_rechazo TEXT(500) NULL,
onCreated timestamp DEFAULT NOW(),
onUpdated timestamp DEFAULT NOW() ON UPDATE NOW(),
CONSTRAINT FK_ClienteMandado FOREIGN KEY (id_cliente) REFERENCES usuario(id),
CONSTRAINT FK_RepartidorMandado FOREIGN KEY (id_repartidor) REFERENCES usuario(id)
);

ALTER TABLE pedido
ADD descripcion_rechazo TEXT(500) NULL AFTER estado;

ALTER TABLE pedido
DROP COLUMN descripcion_rechazo;

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

DROP VIEW vista_pedidos;

CREATE VIEW vista_pedidos as
SELECT pedido.id as id_pedido, pedido.id_repartidor, pedido.id_cliente, pedido.nombre_cliente,
pedido.telefono as telefono_cliente, pedido.direccion as direccion_cliente,
pedido.pedido, pedido.precio, pedido.estado as estado_pedido, pedido.onCreated, 
pedido.onUpdated
FROM pedido
INNER JOIN usuario ON pedido.id_cliente = usuario.id;

-- select a vista con numero auto increment
SET @row_number = 0;
SELECT (@row_number:=@row_number + 1) AS fila_numero, id_cliente, nombre_cliente,
telefono_cliente, direccion_cliente, id_pedido, pedido, precio, estado_pedido, onCreated, onUpdated
FROM vista_pedidos where id_cliente = 1 AND estado_pedido = "revisado";

SELECT * FROM vista_pedidos where id_cliente = 1;

UPDATE pedido
SET estado = 'rechazado'
WHERE id_cliente = 1 AND id = 1;

SELECT * FROM mandaditos.pedido;

SELECT * FROM mandaditos.pedido
WHERE DATE(onCreated) BETWEEN '2020-06-05' AND '2020-06-07';

SELECT * FROM mandaditos.pedido
WHERE DATE(onCreated) BETWEEN '2020-06-07' AND '2020-06-07' AND estado = 'pendiente';





