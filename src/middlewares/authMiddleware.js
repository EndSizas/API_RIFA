import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

// Middleware para verificar el token de autenticación
export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    
    // Verificar si el encabezado contiene el token
    if (!authHeader) {
      return res.status(403).json({ message: 'Token no proporcionado' });
    }

    // Extraer el token, eliminando el prefijo "Bearer"
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: 'Token no proporcionado o mal formateado' });
    }

    // Verificar y decodificar el token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('Error de verificación del token:', err.message);
        return res.status(401).json({ message: 'Token no válido' });
      }

      // Guardar información del usuario decodificado en la solicitud
      req.userId = decoded.id;
      req.userRole = decoded.role; // Asumimos que el rol del usuario está en el token
      next();
    });
  } catch (error) {
    console.error('Error en verifyToken:', error.message);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Middleware para verificar si el usuario es administrador
export const verificarAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado. Solo administradores pueden realizar esta acción.' });
  }
  next();
};

// Middleware para verificar si el usuario es un usuario normal
export const verificarUsuarioNormal = (req, res, next) => {
  if (req.userRole !== 'usuario') {
    return res.status(403).json({ message: 'Acceso denegado. Solo usuarios normales pueden realizar esta acción.' });
  }
  next();
};

