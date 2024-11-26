const mongoose = require('mongoose');
const { cifrarTexto } = require('../utils/cifrado'); // Solo ciframos, no necesitamos descifrar
const { validarAdministrador } = require('../middlewares/administradorMiddleware');

const administradorEsquema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    apellidos: {
        type: String,
        required: true,
    },
    usuario: {
        type: String,
        required: true,
        unique: true,
        set: cifrarTexto, // Cifra el número de teléfono al guardarlo
    },
    telefono: {
        type: String,
        required: true,
        set: cifrarTexto, // Cifra el número de teléfono al guardarlo
    },
    contrasena: {
        type: String,
        required: true,
        set: cifrarTexto, // Cifra la contraseña al guardarla
    },
    rol: {
        type: String,
        default: 'administrador', // Define el rol predeterminado
    },
});

administradorEsquema.pre('save', validarAdministrador);

const Administrador = mongoose.model('Administrador', administradorEsquema);
module.exports = Administrador;
