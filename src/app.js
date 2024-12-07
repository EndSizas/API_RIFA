import express from 'express';
import cors from 'cors';

// Importar las rutas necesarias
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
app.use('/api/perfil', perfilRoutes);
app.use('/api/pronosticos', pronosticoRoutes);
app.use('/api/resultados', resultadoRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.send('API en funcionamiento');
});

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Middleware para manejar errores generales
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;

