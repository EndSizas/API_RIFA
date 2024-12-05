import express from 'express';
import cors from 'cors';
import usuarioRoutes from './routes/usuario.routes.js';
import equipoRoutes from './routes/equipo.routes.js';
import partidoRoutes from './routes/partido.routes.js';
import perfilRoutes from './routes/perfil.routes.js';
import pronosticoRoutes from './routes/pronostico.routes.js';
import resultadoRoutes from './routes/resultado.routes.js';

const app = express();

// Middleware para parsear el cuerpo de las solicitudes en JSON
app.use(express.json());
app.use(cors()); // Agregar CORS si es necesario

// Rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/equipos', equipoRoutes);
app.use('/api/partidos', partidoRoutes);
app.use('/api/perfiles', perfilRoutes);
app.use('/api/pronosticos', pronosticoRoutes);
app.use('/api/resultados', resultadoRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.send('API en funcionamiento');
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
