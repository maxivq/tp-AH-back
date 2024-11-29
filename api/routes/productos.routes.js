import { Router } from 'express';
import { getProductos, getProductsByCategory, getProductoId, agregarProducto, actualizarProducto, eliminarProducto, getLimitedProductos, upload } from '../controllers/productos.controller.js';
import { validateToken, isAdmin } from '../../middleware/auth.js';

const router = Router();

router.get('/', getProductos);
router.get('/limited', getLimitedProductos); // Nueva ruta para obtener productos limitados
router.get('/category/:categoria', getProductsByCategory);
router.get('/:id', getProductoId);
router.post('/', validateToken, isAdmin, upload.single('imagen'), agregarProducto);
router.put('/:id', validateToken, isAdmin, upload.single('imagen'), actualizarProducto);
router.delete('/:id', validateToken, isAdmin, eliminarProducto);

export default router;