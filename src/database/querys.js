export const query = {
    //Tabla Usuarios
    select_usuarios: 'SELECT * FROM USUARIOS',
    insert_usuarios: 'INSERT INTO USUARIOS (Nombre, Correo, Password, TipoUsuario, FechaRegistro) VALUES (@nombre, @correo, @password, @tipoUsuario, @fechaRegistro)',
    select_usuarios_byid: 'SELECT * FROM USUARIOS WHERE Id = @id',
    select_usuarios_byname: 'SELECT * FROM USUARIOS WHERE Nombre = @nombre',
    delete_usuarios_byid: 'DELETE FROM USUARIOS WHERE Id = @id',
    update_usuarios_byid: 'UPDATE USUARIOS SET Nombre = @nombre, Correo = @correo, TipoUsuario = @tipoUsuario, FechaRegistro = @fechaRegistro WHERE Id = @id',
    return_usuarios_id: 'SELECT TOP 1 id FROM USUARIOS ORDER BY id DESC',


    //Tabla Articulos
    select_articulos: 'SELECT * FROM ARTICULOS',

    //Tabla Categorias

    select_categorias: 'SELECT * FROM CATEGORIAS',

    //Tabla Comentarios

    select_comentarios: 'SELECT * FROM COMENTARIOS',

    //Tabla Recursos

    select_recursos: 'SELECT * FROM RECURSOS',

    //Tabla Vistas Articulos

    select_vistas_articulos: 'SELECT * FROM VISTAS_ARTICULOS'


}