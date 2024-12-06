import { conmysql } from '../db.js';

// Obtener todos los equipos
export const getEquipos = async (req, res) => {
  try {
    const [rows] = await conmysql.query('SELECT * FROM equipo');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un equipo por ID
export const getEquipoById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await conmysql.query('SELECT * FROM equipo WHERE id_eq = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Equipo no encontrado' });
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo equipo
export const createEquipo = async (req, res) => {
  try {
    const { nombre } = req.body;
    const [result] = await conmysql.query('INSERT INTO equipo (nombre) VALUES (?)', [nombre]);
    res.status(201).json({ id: result.insertId, message: 'Equipo creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
