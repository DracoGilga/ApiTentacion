const express = require('express');
const router = express.Router();
const {
    crearInsumo,
    obtenerInsumos,
    obtenerInsumoPorId,
    actualizarInsumo,
    eliminarInsumo,
    calcularCosteo
} = require('../controller/insumoControlador');
const { verificarTokenYRol } = require('../middlewares/autorizacionMiddleware');


/**
 * @swagger
 * tags:
 *   name: Insumos
 *   description: Operaciones relacionadas con los insumos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Insumo:
 *       type: object
 *       required:
 *         - nombre
 *         - cantidadNeta
 *         - precioNeto
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del insumo
 *         cantidadNeta:
 *           type: number
 *           description: Cantidad neta del insumo
 *         precioNeto:
 *           type: number
 *           description: Precio neto del insumo
 *       example:
 *         nombre: "Harina"
 *         cantidadNeta: 100
 *         precioNeto: 50.00
 */

/**
 * @swagger
 * /insumos:
 *   post:
 *     tags: [Insumos]
 *     summary: Crear un nuevo insumo
 *     description: Crea un nuevo insumo en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Insumo'
 *     responses:
 *       201:
 *         description: Insumo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 insumo:
 *                   $ref: '#/components/schemas/Insumo'
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
router.post('/', verificarTokenYRol('administrador'), crearInsumo);

/**
 * @swagger
 * /insumos:
 *   get:
 *     tags: [Insumos]
 *     summary: Obtener todos los insumos
 *     description: Recupera una lista de todos los insumos disponibles.
 *     responses:
 *       200:
 *         description: Lista de insumos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Insumo'
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
router.get('/', verificarTokenYRol('administrador'), obtenerInsumos);

/**
 * @swagger
 * /insumos/{id}:
 *   get:
 *     tags: [Insumos]
 *     summary: Obtener un insumo por ID
 *     description: Recupera un insumo específico por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del insumo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Insumo obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Insumo'
 *       404:
 *         description: Insumo no encontrado
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
router.get('/:id', verificarTokenYRol('administrador'), obtenerInsumoPorId);

/**
 * @swagger
 * /insumos/{id}:
 *   put:
 *     tags: [Insumos]
 *     summary: Actualizar un insumo por ID
 *     description: Actualiza un insumo existente en la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del insumo
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Insumo'
 *     responses:
 *       200:
 *         description: Insumo actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 insumo:
 *                   $ref: '#/components/schemas/Insumo'
 *       404:
 *         description: Insumo no encontrado
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
router.put('/:id', verificarTokenYRol('administrador'), actualizarInsumo);

/**
 * @swagger
 * /insumos/{id}:
 *   delete:
 *     tags: [Insumos]
 *     summary: Eliminar un insumo por ID
 *     description: Elimina un insumo de la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del insumo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Insumo eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 insumo:
 *                   $ref: '#/components/schemas/Insumo'
 *       404:
 *         description: Insumo no encontrado
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
router.delete('/:id', verificarTokenYRol('administrador'), eliminarInsumo);

/**
 * @swagger
 * /insumos/costeo:
 *   post:
 *     tags: [Insumos]
 *     summary: Calcular el costeo de los insumos utilizados
 *     description: Calcula el costeo total de los insumos utilizados basándose en las cantidades y precios definidos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               insumosUtilizados:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     insumoId:
 *                       type: string
 *                       description: ID del insumo
 *                     cantidadUtilizada:
 *                       type: number
 *                       description: Cantidad utilizada del insumo
 *             example:
 *               insumosUtilizados:
 *                 - insumoId: "63fc7a2e4569bd1d18f37219"
 *                   cantidadUtilizada: 10
 *                 - insumoId: "63fc7a2e4569bd1d18f3721a"
 *                   cantidadUtilizada: 5
 *     responses:
 *       200:
 *         description: Cálculo del costeo exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 costoTotal:
 *                   type: number
 *                   description: Costo total calculado
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
router.post('/costeo', verificarTokenYRol('administrador'), calcularCosteo);

module.exports = router;
