import { Router } from 'express';
import { obtenerEquipos, obtenerEquipoPorId, crearEquipo } from '../controladores/equipo.Ctrl.js';

const router = Router();

// Ruta para obtener todos los equipos
router.get('/', obtenerEquipos);

// Ruta para obtener un equipo por ID
router.get('/:id', obtenerEquipoPorId);

// Ruta para crear un nuevo equipo
router.post('/', crearEquipo);

export default router;

