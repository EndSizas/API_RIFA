import { conmysql } from '../db.js'
export const getPronosticos=
async (req,res)=>{
    try {
        const [result] = await conmysql.query(' select * from pronostico ')
        res.json(result)
    } catch (error) {
        return res.status(500).json({message:"Error al consultar clientes"})
    }
}

export const getListadoPronosticosAciertos = async (req, res) => {
    try {
        const [result] = await conmysql.query(`
            SELECT 
                u.nombres AS nombre_usuario,
                CONCAT(e1.nombre_eq, ' vs ', e2.nombre_eq) AS equipos,
                r.descripcion_res AS resultado_oficial,
                r_pron.descripcion_res AS pronostico
            FROM pronostico p
            JOIN partido pa ON p.id_par = pa.id_par
            JOIN equipo e1 ON pa.eq_uno = e1.id_eq
            JOIN equipo e2 ON pa.eq_dos = e2.id_eq
            JOIN resultado r ON pa.id_res = r.id_res
            JOIN resultado r_pron ON p.id_res = r_pron.id_res
            JOIN usuario u ON p.id_usr = u.id_usr
            WHERE pa.estado_par = 'cerrado' 
            AND r.id_res = p.id_res;
        `);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener el listado de aciertos.' });
    }
};

export const getpronosticosxid =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('select * from pronostico where id_pron=?', [req.params.id])
            if (result.length <= 0) return res.status(404).json({
                message: "Cliente no encontrado"
            })
            res.json(result[0])
        } catch (error) {
            return res.status(500).json({ message: 'error de lado del servidor' })
        }
    }
export const postPronostico = async (req, res) => {
    try {
        const { id_usr, id_par, id_res, valor } = req.body;

        // Validaciones
        if (!id_usr || !id_par || !id_res || !valor) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Si no se proporciona fecha_registro, asignamos la fecha y hora actuales
        const fecha_registro = req.body.fecha_registro || new Date().toISOString();

        const [rows] = await conmysql.query(
            'INSERT INTO pronostico (id_usr, id_par, id_res, valor, fecha_registro) VALUES (?, ?, ?, ?, ?)',
            [id_usr, id_par, id_res, valor, fecha_registro]
        );

        res.send({ id: rows.insertId });
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};