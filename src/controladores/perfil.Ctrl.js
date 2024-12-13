import { conmysql } from '../db.js';

// Obtener todos los perfiles
export const obtenerPerfiles = async (req, res) => {
    const query = 'SELECT * FROM perfil';
    
    conmysql.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json(results);
    });
};



