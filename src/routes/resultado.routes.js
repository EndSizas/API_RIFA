// /routes/resultado.routes.js
import express from 'express';
import { getResultados } from '../controladores/resultado.Ctrl.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.get('/', authMiddleware(['ADMIN', 'NORMAL']), getResultados);
export default router;

