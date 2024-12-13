import {conmysql} from '../db.js'
export const getResultados=
    async (req,res)=>{
        try {
            const [result] = await conmysql.query(' select * from resultado ')
            res.json(result)
        } catch (error) {
            return res.status(500).json({message:"Error al consultar clientes"})
        }
    }
    


export const getresultadosxid=
async (req,res)=>{
    try {
        const[result]=await conmysql.query('select * from resultado where id_res=?',[req.params.id])
        if (result.length<=0)return res.status(404).json({
            message:"Resultado no encontrado"
        })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({message:'error de lado del servidor'})        
    }
}