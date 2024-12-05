import mysql from 'mysql2/promise';

// Configuración de la conexión a la base de datos
export const conmysql = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'db_rufa',
  port: process.env.DB_PORT || 3306
});

