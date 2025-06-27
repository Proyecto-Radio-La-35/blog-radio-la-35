CREATE DATABASE radio_la_35;
USE radio_la_35;

CREATE TABLE usuarios(
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre_usuario VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(254) NOT NULL UNIQUE,
    contrasenia VARCHAR(25) NOT NULL UNIQUE,
    fecha_registro DATETIME NOT NULL,
    estado_sesion BOOLEAN NOT NULL
);

CREATE TABLE mensajes_contacto(
    id_contacto INT PRIMARY KEY AUTO_INCREMENT,
    asunto VARCHAR(100) NOT NULL,
    cuerpo_mensaje TEXT NOT NULL,
    fecha_publicacion DATETIME NOT NULL,
    email VARCHAR(254) NOT NULL UNIQUE,
    id_usuario INT,
    FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

CREATE TABLE administradores(
    id_miembro INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(20) NOT NULL,
    apellido VARCHAR(20) NOT NULL,
    biografia VARCHAR(500),
    foto_url VARCHAR(70)
);

CREATE TABLE publicaciones(
    id_publicacion INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    contenido TEXT NOT NULL,
    fecha_publicacion DATETIME NOT NULL,
    id_miembro INT,
    FOREIGN KEY(id_miembro) REFERENCES administradores(id_miembro) ON DELETE CASCADE
);

CREATE TABLE comentarios(
    id_comentario INT PRIMARY KEY AUTO_INCREMENT,
    contenido TEXT NOT NULL,
    fecha_comentario DATETIME NOT NULL,
    id_usuario INT,
    id_publicacion INT,
    FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY(id_publicacion) REFERENCES publicaciones(id_publicacion) ON DELETE CASCADE
);
