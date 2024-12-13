import { Router } from "express";
import {
    getPronosticos,
    getListadoPronosticosAciertos, 
    getpronosticosxid,
    postPronostico
} from '../controladores/pronosticosCtrl.js'
const router=Router()
//armar nuestras rutas

router.get('/pronosticos', getPronosticos)  //select
router.get('/pronosticosa', getListadoPronosticosAciertos)  //select
router.get('/pronosticos/:id',getpronosticosxid)  //select x id
router.post('/pronosticos',postPronostico)  //insert

export default router