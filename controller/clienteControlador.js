const Cliente = require('../models/clienteModelo');

// Crear un nuevo cliente
const crearCliente = async (req, res) => {
    try {
        const nuevoCliente = new Cliente(req.body);
        await nuevoCliente.save();
        res.status(201).json({ message: 'Cliente creado exitosamente', cliente: nuevoCliente });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el cliente', error: error.message });
    }
};

// Obtener todos los clientes
const obtenerClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find().select('-contrasena'); // Excluye el campo `contrasena`
        res.status(200).json(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los clientes', error: error.message });
    }
};

// Obtener un cliente por ID
const obtenerClientePorId = async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await Cliente.findById(id).select('-contrasena'); // Excluye el campo `contrasena`
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.status(200).json(cliente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el cliente', error: error.message });
    }
};

// Actualizar un cliente por ID
const actualizarCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const clienteActualizado = await Cliente.findByIdAndUpdate(id, req.body, {
            new: true,
        }).select('-contrasena'); // Excluye el campo `contrasena` en la respuesta
        if (!clienteActualizado) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.status(200).json({ message: 'Cliente actualizado exitosamente', cliente: clienteActualizado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el cliente', error: error.message });
    }
};

// Eliminar un cliente por ID
const eliminarCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const clienteEliminado = await Cliente.findByIdAndDelete(id);
        if (!clienteEliminado) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.status(200).json({ message: 'Cliente eliminado exitosamente', cliente: clienteEliminado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el cliente', error: error.message });
    }
};

module.exports = {
    crearCliente,
    obtenerClientes,
    obtenerClientePorId,
    actualizarCliente,
    eliminarCliente,
};
