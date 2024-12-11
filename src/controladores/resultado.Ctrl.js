// /controladores/resultado.Ctrl.js
import { conmysql } from '../db.js';

export const getResultados = async (req, res) => {
    const query = 'SELECT * FROM resultado';
    try {
        const [result] = await conmysql.query(query);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
};



