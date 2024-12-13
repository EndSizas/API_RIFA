import {conmysql} from '../db.js'
export const getEquipos=
    async (req,res)=>{
        try {
            const [result] = await conmysql.query(' select * from equipo ')
            res.json(result)
        } catch (error) {
            return res.status(500).json({message:"Error al consultar clientes"})
        }
    }
    


export const getequiposxid=
async (req,res)=>{
    try {
        const[result]=await conmysql.query('select * from equipo where id_eq=?',[req.params.id])
        if (result.length<=0)return res.status(404).json({
            message:"Cliente no encontrado"
        })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({message:'error de lado del servidor'})        
    }
}