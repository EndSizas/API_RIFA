import express from 'express';
import cors from 'cors'; // Agregado para habilitar CORS

// Importa las rutas necesarias
import usuariosRoutes from './routes/usuario.routes.js';
import partidosRoutes from './routes/partido.routes.js';
import equipoRoutes from './routes/equipo.routes.js'; 
import perfilRoutes from './routes/perfil.routes.js';
import resultadosRoutes from './routes/resultado.routes.js';
import pronosticosRoutes from './routes/pronostico.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors()); // Habilitar CORS para todas las rutas

// Rutas
app.use('/api/usuario', usuariosRoutes);
app.use('/api/partido', partidosRoutes);
app.use('/api/equipo', equipoRoutes);
app.use('/api/perfil', perfilRoutes);
app.use('/api/resultado', resultadosRoutes);
app.use('/api/pronostico', pronosticosRoutes);

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Middleware para manejar errores generales
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
