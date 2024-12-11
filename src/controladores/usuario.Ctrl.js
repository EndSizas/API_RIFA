// /controladores/usuario.Ctrl.js
import { conmysql } from '../db.js';

export const login = async (req, res) => {
    const { usuario, clave } = req.body;
    const query = 'SELECT * FROM usuarios WHERE usuario = ? AND clave = ?';
    
    try {
        const [result] = await conmysql.query(query, [usuario, clave]);
        if (result.length > 0) {
            res.json({ success: true, user: result[0] });
        } else {
            res.status(401).json({ success: false, message: 'Credenciales inválidas' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error });
    }
};







