const Cliente = require('../models/clienteModelo');
const Administrador = require('../models/administradorModelo');
const jwt = require('jsonwebtoken');
const { compararContrasena } = require('../utils/cifrado');

const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
    const { correo, usuario, contrasena } = req.body;

    // Validar que los campos requeridos estén presentes
    if (!correo && !usuario) {
        return res.status(400).json({ message: 'Se requiere correo o usuario' });
    }

    if (!contrasena) {
        return res.status(400).json({ message: 'Se requiere contraseña' });
    }

    try {
        let usuarioAutenticado;
        let rol;

        // Buscar cliente por correo
        if (correo) {
            usuarioAutenticado = await Cliente.findOne({ correo });
            if (usuarioAutenticado) {
                rol = usuarioAutenticado.rol;
            }
        }

        // Buscar administrador por usuario
        if (usuario) {
            usuarioAutenticado = await Administrador.findOne({ usuario });
            if (usuarioAutenticado) {
                rol = usuarioAutenticado.rol;
            }
        }

        if (!usuarioAutenticado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Validar la contraseña comparando las versiones cifradas
        const esValida = compararContrasena(contrasena, usuarioAutenticado.contrasena);
        if (!esValida) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Generar el JWT
        const token = jwt.sign(
            {
                id: usuarioAutenticado._id,
                rol: usuarioAutenticado.rol,
            },
            JWT_SECRET,
            { expiresIn: '1h' } // Expiración del token
        );

        res.status(200).json({
            message: 'Autenticación exitosa',
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al autenticar', error: error.message });
    }
};

module.exports = { login };
