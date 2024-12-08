import { Router } from 'express';
import { obtenerPerfiles, obtenerPerfilPorId, crearPerfil } from '../controladores/perfil.Ctrl.js';

const router = Router();

// Ruta para obtener todos los perfiles
router.get('/', obtenerPerfiles);

// Ruta para obtener un perfil por ID
router.get('/:id', obtenerPerfilPorId);

// Ruta para crear un nuevo perfil
router.post('/', crearPerfil);

export default router;

