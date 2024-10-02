
import { getcon, query } from "../database"; // Importar la conexión a la base de datos y las consultas

export const verifyRoles = (...allowedRoles) => {
    return async (req, res, next) => {
        const { role_id } = req.user; // Obtener el ID del rol del usuario

        // Verificar si role_id está definido
        if (!role_id) {
            return res.status(403).json({ message: 'Acceso denegado: Rol no definido' });
        }

        try {
            // Conectar a la base de datos
            const connection = await getcon();

            // Obtener el nombre del rol a partir del role_id
            const [rows] = await connection.execute(query.select_role_byid, [role_id]);

            if (rows.length === 0) {
                return res.status(403).json({ message: 'Acceso denegado: Rol no encontrado' });
            }

            const roleName = rows[0].role_name;

            // Verificar si el nombre del rol está en la lista de roles permitidos
            if (!allowedRoles.includes(roleName)) {
                return res.status(403).json({ message: 'Acceso denegado: No tienes permisos suficientes' });
            }

            next();
        } catch (error) {
            console.error('Error al verificar roles:', error); // Log del error
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    };
};
