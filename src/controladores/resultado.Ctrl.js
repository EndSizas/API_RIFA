import { conmysql } from '../db.js';

// Obtener todos los resultados
export const getResultados = async (req, res) => {
  try {
    const [rows] = await conmysql.query('SELECT * FROM resultado');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un resultado por ID
export const getResultadoById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await conmysql.query('SELECT * FROM resultado WHERE id_res = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Resultado no encontrado' });
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo resultado
export const createResultado = async (req, res) => {
  try {
    const { partido_id, resultado } = req.body;
    const [result] = await conmysql.query(
      'INSERT INTO resultado (partido_id, resultado) VALUES (?, ?)',
      [partido_id, resultado]
    );
    res.status(201).json({ id: result.insertId, message: 'Resultado registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
