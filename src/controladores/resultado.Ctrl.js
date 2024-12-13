import { conmysql } from '../db.js';

// Obtener todos los resultados
export const getResultados = async (req, res) => {
    const query = 'SELECT * FROM resultado';
    
    conmysql.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json(results);
    });
};

// Obtener un resultado por ID
export const obtenerResultadoPorId = async (req, res) => {
    const { id_res } = req.params;
    const query = 'SELECT * FROM resultado WHERE id_res = ?';
    
    conmysql.query(query, [id_res], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Resultado no encontrado' });
        return res.json(results[0]);
    });
};




