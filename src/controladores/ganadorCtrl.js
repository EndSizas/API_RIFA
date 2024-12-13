import { conmysql } from '../db.js';

// Obtener el ganador con el mayor monto ganado
export const obtenerGanador = async (req, res) => {
    try {
        // Consulta SQL
        const query = `
            SELECT 
                u.nombres AS nombre_usuario,
                SUM(p.valor) AS total_ganado
            FROM pronostico p
            JOIN partido pa ON p.id_par = pa.id_par
            JOIN resultado r ON pa.id_res = r.id_res
            JOIN usuario u ON p.id_usr = u.id_usr
            WHERE pa.estado_par = 'cerrado'
              AND p.id_res = pa.id_res
            GROUP BY u.id_usr
            ORDER BY total_ganado DESC
            LIMIT 1;
        `;

        // Ejecutar la consulta en la base de datos
        const [rows] = await conmysql.query(query);

        // Validar si se encontró un ganador
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No hay ganador aún.' });
        }

        // Enviar respuesta
        res.json(rows[0]); // Devolvemos solo el ganador.
    } catch (error) {
        console.error('Error obteniendo el ganador:', error);
        res.status(500).json({ message: 'Error del servidor', error });
    }
};