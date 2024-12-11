// /routes/usuario.routes.js
import express from 'express';
import { login } from '../controladores/usuario.Ctrl.js';

const router = express.Router();
router.post('/login', login);
export default router;

