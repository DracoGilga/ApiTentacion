const mongoose = require('mongoose');
const Pedido = require('./pedidosModelo'); // Asegúrate de importar correctamente el modelo Pedido
const Ubicacion = require('./ubicacionModelo'); // Asegúrate de importar correctamente el modelo Ubicacion

const sucursalEsquema = new mongoose.Schema({
    pedidos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pedido', // Referencia al modelo Pedido
        }
    ],
    nombre: {
        type: String,
        required: true,
    },
    ubicacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ubicacion',
        required: true,
    },
});

const Sucursal = mongoose.model('Sucursal', sucursalEsquema);
module.exports = Sucursal;