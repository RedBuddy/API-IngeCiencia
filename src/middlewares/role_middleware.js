
export const verifyRoles = (...allowedRoles) => {
    return async (req, res, next) => {
        const { role } = req.user; // Obtener el nombre del rol del usuario

        // Verificar si role está definido
        if (!role) {
            return res.status(403).json({ message: 'Acceso denegado: Rol no definido' });
        }

        // Verificar si el nombre del rol está en la lista de roles permitidos
        if (!allowedRoles.includes(role)) {
            return res.status(403).json({ message: 'Acceso denegado: No tienes permisos suficientes' });
        }

        next();
    };
};