import { Router } from 'express';
import { getUsuarios, getUsuarioById, createUsuario } from '../controladores/usuario.Ctrl.js';

const router = Router();

router.get('/', getUsuarios);
router.get('/:id', getUsuarioById);
router.post('/', createUsuario);

export default router;
