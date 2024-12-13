import { Router } from "express";
import {
    getUsuarios, 
    getusuariosxid,
    postUsuario,
    putUsuario,
    patchUsuario,
    deleteUsuario,
    loginUsuario
} from '../controladores/usuariosCtrl.js'
import { verificarToken } from '../middlewares/authJWT.js';
const router=Router()

// Ruta de login
router.post('/login', loginUsuario); // No requiere token

//armar nuestras rutas

router.get('/usuarios', getUsuarios)  //select
router.get('/usuarios/:id', getusuariosxid)  //select x id
router.post('/usuarios',postUsuario)  //insert
router.put('/usuarios/:id',putUsuario)  //update
router.patch('/usuarios/:id',patchUsuario)  //update
router.delete('/usuarios/:id',deleteUsuario)  //delete

export default router