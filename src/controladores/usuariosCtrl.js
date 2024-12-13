import {conmysql} from '../db.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js'; // Asegúrate de definir esta clave secreta en un archivo de configuración

export const getUsuarios=
    async (req,res)=>{
        try {
            const [result] = await conmysql.query(' select * from usuario ')
            res.json(result)
        } catch (error) {
            return res.status(500).json({message:"Error al consultar usuarios"})
        }
    }
    


export const getusuariosxid=
async (req,res)=>{
    try {
        const[result]=await conmysql.query('select * from usuario where id_usr=?',[req.params.id])
        if (result.length<=0)return res.status(404).json({
            cli_id:0,
            message:"Usuario no encontrado"
        })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({message:'error de lado del servidor'})        
    }
}
/* export const postUsuario=
async (req,res)=>{
    try {
        //console.log(req.body)
        const {usu_nombre, usu_usuario, usu_email, usu_password, usu_activo}=req.body
        //console.log(cli_nombre)
        const [rows]=await conmysql.query('insert into tb_usuario (usu_nombre, usu_usuario, usu_email, usu_password, usu_activo) values(?,?,?,?,?)',
            [usu_nombre, usu_usuario, usu_email, usu_password, usu_activo])

        res.send({
            id:rows.insertId
        })
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
} */
// Actualiza la función de registro para encriptar la contraseña
export const postUsuario = async (req, res) => {
    try {
        const { cedula, nombres, direccion, telefono, fecha_registro, usuario, clave, per_id } = req.body;

        // Genera el hash de la contraseña
        const hashedPassword = await bcrypt.hash(clave, 10);

        const [rows] = await conmysql.query(
            'INSERT INTO usuario (cedula, nombres, direccion, telefono, fecha_registro, usuario, clave, per_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [cedula, nombres, direccion, telefono, fecha_registro, usuario, hashedPassword, per_id]
        );

        //res.send({ id: rows.insertId });
        res.status(201).json({ message: 'Usuario registrado exitosamente', id: rows.insertId });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return res.status(500).json({ message: 'Error del servidor' });
    }
};
export const putUsuario=
async (req,res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)
        const {cedula, nombres, direccion, telefono, fecha_registro, usuario, clave, per_id}=req.body
        //console.log(cli_nombre)
        const [result]=await conmysql.query('update tb_usuario set usu_nombre=?, usu_usuario=?, usu_email=?, usu_password=?, usu_activo=? where usu_id=?',
            [cedula, nombres, direccion, telefono, fecha_registro, usuario, clave, per_id, id])

        if(result.affectedRows<=0)return res.status(404).json({
            message:'Usuario no encontrado'
        })
        const[rows]=await conmysql.query('select * from tb_usuario where usu_id=?',[id])
        res.json(rows[0])
        /* res.send({
            id:rows.insertId
        }) */
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const patchUsuario=
async (req,res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)
        const {cedula, nombres, direccion, telefono, fecha_registro, usuario, clave, per_id}=req.body
        //console.log(cli_nombre)
        const [result]=await conmysql.query('update tb_usuario set usu_nombre=IFNULL(?,usu_nombre), usu_usuario=IFNULL(?,usu_usuario), usu_email=IFNULL(?,usu_email), usu_password=IFNULL(?,usu_password), usu_activo=IFNULL(?,usu_activo) where usu_id=?',
            [cedula, nombres, direccion, telefono, fecha_registro, usuario, clave, per_id, id])

        if(result.affectedRows<=0)return res.status(404).json({
            message:'Usuario no encontrado'
        })
        const[rows]=await conmysql.query('select * from tb_usuario where usu_id=?',[id])
        res.json(rows[0])
        /* res.send({
            id:rows.insertId
        }) */
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const deleteUsuario=
async(req,res)=>{
    try {
        //const {miid}=req.params
        const [rows]=await conmysql.query(' delete from tb_usuario where usu_id=?',[req.params.id])
        if(rows.affectedRows<=0)return res.status(404).json({
            id:0,
            message: "No pudo eliminar el usuario"
        })
        //res.sendStatus(202) ----el que tenia
        return res.status(200).json({
          message: "Usuario eliminado correctamente"
        });  // Agregado
    } catch (error) {
        return res.status(500).json({message:"Error del lado del servidor"})
    }
}

// Función de login
export const loginUsuario = async (req, res) => {
    try {
        const { usuario, clave } = req.body;

        // Consulta al usuario en la base de datos
        const [result] = await conmysql.query('SELECT * FROM usuario WHERE usuario = ?', [usuario]);
        if (result.length <= 0) return res.status(404).json({ message: 'Usuario no encontrado' });

        const user = result[0];

        // Verifica la contraseña encriptada
        const passwordValido = bcrypt.compareSync(clave, user.clave);
        if (!passwordValido) return res.status(401).json({ message: 'Contraseña incorrecta' });

        // Genera el token JWT
        const token = jwt.sign({ id: user.id_usr, per_id: user.per_id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ auth: true, token, id_usr: user.id_usr, per_id: user.per_id, nombres: user.nombres });
    } catch (error) {
        console.error('Error al hacer login:', error);
        return res.status(500).json({ message: 'Error del servidor' });
    }
};
