import { Router } from 'express';
import { getPronosticos, getPronosticoById, createPronostico } from '../controladores/pronostico.Ctrl.js';

const router = Router();

router.get('/', getPronosticos);
router.get('/:id', getPronosticoById);
router.post('/', createPronostico);

export default router;

