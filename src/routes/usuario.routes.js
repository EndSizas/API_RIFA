import { Router } from 'express';
import { obtenerUsuarios,obtenerUsuarioPorId, crearUsuario } from '../controladores/usuario.Ctrl.js'; // Cambia según los métodos que tengas implementados

const router = Router();

// Ruta para obtener todos los usuarios
router.get('/', obtenerUsuarios);

// Ruta para obtener un usuario por ID
router.get('/:id', obtenerUsuarioPorId);

// Ruta para crear un nuevo usuario
router.post('/', crearUsuario);

export default router;