import { Router } from 'express';
import { getPerfiles, getPerfilById, registerPartido, registerPronostico } from '../controladores/perfil.Ctrl.js';

const router = Router();

// Rutas para perfil
router.get('/', getPerfiles); // Obtener todos los perfiles
router.get('/:id', getPerfilById); // Obtener perfil por ID
router.post('/partido', registerPartido); // Registrar partido (solo administrador)
router.post('/pronostico', registerPronostico); // Registrar pronóstico (solo usuario normal)

export default router;
