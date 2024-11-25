const mongoose = require('mongoose');
const Producto = require('../../models/productoModelo');
const Cliente = require('../../models/clienteModelo');
const Administrador = require('../../models/administradorModelo');
const CategoriaProducto = require('../../models/categoriaProductoModelo');
const Insumo = require('../../models/insumoModelo');
const Pedido = require('../../models/pedidosModelo');
const Sucursal = require('../../models/sucursalModelo');
const Ubicacion = require('../../models/ubicacionModelo');

const insertarDatosIniciales = async () => {
    try {
        // Insertar insumos
        const cantidadInsumos = await Insumo.countDocuments();
        if (cantidadInsumos === 0) {
            const insumos = await Insumo.insertMany([
                { nombre: 'Harina', cantidadNeta: 1000, precioNeto: 80 },
                { nombre: 'Azúcar', cantidadNeta: 500, precioNeto: 50 },
            ]);
            console.log('Insumos insertados');
        }

        // Insertar categorías de productos
        const cantidadCategorias = await CategoriaProducto.countDocuments();
        if (cantidadCategorias === 0) {
            const categorias = await CategoriaProducto.insertMany([
                { nombreCategoria: 'Repostería', descripcionCategoria: 'Dulces y pasteles' },
                { nombreCategoria: 'Panadería', descripcionCategoria: 'Pan y otros productos de panadería' },
            ]);
            console.log('Categorías de productos insertadas');
        }

        // Insertar ubicaciones
        const cantidadUbicaciones = await Ubicacion.countDocuments();
        if (cantidadUbicaciones === 0) {
            const ubicaciones = await Ubicacion.insertMany([
                { descripcion: 'Sucursal Principal', longitud: -99.1332, latitud: 19.4326 },
                { descripcion: 'Sucursal Secundaria', longitud: -98.9815, latitud: 19.3967 },
            ]);
            console.log('Ubicaciones insertadas');
        }

        // Insertar productos
        const cantidadProductos = await Producto.countDocuments();
        if (cantidadProductos === 0) {
            const insumos = await Insumo.find();
            const categorias = await CategoriaProducto.find();

            const productos = await Producto.insertMany([
                {
                    nombreProducto: 'Pastel de chocolate',
                    cantidadStock: 20,
                    precioFinal: 150,
                    fechaVencimiento: new Date(2024, 9, 20),
                    insumos: [insumos[0]._id, insumos[1]._id],
                    catalogoProducto: categorias[0]._id,
                },
                {
                    nombreProducto: 'Pan integral',
                    cantidadStock: 30,
                    precioFinal: 50,
                    fechaVencimiento: new Date(2024, 9, 25),
                    insumos: [insumos[0]._id],
                    catalogoProducto: categorias[1]._id,
                },
            ]);
            console.log('Productos insertados');
        }

        // Insertar pedidos
        const cantidadPedidos = await Pedido.countDocuments();
        if (cantidadPedidos === 0) {
            const productos = await Producto.find();
            const clientes = await Cliente.find();

            await Pedido.insertMany([
                {
                    productos: [productos[0]._id],
                    precioTotal: 150,
                    Cliente: [clientes[0]?._id], // Asegura que haya clientes antes de asignar
                },
            ]);
            console.log('Pedidos insertados');
        }

        // Insertar sucursales
        const cantidadSucursales = await Sucursal.countDocuments();
        if (cantidadSucursales === 0) {
            const pedidos = await Pedido.find();
            const ubicaciones = await Ubicacion.find();

            await Sucursal.insertMany([
                {
                    pedidos: [pedidos[0]?._id],
                    nombre: 'Sucursal Principal',
                    ubicacion: ubicaciones[0]?._id,
                },
            ]);
            console.log('Sucursales insertadas');
        }

        // Insertar clientes
        const cantidadClientes = await Cliente.countDocuments();
        if (cantidadClientes === 0) {
            const clientes = await Cliente.insertMany([
                { nombre: 'Juan', apellidos: 'Pérez', telefono: '2281234567', fechaNacimiento: new Date(1990, 5, 12), correo: 'juan.perez@gmail.com', contrasena: '123456' },
                { nombre: 'María', apellidos: 'López', telefono: '2282345678', fechaNacimiento: new Date(1985, 7, 22), correo: 'maria.lopez@gmail.com', contrasena: 'abcdef' },
            ]);
            console.log('Clientes insertados');
        }

        // Insertar administradores
        const cantidadAdministradores = await Administrador.countDocuments();
        if (cantidadAdministradores === 0) {
            await Administrador.insertMany([
                { nombre: 'Luis', apellidos: 'Mendoza', telefono: '2286789012', usuario: 'admin1', contrasena: 'admin123' },
                { nombre: 'Laura', apellidos: 'Hernández', telefono: '2287890123', usuario: 'admin2', contrasena: 'admin456' },
            ]);
            console.log('Administradores insertados');
        }

        console.log('Datos iniciales insertados correctamente');
    } catch (error) {
        console.error(`Error al insertar datos: ${error.message}`);
    }
};

module.exports = insertarDatosIniciales;
