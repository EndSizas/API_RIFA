import { conmysql } from '../db.js';

// Obtener todos los perfiles
export const obtenerPerfiles = async (req, res) => {
    try {
        const [rows] = await conmysql.query('SELECT * FROM perfil');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los perfiles', error });
    }
};

// Obtener un perfil por ID
export const obtenerPerfilPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await conmysql.query('SELECT * FROM perfil WHERE per_id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Perfil no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el perfil', error });
    }
};

// Crear un nuevo perfil
export const crearPerfil = async (req, res) => {
    const { descripcion, estado } = req.body;
    if (!descripcion || !estado) {
        return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }
    try {
        // Comprobamos que los valores de descripcion sean 'Administrador' o 'Usuario Normal'
        if (descripcion !== 'Administrador' && descripcion !== 'Usuario Normal') {
            return res.status(400).json({ message: 'La descripción debe ser "Administrador" o "Usuario Normal"' });
        }

        // Insertar el nuevo perfil
        const [result] = await conmysql.query(
            'INSERT INTO perfil (descripcion, estado) VALUES (?, ?)',
            [descripcion, estado]
        );
        res.status(201).json({ id: result.insertId, descripcion, estado });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el perfil', error });
    }
};


