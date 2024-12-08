import { conmysql } from '../db.js';

// Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
    try {
        const [rows] = await conmysql.query('SELECT * FROM usuario');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
};

// Obtener un usuario por ID
export const obtenerUsuarioPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await conmysql.query('SELECT * FROM usuario WHERE id_usr = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario', error });
    }
};

// Crear un nuevo usuario
export const crearUsuario = async (req, res) => {
    const { cedula, nombres, direccion, telefono, fecha_registro, usuario, clave, per_id } = req.body;
    if (!cedula || !nombres || !usuario || !clave || !per_id) {
        return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }
    try {
        const [result] = await conmysql.query(
            'INSERT INTO usuario (cedula, nombres, direccion, telefono, fecha_registro, usuario, clave, per_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [cedula, nombres, direccion, telefono, fecha_registro, usuario, clave, per_id]
        );
        res.status(201).json({ id: result.insertId, cedula, nombres, usuario });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
};
