import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js';

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado' });
    }
    next();
};

export const isNormal = (req, res, next) => {
    if (req.user.role !== 'normal') {
        return res.status(403).json({ message: 'Acceso denegado' });
    }
    next();
};



