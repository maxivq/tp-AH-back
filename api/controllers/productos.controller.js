import Producto from '../../models/producto.model.js';
import multer from 'multer';
import path from 'path';

// Obtener todos los productos con opción de límite
export const getProductoss = async (req, res) => {
    const limit = parseInt(req.query.limit) || 0;

    try {
        const productos = await Producto.find().limit(limit);
        res.json(productos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Configurar multer para almacenar las imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

export { upload };

export const getProductsByCategory = async (req, res) => {
    const { categoria } = req.params;

    try {
        const productos = await Producto.find({ categoria });
        res.json(productos);
    } catch (error) {
        console.error('Error al buscar productos por categoría:', error);
        res.status(500).json({ message: 'Error al buscar productos por categoría' });
    }
};

// Obtener todos los productos
export const getProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener un producto por ID
export const getProductoId = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (producto == null) {
            return res.status(404).json({ message: 'No se encontró el producto' });
        }
        res.json(producto);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Agregar un nuevo producto
export const agregarProducto = async (req, res) => {
    const { nombre, descripcion, precio, categoria } = req.body;
    const imagen = req.file ? req.file.filename : null;

    const producto = new Producto({
        nombre,
        descripcion,
        precio,
        categoria,
        imagen
    });

    try {
        const nuevoProducto = await producto.save();
        res.status(201).json(nuevoProducto);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Actualizar un producto
export const actualizarProducto = async (req, res) => {
    const { nombre, descripcion, precio, categoria } = req.body;
    const imagen = req.file ? req.file.filename : null;

    try {
        const producto = await Producto.findById(req.params.id);
        if (producto == null) {
            return res.status(404).json({ message: 'No se encontró el producto' });
        }

        producto.nombre = nombre;
        producto.descripcion = descripcion;
        producto.precio = precio;
        producto.categoria = categoria;
        if (imagen) {
            producto.imagen = imagen;
        }

        const productoActualizado = await producto.save();
        res.json(productoActualizado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Borrar un producto
export const eliminarProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndDelete(req.params.id);
        if (producto == null) {
            return res.status(404).json({ message: 'No se encontró el producto' });
        }
        res.json({ message: 'Producto eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};