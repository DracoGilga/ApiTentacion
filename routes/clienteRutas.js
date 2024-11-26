const express = require('express');
const router = express.Router();
const clienteControlador = require('../controller/clienteControlador');
const { verificarTokenYRol } = require('../middlewares/autorizacionMiddleware');

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Operaciones relacionadas con los clientes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Cliente:
 *       type: object
 *       required:
 *         - nombre
 *         - apellidos
 *         - telefono
 *         - fechaNacimiento
 *         - correo
 *         - contrasena
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del cliente
 *         apellidos:
 *           type: string
 *           description: Apellidos del cliente
 *         telefono:
 *           type: string
 *           description: Teléfono del cliente (cifrado)
 *         fechaNacimiento:
 *           type: string
 *           format: date
 *           description: Fecha de nacimiento del cliente
 *         correo:
 *           type: string
 *           description: Correo electrónico del cliente (cifrado)
 *         contrasena:
 *           type: string
 *           description: Contraseña del cliente (cifrada)
 *       example:
 *         nombre: Juan
 *         apellidos: Pérez García
 *         telefono: "123456789"
 *         fechaNacimiento: "1985-04-15"
 *         correo: "juan.perez@example.com"
 *         contrasena: "password123"
 */

/**
 * @swagger
 * /clientes:
 *   post:
 *     tags: [Clientes]
 *     summary: Crear un nuevo cliente
 *     description: Crea un nuevo cliente con los datos proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cliente:
 *                   $ref: '#/components/schemas/Cliente'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.post('/', clienteControlador.crearCliente);

/**
 * @swagger
 * /clientes:
 *   get:
 *     tags: [Clientes]
 *     summary: Obtener todos los clientes
 *     description: Obtiene una lista de todos los clientes.
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.get('/', verificarTokenYRol('administrador'), clienteControlador.obtenerClientes);

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     tags: [Clientes]
 *     summary: Obtener un cliente por ID
 *     description: Recupera los detalles de un cliente específico por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.get('/:id', verificarTokenYRol('administrador'), clienteControlador.obtenerClientePorId);

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     tags: [Clientes]
 *     summary: Actualizar un cliente por ID
 *     description: Actualiza los datos de un cliente existente por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cliente:
 *                   $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.put('/:id', clienteControlador.actualizarCliente);

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     tags: [Clientes]
 *     summary: Eliminar un cliente por ID
 *     description: Elimina un cliente específico por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cliente:
 *                   $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.delete('/:id', verificarTokenYRol('administrador'), clienteControlador.eliminarCliente);

module.exports = router;
