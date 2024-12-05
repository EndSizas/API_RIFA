import { Router } from 'express';
import { getPerfiles, getPerfilById, createPerfil } from '../controladores/perfil.Ctrl.js';

const router = Router();

router.get('/', getPerfiles);
router.get('/:id', getPerfilById);
router.post('/', createPerfil);

export default router;
