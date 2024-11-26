const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware de verificación del token y autorización por rol
const verificarTokenYRol = (rolRequerido) => (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.usuario = decoded;  // Almacenamos la información decodificada del token en `req.usuario`

        // Verificación del rol del usuario
        if (req.usuario.rol !== rolRequerido) {
            return res.status(403).json({ message: 'Acceso denegado: No tienes el rol requerido' });
        }

        next();  // Si todo es válido, pasamos al siguiente middleware o controlador
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = { verificarTokenYRol };
