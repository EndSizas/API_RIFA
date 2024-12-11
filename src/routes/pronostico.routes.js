// /routes/pronostico.routes.js
import express from 'express';
import { registrarPronostico, listarAcertantes, sortearGanador } from '../controladores/pronostico.Ctrl.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.post('/registrar', authMiddleware(['NORMAL']), registrarPronostico);
router.get('/acertantes/:id_par', authMiddleware(['ADMIN']), listarAcertantes);
router.get('/sorteo/:id_par', authMiddleware(['ADMIN']), sortearGanador);
export default router;



