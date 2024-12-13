import express from 'express'
import cors from 'cors' //importa los paquetes cors-- permisos de acceso
import path from 'path'
import { fileURLToPath } from 'url'
import partidosRoutes from './routes/partidos.routes.js'
import usuariosRoutes from './routes/usuarios.routes.js'
import pronosticosRoutes from './routes/pronosticos.routes.js'
import resultadosRoutes from './routes/resultado.routes.js'
import equiposRoutes from './routes/equipos.routes.js'
import resultadofinalRoutes from './routes/resultadofinal.routes.js'
import listadoRoutes from './routes/listado.routes.js'
import ganadorRoutes from './routes/ganador.routes.js'

//definir modulo de ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app=express();
const corsOptions={
    origin:'*',//la direccion ip/dominio del servidor
    methods:['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials:true
}

app.set('json spaces', 2); // Define la sangría para JSON en modo de desarrollo

app.use(cors(corsOptions))
app.use(express.json());//para que interprete los objetos json
app.use(express.urlencoded({extended:true}));  //se añade para poder receptar formularios
//app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));
//app.use('/uploads', express.static(path.resolve('uploads')));
//rutas
app.use('/api',partidosRoutes)
app.use('/api',usuariosRoutes)
app.use('/api',pronosticosRoutes)
app.use('/api',resultadosRoutes)
app.use('/api',equiposRoutes)
app.use('/api',resultadofinalRoutes)
app.use('/api',listadoRoutes)
app.use('/api',ganadorRoutes)

app.use((req,res,next)=>{
    res.status(400).json({
        message: 'Endpoint not found'
    })
})
export default app;