import express from 'express';
import { getPerfiles } from '../controladores/perfil.Ctrl.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware(['ADMIN', 'NORMAL']), getPerfiles);

export default router;
