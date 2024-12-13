import { Router } from 'express';
import { obtenerPerfiles } from '../controladores/perfil.Ctrl.js';

const router = Router();

router.get('/', obtenerPerfiles); // Obtener todos los perfiles

export default router;

