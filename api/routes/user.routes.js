import { Router } from 'express';
import { getUsuarios, getUsuarioId, registerUser, actualizarUsuario, eliminarUsuario, loginUser } from '../controllers/user.controller.js';
import { validateToken, isAdmin } from '../../middleware/auth.js';

const router = Router();

router.get('/', validateToken, isAdmin, getUsuarios);
router.get('/:id', validateToken, isAdmin, getUsuarioId);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/:id', validateToken, isAdmin, actualizarUsuario);
router.delete('/:id', validateToken, isAdmin, eliminarUsuario);

export default router;