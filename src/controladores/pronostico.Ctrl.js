import { conmysql } from '../db.js';

// Función para crear un pronóstico (solo usuarios normales)
export const crearPronostico = async (req, res) => {
    const { id_usr, id_par, id_res, valor, fecha_registro } = req.body;
    if (!id_usr || !id_par || !id_res || !valor) {
        return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }
    try {
        const [result] = await conmysql.query(
            'INSERT INTO pronostico (id_usr, id_par, id_res, valor, fecha_registro) VALUES (?, ?, ?, ?, ?)',
            [id_usr, id_par, id_res, valor, fecha_registro]
        );
        res.status(201).json({ id_pron: result.insertId, id_usr, id_par, id_res, valor });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el pronóstico', error });
    }
};
