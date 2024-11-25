const express = require('express');
const router = express.Router();
const sucursalControlador = require('../controller/sucursalControlador');

/**
 * @swagger
 * tags:
 *   name: Sucursales
 *   description: Operaciones relacionadas con las sucursales
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Sucursal:
 *       type: object
 *       required:
 *         - nombre
 *         - ubicacion
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre de la sucursal
 *         ubicacion:
 *           type: string
 *           description: ID de la ubicación de la sucursal
 *         pedidos:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de pedidos asociados con la sucursal
 *       example:
 *         nombre: Sucursal Centro
 *         ubicacion: "647b9b9f5d1a3d41d6abf238"
 *         pedidos: ["647b9bb45d1a3d41d6abf239", "647b9bb45d1a3d41d6abf240"]
 */

/**
 * @swagger
 * /sucursales:
 *   post:
 *     tags: [Sucursales]
 *     summary: Crear una nueva sucursal
 *     description: Crea una nueva sucursal con los datos proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sucursal'
 *     responses:
 *       201:
 *         description: Sucursal creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 sucursal:
 *                   $ref: '#/components/schemas/Sucursal'
 *       404:
 *         description: Ubicación no encontrada
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
router.post('/', sucursalControlador.crearSucursal);

/**
 * @swagger
 * /sucursales:
 *   get:
 *     tags: [Sucursales]
 *     summary: Obtener todas las sucursales
 *     description: Obtiene una lista de todas las sucursales con los detalles de los pedidos y la ubicación.
 *     responses:
 *       200:
 *         description: Lista de sucursales obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sucursal'
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
router.get('/', sucursalControlador.obtenerSucursales);

/**
 * @swagger
 * /sucursales/{id}:
 *   get:
 *     tags: [Sucursales]
 *     summary: Obtener una sucursal por ID
 *     description: Recupera los detalles de una sucursal específica por su ID, incluyendo pedidos y ubicación.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la sucursal
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucursal obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sucursal'
 *       404:
 *         description: Sucursal no encontrada
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
router.get('/:id', sucursalControlador.obtenerSucursalPorId);

/**
 * @swagger
 * /sucursales/{id}:
 *   put:
 *     tags: [Sucursales]
 *     summary: Actualizar una sucursal por ID
 *     description: Actualiza los detalles de una sucursal existente por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la sucursal
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sucursal'
 *     responses:
 *       200:
 *         description: Sucursal actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 sucursal:
 *                   $ref: '#/components/schemas/Sucursal'
 *       404:
 *         description: Sucursal no encontrada
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
router.put('/:id', sucursalControlador.actualizarSucursal);

/**
 * @swagger
 * /sucursales/{id}:
 *   delete:
 *     tags: [Sucursales]
 *     summary: Eliminar una sucursal por ID
 *     description: Elimina una sucursal específica por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la sucursal
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucursal eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 sucursal:
 *                   $ref: '#/components/schemas/Sucursal'
 *       404:
 *         description: Sucursal no encontrada
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
router.delete('/:id', sucursalControlador.eliminarSucursal);

module.exports = router;
