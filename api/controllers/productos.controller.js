import * as service from "../../services/producto.service.js";
import multer from 'multer';
import path from 'path';

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

// Obtener todos los productos
export const getProductos = async (req, res) => {
  try {
    const productos = await service.getProductos();
    res.status(200).json(productos);
  } catch (err) {
    console.error('Error al obtener productos:', err);
    res.status(500).json({ message: err.message });
  }
};

// Obtener productos por categoría
export const getProductsByCategory = async (req, res) => {
  const { categoria } = req.params;

  try {
    const productos = await service.getProductosPorCategoria(categoria);
    res.status(200).json(productos);
  } catch (error) {
    console.error('Error al buscar productos por categoría:', error);
    res.status(500).json({ message: 'Error al buscar productos por categoría' });
  }
};

// Obtener un producto por ID
export const getProductoId = async (req, res) => {
  const id = req.params.id;

  try {
    const producto = await service.getProductoId(id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(producto);
  } catch (err) {
    console.error('Error al obtener producto por ID:', err);
    res.status(500).json({ message: err.message });
  }
};

// Agregar un nuevo producto
export const agregarProducto = async (req, res) => {
  const { nombre, descripcion, precio, categoria } = req.body;
  const imagen = req.file ? req.file.filename : null;

  if (!nombre || !descripcion || !precio || !categoria) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const nuevoProducto = { nombre, descripcion, precio, categoria, imagen };
    const producto = await service.agregarProducto(nuevoProducto);
    res.status(201).json(producto);
  } catch (err) {
    console.error('Error al agregar producto:', err);
    res.status(500).json({ message: err.message });
  }
};

// Actualizar un producto
export const actualizarProducto = async (req, res) => {
  const id = req.params.id;
  const { nombre, descripcion, precio, categoria } = req.body;
  const imagen = req.file ? req.file.filename : null;

  if (!nombre || !descripcion || !precio || !categoria) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const productoActualizado = { nombre, descripcion, precio, categoria, imagen };
    const producto = await service.actualizarProducto(id, productoActualizado);
    res.status(200).json(producto);
  } catch (err) {
    console.error('Error al actualizar producto:', err);
    res.status(500).json({ message: err.message });
  }
};

// Eliminar un producto
export const eliminarProducto = async (req, res) => {
  const id = req.params.id;

  try {
    await service.eliminarProducto(id);
    res.status(200).json({ message: 'Producto eliminado' });
  } catch (err) {
    console.error('Error al eliminar producto:', err);
    res.status(500).json({ message: err.message });
  }
};

// Obtener productos limitados
export const getLimitedProductos = async (req, res) => {
  try {
    const productos = await service.getLimitedProductos();
    res.status(200).json(productos);
  } catch (err) {
    console.error('Error al obtener productos limitados:', err);
    res.status(500).json({ message: err.message });
  }
};