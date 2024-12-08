import { Router } from 'express';
import { obtenerUsuarios, obtenerUsuarioPorId, crearUsuario, login } from '../controladores/usuario.Ctrl.js'; // Asegúrate de importar el nuevo método login

const router = Router();

// Ruta para obtener todos los usuarios
router.get('/', obtenerUsuarios);

// Ruta para obtener un usuario por ID
router.get('/:id', obtenerUsuarioPorId);

// Ruta para crear un nuevo usuario
router.post('/', crearUsuario);

// Ruta para login (validación de usuario y clave)
router.post('/login', login); // Nueva ruta para el login

export default router;
