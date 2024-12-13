import {conmysql} from '../db.js'
export const getPartidos=
    async (req,res)=>{
        try {
            const [result] = await conmysql.query(' select * from partido ')
            res.json(result)
        } catch (error) {
            return res.status(500).json({message:"Error al consultar clientes"})
        }
    }
    


export const getpartidosxid=
async (req,res)=>{
    try {
        const[result]=await conmysql.query('select * from partido where id_par=?',[req.params.id])
        if (result.length<=0)return res.status(404).json({
            message:"Cliente no encontrado"
        })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({message:'error de lado del servidor'})        
    }
}
/* export const postPartido=
async (req,res)=>{
    try {
        //console.log(req.body)
        const {eq_uno, eq_dos, fecha_par, id_res, estado_par}=req.body
        //console.log(cli_nombre)
        const [rows]=await conmysql.query('insert into partido (eq_uno, eq_dos, fecha_par, id_res, estado_par) values(?,?,?,?,?)',
            [eq_uno, eq_dos, fecha_par, id_res, estado_par])

        res.send({
            id:rows.insertId
        })
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
} */
export const postPartido = async (req, res) => {
    try {
        const { eq_uno, eq_dos, fecha_par, id_res, estado_par } = req.body;

        // Asegurarse de que el campo estado_par tenga un valor válido
        const estado = estado_par || 'activo'; // Valor por defecto: "activo"

        const [rows] = await conmysql.query(
            'INSERT INTO partido (eq_uno, eq_dos, fecha_par, id_res, estado_par) VALUES (?, ?, ?, ?, ?)',
            [eq_uno, eq_dos, fecha_par, id_res, estado]
        );

        res.send({
            id: rows.insertId,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};
export const putCliente=
async (req,res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)
        const {cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad}=req.body
        //console.log(cli_nombre)
        const [result]=await conmysql.query('update clientes set cli_identificacion=?, cli_nombre=?, cli_telefono=?, cli_correo=?, cli_direccion=?, cli_pais=?, cli_ciudad=? where cli_id=?',
            [cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad, id])

        if(result.affectedRows<=0)return res.status(404).json({
            message:'Cliente no encontrado'
        })
        const[rows]=await conmysql.query('select * from clientes where cli_id=?',[id])
        res.json(rows[0])
        /* res.send({
            id:rows.insertId
        }) */
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const patchCliente=
async (req,res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)
        const {cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad}=req.body
        //console.log(cli_nombre)
        const [result]=await conmysql.query('update clientes set cli_identificacion=IFNULL(?,cli_identificacion), cli_nombre=IFNULL(?,cli_nombre), cli_telefono=IFNULL(?,cli_telefono), cli_correo=IFNULL(?,cli_correo), cli_direccion=IFNULL(?,cli_direccion), cli_pais=IFNULL(?,cli_pais), cli_ciudad=IFNULL(?,cli_ciudad) where cli_id=?',
            [cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad, id])

        if(result.affectedRows<=0)return res.status(404).json({
            message:'Cliente no encontrado'
        })
        const[rows]=await conmysql.query('select * from clientes where cli_id=?',[id])
        res.json(rows[0])
        /* res.send({
            id:rows.insertId
        }) */
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const deleteCliente=
async(req,res)=>{
    try {
        //const {miid}=req.params
        const [rows]=await conmysql.query(' delete from clientes where cli_id=?',[req.params.id])
        if(rows.affectedRows<=0)return res.status(404).json({
            id:0,
            message: "No pudo eliminar el cliente"
        })
        //res.sendStatus(202) ----el que tenia
        return res.status(200).json({
          message: "Cliente eliminado correctamente"
        });  // Agregado
    } catch (error) {
        return res.status(500).json({message:"Error del lado del servidor"})
    }
}

export const getPartidosActivos = async (req, res) => {
    try {
        // Realizar la consulta SQL para obtener los partidos activos
        const [rows] = await conmysql.query(
            `SELECT p.id_par, e1.nombre_eq AS equipo_uno, e2.nombre_eq AS equipo_dos, p.fecha_par
            FROM partido p
            JOIN equipo e1 ON p.eq_uno = e1.id_eq
            JOIN equipo e2 ON p.eq_dos = e2.id_eq
            WHERE p.estado_par = 'activo'`
        );

        // Devolver los resultados como respuesta
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};