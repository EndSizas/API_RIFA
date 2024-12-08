import { conmysql } from '../db.js';

// Función para crear un partido (solo administradores)
export const crearPartido = async (req, res) => {
    const { eq_uno, eq_dos, fecha_par, estado_par } = req.body;
    if (!eq_uno || !eq_dos || !fecha_par || !estado_par) {
        return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }
    try {
        const [result] = await conmysql.query(
            'INSERT INTO partido (eq_uno, eq_dos, fecha_par, estado_par) VALUES (?, ?, ?, ?)',
            [eq_uno, eq_dos, fecha_par, estado_par]
        );
        res.status(201).json({ id_par: result.insertId, eq_uno, eq_dos, fecha_par, estado_par });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el partido', error });
    }
};


