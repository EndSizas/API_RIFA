import { conmysql } from '../db.js';

// Obtener todos los partidos
export const getPartidos = async (req, res) => {
  try {
    const [rows] = await conmysql.query('SELECT * FROM partido');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un partido por ID
export const getPartidoById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await conmysql.query('SELECT * FROM partido WHERE par_id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Partido no encontrado' });
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo partido
export const createPartido = async (req, res) => {
  try {
    const { equipo_local, equipo_visitante, fecha } = req.body;
    const [result] = await conmysql.query(
      'INSERT INTO partido (equipo_local, equipo_visitante, fecha) VALUES (?, ?, ?)',
      [equipo_local, equipo_visitante, fecha]
    );
    res.status(201).json({ id: result.insertId, message: 'Partido creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  