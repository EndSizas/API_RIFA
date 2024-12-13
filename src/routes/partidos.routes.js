import { Router } from "express";
import {
    getPartidos, 
    getpartidosxid,
    postPartido,
    getPartidosActivos
} from '../controladores/partidosCtrl.js'
const router=Router()
//armar nuestras rutas

router.get('/partidos/activos', getPartidosActivos);
router.get('/partidos', getPartidos)  //select
router.get('/partidos/:id',getpartidosxid)  //select x id
router.post('/partidos',postPartido)  //insert
//router.put('/partidos/:id',putCliente)  //update
//router.patch('/partidos/:id',patchCliente)  //update
//router.delete('/partidos/:id',deleteCliente)  //delete

export default router