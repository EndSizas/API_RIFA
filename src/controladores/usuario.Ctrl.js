import { conmysql } from '../db.js';

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
  try {
    const [rows] = await conmysql.query('SELECT * FROM usuario');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un usuario por ID
export const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await conmysql.query('SELECT * FROM usuario WHERE id_usr = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo usuario
export const createUsuario = async (req, res) => {
  try {
    const { nombre, correo, password, tipo } = req.body;
    const [result] = await conmysql.query(
      'INSERT INTO usuario (nombre, correo, password, tipo) VALUES (?, ?, ?, ?)',
      [nombre, correo, password, tipo]
    );
    res.status(201).json({ id: result.insertId, message: 'Usuario creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

