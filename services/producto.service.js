import Producto from "../models/producto.model.js";

const agregarProducto = async (data) => {
    const producto = new Producto(data);
    return await producto.save();
};

const eliminarProducto = async (id) => {
    return await Producto.findByIdAndDelete(id);
};

const modificarProducto = async (id, data) => {
    await Producto.findByIdAndUpdate(id, data, { new: true });
};

const getProductoId = async (id) => {
    return await Producto.findById(id);
};

// Nueva función para filtrar productos
const filtrarProductos = async (filtros) => {
    const query = {};

    if (filtros.categoria) {
        query.categoria = filtros.categoria;
    }

    if (filtros.precioMin !== undefined && filtros.precioMax !== undefined) {
        query.precio = { $gte: filtros.precioMin, $lte: filtros.precioMax };
    } else if (filtros.precioMin !== undefined) {
        query.precio = { $gte: filtros.precioMin };
    } else if (filtros.precioMax !== undefined) {
        query.precio = { $lte: filtros.precioMax };
    }

    if (filtros.nombre) {
        query.nombre = { $regex: filtros.nombre, $options: "i" }; // Búsqueda insensible a mayúsculas
    }

    return await Producto.find(query);
};

export default {
    agregarProducto,
    eliminarProducto,
    modificarProducto,
    getProductoId,
    filtrarProductos
};