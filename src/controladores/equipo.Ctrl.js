import { conmysql } from '../db.js';

// Obtener todos los equipos
export const obtenerEquipos = async (req, res) => {
    try {
        const [rows] = await conmysql.query('SELECT * FROM equipo');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los equipos', error });
    }
};

// Obtener un equipo por ID
export const obtenerEquipoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await conmysql.query('SELECT * FROM equipo WHERE id_eq = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Equipo no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el equipo', error });
    }
};

// Crear un nuevo equipo
export const crearEquipo = async (req, res) => {
    const { nombre_eq, ciudad_eq } = req.body;
    if (!nombre_eq || !ciudad_eq) {
        return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }
    try {
        const [result] = await conmysql.query(
            'INSERT INTO equipo (nombre_eq, ciudad_eq) VALUES (?, ?)',
            [nombre_eq, ciudad_eq]
        );
        res.status(201).json({ id: result.insertId, nombre_eq, ciudad_eq });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el equipo', error });
    }
};
