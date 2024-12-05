import { conmysql } from '../db.js';

// Obtener todos los perfiles
export const getPerfiles = async (req, res) => {
  try {
    const [rows] = await conmysql.query('SELECT * FROM perfil');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un perfil por ID
export const getPerfilById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await conmysql.query('SELECT * FROM perfil WHERE per_id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Perfil no encontrado' });
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo perfil
export const createPerfil = async (req, res) => {
  try {
    const { usuario_id, descripcion } = req.body;
    const [result] = await conmysql.query(
      'INSERT INTO perfil (usuario_id, descripcion) VALUES (?, ?)',
      [usuario_id, descripcion]
    );
    res.status(201).json({ id: result.insertId, message: 'Perfil creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
