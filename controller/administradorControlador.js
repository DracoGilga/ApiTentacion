const Administrador = require('../models/administradorModelo');

// Crear un nuevo administrador
const crearAdministrador = async (req, res) => {
    try {
        const nuevoAdministrador = new Administrador(req.body);
        await nuevoAdministrador.save();
        res.status(201).json({ message: 'Administrador creado', administrador: nuevoAdministrador });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear administrador', error: error.message });
    }
};

// Obtener todos los administradores
const obtenerAdministradores = async (req, res) => {
    try {
        const administradores = await Administrador.find();
        res.status(200).json(administradores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener administradores', error: error.message });
    }
};

// Obtener un administrador por ID
const obtenerAdministradorPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const administrador = await Administrador.findById(id);
        if (!administrador) {
            return res.status(404).json({ message: 'Administrador no encontrado' });
        }
        res.status(200).json(administrador);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener administrador', error: error.message });
    }
};

// Actualizar un administrador por ID
const actualizarAdministrador = async (req, res) => {
    const { id } = req.params;
    try {
        const administradorActualizado = await Administrador.findByIdAndUpdate(id, req.body, { new: true });
        if (!administradorActualizado) {
            return res.status(404).json({ message: 'Administrador no encontrado' });
        }
        res.status(200).json({ message: 'Administrador actualizado', administrador: administradorActualizado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar administrador', error: error.message });
    }
};

// Eliminar un administrador por ID
const eliminarAdministrador = async (req, res) => {
    const { id } = req.params;
    try {
        const administradorEliminado = await Administrador.findByIdAndDelete(id);
        if (!administradorEliminado) {
            return res.status(404).json({ message: 'Administrador no encontrado' });
        }
        res.status(200).json({ message: 'Administrador eliminado', administrador: administradorEliminado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar administrador', error: error.message });
    }
};

module.exports = {
    crearAdministrador,
    obtenerAdministradores,
    obtenerAdministradorPorId,
    actualizarAdministrador,
    eliminarAdministrador
};
