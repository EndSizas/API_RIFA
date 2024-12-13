import { Router } from "express";
import {
    getResultados, 
    getresultadosxid
} from '../controladores/resultadoCtrl.js'
const router=Router()
//armar nuestras rutas

router.get('/resultados', getResultados)  //select
router.get('/resultados/:id',getresultadosxid)  //select x id

export default router