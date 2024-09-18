import { getcon, sql, query } from "../database";


export const getrecursos = async (req, res) => {

    try {
        const pool = await getcon();
        const result = await pool.request().query(query.select_recursos)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }

}


// export const postusuarios = async (req, res) => {
//     const { Nombre, Correo, Password, TipoUsuario, FechaRegistro } = req.body;

//     if (Nombre == null || Correo == null || Password == null || TipoUsuario == null) {
//         return res.status(400).json({ msj: 'Bad Request, Por favor llena todos los campos' })
//     }

//     try {
//         const pool = await getcon()
//         await pool.request()
//             .input('nombre', sql.VarChar, Nombre)
//             .input('correo', sql.VarChar, Correo)
//             .input('password', sql.VarChar, Password)
//             .input('tipoUsuario', sql.VarChar, TipoUsuario)
//             .input('fechaRegistro', sql.DateTime, FechaRegistro)
//             .query(query.insert_usuarios)

//         const result = await pool.request().query(query.return_usuarios_id)
//         res.json(result.recordset[0]['id'])

//     } catch (error) {
//         res.status(500)
//         res.send(error.message)
//     }
// }

// // export const get_usuarios_by_credencial = async (req, res) => {

// //     const { Nombre, Contraseña } = req.body;

// //     if (Nombre == null || Contraseña == null) {
// //         return res.status(400).json({ msj: 'Bad Request, Por favor llena todos los campos' })
// //     }

// //     try {
// //         const pool = await getcon()
// //         const result = await pool.request()
// //             .input('NOMBRE', sql.VarChar, Nombre)
// //             .input('CONTRASEÑA', sql.VarChar, Contraseña)
// //             .query(query.select_usuarios_bycredencial)

// //         if (result.recordset[0] == null) {
// //             res.json("INVALIDO")
// //         } else {
// //             res.json(result.recordset[0]['NIVEL_ACCESO'])
// //         }

// //     } catch (error) {
// //         res.status(500)
// //         res.send(error.message)
// //     }
// // }

// export const getusuariosbyid = async (req, res) => {

//     const { Id } = req.params

//     try {
//         const pool = await getcon()
//         const result = await pool.request()
//             .input('id', sql.Int, Id)
//             .query(query.select_usuarios_byid)

//         res.send(result.recordset[0])
//     } catch (error) {
//         res.status(500)
//         res.send(error.message)
//     }
// }

// export const deleteusuariosbyid = async (req, res) => {
//     const { Id } = req.params

//     try {
//         const pool = await getcon()
//         await pool.request()
//             .input('id', sql.Int, Id)
//             .query(query.delete_usuarios_byid)

//         res.sendStatus(204)
//     } catch (error) {
//         res.status(500)
//         res.send(error.message)
//     }
// }


// export const updateusuarios = async (req, res) => {
//     const { Nombre, Correo, Password, TipoUsuario, FechaRegistro } = req.body;
//     const { Id } = req.params

//     if (Nombre == null || Correo == null || Password == null || TipoUsuario == null) {
//         return res.status(400).json({ msj: 'Bad Request, Por favor llena todos los campos' })
//     }

//     try {
//         const pool = await getcon()
//         await pool.request()
//             .input('ID', sql.Int, Id)
//             .input('nombre', sql.VarChar, Nombre)
//             .input('correo', sql.VarChar, Correo)
//             .input('password', sql.VarChar, Password)
//             .input('tipoUsuario', sql.VarChar, TipoUsuario)
//             .input('fechaRegistro', sql.DateTime, FechaRegistro)
//             .query(query.update_usuarios_byid)

//         res.json({ Nombre, Correo, Password, TipoUsuario, FechaRegistro })
//     } catch (error) {
//         res.status(500)
//         res.send(error.message)
//     }
// }


