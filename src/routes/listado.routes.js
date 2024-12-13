import { Router } from "express";
import {
    getAciertos
} from '../controladores/listadoCtrl.js'
const router=Router()
//armar nuestras rutas

// Ruta para listar las personas que acertaron en el pronóstico
router.get('/listado', getAciertos);

export default router