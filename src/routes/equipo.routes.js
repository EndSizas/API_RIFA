import express from 'express';
import { getEquipos } from '../controladores/equipo.Ctrl.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware(['ADMIN', 'NORMAL']), getEquipos);

export default router;
