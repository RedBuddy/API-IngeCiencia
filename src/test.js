const jwt = require('jsonwebtoken');

// Reemplaza esto con tu token JWT real
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJpYXQiOjE3MzEzODMxMDYsImV4cCI6MTczMTQ2OTUwNn0.XrSnjQ9bhvDWy0AHUm8ZEvWF5bXoZ3ZDqJnru9S0Vts';

// Clave secreta utilizada para firmar el token (debería estar en una variable de entorno)
// const JWT_SECRET = 'jwtuas123';
const JWT_SECRET = 'refreshjwtuas123';

// Verificar y decodificar el token
try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Contenido del token:', decoded);
} catch (error) {
    console.error('Error al verificar el token:', error.message);
}
