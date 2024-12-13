import {conmysql} from '../db.js'

// Actualizar el resultado final y cambiar el estado del partido
export const actualizarResultadoFinal = async (req, res) => {
    try {
        const { id } = req.params; // ID del partido
        const { id_res } = req.body; // ID del resultado (1: Local, 2: Visitante, 3: Empate)

        // Validar que los datos necesarios están presentes
        if (!id_res || !id) {
            return res.status(400).json({ message: 'ID del resultado y del partido son requeridos' });
        }

        // Realizar la actualización en la base de datos
        const [result] = await conmysql.query(
            `UPDATE partido 
             SET id_res = ?, estado_par = 'cerrado'
             WHERE id_par = ? AND estado_par = 'activo'`,
            [id_res, id]
        );

        // Verificar si se actualizó algún registro
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Partido no encontrado o ya está cerrado' });
        }

        res.json({ message: 'Resultado final actualizado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: 'Error del servidor', error });
    }
};