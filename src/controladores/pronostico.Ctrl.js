import { conmysql } from '../db.js';

// Obtener todos los pronósticos
export const getPronosticos = async (req, res) => {
  try {
    const [rows] = await conmysql.query('SELECT * FROM pronostico');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un pronóstico por ID
export const getPronosticoById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await conmysql.query('SELECT * FROM pronostico WHERE id_pron = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Pronóstico no encontrado' });
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo pronóstico
export const createPronostico = async (req, res) => {
  try {
    const { partido_id, usuario_id, resultado } = req.body;
    const [result] = await conmysql.query(
      'INSERT INTO pronostico (partido_id, usuario_id, resultado) VALUES (?, ?, ?)',
      [partido_id, usuario_id, resultado]
    );
    res.status(201).json({ id: result.insertId, message: 'Pronóstico creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
