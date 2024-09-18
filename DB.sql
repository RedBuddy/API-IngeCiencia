
CREATE TABLE USUARIOS (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    tipoUsuario VARCHAR(20) CHECK (tipoUsuario IN ('investigador', 'lector', 'administrador')) NOT NULL,
    fechaRegistro DATETIME DEFAULT GETDATE(),
    verificado BIT DEFAULT 0
);


CREATE TABLE ARTICULOS (
    id INT PRIMARY KEY IDENTITY(1,1),
    idInvestigador INT FOREIGN KEY REFERENCES Usuarios(id),
    titulo VARCHAR(255) NOT NULL,
    resumen VARCHAR(1000),
    contenido VARCHAR(MAX) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    archivoPDF VARCHAR(255),  -- Ruta del archivo PDF en el servidor
    fechaPublicacion DATETIME DEFAULT GETDATE(),
    estado VARCHAR(20) CHECK (estado IN ('publicado', 'borrador', 'rechazado')) DEFAULT 'publicado'
);


CREATE TABLE CATEGORIAS (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) UNIQUE NOT NULL
);


CREATE TABLE COMENTARIOS (
    id INT PRIMARY KEY IDENTITY(1,1),
    idArticulo INT FOREIGN KEY REFERENCES Articulos(id),
    idUsuario INT FOREIGN KEY REFERENCES Usuarios(id),
    comentario VARCHAR(1000) NOT NULL,
    fechaComentario DATETIME DEFAULT GETDATE()
);


CREATE TABLE RECURSOS (
    id INT PRIMARY KEY IDENTITY(1,1),
    titulo VARCHAR(255) NOT NULL,
    descripcion VARCHAR(1000),
    enlace VARCHAR(255),  -- Puede ser un enlace a un recurso externo
    archivo VARCHAR(255), -- O un archivo alojado en el servidor
    fechaPublicacion DATETIME DEFAULT GETDATE()
);


CREATE TABLE VISTAS_ARTICULOS (
    id INT PRIMARY KEY IDENTITY(1,1),
    idArticulo INT FOREIGN KEY REFERENCES Articulos(id),
    idUsuario INT FOREIGN KEY REFERENCES Usuarios(id),
    fechaVista DATETIME DEFAULT GETDATE()
);
