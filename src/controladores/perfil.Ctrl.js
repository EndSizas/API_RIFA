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
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Registrar un nuevo partido (solo para administradores)
export const registerPartido = async (req, res) => {
  try {
    const { id_usr, equipo_local, equipo_visitante, fecha } = req.body;

    // Verificar si el usuario es administrador
    const [user] = await conmysql.query('SELECT tipo FROM usuario WHERE id_usr = ?', [id_usr]);
    if (user.length === 0 || user[0].tipo !== 'admin') {
      return res.status(403).json({ error: 'No tienes permisos para registrar partidos.' });
    }

    // Insertar el partido
    const [result] = await conmysql.query(
      'INSERT INTO partido (equipo_local, equipo_visitante, fecha, estado) VALUES (?, ?, ?, "activo")',
      [equipo_local, equipo_visitante, fecha]
    );
    res.status(201).json({ id: result.insertId, message: 'Partido registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Registrar un pronóstico (solo para usuarios normales)
export const registerPronostico = async (req, res) => {
  try {
    const { id_usr, id_partido, pronostico } = req.body;

    // Verificar si el usuario es normal
    const [user] = await conmysql.query('SELECT tipo FROM usuario WHERE id_usr = ?', [id_usr]);
    if (user.length === 0 || user[0].tipo !== 'normal') {
      return res.status(403).json({ error: 'No tienes permisos para registrar pronósticos.' });
    }

    // Verificar si el partido está activo
    const [partido] = await conmysql.query('SELECT estado FROM partido WHERE id_par = ?', [id_partido]);
    if (partido.length === 0 || partido[0].estado !== 'activo') {
      return res.status(400).json({ error: 'El partido no está disponible para pronósticos.' });
    }

    // Insertar el pronóstico
    const [result] = await conmysql.query(
      'INSERT INTO pronostico (id_usr, id_partido, pronostico) VALUES (?, ?, ?)',
      [id_usr, id_partido, pronostico]
    );
    res.status(201).json({ id: result.insertId, message: 'Pronóstico registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

