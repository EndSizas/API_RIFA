import express from 'express';
import { registrarPartido, actualizarResultado } from '../controllers/partidoController.js';
import { verifyToken, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, isAdmin, registrarPartido);
router.put('/:id/resultado', verifyToken, isAdmin, actualizarResultado);

export default router;



