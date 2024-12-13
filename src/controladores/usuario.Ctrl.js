import { conmysql } from '../db.js';

export const login = (req, res) => {
  const { usuario, clave } = req.body;

  const query = 'SELECT * FROM usuario WHERE usuario = ? AND clave = ?';
  conmysql.query(query, [usuario, clave], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) {
      return res.status(401).send('Usuario o clave incorrectos');
    }
    
    const user = result[0];
    res.status(200).json({ user });
  });
};











