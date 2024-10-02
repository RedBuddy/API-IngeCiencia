import { verifyToken } from '../jwtconfig';

export const verifyJwtToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Verificar si el token está presente en las cabeceras
    if (!authHeader) {
        return res.status(403).json({ message: 'No se proporcionó un token' });
    }

    const token = authHeader.split(' ')[1]; // Extraer el token del header

    try {
        // Verificar el token utilizando la función de jwtConfig
        const decoded = verifyToken(token);
        req.user = decoded; // Agregar los datos del usuario decodificados al request

        next(); // Continuar con el siguiente middleware o controlador
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};
