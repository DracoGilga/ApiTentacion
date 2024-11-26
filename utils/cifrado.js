const crypto = require('crypto');

// Asegúrate de que las claves y el IV se obtienen correctamente desde el archivo .env
const clave = Buffer.from(process.env.CRYPTO_KEY, 'hex');  // Debería ser una cadena hexadecimal de 32 bytes
const iv = Buffer.from(process.env.CRYPTO_IV, 'hex');      // Debería ser una cadena hexadecimal de 16 bytes

const algoritmo = 'aes-256-cbc';

const cifrarTexto = (texto) => {
    const cipher = crypto.createCipheriv(algoritmo, clave, iv);
    let cifrado = cipher.update(texto);
    cifrado = Buffer.concat([cifrado, cipher.final()]);
    return iv.toString('hex') + ':' + cifrado.toString('hex');
};

// Nueva función para comparar contraseñas
const compararContrasena = (contrasenaIngresada, contrasenaAlmacenada) => {
    // Cifrar la contrasena ingresada para compararla con la contrasena almacenada
    const contrasenaIngresadaCifrada = cifrarTexto(contrasenaIngresada);
    return contrasenaIngresadaCifrada === contrasenaAlmacenada;
};

module.exports = { cifrarTexto, compararContrasena };