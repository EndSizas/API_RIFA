// /controladores/perfil.Ctrl.js
import { conmysql } from '../db.js';

export const getPerfiles = async (req, res) => {
    const query = 'SELECT * FROM perfil';
    try {
        const [result] = await conmysql.query(query);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
};


