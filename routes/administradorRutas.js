const express = require('express');
const router = express.Router();
const administradorControlador = require('../controller/administradorControlador');
const { verificarTokenYRol } = require('../middlewares/autorizacionMiddleware');

/**
 * @swagger
 * tags:
 *   name: Administradores
 *   description: Operaciones relacionadas con los administradores
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Administrador:
 *       type: object
 *       required:
 *         - nombre
 *         - apellidos
 *         - usuario
 *         - telefono
 *         - contrasena
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del administrador
 *         apellidos:
 *           type: string
 *           description: Apellidos del administrador
 *         usuario:
 *           type: string
 *           description: Usuario del administrador
 *         telefono:
 *           type: string
 *           description: Número de teléfono del administrador
 *         contrasena:
 *           type: string
 *           description: Contraseña del administrador
 *       example:
 *         nombre: "Juan"
 *         apellidos: "Pérez García"
 *         usuario: "juanperez"
 *         telefono: "123456789"
 *         contrasena: "123456"
 */

/**
 * @swagger
 * /administradores:
 *   post:
 *     tags: [Administradores]
 *     summary: Crear un nuevo administrador
 *     description: Crea un nuevo administrador en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Administrador'
 *     responses:
 *       201:
 *         description: Administrador creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 administrador:
 *                   $ref: '#/components/schemas/Administrador'
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
router.post('/', verificarTokenYRol('administrador'), administradorControlador.crearAdministrador);

/**
 * @swagger
 * /administradores:
 *   get:
 *     tags: [Administradores]
 *     summary: Obtener todos los administradores
 *     description: Obtiene la lista de todos los administradores registrados.
 *     responses:
 *       200:
 *         description: Lista de administradores obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Administrador'
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
router.get('/', verificarTokenYRol('administrador'), administradorControlador.obtenerAdministradores);

/**
 * @swagger
 * /administradores/{id}:
 *   get:
 *     tags: [Administradores]
 *     summary: Obtener un administrador por ID
 *     description: Recupera un administrador específico mediante su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del administrador
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Administrador obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Administrador'
 *       404:
 *         description: Administrador no encontrado
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
router.get('/:id', verificarTokenYRol('administrador'), administradorControlador.obtenerAdministradorPorId);

/**
 * @swagger
 * /administradores/{id}:
 *   put:
 *     tags: [Administradores]
 *     summary: Actualizar un administrador por ID
 *     description: Actualiza los datos de un administrador existente por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del administrador
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Administrador'
 *     responses:
 *       200:
 *         description: Administrador actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 administrador:
 *                   $ref: '#/components/schemas/Administrador'
 *       404:
 *         description: Administrador no encontrado
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
router.put('/:id', verificarTokenYRol('administrador'), administradorControlador.actualizarAdministrador);

/**
 * @swagger
 * /administradores/{id}:
 *   delete:
 *     tags: [Administradores]
 *     summary: Eliminar un administrador por ID
 *     description: Elimina un administrador por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del administrador
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Administrador eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 administrador:
 *                   $ref: '#/components/schemas/Administrador'
 *       404:
 *         description: Administrador no encontrado
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
router.delete('/:id', verificarTokenYRol('administrador'), administradorControlador.eliminarAdministrador);

module.exports = router;
