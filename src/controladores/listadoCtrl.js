import {conmysql} from '../db.js'

// Obtener las personas que acertaron
export const getAciertos = async (req, res) => {
    try {
        const [rows] = await conmysql.query(`
            SELECT 
                u.id_usr, 
                u.nombres AS nombre_usuario, 
                p.id_par AS id_partido, 
                e1.nombre_eq AS equipo_local, 
                e2.nombre_eq AS equipo_visitante, 
                r.descripcion_res AS resultado_oficial, 
                r2.descripcion_res AS pronostico_usuario
            FROM 
                pronostico pr
            JOIN 
                partido p ON pr.id_par = p.id_par
            JOIN 
                resultado r ON p.id_res = r.id_res
            JOIN 
                resultado r2 ON pr.id_res = r2.id_res
            JOIN 
                usuario u ON pr.id_usr = u.id_usr
            JOIN 
                equipo e1 ON p.eq_uno = e1.id_eq
            JOIN 
                equipo e2 ON p.eq_dos = e2.id_eq
            WHERE 
                pr.id_res = p.id_res;
        `);

        if (rows.length === 0) {
            return res.status(404).json({ message: "No se encontraron usuarios que acertaron los pronósticos." });
        }

        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los datos del servidor." });
    }
};