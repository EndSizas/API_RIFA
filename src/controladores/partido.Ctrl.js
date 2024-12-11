// /controladores/partido.Ctrl.js
import { conmysql } from '../db.js';

export const registrarPartido = async (req, res) => {
    const { eq_uno, eq_dos, fecha_par } = req.body;
    const query = 'INSERT INTO partido (eq_uno, eq_dos, fecha_par, estado_per) VALUES (?, ?, ?, \"activo\")';

    try {
        const [result] = await conmysql.query(query, [eq_uno, eq_dos, fecha_par]);
        res.json({ success: true, id: result.insertId });
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const obtenerPartidosActivos = async (req, res) => {
    const query = 'SELECT * FROM partido WHERE estado_per = \"activo\"';
    try {
        const [result] = await conmysql.query(query);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const registrarResultado = async (req, res) => {
    const { id_par, id_res } = req.body;
    const query = 'UPDATE partido SET id_res = ?, estado_per = \"cerrado\" WHERE id_par = ?';
    try {
        await conmysql.query(query, [id_res, id_par]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error });
    }
};



