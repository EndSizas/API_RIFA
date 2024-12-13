import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

export const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log('Encabezado Authorization recibido:', authHeader); // Depuración

    // Validar si no hay encabezado
    if (!authHeader) {
        return res.status(403).json({ message: 'Token no provisto' });
    }

    // Procesar token (si tiene o no prefijo "Bearer ")
    const token = authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]  // Token con "Bearer"
        : authHeader;              // Token simple (sin "Bearer")

    console.log('Token extraído:', token); // Depuración

    if (!token) {
        return res.status(401).json({ message: 'Fallo en la autenticación del token' });
    }

    // Verificar el token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Error al verificar el token:', err.message); // Depuración
            return res.status(403).json({ message: 'Token inválido o expirado' });
        }

        req.user = decoded; // Guardar información del usuario decodificada en la solicitud
        console.log('Usuario autenticado:', req.user); // Depuración
        next(); // Pasar al siguiente middleware
    });
};