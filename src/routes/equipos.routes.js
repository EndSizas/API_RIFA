import { Router } from "express";
import {
    getEquipos, 
    getequiposxid
} from '../controladores/equiposCtrl.js'
const router=Router()
//armar nuestras rutas

router.get('/equipos', getEquipos)  //select
router.get('/equipos/:id',getequiposxid)  //select x id

export default router