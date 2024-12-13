import { Router } from 'express';
import { obtenerEquipos, obtenerEquipoPorId } from '../controladores/equipo.Ctrl.js';

const router = Router();

router.get('/', obtenerEquipos); // Obtener todos los equipos
router.get('/:id_eq', obtenerEquipoPorId); // Obtener un equipo por ID

export default router;

