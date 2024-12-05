import { Router } from 'express';
import { getResultados, getResultadoById, createResultado } from '../controladores/resultado.Ctrl.js';

const router = Router();

router.get('/', getResultados);
router.get('/:id', getResultadoById);
router.post('/', createResultado);

export default router;
