const mongoose = require('mongoose');
const { cifrarTexto } = require('../utils/cifrado'); // Solo ciframos, no necesitamos descifrar
const { validarCliente } = require('../middlewares/clienteMiddleware');

const clienteEsquema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    apellidos: {
        type: String,
        required: true,
    },
    telefono: {
        type: String,
        required: true,
        set: cifrarTexto, // Cifra el número de teléfono al guardarlo
    },
    fechaNacimiento: {
        type: Date,
        required: true,
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        set: cifrarTexto, // Cifra el correo al guardarlo
    },
    contrasena: {
        type: String,
        required: true,
        set: cifrarTexto, // Cifra la contraseña al guardarla
    },
    rol: {
        type: String,
        default: 'cliente', // Define el rol predeterminado
    },
});

// Middleware para validar antes de guardar
clienteEsquema.pre('save', validarCliente);

const Cliente = mongoose.model('Cliente', clienteEsquema);
module.exports = Cliente;
