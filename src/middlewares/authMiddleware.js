// /middleware/authMiddleware.js
export const authMiddleware = (rolesPermitidos) => (req, res, next) => {
  const { per_id } = req.body;
  if (rolesPermitidos.includes(per_id)) {
      next();
  } else {
      res.status(403).json({ message: 'No autorizado' });
  }
};


