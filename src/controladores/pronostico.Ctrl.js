import { conmysql } from '../db.js';

export const createPronostico = (req, res) => {
  const { id_usr, id_par, id_res, valor } = req.body;
  const query = 'INSERT INTO pronostico (id_usr, id_par, id_res, valor, fecha_registro) VALUES (?, ?, ?, ?, NOW())';
  conmysql.query(query, [id_usr, id_par, id_res, valor], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send('Pronóstico registrado exitosamente');
  });
};

export const getPronosticosPorUsuario = (req, res) => {
  const { id_usr } = req.params;
  const query = 'SELECT * FROM pronostico WHERE id_usr = ?';
  conmysql.query(query, [id_usr], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(result);
  });
};





