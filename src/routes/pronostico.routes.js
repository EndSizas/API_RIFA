import { Router } from 'express';
import { crearPronostico } from '../controladores/pronostico.Ctrl.js';
import { verificarUsuarioNormal } from '../middlewares/authMiddleware.js';

const router = Router();

// Ruta para crear un pronóstico (solo usuario normal)
router.post('/', verificarUsuarioNormal, crearPronostico);

export default router;

