// /controladores/equipo.Ctrl.js
import { conmysql } from '../db.js';

export const getEquipos = async (req, res) => {
    const query = 'SELECT * FROM equipo';
    try {
        const [result] = await conmysql.query(query);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
};
