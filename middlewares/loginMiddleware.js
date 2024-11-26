const jwt = require('jsonwebtoken');
const JWT_SECRET = 'tu_secreto_super_seguro';

const verificarToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
};

const esRol = (rolRequerido) => (req, res, next) => {
    if (req.usuario.rol !== rolRequerido) {
        return res.status(403).json({ message: 'Acceso denegado' });
    }
    next();
};

module.exports = { verificarToken, esRol };
