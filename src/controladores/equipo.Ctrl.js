import { conmysql } from '../db.js';

// Obtener todos los equipos
export const obtenerEquipos = async (req, res) => {
    const query = 'SELECT * FROM equipo';
    
    conmysql.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json(results);
    });
};

// Obtener un equipo por ID
export const obtenerEquipoPorId = async (req, res) => {
    const { id_eq } = req.params;
    const query = 'SELECT * FROM equipo WHERE id_eq = ?';
    
    conmysql.query(query, [id_eq], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Equipo no encontrado' });
        return res.json(results[0]);
    });
};

