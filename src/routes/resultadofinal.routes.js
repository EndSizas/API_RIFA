import { Router } from "express";
import {
    actualizarResultadoFinal
} from '../controladores/resultadofinalCtrl.js'
const router=Router()
//armar nuestras rutas

// Ruta para actualizar el resultado final del partido
router.patch('/resultadofinal/:id', actualizarResultadoFinal);

export default router