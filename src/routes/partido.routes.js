import { Router } from 'express';
import { getPartidos, getPartidoById, createPartido } from '../controladores/partido.Ctrl.js';

const router = Router();

router.get('/', getPartidos);
router.get('/:id', getPartidoById);
router.post('/', createPartido);

export default router;
