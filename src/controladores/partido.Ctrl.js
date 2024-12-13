import { conmysql } from '../db.js';

export const createPartido = (req, res) => {
  const { eq_uno, eq_dos, fecha_par } = req.body;
  const query = 'INSERT INTO partido (eq_uno, eq_dos, fecha_par, estado_par) VALUES (?, ?, ?, "activo")';
  conmysql.query(query, [eq_uno, eq_dos, fecha_par], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send('Partido creado exitosamente');
  });
};

export const getPartidosActivos = (req, res) => {
  const query = 'SELECT * FROM partido WHERE estado_par = "activo"';
  conmysql.query(query, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(result);
  });
};

export const actualizarResultadoPartido = (req, res) => {
  const { id_par, id_res } = req.body;
  const query = 'UPDATE partido SET id_res = ?, estado_par = "cerrado" WHERE id_par = ?';
  conmysql.query(query, [id_res, id_par], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send('Resultado actualizado exitosamente');
  });
};






