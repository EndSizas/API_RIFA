import { Router } from 'express';
import { getEquipos, getEquipoById, createEquipo } from '../controladores/equipo.Ctrl.js';

const router = Router();

router.get('/', getEquipos);
router.get('/:id', getEquipoById);
router.post('/', createEquipo);

export default router;
