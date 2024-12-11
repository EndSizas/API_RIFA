// /routes/partido.routes.js
import express from 'express';
import { registrarPartido, obtenerPartidosActivos, registrarResultado } from '../controladores/partido.Ctrl.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.post('/registrar', authMiddleware(['ADMIN']), registrarPartido);
router.get('/activos', authMiddleware(['NORMAL', 'ADMIN']), obtenerPartidosActivos);
router.post('/resultado', authMiddleware(['ADMIN']), registrarResultado);
export default router;


