import { Router } from 'express';
import { crearPartido } from '../controladores/partido.Ctrl.js';
import { verificarAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

// Ruta para crear un partido (solo administrador)
router.post('/', verificarAdmin, crearPartido);

export default router;

