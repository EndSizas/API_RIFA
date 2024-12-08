import { Router } from 'express';
import { obtenerResultados, obtenerResultadoPorId, crearResultado } from '../controladores/resultado.Ctrl.js';

const router = Router();

// Ruta para obtener todos los resultados
router.get('/', obtenerResultados);

// Ruta para obtener un resultado por ID
router.get('/:id', obtenerResultadoPorId);

// Ruta para crear un nuevo resultado
router.post('/', crearResultado);

export default router;
