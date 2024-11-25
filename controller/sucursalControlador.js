const Sucursal = require('../models/sucursalModelo');
const Pedido = require('../models/pedidosModelo');
const Ubicacion = require('../models/ubicacionModelo');

// Crear una nueva sucursal
const crearSucursal = async (req, res) => {
    try {
        const { pedidos, nombre, ubicacion } = req.body;

        // Verificar si la ubicación existe
        const ubicacionExiste = await Ubicacion.findById(ubicacion);
        if (!ubicacionExiste) {
            return res.status(404).json({ message: 'Ubicación no encontrada' });
        }

        const nuevaSucursal = new Sucursal({ pedidos, nombre, ubicacion });
        await nuevaSucursal.save();
        res.status(201).json({ message: 'Sucursal creada', sucursal: nuevaSucursal });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear sucursal', error: error.message });
    }
};

// Obtener todas las sucursales
const obtenerSucursales = async (req, res) => {
    try {
        const sucursales = await Sucursal.find()
            .populate('pedidos') // Poblar la referencia a los pedidos
            .populate('ubicacion'); // Poblar la referencia a la ubicación
        res.status(200).json(sucursales);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener sucursales', error: error.message });
    }
};

// Obtener una sucursal por ID
const obtenerSucursalPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const sucursal = await Sucursal.findById(id)
            .populate('pedidos') // Poblar la referencia a los pedidos
            .populate('ubicacion'); // Poblar la referencia a la ubicación

        if (!sucursal) {
            return res.status(404).json({ message: 'Sucursal no encontrada' });
        }
        res.status(200).json(sucursal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener sucursal', error: error.message });
    }
};

// Actualizar una sucursal por ID
const actualizarSucursal = async (req, res) => {
    const { id } = req.params;
    const { pedidos, nombre, ubicacion } = req.body;

    try {
        // Verificar si la ubicación existe
        if (ubicacion) {
            const ubicacionExiste = await Ubicacion.findById(ubicacion);
            if (!ubicacionExiste) {
                return res.status(404).json({ message: 'Ubicación no encontrada' });
            }
        }

        const sucursalActualizada = await Sucursal.findByIdAndUpdate(
            id,
            { pedidos, nombre, ubicacion },
            { new: true }
        )
            .populate('pedidos')
            .populate('ubicacion');

        if (!sucursalActualizada) {
            return res.status(404).json({ message: 'Sucursal no encontrada' });
        }
        res.status(200).json({ message: 'Sucursal actualizada', sucursal: sucursalActualizada });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar sucursal', error: error.message });
    }
};

// Eliminar una sucursal por ID
const eliminarSucursal = async (req, res) => {
    const { id } = req.params;
    try {
        const sucursalEliminada = await Sucursal.findByIdAndDelete(id);
        if (!sucursalEliminada) {
            return res.status(404).json({ message: 'Sucursal no encontrada' });
        }
        res.status(200).json({ message: 'Sucursal eliminada', sucursal: sucursalEliminada });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar sucursal', error: error.message });
    }
};

module.exports = {
    crearSucursal,
    obtenerSucursales,
    obtenerSucursalPorId,
    actualizarSucursal,
    eliminarSucursal
};