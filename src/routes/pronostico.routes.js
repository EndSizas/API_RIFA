import express from 'express';
import { registrarPronostico, listarAciertos } from '../controllers/pronosticoController.js';
import { verifyToken, isNormal } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, isNormal, registrarPronostico);
router.get('/aciertos', verifyToken, listarAciertos);

export default router;




