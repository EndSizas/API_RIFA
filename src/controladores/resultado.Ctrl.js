import { conmysql } from '../db.js';

// Obtener todos los resultados
export const obtenerResultados = async (req, res) => {
    try {
        const [rows] = await conmysql.query('SELECT * FROM resultado');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los resultados', error });
    }
};

// Obtener un resultado por ID
export const obtenerResultadoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await conmysql.query('SELECT * FROM resultado WHERE id_res = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Resultado no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el resultado', error });
    }
};

// Crear un nuevo resultado
export const crearResultado = async (req, res) => {
    const { descripcion_res } = req.body;
    if (!descripcion_res) {
        return res.status(400).json({ message: 'Falta la descripción del resultado' });
    }
    try {
        const [result] = await conmysql.query(
            'INSERT INTO resultado (descripcion_res) VALUES (?)',
            [descripcion_res]
        );
        res.status(201).json({ id: result.insertId, descripcion_res });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el resultado', error });
    }
};

