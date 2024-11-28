import { Router } from 'express';
import { getProductos, getProductoss, getProductoId, agregarProducto, actualizarProducto, eliminarProducto, getProductsByCategory, upload } from '../controllers/productos.controller.js';
import { verifyToken, isAdmin } from '../../middleware/auth.js';

const router = Router();

router.get('/', getProductos);
router.get('/limited', getProductoss);
router.get('/:id', getProductoId);
router.get('/category/:categoria', getProductsByCategory);
router.post('/', verifyToken, isAdmin, upload.single('imagen'), agregarProducto);
router.put('/:id', verifyToken, isAdmin, upload.single('imagen'), actualizarProducto);
router.delete('/:id', verifyToken, isAdmin, eliminarProducto);

export default router;