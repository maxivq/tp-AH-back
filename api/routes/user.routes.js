import { Router } from 'express';
import { registerUser, loginUser, getUsers, deleteUser } from '../controllers/user.controller.js';
import { verifyToken, isAdmin } from '../../middleware/auth.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', [verifyToken, isAdmin], getUsers);
router.delete('/:id', [verifyToken, isAdmin], deleteUser);

export default router;