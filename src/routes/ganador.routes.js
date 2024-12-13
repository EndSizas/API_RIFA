import { Router } from 'express';
import { obtenerGanador } from '../controladores/ganadorCtrl.js';

const router = Router();

// Ruta para obtener el ganador
router.get('/ganadores', obtenerGanador);

export default router;