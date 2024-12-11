// /controladores/pronostico.Ctrl.js
import { conmysql } from '../db.js';

export const registrarPronostico = async (req, res) => {
    const { id_usr, id_par, id_res, valor } = req.body;
    const query = 'INSERT INTO pronostico (id_usr, id_par, id_res, valor, fecha_registro) VALUES (?, ?, ?, ?, NOW())';

    try {
        const [result] = await conmysql.query(query, [id_usr, id_par, id_res, valor]);
        res.json({ success: true, id: result.insertId });
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const listarAcertantes = async (req, res) => {
    const { id_par } = req.params;
    const query = `SELECT u.nombres, p.valor FROM pronostico p 
                   JOIN usuarios u ON p.id_usr = u.id_usr 
                   WHERE p.id_par = ? AND p.id_res = (SELECT id_res FROM partido WHERE id_par = ?)`;
    try {
        const [result] = await conmysql.query(query, [id_par, id_par]);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const sortearGanador = async (req, res) => {
    const { id_par } = req.params;
    const query = `SELECT u.nombres, SUM(p.valor) as total_aportes FROM pronostico p 
                   JOIN usuarios u ON p.id_usr = u.id_usr 
                   WHERE p.id_par = ? GROUP BY u.id_usr`;

    try {
        const [acertantes] = await conmysql.query(query, [id_par]);
        if (acertantes.length > 0) {
            const ganador = acertantes[Math.floor(Math.random() * acertantes.length)];
            const premio = (ganador.total_aportes * 0.1).toFixed(2);
            res.json({ ganador: ganador.nombres, premio });
        } else {
            res.status(404).json({ message: 'No hay acertantes' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

